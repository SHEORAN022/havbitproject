
// const VendorProduct = require("../models/VendorProduct");
// const Vendor = require("../models/Vendor");
// const cloudinary = require("../config/cloudinary");

// const csv = require("csv-parser");
// const fs = require("fs");
// const { Parser } = require("json2csv");

// /* ================= CLOUDINARY UPLOAD ================= */
// async function uploadCloud(file) {
//   const base64 = file.buffer.toString("base64");
//   const dataUri = `data:${file.mimetype};base64,${base64}`;
//   const result = await cloudinary.uploader.upload(dataUri, {
//     folder: "vendor_products",
//     resource_type: "auto",
//   });
//   return result.secure_url;
// }

// /* ================= GET PRODUCTS ================= */
// exports.getVendorProducts = async (req, res) => {
//   try {
//     const products = await VendorProduct.find({
//       vendor: req.vendor._id,
//     })
//       .populate("category", "name")
//       .populate("subcategory", "name");

//     const vendor = await Vendor.findById(req.vendor._id);

//     res.json({
//       success: true,
//       vendorId: vendor._id,
//       storeName: vendor.storeName || "",
//       data: products,
//     });
//   } catch (err) {
//     console.error("Get products error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= CREATE PRODUCT - UPDATED ================= */
// exports.createVendorProduct = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.vendor._id);

//     // FIX: Always save shop name if provided in request
//     // Remove the condition that checks if vendor.storeName is empty
//     if (req.body.restaurantName && req.body.restaurantName.trim() !== "") {
//       vendor.storeName = req.body.restaurantName;
//       await vendor.save();
//     }

//     let image = null,
//       logo = null,
//       gallery = [];

//     if (req.files?.image) image = await uploadCloud(req.files.image[0]);
//     if (req.files?.logo) logo = await uploadCloud(req.files.logo[0]);

//     if (req.files?.gallery) {
//       for (const g of req.files.gallery) {
//         gallery.push(await uploadCloud(g));
//       }
//     }

//     // IMPORTANT: Use vendor's storeName for restaurantName
//     // This ensures all products have consistent shop name
//     const restaurantNameToUse = vendor.storeName || req.body.restaurantName || "";

//     const product = await VendorProduct.create({
//       ...req.body,
//       vendor: req.vendor._id,
//       restaurantName: restaurantNameToUse, // Use saved store name
//       image,
//       logo,
//       gallery,
//     });

//     res.json({ 
//       success: true, 
//       data: product,
//       storeName: vendor.storeName // Send back updated store name
//     });
//   } catch (err) {
//     console.error("Create product error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= UPDATE PRODUCT ================= */
// exports.updateVendorProduct = async (req, res) => {
//   try {
//     const product = await VendorProduct.findOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!product) {
//       return res.status(404).json({ success: false, message: "Not Found" });
//     }

//     Object.assign(product, req.body);

//     if (req.files?.image) product.image = await uploadCloud(req.files.image[0]);
//     if (req.files?.logo) product.logo = await uploadCloud(req.files.logo[0]);

//     if (req.files?.gallery) {
//       product.gallery = [];
//       for (const g of req.files.gallery) {
//         product.gallery.push(await uploadCloud(g));
//       }
//     }

//     await product.save();
//     res.json({ success: true, data: product });
//   } catch (err) {
//     console.error("Update product error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= DELETE PRODUCT ================= */
// exports.deleteVendorProduct = async (req, res) => {
//   try {
//     await VendorProduct.deleteOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Delete product error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= CSV IMPORT (DISK STORAGE) ================= */
// exports.importCSV = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "CSV file required" });
//     }

//     const vendorId = req.vendor._id;
//     const vendor = await Vendor.findById(vendorId);
//     const rows = [];

//     fs.createReadStream(req.file.path)
//       .pipe(csv())
//       .on("data", (row) => rows.push(row))
//       .on("end", async () => {
//         let created = 0;
//         let updated = 0;

//         for (const r of rows) {
//           if (!r.name || !r.newPrice) continue;

