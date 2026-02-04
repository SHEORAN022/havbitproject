



// // // const mongoose = require("mongoose");

// // // const VendorProductSchema = new mongoose.Schema(
// // //   {
// // //     /* ================= BASIC INFO ================= */
// // //     name: { 
// // //       type: String, 
// // //       required: [true, "Product name is required"],
// // //       trim: true 
// // //     },
// // //     description: String,
    
// // //     /* ================= BRAND & SHOP INFO ================= */
// // //     brandName: String,  // FSSAI License Number goes here
// // //     restaurantName: { 
// // //       type: String, 
// // //       default: "" 
// // //     },
    
// // //     /* ================= PRICING & STOCK ================= */
// // //     oldPrice: { 
// // //       type: Number, 
// // //       default: 0,
// // //       min: 0
// // //     },
// // //     price: {  // CHANGED: newPrice -> price
// // //       type: Number, 
// // //       required: [true, "Selling price is required"],
// // //       min: 0
// // //     },
// // //     stock: { 
// // //       type: Number, 
// // //       default: 0,
// // //       min: 0
// // //     },
// // //     quality: { 
// // //       type: String, 
// // //       default: "Standard",
// // //       enum: ["Standard", "Premium", "Good", "Fresh", "Butter"]
// // //     },
// // //     dietPreference: {
// // //       type: String,
// // //       default: "Veg",
// // //       enum: ["Veg", "Non-Veg", "Egg"]
// // //     },
    
// // //     /* ================= CATEGORY ================= */
// // //     category: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Category",
// // //       required: [true, "Category is required"]
// // //     },
// // //     subcategory: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "SubCategory",
// // //       default: null
// // //     },
    
// // //     /* ================= PRODUCT DETAILS ================= */
// // //     productTypes: String,
// // //     flavors: [String],  // ARRAY OF STRINGS
// // //     size: [String],     // ARRAY OF STRINGS
// // //     materialTypes: String,
// // //     ingredients: String,
// // //     customWeight: String,
// // //     customSizeInput: String,
    
// // //     /* ================= PRODUCT SPECIFICATIONS ================= */
// // //     ageRange: String,
// // //     containerType: String,
// // //     itemForm: String,
// // //     specialty: String,
// // //     itemTypeName: String,
// // //     countryOfOrigin: String,
    
// // //     /* ================= COMPLIANCE ================= */
// // //     fssaiLicense: String,  // DONO FSSAI FIELDS
// // //     legalDisclaimer: String,
// // //     shelfLife: String,
    
// // //     /* ================= MANUFACTURING ================= */
// // //     manufacturer: String,
// // //     manufacturerContact: String,
// // //     packerContact: String,
// // //     marketerNameAddress: String,
    
// // //     /* ================= PACKAGE DETAILS ================= */
// // //     packageColour: String,
// // //     measurementUnit: String,
// // //     unitCount: String,
// // //     numberOfItems: String,
// // //     itemWeight: String,
// // //     totalEaches: String,
// // //     itemPackageWeight: String,
    
// // //     /* ================= DIETARY & NUTRITION ================= */
// // //     dietaryPreferences: String,
// // //     allergenInfo: String,
// // //     allergenInformation: String,
// // //     nutrition: String,
// // //     cuisine: String,
// // //     directions: String,
    
// // //     /* ================= LOCATION ================= */
// // //     State: String,  // Capital 'S' as per mapping
    
// // //     /* ================= MEDIA ================= */
// // //     image: String,
// // //     gallery: [String],
    
// // //     /* ================= VENDOR ================= */
// // //     vendor: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Vendor",
// // //       required: true
// // //     }
// // //   },
// // //   {
// // //     timestamps: true,
// // //   }
// // // );

// // // // Indexes
// // // VendorProductSchema.index({ vendor: 1 });
// // // VendorProductSchema.index({ category: 1 });
// // // VendorProductSchema.index({ name: 1 });
// // // VendorProductSchema.index({ price: 1 });
// // // VendorProductSchema.index({ brandName: 1 });
// // // VendorProductSchema.index({ fssaiLicense: 1 });

// // // // Pre-save middleware for arrays
// // // VendorProductSchema.pre('save', function(next) {
// // //   // Ensure arrays exist
// // //   if (!Array.isArray(this.flavors)) this.flavors = [];
// // //   if (!Array.isArray(this.size)) this.size = [];
// // //   if (!Array.isArray(this.gallery)) this.gallery = [];
  
// // //   // Clean and trim
// // //   this.flavors = this.flavors
// // //     .filter(f => f && typeof f === 'string' && f.trim() !== '')
// // //     .map(f => f.trim());
    
// // //   this.size = this.size
// // //     .filter(s => s && typeof s === 'string' && s.trim() !== '')
// // //     .map(s => s.trim());
    
// // //   this.gallery = this.gallery
// // //     .filter(img => img && typeof img === 'string' && img.trim() !== '')
// // //     .map(img => img.trim());
  
