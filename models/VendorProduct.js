

// // module.exports = mongoose.model("VendorProduct", VendorProductSchema);
// const mongoose = require("mongoose");

// // Variation Schema - Minimal (only what you need)
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

// const VendorProductSchema = new mongoose.Schema(
//   {
//     /* ================= BASIC INFO ================= */
//     name: { 
//       type: String, 
//       required: [true, "Product name is required"],
//       trim: true 
//     },
//     description: String,
    
//     /* ================= VARIATIONS SUPPORT ================= */
//     hasVariations: {
//       type: Boolean,
//       default: false
//     },
//     variations: {
//       type: [variationSchema],
//       default: []
//     },
    
//     /* ================= BRAND & SHOP INFO ================= */
//     brandName: String,
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
//     price: {
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
//       enum: ["Veg", "Non-Veg", "Egg", "Vegan"]
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
//     flavors: [String],
//     size: [String],
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
//     fssaiLicense: String,
//     legalDisclaimer: String,
//     shelfLife: String,
    
//     /* ================= MANUFACTURING ================= */
//     manufacturerName: String,
//     manufacturerAddress: String,
//     manufacturer: String,
//     manufacturerContact: String,
    
//     /* ================= PACKAGER ================= */
//     packagerName: String,
//     packagerAddress: String,
//     packagerFssaiLicense: String,
//     packerContact: String,
    
//     /* ================= MARKETER ================= */
//     marketerName: String,
//     marketerAddress: String,
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
//     State: String,
    
//     /* ================= MEDIA ================= */
//     image: String,
//     gallery: [String],
    
//     /* ================= VENDOR ================= */
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true
//     },
    
//     /* ================= STATUS ================= */
//     status: {
//       type: String,
//       enum: ['active', 'inactive', 'draft', 'out_of_stock', 'pending_approval'],
//       default: 'pending_approval'
//     },
    
//     /* ================= TAGS ================= */
//     tags: {
//       type: [String],
//       default: []
//     },
    
//     /* ================= SEO ================= */
//     metaTitle: String,
//     metaDescription: String,
//     keywords: [String]
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // ==================== VIRTUAL FIELDS (EXISTING) ====================
// VendorProductSchema.virtual('categoryName').get(function() {
//   return this.category?.name || '';
// });

// VendorProductSchema.virtual('subcategoryName').get(function() {
//   return this.subcategory?.name || '';
// });

// VendorProductSchema.virtual('vendorName').get(function() {
//   return this.vendor?.storeName || this.vendor?.name || '';
// });

// VendorProductSchema.virtual('discountPercentage').get(function() {
//   if (this.oldPrice > 0 && this.price > 0 && this.oldPrice > this.price) {
//     return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
//   }
//   return 0;
// });

// VendorProductSchema.virtual('isInStock').get(function() {
//   if (this.hasVariations && this.variations.length > 0) {
//     return this.variations.some(v => v.stock > 0);
//   }
//   return this.stock > 0;
// });

// // ==================== PRE-SAVE MIDDLEWARE ====================
// VendorProductSchema.pre('save', function(next) {
//   // Ensure arrays (EXISTING)
//   if (!Array.isArray(this.flavors)) {
//     if (typeof this.flavors === 'string' && this.flavors.trim() !== '') {
//       this.flavors = this.flavors.split(',')
//         .map(f => f.trim())
//         .filter(f => f !== '');
//     } else {
//       this.flavors = [];
//     }
//   }
  
//   if (!Array.isArray(this.size)) {
//     if (typeof this.size === 'string' && this.size.trim() !== '') {
//       this.size = this.size.split(',')
//         .map(s => s.trim())
//         .filter(s => s !== '');
//     } else {
//       this.size = [];
//     }
//   }
  
//   if (!Array.isArray(this.gallery)) {
//     this.gallery = [];
//   }
  
//   if (!Array.isArray(this.tags)) {
//     if (typeof this.tags === 'string' && this.tags.trim() !== '') {
//       this.tags = this.tags.split(',')
//         .map(t => t.trim())
//         .filter(t => t !== '');
//     } else {
//       this.tags = [];
//     }
//   }
  
//   if (!Array.isArray(this.keywords)) {
//     if (typeof this.keywords === 'string' && this.keywords.trim() !== '') {
//       this.keywords = this.keywords.split(',')
//         .map(k => k.trim())
//         .filter(k => k !== '');
//     } else {
//       this.keywords = [];
//     }
//   }
  
//   // Ensure variations array
//   if (!Array.isArray(this.variations)) {
//     this.variations = [];
//   }
  
//   // Handle variations pricing and stock
//   if (this.hasVariations && this.variations.length > 0) {
//     // Calculate price from variations (min price)
//     const validPrices = this.variations
//       .map(v => v.newPrice || v.price || 0)
//       .filter(p => p > 0);
    
//     if (validPrices.length > 0) {
//       this.price = Math.min(...validPrices);
//       this.oldPrice = Math.max(...this.variations.map(v => v.oldPrice || 0));
//     }
    
//     // Calculate total stock from variations
//     this.stock = this.variations.reduce((total, v) => total + (v.stock || 0), 0);
//   }
  
//   // Ensure FSSAI consistency
//   if (this.brandName && !this.fssaiLicense) {
//     this.fssaiLicense = this.brandName;
//   }
//   if (this.fssaiLicense && !this.brandName) {
//     this.brandName = this.fssaiLicense;
//   }
  