//           const payload = {
//             name: r.name,
//             brandName: r.brandName || "", // FSSAI Code
//             description: r.description || "",
//             oldPrice: Number(r.oldPrice) || 0,
//             newPrice: Number(r.newPrice),
//             stock: Number(r.stock) || 0,
//             quality: r.quality || "Standard",
//             State: r.State || "", // Location
//             vendor: vendorId,
//             restaurantName: vendor.storeName || r.restaurantName || "", // Shop Name
//             category: r.category || null,
//             subcategory: r.subcategory || null,
//             productTypes: r.productTypes || "",
//             flavors: r.flavors || "",
//             dietPreference: r.dietPreference || "Veg",
//             nutrition: r.nutrition || "",
//             materialTypes: r.materialTypes || "",
//             ingredients: r.ingredients || "",
//             allergenInfo: r.allergenInfo || "",
//             dietaryPreferences: r.dietaryPreferences || "",
//             cuisine: r.cuisine || "",
//             size: r.size || "",
//           };

//           if (r._id) {
//             await VendorProduct.updateOne(
//               { _id: r._id, vendor: vendorId },
//               payload
//             );
//             updated++;
//           } else {
//             await VendorProduct.create(payload);
//             created++;
//           }
//         }

//         fs.unlinkSync(req.file.path);

//         res.json({
//           success: true,
//           created,
//           updated,
//           total: rows.length,
//         });
//       });
//   } catch (err) {
//     console.error("CSV import error:", err);
//     res.status(500).json({ message: "CSV Import Failed" });
//   }
// };

// /* ================= CSV EXPORT ================= */
// exports.exportCSV = async (req, res) => {
//   try {
//     const products = await VendorProduct.find({
//       vendor: req.vendor._id,
//     }).lean();

//     const fields = Object.keys(VendorProduct.schema.paths).filter(
//       (f) => f !== "__v"
//     );

//     const parser = new Parser({ fields });
//     const csvData = parser.parse(products);

//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=vendor_products.csv"
//     );
//     res.send(csvData);
//   } catch (err) {
//     console.error("CSV export error:", err);
//     res.status(500).json({ message: "CSV Export Failed" });
//   }
// };

// /* ================= BULK UPDATE ================= */
// exports.bulkUpdate = async (req, res) => {
//   try {
//     const { ids, data } = req.body;
//     if (!ids?.length) {
//       return res.status(400).json({ message: "IDs required" });
//     }

//     const result = await VendorProduct.updateMany(
//       { _id: { $in: ids }, vendor: req.vendor._id },
//       { $set: data }
//     );

//     res.json({ success: true, modified: result.modifiedCount });
//   } catch (err) {
//     console.error("Bulk update error:", err);
//     res.status(500).json({ message: "Bulk update failed" });
//   }
// };

// /* ================= BULK DELETE ================= */
// exports.bulkDelete = async (req, res) => {
//   try {
//     const { ids } = req.body;
//     if (!ids?.length) {
//       return res.status(400).json({ message: "IDs required" });
//     }

//     const result = await VendorProduct.deleteMany({
//       _id: { $in: ids },
//       vendor: req.vendor._id,
//     });

//     res.json({ success: true, deleted: result.deletedCount });
//   } catch (err) {
//     console.error("Bulk delete error:", err);
//     res.status(500).json({ message: "Bulk delete failed" });
//   }
// };












const VendorProduct = require("../models/VendorProduct");
const Vendor = require("../models/Vendor");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const cloudinary = require("../config/cloudinary");

const csv = require("csv-parser");
const fs = require("fs");
const { Parser } = require("json2csv");

/* ================= CLOUDINARY UPLOAD ================= */
async function uploadCloud(file) {
  const base64 = file.buffer.toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "vendor_products",
    resource_type: "auto",
  });
  return result.secure_url;
}

