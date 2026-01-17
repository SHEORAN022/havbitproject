// // const mongoose = require("mongoose");

// // const VendorProductSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true },
// //     description: String,

// //     restaurantName: { type: String, required: true },

// //     oldPrice: Number,
// //     newPrice: { type: Number, required: true },
// //     quality: String,
// //     stock: Number,

// //     religion: String,
// //     productTypes: String,
// //     flavors: String,
// //     dietPreference: String,
// //     nutrition: String,
// //     materialTypes: String,
// //     ingredients: String,
// //     allergenInfo: String,
// //     dietaryPreferences: String,
// //     cuisine: String,
// //     size: String,

// //     image: String,
// //     logo: String,
// //     gallery: [String],

// //     category: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "VendorCategory",
// //       required: true,
// //     },
// //     subcategory: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "VendorSubCategory",
// //     },

// //     vendor: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Vendor",
// //       required: true,
// //     },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("VendorProduct", VendorProductSchema);






// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: String,
//     restaurantName: { type: String, required: true },
    
//     // 🔥 Nayi Fields jo aapne mangi
//     brandName: { type: String, required: true },
//     phone: { type: String, required: true },
//     contactName: { type: String, required: true },

//     oldPrice: Number,
//     newPrice: { type: Number, required: true },
//     quality: String,
//     stock: Number,

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

//     image: String,
//     logo: String,
//     gallery: [String],

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorCategory",
//       required: true,
//     },
//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorSubCategory",
//     },

//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);





// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     /** BASIC PRODUCT INFO **/
//     name: { type: String, required: true, trim: true },
//     description: { type: String, default: "" },

//     /** VENDOR STORE **/
//     restaurantName: { type: String, required: true, trim: true },

//     /** REQUIRED VENDOR CONTACT FIELDS **/
//     brandName: { type: String, required: true, trim: true },
//     phone: { type: String, required: true, trim: true },
//     contactName: { type: String, required: true, trim: true },

//     /** PRICING **/
//     oldPrice: { type: Number, default: 0 },
//     newPrice: { type: Number, required: true },
//     stock: { type: Number, default: 0 },
//     quality: { type: String, default: "" },

//     /** FOOD / GROCERIES SPECIFIC **/
//     religion: { type: String, default: "" },
//     productTypes: { type: String, default: "" },
//     flavors: { type: String, default: "" },
//     dietPreference: { type: String, default: "" },
//     nutrition: { type: String, default: "" },
//     materialTypes: { type: String, default: "" },
//     ingredients: { type: String, default: "" },
//     allergenInfo: { type: String, default: "" },
//     dietaryPreferences: { type: String, default: "" },
//     cuisine: { type: String, default: "" },
//     size: { type: String, default: "" },

//     /** IMAGES **/
//     image: { type: String, default: "" }, // main image
//     logo: { type: String, default: "" },
//     gallery: {
//       type: [String],
//       default: [],
//     },

//     /** CATEGORY LINK **/
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorCategory",
//       required: true,
//       index: true,
//     },

//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorSubCategory",
//       default: null,
//       index: true,
//     },

//     /** VENDOR **/
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//       index: true,
//     },
//   },
//   { timestamps: true }
// );

// /** EXTRA PERFORMANCE INDEXES **/
// VendorProductSchema.index({ vendor: 1, category: 1 });
// VendorProductSchema.index({ vendor: 1, subcategory: 1 });
// VendorProductSchema.index({ vendor: 1, name: 1 });

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);









// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema({
//   name: String,
//   brandName: String,
//   phone: String,
//   contactName: String,
//   description: String,

//   oldPrice: Number,
//   newPrice: Number,
//   stock: Number,
//   quality: String,

//   State: String,
//   productTypes: String,
//   flavors: String,
//   dietPreference: String,
//   nutrition: String,
//   materialTypes: String,
//   ingredients: String,
//   allergenInfo: String,
//   dietaryPreferences: String,
//   cuisine: String,
//   size: String,
//   storeName: { type: String, default: "" },


//   image: String,
//   logo: String,
//   gallery: [String],

//   category: { type: mongoose.Schema.Types.ObjectId, ref: "VendorCategory" },
//   subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "VendorSubCategory" },

//   restaurantName: String,

//   vendor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Vendor",
//     required: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);




const mongoose = require("mongoose");

const VendorProductSchema = new mongoose.Schema({
  name: String,
  brandName: String,
  phone: String,
  contactName: String,
  description: String,

  oldPrice: Number,
  newPrice: Number,
  stock: Number,
  quality: String,

  State: String,
  productTypes: String,
  flavors: String,
  dietPreference: String,
  nutrition: String,
  materialTypes: String,
  ingredients: String,
  allergenInfo: String,
  dietaryPreferences: String,
  cuisine: String,
  size: String,
  storeName: { type: String, default: "" },


  image: String,
  logo: String,
  gallery: [String],

  category: { type: mongoose.Schema.Types.ObjectId, ref: "VendorCategory" },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "VendorSubCategory" },

  restaurantName: String,

  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("VendorProduct", VendorProductSchema);
