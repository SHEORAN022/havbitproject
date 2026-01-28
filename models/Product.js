
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





// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: { type: String, required: true },
    description: String,
    
    /* ================= BRAND & SHOP INFO ================= */
    brandName: String,                     // FSSAI License will be stored here
    restaurantName: { type: String, default: "Havbit" },
    
    /* ================= PRICING & STOCK ================= */
    oldPrice: { type: Number, default: 0 },
    newPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    quality: { type: String, default: "Standard" },
    
    /* ================= CATEGORY ================= */
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
    
    /* ================= FOOD / PRODUCT DETAILS ================= */
    dietPreference: { type: String, default: "Veg" }, // Veg/Non-Veg/Egg
    ageRange: String,                      // e.g., "0-6 months", "6-12 months"
    containerType: String,                  // e.g., "Bottle", "Jar", "Packet"
    flavors: String,                        // e.g., "Chocolate, Vanilla"
    itemForm: String,                       // e.g., "Powder", "Liquid", "Tablet"
    specialty: String,                      // e.g., "Organic", "Gluten-Free"
    itemTypeName: String,                   // e.g., "Baby Food", "Snacks"
    countryOfOrigin: String,                // e.g., "India", "USA"
    
    /* ================= COMPLIANCE & LEGAL ================= */
    fssaiLicense: String,                   // FSSAI License Number
    legalDisclaimer: String,                 // Legal disclaimer text
    shelfLife: String,                       // e.g., "6 months", "1 year"
    
    /* ================= MANUFACTURING INFO ================= */
    manufacturer: String,                    // Manufacturer name
    manufacturerContact: String,             // Manufacturer contact
    packerContact: String,                   // Packer contact info
    marketerNameAddress: String,             // Marketer name & address
    
    /* ================= PACKAGE DETAILS ================= */
    packageColour: String,                   // Package color
    measurementUnit: String,                 // e.g., "g", "kg", "ml", "L"
    unitCount: String,                       // e.g., "1", "10"
    numberOfItems: String,                   // e.g., "30 tablets"
    itemWeight: String,                      // e.g., "200g"
    size: String,                            // e.g., "S, M, L" or "250g, 500g"
    totalEaches: String,                     // Total eaches in package
    itemPackageWeight: String,               // Total package weight
    
    /* ================= INGREDIENTS & ALLERGENS ================= */
    ingredients: String,                     // Ingredients list
    allergenInformation: String,             // Allergen information
    directions: String,                      // Usage directions
    
    /* ================= ADDITIONAL DETAILS ================= */
    productTypes: String,                    // e.g., "Packaged", "Fresh"
    materialTypes: String,                   // e.g., "Plastic", "Glass"
    nutrition: String,                       // Nutrition facts
    allergenInfo: String,                    // Additional allergen info
    dietaryPreferences: String,              // e.g., "Keto", "Vegan"
    cuisine: String,                         // e.g., "Indian", "Chinese"
    
    /* ================= LOCATION INFO ================= */
    State: String,                           // Location/State
    
    /* ================= CUSTOM FIELDS ================= */
    customWeight: String,                    // Custom weight/size
    customSizeInput: String,                 // Custom size input
    
    /* ================= MEDIA ================= */
    image: String,
    gallery: [String],
    
    /* ================= ADMIN / VENDOR ================= */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);





