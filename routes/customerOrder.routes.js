





// // const express = require("express");
// // const router = express.Router();

// // const {
// //   createOrder,
// //   getCustomerOrders,
// //   getOrderById,
// //   cancelOrder,
// //   updateOrderStatus,
// //   getVendorOrders,
// //   getAllOrdersForAdmin,
// // } = require("../controllers/customerOrder.controller");

// // router.post("/order/create", createOrder);
// // router.get("/orders/:customerId", getCustomerOrders);
// // router.get("/order/:id", getOrderById);
// // router.put("/order/cancel/:id", cancelOrder);
// // router.put("/order/status/:id", updateOrderStatus);
// // router.get("/vendor-orders/:vendorId", getVendorOrders);
// // router.get("/admin/orders", getAllOrdersForAdmin);

// // module.exports = router;










// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getCustomerOrders,
//   getOrderById,
//     getMyOrders, 
//   cancelOrder,
//   updateOrderStatus,
//   getVendorOrders,
//   getAllOrdersForAdmin,
//   deleteOrder,
// } = require("../controllers/customerOrder.controller");

// router.post("/order/create", createOrder);
// router.get("/orders/:customerId", getCustomerOrders);
// router.get("/my-orders", customerAuth, getMyOrders);
// router.get("/order/:id", getOrderById);
// router.put("/order/cancel/:id", cancelOrder);
// router.put("/order/status/:id", updateOrderStatus);
// // router.put("/order/status/:id", updateOrderStatus);
// router.get("/vendor-orders/:vendorId", getVendorOrders);
// router.get("/admin/orders", getAllOrdersForAdmin);
// router.delete("/order/:id", deleteOrder);

// module.exports = router;

const express = require("express");
const router = express.Router();

const userAuth = require("../middleware/userAuth"); // ✅ USE THIS

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

router.post("/order/create", createOrder);
router.get("/orders/:customerId", getCustomerOrders);

// 🔐 LOGGED-IN USER ORDERS
router.get("/my-orders", userAuth, getMyOrders);

router.get("/order/:id", getOrderById);
router.put("/order/cancel/:id", cancelOrder);
router.put("/order/status/:id", updateOrderStatus);

router.get("/vendor-orders/:vendorId", getVendorOrders);
router.get("/admin/orders", getAllOrdersForAdmin);
router.delete("/order/:id", deleteOrder);

module.exports = router;

