

// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");
// const upload = require("../middleware/upload");
// const csvUpload = require("../middleware/csvUpload");
// const P = require("../controllers/vendorProductController");

// router.use(vendorAuth);

// /* ===== CRUD ===== */
// router.get("/", P.getVendorProducts);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   P.createVendorProduct
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   P.updateVendorProduct
// );

// router.delete("/:id", P.deleteVendorProduct);

// /* ===== CSV ===== */
// router.post(
//   "/import-csv",
//   csvUpload.single("file"), // 🔥 FIXED
//   P.importCSV
// );

// router.get("/export-csv", P.exportCSV);

// /* ===== BULK ===== */
// router.put("/bulk-update", P.bulkUpdate);
// router.delete("/bulk-delete", P.bulkDelete);

// module.exports = router;








// // routes/vendorOrderRoutes.js
// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");
// const {
//   getVendorOrders,
//   getOrderById,
//   updateOrderStatus,
//   getOrderStats
// } = require("../controllers/vendorOrderController");

// // All routes require vendor authentication
// router.use(vendorAuth);

// // Get all orders for this vendor
// router.get("/", getVendorOrders);

// // Get order stats
// router.get("/stats", getOrderStats);

// // Get single order by ID
// router.get("/:id", getOrderById);

// // Update order status (shipping, etc.)
// router.put("/:id/status", updateOrderStatus);

// module.exports = router;





// routes/vendorOrderRoutes.js
const express = require("express");
const router = express.Router();

const vendorAuth = require("../middleware/vendorAuth");
const {
  getVendorOrders,
  getVendorOrderById,
  updateVendorOrderStatus,
  getVendorOrderStats,
} = require("../controllers/vendorOrderController");

router.use(vendorAuth);

router.get("/", getVendorOrders);
router.get("/stats", getVendorOrderStats);
router.get("/:id", getVendorOrderById);
router.put("/:id/status", updateVendorOrderStatus);

module.exports = router;
