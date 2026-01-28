
// const Product = require("../models/Product");

// /* ================= GET ALL (WEBSITE) ================= */
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email") // 🔥 vendor id + store
//       .sort({ createdAt: -1 });

//     res.json({ success: true, data: products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= GET ONE ================= */
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email");

//     if (!product)
//       return res.status(404).json({ success: false, message: "Not found" });

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= CREATE (ADMIN) ================= */
// exports.addProduct = async (req, res) => {
//   try {
//     const data = req.body;

//     if (req.files?.image) data.image = req.files.image[0].path;
//     if (req.files?.logo) data.logo = req.files.logo[0].path;

//     // optional vendor support
//     if (req.body.vendor) data.vendor = req.body.vendor;

//     const product = await Product.create(data);
//     res.status(201).json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= UPDATE ================= */
// exports.updateProduct = async (req, res) => {
//   try {
//     const data = req.body;

//     if (req.files?.image) data.image = req.files.image[0].path;
//     if (req.files?.logo) data.logo = req.files.logo[0].path;

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true }
//     );

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= DELETE ================= */
// exports.deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ success: true, message: "Product deleted" });
// };




// const Product = require("../models/Product");

// /* ================= GET ALL PRODUCTS ================= */
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, data: products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= GET SINGLE PRODUCT ================= */
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email");

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= CREATE PRODUCT (ADMIN) ================= */
// exports.addProduct = async (req, res) => {
//   try {
//     let data = req.body;
    
//     /* 🔥 CRITICAL FIELD MAPPING FROM FRONTEND */
//     // Map frontend field names to backend field names
//     const fieldMappings = {
//       // Basic Info
//       'fssaiLicense': 'brandName', // FSSAI license goes to brandName
//       'restaurantName': 'restaurantName', // Shop name
//       'name': 'name', // Product name
//       'description': 'description',
      
//       // Pricing & Stock
//       'mrp': 'oldPrice', // MRP becomes oldPrice
//       'price': 'newPrice', // price becomes newPrice
//       'stock': 'stock',
//       'quality': 'quality',
//       'vegNonVeg': 'dietPreference', // vegNonVeg becomes dietPreference
      
//       // Product Details
//       'productTypes': 'productTypes',
//       'flavors': 'flavors',
//       'size': 'size',
//       'materialTypes': 'materialTypes',
//       'ingredients': 'ingredients',
//       // REMOVED: 'religion': 'religion',
      
//       // Dietary & Nutrition
//       'dietaryPreferences': 'dietaryPreferences',
//       'allergenInfo': 'allergenInfo',
//       'nutrition': 'nutrition',
//       'cuisine': 'cuisine',
      
//       // Location
//       'state': 'State', // state becomes State (capital S)
//       'location': 'location',
//     };

//     // Apply field mappings
//     const mappedData = {};
//     Object.keys(fieldMappings).forEach(frontendField => {
//       const backendField = fieldMappings[frontendField];
//       if (data[frontendField] !== undefined && data[frontendField] !== null && data[frontendField] !== '') {
//         mappedData[backendField] = data[frontendField];
//       }
//     });

//     // Category fields
//     if (data.category) mappedData.category = data.category;
//     if (data.subcategory) mappedData.subcategory = data.subcategory;

//     // Vendor/Admin logic
//     if (req.user && req.user.role === 'vendor') {
//       mappedData.vendor = req.user._id;
//       if (!mappedData.restaurantName && req.user.storeName) {
//         mappedData.restaurantName = req.user.storeName;
//       }
//     } else {
//       mappedData.restaurantName = mappedData.restaurantName || "Havbit";
//       mappedData.vendor = null;
//     }

//     /* FILES HANDLING */
//     if (req.files?.image) {
//       mappedData.image = req.files.image[0].path;
//     }
    
//     if (req.files?.gallery) {
//       mappedData.gallery = req.files.gallery.map((file) => file.path);
//     }
    
//     if (req.files?.logo) {
//       mappedData.logo = req.files.logo[0].path;
//     }

//     console.log("Creating product with data:", mappedData);

//     const product = await Product.create(mappedData);

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       data: product,
//     });
//   } catch (err) {
//     console.error("Product creation error:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Error creating product: " + err.message,
//       error: err.message 
//     });
//   }
// };

// /* ================= UPDATE PRODUCT ================= */
// exports.updateProduct = async (req, res) => {
//   try {
//     const data = req.body;

