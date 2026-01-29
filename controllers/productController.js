



// // controllers/productController.js
// const Product = require("../models/Product");
// const Category = require("../models/Category");
// const SubCategory = require("../models/SubCategory");

// /* =====================================================
//    GET ALL PRODUCTS
// ===================================================== */
// const getProducts = async (req, res) => {
//   try {
//     console.log("📡 Fetching products...");
    
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .sort({ createdAt: -1 })
//       .lean();

//     console.log(`✅ Found ${products.length} products`);
    
//     return res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.error("❌ GET PRODUCTS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch products",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    GET SINGLE PRODUCT
// ===================================================== */
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("category", "name")
//       .populate("subcategory", "name");

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
// const addProduct = async (req, res) => {
//   try {
//     console.log("📝 Creating new product...");
//     console.log("📦 Request body:", req.body);
//     console.log("📁 Files:", req.files);

//     const data = { ...req.body };

//     /* ===== BASIC VALIDATION ===== */
//     if (!data.name || !data.newPrice || !data.category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price and category are required",
//       });
//     }

//     /* ===== HANDLE NUMERIC FIELDS ===== */
//     if (data.oldPrice) data.oldPrice = Number(data.oldPrice);
//     if (data.newPrice) data.newPrice = Number(data.newPrice);
//     if (data.stock) data.stock = Number(data.stock);

//     /* ===== DEFAULT VALUES ===== */
//     if (!data.restaurantName) data.restaurantName = "Havbit";
//     if (!data.quality) data.quality = "Standard";
//     if (!data.dietPreference) data.dietPreference = "Veg";

//     /* ===== FILE UPLOAD ===== */
//     if (req.files?.image?.length) {
//       data.image = req.files.image[0].path;
//       console.log("📸 Main image saved:", data.image);
//     }

//     if (req.files?.gallery?.length) {
//       data.gallery = req.files.gallery.map(f => f.path);
//       console.log("🖼️ Gallery images:", data.gallery.length);
//     }

//     /* ===== CREATE PRODUCT ===== */
//     console.log("💾 Saving product to database...");
//     const product = await Product.create(data);

//     console.log("✅ Product created successfully:", product._id);
    
//     return res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       data: product,
//     });
//   } catch (error) {
//     console.error("❌ CREATE PRODUCT ERROR:", error);
//     console.error("❌ Error stack:", error.stack);
    
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create product",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    UPDATE PRODUCT
// ===================================================== */
// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     const data = { ...req.body };

//     // Handle numeric fields
//     if (data.oldPrice) data.oldPrice = Number(data.oldPrice);
//     if (data.newPrice) data.newPrice = Number(data.newPrice);
//     if (data.stock) data.stock = Number(data.stock);

//     // Handle files
//     if (req.files?.image?.length) {
//       data.image = req.files.image[0].path;
//     }

//     if (req.files?.gallery?.length) {
//       data.gallery = req.files.gallery.map(f => f.path);
//     }

//     // Update product
//     Object.assign(product, data);
//     await product.save();

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
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    DELETE PRODUCT
// ===================================================== */
// const deleteProduct = async (req, res) => {
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
//    BULK DELETE PRODUCTS
// ===================================================== */
// const bulkDelete = async (req, res) => {
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
//    BULK UPDATE PRODUCTS
// ===================================================== */
// const bulkUpdate = async (req, res) => {
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

// const importCSV = async (req, res) => {
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
//           let errors = [];

//           for (const [index, row] of results.entries()) {
//             try {
//               const productData = {
//                 name: row.name || row.productName || "",
//                 description: row.description || "",
//                 brandName: row.brandName || row.fssaiLicense || "",
//                 restaurantName: row.restaurantName || "Havbit",
//                 oldPrice: parseFloat(row.oldPrice || row.mrp || 0),
//                 newPrice: parseFloat(row.newPrice || row.price || 0),
//                 stock: parseInt(row.stock || 0),
//                 quality: row.quality || "Standard",
//                 dietPreference: row.dietPreference || "Veg",
//                 category: row.categoryId || row.category,
//                 subcategory: row.subcategoryId || row.subcategory,
//                 productTypes: row.productTypes || "",
//                 materialTypes: row.materialTypes || "",
//                 ingredients: row.ingredients || "",
//                 customWeight: row.customWeight || "",
//                 dietaryPreferences: row.dietaryPreferences || "",
//                 allergenInfo: row.allergenInfo || "",
//                 nutrition: row.nutrition || "",
//                 cuisine: row.cuisine || "",
//                 State: row.State || row.state || "",
//               };