// // //   // Ensure both FSSAI fields have same value
// // //   if (this.brandName && !this.fssaiLicense) {
// // //     this.fssaiLicense = this.brandName;
// // //   }
// // //   if (this.fssaiLicense && !this.brandName) {
// // //     this.brandName = this.fssaiLicense;
// // //   }




// // // const mongoose = require("mongoose");

// // // const VendorProductSchema = new mongoose.Schema(
// // //   {
// // //     /* ================= BASIC INFO ================= */
// // //     name: { 
// // //       type: String, 
// // //       required: [true, "Product name is required"],
// // //       trim: true 
// // //     },
// // //     description: String,
    
// // //     /* ================= BRAND & SHOP INFO ================= */
// // //     brandName: String,  // FSSAI License Number goes here
// // //     restaurantName: { 
// // //       type: String, 
// // //       default: "" 
// // //     },
    
// // //     /* ================= PRICING & STOCK ================= */
// // //     oldPrice: { 
// // //       type: Number, 
// // //       default: 0,
// // //       min: 0
// // //     },
// // //     price: {  // CHANGED: newPrice -> price
// // //       type: Number, 
// // //       required: [true, "Selling price is required"],
// // //       min: 0
// // //     },
// // //     stock: { 
// // //       type: Number, 
// // //       default: 0,
// // //       min: 0
// // //     },
// // //     quality: { 
// // //       type: String, 
// // //       default: "Standard",
// // //       enum: ["Standard", "Premium", "Good", "Fresh", "Butter"]
// // //     },
// // //     dietPreference: {
// // //       type: String,
// // //       default: "Veg",
// // //       enum: ["Veg", "Non-Veg", "Egg"]
// // //     },
    
// // //     /* ================= CATEGORY ================= */
// // //     category: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Category",
// // //       required: [true, "Category is required"]
// // //     },
// // //     subcategory: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "SubCategory",
// // //       default: null
// // //     },
    
// // //     /* ================= PRODUCT DETAILS ================= */
// // //     productTypes: String,
// // //     flavors: [String],  // ARRAY OF STRINGS
// // //     size: [String],     // ARRAY OF STRINGS
// // //     materialTypes: String,
// // //     ingredients: String,
// // //     customWeight: String,
// // //     customSizeInput: String,
    
// // //     /* ================= PRODUCT SPECIFICATIONS ================= */
// // //     ageRange: String,
// // //     containerType: String,
// // //     itemForm: String,
// // //     specialty: String,
// // //     itemTypeName: String,
// // //     countryOfOrigin: String,
    
// // //     /* ================= COMPLIANCE ================= */
// // //     fssaiLicense: String,  // DONO FSSAI FIELDS
// // //     legalDisclaimer: String,
// // //     shelfLife: String,
    
// // //     /* ================= MANUFACTURING ================= */
// // //     manufacturer: String,
// // //     manufacturerContact: String,
// // //     packerContact: String,
// // //     marketerNameAddress: String,
    
// // //     /* ================= PACKAGE DETAILS ================= */
// // //     packageColour: String,
// // //     measurementUnit: String,
// // //     unitCount: String,
// // //     numberOfItems: String,
// // //     itemWeight: String,
// // //     totalEaches: String,
// // //     itemPackageWeight: String,
    
// // //     /* ================= DIETARY & NUTRITION ================= */
// // //     dietaryPreferences: String,
// // //     allergenInfo: String,
// // //     allergenInformation: String,
// // //     nutrition: String,
// // //     cuisine: String,
// // //     directions: String,
    
// // //     /* ================= LOCATION ================= */
// // //     State: String,  // Capital 'S' as per mapping
    
// // //     /* ================= MEDIA ================= */
// // //     image: String,
// // //     gallery: [String],
    
// // //     /* ================= VENDOR ================= */
// // //     vendor: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Vendor",
// // //       required: true
// // //     }
// // //   },
// // //   {
// // //     timestamps: true,
// // //   }
// // // );

// // // // Indexes
// // // VendorProductSchema.index({ vendor: 1 });
// // // VendorProductSchema.index({ category: 1 });
// // // VendorProductSchema.index({ name: 1 });
// // // VendorProductSchema.index({ price: 1 });
// // // VendorProductSchema.index({ brandName: 1 });
// // // VendorProductSchema.index({ fssaiLicense: 1 });

// // // // Pre-save middleware for arrays
// // // VendorProductSchema.pre('save', function(next) {
// // //   // Ensure arrays exist
// // //   if (!Array.isArray(this.flavors)) this.flavors = [];
// // //   if (!Array.isArray(this.size)) this.size = [];
// // //   if (!Array.isArray(this.gallery)) this.gallery = [];
  
// // //   // Clean and trim
// // //   this.flavors = this.flavors
// // //     .filter(f => f && typeof f === 'string' && f.trim() !== '')
// // //     .map(f => f.trim());
    
// // //   this.size = this.size
// // //     .filter(s => s && typeof s === 'string' && s.trim() !== '')
// // //     .map(s => s.trim());
    
