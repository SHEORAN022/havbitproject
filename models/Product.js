



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






const mongoose = require("mongoose");

// Image Schema for better structure
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: String,
  originalname: String,
  mimetype: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
  isMain: { type: Boolean, default: false },
  type: { type: String, enum: ['main', 'mandatory', 'gallery', 'variation'], default: 'gallery' },
  caption: String,
  altText: String,
  order: { type: Number, default: 0 }
});

const VariationSchema = new mongoose.Schema({
  size: String,
  flavor: String,
  color: String,
  material: String,
  customAttribute: String,
  oldPrice: { type: Number, default: 0 },
  newPrice: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  sku: String,
  image: ImageSchema, // Variation main image
  gallery: [ImageSchema], // Variation gallery (max 12)
  isActive: { type: Boolean, default: true },
  attributes: mongoose.Schema.Types.Mixed // Flexible attributes
}, { timestamps: true });

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
    
    /* ================= VARIATIONS ================= */
    hasVariations: { type: Boolean, default: false },
    variations: [VariationSchema],
    
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
    State: String,
    
    /* ================= MEDIA ================= */
    image: ImageSchema, // Main product image
    gallery: [ImageSchema], // Product gallery (max 12)
    
    /* ================= VENDOR ================= */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null
    },
    
    /* ================= SEO & META ================= */
    slug: { type: String, unique: true },
    metaTitle: String,
    metaDescription: String,
    tags: [String],
    
    /* ================= STATUS ================= */
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    
    /* ================= STATS ================= */
    views: { type: Number, default: 0 },
    purchaseCount: { type: Number, default: 0 },
    
    /* ================= IMAGE SETTINGS ================= */
    maxGalleryImages: { type: Number, default: 12 },
    maxVariationImages: { type: Number, default: 12 }
  },
  {
    timestamps: true,
  }
);

// Virtual for getting gallery count
ProductSchema.virtual('galleryCount').get(function() {
  return this.gallery ? this.gallery.length : 0;
});

// Virtual for checking if gallery is full
ProductSchema.virtual('isGalleryFull').get(function() {
  return this.galleryCount >= this.maxGalleryImages;
});

// Virtual for getting remaining gallery slots
ProductSchema.virtual('remainingGallerySlots').get(function() {
  return Math.max(0, this.maxGalleryImages - this.galleryCount);
});

// Method to add image to gallery with validation
ProductSchema.methods.addToGallery = async function(imageData) {
  if (this.galleryCount >= this.maxGalleryImages) {
    throw new Error(`Gallery is full. Maximum ${this.maxGalleryImages} images allowed.`);
  }
  
  this.gallery.push(imageData);
  return this.save();
};

// Method to remove image from gallery
ProductSchema.methods.removeFromGallery = async function(imageIndex) {
  if (imageIndex < 0 || imageIndex >= this.galleryCount) {
    throw new Error('Invalid image index');
  }
  
  // Don't allow deletion of mandatory images (first 3)
  if (imageIndex < 3) {
    throw new Error('Cannot delete mandatory images');
  }
  
  this.gallery.splice(imageIndex, 1);
  return this.save();
};

// Method to reorder gallery images
ProductSchema.methods.reorderGallery = async function(newOrder) {
  if (newOrder.length !== this.galleryCount) {
    throw new Error('Invalid order array');
  }
  
  const newGallery = newOrder.map(index => this.gallery[index]);
  this.gallery = newGallery;
  return this.save();
};

// Indexes
ProductSchema.index({ name: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ restaurantName: 1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ hasVariations: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ slug: 1 });

// Pre-save middleware
ProductSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);
  }
  
  // Ensure arrays
  if (!Array.isArray(this.flavors)) this.flavors = [];
  if (!Array.isArray(this.size)) this.size = [];
  if (!Array.isArray(this.gallery)) this.gallery = [];
  if (!Array.isArray(this.variations)) this.variations = [];
  
  // Remove empty strings
  this.flavors = this.flavors.filter(f => f && f.trim() !== '');
  this.size = this.size.filter(s => s && s.trim() !== '');
  
  // For products with variations, calculate min/max prices
  if (this.hasVariations && this.variations.length > 0) {
    const prices = this.variations.map(v => v.newPrice || 0).filter(p => p > 0);
    if (prices.length > 0) {
      this.newPrice = Math.min(...prices);
      this.oldPrice = Math.max(...this.variations.map(v => v.oldPrice || 0));
      this.stock = this.variations.reduce((sum, v) => sum + (v.stock || 0), 0);
    }
  }
  
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
