// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getVendorOrders,
// //   updateVendorOrder,
// //   deleteVendorOrder,
// // } = require("../controllers/vendorOrderController");

// // // VENDOR ORDERS
// // router.get("/vendor/:vendorId", getVendorOrders);

// // // UPDATE ORDER
// // router.put("/:id", updateVendorOrder);

// // // DELETE ORDER (Vendor products only)
// // router.delete("/:id/:vendorId", deleteVendorOrder);

// // module.exports = router;






// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getOrders,
// //   getVendorOrders,
// //   createOrder,
// //   updateOrder,
// //   deleteOrder,
// // } = require("../controllers/vendorOrderController");

// // // ADMIN orders
// // router.get("/", getOrders);

// // // VENDOR orders
// // router.get("/vendor/:vendorId", getVendorOrders);

// // // CREATE order
// // router.post("/", createOrder);

// // // UPDATE order
// // router.put("/:id", updateOrder);

// // // DELETE order
// // router.delete("/:id", deleteOrder);

// // module.exports = router;






// const express = require("express");
// const router = express.Router();
// const vendorAuth = require("../middleware/vendorAuth");
// const {
//   getVendorOrders,
//   createOrder,
//   updateOrder,
//   deleteOrder,
// } = require("../controllers/vendorOrderController");

// // Vendor: Get only vendor's orders
// router.get("/vendor/:vendorId", vendorAuth, getVendorOrders);

// // Create new order
// router.post("/", vendorAuth, createOrder);

// // Update order
// router.put("/:id", vendorAuth, updateOrder);

// // Delete order
// router.delete("/:id", vendorAuth, deleteOrder);

// module.exports = router;






// const express = require("express");
// const router = express.Router();
// const vendorAuth = require("../middleware/vendorAuth");
// const {
//   createOrder,
//   getVendorOrders,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
// } = require("../controllers/vendorOrderController");

// /* WEBSITE / ADMIN */
// router.post("/", createOrder); // 🔓 website se order add

// /* VENDOR PANEL */
// router.get("/my", vendorAuth, getVendorOrders);
// router.get("/:id", vendorAuth, getOrderById);
// router.put("/:id", vendorAuth, updateOrder);
// router.delete("/:id", vendorAuth, deleteOrder);

// module.exports = router;














const express = require("express");
const router = express.Router();

const vendorAuth = require("../middleware/vendorAuth");
const upload = require("../middleware/upload");
const csvUpload = require("../middleware/csvUpload");
const P = require("../controllers/vendorProductController");

router.use(vendorAuth);

/* ===== CRUD ===== */
router.get("/", P.getVendorProducts);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  P.createVendorProduct
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  P.updateVendorProduct
);

router.delete("/:id", P.deleteVendorProduct);

/* ===== CSV ===== */
router.post(
  "/import-csv",
  csvUpload.single("file"), // 🔥 FIXED
  P.importCSV
);

router.get("/export-csv", P.exportCSV);

/* ===== BULK ===== */
router.put("/bulk-update", P.bulkUpdate);
router.delete("/bulk-delete", P.bulkDelete);

module.exports = router;