// // //   this.gallery = this.gallery
// // //     .filter(img => img && typeof img === 'string' && img.trim() !== '')
// // //     .map(img => img.trim());
  
// // //   // Ensure both FSSAI fields have same value
// // //   if (this.brandName && !this.fssaiLicense) {
// // //     this.fssaiLicense = this.brandName;
// // //   }
// // //   if (this.fssaiLicense && !this.brandName) {
// // //     this.brandName = this.fssaiLicense;
// // //   }
  
// // //   next();
// // // });

// // // module.exports = mongoose.model("VendorProduct", VendorProductSchema);





// // const mongoose = require("mongoose");

// // const VendorProductSchema = new mongoose.Schema(
// //   {
// //     /* ================= BASIC INFO ================= */
// //     name: { 
// //       type: String, 
// //       required: [true, "Product name is required"],
// //       trim: true 
// //     },
// //     description: String,
    
// //     /* ================= BRAND & SHOP INFO ================= */
// //     brandName: String,
// //     restaurantName: { 
// //       type: String, 
// //       default: "" 
// //     },
    
// //     /* ================= PRICING & STOCK ================= */
// //     oldPrice: { 
// //       type: Number, 
// //       default: 0,
// //       min: 0
// //     },
// //     price: {
// //       type: Number, 
// //       required: [true, "Selling price is required"],
// //       min: 0
// //     },
// //     stock: { 
// //       type: Number, 
// //       default: 0,
// //       min: 0
// //     },
// //     quality: { 
// //       type: String, 
// //       default: "Standard",
// //       enum: ["Standard", "Premium", "Good", "Fresh", "Butter"]
// //     },
// //     dietPreference: {
// //       type: String,
// //       default: "Veg",
// //       enum: ["Veg", "Non-Veg", "Egg", "Vegan"]
// //     },
    
// //     /* ================= CATEGORY ================= */
// //     category: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Category",
// //       required: [true, "Category is required"]
// //     },
// //     subcategory: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "SubCategory",
// //       default: null
// //     },
    
// //     /* ================= PRODUCT DETAILS ================= */
// //     productTypes: String,
// //     flavors: [String],
// //     size: [String],
// //     materialTypes: String,
// //     ingredients: String,
// //     customWeight: String,
// //     customSizeInput: String,
    
// //     /* ================= PRODUCT SPECIFICATIONS ================= */
// //     ageRange: String,
// //     containerType: String,
// //     itemForm: String,
// //     specialty: String,
// //     itemTypeName: String,
// //     countryOfOrigin: String,
    
// //     /* ================= COMPLIANCE ================= */
// //     fssaiLicense: String,
// //     legalDisclaimer: String,
// //     shelfLife: String,
    
// //     /* ================= MANUFACTURING ================= */
// //     manufacturerName: String,
// //     manufacturerAddress: String,
// //     manufacturer: String,
// //     manufacturerContact: String,
    
// //     /* ================= PACKAGER ================= */
// //     packagerName: String,
// //     packagerAddress: String,
// //     packagerFssaiLicense: String,
// //     packerContact: String,
    
// //     /* ================= MARKETER ================= */
// //     marketerName: String,
// //     marketerAddress: String,
// //     marketerNameAddress: String,
    
// //     /* ================= PACKAGE DETAILS ================= */
// //     packageColour: String,
// //     measurementUnit: String,
// //     unitCount: String,
// //     numberOfItems: String,
// //     itemWeight: String,
// //     totalEaches: String,
// //     itemPackageWeight: String,
    
// //     /* ================= DIETARY & NUTRITION ================= */
// //     dietaryPreferences: String,
// //     allergenInfo: String,
// //     allergenInformation: String,
// //     nutrition: String,
// //     cuisine: String,
// //     directions: String,
    
// //     /* ================= LOCATION ================= */
// //     State: String,
    
// //     /* ================= MEDIA ================= */
// //     image: String,
// //     gallery: [String],
    
// //     /* ================= VENDOR ================= */
// //     vendor: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Vendor",
// //       required: true
// //     },
    
// //     /* ================= STATUS ================= */
// //     status: {
// //       type: String,
// //       enum: ['active', 'inactive', 'draft', 'out_of_stock', 'pending_approval'],
// //       default: 'pending_approval'
// //     },
    
// //     /* ================= TAGS ================= */
// //     tags: {
// //       type: [String],
// //       default: []
// //     },
    
// //     /* ================= SEO ================= */
// //     metaTitle: String,
// //     metaDescription: String,
// //     keywords: [String]
// //   },
// //   {
// //     timestamps: true,
// //     toJSON: { virtuals: true },
// //     toObject: { virtuals: true }
// //   }
// // );

// // // ==================== VIRTUAL FIELDS ====================
// // VendorProductSchema.virtual('categoryName').get(function() {
// //   return this.category?.name || '';
// // });