//               // Remove empty fields
//               Object.keys(productData).forEach(key => {
//                 if (productData[key] === undefined || productData[key] === null || productData[key] === "") {
//                   delete productData[key];
//                 }
//               });

//               await Product.create(productData);
//               created++;
              
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
//             total: results.length,
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

// const exportCSV = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .lean();

//     // Define fields for CSV
//     const fields = [
//       { label: "Product ID", value: "_id" },
//       { label: "Name", value: "name" },
//       { label: "Description", value: "description" },
//       { label: "Brand Name", value: "brandName" },
//       { label: "Restaurant Name", value: "restaurantName" },
//       { label: "Old Price", value: "oldPrice" },
//       { label: "New Price", value: "newPrice" },
//       { label: "Stock", value: "stock" },
//       { label: "Quality", value: "quality" },
//       { label: "Diet Preference", value: "dietPreference" },
//       { label: "Category", value: "category.name" },
//       { label: "Subcategory", value: "subcategory.name" },
//       { label: "Product Types", value: "productTypes" },
//       { label: "Material Types", value: "materialTypes" },
//       { label: "Ingredients", value: "ingredients" },
//       { label: "Custom Weight", value: "customWeight" },
//       { label: "Dietary Preferences", value: "dietaryPreferences" },
//       { label: "Allergen Info", value: "allergenInfo" },
//       { label: "Nutrition", value: "nutrition" },
//       { label: "Cuisine", value: "cuisine" },
//       { label: "State", value: "State" },
//       { label: "Created At", value: "createdAt" },
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

// // Export all functions properly
// module.exports = {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   bulkDelete,
//   bulkUpdate,
//   importCSV,
//   exportCSV
// };









// const Product = require("../models/Product");
// const cloudinary = require("../config/cloudinary");

// /* ================= CLOUDINARY UPLOAD ================= */
// const uploadToCloudinary = async (file, folder) => {
//   const base64 = file.buffer.toString("base64");
//   const dataUri = `data:${file.mimetype};base64,${base64}`;

//   const result = await cloudinary.uploader.upload(dataUri, {
//     folder,
//   });

//   return result.secure_url;
// };

// /* ================= GET ALL ================= */
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, data: products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= GET ONE ================= */
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("category", "name")
//       .populate("subcategory", "name");

//     if (!product)
//       return res.status(404).json({ success: false, message: "Not found" });

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= CREATE ================= */
// const addProduct = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     if (!data.name || !data.newPrice || !data.category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price & category required",
//       });
//     }

//     if (req.files?.image) {
//       data.image = await uploadToCloudinary(
//         req.files.image[0],
//         "products/main"
//       );
//     }

//     if (req.files?.gallery) {
//       data.gallery = [];
//       for (const g of req.files.gallery) {
//         data.gallery.push(
//           await uploadToCloudinary(g, "products/gallery")
//         );
//       }
//     }

//     const product = await Product.create(data);
//     res.status(201).json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= UPDATE ================= */
// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product)
//       return res.status(404).json({ success: false, message: "Not found" });

//     const data = { ...req.body };

//     if (req.files?.image) {
//       data.image = await uploadToCloudinary(
//         req.files.image[0],
//         "products/main"
//       );
//     }

//     if (req.files?.gallery) {
//       data.gallery = [];
//       for (const g of req.files.gallery) {
//         data.gallery.push(
//           await uploadToCloudinary(g, "products/gallery")
//         );
//       }
//     }

//     Object.assign(product, data);
//     await product.save();

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= DELETE ================= */
// const deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= BULK ================= */
// const bulkDelete = async (req, res) => {
//   await Product.deleteMany({ _id: { $in: req.body.ids } });
//   res.json({ success: true });
// };

// const bulkUpdate = async (req, res) => {
//   await Product.updateMany(
//     { _id: { $in: req.body.ids } },
//     { $set: req.body.data }
//   );
//   res.json({ success: true });
// };

// module.exports = {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   bulkDelete,
//   bulkUpdate,
// };








