const express = require("express");
const router = express.Router();

const { 
  getOrders,
  getVendorOrders,
  updateOrder,
  deleteOrder,
  getOrderHistory
} = require("../controllers/orderController");

// ADMIN
router.get("/", getOrders);

// ADMIN HISTORY
router.get("/history/all", getOrderHistory);

// VENDOR
router.get("/vendor/:vendorId", getVendorOrders);

// UPDATE
router.put("/:id", updateOrder);

// DELETE
router.delete("/:id", deleteOrder);

module.exports = router;

