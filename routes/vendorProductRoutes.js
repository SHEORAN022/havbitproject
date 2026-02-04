



// // const express = require("express");
// // const router = express.Router();

// // const vendorAuth = require("../middleware/vendorAuth");
// // const upload = require("../middleware/upload");
// // const csvUpload = require("../middleware/csvUpload");
// // const P = require("../controllers/vendorProductController");

// // router.use(vendorAuth);

// // /* ===== CATEGORY & SUBCATEGORY ROUTES ===== */
// // router.get("/categories", P.getCategories);
// // router.get("/subcategories/:categoryId", P.getSubCategories);

// // /* ===== CRUD ===== */
// // router.get("/", P.getVendorProducts);

// // router.post(
// //   "/",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
// //     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
// //     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //   ]),
// //   P.createVendorProduct
// // );

// // router.put(
// //   "/:id",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
// //     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
// //     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //   ]),
// //   P.updateVendorProduct
// // );

// // router.delete("/:id", P.deleteVendorProduct);

// // /* ===== CSV ===== */
// // router.post(
// //   "/import-csv",
// //   csvUpload.single("file"),
// //   P.importCSV
// // );

// // router.get("/export-csv", P.exportCSV);

// // /* ===== BULK ===== */
// // router.put("/bulk-update", P.bulkUpdate);
// // router.delete("/bulk-delete", P.bulkDelete);

// // module.exports = router;







// // const express = require("express");
// // const router = express.Router();

// // const vendorAuth = require("../middleware/vendorAuth");
// // const upload = require("../middleware/upload");
// // const csvUpload = require("../middleware/csvUpload");
// // const P = require("../controllers/vendorProductController");

// // // Apply vendor authentication to all routes
// // router.use(vendorAuth);

// // /* ================= HEALTH CHECK ================= */
// // router.get("/health", P.healthCheck);

// // /* ================= CATEGORY & SUBCATEGORY ROUTES ================= */
// // router.get("/categories", P.getCategories);
// // router.get("/subcategories", P.getSubCategories);
// // router.get("/subcategories/:categoryId", P.getSubCategoriesByCategory);

// // /* ================= PRODUCT CRUD OPERATIONS ================= */
// // // Get all products with pagination and filters
// // router.get("/", P.getVendorProducts);

// // // Get single product by ID
// // router.get("/:id", P.getSingleProduct);

// // // Create new product
// // router.post(
// //   "/",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "ingredientsImage", maxCount: 1 },
// //     { name: "nutritionImage", maxCount: 1 },
// //     { name: "mfgExpImage", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //     { name: "variationImages", maxCount: 10 }
// //   ]),
// //   P.createVendorProduct
// // );

// // // Update existing product
// // router.put(
// //   "/:id",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "ingredientsImage", maxCount: 1 },
// //     { name: "nutritionImage", maxCount: 1 },
// //     { name: "mfgExpImage", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //     { name: "variationImages", maxCount: 10 }
// //   ]),
// //   P.updateVendorProduct
// // );

// // // Delete product
// // router.delete("/:id", P.deleteVendorProduct);

// // /* ================= CSV OPERATIONS ================= */
// // // Import products from CSV
// // router.post(
// //   "/import-csv",
// //   csvUpload.single("file"),
// //   P.importCSV
// // );

// // // Export products to CSV
// // router.get("/export-csv", P.exportCSV);

// // /* ================= BULK OPERATIONS ================= */
// // // Bulk update products
// // router.put("/bulk-update", P.bulkUpdate);

// // // Bulk delete products
// // router.delete("/bulk-delete", P.bulkDelete);

// // module.exports = router;




// // const express = require("express");
// // const router = express.Router();

// // const vendorAuth = require("../middleware/vendorAuth");
// // const upload = require("../middleware/upload");
// // const csvUpload = require("../middleware/csvUpload");
// // const P = require("../controllers/vendorProductController");

// // router.use(vendorAuth);

