// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true
//     },

//     name: { type: String, required: true, trim: true },
//     description: { type: String, default: "" },
//     restaurantName: { type: String, required: true },

//     oldPrice: { type: Number, default: 0 },
//     newPrice: { type: Number, required: true },

//     quality: { type: String, default: "" },
//     addToCart: { type: Boolean, default: false },
//     stock: { type: Number, default: 0 },

//     image: { type: String, default: "" },
//     logo: { type: String, default: "" },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorCategory",
//       required: true
//     },

//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorSubCategory",
//       default: null
//     }
//   },
//   { timestamps: true }
// );

// module.exports =
//   mongoose.models.VendorProduct ||
//   mongoose.model("VendorProduct", VendorProductSchema);







// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true
//     },

//     name: { type: String, required: true },
//     description: { type: String, default: "" },
//     restaurantName: { type: String, required: true },

//     oldPrice: { type: Number, default: 0 },
//     newPrice: { type: Number, required: true },
//     quality: { type: String, default: "" },
//     stock: { type: Number, default: 0 },

//     image: { type: String, default: "" },
//     logo: { type: String, default: "" },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true
//     },
//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "SubCategory",
//       default: null
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
//     size: String
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);









// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//     },

//     name: { type: String, required: true, trim: true },
//     description: { type: String, default: "" },
//     restaurantName: { type: String, default: "" },

//     oldPrice: { type: Number, default: 0 },
//     newPrice: { type: Number, required: true },
//     quality: { type: String, default: "" },
//     stock: { type: Number, default: 0 },

//     image: { type: String, default: "" },
//     logo: { type: String, default: "" },

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
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);







const mongoose = require("mongoose");

const vendorProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    restaurantName: String,

    oldPrice: Number,
    newPrice: Number,
    stock: Number,

    cuisine: String,
    size: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorCategory",
      required: true,
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorSubCategory",
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorProduct", vendorProductSchema);
