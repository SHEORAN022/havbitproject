

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







// models/VendorProduct.js
const mongoose = require("mongoose");

const VendorProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    brandName: String,
    restaurantName: String,
    
    oldPrice: Number,
    newPrice: { type: Number, required: true },
    stock: Number,
    quality: String,
    
    category: { type: mongoose.Schema.Types.ObjectId, ref: "VendorCategory" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "VendorSubCategory" },
    
    /* ================= ALL NEW FIELDS ================= */
    dietPreference: String,
    ageRange: String,
    containerType: String,
    flavors: String,
    itemForm: String,
    specialty: String,
    itemTypeName: String,
    countryOfOrigin: String,
    
    fssaiLicense: String,
    legalDisclaimer: String,
    shelfLife: String,
    
    manufacturer: String,
    manufacturerContact: String,
    packerContact: String,
    marketerNameAddress: String,
    
    packageColour: String,
    measurementUnit: String,
    unitCount: String,
    numberOfItems: String,
    itemWeight: String,
    size: String,
    totalEaches: String,
    itemPackageWeight: String,
    
    ingredients: String,
    allergenInformation: String,
    directions: String,
    
    /* ================= ADDITIONAL FIELDS ================= */
    productTypes: String,
    materialTypes: String,
    nutrition: String,
    allergenInfo: String,
    dietaryPreferences: String,
    cuisine: String,
    State: String,
    customWeight: String,
    customSizeInput: String,
    
    image: String,
    gallery: [String],
    
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorProduct", VendorProductSchema);

