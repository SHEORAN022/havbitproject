
// // const mongoose = require("mongoose");

// // const ProductSchema = new mongoose.Schema({
// //   name: { type: String, required: true, trim: true },
// //   description: String,
// //   restaurantName: { type: String, required: true },

// //   oldPrice: { type: Number, default: 0 },
// //   newPrice: { type: Number, required: true },

// //   quality: String,
// //   addToCart: { type: Boolean, default: false },
// //   stock: { type: Number, default: 0 },

// //   image: String,
// //   logo: String,
// //   gallery: [String],

// //   category: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Category",
// //     required: true,
// //   },
// //   subcategory: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "SubCategory",
// //     default: null,
// //   },

// //   religion: String,
// //   productTypes: String,
// //   flavors: String,
// //   cuisine: String,
// //   size: String,
// // }, { timestamps: true });

// // module.exports = mongoose.model("Product", ProductSchema);
// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   description: { type: String, default: "" },
//   restaurantName: { type: String, required: true },

//   oldPrice: { type: Number, default: 0 },
//   newPrice: { type: Number, required: true },

//   quality: { type: String, default: "" },
//   addToCart: { type: Boolean, default: false },
//   stock: { type: Number, default: 0 },

//   image: { type: String, default: "" },
//   logo: { type: String, default: "" },
//   gallery: [{ type: String }],

//   category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
//   subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", default: null },

//   religion: { type: String, default: "" },
//   productTypes: { type: String, default: "" },
//   flavors: { type: String, default: "" },
//   cuisine: { type: String, default: "" },
//   size: { type: String, default: "" },
// }, { timestamps: true });

// module.exports = mongoose.model("Product", ProductSchema);










// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   description: { type: String, default: "" },
//   restaurantName: { type: String, required: true },
//   oldPrice: { type: Number, default: 0 },
//   newPrice: { type: Number, required: true },
//   quality: { type: String, default: "" },
//   addToCart: { type: Boolean, default: false },
//   stock: { type: Number, default: 0 },
//   image: { type: String, default: "" },
//   logo: { type: String, default: "" },
//   gallery: [{ type: String }],
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
//   subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", default: null },

//   // Extra fields
//   religion: { type: String, default: "" },
//   productTypes: { type: String, default: "" },
//   flavors: { type: String, default: "" },
//   dietPreference: { type: String, default: "" },
//   nutrition: { type: String, default: "" },
//   materialTypes: { type: String, default: "" },
//   ingredients: { type: String, default: "" },
//   allergenInfo: { type: String, default: "" },
//   dietaryPreferences: { type: String, default: "" },
//   cuisine: { type: String, default: "" },
//   size: { type: String, default: "" },
// }, { timestamps: true });

// module.exports = mongoose.model("Product", ProductSchema);






const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    restaurantName: { type: String, required: true },

    oldPrice: { type: Number, default: 0 },
    newPrice: { type: Number, required: true },
    quality: String,
    stock: { type: Number, default: 0 },

    image: String,
    logo: String,
    gallery: [String],

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

    religion: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
