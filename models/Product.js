



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








const mongoose = require('mongoose');

// ==================== VARIATION SCHEMA ====================
const variationSchema = new mongoose.Schema({
  variationId: {  // Add this field for frontend reference
    type: String,
    default: "",
    trim: true
  },
  size: {
    type: String,
    default: "",
    trim: true
  },
  flavor: {
    type: String,
    default: "",
    trim: true
  },
  oldPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  newPrice: {
    type: Number,
    required: [true, 'Variation price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Variation stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  sku: {
    type: String,
    default: "",
    trim: true
  },
  image: {
    type: String,
    default: ""
  }
}, { 
  _id: true,  // Keep _id for MongoDB but we'll handle it separately
  timestamps: false 
});

// Variation validation
variationSchema.pre('validate', function(next) {
  if (!this.size && !this.flavor) {
    next(new Error('Variation must have either size or flavor'));
  }
  next();
});

// ==================== PRODUCT SCHEMA ====================
const productSchema = new mongoose.Schema({
  // ========== BASIC INFORMATION ==========
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  restaurantName: {
    type: String,
    default: "Havbit",
    trim: true
  },
  brandName: {
    type: String,
    default: "",
    trim: true
  },
  
  // ========== PRICING & STOCK (FOR SINGLE PRODUCTS) ==========
  oldPrice: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
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
  variations: [variationSchema],
  
  // ========== PRODUCT DETAILS ==========
  productTypes: {
    type: String,
    default: "",
    trim: true
  },
  flavors: {
    type: String,
    default: "",
    trim: true
  },
  size: {
    type: String,
    default: "",
    trim: true
  },
  materialTypes: {
    type: String,
    default: "",
    trim: true
  },
  ingredients: {
    type: String,
    default: "",
    trim: true
  },
  customWeight: {
    type: String,
    default: "",
    trim: true
  },
  customSizeInput: {
    type: String,
    default: "",
    trim: true
  },
  ageRange: {
    type: String,
    default: "",
    trim: true
  },
  containerType: {
    type: String,
    default: "",
    trim: true
  },
  itemForm: {
    type: String,
    default: "",
    trim: true
  },
  specialty: {
    type: String,
    default: "",
    trim: true
  },
  itemTypeName: {
    type: String,
    default: "",
    trim: true
  },
  countryOfOrigin: {
    type: String,
    default: "",
    trim: true
  },
  
  // ========== COMPLIANCE ==========
  fssaiLicense: {
    type: String,
    default: "",
    trim: true
  },
  legalDisclaimer: {
    type: String,
    default: "",
    trim: true
  },
  
  // ========== MANUFACTURING & MARKETING ==========
  manufacturer: {
    type: String,
    default: "",
    trim: true
  },
  manufacturerContact: {
    type: String,
    default: "",
    trim: true
  },
  manufacturerAddress: {
    type: String,
    default: "",
    trim: true
  },
  packagerName: {
    type: String,
    default: "",
    trim: true
  },
  packagerAddress: {
    type: String,
    default: "",
    trim: true
  },
  packagerFssaiLicense: {
    type: String,
    default: "",
    trim: true
  },
  marketerName: {
    type: String,
    default: "",
    trim: true
  },
  marketerAddress: {
    type: String,
    default: "",
    trim: true
  },
  packerContact: {
    type: String,
    default: "",
    trim: true
  },
  marketerNameAddress: {
    type: String,
    default: "",
    trim: true
  },
  
  // ========== PACKAGE DETAILS ==========
  packageColour: {
    type: String,
    default: "",
    trim: true
  },
  measurementUnit: {
    type: String,
    default: "",
    trim: true
  },
  unitCount: {
    type: String,
    default: "",
    trim: true
  },
  numberOfItems: {
    type: String,
    default: "",
    trim: true
  },
  itemWeight: {
    type: String,
    default: "",
    trim: true
  },
  totalEaches: {
    type: String,
    default: "",
    trim: true
  },
  itemPackageWeight: {
    type: String,
    default: "",
    trim: true
  },
  shelfLife: {
    type: String,
    default: "",
    trim: true
  },
  
  // ========== DIETARY & NUTRITION ==========
  dietaryPreferences: {
    type: String,
    default: "",
    trim: true
  },
  allergenInformation: {
    type: String,
    default: "",
    trim: true
  },
  nutrition: {
    type: String,
    default: "",
    trim: true
  },
  cuisine: {
    type: String,
    default: "",
    trim: true
  },
  directions: {
    type: String,
    default: "",
    trim: true
  },
  
  // ========== LOCATION ==========
  State: {
    type: String,
    default: "",
    trim: true
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
    default: ""
  },
  gallery: [{
    type: String
  }],
  
  // ========== SEO & METADATA ==========
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
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

// ==================== INDEXES ====================
productSchema.index({ name: 'text', description: 'text', brandName: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ restaurantName: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ createdAt: -1 });

// ==================== MIDDLEWARE ====================
// Pre-save: Generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now();
  }
  next();
});

// Pre-save: Validate price consistency and handle variations
productSchema.pre('save', function(next) {
  // If has variations, ensure base prices are 0
  if (this.hasVariations && this.variations && this.variations.length > 0) {
    this.price = 0;
    this.oldPrice = 0;
    this.stock = 0;
  }
  
  // Validate MRP > Selling Price for single products
  if (!this.hasVariations && this.oldPrice > 0 && this.price > 0) {
    if (this.oldPrice <= this.price) {
      return next(new Error('MRP (oldPrice) must be greater than Selling Price (price)'));
    }
  }
  
  // Validate each variation
  if (this.hasVariations && this.variations && this.variations.length > 0) {
    for (let variation of this.variations) {
      if (variation.oldPrice > 0 && variation.newPrice > 0) {
        if (variation.oldPrice <= variation.newPrice) {
          return next(new Error(`Variation MRP must be greater than Selling Price for ${variation.size} ${variation.flavor}`));
        }
      }
    }
  }
  
  next();
});

// Pre-save: Clean variation data before saving
productSchema.pre('save', function(next) {
  if (this.variations && this.variations.length > 0) {
    // Ensure each variation has variationId
    this.variations = this.variations.map((variation, index) => {
      if (!variation.variationId) {
        variation.variationId = `var_${Date.now()}_${index}`;
      }
      return variation;
    });
  }
  next();
});

// ==================== VIRTUALS ====================
// Virtual for total stock (base + variations)
productSchema.virtual('totalStock').get(function() {
  if (this.hasVariations && this.variations && this.variations.length > 0) {
    return this.variations.reduce((sum, variation) => sum + (variation.stock || 0), 0);
  }
  return this.stock || 0;
});

// Virtual for price range (for variation products)
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
// Method to check if product is in stock
productSchema.methods.isInStock = function() {
  if (this.hasVariations) {
    return this.totalStock > 0;
  }
  return this.stock > 0;
};

// Method to get display price
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
// Find by variationId
productSchema.statics.findByVariationId = function(variationId) {
  return this.findOne({ 'variations.variationId': variationId });
};

// ==================== EXPORT ====================
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
