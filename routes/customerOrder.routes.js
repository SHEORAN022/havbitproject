// // // const express = require("express");
// // // const router = express.Router();
// // // const auth = require("../middleware/auth");
// // // const vendorAuth = require("../middleware/vendorAuth");
// // // const adminAuth = require("../middleware/adminAuth");
// // // const {
// // //   createOrder,
// // //   getOrderById,
// // //   getOrderTracking,
// // //   getCustomerOrders,
// // //   cancelOrder,
// // //   getAllOrdersForAdmin,
// // //   updateOrderStatus,
// // //   getMyOrders,
// // //   trackAWB,
// // //   getAWBLabel,
// // //   parcelxWebhook,
// // //   checkPincode
// // // } = require("../controllers/orderController");

// // // // Public routes
// // // router.get("/track-awb/:awb", trackAWB);
// // // router.get("/label/:awb", getAWBLabel);
// // // router.get("/pincode/check", checkPincode);

// // // // Public webhook (no auth needed)
// // // router.post("/webhook/parcelx", parcelxWebhook);

// // // // Customer routes (requires auth)
// // // router.use(auth);
// // // router.post("/create", createOrder);
// // // router.get("/my-orders", getMyOrders);
// // // router.get("/:id", getOrderById);
// // // router.get("/:orderId/tracking", getOrderTracking);
// // // router.put("/:id/cancel", cancelOrder);

// // // // Vendor routes
// // // router.get("/vendor/customer/:customerId", vendorAuth, getCustomerOrders);

// // // // Admin routes
// // // router.get("/admin/all", adminAuth, getAllOrdersForAdmin);
// // // router.put("/admin/:id/status", adminAuth, updateOrderStatus);

// // // module.exports = router;



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
