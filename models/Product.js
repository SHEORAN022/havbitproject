
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