//     // Map fields for update
//     if (data.mrp) data.oldPrice = data.mrp;
//     if (data.price) data.newPrice = data.price;
//     if (data.fssaiLicense) data.brandName = data.fssaiLicense;
//     if (data.state) data.State = data.state;

//     // Handle files
//     if (req.files?.image) data.image = req.files.image[0].path;
//     if (req.files?.logo) data.logo = req.files.logo[0].path;
//     if (req.files?.gallery) {
//       data.gallery = req.files.gallery.map((f) => f.path);
//     }

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true }
//     );

//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.json({ 
//       success: true, 
//       message: "Product updated successfully",
//       data: product 
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= DELETE PRODUCT ================= */
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
    
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
    
//     res.json({ success: true, message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= BULK UPDATE ================= */
// exports.bulkUpdateProducts = async (req, res) => {
//   try {
//     const { ids, data } = req.body;
    
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ success: false, message: "Product IDs are required" });
//     }

//     // Map fields for bulk update
//     const updateData = {};
//     if (data.name) updateData.name = data.name;
//     if (data.newPrice) updateData.newPrice = data.newPrice;
//     if (data.oldPrice) updateData.oldPrice = data.oldPrice;
//     if (data.stock) updateData.stock = data.stock;
//     if (data.quality) updateData.quality = data.quality;
//     if (data.State) updateData.State = data.State;
//     if (data.dietPreference) updateData.dietPreference = data.dietPreference;
//     if (data.brandName) updateData.brandName = data.brandName;
//     if (data.description) updateData.description = data.description;
//     if (data.productTypes) updateData.productTypes = data.productTypes;
//     if (data.flavors) updateData.flavors = data.flavors;
//     if (data.size) updateData.size = data.size;
//     if (data.cuisine) updateData.cuisine = data.cuisine;

//     const result = await Product.updateMany(
//       { _id: { $in: ids } },
//       { $set: updateData }
//     );

//     res.json({
//       success: true,
//       message: `${result.modifiedCount} products updated successfully`,
//       modifiedCount: result.modifiedCount
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= BULK DELETE ================= */
// exports.bulkDeleteProducts = async (req, res) => {
//   try {
//     const { ids } = req.body;
    
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ success: false, message: "Product IDs are required" });
//     }

//     const result = await Product.deleteMany({ _id: { $in: ids } });

//     res.json({
//       success: true,
//       message: `${result.deletedCount} products deleted successfully`,
//       deletedCount: result.deletedCount
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= CSV IMPORT ================= */
// exports.importCSV = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "CSV file is required" });
//     }

//     // You'll need to implement CSV parsing logic here
//     // Using csv-parser or similar library
    
//     res.json({ success: true, message: "CSV import functionality to be implemented" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= CSV EXPORT ================= */
// exports.exportCSV = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .lean();

//     // Create CSV header
//     const headers = [
//       'Product Name', 'Description', 'Shop Name', 'FSSAI (brandName)',
//       'MRP (oldPrice)', 'Selling Price (newPrice)', 'Stock', 'Quality',
//       'Category', 'Subcategory', 'Diet Preference', 'Product Types',
//       'Flavors', 'Size', 'Material Types', 'Ingredients',
//       'Dietary Preferences', 'Allergen Info', 'Nutrition', 'Cuisine',
//       'State', 'Location', 'Created At'
//     ];

//     // Convert products to CSV rows
//     const csvRows = products.map(product => [
//       product.name || '',
//       product.description || '',
//       product.restaurantName || '',
//       product.brandName || '',
//       product.oldPrice || '',
//       product.newPrice || '',
//       product.stock || '',
//       product.quality || '',
//       product.category?.name || '',
//       product.subcategory?.name || '',
//       product.dietPreference || '',
//       product.productTypes || '',
//       product.flavors || '',
//       product.size || '',
//       product.materialTypes || '',
//       product.ingredients || '',
//       product.dietaryPreferences || '',
//       product.allergenInfo || '',
//       product.nutrition || '',
//       product.cuisine || '',
//       product.State || '',
//       product.location || '',
//       new Date(product.createdAt).toLocaleDateString()
//     ]);

//     // Combine headers and rows
//     const csvContent = [
//       headers.join(','),
//       ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
//     ].join('\n');

