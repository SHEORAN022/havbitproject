


// // const express = require("express");
// // const router = express.Router();

// // const {
// //   trackShipment,
// //   cancelShipment,
// // } = require("../services/parcelxService");

// // /* TRACK */
// // router.get("/track/:awb", async (req, res) => {
// //   try {
// //     const data = await trackShipment(req.params.awb);
// //     res.json(data);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // /* CANCEL */
// // router.post("/cancel/:awb", async (req, res) => {
// //   try {
// //     const data = await cancelShipment(req.params.awb);
// //     res.json(data);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const parcelxService = require('../services/parcelx.service');
// const orderController = require('../controllers/orderController');

// // Test ParcelX connection
// router.get('/test', async (req, res) => {
//   try {
//     const result = await parcelxService.testConnection();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// });

// // Check pincode serviceability
// router.get('/check-pincode', async (req, res) => {
//   try {
//     const { pincode } = req.query;
//     if (!pincode) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Pincode required' 
//       });
//     }
    
//     const result = await parcelxService.checkPincode(pincode);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// });

// // Track shipment
// router.get('/track/:awb', async (req, res) => {
//   try {
//     const result = await parcelxService.trackShipment(req.params.awb);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// });

// // Get shipment details
// router.get('/shipment/:awb', async (req, res) => {
//   try {
//     const result = await parcelxService.getShipmentDetails(req.params.awb);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// });

// // Get label PDF
// router.get('/label/:awb', async (req, res) => {
//   try {
//     const result = await parcelxService.getLabel(req.params.awb);
    
//     if (result.success) {
//       res.set({
//         'Content-Type': result.contentType,
//         'Content-Disposition': `attachment; filename="${result.filename}"`
//       });
//       res.send(result.data);
//     } else {
//       res.status(400).json({ 
//         success: false, 
//         message: result.error 
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// });

// // Webhook endpoint (ParcelX will send updates here)
// router.post('/webhook', orderController.parcelxWebhook);

// // Admin: Create warehouse for vendor
// router.post('/admin/create-warehouse', async (req, res) => {
//   try {
//     const { vendorId, warehouseData } = req.body;
    
//     if (!vendorId || !warehouseData) {
//       return res.status(400).json({
//         success: false,
//         message: 'vendorId and warehouseData are required'
//       });
//     }
    
//     const result = await parcelxService.createVendorWarehouse(vendorId, warehouseData);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const parcelxService = require('../services/parcelx.service');
const orderController = require('../controllers/orderController');
const adminAuth = require('../middleware/adminAuth');

// Test ParcelX connection
router.get('/test', async (req, res) => {
  try {
    const result = await parcelxService.testConnection();
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Check pincode serviceability
router.get('/check-pincode', orderController.checkPincode);

// Track shipment
router.get('/track/:awb', async (req, res) => {
  try {
    const result = await parcelxService.trackShipment(req.params.awb);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get shipment details
router.get('/shipment/:awb', async (req, res) => {
  try {
    const result = await parcelxService.getShipmentDetails(req.params.awb);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get label PDF
router.get('/label/:awb', orderController.getAWBLabel);

// Cancel shipment
router.post('/cancel/:awb', async (req, res) => {
  try {
    const { reason } = req.body;
    const result = await parcelxService.cancelShipment(req.params.awb, reason || 'Customer request');
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Webhook endpoint (ParcelX will send updates here)
router.post('/webhook', orderController.parcelxWebhook);

// Admin: Create warehouse for vendor
router.post('/admin/create-warehouse', adminAuth, async (req, res) => {
  try {
    const { vendorId, warehouseData } = req.body;
    
    if (!vendorId || !warehouseData) {
      return res.status(400).json({
        success: false,
        message: 'vendorId and warehouseData are required'
      });
    }
    
    const result = await parcelxService.createVendorWarehouse(vendorId, warehouseData);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Check multiple pincodes
router.post('/check-pincodes', async (req, res) => {
  try {
    const { pincodes } = req.body;
    
    if (!pincodes || !Array.isArray(pincodes)) {
      return res.status(400).json({
        success: false,
        message: 'pincodes array is required'
      });
    }
    
    const results = await Promise.all(
      pincodes.map(pincode => parcelxService.checkPincode(pincode))
    );
    
    res.json({
      success: true,
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