// // VendorProductSchema.virtual('subcategoryName').get(function() {
// //   return this.subcategory?.name || '';
// // });

// // VendorProductSchema.virtual('vendorName').get(function() {
// //   return this.vendor?.storeName || this.vendor?.name || '';
// // });

// // VendorProductSchema.virtual('discountPercentage').get(function() {
// //   if (this.oldPrice > 0 && this.price > 0 && this.oldPrice > this.price) {
// //     return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
// //   }
// //   return 0;
// // });

// // VendorProductSchema.virtual('isInStock').get(function() {
// //   return this.stock > 0;
// // });

// // // ==================== PRE-SAVE MIDDLEWARE ====================
// // VendorProductSchema.pre('save', function(next) {
// //   // Ensure arrays
// //   if (!Array.isArray(this.flavors)) {
// //     if (typeof this.flavors === 'string' && this.flavors.trim() !== '') {
// //       this.flavors = this.flavors.split(',')
// //         .map(f => f.trim())
// //         .filter(f => f !== '');
// //     } else {
// //       this.flavors = [];
// //     }
// //   }
  
// //   if (!Array.isArray(this.size)) {
// //     if (typeof this.size === 'string' && this.size.trim() !== '') {
// //       this.size = this.size.split(',')
// //         .map(s => s.trim())
// //         .filter(s => s !== '');
// //     } else {
// //       this.size = [];
// //     }
// //   }
  
// //   if (!Array.isArray(this.gallery)) {
// //     this.gallery = [];
// //   }
  
// //   if (!Array.isArray(this.tags)) {
// //     if (typeof this.tags === 'string' && this.tags.trim() !== '') {
// //       this.tags = this.tags.split(',')
// //         .map(t => t.trim())
// //         .filter(t => t !== '');
// //     } else {
// //       this.tags = [];
// //     }
// //   }
  
// //   if (!Array.isArray(this.keywords)) {
// //     if (typeof this.keywords === 'string' && this.keywords.trim() !== '') {
// //       this.keywords = this.keywords.split(',')
// //         .map(k => k.trim())
// //         .filter(k => k !== '');
// //     } else {
// //       this.keywords = [];
// //     }
// //   }
  
// //   // Ensure FSSAI consistency
// //   if (this.brandName && !this.fssaiLicense) {
// //     this.fssaiLicense = this.brandName;
// //   }
// //   if (this.fssaiLicense && !this.brandName) {
// //     this.brandName = this.fssaiLicense;
// //   }
  
// //   // Auto-update status based on stock
// //   if (this.stock <= 0 && this.status !== 'inactive') {
// //     this.status = 'out_of_stock';
// //   } else if (this.status === 'out_of_stock' && this.stock > 0) {
// //     this.status = 'active';
// //   }
  
// //   // Set manufacturer fields if not set
// //   if (!this.manufacturerName && this.manufacturer) {
// //     this.manufacturerName = this.manufacturer;
// //   }
// //   if (!this.manufacturer && this.manufacturerName) {
// //     this.manufacturer = this.manufacturerName;
// //   }
  
// //   if (!this.manufacturerAddress && this.manufacturerContact) {
// //     this.manufacturerAddress = this.manufacturerContact;
// //   }
// //   if (!this.manufacturerContact && this.manufacturerAddress) {
// //     this.manufacturerContact = this.manufacturerAddress;
// //   }
  
// //   next();
// // });

// // // ==================== INDEXES ====================
// // VendorProductSchema.index({ vendor: 1 });
// // VendorProductSchema.index({ category: 1 });
// // VendorProductSchema.index({ subcategory: 1 });
// // VendorProductSchema.index({ name: 1 });
// // VendorProductSchema.index({ price: 1 });
// // VendorProductSchema.index({ brandName: 1 });
// // VendorProductSchema.index({ fssaiLicense: 1 });
// // VendorProductSchema.index({ status: 1 });
// // VendorProductSchema.index({ createdAt: -1 });
// // VendorProductSchema.index({ tags: 1 });
// // VendorProductSchema.index({ "vendor.storeName": 1 });

// // // ==================== METHODS ====================
// // VendorProductSchema.methods.getVendorInfo = function() {
// //   return {
// //     vendorId: this.vendor?._id,
// //     storeName: this.vendor?.storeName,
// //     vendorName: this.vendor?.name,
// //     email: this.vendor?.email,
// //     phone: this.vendor?.phone
// //   };
// // };

// // VendorProductSchema.methods.updateStatus = function(newStatus) {
// //   const allowedStatuses = ['active', 'inactive', 'draft', 'out_of_stock', 'pending_approval'];
// //   if (allowedStatuses.includes(newStatus)) {
// //     this.status = newStatus;
// //     return true;
// //   }
// //   return false;
// // };

// // module.exports = mongoose.model("VendorProduct", VendorProductSchema);


// // const mongoose = require("mongoose");

// // /* ================= VARIATION SCHEMA ================= */
// // const VariationSchema = new mongoose.Schema({
// //   size: { type: String, default: "" },
// //   flavor: { type: String, default: "" },