// // controllers/productController.js - UPDATED
// const Product = require("../models/Product");

// /* =====================================================
//    GET ALL PRODUCTS
// ===================================================== */
// const getProducts = async (req, res) => {
//   try {
//     console.log("📡 Fetching products...");
    
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email")
//       .sort({ createdAt: -1 })
//       .lean();

//     console.log(`✅ Found ${products.length} products`);
    
//     return res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.error("❌ GET PRODUCTS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch products",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    CREATE PRODUCT - WITH ALL NEW FIELDS
// ===================================================== */
// const addProduct = async (req, res) => {
//   try {
//     console.log("📝 Creating new product with all fields...");
//     console.log("📦 Request body:", req.body);

//     const data = { ...req.body };

//     /* ===== BASIC VALIDATION ===== */
//     if (!data.name || !data.newPrice || !data.category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price and category are required",
//       });
//     }

//     /* ===== HANDLE NUMERIC FIELDS ===== */
//     if (data.oldPrice) data.oldPrice = Number(data.oldPrice);
//     if (data.newPrice) data.newPrice = Number(data.newPrice);
//     if (data.stock) data.stock = Number(data.stock);

//     /* ===== DEFAULT VALUES ===== */
//     if (!data.restaurantName) data.restaurantName = "Havbit";
//     if (!data.quality) data.quality = "Standard";
//     if (!data.dietPreference) data.dietPreference = "Veg";

//     /* ===== MAP FRONTEND FIELDS TO BACKEND ===== */
//     // If frontend sends fssaiLicenseNumber, map it to fssaiLicense
//     if (data.fssaiLicenseNumber) {
//       data.fssaiLicense = data.fssaiLicenseNumber;
//       delete data.fssaiLicenseNumber;
//     }
    
//     // If frontend sends allergenInfo, copy to allergenInformation as well
//     if (data.allergenInfo && !data.allergenInformation) {
//       data.allergenInformation = data.allergenInfo;
//     }

//     /* ===== FILE UPLOAD ===== */
//     if (req.files?.image?.length) {
//       data.image = req.files.image[0].path;
//       console.log("📸 Main image saved:", data.image);
//     }

//     if (req.files?.gallery?.length) {
//       data.gallery = req.files.gallery.map(f => f.path);
//       console.log("🖼️ Gallery images:", data.gallery.length);
//     }

//     /* ===== CREATE PRODUCT ===== */
//     console.log("💾 Saving product to database with all fields...");
//     const product = await Product.create(data);

//     console.log("✅ Product created successfully with ID:", product._id);
    
//     return res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       data: product,
//     });
//   } catch (error) {
//     console.error("❌ CREATE PRODUCT ERROR:", error);
//     console.error("❌ Error stack:", error.stack);
    
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create product",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    UPDATE PRODUCT - WITH ALL FIELDS
// ===================================================== */
// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     const data = { ...req.body };

//     // Handle numeric fields
//     if (data.oldPrice) data.oldPrice = Number(data.oldPrice);
//     if (data.newPrice) data.newPrice = Number(data.newPrice);
//     if (data.stock) data.stock = Number(data.stock);

//     // Map frontend fields
//     if (data.fssaiLicenseNumber) {
//       data.fssaiLicense = data.fssaiLicenseNumber;
//       delete data.fssaiLicenseNumber;
//     }
    
//     if (data.allergenInfo && !data.allergenInformation) {
//       data.allergenInformation = data.allergenInfo;
//     }

//     // Handle files
//     if (req.files?.image?.length) {
//       data.image = req.files.image[0].path;
//     }

//     if (req.files?.gallery?.length) {
//       data.gallery = req.files.gallery.map(f => f.path);
//     }

//     // Update product with all fields
//     Object.assign(product, data);
//     await product.save();

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
//       error: error.message
//     });
//   }
// };

// // Other functions remain same...

// // Export all functions
// module.exports = {
//   getProducts,
//   getProductById: async (req, res) => {
//     try {
//       const product = await Product.findById(req.params.id)
//         .populate("category", "name")
//         .populate("subcategory", "name")
//         .populate("vendor", "_id storeName email");

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         data: product,
//       });
//     } catch (error) {
//       console.error("GET PRODUCT ERROR:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch product",
//       });
//     }
//   },
//   addProduct,
//   updateProduct,
//   deleteProduct: async (req, res) => {
//     try {
//       const product = await Product.findByIdAndDelete(req.params.id);

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "Product deleted successfully",
//       });
//     } catch (error) {
//       console.error("DELETE PRODUCT ERROR:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to delete product",
//       });
//     }
//   },
//   bulkDelete: async (req, res) => {
//     try {
//       const { ids } = req.body;

