
const Vendor = require('../models/Vendor');
const parcelxService = require('../services/parcelx.service');

// Setup vendor warehouse
exports.setupWarehouse = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const {
      address,
      city,
      state,
      pincode,
      phone,
      address_title,
      sender_name
    } = req.body;
    
    // Validate required fields
    if (!address || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: 'Address, city, state, and pincode are required'
      });
    }
    
    // Get vendor
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }
    
    // Create warehouse in ParcelX
    const result = await parcelxService.createVendorWarehouse(vendorId, {
      address,
      city,
      state,
      pincode,
      phone: phone || vendor.phone,
      address_title: address_title || `${vendor.shopName || vendor.name} Warehouse`,
      sender_name: sender_name || vendor.name
    });
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Warehouse setup successfully',
        data: {
          warehouseId: result.warehouseId,
          vendor: {
            id: vendorId,
            name: vendor.shopName || vendor.name,
            isParcelxIntegrated: true
          },
          warehouse: vendor.warehouseAddress
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error
      });
    }
  } catch (error) {
    console.error('Setup warehouse error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get vendor warehouse info
exports.getWarehouseInfo = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        hasWarehouse: !!vendor.parcelxWarehouseId,
        warehouse: vendor.warehouseAddress || null,
        parcelxWarehouseId: vendor.parcelxWarehouseId,
        isParcelxIntegrated: vendor.isParcelxIntegrated,
        parcelxLastSync: vendor.parcelxLastSync
      }
    });
  } catch (error) {
    console.error('Get warehouse info error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update warehouse info
exports.updateWarehouse = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const updateData = req.body;
    
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }
    
    // Update warehouse info
    if (vendor.warehouseAddress) {
      vendor.warehouseAddress = {
        ...vendor.warehouseAddress,
        ...updateData,
      };
    } else {
      vendor.warehouseAddress = {
        ...updateData
      };
    }
    
    vendor.lastWarehouseUpdate = new Date();
    await vendor.save();
    
    res.json({
      success: true,
      message: 'Warehouse updated successfully',
      data: vendor.warehouseAddress
    });
  } catch (error) {
    console.error('Update warehouse error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Test ParcelX connection
exports.testParcelXConnection = async (req, res) => {
  try {
    const result = await parcelxService.testConnection();
    
    res.json(result);
  } catch (error) {
    console.error('Test connection error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all vendors with warehouse status (Admin)
exports.getAllVendorsWarehouseStatus = async (req, res) => {
  try {
    const vendors = await Vendor.find({})
      .select('name shopName email phone parcelxWarehouseId warehouseAddress isParcelxIntegrated parcelxLastSync')
      .sort({ createdAt: -1 });
    
    const stats = {
      total: vendors.length,
      withWarehouse: vendors.filter(v => v.parcelxWarehouseId).length,
      withoutWarehouse: vendors.filter(v => !v.parcelxWarehouseId).length,
      integrated: vendors.filter(v => v.isParcelxIntegrated).length
    };
    
    res.json({
      success: true,
      stats,
      vendors: vendors.map(v => ({
        _id: v._id,
        name: v.name,
        shopName: v.shopName,
        email: v.email,
        phone: v.phone,
        hasWarehouse: !!v.parcelxWarehouseId,
        warehouseId: v.parcelxWarehouseId,
        warehouseCity: v.warehouseAddress?.city,
        warehouseState: v.warehouseAddress?.state,
        isParcelxIntegrated: v.isParcelxIntegrated,
        lastSync: v.parcelxLastSync
      }))
    });
  } catch (error) {
    console.error('Get vendors warehouse status error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete warehouse
exports.deleteWarehouse = async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }
    
    // Remove warehouse info
    vendor.parcelxWarehouseId = null;
    vendor.warehouseAddress = null;
    vendor.isParcelxIntegrated = false;
    vendor.parcelxWarehouseData = {};
    
    await vendor.save();
    
    res.json({
      success: true,
      message: 'Warehouse removed successfully'
    });
  } catch (error) {
    console.error('Delete warehouse error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
