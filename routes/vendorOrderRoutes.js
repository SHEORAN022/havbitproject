
// const express = require("express");
// const router = express.Router();
// const vendorAuth = require("../middleware/vendorAuth");

// const {
//   getVendorOrders,
//   getVendorOrderById,
//   updateVendorOrderStatus,
//   getVendorOrderStats,
//   // ❌ REMOVE createVendorOrder from here
// } = require("../controllers/vendorOrderController");

// router.use(vendorAuth);

// router.get("/", getVendorOrders);
// router.get("/stats", getVendorOrderStats);
// router.get("/:id", getVendorOrderById);
// router.put("/:id/status", updateVendorOrderStatus);
// // ❌ REMOVE this line if you don't need it
// // router.post("/create", createVendorOrder);

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const vendorAuth = require("../middleware/vendorAuth");

// const {
//   getVendorOrders,
//   getVendorOrderById,
//   updateVendorOrderStatus,
//   getVendorOrderStats,
//   cancelVendorOrder
// } = require("../controllers/vendorOrderController");

// router.use(vendorAuth);

// router.get("/", getVendorOrders);
// router.get("/stats", getVendorOrderStats);
// router.get("/:id", getVendorOrderById);
// router.put("/:id/status", updateVendorOrderStatus);
// router.put("/:id/cancel", cancelVendorOrder);

// module.exports = router;




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