//       if (!ids || !Array.isArray(ids) || ids.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Product IDs are required",
//         });
//       }

//       const result = await Product.deleteMany({ _id: { $in: ids } });

//       return res.status(200).json({
//         success: true,
//         message: `${result.deletedCount} products deleted successfully`,
//         deletedCount: result.deletedCount,
//       });
//     } catch (error) {
//       console.error("BULK DELETE ERROR:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to delete products",
//       });
//     }
//   },
//   bulkUpdate: async (req, res) => {
//     try {
//       const { ids, data } = req.body;

//       if (!ids || !Array.isArray(ids) || ids.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Product IDs are required",
//         });
//       }

//       if (!data || Object.keys(data).length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Update data is required",
//         });
//       }

//       const result = await Product.updateMany(
//         { _id: { $in: ids } },
//         { $set: data },
//         { multi: true }
//       );

//       return res.status(200).json({
//         success: true,
//         message: `${result.modifiedCount} products updated successfully`,
//         modifiedCount: result.modifiedCount,
//       });
//     } catch (error) {
//       console.error("BULK UPDATE ERROR:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to update products",
//       });
//     }
//   },
//   importCSV: async (req, res) => {
//     // CSV import logic with all fields
//     const csv = require("csv-parser");
//     const fs = require("fs");
    
//     try {
//       if (!req.file) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "CSV file required" 
//         });
//       }

//       const results = [];
      
//       fs.createReadStream(req.file.path)
//         .pipe(csv())
//         .on("data", (data) => results.push(data))
//         .on("end", async () => {
//           try {
//             let created = 0;
//             let errors = [];

//             for (const [index, row] of results.entries()) {
//               try {
//                 const productData = {
//                   name: row.name || row.productName || "",
//                   description: row.description || "",
//                   brandName: row.brandName || "",
//                   restaurantName: row.restaurantName || "Havbit",
//                   oldPrice: parseFloat(row.oldPrice || row.mrp || 0),
//                   newPrice: parseFloat(row.newPrice || row.price || 0),
//                   stock: parseInt(row.stock || 0),
//                   quality: row.quality || "Standard",
//                   dietPreference: row.dietPreference || "Veg",
                  
//                   // Product Details
//                   productTypes: row.productTypes || "",
//                   flavors: row.flavors || "",
//                   size: row.size || "",
//                   materialTypes: row.materialTypes || "",
//                   ingredients: row.ingredients || "",
//                   customWeight: row.customWeight || "",
//                   customSizeInput: row.customSizeInput || "",
                  
//                   // Product Specifications
//                   ageRange: row.ageRange || "",
//                   containerType: row.containerType || "",
//                   itemForm: row.itemForm || "",
//                   specialty: row.specialty || "",
//                   itemTypeName: row.itemTypeName || "",
//                   countryOfOrigin: row.countryOfOrigin || "",
                  
//                   // Compliance
//                   fssaiLicense: row.fssaiLicense || row.fssaiLicenseNumber || "",
//                   legalDisclaimer: row.legalDisclaimer || "",
//                   shelfLife: row.shelfLife || "",
                  
//                   // Manufacturing
//                   manufacturer: row.manufacturer || "",
//                   manufacturerContact: row.manufacturerContact || "",
//                   packerContact: row.packerContact || "",
//                   marketerNameAddress: row.marketerNameAddress || "",
                  
//                   // Package Details
//                   packageColour: row.packageColour || "",
//                   measurementUnit: row.measurementUnit || "",
//                   unitCount: row.unitCount || "",
//                   numberOfItems: row.numberOfItems || "",
//                   itemWeight: row.itemWeight || "",
//                   totalEaches: row.totalEaches || "",
//                   itemPackageWeight: row.itemPackageWeight || "",
                  
