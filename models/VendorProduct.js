



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

const VariationSchema = new mongoose.Schema({
  size: {
    type: String,
    default: ""
  },
  flavor: {
    type: String,
    default: ""
  },
  customSize: {
    type: String,
    default: ""
  },
  customFlavor: {
    type: String,
    default: ""
  },
  oldPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  newPrice: {
    type: Number,
    default: 0,
    min: 0,
    required: [true, "Variation price is required"]
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
    required: [true, "Variation stock is required"]
  },
  sku: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { _id: true });

const VendorProductSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: { 
      type: String, 
      required: [true, "Product name is required"],
      trim: true 
    },
    description: {
      type: String,
      default: ""
    },
    
    /* ================= BRAND & SHOP INFO ================= */
    brandName: {
      type: String,
      default: ""
    },
    restaurantName: { 
      type: String, 
      default: "" 
    },
    hasVariations: {
      type: Boolean,
      default: false
    },
    
    /* ================= VARIATIONS ================= */
    variations: [VariationSchema],
    
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
    sellingPrice: {
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
      enum: ["Standard", "Premium", "Good", "Fresh", "Butter", "Organic"]
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
    productTypes: {
      type: String,
      default: ""
    },
    flavors: [{
      type: String,
      trim: true
    }],
    size: [{
      type: String,
      trim: true
    }],
    materialTypes: {
      type: String,
      default: ""
    },
    ingredients: {
      type: String,
      default: ""
    },
    customWeight: {
      type: String,
      default: ""
    },
    customSizeInput: {
      type: String,
      default: ""
    },
    customFlavorInput: {
      type: String,
      default: ""
    },
    
    /* ================= PRODUCT SPECIFICATIONS ================= */
    ageRange: {
      type: String,
      default: ""
    },
    containerType: {
      type: String,
      default: ""
    },
    itemForm: {
      type: String,
      default: ""
    },
    specialty: {
      type: String,
      default: ""
    },
    itemTypeName: {
      type: String,
      default: ""
    },
    countryOfOrigin: {
      type: String,
      default: "India"
    },
    
    /* ================= COMPLIANCE ================= */
    fssaiLicense: {
      type: String,
      default: ""
    },
    legalDisclaimer: {
      type: String,
      default: ""
    },
    shelfLife: {
      type: String,
      default: ""
    },
    
    /* ================= MANUFACTURING ================= */
    manufacturer: {
      type: String,
      default: ""
    },
    manufacturerContact: {
      type: String,
      default: ""
    },
    manufacturerName: {
      type: String,
      default: ""
    },
    manufacturerAddress: {
      type: String,
      default: ""
    },
    packerContact: {
      type: String,
      default: ""
    },
    packagerName: {
      type: String,
      default: ""
    },
    packagerAddress: {
      type: String,
      default: ""
    },
    packagerFssaiLicense: {
      type: String,
      default: ""
    },
    marketerNameAddress: {
      type: String,
      default: ""
    },
    marketerName: {
      type: String,
      default: ""
    },
    marketerAddress: {
      type: String,
      default: ""
    },
    
    /* ================= PACKAGE DETAILS ================= */
    packageColour: {
      type: String,
      default: ""
    },
    measurementUnit: {
      type: String,
      default: ""
    },
    unitCount: {
      type: String,
      default: ""
    },
    numberOfItems: {
      type: String,
      default: ""
    },
    itemWeight: {
      type: String,
      default: ""
    },
    totalEaches: {
      type: String,
      default: ""
    },
    itemPackageWeight: {
      type: String,
      default: ""
    },
    
    /* ================= DIETARY & NUTRITION ================= */
    dietaryPreferences: {
      type: String,
      default: ""
    },
    allergenInfo: {
      type: String,
      default: ""
    },
    allergenInformation: {
      type: String,
      default: ""
    },
    nutrition: {
      type: String,
      default: ""
    },
    cuisine: {
      type: String,
      default: ""
    },
    directions: {
      type: String,
      default: ""
    },
    
    /* ================= LOCATION ================= */
    State: {
      type: String,
      default: ""
    },
    
    /* ================= MEDIA ================= */
    image: {
      type: String,
      default: ""
    },
    gallery: [{
      type: String
    }],
    
    /* ================= VENDOR ================= */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true
    },
    
    /* ================= STATUS ================= */
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better performance
VendorProductSchema.index({ vendor: 1, createdAt: -1 });
VendorProductSchema.index({ category: 1 });
VendorProductSchema.index({ subcategory: 1 });
VendorProductSchema.index({ name: "text", description: "text" });
VendorProductSchema.index({ price: 1 });
VendorProductSchema.index({ brandName: 1 });
VendorProductSchema.index({ fssaiLicense: 1 });
VendorProductSchema.index({ hasVariations: 1 });
VendorProductSchema.index({ isActive: 1 });
VendorProductSchema.index({ isApproved: 1 });

// Pre-save middleware
VendorProductSchema.pre('save', function(next) {
  // Ensure arrays exist
  if (!Array.isArray(this.flavors)) this.flavors = [];
  if (!Array.isArray(this.size)) this.size = [];
  if (!Array.isArray(this.gallery)) this.gallery = [];
  if (!Array.isArray(this.variations)) this.variations = [];
  
  // Clean arrays
  this.flavors = this.flavors
    .filter(f => f && typeof f === 'string' && f.trim() !== '')
    .map(f => f.trim());
    
  this.size = this.size
    .filter(s => s && typeof s === 'string' && s.trim() !== '')
    .map(s => s.trim());
    
  this.gallery = this.gallery
    .filter(img => img && typeof img === 'string' && img.trim() !== '')
    .map(img => img.trim());
  
  // Clean variations
  this.variations = this.variations.map(variation => ({
    ...variation,
    size: variation.size || "",
    flavor: variation.flavor || "",
    customSize: variation.customSize || "",
    customFlavor: variation.customFlavor || "",
    sku: variation.sku || "",
    image: variation.image || ""
  }));
  
  // Sync FSSAI fields
  if (this.brandName && !this.fssaiLicense) {
    this.fssaiLicense = this.brandName;
  }
  if (this.fssaiLicense && !this.brandName) {
    this.brandName = this.fssaiLicense;
  }
  
  // Sync price fields
  if (this.price && !this.sellingPrice) {
    this.sellingPrice = this.price;
  }
  if (this.sellingPrice && !this.price) {
    this.price = this.sellingPrice;
  }
  
  // Sync manufacturer fields
  if (this.manufacturerName && !this.manufacturer) {
    this.manufacturer = this.manufacturerName;
  }
  if (this.manufacturerAddress && !this.manufacturerContact) {
    this.manufacturerContact = this.manufacturerAddress;
  }
  
  next();
});

// Virtual for discount percentage
VendorProductSchema.virtual('discountPercentage').get(function() {
  if (!this.oldPrice || this.oldPrice <= this.price) return 0;
  return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
});

// Virtual for total variation stock
VendorProductSchema.virtual('totalVariationStock').get(function() {
  if (!this.hasVariations || !Array.isArray(this.variations)) return 0;
  return this.variations.reduce((total, variation) => total + (variation.stock || 0), 0);
});

// Method to check stock status
VendorProductSchema.methods.getStockStatus = function() {
  if (this.hasVariations && this.variations.length > 0) {
    const totalStock = this.totalVariationStock;
    if (totalStock > 10) return "In Stock";
    if (totalStock > 0) return "Low Stock";
    return "Out of Stock";
  } else {
    if (this.stock > 10) return "In Stock";
    if (this.stock > 0) return "Low Stock";
    return "Out of Stock";
  }
};

module.exports = mongoose.model("VendorProduct", VendorProductSchema);
