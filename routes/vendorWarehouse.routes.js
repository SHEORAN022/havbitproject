// // const express = require('express');
// // const router = express.Router();
// // const vendorAuth = require('../middleware/vendorAuth');
// // const {
// //   setupWarehouse,
// //   getWarehouseInfo,
// //   updateWarehouse,
// //   testParcelXConnection
// // } = require('../controllers/vendorWarehouse.controller');

// // // All routes require vendor authentication
// // router.use(vendorAuth);

// // // Setup vendor warehouse
// // router.post('/setup', setupWarehouse);

// // // Get warehouse info
// // router.get('/info', getWarehouseInfo);

// // // Update warehouse
// // router.put('/update', updateWarehouse);

// // // Test ParcelX connection
// // router.get('/test-connection', testParcelXConnection);

// // module.exports = router;



// const express = require('express');
// const router = express.Router();
// const vendorAuth = require('../middleware/vendorAuth');
// const {
//   setupWarehouse,
//   getWarehouseInfo,
//   updateWarehouse,
//   testParcelXConnection,
//   getAllVendorsWarehouseStatus,
//   deleteWarehouse
// } = require('../controllers/vendorWarehouse.controller');

// // All routes require vendor authentication
// router.use(vendorAuth);

// // Setup vendor warehouse
// router.post('/setup', setupWarehouse);

// // Get warehouse info
// router.get('/info', getWarehouseInfo);

// // Update warehouse
// router.put('/update', updateWarehouse);

// // Delete warehouse
// router.delete('/delete', deleteWarehouse);

// // Test ParcelX connection
// router.get('/test-connection', testParcelXConnection);

// // Admin: Get all vendors warehouse status
// router.get('/admin/all-status', getAllVendorsWarehouseStatus);

// module.exports = router;
const express = require('express');
const router = express.Router();
const vendorAuth = require('../middleware/vendorAuth');
const adminAuth = require('../middleware/adminAuth');
const {
  setupWarehouse,
  getWarehouseInfo,
  updateWarehouse,
  testParcelXConnection,
  getAllVendorsWarehouseStatus,
  deleteWarehouse
} = require('../controllers/vendorWarehouse.controller');

// Vendor authenticated routes
router.use(vendorAuth);

// Setup vendor warehouse
router.post('/setup', setupWarehouse);

// Get warehouse info
router.get('/info', getWarehouseInfo);

// Update warehouse
router.put('/update', updateWarehouse);

// Delete warehouse
router.delete('/delete', deleteWarehouse);

// Test ParcelX connection
router.get('/test-connection', testParcelXConnection);

// Admin: Get all vendors warehouse status
router.get('/admin/all-status', adminAuth, getAllVendorsWarehouseStatus);

module.exports = router;
