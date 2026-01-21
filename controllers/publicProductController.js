// // const Product = require("../models/Product");
// // const VendorProduct = require("../models/VendorProduct");

// // exports.getPublicProducts = async (req, res) => {
// //   try {
// //     // 1️⃣ Fetch Admin Products
// //     const adminProducts = await Product.find()
// //       .populate("category", "name")
// //       .populate("subcategory", "name")
// //       .populate("vendor", "_id storeName")
// //       .lean();

// //     // 2️⃣ Fetch Vendor Products
// //     const vendorProducts = await VendorProduct.find()
// //       .populate("category", "name")
// //       .populate("subcategory", "name")
// //       .populate("vendor", "_id storeName")
// //       .lean();

// //     // 3️⃣ Format Vendor Products for Website
// //     const formattedVendor = vendorProducts.map(v => ({
// //       _id: v._id,
// //       name: v.name,
// //       description: v.description,
// //       restaurantName: v.restaurantName,
// //       oldPrice: v.oldPrice,
// //       newPrice: v.newPrice,
// //       quality: v.quality,
// //       stock: v.stock,
// //       image: v.image,
// //       logo: v.logo,
// //       gallery: v.gallery,
// //       category: v.category?.name || null,
// //       subcategory: v.subcategory?.name || null,
// //       vendor: v.vendor?.storeName || null,
// //       source: "vendor"
// //     }));

// //     // 4️⃣ Format Admin Products for Website
// //     const formattedAdmin = adminProducts.map(a => ({
// //       _id: a._id,
// //       name: a.name,
// //       description: a.description,
// //       restaurantName: a.restaurantName,
// //       oldPrice: a.oldPrice,
// //       newPrice: a.newPrice,
// //       quality: a.quality,
// //       stock: a.stock,
// //       image: a.image,
// //       logo: a.logo,
// //       gallery: a.gallery,
// //       category: a.category?.name || null,
// //       subcategory: a.subcategory?.name || null,
// //       vendor: a.vendor?.storeName || null,
// //       source: "admin"
// //     }));

// //     // 5️⃣ Merge Both
// //     const finalData = [...formattedAdmin, ...formattedVendor];

// //     // 6️⃣ Optional Sorting (Newest First)
// //     finalData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

// //     res.json({
// //       success: true,
// //       count: finalData.length,
// //       data: finalData
// //     });

// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };



// const Product = require("../models/Product");
// const VendorProduct = require("../models/VendorProduct");

// exports.getPublicProducts = async (req, res) => {
//   try {
//     // FETCH ADMIN PRODUCTS
//     const adminProducts = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName")
//       .lean();

//     // FETCH VENDOR PRODUCTS
//     const vendorProducts = await VendorProduct.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName")
//       .lean();

//     // FORMAT VENDOR PRODUCTS
//     const formattedVendor = vendorProducts.map(v => ({
//       _id: v._id,
//       source: "vendor",

//       // BASIC
//       name: v.name,
//       description: v.description,
//       restaurantName: v.restaurantName,
//       oldPrice: v.oldPrice,
//       newPrice: v.newPrice,
//       quality: v.quality,
//       stock: v.stock,

//       // EXTRA FIELDS
//       religion: v.religion,
//       productTypes: v.productTypes,
//       flavors: v.flavors,
//       dietPreference: v.dietPreference,
//       nutrition: v.nutrition,
//       materialTypes: v.materialTypes,
//       ingredients: v.ingredients,
//       allergenInfo: v.allergenInfo,
//       dietaryPreferences: v.dietaryPreferences,
//       cuisine: v.cuisine,
//       size: v.size,

//       // IMAGES
//       image: v.image,
//       logo: v.logo,
//       gallery: v.gallery,

//       // CATEGORY & SUBCATEGORY
//       category: v.category?.name || null,
//       subcategory: v.subcategory?.name || null,

//       // VENDOR INFO
//       vendor: v.vendor?.storeName || null,

//       createdAt: v.createdAt
//     }));

//     // FORMAT ADMIN PRODUCTS
//     const formattedAdmin = adminProducts.map(a => ({
//       _id: a._id,
//       source: "admin",

//       // BASIC
//       name: a.name,
//       description: a.description,
//       restaurantName: a.restaurantName,
//       oldPrice: a.oldPrice,
//       newPrice: a.newPrice,
//       quality: a.quality,
//       stock: a.stock,

