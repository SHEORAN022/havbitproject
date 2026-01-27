

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





/********************************************************************
 *  VendorProduct Model
 *
 *  • All original fields are preserved.
 *  • Two virtuals are added:
 *        • fssaiLicense → maps to legacy field `brandName`
 *        • location      → maps to legacy field `State`
 *  • The virtuals appear when we call toObject() / toJSON()
 ********************************************************************/
const mongoose = require("mongoose");

const VendorProductSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
    name: { type: String, required: true },
    brandName: String,          // ← **FSSAI licence number** (legacy)
    phone: String,
    contactName: String,
    description: String,

    /* PRICING & STOCK */
    oldPrice: Number,
    newPrice: Number,
    stock: Number,
    quality: String,

    /* VENDOR / LOCATION */
    State: String,               // ← **State / Location** (legacy)
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

    /* MEDIA */
    image: String,
    logo: String,
    gallery: [String],

    /* RELATIONS */
    category: { type: mongoose.Schema.Types.ObjectId, ref: "VendorCategory" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "VendorSubCategory" },

    /* Shop / vendor name shown to customers */
    restaurantName: String,   // ← set on the first product, then reused

    /* WHICH VENDOR OWNS THIS PRODUCT */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true }
);

/* -----------------------------------------------------------------
   VIRTUALS – give nice names while the DB still stores the historic
   fields.  Virtuals are included in toObject / toJSON output.
   ----------------------------------------------------------------- */
VendorProductSchema.virtual("fssaiLicense")
  .get(function () {
    return this.brandName;
  })
  .set(function (val) {
    this.brandName = val;
  });

VendorProductSchema.virtual("location")
  .get(function () {
    return this.State;
  })
  .set(function (val) {
    this.State = val;
  });

VendorProductSchema.virtual("shopName")
  .get(function () {
    return this.restaurantName;
  })
  .set(function (val) {
    this.restaurantName = val;
  });

VendorProductSchema.set("toObject", { virtuals: true });
VendorProductSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("VendorProduct", VendorProductSchema);