//     res.setHeader('Content-Type', 'text/csv');
//     res.setHeader('Content-Disposition', 'attachment; filename=products_export.csv');
//     res.send(csvContent);
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };








// const Product = require("../models/Product");

// /* =====================================================
//    GET ALL PRODUCTS
// ===================================================== */
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email")
//       .sort({ createdAt: -1 })
//       .lean();

//     return res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.error("GET PRODUCTS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch products",
//     });
//   }
// };

// /* =====================================================
//    GET SINGLE PRODUCT
// ===================================================== */
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email");

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (error) {
//     console.error("GET PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch product",
//     });
//   }
// };

// /* =====================================================
//    CREATE PRODUCT
// ===================================================== */
// exports.addProduct = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     /* ===== REQUIRED FIELDS CHECK ===== */
//     if (!data.name || !data.newPrice || !data.category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price and category are required",
//       });
//     }

//     /* ===== FRONTEND → BACKEND FIELD MAP ===== */
//     if (data.mrp) data.oldPrice = Number(data.mrp);
//     if (data.price) data.newPrice = Number(data.price);

//     /* ===== FILE UPLOAD ===== */
//     if (req.files?.image?.length) {
//       data.image = req.files.image[0].path;
//     }

//     if (req.files?.logo?.length) {
//       data.logo = req.files.logo[0].path;
//     }

//     if (req.files?.gallery?.length) {
//       data.gallery = req.files.gallery.map(f => f.path);
//     }

//     const product = await Product.create(data);

//     return res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       data: product,
//     });
//   } catch (error) {
//     console.error("CREATE PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create product",
//     });
//   }
// };

// /* =====================================================
//    UPDATE PRODUCT
// ===================================================== */
// exports.updateProduct = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     if (data.mrp) data.oldPrice = Number(data.mrp);
//     if (data.price) data.newPrice = Number(data.price);

//     if (req.files?.image?.length) {
//       data.image = req.files.image[0].path;
//     }

//     if (req.files?.logo?.length) {
//       data.logo = req.files.logo[0].path;
//     }

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true, runValidators: true }
//     );

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       data: product,
//     });
//   } catch (error) {
//     console.error("UPDATE PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update product",
//     });
//   }
// };

