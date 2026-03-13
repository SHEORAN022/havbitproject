const express = require("express");
const router = express.Router();

const userAuth = require("../middleware/userAuth");
// OPTIONAL (best practice)
const adminAuth = require("../middleware/adminAuth");
const vendorAuth = require("../middleware/vendorAuth");

const {
  createOrder,
  getCustomerOrders,
  getOrderById,
  getMyOrders,
  cancelOrder,
  updateOrderStatus,
  getVendorOrders,
  getAllOrdersForAdmin,
  deleteOrder,
} = require("../controllers/customerOrder.controller");

/* ================= CUSTOMER ================= */

// 🔐 Login required
router.post("/order/create", userAuth, createOrder);

// 🔐 Logged-in user orders
router.get("/my-orders", userAuth, getMyOrders);

// 🔐 Single order (ownership check controller me)
router.get("/order/:id", userAuth, getOrderById);

// 🔐 Cancel own order
router.put("/order/cancel/:id", userAuth, cancelOrder);


/* ================= VENDOR ================= */

// 🔐 Vendor orders
router.get("/vendor-orders/:vendorId", vendorAuth, getVendorOrders);


/* ================= ADMIN ================= */

// 🔐 Admin access
router.get("/admin/orders", adminAuth, getAllOrdersForAdmin);
router.put("/order/status/:id", adminAuth, updateOrderStatus);
router.delete("/order/:id", adminAuth, deleteOrder);

module.exports = router;
