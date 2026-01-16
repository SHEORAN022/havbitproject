
// const express = require("express");
// const router = express.Router();
// const { createOrder, getCustomerOrders, getVendorOrders } = require("../controllers/customerOrder.controller");

// // Customer
// router.post("/order/create", createOrder);
// router.get("/orders/:customerId", getCustomerOrders);

// // Vendor
// router.get("/vendor-orders/:vendorId", getVendorOrders);

// module.exports = router;






const express = require("express");
const router = express.Router();

const {
  createOrder,
  getCustomerOrders,
  getOrderById,
  cancelOrder,
  getVendorOrders,
} = require("../controllers/customerOrder.controller");

router.post("/order/create", createOrder);

router.get("/orders/:customerId", getCustomerOrders);

router.get("/order/:id", getOrderById);

router.put("/order/cancel/:id", cancelOrder);

router.get("/vendor-orders/:vendorId", getVendorOrders);

module.exports = router;