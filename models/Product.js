



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



