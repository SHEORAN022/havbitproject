

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