// // /* ===== CATEGORY & SUBCATEGORY ROUTES ===== */
// // router.get("/categories", P.getCategories);
// // router.get("/subcategories/:categoryId", P.getSubCategories);

// // /* ===== CRUD ===== */
// // router.get("/", P.getVendorProducts);

// // router.post(
// //   "/",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
// //     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
// //     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //   ]),
// //   P.createVendorProduct
// // );

// // router.put(
// //   "/:id",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
// //     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
// //     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //   ]),
// //   P.updateVendorProduct
// // );

// // router.delete("/:id", P.deleteVendorProduct);

// // /* ===== CSV ===== */
// // router.post(
// //   "/import-csv",
// //   csvUpload.single("file"),
// //   P.importCSV
// // );

// // router.get("/export-csv", P.exportCSV);

// // /* ===== BULK ===== */
// // router.put("/bulk-update", P.bulkUpdate);
// // router.delete("/bulk-delete", P.bulkDelete);

// // module.exports = router;






// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// // const vendorAuth = require("../middleware/vendorAuth");
// // const upload = require("../middleware/upload");
// // const csvUpload = require("../middleware/csvUpload");
// // const vendorProductController = require("../controllers/vendorProductController");

// // // Apply vendor authentication to all routes
// // router.use(vendorAuth);

// // /* ===== CATEGORY & SUBCATEGORY ROUTES ===== */
// // router.get("/categories", vendorProductController.getCategories);
// // router.get("/subcategories/:categoryId", vendorProductController.getSubCategories);

// // /* ===== CRUD OPERATIONS ===== */
// // router.get("/", vendorProductController.getVendorProducts);
// // router.get("/:id", vendorProductController.getVendorProducts);

// // router.post(
// //   "/",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
// //     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
// //     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //   ]),
// //   vendorProductController.createVendorProduct
// // );

// // router.put(
// //   "/:id",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
// //     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
// //     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //   ]),
// //   vendorProductController.updateVendorProduct
// // );

// // // Update product status
// // router.patch("/:id/status", vendorProductController.updateProductStatus);

// // router.delete("/:id", vendorProductController.deleteVendorProduct);

// // /* ===== CSV OPERATIONS ===== */
// // router.post(
// //   "/import-csv",
// //   csvUpload.single("file"),
// //   vendorProductController.importCSV
// // );

// // router.get("/export-csv", vendorProductController.exportCSV);

// // /* ===== BULK OPERATIONS ===== */
// // router.put("/bulk-update", vendorProductController.bulkUpdate);
// // router.delete("/bulk-delete", vendorProductController.bulkDelete);

// // module.exports = router;




// const express = require("express");
// const router = express.Router();
// const vendorAuth = require("../middleware/vendorAuth");
// const upload = require("../middleware/upload");
// const csvUpload = require("../middleware/csvUpload");
// const vendorProductController = require("../controllers/vendorProductController");

// // Apply vendor authentication to all routes
// router.use(vendorAuth);

// /* ===== CATEGORY & SUBCATEGORY ROUTES ===== */
// router.get("/categories", vendorProductController.getCategories);
// router.get("/subcategories/:categoryId", vendorProductController.getSubCategories);

// /* ===== PRODUCT CRUD OPERATIONS ===== */
// router.get("/", vendorProductController.getVendorProducts);
// router.get("/deleted", vendorProductController.getDeletedProducts);
// router.get("/search", vendorProductController.searchProducts);
// router.get("/low-stock", vendorProductController.getLowStockProducts);
// router.get("/out-of-stock", vendorProductController.getOutOfStockProducts);
// router.get("/category/:categoryId", vendorProductController.getProductsByCategory);
// router.get("/:id", vendorProductController.getVendorProduct);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
//     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
//     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
//     { name: "gallery", maxCount: 20 },
//     { name: "documents", maxCount: 10 },
//     // Dynamic variation fields will be handled in controller
//   ]),
//   vendorProductController.createVendorProduct
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
//     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
//     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
//     { name: "gallery", maxCount: 20 },
//     { name: "documents", maxCount: 10 },
//     // Dynamic variation fields will be handled in controller
//   ]),
//   vendorProductController.updateVendorProduct
// );