// /* =====================================================
//    DELETE PRODUCT
// ===================================================== */
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.error("DELETE PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete product",
//     });
//   }
// };




// // controllers/productController.js
// const Product = require("../models/Product");

// /* =====================================================
//    GET ALL PRODUCTS
// ===================================================== */
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email")
//       .sort({ createdAt: -1 })
//       .lean();

//     return res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.error("GET PRODUCTS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch products",
//     });
//   }
// };

// /* =====================================================
//    GET SINGLE PRODUCT
// ===================================================== */
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email");

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (error) {
//     console.error("GET PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch product",
//     });
//   }
// };

// /* =====================================================
//    CREATE PRODUCT - UPDATED WITH ALL FIELDS
// ===================================================== */
// exports.addProduct = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     /* ===== REQUIRED FIELDS CHECK ===== */
//     if (!data.name || !data.newPrice || !data.category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price and category are required",
//       });
//     }

//     /* ===== FRONTEND → BACKEND FIELD MAP ===== */
//     // Convert comma-separated strings to arrays for flavors and size
//     if (data.flavors && typeof data.flavors === 'string') {
//       data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f);
//     }
    
//     if (data.size && typeof data.size === 'string') {
//       data.size = data.size.split(',').map(s => s.trim()).filter(s => s);
//     }

//     /* ===== FILE UPLOAD ===== */
//     if (req.files?.image?.length) {
//       data.image = req.files.image[0].path;
//     }

//     if (req.files?.logo?.length) {
//       data.logo = req.files.logo[0].path;
//     }

//     if (req.files?.gallery?.length) {
//       data.gallery = req.files.gallery.map(f => f.path);
//     }

//     // Set default values for empty fields
//     const defaults = {
//       restaurantName: "Havbit",
//       quality: "Standard",
//       dietPreference: "Veg",
//       stock: 0,
//       oldPrice: 0
//     };

//     // Apply defaults only if field is undefined
//     Object.keys(defaults).forEach(key => {
//       if (data[key] === undefined || data[key] === null || data[key] === "") {
//         data[key] = defaults[key];
//       }
//     });

//     const product = await Product.create(data);

//     return res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       data: product,
//     });
//   } catch (error) {
//     console.error("CREATE PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create product",
//     });
//   }
// };

// /* =====================================================
//    UPDATE PRODUCT
// ===================================================== */
// exports.updateProduct = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     // Handle arrays for flavors and size
//     if (data.flavors && typeof data.flavors === 'string') {
//       data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f);
//     }
    
//     if (data.size && typeof data.size === 'string') {
//       data.size = data.size.split(',').map(s => s.trim()).filter(s => s);
//     }

//     if (req.files?.image?.length) {
//       data.image = req.files.image[0].path;
//     }

//     if (req.files?.logo?.length) {
//       data.logo = req.files.logo[0].path;
//     }

//     if (req.files?.gallery?.length) {
//       data.gallery = req.files.gallery.map(f => f.path);
//     }

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true, runValidators: true }
//     );

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       data: product,
//     });
//   } catch (error) {
//     console.error("UPDATE PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update product",
//     });
//   }
// };

// /* =====================================================
//    DELETE PRODUCT
// ===================================================== */
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.error("DELETE PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete product",
//     });
//   }
// };

// /* =====================================================
//    BULK DELETE
// ===================================================== */
// exports.bulkDelete = async (req, res) => {
//   try {
//     const { ids } = req.body;
    
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Product IDs are required",
//       });
//     }

//     const result = await Product.deleteMany({ _id: { $in: ids } });

//     return res.status(200).json({
//       success: true,
//       message: `${result.deletedCount} products deleted successfully`,
//       deletedCount: result.deletedCount,
//     });
//   } catch (error) {
//     console.error("BULK DELETE ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete products",
//     });
//   }
// };

// /* =====================================================
//    BULK UPDATE
// ===================================================== */
// exports.bulkUpdate = async (req, res) => {
//   try {
//     const { ids, data } = req.body;
    
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Product IDs are required",
//       });
//     }

//     if (!data || Object.keys(data).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Update data is required",
//       });
//     }

//     // Handle arrays for flavors and size
//     if (data.flavors && typeof data.flavors === 'string') {
//       data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f);
//     }
    
//     if (data.size && typeof data.size === 'string') {
//       data.size = data.size.split(',').map(s => s.trim()).filter(s => s);
//     }

//     const result = await Product.updateMany(
//       { _id: { $in: ids } },
//       { $set: data },
//       { multi: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: `${result.modifiedCount} products updated successfully`,
//       modifiedCount: result.modifiedCount,
//     });
//   } catch (error) {
//     console.error("BULK UPDATE ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update products",
//     });
//   }
// };

// /* =====================================================
//    CSV IMPORT
// ===================================================== */
// const csv = require("csv-parser");
// const fs = require("fs");

// exports.importCSV = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "CSV file required" 
//       });
//     }

//     const results = [];
    
//     fs.createReadStream(req.file.path)
//       .pipe(csv())
//       .on("data", (data) => results.push(data))
//       .on("end", async () => {
//         try {
//           let created = 0;
//           let updated = 0;
//           let errors = [];

//           for (const [index, row] of results.entries()) {
//             try {
//               // Map CSV columns to schema fields
//               const productData = {
//                 name: row.name || row.productName || "",
//                 description: row.description || "",
//                 brandName: row.brandName || row.fssaiLicense || "",
//                 restaurantName: row.restaurantName || "Havbit",
//                 oldPrice: parseFloat(row.oldPrice || row.mrp || 0),
//                 newPrice: parseFloat(row.newPrice || row.price || 0),
//                 stock: parseInt(row.stock || 0),
//                 quality: row.quality || "Standard",
                
//                 // Category
//                 category: row.categoryId || row.category,
//                 subcategory: row.subcategoryId || row.subcategory,
                
//                 // Product Details
//                 dietPreference: row.dietPreference || row.dietType || "Veg",
//                 ageRange: row.ageRange || "",
//                 containerType: row.containerType || "",
//                 flavors: row.flavors ? row.flavors.split(',').map(f => f.trim()) : [],
//                 itemForm: row.itemForm || "",
//                 specialty: row.specialty || "",
//                 itemTypeName: row.itemTypeName || "",
//                 countryOfOrigin: row.countryOfOrigin || "",
                
//                 // Compliance
//                 fssaiLicense: row.fssaiLicense || "",
//                 legalDisclaimer: row.legalDisclaimer || "",
//                 shelfLife: row.shelfLife || "",
                
//                 // Manufacturing
//                 manufacturer: row.manufacturer || "",
//                 manufacturerContact: row.manufacturerContact || "",
//                 packerContact: row.packerContact || "",
//                 marketerNameAddress: row.marketerNameAddress || "",
                
//                 // Package Details
//                 packageColour: row.packageColour || "",
//                 measurementUnit: row.measurementUnit || "",
//                 unitCount: row.unitCount || "",
//                 numberOfItems: row.numberOfItems || "",
//                 itemWeight: row.itemWeight || "",
//                 size: row.size ? row.size.split(',').map(s => s.trim()) : [],
//                 totalEaches: row.totalEaches || "",
//                 itemPackageWeight: row.itemPackageWeight || "",
                
//                 // Ingredients
//                 ingredients: row.ingredients || "",
//                 allergenInformation: row.allergenInformation || "",
//                 directions: row.directions || "",
                
//                 // Additional Details
//                 productTypes: row.productTypes || "",
//                 materialTypes: row.materialTypes || "",
//                 nutrition: row.nutrition || "",
//                 allergenInfo: row.allergenInfo || "",
//                 dietaryPreferences: row.dietaryPreferences || "",
//                 cuisine: row.cuisine || "",
//                 State: row.State || row.state || "",
//                 customWeight: row.customWeight || "",
//                 customSizeInput: row.customSizeInput || ""
//               };

//               // Remove empty fields
//               Object.keys(productData).forEach(key => {
//                 if (productData[key] === undefined || productData[key] === null || productData[key] === "") {
//                   delete productData[key];
//                 }
//               });

//               if (row._id) {
//                 // Update existing product
//                 await Product.findByIdAndUpdate(row._id, productData);
//                 updated++;
//               } else {
//                 // Create new product
//                 await Product.create(productData);
//                 created++;
//               }
//             } catch (err) {
//               errors.push(`Row ${index + 1}: ${err.message}`);
//             }
//           }

//           // Clean up temp file
//           fs.unlinkSync(req.file.path);

//           return res.status(200).json({
//             success: true,
//             message: "CSV import completed",
//             created,
//             updated,
//             errors: errors.length > 0 ? errors : undefined
//           });
//         } catch (err) {
//           console.error("CSV processing error:", err);
//           return res.status(500).json({
//             success: false,
//             message: "Failed to process CSV file"
//           });
//         }
//       });
//   } catch (error) {
//     console.error("CSV import error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "CSV import failed",
//     });
//   }
// };

// /* =====================================================
//    CSV EXPORT
// ===================================================== */
// const { Parser } = require("json2csv");

// exports.exportCSV = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .lean();

//     // Define all fields for CSV
//     const fields = [
//       { label: "Product ID", value: "_id" },
//       { label: "Name", value: "name" },
//       { label: "Description", value: "description" },
//       { label: "Brand Name", value: "brandName" },
//       { label: "Restaurant Name", value: "restaurantName" },
//       { label: "Old Price (MRP)", value: "oldPrice" },
//       { label: "New Price", value: "newPrice" },
//       { label: "Stock", value: "stock" },
//       { label: "Quality", value: "quality" },
//       { label: "Category", value: "category.name" },
//       { label: "Subcategory", value: "subcategory.name" },
//       { label: "Diet Preference", value: "dietPreference" },
//       { label: "Age Range", value: "ageRange" },
//       { label: "Container Type", value: "containerType" },
//       { label: "Flavors", value: "flavors" },
//       { label: "Item Form", value: "itemForm" },
//       { label: "Specialty", value: "specialty" },
//       { label: "Item Type Name", value: "itemTypeName" },
//       { label: "Country of Origin", value: "countryOfOrigin" },
//       { label: "FSSAI License", value: "fssaiLicense" },
//       { label: "Legal Disclaimer", value: "legalDisclaimer" },
//       { label: "Shelf Life", value: "shelfLife" },
//       { label: "Manufacturer", value: "manufacturer" },
//       { label: "Manufacturer Contact", value: "manufacturerContact" },
//       { label: "Packer Contact", value: "packerContact" },
//       { label: "Marketer Name & Address", value: "marketerNameAddress" },
//       { label: "Package Colour", value: "packageColour" },
//       { label: "Measurement Unit", value: "measurementUnit" },
//       { label: "Unit Count", value: "unitCount" },
//       { label: "Number of Items", value: "numberOfItems" },
//       { label: "Item Weight", value: "itemWeight" },
//       { label: "Size", value: "size" },
//       { label: "Total Eaches", value: "totalEaches" },
//       { label: "Item Package Weight", value: "itemPackageWeight" },
//       { label: "Ingredients", value: "ingredients" },
//       { label: "Allergen Information", value: "allergenInformation" },
//       { label: "Directions", value: "directions" },
//       { label: "Product Types", value: "productTypes" },
//       { label: "Material Types", value: "materialTypes" },
//       { label: "Nutrition", value: "nutrition" },
//       { label: "Allergen Info", value: "allergenInfo" },
//       { label: "Dietary Preferences", value: "dietaryPreferences" },
//       { label: "Cuisine", value: "cuisine" },
//       { label: "State", value: "State" },
//       { label: "Custom Weight", value: "customWeight" },
//       { label: "Custom Size Input", value: "customSizeInput" },
//       { label: "Created At", value: "createdAt" },
//       { label: "Updated At", value: "updatedAt" }
//     ];

//     const parser = new Parser({ fields });
//     const csvData = parser.parse(products);

//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=products_export.csv"
//     );
//     res.send(csvData);
//   } catch (error) {
//     console.error("CSV export error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "CSV export failed",
//     });
//   }
// };






// controllers/productController.js
const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

/* =====================================================
   GET ALL PRODUCTS
===================================================== */
const getProducts = async (req, res) => {
  try {
    console.log("📡 Fetching products...");
    
    const products = await Product.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ createdAt: -1 })
      .lean();

    console.log(`✅ Found ${products.length} products`);
    
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("❌ GET PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

/* =====================================================
   GET SINGLE PRODUCT
===================================================== */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

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

/* =====================================================
   CREATE PRODUCT
===================================================== */
const addProduct = async (req, res) => {
  try {
    console.log("📝 Creating new product...");
    console.log("📦 Request body:", req.body);
    console.log("📁 Files:", req.files);

    const data = { ...req.body };

    /* ===== BASIC VALIDATION ===== */
    if (!data.name || !data.newPrice || !data.category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required",
      });
    }

    /* ===== HANDLE NUMERIC FIELDS ===== */
    if (data.oldPrice) data.oldPrice = Number(data.oldPrice);
    if (data.newPrice) data.newPrice = Number(data.newPrice);
    if (data.stock) data.stock = Number(data.stock);

    /* ===== DEFAULT VALUES ===== */
    if (!data.restaurantName) data.restaurantName = "Havbit";
    if (!data.quality) data.quality = "Standard";
    if (!data.dietPreference) data.dietPreference = "Veg";

    /* ===== FILE UPLOAD ===== */
    if (req.files?.image?.length) {
      data.image = req.files.image[0].path;
      console.log("📸 Main image saved:", data.image);
    }

    if (req.files?.gallery?.length) {
      data.gallery = req.files.gallery.map(f => f.path);
      console.log("🖼️ Gallery images:", data.gallery.length);
    }

    /* ===== CREATE PRODUCT ===== */
    console.log("💾 Saving product to database...");
    const product = await Product.create(data);

    console.log("✅ Product created successfully:", product._id);
    
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("❌ CREATE PRODUCT ERROR:", error);
    console.error("❌ Error stack:", error.stack);
    
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
};

/* =====================================================
   UPDATE PRODUCT
===================================================== */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const data = { ...req.body };

    // Handle numeric fields
    if (data.oldPrice) data.oldPrice = Number(data.oldPrice);
    if (data.newPrice) data.newPrice = Number(data.newPrice);
    if (data.stock) data.stock = Number(data.stock);

    // Handle files
    if (req.files?.image?.length) {
      data.image = req.files.image[0].path;
    }

    if (req.files?.gallery?.length) {
      data.gallery = req.files.gallery.map(f => f.path);
    }

    // Update product
    Object.assign(product, data);
    await product.save();

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
      error: error.message
    });
  }
};

