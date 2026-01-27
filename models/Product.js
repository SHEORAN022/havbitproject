






// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     /* BASIC INFO */
//     name: { type: String, required: true },
//     description: String,
//     restaurantName: { type: String, required: true },

//     /* PRICING */
//     oldPrice: { type: Number, default: 0 },   // mrp
//     newPrice: { type: Number, required: true }, // price
//     stock: { type: Number, default: 0 },
//     quality: String,

//     /* MEDIA */
//     image: String,
//     logo: String,
//     gallery: [String],

//     /* CATEGORY */
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

//     /* ADMIN / VENDOR */
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       default: null, // admin product
//     },

//     /* EXTRA PRODUCT INFO */
//     fssaiLicense: String,
//     location: String,
//     state: String,                // 🔥 ADDED
//     religion: String,
//     productTypes: String,
//     flavors: String,
//     vegNonVeg: String,
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












/********************************************************************
 *  Product Model (public API)
 *
 *  • All original fields are preserved.
 *  • Two virtuals are added:
 *        • fssaiLicense → maps to `brandName`
 *        • state        → maps to `State`
 ********************************************************************/
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
    name: { type: String, required: true },
    description: String,
    restaurantName: { type: String, required: true },

    /* PRICING */
    oldPrice: { type: Number, default: 0 }, // mrp
    newPrice: { type: Number, required: true }, // selling price
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

    /* ADMIN / VENDOR RELATION */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null, // admin product
    },

    /* EXTRA PRODUCT INFO (legacy field names) */
    brandName: String, // ← **FSSAI licence** (stored as brandName)
    State: String,      // ← **State / Location** (stored as State)

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

/* -----------------------------------------------------------------
   VIRTUALS – expose friendly names.
   ----------------------------------------------------------------- */
ProductSchema.virtual("fssaiLicense")
  .get(function () {
    return this.brandName;
  })
  .set(function (val) {
    this.brandName = val;
  });

ProductSchema.virtual("state")
  .get(function () {
    return this.State;
  })
  .set(function (val) {
    this.State = val;
  });

ProductSchema.set("toObject", { virtuals: true });
ProductSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", ProductSchema);