// //   oldPrice: { type: Number, default: 0 },
// //   newPrice: {
// //     type: Number,
// //     required: [true, "Variation price is required"],
// //     min: 0
// //   },
// //   stock: {
// //     type: Number,
// //     required: [true, "Variation stock is required"],
// //     min: 0
// //   },

// //   sku: { type: String, default: "" },

// //   // 🔥 VARIATION IMAGE
// //   image: { type: String, default: "" },

// //   isActive: { type: Boolean, default: true }
// // }, { _id: true });

// // /* ================= PRODUCT SCHEMA ================= */
// // const VendorProductSchema = new mongoose.Schema(
// //   {
// //     /* ================= BASIC INFO ================= */
// //     name: {
// //       type: String,
// //       required: [true, "Product name is required"],
// //       trim: true
// //     },
// //     description: String,

// //     /* ================= BRAND & SHOP ================= */
// //     brandName: String,
// //     restaurantName: { type: String, default: "" },

// //     /* ================= VARIATION CONTROL ================= */
// //     hasVariations: {
// //       type: Boolean,
// //       default: false
// //     },

// //     variations: {
// //       type: [VariationSchema],
// //       default: []
// //     },

// //     /* ================= PRICING (SIMPLE PRODUCT) ================= */
// //     oldPrice: {
// //       type: Number,
// //       min: 0
// //     },
// //     price: {
// //       type: Number,
// //       min: 0,
// //       required: function () {
// //         return !this.hasVariations;
// //       }
// //     },
// //     stock: {
// //       type: Number,
// //       min: 0,
// //       required: function () {
// //         return !this.hasVariations;
// //       }
// //     },

// //     quality: {
// //       type: String,
// //       default: "Standard",
// //       enum: ["Standard", "Premium", "Good", "Fresh", "Butter"]
// //     },
// //     dietPreference: {
// //       type: String,
// //       default: "Veg",
// //       enum: ["Veg", "Non-Veg", "Egg", "Vegan"]
// //     },

// //     /* ================= CATEGORY ================= */
// //     category: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Category",
// //       required: true
// //     },
// //     subcategory: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "SubCategory",
// //       default: null
// //     },

// //     /* ================= PRODUCT DETAILS ================= */
// //     productTypes: String,
// //     flavors: [String],
// //     size: [String],
// //     materialTypes: String,
// //     ingredients: String,
// //     customWeight: String,
// //     customSizeInput: String,

// //     /* ================= SPECIFICATIONS ================= */
// //     ageRange: String,
// //     containerType: String,
// //     itemForm: String,
// //     specialty: String,
// //     itemTypeName: String,
// //     countryOfOrigin: { type: String, default: "India" },

// //     /* ================= COMPLIANCE ================= */
// //     fssaiLicense: String,
// //     legalDisclaimer: String,
// //     shelfLife: String,

// //     /* ================= MANUFACTURING ================= */
// //     manufacturerName: String,
// //     manufacturerAddress: String,
// //     manufacturer: String,
// //     manufacturerContact: String,

// //     /* ================= PACKAGER ================= */
// //     packagerName: String,
// //     packagerAddress: String,
// //     packagerFssaiLicense: String,
// //     packerContact: String,

// //     /* ================= MARKETER ================= */
// //     marketerName: String,
// //     marketerAddress: String,
// //     marketerNameAddress: String,

// //     /* ================= PACKAGE ================= */
// //     packageColour: String,
// //     measurementUnit: String,
// //     unitCount: String,
// //     numberOfItems: String,
// //     itemWeight: String,
// //     totalEaches: String,
// //     itemPackageWeight: String,

// //     /* ================= DIETARY ================= */
// //     dietaryPreferences: String,
// //     allergenInfo: String,
// //     allergenInformation: String,
// //     nutrition: String,
// //     cuisine: String,
// //     directions: String,

// //     /* ================= LOCATION ================= */
// //     State: String,

// //     /* ================= MEDIA ================= */
// //     image: String,        // main product image
// //     gallery: [String],    // product gallery

// //     /* ================= VENDOR ================= */
// //     vendor: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Vendor",
// //       required: true
// //     },

// //     /* ================= STATUS ================= */
// //     status: {
// //       type: String,
// //       enum: ["active", "inactive", "draft", "out_of_stock", "pending_approval"],
// //       default: "pending_approval"
// //     },

// //     /* ================= SEO ================= */
// //     tags: [String],
// //     metaTitle: String,
// //     metaDescription: String,
// //     keywords: [String]
// //   },
// //   {
// //     timestamps: true,
// //     toJSON: { virtuals: true },
// //     toObject: { virtuals: true }
// //   }
// // );

// // /* ================= PRE SAVE ================= */
// // VendorProductSchema.pre("save", function (next) {

