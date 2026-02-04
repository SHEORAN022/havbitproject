// // const express = require("express");
// // const router = express.Router();

// // const vendorAuth = require("../middleware/vendorAuth");

// // const {
// //   getVendorOrders,
// //   getVendorOrderById,
// //   updateVendorOrderStatus,
// //   getVendorOrderStats,
// // } = require("../controllers/vendorOrderController");

// // router.use(vendorAuth);

// // /* ================= VENDOR ORDERS ================= */
// // router.get("/", getVendorOrders);              // all vendor orders
// // router.get("/stats", getVendorOrderStats);     // stats
// // router.get("/:id", getVendorOrderById);        // single order
// // router.put("/:id/status", updateVendorOrderStatus); // update status

// // module.exports = router;






// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");

// const {
//   getVendorOrders,
//   getVendorOrderById,
//   updateVendorOrderStatus,
//   getVendorOrderStats,
//   createVendorOrder,
// } = require("../controllers/vendorOrderController");

// router.use(vendorAuth);

// /* ================= VENDOR ORDERS ================= */
// router.get("/", getVendorOrders);              // all vendor orders
// router.get("/stats", getVendorOrderStats);     // stats
// router.get("/:id", getVendorOrderById);        // single order
// router.put("/:id/status", updateVendorOrderStatus); // update status
// router.post("/create", createVendorOrder);

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