/* ================= GET CATEGORIES ================= */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select("name image _id")
      .sort({ name: 1 });
    
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET SUBCATEGORIES ================= */
exports.getSubCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const subcategories = await SubCategory.find({ 
      category: categoryId,
      isActive: true 
    })
      .select("name image _id")
      .sort({ name: 1 });
    
    res.json({ success: true, data: subcategories });
  } catch (err) {
    console.error("Get subcategories error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET VENDOR PRODUCTS ================= */
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await VendorProduct.find({
      vendor: req.vendor._id,
    })
      .populate("category", "name image")
      .populate("subcategory", "name image");

    const vendor = await Vendor.findById(req.vendor._id);

    res.json({
      success: true,
      vendorId: vendor._id,
      storeName: vendor.storeName || "",
      data: products,
    });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= CREATE VENDOR PRODUCT ================= */
exports.createVendorProduct = async (req, res) => {
  try {
    console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
    console.log("📦 Request body keys:", Object.keys(req.body));
    
    const vendor = await Vendor.findById(req.vendor._id);
    const data = { ...req.body };

    // Step 1: Category Validation
    if (data.category) {
      const categoryExists = await Category.findById(data.category);
      if (!categoryExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid category selected" 
        });
      }
    }

    if (data.subcategory) {
      const subcategoryExists = await SubCategory.findById(data.subcategory);
      if (!subcategoryExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid subcategory selected" 
        });
      }
      
      if (data.category && subcategoryExists.category.toString() !== data.category) {
        return res.status(400).json({ 
          success: false, 
          message: "Subcategory does not belong to selected category" 
        });
      }
    }

    // Step 2: Process formData structure if present
    if (data.formData) {
      console.log("📦 Processing formData structure");
      
      // Step 1: Category Selection (already handled above)
      // data.category and data.subcategory already set
      
      // Step 2: Basic Information
      if (data.formData.basic) {
        data.name = data.formData.basic.name || data.name;
        data.description = data.formData.basic.description || data.description;
        data.restaurantName = vendor.storeName || data.formData.basic.restaurantName || "";
      }
      
      // Step 3: Product Details
      if (data.formData.pricing) {
        data.oldPrice = Number(data.formData.pricing.oldPrice || 0);
        data.price = Number(data.formData.pricing.newPrice || 0); // IMPORTANT: newPrice -> price
        data.stock = Number(data.formData.pricing.stock || 0);
        data.quality = data.formData.pricing.quality || "Standard";
        data.dietPreference = data.formData.pricing.dietPreference || "Veg";
      }
      
      if (data.formData.details) {
        data.productTypes = data.formData.details.productTypes || "";
        data.ingredients = data.formData.details.ingredients || "";
        data.materialTypes = data.formData.details.materialTypes || "";
        data.customWeight = data.formData.details.customWeight || "";
        data.customSizeInput = data.formData.details.customSizeInput || "";
        data.ageRange = data.formData.details.ageRange || "";
        data.containerType = data.formData.details.containerType || "";
        data.itemForm = data.formData.details.itemForm || "";
        data.specialty = data.formData.details.specialty || "";
        data.itemTypeName = data.formData.details.itemTypeName || "";
        data.countryOfOrigin = data.formData.details.countryOfOrigin || "";
        
        // Flavors - Array format
        const flavorsArray = [];
        if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
          flavorsArray.push(...data.formData.details.flavors);
        }
        if (data.formData.details.customFlavorInput) {
          flavorsArray.push(data.formData.details.customFlavorInput);
        }
        data.flavors = flavorsArray.filter(f => f && f.trim() !== '');
        
        // Size - Array format
        const sizeArray = [];
        if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
          sizeArray.push(...data.formData.details.size);
        }
        if (data.formData.details.customSizeInput) {
          sizeArray.push(data.formData.details.customSizeInput);
        }
        data.size = sizeArray.filter(s => s && s.trim() !== '');
      }
      
      // Location
      if (data.formData.location) {
        data.State = data.formData.location.state || "";
      }
      
      // Step 4: Manufacturing & Marketing
      if (data.formData.compliance) {
        data.brandName = data.formData.compliance.fssaiLicense || ""; // IMPORTANT: FSSAI -> brandName
        data.fssaiLicense = data.formData.compliance.fssaiLicense || ""; // Also save to fssaiLicense
        data.legalDisclaimer = data.formData.compliance.legalDisclaimer || "";
      }
      
      if (data.formData.manufacturing) {
        data.manufacturer = data.formData.manufacturing.manufacturerName || "";
        data.manufacturerContact = data.formData.manufacturing.manufacturerAddress || "";
        
        // Packager info - combine name and address
        let packerContact = "";
        if (data.formData.manufacturing.packagerName) {
          packerContact = data.formData.manufacturing.packagerName;
          if (data.formData.manufacturing.packagerAddress) {
            packerContact += `, ${data.formData.manufacturing.packagerAddress}`;
          }
        }
        data.packerContact = packerContact;
        
        // Marketer info - combine name and address
        let marketerNameAddress = "";
        if (data.formData.manufacturing.marketerName) {
          marketerNameAddress = data.formData.manufacturing.marketerName;
          if (data.formData.manufacturing.marketerAddress) {
            marketerNameAddress += `, ${data.formData.manufacturing.marketerAddress}`;
          }
        }
        data.marketerNameAddress = marketerNameAddress;
      }
      
      // Step 5: Package & Dietary
      if (data.formData.package) {
        data.packageColour = data.formData.package.packageColour || "";
        data.measurementUnit = data.formData.package.measurementUnit || "";
        data.unitCount = data.formData.package.unitCount || "";
        data.numberOfItems = data.formData.package.numberOfItems || "";
        data.itemWeight = data.formData.package.itemWeight || "";
        data.totalEaches = data.formData.package.totalEaches || "";
        data.itemPackageWeight = data.formData.package.itemPackageWeight || "";
        data.shelfLife = data.formData.package.shelfLife || "";
      }
      
      if (data.formData.dietary) {
        data.dietaryPreferences = data.formData.dietary.dietaryPreferences || "";
        data.allergenInformation = data.formData.dietary.allergenInformation || "";
        data.nutrition = data.formData.dietary.nutrition || "";
        data.cuisine = data.formData.dietary.cuisine || "";
        data.directions = data.formData.dietary.directions || "";
      }
      
      delete data.formData;
    } else {
      // Handle direct field inputs (for API without formData)
      data.price = data.newPrice || data.price;
      delete data.newPrice;
      
      // Convert flavors string to array
      if (data.flavors && typeof data.flavors === 'string') {
        data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
      } else if (!Array.isArray(data.flavors)) {
        data.flavors = [];
      }
      
      // Convert size string to array
      if (data.size && typeof data.size === 'string') {
        data.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
      } else if (!Array.isArray(data.size)) {
        data.size = [];
      }
    }

    // Required validation
    if (!data.name || !data.price || !data.category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required",
        received: {
          name: data.name,
          price: data.price,
          category: data.category
        }
      });
    }

    // Process images
    let image = null;
    const gallery = [];

    // Step 6: Images
    // Main image
    if (req.files?.image) {
      image = await uploadCloud(req.files.image[0]);
    }

    // Mandatory images (go to gallery positions 0, 1, 2)
    if (req.files?.mandatoryImages?.ingredientsImage) {
      const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0]);
      gallery[0] = img;
    }
    
    if (req.files?.mandatoryImages?.nutritionImage) {
      const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0]);
      gallery[1] = img;
    }
    
    if (req.files?.mandatoryImages?.mfgExpImage) {
      const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0]);
      gallery[2] = img;
    }

    // Additional gallery images
    if (req.files?.gallery) {
      for (const g of req.files.gallery) {
        gallery.push(await uploadCloud(g));
      }
    }

    // Clean empty gallery slots
    const cleanGallery = gallery.filter(img => img && img.trim() !== '');

    // Set restaurant name
    const restaurantNameToUse = vendor.storeName || data.restaurantName || "";

    // Create product
    const productData = {
      ...data,
      vendor: req.vendor._id,
      restaurantName: restaurantNameToUse,
      image: image,
      gallery: cleanGallery
    };

    console.log("📦 Final product data:", JSON.stringify(productData, null, 2));

    const product = await VendorProduct.create(productData);

    // Populate and return
    const populatedProduct = await VendorProduct.findById(product._id)
      .populate("category", "name image")
      .populate("subcategory", "name image");

    res.json({ 
      success: true, 
      data: populatedProduct,
      storeName: vendor.storeName
    });
  } catch (err) {
    console.error("❌ Create product error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error",
      error: err.message 
    });
  }
};

