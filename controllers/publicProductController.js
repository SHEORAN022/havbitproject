
// const Product = require("../models/Product");
// const VendorProduct = require("../models/VendorProduct");
// const cloudinary = require("../config/cloudinary");

// // ==========================================
// // 1. ADD NEW VENDOR PRODUCT (WITH CLOUDINARY)
// // ==========================================
// exports.addVendorProduct = async (req, res) => {
//   try {
//     let imageUrl = "";
//     let logoUrl = "";
//     let galleryUrls = [];

//     // Main Image Upload
//     if (req.files && req.files.image) {
//       const res = await cloudinary.uploader.upload(req.files.image.tempFilePath, { folder: "products" });
//       imageUrl = res.secure_url;
//     }

//     // Logo Upload
//     if (req.files && req.files.logo) {
//       const res = await cloudinary.uploader.upload(req.files.logo.tempFilePath, { folder: "logos" });
//       logoUrl = res.secure_url;
//     }

//     // Gallery Upload (Multiple)
//     if (req.files && req.files.gallery) {
//       const files = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
//       for (const file of files) {
//         const res = await cloudinary.uploader.upload(file.tempFilePath, { folder: "gallery" });
//         galleryUrls.push(res.secure_url);
//       }
//     }

//     // Create Product with URLs
//     const newProduct = new VendorProduct({
//       ...req.body,
//       image: imageUrl,
//       logo: logoUrl,
//       gallery: galleryUrls,
//       vendor: req.user.id // Token se aayi ID
//     });

//     await newProduct.save();
//     res.status(201).json({ success: true, message: "Product Saved to Cloudinary", data: newProduct });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==========================================
// // 2. GET PUBLIC PRODUCTS (FETCH LOGIC)
// // ==========================================
// exports.getPublicProducts = async (req, res) => {
//   try {
//     // FETCH ADMIN & VENDOR PRODUCTS
//     const [adminProducts, vendorProducts] = await Promise.all([
//       Product.find().populate("category", "name").populate("subcategory", "name").populate("vendor", "_id storeName").lean(),
//       VendorProduct.find().populate("category", "name").populate("subcategory", "name").populate("vendor", "_id storeName").lean()
//     ]);

//     // FORMAT FUNCTION (Dono ke liye common)
//     const formatData = (list, sourceName) => list.map(item => ({
//       _id: item._id,
//       source: sourceName,
//       name: item.name,
//       description: item.description,
//       restaurantName: item.restaurantName,
//       oldPrice: item.oldPrice,
//       newPrice: item.newPrice,
//       quality: item.quality,
//       stock: item.stock,
//       religion: item.religion,
//       productTypes: item.productTypes,
//       flavors: item.flavors,
//       dietPreference: item.dietPreference,
//       nutrition: item.nutrition,
//       materialTypes: item.materialTypes,
//       ingredients: item.ingredients,
//       allergenInfo: item.allergenInfo,
//       dietaryPreferences: item.dietaryPreferences,
//       cuisine: item.cuisine,
//       size: item.size,
//       image: item.image,
//       logo: item.logo,
//       gallery: item.gallery,
//       category: item.category?.name || null,
//       subcategory: item.subcategory?.name || null,
//       vendor: item.vendor?.storeName || item.restaurantName || "N/A",
//       createdAt: item.createdAt
//     }));

//     const finalData = [...formatData(adminProducts, "admin"), ...formatData(vendorProducts, "vendor")];

//     // SORT NEWEST FIRST
//     finalData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     res.json({ success: true, count: finalData.length, data: finalData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };





// // controllers/publicProductController.js
// const Product = require("../models/Product");
// const VendorProduct = require("../models/VendorProduct");

// exports.getPublicProducts = async (req, res) => {
//   try {
//     const adminProducts = await Product.find().lean();
//     const vendorProducts = await VendorProduct.find().lean();

//     const merged = [...adminProducts, ...vendorProducts].map(p => ({
//       // Basic Info
//       id: p._id,
//       name: p.name,
//       brandName: p.brandName,
//       description: p.description,
//       price: p.newPrice,
//       oldPrice: p.oldPrice,
//       stock: p.stock,
//       quality: p.quality,
//       restaurantName: p.restaurantName || "Havbit",
      
//       // Product Details
//       dietPreference: p.dietPreference,
//       ageRange: p.ageRange,
//       containerType: p.containerType,
//       flavors: p.flavors,
//       itemForm: p.itemForm,
//       specialty: p.specialty,
//       itemTypeName: p.itemTypeName,
//       countryOfOrigin: p.countryOfOrigin,
      
