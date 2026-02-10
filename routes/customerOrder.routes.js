// const express = require("express");
// const router = express.Router();

// const userAuth = require("../middleware/userAuth"); // ✅ USE THIS

// const {
//   createOrder,
//   getCustomerOrders,
//   getOrderById,
//   getMyOrders,
//   cancelOrder,
//   updateOrderStatus,
//   getVendorOrders,
//   getAllOrdersForAdmin,
//   deleteOrder,
// } = require("../controllers/customerOrder.controller");

// router.post("/order/create", createOrder);
// router.get("/orders/:customerId", getCustomerOrders);

// // 🔐 LOGGED-IN USER ORDERS
// router.get("/my-orders", userAuth, getMyOrders);

// router.get("/order/:id", getOrderById);
// router.put("/order/cancel/:id", cancelOrder);
// router.put("/order/status/:id", updateOrderStatus);

// router.get("/vendor-orders/:vendorId", getVendorOrders);
// router.get("/admin/orders", getAllOrdersForAdmin);
// router.delete("/order/:id", deleteOrder);

// module.exports = router;














































// const express = require("express");
// const router = express.Router();
// const userAuth = require("../middleware/userAuth");

// const {
//   createOrder,
//   getCustomerOrders,
//   getOrderById,
//   getMyOrders,
//   cancelOrder,
//   updateOrderStatus,
//   getVendorOrders,
//   getAllOrdersForAdmin,
//   deleteOrder,
//   parcelxWebhook,
//   getAWBLabel,
//   checkPincode
// } = require("../controllers/customerOrder.controller");

// /* ================= PUBLIC WEBHOOK (no auth needed) ================= */
// router.post("/webhook/parcelx", parcelxWebhook);

// /* ================= CUSTOMER ROUTES ================= */
// router.post("/order/create", userAuth, createOrder);
// router.get("/orders/:customerId", userAuth, getCustomerOrders);
// router.get("/my-orders", userAuth, getMyOrders);
// router.get("/order/:id", userAuth, getOrderById);
// router.get("/order/label/:awb", userAuth, getAWBLabel);
// router.get("/pincode/check", checkPincode);
// router.put("/order/cancel/:id", userAuth, cancelOrder);
// router.put("/order/status/:id", updateOrderStatus);

// /* ================= VENDOR & ADMIN ================= */
// router.get("/vendor-orders/:vendorId", getVendorOrders);
// router.get("/admin/orders", getAllOrdersForAdmin);
// router.delete("/order/:id", deleteOrder);

// module.exports = router;


































// const express = require("express");
// const router = express.Router();
// const userAuth = require("../middleware/userAuth");

// const {
//   createOrder,
//   getCustomerOrders,
//   getOrderById,
//   getMyOrders,
//   cancelOrder,
//   updateOrderStatus,
//   getVendorOrders,
//   getAllOrdersForAdmin,
//   deleteOrder,
//   parcelxWebhook,
//   getAWBLabel,
//   checkPincode
// } = require("../controllers/customerOrder.controller");

// /* ================= PUBLIC WEBHOOK (no auth needed) ================= */
// router.post("/webhook/parcelx", parcelxWebhook);

// /* ================= CUSTOMER ROUTES ================= */
// router.post("/order/create", userAuth, createOrder);
// router.get("/orders/:customerId", userAuth, getCustomerOrders);
// router.get("/my-orders", userAuth, getMyOrders);
// router.get("/order/:id", userAuth, getOrderById);
// router.get("/order/label/:awb", userAuth, getAWBLabel);
// router.get("/pincode/check", checkPincode);
// router.put("/order/cancel/:id", userAuth, cancelOrder);
// router.put("/order/status/:id", updateOrderStatus);

// /* ================= VENDOR & ADMIN ================= */
// router.get("/vendor-orders/:vendorId", getVendorOrders);
// router.get("/admin/orders", getAllOrdersForAdmin);
// router.delete("/order/:id", deleteOrder);

// module.exports = router;






// module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const vendorAuth = require("../middleware/vendorAuth");
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
  getAWBLabel
} = require("../controllers/orderController");

// Public routes
router.get("/track-awb/:awb", trackAWB);
router.get("/label/:awb", getAWBLabel);

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
router.get("/admin/all", getAllOrdersForAdmin);
router.put("/admin/:id/status", updateOrderStatus);

module.exports = router;