//                   // Dietary & Nutrition
//                   dietaryPreferences: row.dietaryPreferences || "",
//                   allergenInfo: row.allergenInfo || "",
//                   allergenInformation: row.allergenInformation || row.allergenInfo || "",
//                   nutrition: row.nutrition || "",
//                   cuisine: row.cuisine || "",
//                   directions: row.directions || "",
                  
//                   // Location
//                   State: row.State || row.state || "",
                  
//                   // Category
//                   category: row.categoryId || row.category,
//                   subcategory: row.subcategoryId || row.subcategory,
//                 };

//                 // Remove empty fields
//                 Object.keys(productData).forEach(key => {
//                   if (productData[key] === undefined || productData[key] === null || productData[key] === "") {
//                     delete productData[key];
//                   }
//                 });

//                 await Product.create(productData);
//                 created++;
                
//               } catch (err) {
//                 errors.push(`Row ${index + 1}: ${err.message}`);
//               }
//             }

//             // Clean up temp file
//             fs.unlinkSync(req.file.path);

//             return res.status(200).json({
//               success: true,
//               message: "CSV import completed",
//               created,
//               total: results.length,
//               errors: errors.length > 0 ? errors : undefined
//             });
//           } catch (err) {
//             console.error("CSV processing error:", err);
//             return res.status(500).json({
//               success: false,
//               message: "Failed to process CSV file"
//             });
//           }
//         });
//     } catch (error) {
//       console.error("CSV import error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "CSV import failed",
//       });
//     }
//   },
//   exportCSV: async (req, res) => {
//     const { Parser } = require("json2csv");
    
//     try {
//       const products = await Product.find()
//         .populate("category", "name")
//         .populate("subcategory", "name")
//         .lean();

//       // Define ALL fields for CSV
//       const fields = [
//         { label: "Product ID", value: "_id" },
//         { label: "Name", value: "name" },
//         { label: "Description", value: "description" },
//         { label: "Brand Name", value: "brandName" },
//         { label: "Restaurant Name", value: "restaurantName" },
//         { label: "Old Price", value: "oldPrice" },
//         { label: "New Price", value: "newPrice" },
//         { label: "Stock", value: "stock" },
//         { label: "Quality", value: "quality" },
//         { label: "Diet Preference", value: "dietPreference" },
        
//         // Product Details
//         { label: "Product Types", value: "productTypes" },
//         { label: "Flavors", value: "flavors" },
//         { label: "Size", value: "size" },
//         { label: "Material Types", value: "materialTypes" },
//         { label: "Ingredients", value: "ingredients" },
//         { label: "Custom Weight", value: "customWeight" },
//         { label: "Custom Size Input", value: "customSizeInput" },
        
//         // Product Specifications
//         { label: "Age Range", value: "ageRange" },
//         { label: "Container Type", value: "containerType" },
//         { label: "Item Form", value: "itemForm" },
//         { label: "Specialty", value: "specialty" },
//         { label: "Item Type Name", value: "itemTypeName" },
//         { label: "Country of Origin", value: "countryOfOrigin" },
        
//         // Compliance
//         { label: "FSSAI License", value: "fssaiLicense" },
//         { label: "Legal Disclaimer", value: "legalDisclaimer" },
//         { label: "Shelf Life", value: "shelfLife" },
        
//         // Manufacturing
//         { label: "Manufacturer", value: "manufacturer" },
//         { label: "Manufacturer Contact", value: "manufacturerContact" },
//         { label: "Packer Contact", value: "packerContact" },
//         { label: "Marketer Name & Address", value: "marketerNameAddress" },
        
//         // Package Details
//         { label: "Package Colour", value: "packageColour" },
//         { label: "Measurement Unit", value: "measurementUnit" },
//         { label: "Unit Count", value: "unitCount" },
//         { label: "Number of Items", value: "numberOfItems" },
//         { label: "Item Weight", value: "itemWeight" },
//         { label: "Total Eaches", value: "totalEaches" },
//         { label: "Item Package Weight", value: "itemPackageWeight" },
        
//         // Dietary & Nutrition
//         { label: "Dietary Preferences", value: "dietaryPreferences" },
//         { label: "Allergen Info", value: "allergenInfo" },
//         { label: "Allergen Information", value: "allergenInformation" },
//         { label: "Nutrition", value: "nutrition" },
//         { label: "Cuisine", value: "cuisine" },
//         { label: "Directions", value: "directions" },
        
