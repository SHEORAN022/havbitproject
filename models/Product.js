
// const mongoose = require('mongoose');

// // ==================== VARIATION SCHEMA ====================
// const variationSchema = new mongoose.Schema({
//   variationId: {
//     type: String,
//     required: true
//   },
//   size: {
//     type: String,
//     default: ''
//   },
//   flavor: {
//     type: String,
//     default: ''
//   },
//   oldPrice: {
//     type: Number,
//     default: 0
//   },
//   newPrice: {
//     type: Number,
//     default: 0
//   },
//   stock: {
//     type: Number,
//     default: 0
//   },
//   sku: {
//     type: String,
//     default: ''
//   },
//   image: {
//     type: String,
//     default: ''
//   }
// }, { _id: false });

// // ==================== PRODUCT SCHEMA ====================
// const productSchema = new mongoose.Schema({
//   // ========== BASIC INFORMATION ==========
//   name: {
//     type: String,
//     required: [true, 'Product name is required'],
//     trim: true
//   },
//   description: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   restaurantName: {
//     type: String,
//     default: 'Havbit',
//     trim: true
//   },
//   hasVariations: {
//     type: Boolean,
//     default: false
//   },
  
//   // ========== PRICING & STOCK ==========
//   oldPrice: {
//     type: Number,
//     default: 0
//   },
//   price: {
//     type: Number,
//     default: 0
//   },
//   stock: {
//     type: Number,
//     default: 0
//   },
//   quality: {
//     type: String,
//     enum: ['Standard', 'Premium'],
//     default: 'Standard'
//   },
//   dietPreference: {
//     type: String,
//     enum: ['Veg', 'Non-Veg', 'Egg'],
//     default: 'Veg'
//   },
  
//   // ========== VARIATIONS ==========
//   variations: {
//     type: [variationSchema],
//     default: []
//   },
  
//   // ========== PRODUCT DETAILS ==========
//   productTypes: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   flavors: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   size: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   materialTypes: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   ingredients: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   customWeight: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   customSizeInput: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   ageRange: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   containerType: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   itemForm: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   specialty: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   itemTypeName: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   countryOfOrigin: {
//     type: String,
//     default: '',
//     trim: true
//   },
  
//   // ========== COMPLIANCE ==========
//   fssaiLicense: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   brandName: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   legalDisclaimer: {
//     type: String,
//     default: '',
//     trim: true
//   },
  
//   // ========== MANUFACTURING - EXACT FRONTEND FIELDS ==========
//   manufacturerName: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   manufacturerAddress: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   manufacturer: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   manufacturerContact: {
//     type: String,
//     default: '',
//     trim: true
//   },
  
//   // ========== PACKAGER - EXACT FRONTEND FIELDS ==========
//   packagerName: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   packagerAddress: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   packagerFssaiLicense: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   packerContact: {
//     type: String,
//     default: '',
//     trim: true
//   },
  
//   // ========== MARKETER - EXACT FRONTEND FIELDS ==========
//   marketerName: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   marketerAddress: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   marketerNameAddress: {
//     type: String,
//     default: '',
//     trim: true
//   },
  
//   // ========== PACKAGE DETAILS ==========
//   packageColour: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   measurementUnit: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   unitCount: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   numberOfItems: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   itemWeight: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   totalEaches: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   itemPackageWeight: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   shelfLife: {
//     type: String,
//     default: '',
//     trim: true
//   },
  
//   // ========== DIETARY & NUTRITION ==========
//   dietaryPreferences: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   allergenInformation: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   nutrition: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   cuisine: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   directions: {
//     type: String,
//     default: '',
//     trim: true
//   },
  
//   // ========== LOCATION ==========
//   State: {
//     type: String,
//     default: '',
//     trim: true
//   },
  
//   // ========== CATEGORY & SUBCATEGORY ==========
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required: [true, 'Category is required']
//   },
//   subcategory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'SubCategory',
//     default: null
//   },
  
//   // ========== IMAGES ==========
//   image: {
//     type: String,
//     default: ''
//   },
//   gallery: {
//     type: [String],
//     default: []
//   },
  
//   // ========== AUTO-GENERATED ==========
//   slug: {
//     type: String,
//     unique: true
//   }
// }, {
//   timestamps: true
// });

// // ==================== INDEXES ====================
// productSchema.index({ name: 1 });
// productSchema.index({ category: 1 });
// productSchema.index({ restaurantName: 1 });
// productSchema.index({ hasVariations: 1 });
// productSchema.index({ State: 1 });
// productSchema.index({ createdAt: -1 });

// // ==================== PRE-SAVE MIDDLEWARE ====================
// productSchema.pre('save', function(next) {
//   // Generate slug
//   if (this.isModified('name')) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '') + '-' + Date.now();
//   }
//   next();
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;





const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
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
      default: "Havbit" 
    },
    
    /* ================= PRICING & STOCK ================= */
    oldPrice: { 
      type: Number, 
      default: 0,
      min: 0
    },
    newPrice: { 
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
    flavors: [String],  // CHANGED TO ARRAY
    size: [String],     // CHANGED TO ARRAY
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
    itemWeight: String,  // Alag field for item weight
    totalEaches: String,
    itemPackageWeight: String,
    
    /* ================= DIETARY & NUTRITION ================= */
    dietaryPreferences: String,
    allergenInfo: String,  // Current field
    allergenInformation: String,  // New field
    nutrition: String,
    cuisine: String,
    directions: String,
    
    /* ================= LOCATION ================= */
    State: String,
    
    /* ================= MEDIA ================= */
    image: String,
    gallery: [String],
    
    /* ================= VENDOR ================= */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
ProductSchema.index({ name: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ restaurantName: 1 });
ProductSchema.index({ createdAt: -1 });

// Pre-save middleware for data sanitization
ProductSchema.pre('save', function(next) {
  // Ensure flavors and size are arrays
  if (!Array.isArray(this.flavors)) {
    this.flavors = [];
  }
  
  if (!Array.isArray(this.size)) {
    this.size = [];
  }
  
  // Remove empty strings from arrays
  this.flavors = this.flavors.filter(flavor => flavor && flavor.trim() !== '');
  this.size = this.size.filter(size => size && size.trim() !== '');
  
  // Remove duplicates from arrays
  this.flavors = [...new Set(this.flavors)];
  this.size = [...new Set(this.size)];
  
  // Ensure gallery is always an array
  if (!Array.isArray(this.gallery)) {
    this.gallery = [];
  }
  
  // Remove empty strings and duplicates from gallery
  this.gallery = this.gallery.filter(img => img && img.trim() !== '');
  this.gallery = [...new Set(this.gallery)];
  
  next();
});

module.exports = mongoose.model("Product", ProductSchema);




