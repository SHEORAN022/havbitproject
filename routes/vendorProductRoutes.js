const express = require("express");
const router = express.Router();
const vendorAuth = require("../middleware/vendorAuth");
const vendorProductController = require("../controllers/vendorProductController");

// Multer setup for file uploads
const multer = require('multer');
const storage = multer.memoryStorage();

const uploadMiddleware = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 30 // Maximum 30 files
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  }
});

// File upload configuration
const uploadFields = uploadMiddleware.fields([
  { name: 'image', maxCount: 1 },
  { name: 'mandatoryImages.ingredientsImage', maxCount: 1 },
  { name: 'mandatoryImages.nutritionImage', maxCount: 1 },
  { name: 'mandatoryImages.mfgExpImage', maxCount: 1 },
  { name: 'gallery', maxCount: 9 },
  { name: 'variationImages', maxCount: 20 }
]);

// CSV upload
const csvUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 10MB limit'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files uploaded'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  next();
};

// Apply vendor authentication to all routes
router.use(vendorAuth);

/* ===== CATEGORY & SUBCATEGORY ROUTES ===== */
router.get("/categories", vendorProductController.getCategories);
router.get("/subcategories/:categoryId", vendorProductController.getSubCategories);

/* ===== CRUD OPERATIONS ===== */
router.get("/", vendorProductController.getVendorProducts);
router.get("/:id", vendorProductController.getVendorProduct);

// Create product with file upload
router.post(
  "/",
  uploadFields,
  handleMulterError,
  vendorProductController.createVendorProduct
);

// Update product with file upload
router.put(
  "/:id",
  uploadFields,
  handleMulterError,
  vendorProductController.updateVendorProduct
);

// Update product status
router.patch("/:id/status", vendorProductController.updateProductStatus);

// Delete product
router.delete("/:id", vendorProductController.deleteVendorProduct);

/* ===== VARIATION OPERATIONS ===== */
router.post("/:id/variations", vendorProductController.addVariation);
router.put("/:id/variations/:variationId", vendorProductController.updateVariation);
router.delete("/:id/variations/:variationId", vendorProductController.deleteVariation);

/* ===== CSV OPERATIONS ===== */
router.post(
  "/import-csv",
  csvUpload.single("file"),
  handleMulterError,
  vendorProductController.importCSV
);

router.get("/export-csv", vendorProductController.exportCSV);

/* ===== BULK OPERATIONS ===== */
router.put("/bulk-update", vendorProductController.bulkUpdate);
router.delete("/bulk-delete", vendorProductController.bulkDelete);

module.exports = router;
