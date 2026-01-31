

// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema({
//   name: String,
//   brandName: String,
//   phone: String,
//   contactName: String,
//   description: String,

//   oldPrice: Number,
//   newPrice: Number,
//   stock: Number,
//   quality: String,

//   State: String,
//   productTypes: String,
//   flavors: String,
//   dietPreference: String,
//   nutrition: String,
//   materialTypes: String,
//   ingredients: String,
//   allergenInfo: String,
//   dietaryPreferences: String,
//   cuisine: String,
//   size: String,
//   storeName: { type: String, default: "" },


//   image: String,
//   logo: String,
//   gallery: [String],

//   category: { type: mongoose.Schema.Types.ObjectId, ref: "VendorCategory" },
//   subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "VendorSubCategory" },

//   restaurantName: String,

//   vendor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Vendor",
//     required: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);







// // models/VendorProduct.js
// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: String,
//     brandName: String,
//     restaurantName: String,
    
//     oldPrice: Number,
//     newPrice: { type: Number, required: true },
//     stock: Number,
//     quality: String,
    
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "VendorCategory" },
//     subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "VendorSubCategory" },
    
//     /* ================= ALL NEW FIELDS ================= */
//     dietPreference: String,
//     ageRange: String,
//     containerType: String,
//     flavors: String,
//     itemForm: String,
//     specialty: String,
//     itemTypeName: String,
//     countryOfOrigin: String,
    
//     fssaiLicense: String,
//     legalDisclaimer: String,
//     shelfLife: String,
    
//     manufacturer: String,
//     manufacturerContact: String,
//     packerContact: String,
//     marketerNameAddress: String,
    
//     packageColour: String,
//     measurementUnit: String,
//     unitCount: String,
//     numberOfItems: String,
//     itemWeight: String,
//     size: String,
//     totalEaches: String,
//     itemPackageWeight: String,
    
//     ingredients: String,
//     allergenInformation: String,
//     directions: String,
    
//     /* ================= ADDITIONAL FIELDS ================= */
//     productTypes: String,
//     materialTypes: String,
//     nutrition: String,
//     allergenInfo: String,
//     dietaryPreferences: String,
//     cuisine: String,
//     State: String,
//     customWeight: String,
//     customSizeInput: String,
    
//     image: String,
//     gallery: [String],
    
//     vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);








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
    brandName: String,
    restaurantName: { 
      type: String, 
      default: "" 
    },
    
    /* ================= PRICING & STOCK ================= */
    oldPrice: { 
      type: Number, 
      default: 0,
      min: 0
    },
    price: {  // CHANGED: newPrice -> price
      type: Number, 
      required: [true, "Selling price is required"],
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
    flavors: [String],  // CHANGED: String -> [String]
    size: [String],     // CHANGED: String -> [String]
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
    fssaiLicense: String,  // Alag field for FSSAI
    legalDisclaimer: String,
    shelfLife: String,
    
    /* ================= MANUFACTURING ================= */
    manufacturer: String,
    manufacturerContact: String,
    packerContact: String,
    marketerNameAddress: String,
    
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

// Pre-save middleware for arrays
VendorProductSchema.pre('save', function(next) {
  // Ensure flavors is array
  if (!Array.isArray(this.flavors)) {
    this.flavors = [];
  }
  
  // Ensure size is array
  if (!Array.isArray(this.size)) {
    this.size = [];
  }
  
  // Ensure gallery is array
  if (!Array.isArray(this.gallery)) {
    this.gallery = [];
  }
  
  // Remove empty strings and trim
  this.flavors = this.flavors
    .filter(f => f && f.trim() !== '')
    .map(f => f.trim());
    
  this.size = this.size
    .filter(s => s && s.trim() !== '')
    .map(s => s.trim());
    
  this.gallery = this.gallery
    .filter(img => img && img.trim() !== '')
    .map(img => img.trim());
  
  next();
});

module.exports = mongoose.model("VendorProduct", VendorProductSchema);