//         // Location
//         { label: "State", value: "State" },
        
//         // Category
//         { label: "Category", value: "category.name" },
//         { label: "Subcategory", value: "subcategory.name" },
        
//         // Timestamps
//         { label: "Created At", value: "createdAt" },
//         { label: "Updated At", value: "updatedAt" }
//       ];

//       const parser = new Parser({ fields });
//       const csvData = parser.parse(products);

//       res.setHeader("Content-Type", "text/csv");
//       res.setHeader(
//         "Content-Disposition",
//         "attachment; filename=products_export.csv"
//       );
//       res.send(csvData);
//     } catch (error) {
//       console.error("CSV export error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "CSV export failed",
//       });
//     }
//   }
// };









const Product = require("../models/Product");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

/* =====================================================
   GET ALL PRODUCTS (ADMIN)
===================================================== */
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("vendor", "_id storeName email")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/* =====================================================
   GET PRODUCT BY ID
===================================================== */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("vendor", "_id storeName email");

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
   CREATE PRODUCT (CLOUDINARY ENABLED)
===================================================== */
const addProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    // Required validation
    if (!data.name || !data.newPrice || !data.category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required",
      });
    }

    // Number conversion
    data.oldPrice = Number(data.oldPrice || 0);
    data.newPrice = Number(data.newPrice);
    data.stock = Number(data.stock || 0);

    // Defaults
    data.restaurantName = data.restaurantName || "Havbit";
    data.quality = data.quality || "Standard";
    data.dietPreference = data.dietPreference || "Veg";

    // Field mapping
    if (data.fssaiLicenseNumber) {
      data.fssaiLicense = data.fssaiLicenseNumber;
      delete data.fssaiLicenseNumber;
    }

    if (data.allergenInfo && !data.allergenInformation) {
      data.allergenInformation = data.allergenInfo;
    }

    /* ========== CLOUDINARY IMAGE UPLOAD ========== */
    if (req.files?.image?.length) {
      const mainImg = await uploadToCloudinary(
        req.files.image[0].buffer,
        "products/main"
      );
      data.image = mainImg.secure_url;
    }

    if (req.files?.gallery?.length) {
      data.gallery = [];
      for (const file of req.files.gallery) {
        const img = await uploadToCloudinary(
          file.buffer,
          "products/gallery"
        );
        data.gallery.push(img.secure_url);
      }
    }

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
      message: error.message,
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

    data.oldPrice = data.oldPrice ? Number(data.oldPrice) : product.oldPrice;
    data.newPrice = data.newPrice ? Number(data.newPrice) : product.newPrice;
    data.stock = data.stock ? Number(data.stock) : product.stock;

    if (data.fssaiLicenseNumber) {
      data.fssaiLicense = data.fssaiLicenseNumber;
      delete data.fssaiLicenseNumber;
    }

    if (data.allergenInfo && !data.allergenInformation) {
      data.allergenInformation = data.allergenInfo;
    }

    /* ========== CLOUDINARY IMAGE UPDATE ========== */
    if (req.files?.image?.length) {
      const mainImg = await uploadToCloudinary(
        req.files.image[0].buffer,
        "products/main"
      );
      data.image = mainImg.secure_url;
    }

    if (req.files?.gallery?.length) {
      data.gallery = [];
      for (const file of req.files.gallery) {
        const img = await uploadToCloudinary(
          file.buffer,
          "products/gallery"
        );
        data.gallery.push(img.secure_url);
      }
    }

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
      message: error.message,
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
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

/* =====================================================
   BULK DELETE
===================================================== */
const bulkDelete = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Product IDs are required",
    });
  }

  const result = await Product.deleteMany({ _id: { $in: ids } });

  return res.status(200).json({
    success: true,
    message: `${result.deletedCount} products deleted`,
  });
};

/* =====================================================
   BULK UPDATE
===================================================== */
const bulkUpdate = async (req, res) => {
  const { ids, data } = req.body;

  if (!ids?.length || !data) {
    return res.status(400).json({
      success: false,
      message: "IDs and update data required",
    });
  }

  const result = await Product.updateMany(
    { _id: { $in: ids } },
    { $set: data }
  );

  return res.status(200).json({
    success: true,
    message: `${result.modifiedCount} products updated`,
  });
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  bulkDelete,
  bulkUpdate,
};