/* =====================================================
   DELETE PRODUCT
===================================================== */
const deleteProduct = async (req, res) => {
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

/* =====================================================
   BULK DELETE PRODUCTS
===================================================== */
const bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product IDs are required",
      });
    }

    const result = await Product.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} products deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("BULK DELETE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete products",
    });
  }
};

/* =====================================================
   BULK UPDATE PRODUCTS
===================================================== */
const bulkUpdate = async (req, res) => {
  try {
    const { ids, data } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product IDs are required",
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Update data is required",
      });
    }

    const result = await Product.updateMany(
      { _id: { $in: ids } },
      { $set: data },
      { multi: true }
    );

    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} products updated successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("BULK UPDATE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update products",
    });
  }
};

/* =====================================================
   CSV IMPORT
===================================================== */
const csv = require("csv-parser");
const fs = require("fs");

const importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "CSV file required" 
      });
    }

    const results = [];
    
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          let created = 0;
          let errors = [];

          for (const [index, row] of results.entries()) {
            try {
              const productData = {
                name: row.name || row.productName || "",
                description: row.description || "",
                brandName: row.brandName || row.fssaiLicense || "",
                restaurantName: row.restaurantName || "Havbit",
                oldPrice: parseFloat(row.oldPrice || row.mrp || 0),
                newPrice: parseFloat(row.newPrice || row.price || 0),
                stock: parseInt(row.stock || 0),
                quality: row.quality || "Standard",
                dietPreference: row.dietPreference || "Veg",
                category: row.categoryId || row.category,
                subcategory: row.subcategoryId || row.subcategory,
                productTypes: row.productTypes || "",
                materialTypes: row.materialTypes || "",
                ingredients: row.ingredients || "",
                customWeight: row.customWeight || "",
                dietaryPreferences: row.dietaryPreferences || "",
                allergenInfo: row.allergenInfo || "",
                nutrition: row.nutrition || "",
                cuisine: row.cuisine || "",
                State: row.State || row.state || "",
              };

              // Remove empty fields
              Object.keys(productData).forEach(key => {
                if (productData[key] === undefined || productData[key] === null || productData[key] === "") {
                  delete productData[key];
                }
              });

              await Product.create(productData);
              created++;
              
            } catch (err) {
              errors.push(`Row ${index + 1}: ${err.message}`);
            }
          }

          // Clean up temp file
          fs.unlinkSync(req.file.path);

          return res.status(200).json({
            success: true,
            message: "CSV import completed",
            created,
            total: results.length,
            errors: errors.length > 0 ? errors : undefined
          });
        } catch (err) {
          console.error("CSV processing error:", err);
          return res.status(500).json({
            success: false,
            message: "Failed to process CSV file"
          });
        }
      });
  } catch (error) {
    console.error("CSV import error:", error);
    return res.status(500).json({
      success: false,
      message: "CSV import failed",
    });
  }
};