// //   // auto clean arrays
// //   this.flavors = Array.isArray(this.flavors) ? this.flavors.filter(Boolean) : [];
// //   this.size = Array.isArray(this.size) ? this.size.filter(Boolean) : [];
// //   this.gallery = Array.isArray(this.gallery) ? this.gallery.filter(Boolean) : [];
// //   this.tags = Array.isArray(this.tags) ? this.tags.filter(Boolean) : [];
// //   this.keywords = Array.isArray(this.keywords) ? this.keywords.filter(Boolean) : [];

// //   // FSSAI sync
// //   if (this.brandName && !this.fssaiLicense) this.fssaiLicense = this.brandName;
// //   if (this.fssaiLicense && !this.brandName) this.brandName = this.fssaiLicense;

// //   // 🔥 if variations → ignore base price & stock
// //   if (this.hasVariations) {
// //     this.price = undefined;
// //     this.stock = undefined;
// //     this.oldPrice = undefined;
// //   }

// //   // status auto update
// //   if (!this.hasVariations) {
// //     if (this.stock <= 0) this.status = "out_of_stock";
// //     else if (this.status === "out_of_stock") this.status = "active";
// //   }

// //   next();
// // });

// // /* ================= VIRTUALS ================= */
// // VendorProductSchema.virtual("discountPercentage").get(function () {
// //   if (this.oldPrice > 0 && this.price > 0 && this.oldPrice > this.price) {
// //     return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
// //   }
// //   return 0;
// // });

// // VendorProductSchema.virtual("totalVariationStock").get(function () {
// //   if (!this.hasVariations) return 0;
// //   return this.variations.reduce((sum, v) => sum + (v.stock || 0), 0);
// // });

// // /* ================= INDEXES ================= */
// // VendorProductSchema.index({ vendor: 1 });
// // VendorProductSchema.index({ category: 1 });
// // VendorProductSchema.index({ subcategory: 1 });
// // VendorProductSchema.index({ hasVariations: 1 });
// // VendorProductSchema.index({ status: 1 });
// // VendorProductSchema.index({ createdAt: -1 });

// // module.exports = mongoose.model("VendorProduct", VendorProductSchema);





// // module.exports = Product;
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
//     default: 0,
//     min: 0
//   },
//   price: {
//     type: Number,
//     required: [true, 'Price is required'],
//     default: 0,
//     min: 0
//   },
//   stock: {
//     type: Number,
//     default: 0,
//     min: 0
//   },
//   quality: {
//     type: String,
//     enum: ['Standard', 'Premium', 'Good', 'Fresh', 'Butter'],
//     default: 'Standard'
//   },
//   dietPreference: {
//     type: String,
//     enum: ['Veg', 'Non-Veg', 'Egg', 'Vegan'],
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
//     type: [String],
//     default: []
//   },
//   size: {
//     type: [String],
//     default: []
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
  
//   // ========== MANUFACTURING ==========
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
  
//   // ========== PACKAGER ==========
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
  
//   // ========== MARKETER ==========
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
//   allergenInfo: {
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
//     unique: true,
//     sparse: true
//   },
  
//   // ========== STATUS ==========
//   status: {
//     type: String,
//     enum: ['active', 'inactive', 'draft', 'out_of_stock'],
//     default: 'active'
//   },
  
//   // ========== TAGS ==========
//   tags: {
//     type: [String],
//     default: []
//   }
// }, {
//   timestamps: true
// });

// // ==================== PRE-SAVE MIDDLEWARE ====================
// productSchema.pre('save', function(next) {
//   // Generate slug from name
//   if (this.isModified('name')) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '') + '-' + Date.now();
//   }
  
//   // Handle flavors array
//   if (!Array.isArray(this.flavors)) {
//     if (typeof this.flavors === 'string' && this.flavors.trim() !== '') {
//       this.flavors = this.flavors.split(',')
//         .map(f => f.trim())
//         .filter(f => f !== '');
//     } else {
//       this.flavors = [];
//     }
//   }
  
//   // Handle size array
//   if (!Array.isArray(this.size)) {
//     if (typeof this.size === 'string' && this.size.trim() !== '') {
//       this.size = this.size.split(',')
//         .map(s => s.trim())
//         .filter(s => s !== '');
//     } else {
//       this.size = [];
//     }
//   }
  
//   // Handle tags array
//   if (!Array.isArray(this.tags)) {
//     if (typeof this.tags === 'string' && this.tags.trim() !== '') {
//       this.tags = this.tags.split(',')
//         .map(t => t.trim())
//         .filter(t => t !== '');
//     } else {
//       this.tags = [];
//     }
//   }
  
//   // Handle gallery array
//   if (!Array.isArray(this.gallery)) {
//     this.gallery = [];
//   }
  
//   // Ensure FSSAI consistency
//   if (this.brandName && !this.fssaiLicense) {
//     this.fssaiLicense = this.brandName;
//   }
//   if (this.fssaiLicense && !this.brandName) {
//     this.brandName = this.fssaiLicense;
//   }
  