//       // EXTRA FIELDS
//       religion: a.religion,
//       productTypes: a.productTypes,
//       flavors: a.flavors,
//       dietPreference: a.dietPreference,
//       nutrition: a.nutrition,
//       materialTypes: a.materialTypes,
//       ingredients: a.ingredients,
//       allergenInfo: a.allergenInfo,
//       dietaryPreferences: a.dietaryPreferences,
//       cuisine: a.cuisine,
//       size: a.size,

//       // IMAGES
//       image: a.image,
//       logo: a.logo,
//       gallery: a.gallery,

//       // CATEGORY & SUBCATEGORY
//       category: a.category?.name || null,
//       subcategory: a.subcategory?.name || null,

//       // ADMIN PRODUCT vendor (optional)
//       vendor: a.vendor?.storeName || null,

//       createdAt: a.createdAt
//     }));

//     // MERGE BOTH
//     const finalData = [...formattedAdmin, ...formattedVendor];

//     // SORT NEWEST FIRST
//     finalData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     res.json({
//       success: true,
//       count: finalData.length,
//       data: finalData
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };




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









const Product = require("../models/Product");
const VendorProduct = require("../models/VendorProduct");
const cloudinary = require("../config/cloudinary");

// ==========================================
// 1. ADD NEW VENDOR PRODUCT (WITH CLOUDINARY)
// ==========================================
exports.addVendorProduct = async (req, res) => {
  try {
    let imageUrl = "";
    let logoUrl = "";
    let galleryUrls = [];

    // Main Image Upload
    if (req.files && req.files.image) {
      const res = await cloudinary.uploader.upload(req.files.image.tempFilePath, { folder: "products" });
      imageUrl = res.secure_url;
    }

    // Logo Upload
    if (req.files && req.files.logo) {
      const res = await cloudinary.uploader.upload(req.files.logo.tempFilePath, { folder: "logos" });
      logoUrl = res.secure_url;
    }

    // Gallery Upload (Multiple)
    if (req.files && req.files.gallery) {
      const files = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      for (const file of files) {
        const res = await cloudinary.uploader.upload(file.tempFilePath, { folder: "gallery" });
        galleryUrls.push(res.secure_url);
      }
    }

    // Create Product with URLs
    const newProduct = new VendorProduct({
      ...req.body,
      image: imageUrl,
      logo: logoUrl,
      gallery: galleryUrls,
      vendor: req.user.id // Token se aayi ID
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product Saved to Cloudinary", data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==========================================
// 2. GET PUBLIC PRODUCTS (FETCH LOGIC)
// ==========================================
exports.getPublicProducts = async (req, res) => {
  try {
    // FETCH ADMIN & VENDOR PRODUCTS
    const [adminProducts, vendorProducts] = await Promise.all([
      Product.find().populate("category", "name").populate("subcategory", "name").populate("vendor", "_id storeName").lean(),
      VendorProduct.find().populate("category", "name").populate("subcategory", "name").populate("vendor", "_id storeName").lean()
    ]);

    // FORMAT FUNCTION (Dono ke liye common)
    const formatData = (list, sourceName) => list.map(item => ({
      _id: item._id,
      source: sourceName,
      name: item.name,
      description: item.description,
      restaurantName: item.restaurantName,
      oldPrice: item.oldPrice,
      newPrice: item.newPrice,
      quality: item.quality,
      stock: item.stock,
      religion: item.religion,
      productTypes: item.productTypes,
      flavors: item.flavors,
      dietPreference: item.dietPreference,
      nutrition: item.nutrition,
      materialTypes: item.materialTypes,
      ingredients: item.ingredients,
      allergenInfo: item.allergenInfo,
      dietaryPreferences: item.dietaryPreferences,
      cuisine: item.cuisine,
      size: item.size,
      image: item.image,
      logo: item.logo,
      gallery: item.gallery,
      category: item.category?.name || null,
      subcategory: item.subcategory?.name || null,
      vendor: item.vendor?.storeName || item.restaurantName || "N/A",
      createdAt: item.createdAt
    }));

    const finalData = [...formatData(adminProducts, "admin"), ...formatData(vendorProducts, "vendor")];

    // SORT NEWEST FIRST
    finalData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ success: true, count: finalData.length, data: finalData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