//       // Compliance
//       fssaiLicense: p.fssaiLicense,
//       legalDisclaimer: p.legalDisclaimer,
//       shelfLife: p.shelfLife,
      
//       // Manufacturing
//       manufacturer: p.manufacturer,
//       manufacturerContact: p.manufacturerContact,
//       packerContact: p.packerContact,
//       marketerNameAddress: p.marketerNameAddress,
      
//       // Package Details
//       packageColour: p.packageColour,
//       measurementUnit: p.measurementUnit,
//       unitCount: p.unitCount,
//       numberOfItems: p.numberOfItems,
//       itemWeight: p.itemWeight,
//       size: p.size,
//       totalEaches: p.totalEaches,
//       itemPackageWeight: p.itemPackageWeight,
      
//       // Ingredients & Allergens
//       ingredients: p.ingredients,
//       allergenInformation: p.allergenInformation,
//       directions: p.directions,
      
//       // Additional Info
//       productTypes: p.productTypes,
//       materialTypes: p.materialTypes,
//       nutrition: p.nutrition,
//       allergenInfo: p.allergenInfo,
//       dietaryPreferences: p.dietaryPreferences,
//       cuisine: p.cuisine,
//       State: p.State,
//       customWeight: p.customWeight,
//       customSizeInput: p.customSizeInput,
      
//       // Category
//       category: p.category,
//       subcategory: p.subcategory,
      
//       // Media
//       image: p.image,
//       gallery: p.gallery,
      
//       // Vendor info (if exists)
//       vendor: p.vendor,
      
//       // Timestamps
//       createdAt: p.createdAt,
//       updatedAt: p.updatedAt
//     }));

//     res.json({ 
//       success: true, 
//       count: merged.length,
//       data: merged 
//     });
//   } catch (error) {
//     console.error("GET PUBLIC PRODUCTS ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch products",
//     });
//   }
// };






const Product = require("../models/Product");
const VendorProduct = require("../models/VendorProduct");

/* =====================================================
   GET PUBLIC PRODUCTS (ADMIN + VENDOR)
   - Only valid Cloudinary images
   - No broken images
===================================================== */
exports.getPublicProducts = async (req, res) => {
  try {
    // Admin products
    const adminProducts = await Product.find().lean();

    // Vendor products
    const vendorProducts = await VendorProduct.find().lean();

    // Merge & sanitize data
    const mergedProducts = [...adminProducts, ...vendorProducts].map(p => ({
      /* ================= BASIC INFO ================= */
      id: p._id,
      name: p.name,
      brandName: p.brandName || "",
      description: p.description || "",
      price: p.newPrice || 0,
      oldPrice: p.oldPrice || 0,
      stock: p.stock || 0,
      quality: p.quality || "Standard",
      restaurantName: p.restaurantName || "Havbit",

      /* ================= PRODUCT DETAILS ================= */
      dietPreference: p.dietPreference || "",
      ageRange: p.ageRange || "",
      containerType: p.containerType || "",
      flavors: p.flavors || "",
      itemForm: p.itemForm || "",
      specialty: p.specialty || "",
      itemTypeName: p.itemTypeName || "",
      countryOfOrigin: p.countryOfOrigin || "",

      /* ================= COMPLIANCE ================= */
      fssaiLicense: p.fssaiLicense || "",
      legalDisclaimer: p.legalDisclaimer || "",
      shelfLife: p.shelfLife || "",

      /* ================= MANUFACTURING ================= */
      manufacturer: p.manufacturer || "",
      manufacturerContact: p.manufacturerContact || "",
      packerContact: p.packerContact || "",
      marketerNameAddress: p.marketerNameAddress || "",

      /* ================= PACKAGE DETAILS ================= */
      packageColour: p.packageColour || "",
      measurementUnit: p.measurementUnit || "",
      unitCount: p.unitCount || "",
      numberOfItems: p.numberOfItems || "",
      itemWeight: p.itemWeight || "",
      size: p.size || "",
      totalEaches: p.totalEaches || "",
      itemPackageWeight: p.itemPackageWeight || "",

      /* ================= INGREDIENTS & NUTRITION ================= */
      ingredients: p.ingredients || "",
      allergenInfo: p.allergenInfo || "",
      allergenInformation: p.allergenInformation || "",
      dietaryPreferences: p.dietaryPreferences || "",
      nutrition: p.nutrition || "",
      cuisine: p.cuisine || "",
      directions: p.directions || "",

      /* ================= LOCATION ================= */
      State: p.State || "",

      /* ================= CATEGORY ================= */
      category: p.category || null,
      subcategory: p.subcategory || null,

      /* ================= MEDIA (🔥 FIXED) ================= */
      image:
        p.image && typeof p.image === "string" && p.image.startsWith("http")
          ? p.image
          : null,

      gallery: Array.isArray(p.gallery)
        ? p.gallery.filter(
            img => typeof img === "string" && img.startsWith("http")
          )
        : [],

      /* ================= VENDOR ================= */
      vendor: p.vendor || null,

      /* ================= TIMESTAMPS ================= */
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      count: mergedProducts.length,
      data: mergedProducts,
    });
  } catch (error) {
    console.error("GET PUBLIC PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch public products",
    });
  }
};








