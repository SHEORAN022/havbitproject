
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








const Product = require("../models/Product");

/* =====================================================
   GET ALL PRODUCTS
===================================================== */
exports.getProducts = async (req, res) => {
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
   GET SINGLE PRODUCT
===================================================== */
exports.getProductById = async (req, res) => {
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
   CREATE PRODUCT
===================================================== */
exports.addProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    /* ===== REQUIRED FIELDS CHECK ===== */
    if (!data.name || !data.newPrice || !data.category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required",
      });
    }

    /* ===== FRONTEND → BACKEND FIELD MAP ===== */
    if (data.mrp) data.oldPrice = Number(data.mrp);
    if (data.price) data.newPrice = Number(data.price);

    /* ===== FILE UPLOAD ===== */
    if (req.files?.image?.length) {
      data.image = req.files.image[0].path;
    }

    if (req.files?.logo?.length) {
      data.logo = req.files.logo[0].path;
    }

    if (req.files?.gallery?.length) {
      data.gallery = req.files.gallery.map(f => f.path);
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
      message: "Failed to create product",
    });
  }
};

/* =====================================================
   UPDATE PRODUCT
===================================================== */
exports.updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.mrp) data.oldPrice = Number(data.mrp);
    if (data.price) data.newPrice = Number(data.price);

    if (req.files?.image?.length) {
      data.image = req.files.image[0].path;
    }

    if (req.files?.logo?.length) {
      data.logo = req.files.logo[0].path;
    }

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

/* =====================================================
   DELETE PRODUCT
===================================================== */
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