/* ================= UPDATE VENDOR PRODUCT ================= */
exports.updateVendorProduct = async (req, res) => {
  try {
    console.log("🟢 UPDATE VENDOR PRODUCT API CALLED");
    
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    const data = { ...req.body };

    // Category validation
    if (data.category) {
      const categoryExists = await Category.findById(data.category);
      if (!categoryExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid category selected" 
        });
      }
    }

    if (data.subcategory) {
      const subcategoryExists = await SubCategory.findById(data.subcategory);
      if (!subcategoryExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid subcategory selected" 
        });
      }
      
      if (data.category && subcategoryExists.category.toString() !== data.category) {
        return res.status(400).json({ 
          success: false, 
          message: "Subcategory does not belong to selected category" 
        });
      }
    }

    // Process formData if present
    if (data.formData) {
      // Basic Info
      if (data.formData.basic) {
        if (data.formData.basic.name !== undefined) data.name = data.formData.basic.name;
        if (data.formData.basic.description !== undefined) data.description = data.formData.basic.description;
      }
      
      // Pricing
      if (data.formData.pricing) {
        if (data.formData.pricing.oldPrice !== undefined) data.oldPrice = Number(data.formData.pricing.oldPrice);
        if (data.formData.pricing.newPrice !== undefined) data.price = Number(data.formData.pricing.newPrice);
        if (data.formData.pricing.stock !== undefined) data.stock = Number(data.formData.pricing.stock);
        if (data.formData.pricing.quality !== undefined) data.quality = data.formData.pricing.quality;
        if (data.formData.pricing.dietPreference !== undefined) data.dietPreference = data.formData.pricing.dietPreference;
      }
      
      // Product Details
      if (data.formData.details) {
        const detailFields = [
          'productTypes', 'ingredients', 'materialTypes', 'customWeight',
          'customSizeInput', 'ageRange', 'containerType', 'itemForm',
          'specialty', 'itemTypeName', 'countryOfOrigin'
        ];
        
        detailFields.forEach(field => {
          if (data.formData.details[field] !== undefined) {
            data[field] = data.formData.details[field];
          }
        });
        
        // Flavors array
        if (data.formData.details.flavors !== undefined || data.formData.details.customFlavorInput !== undefined) {
          const flavorsArray = [];
          if (Array.isArray(data.formData.details.flavors)) {
            flavorsArray.push(...data.formData.details.flavors);
          }
          if (data.formData.details.customFlavorInput) {
            flavorsArray.push(data.formData.details.customFlavorInput);
          }
          data.flavors = flavorsArray.filter(f => f && f.trim() !== '');
        }
        
        // Size array
        if (data.formData.details.size !== undefined || data.formData.details.customSizeInput !== undefined) {
          const sizeArray = [];
          if (Array.isArray(data.formData.details.size)) {
            sizeArray.push(...data.formData.details.size);
          }
          if (data.formData.details.customSizeInput) {
            sizeArray.push(data.formData.details.customSizeInput);
          }
          data.size = sizeArray.filter(s => s && s.trim() !== '');
        }
      }
      
      // Location
      if (data.formData.location && data.formData.location.state !== undefined) {
        data.State = data.formData.location.state;
      }
      
      // Manufacturing & Marketing
      if (data.formData.compliance) {
        if (data.formData.compliance.fssaiLicense !== undefined) {
          data.brandName = data.formData.compliance.fssaiLicense;
          data.fssaiLicense = data.formData.compliance.fssaiLicense;
        }
        if (data.formData.compliance.legalDisclaimer !== undefined) {
          data.legalDisclaimer = data.formData.compliance.legalDisclaimer;
        }
      }
      
      if (data.formData.manufacturing) {
        if (data.formData.manufacturing.manufacturerName !== undefined) data.manufacturer = data.formData.manufacturing.manufacturerName;
        if (data.formData.manufacturing.manufacturerAddress !== undefined) data.manufacturerContact = data.formData.manufacturing.manufacturerAddress;
        
        // Packager
        if (data.formData.manufacturing.packagerName !== undefined || data.formData.manufacturing.packagerAddress !== undefined) {
          let packerContact = data.formData.manufacturing.packagerName || "";
          if (data.formData.manufacturing.packagerAddress) {
            packerContact += packerContact ? `, ${data.formData.manufacturing.packagerAddress}` : data.formData.manufacturing.packagerAddress;
          }
          data.packerContact = packerContact;
        }
        
        // Marketer
        if (data.formData.manufacturing.marketerName !== undefined || data.formData.manufacturing.marketerAddress !== undefined) {
          let marketerNameAddress = data.formData.manufacturing.marketerName || "";
          if (data.formData.manufacturing.marketerAddress) {
            marketerNameAddress += marketerNameAddress ? `, ${data.formData.manufacturing.marketerAddress}` : data.formData.manufacturing.marketerAddress;
          }
          data.marketerNameAddress = marketerNameAddress;
        }
      }
      
      // Package & Dietary
      if (data.formData.package) {
        const packageFields = [
          'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
          'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife'
        ];
        
        packageFields.forEach(field => {
          if (data.formData.package[field] !== undefined) {
            data[field] = data.formData.package[field];
          }
        });
      }
      
      if (data.formData.dietary) {
        const dietaryFields = [
          'dietaryPreferences', 'allergenInformation', 'nutrition',
          'cuisine', 'directions'
        ];
        
        dietaryFields.forEach(field => {
          if (data.formData.dietary[field] !== undefined) {
            data[field] = data.formData.dietary[field];
          }
        });
      }
      
      delete data.formData;
    } else {
      // Handle direct field updates
      if (data.newPrice !== undefined) {
        data.price = data.newPrice;
        delete data.newPrice;
      }
      
      // Handle arrays
      if (data.flavors !== undefined) {
        if (typeof data.flavors === 'string') {
          data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
        } else if (!Array.isArray(data.flavors)) {
          data.flavors = [];
        }
      }
      
      if (data.size !== undefined) {
        if (typeof data.size === 'string') {
          data.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
        } else if (!Array.isArray(data.size)) {
          data.size = [];
        }
      }
    }

    // Update images
    if (req.files?.image) {
      data.image = await uploadCloud(req.files.image[0]);
    }

    // Update gallery
    let updateGallery = [...(product.gallery || [])];
    
    if (req.files?.mandatoryImages?.ingredientsImage) {
      const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0]);
      updateGallery[0] = img;
    }
    
    if (req.files?.mandatoryImages?.nutritionImage) {
      const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0]);
      updateGallery[1] = img;
    }
    
    if (req.files?.mandatoryImages?.mfgExpImage) {
      const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0]);
      updateGallery[2] = img;
    }
    
    if (req.files?.gallery) {
      for (const g of req.files.gallery) {
        updateGallery.push(await uploadCloud(g));
      }
    }
    
    // Clean gallery
    updateGallery = updateGallery.filter(img => img && img.trim() !== '');
    data.gallery = updateGallery;

    // Update product
    Object.assign(product, data);
    await product.save();
    
    // Populate and return
    const populatedProduct = await VendorProduct.findById(product._id)
      .populate("category", "name image")
      .populate("subcategory", "name image");

    res.json({ success: true, data: populatedProduct });
  } catch (err) {
    console.error("❌ Update product error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= DELETE PRODUCT ================= */
exports.deleteVendorProduct = async (req, res) => {
  try {
    await VendorProduct.deleteOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= CSV IMPORT ================= */
exports.importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file required" });
    }

    const vendorId = req.vendor._id;
    const vendor = await Vendor.findById(vendorId);
    const rows = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", async () => {
        let created = 0;
        let updated = 0;
        let errors = [];

        for (const [index, r] of rows.entries()) {
          try {
            if (!r.name || !r.price) continue;

            // Find category
            let categoryId = null;
            if (r.category) {
              const category = await Category.findOne({ 
                name: { $regex: new RegExp(`^${r.category}$`, 'i') } 
              });
              if (category) categoryId = category._id;
            }

            // Find subcategory
            let subcategoryId = null;
            if (r.subcategory) {
              const subcategory = await SubCategory.findOne({ 
                name: { $regex: new RegExp(`^${r.subcategory}$`, 'i') },
                ...(categoryId ? { category: categoryId } : {})
              });
              if (subcategory) subcategoryId = subcategory._id;
            }

            // Parse arrays
            const flavors = r.flavors ? r.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : [];
            const size = r.size ? r.size.split(',').map(s => s.trim()).filter(s => s !== '') : [];

            const payload = {
              name: r.name,
              brandName: r.brandName || "",
              description: r.description || "",
              oldPrice: Number(r.oldPrice) || 0,
              price: Number(r.price),
              stock: Number(r.stock) || 0,
              quality: r.quality || "Standard",
              State: r.State || "",
              vendor: vendorId,
              restaurantName: vendor.storeName || r.restaurantName || "",
              category: categoryId,
              subcategory: subcategoryId,
              productTypes: r.productTypes || "",
              flavors: flavors,
              size: size,
              dietPreference: r.dietPreference || "Veg",
              ageRange: r.ageRange || "",
              containerType: r.containerType || "",
              itemForm: r.itemForm || "",
              specialty: r.specialty || "",
              itemTypeName: r.itemTypeName || "",
              countryOfOrigin: r.countryOfOrigin || "",
              manufacturer: r.manufacturer || "",
              manufacturerContact: r.manufacturerContact || "",
              packerContact: r.packerContact || "",
              marketerNameAddress: r.marketerNameAddress || "",
              packageColour: r.packageColour || "",
              measurementUnit: r.measurementUnit || "",
              unitCount: r.unitCount || "",
              numberOfItems: r.numberOfItems || "",
              itemWeight: r.itemWeight || "",
              totalEaches: r.totalEaches || "",
              itemPackageWeight: r.itemPackageWeight || "",
              shelfLife: r.shelfLife || "",
              ingredients: r.ingredients || "",
              allergenInformation: r.allergenInformation || "",
              directions: r.directions || "",
              nutrition: r.nutrition || "",
              cuisine: r.cuisine || "",
              dietaryPreferences: r.dietaryPreferences || "",
              materialTypes: r.materialTypes || "",
              customWeight: r.customWeight || "",
              customSizeInput: r.customSizeInput || "",
              fssaiLicense: r.fssaiLicense || "",
              legalDisclaimer: r.legalDisclaimer || "",
            };

            if (r._id) {
              await VendorProduct.updateOne(
                { _id: r._id, vendor: vendorId },
                payload
              );
              updated++;
            } else {
              await VendorProduct.create(payload);
              created++;
            }
          } catch (error) {
            errors.push(`Row ${index + 1}: ${error.message}`);
          }
        }

        fs.unlinkSync(req.file.path);

        res.json({
          success: true,
          created,
          updated,
          total: rows.length,
          errors: errors.length > 0 ? errors : undefined,
        });
      });
  } catch (err) {
    console.error("CSV import error:", err);
    res.status(500).json({ message: "CSV Import Failed" });
  }
};

