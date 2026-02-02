


// // routes/vendorOrderRoutes.js
// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");
// const {
//   getVendorOrders,
//   getVendorOrderById,
//   updateVendorOrderStatus,
//   getVendorOrderStats,
// } = require("../controllers/vendorOrderController");

// router.use(vendorAuth);

// router.get("/", getVendorOrders);
// router.get("/stats", getVendorOrderStats);
// router.get("/:id", getVendorOrderById);
// router.put("/:id/status", updateVendorOrderStatus);

// module.exports = router;








// routes/vendorOrderRoutes.js
const express = require("express");
const router = express.Router();

const vendorAuth = require("../middleware/vendorAuth");
const {
  getVendorOrders,
  getVendorOrderById,
  updateVendorOrderStatus,
  getVendorSingleProduct,
  getVendorOrderStats,
} = require("../controllers/vendorOrderController");

router.use(vendorAuth);

router.get("/", getVendorOrders);
router.get("/stats", getVendorOrderStats);
router.get("/:id", getVendorOrderById);
router.put("/:id/status", updateVendorOrderStatus);
router.get("/:orderId", getVendorSingleProduct);


module.exports = router;

