


// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: String,
//     restaurantName: { type: String, required: true },

//     oldPrice: { type: Number, default: 0 },
//     newPrice: { type: Number, required: true },
//     quality: String,
//     stock: { type: Number, default: 0 },

//     image: String,
//     logo: String,
//     gallery: [String],

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "SubCategory",
//       default: null,
//     },

//     religion: String,
//     productTypes: String,
//     flavors: String,
//     dietPreference: String,
//     nutrition: String,
//     materialTypes: String,
//     ingredients: String,
//     allergenInfo: String,
//     dietaryPreferences: String,
//     cuisine: String,
//     size: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", ProductSchema);

// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: String,

//     restaurantName: { type: String, required: true },

//     oldPrice: { type: Number, default: 0 },
//     newPrice: { type: Number, required: true },
//     quality: String,
//     stock: { type: Number, default: 0 },

//     image: String,
//     logo: String,
//     gallery: [String],

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "SubCategory",
//       default: null,
//     },

//     // 🔥🔥 ADD THIS 🔥🔥
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       default: null, // admin product ke liye safe
//     },

//     religion: String,
//     productTypes: String,
//     flavors: String,
//     dietPreference: String,
//     nutrition: String,
//     materialTypes: String,
//     ingredients: String,
//     allergenInfo: String,
//     dietaryPreferences: String,
//     cuisine: String,
//     size: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", ProductSchema);



// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     /* BASIC INFO */
//     name: { 
//       type: String, 
//       required: [true, "Product name is required"],
//       trim: true
//     },
//     description: { 
//       type: String, 
//       trim: true 
//     },
//     restaurantName: { 
//       type: String, 
//       required: [true, "Restaurant name is required"],
//       trim: true 
//     },
//     brandName: { 
//       type: String, 
//       trim: true 
//     }, // For FSSAI License
    
//     /* PRICING */
//     oldPrice: { 
//       type: Number, 
//       default: 0,
//       min: [0, "Price cannot be negative"]
//     },   // MRP
//     newPrice: { 
//       type: Number, 
//       required: [true, "Selling price is required"],
//       min: [0, "Price cannot be negative"]
//     }, // Selling Price
//     stock: { 
//       type: Number, 
//       default: 0,
//       min: [0, "Stock cannot be negative"]
//     },
//     quality: { 
//       type: String, 
//       default: "Standard",
//       enum: ["Standard", "Premium"]
//     },
    
//     /* MEDIA */
//     image: { 
//       type: String, 
//       required: [true, "Product image is required"] 
//     },
//     logo: { 
//       type: String 
//     },
//     gallery: [{ 
//       type: String 
//     }],
    
//     /* CATEGORY */
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: [true, "Category is required"],
//     },
//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "SubCategory",
//       default: null,
//     },
    
//     /* ADMIN / VENDOR */
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       default: null, // null means admin product
//     },
    
//     /* EXTRA PRODUCT INFO */
//     // Location Info
//     location: { 
//       type: String, 
//       trim: true 
//     },
//     State: { 
//       type: String, 
//       trim: true 
//     }, // Capital 'S' for state
    
//     // Product Details
//     productTypes: { 
//       type: String, 
//       trim: true 
//     },
//     flavors: { 
//       type: String, 
//       trim: true 
//     },
//     size: { 
//       type: String, 
//       trim: true 
//     },
//     materialTypes: { 
//       type: String, 
//       trim: true 
//     },
//     ingredients: { 
//       type: String, 
//       trim: true 
//     },
//     // REMOVED: religion field
    
//     // Dietary Info
//     dietPreference: { 
//       type: String, 
//       default: "Veg", 
//       enum: ["Veg", "Non-Veg", "Egg"] 
//     },
//     dietaryPreferences: { 
//       type: String, 
//       trim: true 
//     },
//     allergenInfo: { 
//       type: String, 
//       trim: true 
//     },
//     nutrition: { 
//       type: String, 
//       trim: true 
//     },
//     cuisine: { 
//       type: String, 
//       trim: true 
//     },
    
//     // Timestamps
//     createdAt: { 
//       type: Date, 
//       default: Date.now 
//     },
//     updatedAt: { 
//       type: Date, 
//       default: Date.now 
//     }
//   },
//   { 
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Virtual for discount percentage
// ProductSchema.virtual('discountPercentage').get(function() {
//   if (this.oldPrice > 0 && this.newPrice < this.oldPrice) {
//     return Math.round(((this.oldPrice - this.newPrice) / this.oldPrice) * 100);
//   }
//   return 0;
// });

// // Virtual for inStock status
// ProductSchema.virtual('inStock').get(function() {
//   return this.stock > 0;
// });

// // Indexes for better query performance
// ProductSchema.index({ name: 1 });
// ProductSchema.index({ category: 1 });
// ProductSchema.index({ vendor: 1 });
// ProductSchema.index({ restaurantName: 1 });
// ProductSchema.index({ State: 1 });
// ProductSchema.index({ createdAt: -1 });
// ProductSchema.index({ newPrice: 1 });

// // Middleware to update updatedAt before saving
// ProductSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// // Middleware to update updatedAt before updating
// ProductSchema.pre('findOneAndUpdate', function(next) {
//   this.set({ updatedAt: Date.now() });
//   next();
// });

// module.exports = mongoose.model("Product", ProductSchema);










const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
    name: { type: String, required: true },
    description: String,
    restaurantName: { type: String, required: true },

    /* PRICING */
    oldPrice: { type: Number, default: 0 },   // mrp
    newPrice: { type: Number, required: true }, // price
    stock: { type: Number, default: 0 },
    quality: String,

    /* MEDIA */
    image: String,
    logo: String,
    gallery: [String],

    /* CATEGORY */
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },

    /* ADMIN / VENDOR */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null, // admin product
    },

    /* EXTRA PRODUCT INFO */
    fssaiLicense: String,
    location: String,
    state: String,                // 🔥 ADDED
    religion: String,
    productTypes: String,
    flavors: String,
    vegNonVeg: String,
    dietPreference: String,
    nutrition: String,
    materialTypes: String,
    ingredients: String,
    allergenInfo: String,
    dietaryPreferences: String,
    cuisine: String,
    size: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