/* ================= CSV EXPORT ================= */
exports.exportCSV = async (req, res) => {
  try {
    const products = await VendorProduct.find({
      vendor: req.vendor._id,
    })
      .populate("category", "name")
      .populate("subcategory", "name")
      .lean();

    // Transform data
    const transformedProducts = products.map(product => ({
      ...product,
      flavors: Array.isArray(product.flavors) ? product.flavors.join(',') : product.flavors || "",
      size: Array.isArray(product.size) ? product.size.join(',') : product.size || "",
      category: product.category ? product.category.name : "",
      subcategory: product.subcategory ? product.subcategory.name : "",
      categoryId: product.category ? product.category._id : "",
      subcategoryId: product.subcategory ? product.subcategory._id : ""
    }));

    const fields = [
      '_id', 'name', 'description', 'brandName', 'restaurantName',
      'oldPrice', 'price', 'stock', 'quality', 'State',
      'category', 'subcategory', 'categoryId', 'subcategoryId',
      'productTypes', 'flavors', 'size', 'dietPreference',
      'ageRange', 'containerType', 'itemForm', 'specialty',
      'itemTypeName', 'countryOfOrigin', 'manufacturer',
      'manufacturerContact', 'packerContact', 'marketerNameAddress',
      'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
      'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife',
      'ingredients', 'allergenInformation', 'directions', 'nutrition',
      'cuisine', 'dietaryPreferences', 'materialTypes', 'customWeight',
      'customSizeInput', 'fssaiLicense', 'legalDisclaimer'
    ];

    const parser = new Parser({ fields });
    const csvData = parser.parse(transformedProducts);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=vendor_products.csv"
    );
    res.send(csvData);
  } catch (err) {
    console.error("CSV export error:", err);
    res.status(500).json({ message: "CSV Export Failed" });
  }
};

