



// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     /* ================= BASIC INFO ================= */
//     name: { 
//       type: String, 
//       required: [true, "Product name is required"],
//       trim: true 
//     },
//     description: String,
    
//     /* ================= BRAND & SHOP INFO ================= */
//     brandName: String,
//     restaurantName: { 
//       type: String, 
//       default: "Havbit" 
//     },
    
//     /* ================= PRICING & STOCK ================= */
//     oldPrice: { 
//       type: Number, 
//       default: 0,
//       min: 0
//     },
//     newPrice: { 
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
//     flavors: [String],  // CHANGED TO ARRAY
//     size: [String],     // CHANGED TO ARRAY
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
//     fssaiLicense: String,  // Alag field for FSSAI
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
//     itemWeight: String,  // Alag field for item weight
//     totalEaches: String,
//     itemPackageWeight: String,
    
//     /* ================= DIETARY & NUTRITION ================= */
//     dietaryPreferences: String,
//     allergenInfo: String,  // Current field
//     allergenInformation: String,  // New field
//     nutrition: String,
//     cuisine: String,
//     directions: String,
    
//     /* ================= LOCATION ================= */
//     State: String,
    
//     /* ================= MEDIA ================= */
//     image: String,
//     gallery: [String],
    
//     /* ================= VENDOR ================= */
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       default: null
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// // Indexes for better performance
// ProductSchema.index({ name: 1 });
// ProductSchema.index({ category: 1 });
// ProductSchema.index({ restaurantName: 1 });
// ProductSchema.index({ createdAt: -1 });

// // Pre-save middleware for data sanitization
// ProductSchema.pre('save', function(next) {
//   // Ensure flavors and size are arrays
//   if (!Array.isArray(this.flavors)) {
//     this.flavors = [];
//   }
  
//   if (!Array.isArray(this.size)) {
//     this.size = [];
//   }
  
//   // Remove empty strings from arrays
//   this.flavors = this.flavors.filter(flavor => flavor && flavor.trim() !== '');
//   this.size = this.size.filter(size => size && size.trim() !== '');
  
//   // Remove duplicates from arrays
//   this.flavors = [...new Set(this.flavors)];
//   this.size = [...new Set(this.size)];
  
//   // Ensure gallery is always an array
//   if (!Array.isArray(this.gallery)) {
//     this.gallery = [];
//   }
  
//   // Remove empty strings and duplicates from gallery
//   this.gallery = this.gallery.filter(img => img && img.trim() !== '');
//   this.gallery = [...new Set(this.gallery)];
  
//   next();
// });

// module.exports = mongoose.model("Product", ProductSchema);







// const mongoose = require('mongoose');

// // ==================== VARIATION SCHEMA ====================
// const variationSchema = new mongoose.Schema({
//   size: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   flavor: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   oldPrice: {
//     type: Number,
//     default: 0,
//     min: 0
//   },
//   newPrice: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   stock: {
//     type: Number,
//     required: true,
//     min: 0,
//     default: 0
//   },
//   sku: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   image: {
//     type: String,
//     default: ""
//   },
//   imageFile: {
//     type: Buffer
//   }
// }, { 
//   _id: true,
//   timestamps: false 
// });

// // Variation validation: ensure at least size or flavor is provided
// variationSchema.pre('validate', function(next) {
//   if (!this.size && !this.flavor) {
//     next(new Error('Variation must have either size or flavor'));
//   }
//   next();
// });

// // ==================== PRODUCT SCHEMA ====================
// const productSchema = new mongoose.Schema({
//   // ========== BASIC INFORMATION ==========
//   name: {
//     type: String,
//     required: [true, 'Product name is required'],
//     trim: true,
//     maxlength: [200, 'Product name cannot exceed 200 characters']
//   },
//   description: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   restaurantName: {
//     type: String,
//     default: "Havbit",
//     trim: true
//   },
//   brandName: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== PRICING & STOCK (FOR SINGLE PRODUCTS) ==========
//   oldPrice: {
//     type: Number,
//     default: 0,
//     min: [0, 'Price cannot be negative']
//   },
//   price: {
//     type: Number,
//     default: 0,
//     min: [0, 'Price cannot be negative']
//   },
//   stock: {
//     type: Number,
//     default: 0,
//     min: [0, 'Stock cannot be negative']
//   },
//   quality: {
//     type: String,
//     enum: {
//       values: ['Standard', 'Premium'],
//       message: '{VALUE} is not a valid quality'
//     },
//     default: 'Standard'
//   },
//   dietPreference: {
//     type: String,
//     enum: {
//       values: ['Veg', 'Non-Veg', 'Egg'],
//       message: '{VALUE} is not a valid diet preference'
//     },
//     default: 'Veg'
//   },
  
//   // ========== VARIATIONS SYSTEM ==========
//   hasVariations: {
//     type: Boolean,
//     default: false
//   },
//   variations: [variationSchema],
  
//   // ========== PRODUCT DETAILS ==========
//   productTypes: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   flavors: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   size: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   materialTypes: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   ingredients: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   customWeight: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   customSizeInput: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   ageRange: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   containerType: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   itemForm: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   specialty: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   itemTypeName: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   countryOfOrigin: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== COMPLIANCE ==========
//   fssaiLicense: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   legalDisclaimer: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== MANUFACTURING & MARKETING ==========
//   manufacturer: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   manufacturerContact: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   manufacturerAddress: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   packagerName: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   packagerAddress: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   packagerFssaiLicense: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   marketerName: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   marketerAddress: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   packerContact: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   marketerNameAddress: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== PACKAGE DETAILS ==========
//   packageColour: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   measurementUnit: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   unitCount: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   numberOfItems: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   itemWeight: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   totalEaches: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   itemPackageWeight: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   shelfLife: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== DIETARY & NUTRITION ==========
//   dietaryPreferences: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   allergenInformation: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   nutrition: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   cuisine: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   directions: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== LOCATION ==========
//   State: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== CATEGORY ==========
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
//     default: ""
//   },
//   gallery: [{
//     type: String
//   }],
  