// const Product = require("../models/Product");
// const VendorProduct = require("../models/VendorProduct");

// /* =====================================================
//    GET PUBLIC PRODUCTS (ADMIN + VENDOR)
// ===================================================== */
// const getPublicProducts = async (req, res) => {
//   try {
//     // Admin products
//     const adminProducts = await Product.find().lean();

//     // Vendor products
//     const vendorProducts = await VendorProduct.find().lean();

//     // Merge & sanitize data
//     const mergedProducts = [...adminProducts, ...vendorProducts].map(p => ({
//       /* ================= BASIC INFO ================= */
//       id: p._id,
//       name: p.name,
//       description: p.description || "",
//       brandName: p.brandName || "",
//       price: p.newPrice || 0,
//       oldPrice: p.oldPrice || 0,
//       stock: p.stock || 0,
//       quality: p.quality || "Standard",
//       dietPreference: p.dietPreference || "Veg",
//       restaurantName: p.restaurantName || "Havbit",

//       /* ================= PRODUCT DETAILS ================= */
//       productTypes: p.productTypes || "",
//       flavors: Array.isArray(p.flavors) ? p.flavors : [],
//       size: Array.isArray(p.size) ? p.size : [],
//       materialTypes: p.materialTypes || "",
//       ingredients: p.ingredients || "",
//       customWeight: p.customWeight || "",
//       customSizeInput: p.customSizeInput || "",
//       ageRange: p.ageRange || "",
//       containerType: p.containerType || "",
//       itemForm: p.itemForm || "",
//       specialty: p.specialty || "",
//       itemTypeName: p.itemTypeName || "",
//       countryOfOrigin: p.countryOfOrigin || "",

//       /* ================= COMPLIANCE ================= */
//       brandName: p.brandName || "",
//       fssaiLicense: p.fssaiLicense || "",
//       legalDisclaimer: p.legalDisclaimer || "",
//       shelfLife: p.shelfLife || "",

//       /* ================= MANUFACTURING ================= */
//       manufacturer: p.manufacturer || "",
//       manufacturerContact: p.manufacturerContact || "",
//       packerContact: p.packerContact || "",
//       marketerNameAddress: p.marketerNameAddress || "",

//       /* ================= PACKAGE DETAILS ================= */
//       packageColour: p.packageColour || "",
//       measurementUnit: p.measurementUnit || "",
//       unitCount: p.unitCount || "",
//       numberOfItems: p.numberOfItems || "",
//       itemWeight: p.itemWeight || "",
//       totalEaches: p.totalEaches || "",
//       itemPackageWeight: p.itemPackageWeight || "",

//       /* ================= DIETARY & NUTRITION ================= */
//       dietaryPreferences: p.dietaryPreferences || "",
//       allergenInfo: p.allergenInfo || "",
//       allergenInformation: p.allergenInformation || "",
//       nutrition: p.nutrition || "",
//       cuisine: p.cuisine || "",
//       directions: p.directions || "",

//       /* ================= LOCATION ================= */
//       State: p.State || "",

//       /* ================= CATEGORY ================= */
//       category: p.category || null,
//       subcategory: p.subcategory || null,

//       /* ================= MEDIA ================= */
//       image: p.image && typeof p.image === "string" && p.image.startsWith("http")
//         ? p.image
//         : null,

//       gallery: Array.isArray(p.gallery)
//         ? p.gallery.filter(img => typeof img === "string" && img.startsWith("http"))
//         : [],

//       /* ================= VENDOR ================= */
//       vendor: p.vendor || null,

//       /* ================= TIMESTAMPS ================= */
//       createdAt: p.createdAt,
//       updatedAt: p.updatedAt,
//     }));

//     return res.status(200).json({
//       success: true,
//       count: mergedProducts.length,
//       data: mergedProducts,
//     });
//   } catch (error) {
//     console.error("GET PUBLIC PRODUCTS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch public products",
//     });
//   }
// };

// // Export karo
// module.exports = {
//   getPublicProducts
// };