//   // Handle variations pricing
//   if (this.hasVariations && this.variations.length > 0) {
//     // Calculate min price from variations for display
//     const variationPrices = this.variations.map(v => v.newPrice || v.price || 0).filter(p => p > 0);
//     if (variationPrices.length > 0) {
//       this.price = Math.min(...variationPrices);
//     }
    
//     // Calculate total stock
//     this.stock = this.variations.reduce((total, v) => total + (v.stock || 0), 0);
//   }
  
//   // Auto update status based on stock
//   if (this.stock <= 0) {
//     this.status = 'out_of_stock';
//   } else if (this.status === 'out_of_stock' && this.stock > 0) {
//     this.status = 'active';
//   }
  
//   next();
// });

// // ==================== VIRTUAL FIELDS ====================
// productSchema.virtual('categoryName').get(function() {
//   return this.category?.name || '';
// });

// productSchema.virtual('subcategoryName').get(function() {
//   return this.subcategory?.name || '';
// });

// productSchema.virtual('discountPercentage').get(function() {
//   if (this.oldPrice > 0 && this.price > 0 && this.oldPrice > this.price) {
//     return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
//   }
//   return 0;
// });

// productSchema.virtual('isInStock').get(function() {
//   if (this.hasVariations) {
//     return this.variations.some(v => v.stock > 0);
//   }
//   return this.stock > 0;
// });

// // ==================== INDEXES ====================
// productSchema.index({ name: 1 });
// productSchema.index({ category: 1 });
// productSchema.index({ subcategory: 1 });
// productSchema.index({ restaurantName: 1 });
// productSchema.index({ hasVariations: 1 });
// productSchema.index({ State: 1 });
// productSchema.index({ price: 1 });
// productSchema.index({ quality: 1 });
// productSchema.index({ dietPreference: 1 });
// productSchema.index({ status: 1 });
// productSchema.index({ createdAt: -1 });
// productSchema.index({ slug: 1 });
// productSchema.index({ tags: 1 });

// // ==================== METHODS ====================
// productSchema.methods.getMinPrice = function() {
//   if (this.hasVariations && this.variations.length > 0) {
//     const prices = this.variations.map(v => v.newPrice || v.price || 0).filter(p => p > 0);
//     return prices.length > 0 ? Math.min(...prices) : 0;
//   }
//   return this.price;
// };

// productSchema.methods.getMaxPrice = function() {
//   if (this.hasVariations && this.variations.length > 0) {
//     const prices = this.variations.map(v => v.newPrice || v.price || 0).filter(p => p > 0);
//     return prices.length > 0 ? Math.max(...prices) : 0;
//   }
//   return this.price;
// };

// productSchema.methods.getTotalStock = function() {
//   if (this.hasVariations && this.variations.length > 0) {
//     return this.variations.reduce((total, v) => total + (v.stock || 0), 0);
//   }
//   return this.stock;
// };

// productSchema.methods.updateStock = function() {
//   if (this.hasVariations && this.variations.length > 0) {
//     this.stock = this.variations.reduce((total, v) => total + (v.stock || 0), 0);
//   }
//   return this.stock;
// };

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;




// module.exports = mongoose.model("VendorProduct", VendorProductSchema);
const mongoose = require("mongoose");

// Variation Schema - Minimal (only what you need)
const variationSchema = new mongoose.Schema({
  variationId: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: ''
  },
  flavor: {
    type: String,
    default: ''
  },
  oldPrice: {
    type: Number,
    default: 0
  },
  newPrice: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  sku: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
}, { _id: false });

const VendorProductSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: { 
      type: String, 
      required: [true, "Product name is required"],
      trim: true 
    },
    description: String,
    
    /* ================= VARIATIONS SUPPORT ================= */
    hasVariations: {
      type: Boolean,
      default: false
    },
    variations: {
      type: [variationSchema],
      default: []
    },
    
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
    price: {
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
      enum: ["Veg", "Non-Veg", "Egg", "Vegan"]
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
    flavors: [String],
    size: [String],
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
    fssaiLicense: String,
    legalDisclaimer: String,
    shelfLife: String,
    
    /* ================= MANUFACTURING ================= */
    manufacturerName: String,
    manufacturerAddress: String,
    manufacturer: String,
    manufacturerContact: String,
    
    /* ================= PACKAGER ================= */
    packagerName: String,
    packagerAddress: String,
    packagerFssaiLicense: String,
    packerContact: String,
    
    /* ================= MARKETER ================= */
    marketerName: String,
    marketerAddress: String,
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
    State: String,
    
    /* ================= MEDIA ================= */
    image: String,
    gallery: [String],
    
    /* ================= VENDOR ================= */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    },
    
    /* ================= STATUS ================= */
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft', 'out_of_stock', 'pending_approval'],
      default: 'pending_approval'
    },
    
    /* ================= TAGS ================= */
    tags: {
      type: [String],
      default: []
    },
    
    /* ================= SEO ================= */
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ==================== VIRTUAL FIELDS (EXISTING) ====================
VendorProductSchema.virtual('categoryName').get(function() {
  return this.category?.name || '';
});

