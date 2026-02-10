// const express = require("express");
// const axios = require("axios");

// const router = express.Router();

// /* ===============================
//    🔑 Parcelx Token Setup
// ================================ */

// const accessKey = process.env.PARCELX_ACCESS_KEY;
// const secretKey = process.env.PARCELX_SECRET_KEY;

// const token = Buffer.from(`${accessKey}:${secretKey}`).toString("base64");

// /* ===============================
//    🚀 Parcelx Axios Instance
// ================================ */

// const parcelx = axios.create({
//   baseURL: "https://app.parcelx.in/api/v3",
//   headers: {
//     "Content-Type": "application/json",
//     "access-token": token,
//   },
// });

// /* ==================================================
//    ✅ 1. Tracking API
//    GET /api/parcelx/track/:awb
// ================================================== */
// router.get("/track/:awb", async (req, res) => {
//   try {
//     const { awb } = req.params;
//     const response = await parcelx.get(`/track_order?awb=${awb}`);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: "Tracking Error",
//       error: err.message,
//     });
//   }
// });

// /* ==================================================
//    ✅ 2. Cancel Order
//    POST /api/parcelx/order/cancel
// ================================================== */
// router.post("/order/cancel", async (req, res) => {
//   try {
//     const response = await parcelx.post(
//       "/order/cancel_order",
//       req.body
//     );
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: "Cancel Order Error",
//       error: err.message,
//     });
//   }
// });

// /* ==================================================
//    ✅ 3. Rate Calculator
//    POST /api/parcelx/rate
// ================================================== */
// router.post("/rate", async (req, res) => {
//   try {
//     const response = await parcelx.post("/rate_calculator", req.body);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: "Rate Calculator Error",
//       error: err.message,
//     });
//   }
// });

// /* ==================================================
//    ✅ 4. Label API
//    GET /api/parcelx/label/:awb
// ================================================== */
// router.get("/label/:awb", async (req, res) => {
//   try {
//     const { awb } = req.params;
//     const response = await parcelx.get(
//       `/label?awb=${awb}&label_type=label`
//     );
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: "Label Error",
//       error: err.message,
//     });
//   }
// });

// /* ==================================================
//    ✅ 5. Courier List
//    POST /api/parcelx/couriers
// ================================================== */
// router.post("/couriers", async (req, res) => {
//   try {
//     const response = await parcelx.post("/courier-list", req.body);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: "Courier List Error",
//       error: err.message,
//     });
//   }
// });

// module.exports = router;



// module.exports = router;
const express = require('express');
const router = express.Router();
const parcelxService = require('../services/parcelx.service');
const orderController = require('../controllers/orderController');

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
router.post('/admin/create-warehouse', async (req, res) => {
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



