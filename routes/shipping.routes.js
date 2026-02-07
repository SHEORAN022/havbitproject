
// routes/shipping.routes.js
const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');
const userAuth = require('../middleware/userAuth');

// Public routes (tracking)
router.get('/track/:awbCode', shippingController.trackShipment);
router.get('/serviceability', shippingController.checkServiceability);

// Webhook (Shiprocket → Our server)
router.post('/webhook', shippingController.handleShiprocketWebhook);

// Protected routes (authenticated users)
router.get('/shipment/:orderId', userAuth, shippingController.getShipmentDetails);
router.get('/couriers', userAuth, shippingController.getAllCouriers);

// Admin/Vendor only routes
router.post('/create/:orderId', userAuth, async (req, res, next) => {
  // Check if user is admin or vendor
  if (req.user.role === 'admin' || req.user.role === 'vendor') {
    return shippingController.createShiprocketShipment(req, res);
  }
  return res.status(403).json({ success: false, message: 'Unauthorized' });
});

router.get('/label/:orderId', userAuth, async (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'vendor') {
    return shippingController.generateShippingLabel(req, res);
  }
  return res.status(403).json({ success: false, message: 'Unauthorized' });
});

router.post('/cancel/:orderId', userAuth, async (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'vendor') {
    return shippingController.cancelShipment(req, res);
  }
  return res.status(403).json({ success: false, message: 'Unauthorized' });
});

module.exports = router;
