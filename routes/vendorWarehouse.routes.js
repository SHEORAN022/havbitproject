

const express = require('express');
const router = express.Router();
const vendorAuth = require('../middleware/vendorAuth');
const {
  setupWarehouse,
  getWarehouseInfo,
  updateWarehouse,
  testParcelXConnection,
  getAllVendorsWarehouseStatus,
  deleteWarehouse
} = require('../controllers/vendorWarehouse.controller');

// All routes require vendor authentication
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
router.get('/admin/all-status', getAllVendorsWarehouseStatus);

module.exports = router;
