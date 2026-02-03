



// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     /* ================= BASIC INFO ================= */
//     name: { 
//       type: String, 
//       required: [true, "Product name is required"],
//       trim: true 
//     },
//     description: String,
    
//     /* ================= BRAND & SHOP INFO ================= */
//     brandName: String,  // FSSAI License Number goes here
//     restaurantName: { 
//       type: String, 
//       default: "" 
//     },
    
//     /* ================= PRICING & STOCK ================= */
//     oldPrice: { 
//       type: Number, 
//       default: 0,
//       min: 0
//     },
//     price: {  // CHANGED: newPrice -> price
//       type: Number, 
//       required: [true, "Selling price is required"],
//       min: 0
//     },
//     stock: { 
//       type: Number, 
//       default: 0,
//       min: 0
//     },
//     quality: { 
//       type: String, 
//       default: "Standard",
//       enum: ["Standard", "Premium", "Good", "Fresh", "Butter"]
//     },
//     dietPreference: {
//       type: String,
//       default: "Veg",
//       enum: ["Veg", "Non-Veg", "Egg"]
//     },
    
//     /* ================= CATEGORY ================= */
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: [true, "Category is required"]
//     },
//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "SubCategory",
//       default: null
//     },
    
//     /* ================= PRODUCT DETAILS ================= */
//     productTypes: String,
//     flavors: [String],  // ARRAY OF STRINGS
//     size: [String],     // ARRAY OF STRINGS
//     materialTypes: String,
//     ingredients: String,
//     customWeight: String,
//     customSizeInput: String,
    
//     /* ================= PRODUCT SPECIFICATIONS ================= */
//     ageRange: String,
//     containerType: String,
//     itemForm: String,
//     specialty: String,
//     itemTypeName: String,
//     countryOfOrigin: String,
    
//     /* ================= COMPLIANCE ================= */
//     fssaiLicense: String,  // DONO FSSAI FIELDS
//     legalDisclaimer: String,
//     shelfLife: String,
    
//     /* ================= MANUFACTURING ================= */
//     manufacturer: String,
//     manufacturerContact: String,
//     packerContact: String,
//     marketerNameAddress: String,
    
//     /* ================= PACKAGE DETAILS ================= */
//     packageColour: String,
//     measurementUnit: String,
//     unitCount: String,
//     numberOfItems: String,
//     itemWeight: String,
//     totalEaches: String,
//     itemPackageWeight: String,
    
//     /* ================= DIETARY & NUTRITION ================= */
//     dietaryPreferences: String,
//     allergenInfo: String,
//     allergenInformation: String,
//     nutrition: String,
//     cuisine: String,
//     directions: String,
    
//     /* ================= LOCATION ================= */
//     State: String,  // Capital 'S' as per mapping
    
//     /* ================= MEDIA ================= */
//     image: String,
//     gallery: [String],
    
//     /* ================= VENDOR ================= */
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// // Indexes
// VendorProductSchema.index({ vendor: 1 });
// VendorProductSchema.index({ category: 1 });
// VendorProductSchema.index({ name: 1 });
// VendorProductSchema.index({ price: 1 });
// VendorProductSchema.index({ brandName: 1 });
// VendorProductSchema.index({ fssaiLicense: 1 });

// // Pre-save middleware for arrays
// VendorProductSchema.pre('save', function(next) {
//   // Ensure arrays exist
//   if (!Array.isArray(this.flavors)) this.flavors = [];
//   if (!Array.isArray(this.size)) this.size = [];
//   if (!Array.isArray(this.gallery)) this.gallery = [];
  
//   // Clean and trim
//   this.flavors = this.flavors
//     .filter(f => f && typeof f === 'string' && f.trim() !== '')
//     .map(f => f.trim());
    
//   this.size = this.size
//     .filter(s => s && typeof s === 'string' && s.trim() !== '')
//     .map(s => s.trim());
    
//   this.gallery = this.gallery
//     .filter(img => img && typeof img === 'string' && img.trim() !== '')
//     .map(img => img.trim());
  
//   // Ensure both FSSAI fields have same value
//   if (this.brandName && !this.fssaiLicense) {
//     this.fssaiLicense = this.brandName;
//   }
//   if (this.fssaiLicense && !this.brandName) {
//     this.brandName = this.fssaiLicense;
//   }







const mongoose = require("mongoose");

const VendorProductSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: { 
      type: String, 
      required: [true, "Product name is required"],
      trim: true 
    },
    description: String,
    
    /* ================= BRAND & SHOP INFO ================= */
    brandName: String,  // FSSAI License Number
    restaurantName: { 
      type: String, 
      default: "" 
    },
    hasVariations: {
      type: Boolean,
      default: false
    },
    
    /* ================= VARIATIONS ================= */
    variations: [{
      size: String,
      flavor: String,
      oldPrice: { type: Number, default: 0 },
      newPrice: { type: Number, default: 0 },
      stock: { type: Number, default: 0 },
      sku: String,
      image: String,
      _id: false
    }],
    
    /* ================= PRICING & STOCK ================= */
    oldPrice: { 
      type: Number, 
      default: 0,
      min: 0
    },
    price: {  // Selling price
      type: Number, 
      required: [true, "Selling price is required"],
      min: 0
    },
    sellingPrice: {  // Alternative name for price
      type: Number, 
      default: 0,
      min: 0
    },
    stock: { 
      type: Number, 
      default: 0,
      min: 0
    },
    quality: { 
      type: String, 
      default: "Standard",
      enum: ["Standard", "Premium", "Good", "Fresh", "Butter"]
    },
    dietPreference: {
      type: String,
      default: "Veg",
      enum: ["Veg", "Non-Veg", "Egg"]
    },
    
    /* ================= CATEGORY ================= */
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"]
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null
    },
    
    /* ================= PRODUCT DETAILS ================= */
    productTypes: String,
    flavors: [String],  // ARRAY OF STRINGS
    size: [String],     // ARRAY OF STRINGS
    materialTypes: String,
    ingredients: String,
    customWeight: String,
    customSizeInput: String,
    
    /* ================= PRODUCT SPECIFICATIONS ================= */
    ageRange: String,
    containerType: String,
    itemForm: String,
    specialty: String,
    itemTypeName: String,
    countryOfOrigin: String,
    
    /* ================= COMPLIANCE ================= */
    fssaiLicense: String,  // DONO FSSAI FIELDS
    legalDisclaimer: String,
    shelfLife: String,
    
    /* ================= MANUFACTURING ================= */
    manufacturer: String,
    manufacturerContact: String,
    manufacturerName: String,      // New field
    manufacturerAddress: String,   // New field
    packerContact: String,
    packagerName: String,          // New field
    packagerAddress: String,       // New field
    packagerFssaiLicense: String,  // New field
    marketerNameAddress: String,
    marketerName: String,          // New field
    marketerAddress: String,       // New field
    
    /* ================= PACKAGE DETAILS ================= */
    packageColour: String,
    measurementUnit: String,
    unitCount: String,
    numberOfItems: String,
    itemWeight: String,
    totalEaches: String,
    itemPackageWeight: String,
    
    /* ================= DIETARY & NUTRITION ================= */
    dietaryPreferences: String,
    allergenInfo: String,
    allergenInformation: String,
    nutrition: String,
    cuisine: String,
    directions: String,
    
    /* ================= LOCATION ================= */
    State: String,  // Capital 'S' as per mapping
    
    /* ================= MEDIA ================= */
    image: String,
    gallery: [String],
    
    /* ================= VENDOR ================= */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// Indexes
VendorProductSchema.index({ vendor: 1 });
VendorProductSchema.index({ category: 1 });
VendorProductSchema.index({ name: 1 });
VendorProductSchema.index({ price: 1 });
VendorProductSchema.index({ brandName: 1 });
VendorProductSchema.index({ fssaiLicense: 1 });
VendorProductSchema.index({ hasVariations: 1 });

// Pre-save middleware for arrays
VendorProductSchema.pre('save', function(next) {
  // Ensure arrays exist
  if (!Array.isArray(this.flavors)) this.flavors = [];
  if (!Array.isArray(this.size)) this.size = [];
  if (!Array.isArray(this.gallery)) this.gallery = [];
  if (!Array.isArray(this.variations)) this.variations = [];
  
  // Clean and trim arrays
  this.flavors = this.flavors
    .filter(f => f && typeof f === 'string' && f.trim() !== '')
    .map(f => f.trim());
    
  this.size = this.size
    .filter(s => s && typeof s === 'string' && s.trim() !== '')
    .map(s => s.trim());
    
  this.gallery = this.gallery
    .filter(img => img && typeof img === 'string' && img.trim() !== '')
    .map(img => img.trim());
  
  // Ensure both FSSAI fields have same value
  if (this.brandName && !this.fssaiLicense) {
    this.fssaiLicense = this.brandName;
  }
  if (this.fssaiLicense && !this.brandName) {
    this.brandName = this.fssaiLicense;
  }
  
  // Ensure sellingPrice matches price
  if (this.price && !this.sellingPrice) {
    this.sellingPrice = this.price;
  }
  if (this.sellingPrice && !this.price) {
    this.price = this.sellingPrice;
  }
  
  // Ensure manufacturer fields are consistent
  if (this.manufacturerName && !this.manufacturer) {
    this.manufacturer = this.manufacturerName;
  }
  if (this.manufacturerAddress && !this.manufacturerContact) {
    this.manufacturerContact = this.manufacturerAddress;
  }
  
  next();
});

module.exports = mongoose.model("VendorProduct", VendorProductSchema);
//   next();
// });

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);
