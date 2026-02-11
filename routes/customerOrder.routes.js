const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const vendorAuth = require("../middleware/vendorAuth");
const adminAuth = require("../middleware/adminAuth");
const {
  createOrder,
  getOrderById,
  getOrderTracking,
  getCustomerOrders,
  cancelOrder,
  getAllOrdersForAdmin,
  updateOrderStatus,
  getMyOrders,
  trackAWB,
  getAWBLabel,
  parcelxWebhook,
  checkPincode
} = require("../controllers/orderController");

// Public routes
router.get("/track-awb/:awb", trackAWB);
router.get("/label/:awb", getAWBLabel);
router.get("/pincode/check", checkPincode);

// Public webhook (no auth needed)
router.post("/webhook/parcelx", parcelxWebhook);

// Customer routes (requires auth)
router.use(auth);
router.post("/create", createOrder);
router.get("/my-orders", getMyOrders);
router.get("/:id", getOrderById);
router.get("/:orderId/tracking", getOrderTracking);
router.put("/:id/cancel", cancelOrder);

// Vendor routes
router.get("/vendor/customer/:customerId", vendorAuth, getCustomerOrders);

// Admin routes
router.get("/admin/all", adminAuth, getAllOrdersForAdmin);
router.put("/admin/:id/status", adminAuth, updateOrderStatus);

module.exports = router;