VendorProductSchema.virtual('subcategoryName').get(function() {
  return this.subcategory?.name || '';
});

VendorProductSchema.virtual('vendorName').get(function() {
  return this.vendor?.storeName || this.vendor?.name || '';
});

VendorProductSchema.virtual('discountPercentage').get(function() {
  if (this.oldPrice > 0 && this.price > 0 && this.oldPrice > this.price) {
    return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
  }
  return 0;
});

VendorProductSchema.virtual('isInStock').get(function() {
  if (this.hasVariations && this.variations.length > 0) {
    return this.variations.some(v => v.stock > 0);
  }
  return this.stock > 0;
});

// ==================== PRE-SAVE MIDDLEWARE ====================
VendorProductSchema.pre('save', function(next) {
  // Ensure arrays (EXISTING)
  if (!Array.isArray(this.flavors)) {
    if (typeof this.flavors === 'string' && this.flavors.trim() !== '') {
      this.flavors = this.flavors.split(',')
        .map(f => f.trim())
        .filter(f => f !== '');
    } else {
      this.flavors = [];
    }
  }
  
  if (!Array.isArray(this.size)) {
    if (typeof this.size === 'string' && this.size.trim() !== '') {
      this.size = this.size.split(',')
        .map(s => s.trim())
        .filter(s => s !== '');
    } else {
      this.size = [];
    }
  }
  
  if (!Array.isArray(this.gallery)) {
    this.gallery = [];
  }
  
  if (!Array.isArray(this.tags)) {
    if (typeof this.tags === 'string' && this.tags.trim() !== '') {
      this.tags = this.tags.split(',')
        .map(t => t.trim())
        .filter(t => t !== '');
    } else {
      this.tags = [];
    }
  }
  
  if (!Array.isArray(this.keywords)) {
    if (typeof this.keywords === 'string' && this.keywords.trim() !== '') {
      this.keywords = this.keywords.split(',')
        .map(k => k.trim())
        .filter(k => k !== '');
    } else {
      this.keywords = [];
    }
  }
  
  // Ensure variations array
  if (!Array.isArray(this.variations)) {
    this.variations = [];
  }
  
  // Handle variations pricing and stock
  if (this.hasVariations && this.variations.length > 0) {
    // Calculate price from variations (min price)
    const validPrices = this.variations
      .map(v => v.newPrice || v.price || 0)
      .filter(p => p > 0);
    
    if (validPrices.length > 0) {
      this.price = Math.min(...validPrices);
      this.oldPrice = Math.max(...this.variations.map(v => v.oldPrice || 0));
    }
    
    // Calculate total stock from variations
    this.stock = this.variations.reduce((total, v) => total + (v.stock || 0), 0);
  }
  
  // Ensure FSSAI consistency
  if (this.brandName && !this.fssaiLicense) {
    this.fssaiLicense = this.brandName;
  }
  if (this.fssaiLicense && !this.brandName) {
    this.brandName = this.fssaiLicense;
  }
  
  // Auto-update status based on stock
  if (this.hasVariations && this.variations.length > 0) {
    const hasStock = this.variations.some(v => v.stock > 0);
    if (!hasStock && this.status !== 'inactive') {
      this.status = 'out_of_stock';
    } else if (this.status === 'out_of_stock' && hasStock) {
      this.status = 'active';
    }
  } else {
    if (this.stock <= 0 && this.status !== 'inactive') {
      this.status = 'out_of_stock';
    } else if (this.status === 'out_of_stock' && this.stock > 0) {
      this.status = 'active';
    }
  }
  
  // Set manufacturer fields if not set
  if (!this.manufacturerName && this.manufacturer) {
    this.manufacturerName = this.manufacturer;
  }
  if (!this.manufacturer && this.manufacturerName) {
    this.manufacturer = this.manufacturerName;
  }
  
  if (!this.manufacturerAddress && this.manufacturerContact) {
    this.manufacturerAddress = this.manufacturerContact;
  }
  if (!this.manufacturerContact && this.manufacturerAddress) {
    this.manufacturerContact = this.manufacturerAddress;
  }
  
  next();
});

// ==================== INDEXES ====================
VendorProductSchema.index({ vendor: 1 });
VendorProductSchema.index({ category: 1 });
VendorProductSchema.index({ subcategory: 1 });
VendorProductSchema.index({ name: 1 });
VendorProductSchema.index({ price: 1 });
VendorProductSchema.index({ brandName: 1 });
VendorProductSchema.index({ fssaiLicense: 1 });
VendorProductSchema.index({ status: 1 });
VendorProductSchema.index({ createdAt: -1 });
VendorProductSchema.index({ tags: 1 });
VendorProductSchema.index({ "vendor.storeName": 1 });
VendorProductSchema.index({ hasVariations: 1 });

module.exports = mongoose.model("VendorProduct", VendorProductSchema);