// // Product status operations
// router.patch("/:id/status", vendorProductController.updateProductStatus);
// router.patch("/:id/approval-status", vendorProductController.updateApprovalStatus);
// router.patch("/:id/stock", vendorProductController.updateStock);

// // Delete operations
// router.delete("/:id", vendorProductController.deleteVendorProduct);
// router.delete("/:id/hard", vendorProductController.hardDeleteVendorProduct);
// router.patch("/:id/restore", vendorProductController.restoreVendorProduct);

// /* ===== VARIATION OPERATIONS ===== */
// router.post("/:id/variations", 
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "gallery", maxCount: 10 }
//   ]),
//   vendorProductController.addVariation
// );

// router.put("/:id/variations/:variationId",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "gallery", maxCount: 10 }
//   ]),
//   vendorProductController.updateVariation
// );

// router.delete("/:id/variations/:variationId", vendorProductController.deleteVariation);
// router.patch("/:id/variations/:variationId/status", vendorProductController.updateVariationStatus);
// router.patch("/:id/variations/:variationId/stock", vendorProductController.updateVariationStock);
// router.patch("/:id/variations/:variationId/default", vendorProductController.setDefaultVariation);

// /* ===== CSV OPERATIONS ===== */
// router.post(
//   "/import-csv",
//   csvUpload.single("file"),
//   vendorProductController.importCSV
// );

// router.get("/export-csv", vendorProductController.exportCSV);

// /* ===== BULK OPERATIONS ===== */
// router.put("/bulk-update", vendorProductController.bulkUpdate);
// router.delete("/bulk-delete", vendorProductController.bulkDelete);
// router.delete("/bulk-hard-delete", vendorProductController.bulkHardDelete);
// router.patch("/bulk-restore", vendorProductController.bulkRestore);

// /* ===== STATISTICS & ANALYTICS ===== */
// router.get("/stats/summary", vendorProductController.getProductStatistics);

// module.exports = router;



const express = require("express");
const router = express.Router();
const vendorAuth = require("../middleware/vendorAuth");
const upload = require("../middleware/upload");
const csvUpload = require("../middleware/csvUpload");
const vendorProductController = require("../controllers/vendorProductController");

// Apply vendor authentication to all routes
router.use(vendorAuth);

/* ===== CATEGORY & SUBCATEGORY ROUTES ===== */
router.get("/categories", vendorProductController.getCategories);
router.get("/subcategories/:categoryId", vendorProductController.getSubCategories);

/* ===== CRUD OPERATIONS ===== */
router.get("/", vendorProductController.getVendorProducts);
router.get("/:id", vendorProductController.getVendorProduct);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
    { name: "mandatoryImages.nutritionImage", maxCount: 1 },
    { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  vendorProductController.createVendorProduct
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
    { name: "mandatoryImages.nutritionImage", maxCount: 1 },
    { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  vendorProductController.updateVendorProduct
);

// Update product status
router.patch("/:id/status", vendorProductController.updateProductStatus);

router.delete("/:id", vendorProductController.deleteVendorProduct);

/* ===== VARIATION OPERATIONS ===== */
router.post("/:id/variations", vendorProductController.addVariation);
router.put("/:id/variations/:variationId", vendorProductController.updateVariation);
router.delete("/:id/variations/:variationId", vendorProductController.deleteVariation);

/* ===== CSV OPERATIONS ===== */
router.post(
  "/import-csv",
  csvUpload.single("file"),
  vendorProductController.importCSV
);

router.get("/export-csv", vendorProductController.exportCSV);

/* ===== BULK OPERATIONS ===== */
router.put("/bulk-update", vendorProductController.bulkUpdate);
router.delete("/bulk-delete", vendorProductController.bulkDelete);

module.exports = router;
