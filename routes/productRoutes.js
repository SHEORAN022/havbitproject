


// // // const express = require('express');
// // // const router = express.Router();
// // // const productController = require('../controllers/productController');
// // // const multer = require('multer');

// // // // ==================== MULTER CONFIGURATION ====================
// // // // Configure multer for memory storage
// // // const storage = multer.memoryStorage();

// // // const uploadMiddleware = multer({ 
// // //   storage: storage,
// // //   limits: {
// // //     fileSize: 10 * 1024 * 1024, // 10MB limit per file
// // //     files: 30 // Maximum 30 files
// // //   },
// // //   fileFilter: (req, file, cb) => {
// // //     // Accept images only
// // //     if (!file.mimetype.startsWith('image/')) {
// // //       return cb(new Error('Only image files are allowed'), false);
// // //     }
// // //     cb(null, true);
// // //   }
// // // });

// // // // File upload configuration for product form
// // // const uploadFields = uploadMiddleware.fields([
// // //   { name: 'image', maxCount: 1 },               // Main product image
// // //   { name: 'gallery', maxCount: 9 },             // Gallery images (3 mandatory + 6 optional)
// // //   { name: 'variationImages', maxCount: 20 }     // Variation-specific images
// // // ]);

// // // // Error handling middleware for multer
// // // const handleMulterError = (err, req, res, next) => {
// // //   if (err instanceof multer.MulterError) {
// // //     if (err.code === 'LIMIT_FILE_SIZE') {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'File size exceeds 10MB limit'
// // //       });
// // //     }
// // //     if (err.code === 'LIMIT_FILE_COUNT') {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Too many files uploaded'
// // //       });
// // //     }
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: err.message
// // //     });
// // //   }
  
// // //   if (err) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: err.message
// // //     });
// // //   }
  
// // //   next();
// // // };

// // // router.get('/stats', productController.getProductStats);

// // // router.get('/export-csv', productController.exportCSV);


// // // router.get('/', productController.getAllProducts);


// // // router.get('/:id', productController.getProduct);


// // // router.post('/', uploadFields, handleMulterError, productController.createProduct);


// // // router.put('/:id', uploadFields, handleMulterError, productController.updateProduct);

// // // router.delete('/:id', productController.deleteProduct);


// // // router.post('/bulk-delete', productController.bulkDeleteProducts);


// // // router.put('/bulk-update', productController.bulkUpdateProducts);


// // // router.post('/import-csv', uploadMiddleware.single('file'), handleMulterError, productController.importCSV);

// // // module.exports = router;








// // // module.exports = router;
// // const express = require('express');
// // const router = express.Router();
// // const productController = require('../controllers/productController');
// // const multer = require('multer');

// // // ==================== MULTER CONFIGURATION ====================
// // const storage = multer.memoryStorage();

// // const uploadMiddleware = multer({ 
// //   storage: storage,
// //   limits: {
// //     fileSize: 10 * 1024 * 1024, // 10MB limit per file
// //     files: 30 // Maximum 30 files
// //   },
// //   fileFilter: (req, file, cb) => {
// //     // Accept images only
// //     if (!file.mimetype.startsWith('image/')) {
// //       return cb(new Error('Only image files are allowed'), false);
// //     }
// //     cb(null, true);
// //   }
// // });

// // // File upload configuration for product form
// // const uploadFields = uploadMiddleware.fields([
// //   { name: 'image', maxCount: 1 },               // Main product image
// //   { name: 'gallery', maxCount: 9 },             // Gallery images
// //   { name: 'variationImages', maxCount: 20 }     // Variation-specific images
// // ]);

// // // Error handling middleware for multer
// // const handleMulterError = (err, req, res, next) => {
// //   if (err instanceof multer.MulterError) {
// //     if (err.code === 'LIMIT_FILE_SIZE') {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'File size exceeds 10MB limit'
// //       });
// //     }
// //     if (err.code === 'LIMIT_FILE_COUNT') {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Too many files uploaded'
// //       });
// //     }
// //     return res.status(400).json({
// //       success: false,
// //       message: err.message
// //     });
// //   }
  
// //   if (err) {
// //     return res.status(400).json({
// //       success: false,
// //       message: err.message
// //     });
// //   }
  
// //   next();
// // };

// // // ==================== ROUTES ====================

// // // Stats route
// // router.get('/stats', productController.getProductStats);

// // // Export CSV route
// // router.get('/export-csv', productController.exportCSV);

// // // Get all products route
// // router.get('/', productController.getAllProducts);

// // // Get single product by ID route
// // router.get('/:id', productController.getProduct);

// // // Get product by slug route
// // router.get('/slug/:slug', productController.getProductBySlug);

// // // Create product route
// // router.post('/', uploadFields, handleMulterError, productController.createProduct);

// // // Update product route
// // router.put('/:id', uploadFields, handleMulterError, productController.updateProduct);

// // // Delete product route
// // router.delete('/:id', productController.deleteProduct);

// // // Bulk delete route
// // router.post('/bulk-delete', productController.bulkDeleteProducts);

// // // Bulk update route
// // router.put('/bulk-update', productController.bulkUpdateProducts);

// // // Import CSV route
// // router.post('/import-csv', uploadMiddleware.single('file'), handleMulterError, productController.importCSV);

// // // Advanced search route
// // router.get('/search/advanced', productController.advancedSearch);

// // module.exports = router;




// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const multer = require('multer');

// // ==================== MULTER CONFIGURATION ====================
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit per file
//     files: 30 // Maximum 30 files
//   },
//   fileFilter: (req, file, cb) => {
//     // Accept images only
//     if (!file.mimetype.startsWith('image/')) {
//       return cb(new Error('Only image files are allowed'), false);
//     }
//     cb(null, true);
//   }
// });

// // File upload configuration
// const uploadFields = upload.fields([
//   { name: 'image', maxCount: 1 },
//   { name: 'gallery', maxCount: 9 },
//   { name: 'variationImages', maxCount: 20 }
// ]);

// // Error handling for multer
// const handleMulterError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         success: false,
//         message: 'File size exceeds 10MB limit'
//       });
//     }
//     if (err.code === 'LIMIT_FILE_COUNT') {
//       return res.status(400).json({
//         success: false,
//         message: 'Too many files uploaded'
//       });
//     }
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
  
//   if (err) {
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
  
//   next();
// };

// // ==================== ROUTES ====================

// // Get product stats
// router.get('/stats', productController.getProductStats);

// // Export CSV
// router.get('/export-csv', productController.exportCSV);

// // Get all products
// router.get('/', productController.getAllProducts);

// // Get single product
// router.get('/:id', productController.getProduct);

// // Create product (with file upload)
// router.post('/', uploadFields, handleMulterError, productController.createProduct);

// // Update product (with file upload)
// router.put('/:id', uploadFields, handleMulterError, productController.updateProduct);

// // Delete product
// router.delete('/:id', productController.deleteProduct);

// // Bulk delete products
// router.delete('/bulk/delete', productController.bulkDeleteProducts);

// // Import CSV
// router.post('/import-csv', upload.single('file'), handleMulterError, productController.importCSV);

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