/* ================= BULK UPDATE ================= */
exports.bulkUpdate = async (req, res) => {
  try {
    const { ids, data } = req.body;
    if (!ids?.length) {
      return res.status(400).json({ message: "IDs required" });
    }

    // Handle price mapping
    const updateData = { ...data };
    if (updateData.newPrice !== undefined) {
      updateData.price = updateData.newPrice;
      delete updateData.newPrice;
    }

    // Handle arrays
    if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
      updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
    }
    
    if (updateData.size !== undefined && typeof updateData.size === 'string') {
      updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
    }

    const result = await VendorProduct.updateMany(
      { _id: { $in: ids }, vendor: req.vendor._id },
      { $set: updateData }
    );

    res.json({ success: true, modified: result.modifiedCount });
  } catch (err) {
    console.error("Bulk update error:", err);
    res.status(500).json({ message: "Bulk update failed" });
  }
};

/* ================= BULK DELETE ================= */
exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids?.length) {
      return res.status(400).json({ message: "IDs required" });
    }

    const result = await VendorProduct.deleteMany({
      _id: { $in: ids },
      vendor: req.vendor._id,
    });

    res.json({ success: true, deleted: result.deletedCount });
  } catch (err) {
    console.error("Bulk delete error:", err);
    res.status(500).json({ message: "Bulk delete failed" });
  }
};
