// module.exports = Product;
const mongoose = require('mongoose');

// ==================== VARIATION SCHEMA ====================
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

// ==================== PRODUCT SCHEMA ====================
const productSchema = new mongoose.Schema({
  // ========== BASIC INFORMATION ==========
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  restaurantName: {
    type: String,
    default: 'Havbit',
    trim: true
  },
  hasVariations: {
    type: Boolean,
    default: false
  },
  
  // ========== PRICING & STOCK ==========
  oldPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
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
    enum: ['Standard', 'Premium', 'Good', 'Fresh', 'Butter'],
    default: 'Standard'
  },
  dietPreference: {
    type: String,
    enum: ['Veg', 'Non-Veg', 'Egg', 'Vegan'],
    default: 'Veg'
  },
  
  // ========== VARIATIONS ==========
  variations: {
    type: [variationSchema],
    default: []
  },
  
  // ========== PRODUCT DETAILS ==========
  productTypes: {
    type: String,
    default: '',
    trim: true
  },
  flavors: {
    type: [String],
    default: []
  },
  size: {
    type: [String],
    default: []
  },
  materialTypes: {
    type: String,
    default: '',
    trim: true
  },
  ingredients: {
    type: String,
    default: '',
    trim: true
  },
  customWeight: {
    type: String,
    default: '',
    trim: true
  },
  customSizeInput: {
    type: String,
    default: '',
    trim: true
  },
  ageRange: {
    type: String,
    default: '',
    trim: true
  },
  containerType: {
    type: String,
    default: '',
    trim: true
  },
  itemForm: {
    type: String,
    default: '',
    trim: true
  },
  specialty: {
    type: String,
    default: '',
    trim: true
  },
  itemTypeName: {
    type: String,
    default: '',
    trim: true
  },
  countryOfOrigin: {
    type: String,
    default: '',
    trim: true
  },
  
  // ========== COMPLIANCE ==========
  fssaiLicense: {
    type: String,
    default: '',
    trim: true
  },
  brandName: {
    type: String,
    default: '',
    trim: true
  },
  legalDisclaimer: {
    type: String,
    default: '',
    trim: true
  },
  
  // ========== MANUFACTURING ==========
  manufacturerName: {
    type: String,
    default: '',
    trim: true
  },
  manufacturerAddress: {
    type: String,
    default: '',
    trim: true
  },
  manufacturer: {
    type: String,
    default: '',
    trim: true
  },
  manufacturerContact: {
    type: String,
    default: '',
    trim: true
  },
  
  // ========== PACKAGER ==========
  packagerName: {
    type: String,
    default: '',
    trim: true
  },
  packagerAddress: {
    type: String,
    default: '',
    trim: true
  },
  packagerFssaiLicense: {
    type: String,
    default: '',
    trim: true
  },
  packerContact: {
    type: String,
    default: '',
    trim: true
  },
  
  // ========== MARKETER ==========
  marketerName: {
    type: String,
    default: '',
    trim: true
  },
  marketerAddress: {
    type: String,
    default: '',
    trim: true
  },
  marketerNameAddress: {
    type: String,
    default: '',
    trim: true
  },
  
  // ========== PACKAGE DETAILS ==========
  packageColour: {
    type: String,
    default: '',
    trim: true
  },
  measurementUnit: {
    type: String,
    default: '',
    trim: true
  },
  unitCount: {
    type: String,
    default: '',
    trim: true
  },
  numberOfItems: {
    type: String,
    default: '',
    trim: true
  },
  itemWeight: {
    type: String,
    default: '',
    trim: true
  },
  totalEaches: {
    type: String,
    default: '',
    trim: true
  },
  itemPackageWeight: {
    type: String,
    default: '',
    trim: true
  },
  shelfLife: {
    type: String,
    default: '',
    trim: true
  },
  
  // ========== DIETARY & NUTRITION ==========
  dietaryPreferences: {
    type: String,
    default: '',
    trim: true
  },
  allergenInfo: {
    type: String,
    default: '',
    trim: true
  },
  allergenInformation: {
    type: String,
    default: '',
    trim: true
  },
  nutrition: {
    type: String,
    default: '',
    trim: true
  },
  cuisine: {
    type: String,
    default: '',
    trim: true
  },
  directions: {
    type: String,
    default: '',
    trim: true
  },
  
  // ========== LOCATION ==========
  State: {
    type: String,
    default: '',
    trim: true
  },
  
  // ========== CATEGORY & SUBCATEGORY ==========
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
    default: ''
  },
  gallery: {
    type: [String],
    default: []
  },
  
  // ========== AUTO-GENERATED ==========
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // ========== STATUS ==========
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft', 'out_of_stock'],
    default: 'active'
  },
  
  // ========== TAGS ==========
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// ==================== PRE-SAVE MIDDLEWARE ====================
productSchema.pre('save', function(next) {
  // Generate slug from name
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
  
  // Handle flavors array
  if (!Array.isArray(this.flavors)) {
    if (typeof this.flavors === 'string' && this.flavors.trim() !== '') {
      this.flavors = this.flavors.split(',')
        .map(f => f.trim())
        .filter(f => f !== '');
    } else {
      this.flavors = [];
    }
  }
  
  // Handle size array
  if (!Array.isArray(this.size)) {
    if (typeof this.size === 'string' && this.size.trim() !== '') {
      this.size = this.size.split(',')
        .map(s => s.trim())
        .filter(s => s !== '');
    } else {
      this.size = [];
    }
  }
  
  // Handle tags array
  if (!Array.isArray(this.tags)) {
    if (typeof this.tags === 'string' && this.tags.trim() !== '') {
      this.tags = this.tags.split(',')
        .map(t => t.trim())
        .filter(t => t !== '');
    } else {
      this.tags = [];
    }
  }
  
  // Handle gallery array
  if (!Array.isArray(this.gallery)) {
    this.gallery = [];
  }
  
  // Ensure FSSAI consistency
  if (this.brandName && !this.fssaiLicense) {
    this.fssaiLicense = this.brandName;
  }
  if (this.fssaiLicense && !this.brandName) {
    this.brandName = this.fssaiLicense;
  }
  
  // Handle variations pricing
  if (this.hasVariations && this.variations.length > 0) {
    // Calculate min price from variations for display
    const variationPrices = this.variations.map(v => v.newPrice || v.price || 0).filter(p => p > 0);
    if (variationPrices.length > 0) {
      this.price = Math.min(...variationPrices);
    }
    
    // Calculate total stock
    this.stock = this.variations.reduce((total, v) => total + (v.stock || 0), 0);
  }
  
  // Auto update status based on stock
  if (this.stock <= 0) {
    this.status = 'out_of_stock';
  } else if (this.status === 'out_of_stock' && this.stock > 0) {
    this.status = 'active';
  }
  
  next();
});

