





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









/********************************************************************
 *  Public Product Controller
 *
 *  The controller now:
 *    • Returns virtual fields `fssaiLicense` and `state`.
 *    • Accepts `fssaiLicense` and `location` (state) when creating /
 *      updating a product.
 ********************************************************************/
const Product = require("../models/Product");

/* -------------------------------------------------------------
   GET ALL PUBLIC PRODUCTS
   ------------------------------------------------------------- */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("vendor", "_id storeName email")
      .lean(); // virtuals are kept when using .lean()

    // Add the virtual fields explicitly (extra safety)
    const withExtras = products.map((p) => ({
      ...p,
      fssaiLicense: p.brandName,
      state: p.State,
    }));

    return res.status(200).json({
      success: true,
      count: withExtras.length,
      data: withExtras,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/* -------------------------------------------------------------
   GET SINGLE PRODUCT BY ID
   ------------------------------------------------------------- */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("vendor", "_id storeName email")
      .lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Attach virtual fields for front‑end consumption
    product.fssaiLicense = product.brandName;
    product.state = product.State;

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

/* -------------------------------------------------------------
   CREATE PRODUCT (admin side)
   ------------------------------------------------------------- */
exports.addProduct = async (req, res) => {
  try {
    const data = {
      ...req.body,

      // Map UI → DB
      brandName: req.body.fssaiLicense?.trim() || "",
      State: req.body.location?.trim() || "",

      // Admin products belong to the default shop “Havbit”
      restaurantName: "Havbit",

      // Convert old UI field names if they exist
      oldPrice: Number(req.body.mrp) || 0,
      newPrice: Number(req.body.price) || 0,
    };

    // File uploads (if any)
    if (req.files?.image?.length) data.image = req.files.image[0].path;
    if (req.files?.logo?.length) data.logo = req.files.logo[0].path;

    const product = await Product.create(data);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

/* -------------------------------------------------------------
   UPDATE PRODUCT (admin side)
   ------------------------------------------------------------- */
exports.updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.body.mrp) data.oldPrice = Number(req.body.mrp);
    if (req.body.price) data.newPrice = Number(req.body.price);

    // Map licence / location if they are present
    if (req.body.fssaiLicense) data.brandName = req.body.fssaiLicense.trim();
    if (req.body.location) data.State = req.body.location.trim();

    if (req.files?.image?.length) data.image = req.files.image[0].path;
    if (req.files?.logo?.length) data.logo = req.files.logo[0].path;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

/* -------------------------------------------------------------
   DELETE PRODUCT (admin side)
   ------------------------------------------------------------- */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};
