// module.exports = router;
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// ==================== MULTER CONFIGURATION ====================
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
  { name: 'gallery', maxCount: 9 },             // Gallery images
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

// ==================== ROUTES ====================

// Product statistics
router.get('/stats', productController.getProductStats);

// Export products as CSV
router.get('/export-csv', productController.exportCSV);

// Get all products with filters
router.get('/', productController.getAllProducts);

// Advanced search
router.get('/search/advanced', productController.advancedSearch);

// Get product by slug
router.get('/slug/:slug', productController.getProductBySlug);

// Get single product by ID
router.get('/:id', productController.getProduct);

// Create new product
router.post('/', uploadFields, handleMulterError, productController.createProduct);

// Update product
router.put('/:id', uploadFields, handleMulterError, productController.updateProduct);

// Update stock
router.patch('/:id/stock', productController.updateStock);

// Delete product
router.delete('/:id', productController.deleteProduct);

// Bulk operations
router.post('/bulk-delete', productController.bulkDeleteProducts);
router.put('/bulk-update', productController.bulkUpdateProducts);

// Import products from CSV
router.post('/import-csv', uploadMiddleware.single('file'), handleMulterError, productController.importCSV);

module.exports = router;
