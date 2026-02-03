



// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");
// const upload = require("../middleware/upload");
// const csvUpload = require("../middleware/csvUpload");
// const P = require("../controllers/vendorProductController");

// router.use(vendorAuth);

// /* ===== CATEGORY & SUBCATEGORY ROUTES ===== */
// router.get("/categories", P.getCategories);
// router.get("/subcategories/:categoryId", P.getSubCategories);

// /* ===== CRUD ===== */
// router.get("/", P.getVendorProducts);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
//     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
//     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   P.createVendorProduct
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
//   P.updateVendorProduct
// );

// router.delete("/:id", P.deleteVendorProduct);

// /* ===== CSV ===== */
// router.post(
//   "/import-csv",
//   csvUpload.single("file"),
//   P.importCSV
// );

// router.get("/export-csv", P.exportCSV);

// /* ===== BULK ===== */
// router.put("/bulk-update", P.bulkUpdate);
// router.delete("/bulk-delete", P.bulkDelete);

// module.exports = router;







const express = require("express");
const router = express.Router();

const vendorAuth = require("../middleware/vendorAuth");
const upload = require("../middleware/upload");
const csvUpload = require("../middleware/csvUpload");
const P = require("../controllers/vendorProductController");

// Apply vendor authentication to all routes
router.use(vendorAuth);

/* ================= HEALTH CHECK ================= */
router.get("/health", P.healthCheck);

/* ================= CATEGORY & SUBCATEGORY ROUTES ================= */
router.get("/categories", P.getCategories);
router.get("/subcategories", P.getSubCategories);
router.get("/subcategories/:categoryId", P.getSubCategoriesByCategory);

/* ================= PRODUCT CRUD OPERATIONS ================= */
// Get all products with pagination and filters
router.get("/", P.getVendorProducts);

// Get single product by ID
router.get("/:id", P.getSingleProduct);

// Create new product
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "ingredientsImage", maxCount: 1 },
    { name: "nutritionImage", maxCount: 1 },
    { name: "mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
    { name: "variationImages", maxCount: 10 }
  ]),
  P.createVendorProduct
);

// Update existing product
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "ingredientsImage", maxCount: 1 },
    { name: "nutritionImage", maxCount: 1 },
    { name: "mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
    { name: "variationImages", maxCount: 10 }
  ]),
  P.updateVendorProduct
);

// Delete product
router.delete("/:id", P.deleteVendorProduct);

/* ================= CSV OPERATIONS ================= */
// Import products from CSV
router.post(
  "/import-csv",
  csvUpload.single("file"),
  P.importCSV
);

// Export products to CSV
router.get("/export-csv", P.exportCSV);

/* ================= BULK OPERATIONS ================= */
// Bulk update products
router.put("/bulk-update", P.bulkUpdate);

// Bulk delete products
router.delete("/bulk-delete", P.bulkDelete);

module.exports = router;
