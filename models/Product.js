


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

    // 🔥🔥 ADD THIS 🔥🔥
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null, // admin product ke liye safe
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