//   // ========== SEO & METADATA ==========
//   slug: {
//     type: String,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// // ==================== INDEXES ====================
// productSchema.index({ name: 'text', description: 'text', brandName: 'text' });
// productSchema.index({ category: 1 });
// productSchema.index({ restaurantName: 1 });
// productSchema.index({ isActive: 1 });
// productSchema.index({ slug: 1 });
// productSchema.index({ createdAt: -1 });

// // ==================== MIDDLEWARE ====================
// // Pre-save: Generate slug
// productSchema.pre('save', function(next) {
//   if (this.isModified('name')) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '')
//       + '-' + Date.now();
//   }
//   next();
// });

// // Pre-save: Validate price consistency
// productSchema.pre('save', function(next) {
//   // If has variations, ensure base prices are 0
//   if (this.hasVariations && this.variations.length > 0) {
//     this.price = 0;
//     this.oldPrice = 0;
//     this.stock = 0;
//   }
  
//   // Validate MRP > Selling Price for single products
//   if (!this.hasVariations && this.oldPrice > 0 && this.price > 0) {
//     if (this.oldPrice <= this.price) {
//       return next(new Error('MRP (oldPrice) must be greater than Selling Price (price)'));
//     }
//   }
  
//   // Validate each variation
//   if (this.hasVariations && this.variations.length > 0) {
//     for (let variation of this.variations) {
//       if (variation.oldPrice > 0 && variation.newPrice > 0) {
//         if (variation.oldPrice <= variation.newPrice) {
//           return next(new Error(`Variation MRP must be greater than Selling Price for ${variation.size} ${variation.flavor}`));
//         }
//       }
//     }
//   }
  
//   next();
// });

// // ==================== VIRTUALS ====================
// // Virtual for total stock (base + variations)
// productSchema.virtual('totalStock').get(function() {
//   if (this.hasVariations && this.variations.length > 0) {
//     return this.variations.reduce((sum, variation) => sum + (variation.stock || 0), 0);
//   }
//   return this.stock || 0;
// });

// // Virtual for price range (for variation products)
// productSchema.virtual('priceRange').get(function() {
//   if (this.hasVariations && this.variations.length > 0) {
//     const prices = this.variations.map(v => v.newPrice).filter(p => p > 0);
//     if (prices.length === 0) return { min: 0, max: 0 };
    
//     return {
//       min: Math.min(...prices),
//       max: Math.max(...prices)
//     };
//   }
//   return { min: this.price, max: this.price };
// });

// // ==================== METHODS ====================
// // Method to check if product is in stock
// productSchema.methods.isInStock = function() {
//   if (this.hasVariations) {
//     return this.totalStock > 0;
//   }
//   return this.stock > 0;
// };

// // Method to get display price
// productSchema.methods.getDisplayPrice = function() {
//   if (this.hasVariations && this.variations.length > 0) {
//     const range = this.priceRange;
//     if (range.min === range.max) {
//       return range.min;
//     }
//     return `${range.min} - ${range.max}`;
//   }
//   return this.price;
// };

// // ==================== EXPORT ====================
// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;








// const mongoose = require('mongoose');

// // ==================== VARIATION SCHEMA ====================
// const variationSchema = new mongoose.Schema({
//   variationId: {  // Add this field for frontend reference
//     type: String,
//     default: "",
//     trim: true
//   },
//   size: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   flavor: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   oldPrice: {
//     type: Number,
//     default: 0,
//     min: 0
//   },
//   newPrice: {
//     type: Number,
//     required: [true, 'Variation price is required'],
//     min: [0, 'Price cannot be negative']
//   },
//   stock: {
//     type: Number,
//     required: [true, 'Variation stock is required'],
//     min: [0, 'Stock cannot be negative'],
//     default: 0
//   },
//   sku: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   image: {
//     type: String,
//     default: ""
//   }
// }, { 
//   _id: true,  // Keep _id for MongoDB but we'll handle it separately
//   timestamps: false 
// });

// // Variation validation
// variationSchema.pre('validate', function(next) {
//   if (!this.size && !this.flavor) {
//     next(new Error('Variation must have either size or flavor'));
//   }
//   next();
// });

// // ==================== PRODUCT SCHEMA ====================
// const productSchema = new mongoose.Schema({
//   // ========== BASIC INFORMATION ==========
//   name: {
//     type: String,
//     required: [true, 'Product name is required'],
//     trim: true,
//     maxlength: [200, 'Product name cannot exceed 200 characters']
//   },
//   description: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   restaurantName: {
//     type: String,
//     default: "Havbit",
//     trim: true
//   },
//   brandName: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== PRICING & STOCK (FOR SINGLE PRODUCTS) ==========
//   oldPrice: {
//     type: Number,
//     default: 0,
//     min: [0, 'Price cannot be negative']
//   },
//   price: {
//     type: Number,
//     default: 0,
//     min: [0, 'Price cannot be negative']
//   },
//   stock: {
//     type: Number,
//     default: 0,
//     min: [0, 'Stock cannot be negative']
//   },
//   quality: {
//     type: String,
//     enum: {
//       values: ['Standard', 'Premium'],
//       message: '{VALUE} is not a valid quality'
//     },
//     default: 'Standard'
//   },
//   dietPreference: {
//     type: String,
//     enum: {
//       values: ['Veg', 'Non-Veg', 'Egg'],
//       message: '{VALUE} is not a valid diet preference'
//     },
//     default: 'Veg'
//   },
  
