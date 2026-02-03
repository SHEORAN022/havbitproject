

// const router = require("express").Router();
// const upload = require("../middleware/upload");

// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   bulkDelete,
//   bulkUpdate,
// } = require("../controllers/productController");

// router.get("/", getProducts);
// router.get("/:id", getProductById);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
//     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
//     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   addProduct
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
//   updateProduct
// );

// router.delete("/:id", deleteProduct);
// router.post("/bulk-delete", bulkDelete);
// router.put("/bulk-update", bulkUpdate);

// module.exports = router;




const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// ==================== MULTER CONFIGURATION ====================
// Configure multer for memory storage
const storage = multer.memoryStorage();

const uploadMiddleware = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 30 // Maximum 30 files
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  }
});

// File upload configuration for product form
const uploadFields = uploadMiddleware.fields([
  { name: 'image', maxCount: 1 },               // Main product image
  { name: 'gallery', maxCount: 9 },             // Gallery images (3 mandatory + 6 optional)
  { name: 'variationImages', maxCount: 20 }     // Variation-specific images
]);

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

router.get('/stats', productController.getProductStats);

router.get('/export-csv', productController.exportCSV);


router.get('/', productController.getAllProducts);


router.get('/:id', productController.getProduct);


router.post('/', uploadFields, handleMulterError, productController.createProduct);


router.put('/:id', uploadFields, handleMulterError, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);


router.post('/bulk-delete', productController.bulkDeleteProducts);


router.put('/bulk-update', productController.bulkUpdateProducts);


router.post('/import-csv', uploadMiddleware.single('file'), handleMulterError, productController.importCSV);

module.exports = router;