/* =====================================================
   CSV EXPORT
===================================================== */
const { Parser } = require("json2csv");

const exportCSV = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .lean();

    // Define fields for CSV
    const fields = [
      { label: "Product ID", value: "_id" },
      { label: "Name", value: "name" },
      { label: "Description", value: "description" },
      { label: "Brand Name", value: "brandName" },
      { label: "Restaurant Name", value: "restaurantName" },
      { label: "Old Price", value: "oldPrice" },
      { label: "New Price", value: "newPrice" },
      { label: "Stock", value: "stock" },
      { label: "Quality", value: "quality" },
      { label: "Diet Preference", value: "dietPreference" },
      { label: "Category", value: "category.name" },
      { label: "Subcategory", value: "subcategory.name" },
      { label: "Product Types", value: "productTypes" },
      { label: "Material Types", value: "materialTypes" },
      { label: "Ingredients", value: "ingredients" },
      { label: "Custom Weight", value: "customWeight" },
      { label: "Dietary Preferences", value: "dietaryPreferences" },
      { label: "Allergen Info", value: "allergenInfo" },
      { label: "Nutrition", value: "nutrition" },
      { label: "Cuisine", value: "cuisine" },
      { label: "State", value: "State" },
      { label: "Created At", value: "createdAt" },
    ];

    const parser = new Parser({ fields });
    const csvData = parser.parse(products);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=products_export.csv"
    );
    res.send(csvData);
  } catch (error) {
    console.error("CSV export error:", error);
    return res.status(500).json({
      success: false,
      message: "CSV export failed",
    });
  }
};

// Export all functions properly
module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  bulkDelete,
  bulkUpdate,
  importCSV,
  exportCSV
};
