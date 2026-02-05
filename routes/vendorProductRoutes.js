

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

// /* ===== CRUD OPERATIONS ===== */
// router.get("/", vendorProductController.getVendorProducts);
// router.get("/:id", vendorProductController.getVendorProduct);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
//     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
//     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
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
//     { name: "gallery", maxCount: 10 },
//   ]),
//   vendorProductController.updateVendorProduct
// );

// // Update product status
// router.patch("/:id/status", vendorProductController.updateProductStatus);

// router.delete("/:id", vendorProductController.deleteVendorProduct);

// /* ===== VARIATION OPERATIONS ===== */
// router.post("/:id/variations", vendorProductController.addVariation);
// router.put("/:id/variations/:variationId", vendorProductController.updateVariation);
// router.delete("/:id/variations/:variationId", vendorProductController.deleteVariation);

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
router.get("/subcategories", vendorProductController.getSubCategories); // Changed from /subcategories/:categoryId

/* ===== CRUD OPERATIONS ===== */
router.get("/", vendorProductController.getVendorProducts);
router.get("/:id", vendorProductController.getVendorProduct);

// Create product with images
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 }, // Main image
    { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
    { name: "mandatoryImages.nutritionImage", maxCount: 1 },
    { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 }, // Additional gallery images
  ]),
  vendorProductController.createVendorProduct
);

// Update product with images
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
router.post("/bulk-delete", vendorProductController.bulkDelete);

module.exports = router;