//   // Auto-update status based on stock
//   if (this.hasVariations && this.variations.length > 0) {
//     const hasStock = this.variations.some(v => v.stock > 0);
//     if (!hasStock && this.status !== 'inactive') {
//       this.status = 'out_of_stock';
//     } else if (this.status === 'out_of_stock' && hasStock) {
//       this.status = 'active';
//     }
//   } else {
//     if (this.stock <= 0 && this.status !== 'inactive') {
//       this.status = 'out_of_stock';
//     } else if (this.status === 'out_of_stock' && this.stock > 0) {
//       this.status = 'active';
//     }
//   }
  
//   // Set manufacturer fields if not set
//   if (!this.manufacturerName && this.manufacturer) {
//     this.manufacturerName = this.manufacturer;
//   }
//   if (!this.manufacturer && this.manufacturerName) {
//     this.manufacturer = this.manufacturerName;
//   }
  
//   if (!this.manufacturerAddress && this.manufacturerContact) {
//     this.manufacturerAddress = this.manufacturerContact;
//   }
//   if (!this.manufacturerContact && this.manufacturerAddress) {
//     this.manufacturerContact = this.manufacturerAddress;
//   }
  
//   next();
// });

// // ==================== INDEXES ====================
// VendorProductSchema.index({ vendor: 1 });
// VendorProductSchema.index({ category: 1 });
// VendorProductSchema.index({ subcategory: 1 });
// VendorProductSchema.index({ name: 1 });
// VendorProductSchema.index({ price: 1 });
// VendorProductSchema.index({ brandName: 1 });
// VendorProductSchema.index({ fssaiLicense: 1 });
// VendorProductSchema.index({ status: 1 });
// VendorProductSchema.index({ createdAt: -1 });
// VendorProductSchema.index({ tags: 1 });
// VendorProductSchema.index({ "vendor.storeName": 1 });
// VendorProductSchema.index({ hasVariations: 1 });

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);



const mongoose = require("mongoose");

// Variation Schema - Updated to match frontend
const variationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: () => `var_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
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
  price: { // Add price field for compatibility
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
  },
  imageFile: { // Store file reference if needed
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
      default: 0,
      min: 0
    },
    newPrice: { // Add newPrice field for frontend compatibility
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
    customFlavorInput: String, // Add this field
    
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
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        // Ensure newPrice is populated from price for frontend
        if (ret.price && !ret.newPrice) {
          ret.newPrice = ret.price;
        }
        return ret;
      }
    },
    toObject: { 
      virtuals: true,
      transform: function(doc, ret) {
        if (ret.price && !ret.newPrice) {
          ret.newPrice = ret.price;
        }
        return ret;
      }
    }
  }
);

// ==================== VIRTUAL FIELDS ====================
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
  const mrp = this.oldPrice || 0;
  const sellingPrice = this.price || this.newPrice || 0;
  
  if (mrp > 0 && sellingPrice > 0 && mrp > sellingPrice) {
    return Math.round(((mrp - sellingPrice) / mrp) * 100);
  }
  return 0;
});

VendorProductSchema.virtual('isInStock').get(function() {
  if (this.hasVariations && this.variations?.length > 0) {
    return this.variations.some(v => v.stock > 0);
  }
  return this.stock > 0;
});

// ==================== PRE-SAVE MIDDLEWARE ====================
VendorProductSchema.pre('save', function(next) {
  // Ensure newPrice is synced with price
  if (this.price && !this.newPrice) {
    this.newPrice = this.price;
  }
  if (this.newPrice && !this.price) {
    this.price = this.newPrice;
  }
  
  // Ensure arrays
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
  
  // Handle variations - ensure each variation has price synced with newPrice
  if (this.hasVariations && this.variations.length > 0) {
    this.variations = this.variations.map(variation => {
      // Ensure variation has an id
      if (!variation.id) {
        variation.id = `var_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      // Sync price with newPrice in variations
      if (variation.newPrice && !variation.price) {
        variation.price = variation.newPrice;
      }
      if (variation.price && !variation.newPrice) {
        variation.newPrice = variation.price;
      }
      
      return variation;
    });
    
    // Calculate product-level pricing from variations
    const validPrices = this.variations
      .map(v => v.newPrice || v.price || 0)
      .filter(p => p > 0);
    
    const validOldPrices = this.variations
      .map(v => v.oldPrice || 0)
      .filter(p => p > 0);
    
    if (validPrices.length > 0) {
      // Set product price to minimum variation price
      this.price = Math.min(...validPrices);
      this.newPrice = this.price;
      
      // Set old price to maximum variation oldPrice
      if (validOldPrices.length > 0) {
        this.oldPrice = Math.max(...validOldPrices);
      }
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
  
  // Auto-set packer contact if not set
  if (!this.packerContact && (this.packagerName || this.packagerAddress)) {
    this.packerContact = `${this.packagerName || ''}${this.packagerAddress ? `, ${this.packagerAddress}` : ''}`.trim();
  }
  
  // Auto-set marketer contact if not set
  if (!this.marketerNameAddress && (this.marketerName || this.marketerAddress)) {
    this.marketerNameAddress = `${this.marketerName || ''}${this.marketerAddress ? `, ${this.marketerAddress}` : ''}`.trim();
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
VendorProductSchema.index({ "variations.id": 1 });
VendorProductSchema.index({ hasVariations: 1 });
VendorProductSchema.index({ restaurantName: 1 });

module.exports = mongoose.model("VendorProduct", VendorProductSchema);
