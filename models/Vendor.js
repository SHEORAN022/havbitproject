
// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: { type: String, unique: true },
//     password: { type: String, required: true },
//     image: { type: String, default: "" },
    
//     // Contact info
//     phone: String,
//     shopName: String,
    
//     // ✅ PARCELX INTEGRATION
//     parcelxWarehouseId: String,
    
//     warehouseAddress: {
//       address: String,
//       city: String,
//       state: String,
//       pincode: String,
//       phone: String
//     },
    
//     // Business details
//     gstin: String,
//     pan: String,
    
//     // Status
//     isActive: {
//       type: Boolean,
//       default: true
//     },
    
//     // Timestamps
//     warehouseCreatedAt: Date,
//     lastWarehouseUpdate: Date
//   },
//   { timestamps: true }
// );

// // Virtual for full warehouse address
// vendorSchema.virtual('fullWarehouseAddress').get(function() {
//   if (!this.warehouseAddress) return '';
//   const wa = this.warehouseAddress;
//   return `${wa.address}, ${wa.city}, ${wa.state} - ${wa.pincode}`;
// });

// module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
    
    // Contact info
    phone: String,
    shopName: String,
    
    // Business details
    gstin: String,
    pan: String,
    
    // ✅ PARCELX INTEGRATION
    parcelxWarehouseId: String,
    isParcelxIntegrated: { type: Boolean, default: false },
    
    warehouseAddress: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
      contactPerson: String
    },
    
    // ParcelX Warehouse Data
    parcelxWarehouseData: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    
    // Status
    isActive: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    
    // Timestamps
    warehouseCreatedAt: Date,
    lastWarehouseUpdate: Date,
    parcelxLastSync: Date
  },
  { timestamps: true }
);

// Virtual for full warehouse address
vendorSchema.virtual('fullWarehouseAddress').get(function() {
  if (!this.warehouseAddress) return '';
  const wa = this.warehouseAddress;
  return `${wa.address}, ${wa.city}, ${wa.state} - ${wa.pincode}`;
});

// Check if warehouse is setup
vendorSchema.methods.hasWarehouse = function() {
  return !!this.parcelxWarehouseId && !!this.warehouseAddress?.address;
};

// Get warehouse details for ParcelX
vendorSchema.methods.getWarehouseForParcelX = function() {
  if (!this.hasWarehouse()) return null;
  
  return {
    address_title: `${this.shopName || this.name} Warehouse`,
    sender_name: this.warehouseAddress.contactPerson || this.name,
    full_address: this.fullWarehouseAddress,
    phone: this.warehouseAddress.phone || this.phone,
    pincode: this.warehouseAddress.pincode
  };
};

module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