// ==================== VIRTUAL FIELDS ====================
productSchema.virtual('categoryName').get(function() {
  return this.category?.name || '';
});

productSchema.virtual('subcategoryName').get(function() {
  return this.subcategory?.name || '';
});

productSchema.virtual('discountPercentage').get(function() {
  if (this.oldPrice > 0 && this.price > 0 && this.oldPrice > this.price) {
    return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
  }
  return 0;
});

productSchema.virtual('isInStock').get(function() {
  if (this.hasVariations) {
    return this.variations.some(v => v.stock > 0);
  }
  return this.stock > 0;
});

// ==================== INDEXES ====================
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ subcategory: 1 });
productSchema.index({ restaurantName: 1 });
productSchema.index({ hasVariations: 1 });
productSchema.index({ State: 1 });
productSchema.index({ price: 1 });
productSchema.index({ quality: 1 });
productSchema.index({ dietPreference: 1 });
productSchema.index({ status: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ slug: 1 });
productSchema.index({ tags: 1 });

// ==================== METHODS ====================
productSchema.methods.getMinPrice = function() {
  if (this.hasVariations && this.variations.length > 0) {
    const prices = this.variations.map(v => v.newPrice || v.price || 0).filter(p => p > 0);
    return prices.length > 0 ? Math.min(...prices) : 0;
  }
  return this.price;
};

productSchema.methods.getMaxPrice = function() {
  if (this.hasVariations && this.variations.length > 0) {
    const prices = this.variations.map(v => v.newPrice || v.price || 0).filter(p => p > 0);
    return prices.length > 0 ? Math.max(...prices) : 0;
  }
  return this.price;
};

productSchema.methods.getTotalStock = function() {
  if (this.hasVariations && this.variations.length > 0) {
    return this.variations.reduce((total, v) => total + (v.stock || 0), 0);
  }
  return this.stock;
};

productSchema.methods.updateStock = function() {
  if (this.hasVariations && this.variations.length > 0) {
    this.stock = this.variations.reduce((total, v) => total + (v.stock || 0), 0);
  }
  return this.stock;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
