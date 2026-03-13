const express = require("express");
const router = express.Router();
const vendorAuth = require("../middleware/vendorAuth");

const {
  getVendorOrders,
  getVendorOrderById,
  updateVendorOrderStatus,
  getVendorOrderStats,
  createVendorOrder,
} = require("../controllers/vendorOrderController");

router.use(vendorAuth);

router.get("/", getVendorOrders);
router.get("/stats", getVendorOrderStats);
router.get("/:id", getVendorOrderById);
router.put("/:id/status", updateVendorOrderStatus);
router.post("/create", createVendorOrder);

module.exports = router;