//   // ========== VARIATIONS SYSTEM ==========
//   hasVariations: {
//     type: Boolean,
//     default: false
//   },
//   variations: [variationSchema],
  
//   // ========== PRODUCT DETAILS ==========
//   productTypes: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   flavors: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   size: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   materialTypes: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   ingredients: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   customWeight: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   customSizeInput: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   ageRange: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   containerType: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   itemForm: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   specialty: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   itemTypeName: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   countryOfOrigin: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== COMPLIANCE ==========
//   fssaiLicense: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   legalDisclaimer: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== MANUFACTURING & MARKETING ==========
//   manufacturer: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   manufacturerContact: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   manufacturerAddress: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   packagerName: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   packagerAddress: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   packagerFssaiLicense: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   marketerName: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   marketerAddress: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   packerContact: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   marketerNameAddress: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== PACKAGE DETAILS ==========
//   packageColour: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   measurementUnit: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   unitCount: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   numberOfItems: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   itemWeight: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   totalEaches: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   itemPackageWeight: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   shelfLife: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== DIETARY & NUTRITION ==========
//   dietaryPreferences: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   allergenInformation: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   nutrition: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   cuisine: {
//     type: String,
//     default: "",
//     trim: true
//   },
//   directions: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== LOCATION ==========
//   State: {
//     type: String,
//     default: "",
//     trim: true
//   },
  
//   // ========== CATEGORY ==========
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
//     default: ""
//   },
//   gallery: [{
//     type: String
//   }],
  
//   // ========== SEO & METADATA ==========
//   slug: {
//     type: String,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// // ==================== INDEXES ====================
// productSchema.index({ name: 'text', description: 'text', brandName: 'text' });
// productSchema.index({ category: 1 });
// productSchema.index({ restaurantName: 1 });
// productSchema.index({ isActive: 1 });
// productSchema.index({ slug: 1 });
// productSchema.index({ createdAt: -1 });

// // ==================== MIDDLEWARE ====================
// // Pre-save: Generate slug
// productSchema.pre('save', function(next) {
//   if (this.isModified('name') && !this.slug) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '')
//       + '-' + Date.now();
//   }
//   next();
// });

// // Pre-save: Validate price consistency and handle variations
// productSchema.pre('save', function(next) {
//   // If has variations, ensure base prices are 0
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     this.price = 0;
//     this.oldPrice = 0;
//     this.stock = 0;
//   }
  
//   // Validate MRP > Selling Price for single products
//   if (!this.hasVariations && this.oldPrice > 0 && this.price > 0) {
//     if (this.oldPrice <= this.price) {
//       return next(new Error('MRP (oldPrice) must be greater than Selling Price (price)'));
//     }
//   }
  
//   // Validate each variation
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     for (let variation of this.variations) {
//       if (variation.oldPrice > 0 && variation.newPrice > 0) {
//         if (variation.oldPrice <= variation.newPrice) {
//           return next(new Error(`Variation MRP must be greater than Selling Price for ${variation.size} ${variation.flavor}`));
//         }
//       }
//     }
//   }
  
//   next();
// });

// // Pre-save: Clean variation data before saving
// productSchema.pre('save', function(next) {
//   if (this.variations && this.variations.length > 0) {
//     // Ensure each variation has variationId
//     this.variations = this.variations.map((variation, index) => {
//       if (!variation.variationId) {
//         variation.variationId = `var_${Date.now()}_${index}`;
//       }
//       return variation;
//     });
//   }
//   next();
// });

// // ==================== VIRTUALS ====================
// // Virtual for total stock (base + variations)
// productSchema.virtual('totalStock').get(function() {
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     return this.variations.reduce((sum, variation) => sum + (variation.stock || 0), 0);
//   }
//   return this.stock || 0;
// });

// // Virtual for price range (for variation products)
// productSchema.virtual('priceRange').get(function() {
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     const prices = this.variations.map(v => v.newPrice).filter(p => p > 0);
//     if (prices.length === 0) return { min: 0, max: 0 };
    
//     return {
//       min: Math.min(...prices),
//       max: Math.max(...prices)
//     };
//   }
//   return { min: this.price, max: this.price };
// });

// // ==================== METHODS ====================
// // Method to check if product is in stock
// productSchema.methods.isInStock = function() {
//   if (this.hasVariations) {
//     return this.totalStock > 0;
//   }
//   return this.stock > 0;
// };

// // Method to get display price
// productSchema.methods.getDisplayPrice = function() {
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     const range = this.priceRange;
//     if (range.min === range.max) {
//       return range.min;
//     }
//     return `${range.min} - ${range.max}`;
//   }
//   return this.price;
// };

// // ==================== STATICS ====================
// // Find by variationId
// productSchema.statics.findByVariationId = function(variationId) {
//   return this.findOne({ 'variations.variationId': variationId });
// };

// // ==================== EXPORT ====================
// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;












// const mongoose = require('mongoose');

// // ==================== VARIATION SCHEMA ====================
// const variationSchema = new mongoose.Schema({
//   variationId: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Variation ID cannot exceed 100 characters']
//   },
//   size: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Size cannot exceed 100 characters']
//   },
//   flavor: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Flavor cannot exceed 100 characters']
//   },
//   oldPrice: {
//     type: Number,
//     default: 0,
//     min: 0,
//     max: [999999, 'Price cannot exceed 999,999']
//   },
//   newPrice: {
//     type: Number,
//     required: [true, 'Variation price is required'],
//     min: [0, 'Price cannot be negative'],
//     max: [999999, 'Price cannot exceed 999,999']
//   },
//   stock: {
//     type: Number,
//     required: [true, 'Variation stock is required'],
//     min: [0, 'Stock cannot be negative'],
//     max: [999999, 'Stock cannot exceed 999,999'],
//     default: 0
//   },
//   sku: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'SKU cannot exceed 100 characters']
//   },
//   image: {
//     type: String,
//     default: "",
//     // Prevent storing large Base64 in database
//     validate: {
//       validator: function(v) {
//         // If it's Base64, check it's not too large (max 50KB)
//         if (v && v.startsWith('data:image') && v.length > 50000) {
//           return false;
//         }
//         return true;
//       },
//       message: 'Image Base64 too large. Maximum 50KB allowed. Please upload image as file instead.'
//     }
//   }
// }, { 
//   _id: true,
//   timestamps: false 
// });

// // Variation validation
// variationSchema.pre('validate', function(next) {
//   // Remove large Base64 images to prevent "Field value too long" error
//   if (this.image && this.image.startsWith('data:image') && this.image.length > 50000) {
//     this.image = ""; // Clear large Base64
//   }
  
//   if (!this.size && !this.flavor) {
//     return next(new Error('Variation must have either size or flavor'));
//   }
//   next();
// });

// // ==================== PRODUCT SCHEMA ====================
// const productSchema = new mongoose.Schema({
//   // ========== BASIC INFORMATION ==========
//   name: {
//     type: String,
//     required: [true, 'Product name is required'],
//     trim: true,
//     maxlength: [200, 'Product name cannot exceed 200 characters']
//   },
//   description: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [2000, 'Description cannot exceed 2000 characters']
//   },
//   restaurantName: {
//     type: String,
//     default: "Havbit",
//     trim: true,
//     maxlength: [100, 'Restaurant name cannot exceed 100 characters']
//   },
//   brandName: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [200, 'Brand name cannot exceed 200 characters']
//   },
  
//   // ========== PRICING & STOCK (FOR SINGLE PRODUCTS) ==========
//   oldPrice: {
//     type: Number,
//     default: 0,
//     min: [0, 'Price cannot be negative'],
//     max: [999999, 'Price cannot exceed 999,999']
//   },
//   price: {
//     type: Number,
//     default: 0,
//     min: [0, 'Price cannot be negative'],
//     max: [999999, 'Price cannot exceed 999,999']
//   },
//   stock: {
//     type: Number,
//     default: 0,
//     min: [0, 'Stock cannot be negative'],
//     max: [999999, 'Stock cannot exceed 999,999']
//   },
//   quality: {
//     type: String,
//     enum: {
//       values: ['Standard', 'Premium'],
//       message: '{VALUE} is not a valid quality'
//     },
//     default: 'Standard'
//   },
//   dietPreference: {
//     type: String,
//     enum: {
//       values: ['Veg', 'Non-Veg', 'Egg'],
//       message: '{VALUE} is not a valid diet preference'
//     },
//     default: 'Veg'
//   },
  
//   // ========== VARIATIONS SYSTEM ==========
//   hasVariations: {
//     type: Boolean,
//     default: false
//   },
//   variations: {
//     type: [variationSchema],
//     validate: {
//       validator: function(v) {
//         // Limit variations to prevent large documents
//         return v.length <= 50;
//       },
//       message: 'Maximum 50 variations allowed per product'
//     }
//   },
  
//   // ========== PRODUCT DETAILS ==========
//   productTypes: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [200, 'Product type cannot exceed 200 characters']
//   },
//   flavors: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [500, 'Flavors cannot exceed 500 characters']
//   },
//   size: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [500, 'Size cannot exceed 500 characters']
//   },
//   materialTypes: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [200, 'Material type cannot exceed 200 characters']
//   },
//   ingredients: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [2000, 'Ingredients cannot exceed 2000 characters']
//   },
//   customWeight: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Custom weight cannot exceed 100 characters']
//   },
//   customSizeInput: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Custom size cannot exceed 100 characters']
//   },
//   ageRange: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Age range cannot exceed 100 characters']
//   },
//   containerType: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Container type cannot exceed 100 characters']
//   },
//   itemForm: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Item form cannot exceed 100 characters']
//   },
//   specialty: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [200, 'Specialty cannot exceed 200 characters']
//   },
//   itemTypeName: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [200, 'Item type name cannot exceed 200 characters']
//   },
//   countryOfOrigin: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Country of origin cannot exceed 100 characters']
//   },
  
//   // ========== COMPLIANCE ==========
//   fssaiLicense: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'FSSAI license cannot exceed 100 characters']
//   },
//   legalDisclaimer: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [2000, 'Legal disclaimer cannot exceed 2000 characters']
//   },
  
//   // ========== MANUFACTURING & MARKETING ==========
//   manufacturer: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [200, 'Manufacturer cannot exceed 200 characters']
//   },
//   manufacturerContact: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [500, 'Manufacturer contact cannot exceed 500 characters']
//   },
//   manufacturerAddress: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [1000, 'Manufacturer address cannot exceed 1000 characters']
//   },
//   packagerName: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [200, 'Packager name cannot exceed 200 characters']
//   },
//   packagerAddress: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [1000, 'Packager address cannot exceed 1000 characters']
//   },
//   packagerFssaiLicense: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Packager FSSAI license cannot exceed 100 characters']
//   },
//   marketerName: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [200, 'Marketer name cannot exceed 200 characters']
//   },
//   marketerAddress: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [1000, 'Marketer address cannot exceed 1000 characters']
//   },
//   packerContact: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [500, 'Packer contact cannot exceed 500 characters']
//   },
//   marketerNameAddress: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [1000, 'Marketer name/address cannot exceed 1000 characters']
//   },
  
//   // ========== PACKAGE DETAILS ==========
//   packageColour: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Package colour cannot exceed 100 characters']
//   },
//   measurementUnit: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [50, 'Measurement unit cannot exceed 50 characters']
//   },
//   unitCount: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [50, 'Unit count cannot exceed 50 characters']
//   },
//   numberOfItems: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [50, 'Number of items cannot exceed 50 characters']
//   },
//   itemWeight: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Item weight cannot exceed 100 characters']
//   },
//   totalEaches: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Total eaches cannot exceed 100 characters']
//   },
//   itemPackageWeight: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Item package weight cannot exceed 100 characters']
//   },
//   shelfLife: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'Shelf life cannot exceed 100 characters']
//   },
  
//   // ========== DIETARY & NUTRITION ==========
//   dietaryPreferences: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [500, 'Dietary preferences cannot exceed 500 characters']
//   },
//   allergenInformation: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [1000, 'Allergen information cannot exceed 1000 characters']
//   },
//   nutrition: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [2000, 'Nutrition cannot exceed 2000 characters']
//   },
//   cuisine: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [200, 'Cuisine cannot exceed 200 characters']
//   },
//   directions: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [2000, 'Directions cannot exceed 2000 characters']
//   },
  
//   // ========== LOCATION ==========
//   State: {
//     type: String,
//     default: "",
//     trim: true,
//     maxlength: [100, 'State cannot exceed 100 characters']
//   },
  
//   // ========== CATEGORY ==========
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
//     default: "",
//     // Prevent storing large Base64
//     validate: {
//       validator: function(v) {
//         if (v && v.startsWith('data:image') && v.length > 50000) {
//           return false;
//         }
//         return true;
//       },
//       message: 'Main image Base64 too large. Maximum 50KB allowed.'
//     }
//   },
//   gallery: [{
//     type: String,
//     validate: {
//       validator: function(v) {
//         if (v && v.startsWith('data:image') && v.length > 50000) {
//           return false;
//         }
//         return true;
//       },
//       message: 'Gallery image Base64 too large. Maximum 50KB allowed.'
//     }
//   }],
  
//   // ========== SEO & METADATA ==========
//   slug: {
//     type: String,
//     unique: true,
//     lowercase: true,
//     trim: true,
//     maxlength: [300, 'Slug cannot exceed 300 characters']
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// // ==================== INDEXES ====================
// productSchema.index({ name: 'text', description: 'text', brandName: 'text' });
// productSchema.index({ category: 1 });
// productSchema.index({ restaurantName: 1 });
// productSchema.index({ isActive: 1 });
// productSchema.index({ slug: 1 });
// productSchema.index({ createdAt: -1 });

// // ==================== MIDDLEWARE ====================
// // Pre-save: Generate slug
// productSchema.pre('save', function(next) {
//   if (this.isModified('name') && !this.slug) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '')
//       + '-' + Date.now();
//   }
//   next();
// });

// // Pre-save: Clean large Base64 data BEFORE validation
// productSchema.pre('validate', function(next) {
//   // Clean main image if it's too large
//   if (this.image && this.image.startsWith('data:image') && this.image.length > 50000) {
//     this.image = "";
//   }
  
//   // Clean gallery images
//   if (this.gallery && Array.isArray(this.gallery)) {
//     this.gallery = this.gallery.map(img => {
//       if (img && img.startsWith('data:image') && img.length > 50000) {
//         return "";
//       }
//       return img;
//     }).filter(img => img !== "");
//   }
  
//   // Clean variation images
//   if (this.variations && Array.isArray(this.variations)) {
//     this.variations = this.variations.map(variation => {
//       if (variation.image && variation.image.startsWith('data:image') && variation.image.length > 50000) {
//         variation.image = "";
//       }
//       return variation;
//     });
//   }
  
//   // Limit string lengths to prevent "Field value too long"
//   const stringFields = [
//     'description', 'legalDisclaimer', 'manufacturerAddress', 
//     'packagerAddress', 'marketerAddress', 'ingredients',
//     'nutrition', 'directions', 'allergenInformation'
//   ];
  
//   stringFields.forEach(field => {
//     if (this[field] && this[field].length > 2000) {
//       this[field] = this[field].substring(0, 2000);
//     }
//   });
  
//   next();
// });

// // Pre-save: Validate price consistency
// productSchema.pre('save', function(next) {
//   // If has variations, ensure base prices are 0
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     this.price = 0;
//     this.oldPrice = 0;
//     this.stock = 0;
//   }
  
//   // Validate MRP > Selling Price for single products
//   if (!this.hasVariations && this.oldPrice > 0 && this.price > 0) {
//     if (this.oldPrice <= this.price) {
//       return next(new Error('MRP (oldPrice) must be greater than Selling Price (price)'));
//     }
//   }
  
//   // Validate each variation
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     for (let variation of this.variations) {
//       if (variation.oldPrice > 0 && variation.newPrice > 0) {
//         if (variation.oldPrice <= variation.newPrice) {
//           return next(new Error(`Variation MRP must be greater than Selling Price for ${variation.size} ${variation.flavor}`));
//         }
//       }
//     }
//   }
  
//   next();
// });

// // Pre-save: Clean variation data before saving
// productSchema.pre('save', function(next) {
//   if (this.variations && this.variations.length > 0) {
//     // Ensure each variation has variationId
//     this.variations = this.variations.map((variation, index) => {
//       if (!variation.variationId) {
//         variation.variationId = `var_${Date.now()}_${index}`;
//       }
//       return variation;
//     });
//   }
//   next();
// });

// // ==================== VIRTUALS ====================
// // Virtual for total stock (base + variations)
// productSchema.virtual('totalStock').get(function() {
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     return this.variations.reduce((sum, variation) => sum + (variation.stock || 0), 0);
//   }
//   return this.stock || 0;
// });

// // Virtual for price range (for variation products)
// productSchema.virtual('priceRange').get(function() {
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     const prices = this.variations.map(v => v.newPrice).filter(p => p > 0);
//     if (prices.length === 0) return { min: 0, max: 0 };
    
//     return {
//       min: Math.min(...prices),
//       max: Math.max(...prices)
//     };
//   }
//   return { min: this.price, max: this.price };
// });

// // ==================== METHODS ====================
// // Method to check if product is in stock
// productSchema.methods.isInStock = function() {
//   if (this.hasVariations) {
//     return this.totalStock > 0;
//   }
//   return this.stock > 0;
// };

// // Method to get display price
// productSchema.methods.getDisplayPrice = function() {
//   if (this.hasVariations && this.variations && this.variations.length > 0) {
//     const range = this.priceRange;
//     if (range.min === range.max) {
//       return range.min;
//     }
//     return `${range.min} - ${range.max}`;
//   }
//   return this.price;
// };

// // ==================== STATICS ====================
// // Find by variationId
// productSchema.statics.findByVariationId = function(variationId) {
//   return this.findOne({ 'variations.variationId': variationId });
// };

// // ==================== EXPORT ====================
// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;








// models/Product.js
const mongoose = require('mongoose');

// ==================== VARIATION SCHEMA ====================
const variationSchema = new mongoose.Schema({
  variationId: {
    type: String,
    default: () => `var_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    trim: true,
    maxlength: [100, 'Variation ID cannot exceed 100 characters']
  },
  size: {
    type: String,
    default: "",
    trim: true,
    maxlength: [100, 'Size cannot exceed 100 characters']
  },
  flavor: {
    type: String,
    default: "",
    trim: true,
    maxlength: [100, 'Flavor cannot exceed 100 characters']
  },
  oldPrice: {
    type: Number,
    default: 0,
    min: [0, 'Old price cannot be negative'],
    max: [999999, 'Price cannot exceed 999,999']
  },
  newPrice: {
    type: Number,
    default: 0, // Changed from required to default
    min: [0, 'Price cannot be negative'],
    max: [999999, 'Price cannot exceed 999,999']
  },
  stock: {
    type: Number,
    default: 0, // Changed from required to default
    min: [0, 'Stock cannot be negative'],
    max: [999999, 'Stock cannot exceed 999,999']
  },
  sku: {
    type: String,
    default: "",
    trim: true,
    maxlength: [100, 'SKU cannot exceed 100 characters']
  },
  image: {
    type: String,
    default: "",
    validate: {
      validator: function(v) {
        if (v && v.startsWith('data:image') && v.length > 50000) {
          return false;
        }
        return true;
      },
      message: 'Image Base64 too large. Maximum 50KB allowed.'
    }
  }
}, { 
  _id: true,
  timestamps: false 
});

// ==================== PRODUCT SCHEMA ====================
const productSchema = new mongoose.Schema({
  // ========== BASIC INFORMATION ==========
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters'],
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    default: "No description provided",
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  restaurantName: {
    type: String,
    default: "Havbit",
    trim: true,
    maxlength: [100, 'Restaurant name cannot exceed 100 characters']
  },
  brandName: {
    type: String,
    default: "No Brand",
    trim: true,
    maxlength: [200, 'Brand name cannot exceed 200 characters']
  },
  
  // ========== PRICING & STOCK ==========
  oldPrice: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative'],
    max: [999999, 'Price cannot exceed 999,999']
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative'],
    max: [999999, 'Price cannot exceed 999,999']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative'],
    max: [999999, 'Stock cannot exceed 999,999']
  },
  quality: {
    type: String,
    enum: {
      values: ['Standard', 'Premium'],
      message: '{VALUE} is not a valid quality'
    },
    default: 'Standard'
  },
  dietPreference: {
    type: String,
    enum: {
      values: ['Veg', 'Non-Veg', 'Egg'],
      message: '{VALUE} is not a valid diet preference'
    },
    default: 'Veg'
  },
  
  // ========== VARIATIONS SYSTEM ==========
  hasVariations: {
    type: Boolean,
    default: false
  },
  variations: {
    type: [variationSchema],
    default: [],
    validate: {
      validator: function(v) {
        return v.length <= 50;
      },
      message: 'Maximum 50 variations allowed per product'
    }
  },
  
  // ========== PRODUCT DETAILS ==========
  productTypes: {
    type: String,
    default: "General",
    trim: true,
    maxlength: [200, 'Product type cannot exceed 200 characters']
  },
  flavors: {
    type: String,
    default: "Standard",
    trim: true,
    maxlength: [500, 'Flavors cannot exceed 500 characters']
  },
  size: {
    type: String,
    default: "Standard",
    trim: true,
    maxlength: [500, 'Size cannot exceed 500 characters']
  },
  materialTypes: {
    type: String,
    default: "Not Specified",
    trim: true,
    maxlength: [200, 'Material type cannot exceed 200 characters']
  },
  ingredients: {
    type: String,
    default: "Ingredients not specified",
    trim: true,
    maxlength: [2000, 'Ingredients cannot exceed 2000 characters']
  },
  customWeight: {
    type: String,
    default: "Not Specified",
    trim: true,
    maxlength: [100, 'Custom weight cannot exceed 100 characters']
  },
  customSizeInput: {
    type: String,
    default: "Not Specified",
    trim: true,
    maxlength: [100, 'Custom size cannot exceed 100 characters']
  },
  ageRange: {
    type: String,
    default: "All Ages",
    trim: true,
    maxlength: [100, 'Age range cannot exceed 100 characters']
  },
  containerType: {
    type: String,
    default: "Standard Packaging",
    trim: true,
    maxlength: [100, 'Container type cannot exceed 100 characters']
  },
  itemForm: {
    type: String,
    default: "Standard",
    trim: true,
    maxlength: [100, 'Item form cannot exceed 100 characters']
  },
  specialty: {
    type: String,
    default: "Regular",
    trim: true,
    maxlength: [200, 'Specialty cannot exceed 200 characters']
  },
  itemTypeName: {
    type: String,
    default: "Product",
    trim: true,
    maxlength: [200, 'Item type name cannot exceed 200 characters']
  },
  countryOfOrigin: {
    type: String,
    default: "India",
    trim: true,
    maxlength: [100, 'Country of origin cannot exceed 100 characters']
  },
  
  // ========== COMPLIANCE ==========
  fssaiLicense: {
    type: String,
    default: "Not Applicable",
    trim: true,
    maxlength: [100, 'FSSAI license cannot exceed 100 characters']
  },
  legalDisclaimer: {
    type: String,
    default: "Product sold as is. Please refer to product description for details.",
    trim: true,
    maxlength: [2000, 'Legal disclaimer cannot exceed 2000 characters']
  },
  
  // ========== MANUFACTURING & MARKETING ==========
  manufacturer: {
    type: String,
    default: "Not Specified",
    trim: true,
    maxlength: [200, 'Manufacturer cannot exceed 200 characters']
  },
  manufacturerContact: {
    type: String,
    default: "Not Available",
    trim: true,
    maxlength: [500, 'Manufacturer contact cannot exceed 500 characters']
  },
  manufacturerAddress: {
    type: String,
    default: "Not Available",
    trim: true,
    maxlength: [1000, 'Manufacturer address cannot exceed 1000 characters']
  },
  packagerName: {
    type: String,
    default: "Not Specified",
    trim: true,
    maxlength: [200, 'Packager name cannot exceed 200 characters']
  },
  packagerAddress: {
    type: String,
    default: "Not Available",
    trim: true,
    maxlength: [1000, 'Packager address cannot exceed 1000 characters']
  },
  packagerFssaiLicense: {
    type: String,
    default: "Not Applicable",
    trim: true,
    maxlength: [100, 'Packager FSSAI license cannot exceed 100 characters']
  },
  marketerName: {
    type: String,
    default: "Havbit",
    trim: true,
    maxlength: [200, 'Marketer name cannot exceed 200 characters']
  },
  marketerAddress: {
    type: String,
    default: "Not Available",
    trim: true,
    maxlength: [1000, 'Marketer address cannot exceed 1000 characters']
  },
  packerContact: {
    type: String,
    default: "Not Available",
    trim: true,
    maxlength: [500, 'Packer contact cannot exceed 500 characters']
  },
  marketerNameAddress: {
    type: String,
    default: "Havbit, Not Available",
    trim: true,
    maxlength: [1000, 'Marketer name/address cannot exceed 1000 characters']
  },
  
  // ========== PACKAGE DETAILS ==========
  packageColour: {
    type: String,
    default: "Standard",
    trim: true,
    maxlength: [100, 'Package colour cannot exceed 100 characters']
  },
  measurementUnit: {
    type: String,
    default: "Units",
    trim: true,
    maxlength: [50, 'Measurement unit cannot exceed 50 characters']
  },
  unitCount: {
    type: String,
    default: "1",
    trim: true,
    maxlength: [50, 'Unit count cannot exceed 50 characters']
  },
  numberOfItems: {
    type: String,
    default: "1",
    trim: true,
    maxlength: [50, 'Number of items cannot exceed 50 characters']
  },
  itemWeight: {
    type: String,
    default: "Not Specified",
    trim: true,
    maxlength: [100, 'Item weight cannot exceed 100 characters']
  },
  totalEaches: {
    type: String,
    default: "1",
    trim: true,
    maxlength: [100, 'Total eaches cannot exceed 100 characters']
  },
  itemPackageWeight: {
    type: String,
    default: "Not Specified",
    trim: true,
    maxlength: [100, 'Item package weight cannot exceed 100 characters']
  },
  shelfLife: {
    type: String,
    default: "Standard Shelf Life",
    trim: true,
    maxlength: [100, 'Shelf life cannot exceed 100 characters']
  },
  
  // ========== DIETARY & NUTRITION ==========
  dietaryPreferences: {
    type: String,
    default: "Standard",
    trim: true,
    maxlength: [500, 'Dietary preferences cannot exceed 500 characters']
  },
  allergenInformation: {
    type: String,
    default: "No known allergens",
    trim: true,
    maxlength: [1000, 'Allergen information cannot exceed 1000 characters']
  },
  nutrition: {
    type: String,
    default: "Nutritional information not available",
    trim: true,
    maxlength: [2000, 'Nutrition cannot exceed 2000 characters']
  },
  cuisine: {
    type: String,
    default: "General",
    trim: true,
    maxlength: [200, 'Cuisine cannot exceed 200 characters']
  },
  directions: {
    type: String,
    default: "Use as directed",
    trim: true,
    maxlength: [2000, 'Directions cannot exceed 2000 characters']
  },
  
  // ========== LOCATION ==========
  State: {
    type: String,
    default: "Not Specified",
    trim: true,
    maxlength: [100, 'State cannot exceed 100 characters']
  },
  
  // ========== CATEGORY ==========
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    default: null
  },
  
  // ========== IMAGES ==========
  image: {
    type: String,
    default: "",
    validate: {
      validator: function(v) {
        if (v && v.startsWith('data:image') && v.length > 50000) {
          return false;
        }
        return true;
      },
      message: 'Main image Base64 too large. Maximum 50KB allowed.'
    }
  },
  gallery: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        return v.length <= 10; // Max 10 gallery images
      },
      message: 'Maximum 10 gallery images allowed'
    }
  },
  
  // ========== SEO & METADATA ==========
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: [300, 'Slug cannot exceed 300 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ==================== MIDDLEWARE ====================
productSchema.pre('save', function(next) {
  // Generate slug if not exists
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now().toString(36);
  }
  
  // Set default values for empty strings
  const stringFields = [
    'brandName', 'description', 'productTypes', 'flavors', 'size',
    'materialTypes', 'ingredients', 'customWeight', 'customSizeInput',
    'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName',
    'countryOfOrigin', 'fssaiLicense', 'legalDisclaimer', 'manufacturer',
    'manufacturerContact', 'manufacturerAddress', 'packagerName',
    'packagerAddress', 'packagerFssaiLicense', 'marketerName',
    'marketerAddress', 'packerContact', 'marketerNameAddress',
    'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
    'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife',
    'dietaryPreferences', 'allergenInformation', 'nutrition',
    'cuisine', 'directions', 'State'
  ];
  
  stringFields.forEach(field => {
    if (!this[field] || this[field].trim() === '') {
      switch(field) {
        case 'brandName': this[field] = 'No Brand'; break;
        case 'description': this[field] = 'No description provided'; break;
        case 'ingredients': this[field] = 'Ingredients not specified'; break;
        case 'allergenInformation': this[field] = 'No known allergens'; break;
        case 'nutrition': this[field] = 'Nutritional information not available'; break;
        case 'directions': this[field] = 'Use as directed'; break;
        case 'legalDisclaimer': this[field] = 'Product sold as is. Please refer to product description for details.'; break;
        default: this[field] = 'Not Specified';
      }
    }
  });
  
  // Fix numeric values
  if (this.price < 0) this.price = 0;
  if (this.oldPrice < 0) this.oldPrice = 0;
  if (this.stock < 0) this.stock = 0;
  
  // Handle variations
  if (this.variations && this.variations.length > 0) {
    this.hasVariations = true;
    this.variations.forEach(variation => {
      if (variation.newPrice < 0) variation.newPrice = 0;
      if (variation.oldPrice < 0) variation.oldPrice = 0;
      if (variation.stock < 0) variation.stock = 0;
    });
  }
  
  next();
});

// ==================== VIRTUALS ====================
productSchema.virtual('totalStock').get(function() {
  if (this.hasVariations && this.variations && this.variations.length > 0) {
    return this.variations.reduce((sum, variation) => sum + (variation.stock || 0), 0);
  }
  return this.stock || 0;
});

productSchema.virtual('priceRange').get(function() {
  if (this.hasVariations && this.variations && this.variations.length > 0) {
    const prices = this.variations.map(v => v.newPrice).filter(p => p > 0);
    if (prices.length === 0) return { min: 0, max: 0 };
    
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }
  return { min: this.price, max: this.price };
});

// ==================== METHODS ====================
productSchema.methods.isInStock = function() {
  if (this.hasVariations) {
    return this.totalStock > 0;
  }
  return this.stock > 0;
};

productSchema.methods.getDisplayPrice = function() {
  if (this.hasVariations && this.variations && this.variations.length > 0) {
    const range = this.priceRange;
    if (range.min === range.max) {
      return range.min;
    }
    return `${range.min} - ${range.max}`;
  }
  return this.price;
};

// ==================== STATICS ====================
productSchema.statics.findByVariationId = function(variationId) {
  return this.findOne({ 'variations.variationId': variationId });
};

productSchema.statics.createSampleProduct = function(categoryId, subcategoryId = null) {
  return this.create({
    name: "Sample Product",
    description: "This is a sample product description.",
    brandName: "Sample Brand",
    price: 100,
    oldPrice: 120,
    stock: 50,
    quality: "Standard",
    dietPreference: "Veg",
    restaurantName: "Havbit",
    productTypes: "General",
    flavors: "Standard",
    size: "Standard",
    ingredients: "Sample ingredients",
    ageRange: "All Ages",
    containerType: "Standard Packaging",
    itemForm: "Standard",
    specialty: "Regular",
    itemTypeName: "Product",
    countryOfOrigin: "India",
    category: categoryId,
    subcategory: subcategoryId,
    isActive: true
  });
};

// ==================== INDEXES ====================
productSchema.index({ name: 'text', description: 'text', brandName: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ restaurantName: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ price: 1 });
productSchema.index({ 'variations.newPrice': 1 });

// ==================== EXPORT ====================
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
