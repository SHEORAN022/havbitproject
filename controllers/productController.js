






// const Product = require("../models/Product");
// const uploadToCloudinary = require("../utils/cloudinaryUpload");

// /* =====================================================
//    GET ALL PRODUCTS (ADMIN)
// ===================================================== */
// const getProducts = async (req, res) => {
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
//    GET PRODUCT BY ID
// ===================================================== */
// const getProductById = async (req, res) => {
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
//    CREATE PRODUCT (CLOUDINARY ENABLED)
// ===================================================== */
// const addProduct = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     // Required validation
//     if (!data.name || !data.newPrice || !data.category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price and category are required",
//       });
//     }

//     // Number conversion
//     data.oldPrice = Number(data.oldPrice || 0);
//     data.newPrice = Number(data.newPrice);
//     data.stock = Number(data.stock || 0);

//     // Defaults
//     data.restaurantName = data.restaurantName || "Havbit";
//     data.quality = data.quality || "Standard";
//     data.dietPreference = data.dietPreference || "Veg";

//     // Field mapping
//     if (data.fssaiLicenseNumber) {
//       data.fssaiLicense = data.fssaiLicenseNumber;
//       delete data.fssaiLicenseNumber;
//     }

//     if (data.allergenInfo && !data.allergenInformation) {
//       data.allergenInformation = data.allergenInfo;
//     }

//     /* ========== CLOUDINARY IMAGE UPLOAD ========== */
//     if (req.files?.image?.length) {
//       const mainImg = await uploadToCloudinary(
//         req.files.image[0].buffer,
//         "products/main"
//       );
//       data.image = mainImg.secure_url;
//     }

//     if (req.files?.gallery?.length) {
//       data.gallery = [];
//       for (const file of req.files.gallery) {
//         const img = await uploadToCloudinary(
//           file.buffer,
//           "products/gallery"
//         );
//         data.gallery.push(img.secure_url);
//       }
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
//       message: error.message,
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

//     data.oldPrice = data.oldPrice ? Number(data.oldPrice) : product.oldPrice;
//     data.newPrice = data.newPrice ? Number(data.newPrice) : product.newPrice;
//     data.stock = data.stock ? Number(data.stock) : product.stock;

//     if (data.fssaiLicenseNumber) {
//       data.fssaiLicense = data.fssaiLicenseNumber;
//       delete data.fssaiLicenseNumber;
//     }

//     if (data.allergenInfo && !data.allergenInformation) {
//       data.allergenInformation = data.allergenInfo;
//     }

//     /* ========== CLOUDINARY IMAGE UPDATE ========== */
//     if (req.files?.image?.length) {
//       const mainImg = await uploadToCloudinary(
//         req.files.image[0].buffer,
//         "products/main"
//       );
//       data.image = mainImg.secure_url;
//     }

//     if (req.files?.gallery?.length) {
//       data.gallery = [];
//       for (const file of req.files.gallery) {
//         const img = await uploadToCloudinary(
//           file.buffer,
//           "products/gallery"
//         );
//         data.gallery.push(img.secure_url);
//       }
//     }

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
//       message: error.message,
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
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete product",
//     });
//   }
// };

// /* =====================================================
//    BULK DELETE
// ===================================================== */
// const bulkDelete = async (req, res) => {
//   const { ids } = req.body;

//   if (!Array.isArray(ids) || ids.length === 0) {
//     return res.status(400).json({
//       success: false,
//       message: "Product IDs are required",
//     });
//   }

//   const result = await Product.deleteMany({ _id: { $in: ids } });

//   return res.status(200).json({
//     success: true,
//     message: `${result.deletedCount} products deleted`,
//   });
// };

// /* =====================================================
//    BULK UPDATE
// ===================================================== */
// const bulkUpdate = async (req, res) => {
//   const { ids, data } = req.body;

//   if (!ids?.length || !data) {
//     return res.status(400).json({
//       success: false,
//       message: "IDs and update data required",
//     });
//   }

//   const result = await Product.updateMany(
//     { _id: { $in: ids } },
//     { $set: data }
//   );

//   return res.status(200).json({
//     success: true,
//     message: `${result.modifiedCount} products updated`,
//   });
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








// const Product = require("../models/Product");
// const uploadToCloudinary = require("../utils/cloudinaryUpload");

// /* =====================================================
//    GET ALL PRODUCTS (ADMIN)
// ===================================================== */
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName email")
//       .sort({ createdAt: -1 })
//       .lean();

//     // Convert arrays properly for response
//     const formattedProducts = products.map(product => ({
//       ...product,
//       flavors: Array.isArray(product.flavors) ? product.flavors : [],
//       size: Array.isArray(product.size) ? product.size : [],
//       gallery: Array.isArray(product.gallery) ? product.gallery : []
//     }));

//     return res.status(200).json({
//       success: true,
//       count: formattedProducts.length,
//       data: formattedProducts,
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
//    GET PRODUCT BY ID
// ===================================================== */
// const getProductById = async (req, res) => {
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

//     // Convert to plain object and ensure arrays
//     const productData = product.toObject();
//     productData.flavors = Array.isArray(productData.flavors) ? productData.flavors : [];
//     productData.size = Array.isArray(productData.size) ? productData.size : [];
//     productData.gallery = Array.isArray(productData.gallery) ? productData.gallery : [];

//     return res.status(200).json({
//       success: true,
//       data: productData,
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
//    CREATE PRODUCT (CLOUDINARY ENABLED)
// ===================================================== */
// const addProduct = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     // Required validation - Step 2: Basic Information
//     if (!data.name || !data.newPrice || !data.category) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price and category are required",
//       });
//     }

//     // Step 1: Category Selection
//     if (data.selectedCategory) {
//       data.category = data.selectedCategory;
//     }
//     if (data.selectedSubCategory) {
//       data.subcategory = data.selectedSubCategory;
//     }

//     // Remove frontend specific keys
//     delete data.selectedCategory;
//     delete data.selectedSubCategory;

//     // Step 2: Basic Information
//     data.restaurantName = "Havbit"; // Fixed value as per mapping

//     // Step 3: Product Details - Pricing & Stock Section
//     data.oldPrice = Number(data.oldPrice || 0);
//     data.newPrice = Number(data.newPrice);
//     data.stock = Number(data.stock || 0);
    
//     // Defaults for quality and dietPreference
//     if (!data.quality) data.quality = "Standard";
//     if (!data.dietPreference) data.dietPreference = "Veg";

//     // Initialize arrays
//     data.flavors = [];
//     data.size = [];

//     // Process formData structure if provided
//     if (data.formData) {
//       // Basic Info
//       if (data.formData.basic) {
//         data.name = data.formData.basic.name || data.name;
//         data.description = data.formData.basic.description || data.description;
//       }

//       // Pricing & Stock
//       if (data.formData.pricing) {
//         data.oldPrice = data.formData.pricing.oldPrice ? 
//           Number(data.formData.pricing.oldPrice) : data.oldPrice;
//         data.newPrice = data.formData.pricing.newPrice ? 
//           Number(data.formData.pricing.newPrice) : data.newPrice;
//         data.stock = data.formData.pricing.stock ? 
//           Number(data.formData.pricing.stock) : data.stock;
//         data.quality = data.formData.pricing.quality || data.quality;
//         data.dietPreference = data.formData.pricing.dietPreference || data.dietPreference;
//       }

//       // Product Specifications
//       if (data.formData.details) {
//         data.ageRange = data.formData.details.ageRange || "";
//         data.containerType = data.formData.details.containerType || "";
//         data.itemForm = data.formData.details.itemForm || "";
//         data.specialty = data.formData.details.specialty || "";
//         data.countryOfOrigin = data.formData.details.countryOfOrigin || "";
//         data.productTypes = data.formData.details.productTypes || "";
//         data.itemTypeName = data.formData.details.itemTypeName || "";
//         data.materialTypes = data.formData.details.materialTypes || "";
//         data.ingredients = data.formData.details.ingredients || "";
//         data.customWeight = data.formData.details.customWeight || "";
//         data.customSizeInput = data.formData.details.customSizeInput || "";

//         // Flavors Section - Array format
//         if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
//           data.flavors = [...data.formData.details.flavors].filter(f => f && f.trim() !== '');
//         }
        
//         // Add custom flavor if provided
//         if (data.formData.details.customFlavorInput && data.formData.details.customFlavorInput.trim() !== '') {
//           data.flavors.push(data.formData.details.customFlavorInput.trim());
//         }

//         // Size Section - Array format
//         if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
//           data.size = [...data.formData.details.size].filter(s => s && s.trim() !== '');
//         }
        
//         // Add custom size if provided
//         if (data.formData.details.customSizeInput && data.formData.details.customSizeInput.trim() !== '') {
//           data.size.push(data.formData.details.customSizeInput.trim());
//         }
//       }

//       // Location
//       if (data.formData.location) {
//         data.State = data.formData.location.state || "";
//       }

//       // Step 4: Manufacturing & Marketing
//       // FSSAI & Compliance - DONO FIELDS ALAG
//       if (data.formData.compliance) {
//         // FSSAI License goes to brandName field
//         data.brandName = data.formData.compliance.fssaiLicense || "";
//         // Keep fssaiLicense separate for database
//         data.fssaiLicense = data.formData.compliance.fssaiLicense || "";
//         data.legalDisclaimer = data.formData.compliance.legalDisclaimer || "";
//       }

//       // Package (shelfLife)
//       if (data.formData.package) {
//         data.shelfLife = data.formData.package.shelfLife || "";
//       }

//       // Manufacturing Information
//       if (data.formData.manufacturing) {
//         data.manufacturer = data.formData.manufacturing.manufacturerName || "";
//         data.manufacturerContact = data.formData.manufacturing.manufacturerAddress || "";
        
//         // Packager Information - Combine name and address
//         let packerContact = "";
//         if (data.formData.manufacturing.packagerName) {
//           packerContact = data.formData.manufacturing.packagerName;
//           if (data.formData.manufacturing.packagerAddress) {
//             packerContact += ", " + data.formData.manufacturing.packagerAddress;
//           }
//         }
//         data.packerContact = packerContact;

//         // Marketer Information - Combine name and address
//         let marketerNameAddress = "";
//         if (data.formData.manufacturing.marketerName) {
//           marketerNameAddress = data.formData.manufacturing.marketerName;
//           if (data.formData.manufacturing.marketerAddress) {
//             marketerNameAddress += ", " + data.formData.manufacturing.marketerAddress;
//           }
//         }
//         data.marketerNameAddress = marketerNameAddress;
//       }

//       // Step 5: Package & Dietary
//       // Package Details
//       if (data.formData.package) {
//         data.packageColour = data.formData.package.packageColour || "";
//         data.measurementUnit = data.formData.package.measurementUnit || "";
//         data.unitCount = data.formData.package.unitCount || "";
//         data.numberOfItems = data.formData.package.numberOfItems || "";
//         data.itemWeight = data.formData.package.itemWeight || "";
//         data.totalEaches = data.formData.package.totalEaches || "";
//         data.itemPackageWeight = data.formData.package.itemPackageWeight || "";
//         data.shelfLife = data.formData.package.shelfLife || "";
//       }

//       // Dietary & Nutrition
//       if (data.formData.dietary) {
//         data.dietaryPreferences = data.formData.dietary.dietaryPreferences || "";
//         data.allergenInformation = data.formData.dietary.allergenInformation || "";
//         data.nutrition = data.formData.dietary.nutrition || "";
//         data.cuisine = data.formData.dietary.cuisine || "";
//         data.directions = data.formData.dietary.directions || "";
//       }

//       // Remove formData object
//       delete data.formData;
//     }

//     // Handle direct array inputs (for API calls without formData)
//     if (!data.formData) {
//       // Flavors array handling
//       if (data.flavors) {
//         if (typeof data.flavors === 'string') {
//           data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
//         } else if (!Array.isArray(data.flavors)) {
//           data.flavors = [];
//         }
//       } else {
//         data.flavors = [];
//       }

//       // Size array handling
//       if (data.size) {
//         if (typeof data.size === 'string') {
//           data.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
//         } else if (!Array.isArray(data.size)) {
//           data.size = [];
//         }
//       } else {
//         data.size = [];
//       }
//     }

//     // Backward compatibility for old fields
//     if (data.fssaiLicenseNumber) {
//       // Set both fields for backward compatibility
//       data.brandName = data.fssaiLicenseNumber;
//       data.fssaiLicense = data.fssaiLicenseNumber;
//       delete data.fssaiLicenseNumber;
//     }

//     if (data.allergenInfo && !data.allergenInformation) {
//       data.allergenInformation = data.allergenInfo;
//     }

//     // Ensure empty strings for fields not provided
//     const stringFields = [
//       'description', 'brandName', 'ageRange', 'containerType', 'itemForm', 
//       'specialty', 'countryOfOrigin', 'State', 'customWeight',
//       'customSizeInput', 'productTypes', 'itemTypeName', 'materialTypes', 'ingredients',
//       'legalDisclaimer', 'shelfLife', 'manufacturer', 'manufacturerContact',
//       'packerContact', 'marketerNameAddress', 'packageColour', 'measurementUnit',
//       'unitCount', 'numberOfItems', 'itemWeight', 'totalEaches', 'itemPackageWeight',
//       'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
//       'fssaiLicense'
//     ];

//     stringFields.forEach(field => {
//       if (!data[field] && data[field] !== 0) {
//         data[field] = "";
//       }
//     });

//     // Ensure arrays are properly formatted
//     if (!Array.isArray(data.flavors)) data.flavors = [];
//     if (!Array.isArray(data.size)) data.size = [];
//     data.flavors = data.flavors.filter(f => f && f.trim() !== '');
//     data.size = data.size.filter(s => s && s.trim() !== '');

//     /* ========== CLOUDINARY IMAGE UPLOAD ========== */
//     // Step 6: Images
//     data.gallery = [];

//     // Main image
//     if (req.files?.image?.length) {
//       const mainImg = await uploadToCloudinary(
//         req.files.image[0].buffer,
//         "products/main"
//       );
//       data.image = mainImg.secure_url;
//     }

//     // Mandatory Images
//     // Ingredients Image (gallery[0])
//     if (req.files?.mandatoryImages?.ingredientsImage?.length) {
//       const ingredientsImg = await uploadToCloudinary(
//         req.files.mandatoryImages.ingredientsImage[0].buffer,
//         "products/gallery"
//       );
//       data.gallery[0] = ingredientsImg.secure_url;
//     }

//     // Nutrition Image (gallery[1])
//     if (req.files?.mandatoryImages?.nutritionImage?.length) {
//       const nutritionImg = await uploadToCloudinary(
//         req.files.mandatoryImages.nutritionImage[0].buffer,
//         "products/gallery"
//       );
//       data.gallery[1] = nutritionImg.secure_url;
//     }

//     // MFG/EXP Image (gallery[2])
//     if (req.files?.mandatoryImages?.mfgExpImage?.length) {
//       const mfgExpImg = await uploadToCloudinary(
//         req.files.mandatoryImages.mfgExpImage[0].buffer,
//         "products/gallery"
//       );
//       data.gallery[2] = mfgExpImg.secure_url;
//     }

//     // Additional gallery images (gallery[3...])
//     if (req.files?.gallery?.length) {
//       for (let i = 0; i < req.files.gallery.length; i++) {
//         const galleryImg = await uploadToCloudinary(
//           req.files.gallery[i].buffer,
//           "products/gallery"
//         );
//         data.gallery.push(galleryImg.secure_url);
//       }
//     }

//     // Remove empty entries from gallery
//     data.gallery = data.gallery.filter(img => img && img.trim() !== '');

//     const product = await Product.create(data);

//     // Convert to response format
//     const responseData = product.toObject();
//     responseData.flavors = Array.isArray(responseData.flavors) ? responseData.flavors : [];
//     responseData.size = Array.isArray(responseData.size) ? responseData.size : [];
//     responseData.gallery = Array.isArray(responseData.gallery) ? responseData.gallery : [];

//     return res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       data: responseData,
//     });
//   } catch (error) {
//     console.error("CREATE PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
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

//     // Process data similar to addProduct
//     // Step 1: Category Selection
//     if (data.selectedCategory) {
//       data.category = data.selectedCategory;
//       delete data.selectedCategory;
//     }
//     if (data.selectedSubCategory) {
//       data.subcategory = data.selectedSubCategory;
//       delete data.selectedSubCategory;
//     }

//     // Convert number fields
//     if (data.oldPrice !== undefined) data.oldPrice = Number(data.oldPrice);
//     if (data.newPrice !== undefined) data.newPrice = Number(data.newPrice);
//     if (data.stock !== undefined) data.stock = Number(data.stock);

//     // Initialize arrays if not provided
//     if (!data.flavors && !data.formData) data.flavors = product.flavors || [];
//     if (!data.size && !data.formData) data.size = product.size || [];

//     // Process formData structure if provided
//     if (data.formData) {
//       // Basic Info
//       if (data.formData.basic) {
//         if (data.formData.basic.name) data.name = data.formData.basic.name;
//         if (data.formData.basic.description !== undefined) 
//           data.description = data.formData.basic.description;
//       }

//       // Pricing & Stock
//       if (data.formData.pricing) {
//         if (data.formData.pricing.oldPrice !== undefined) 
//           data.oldPrice = Number(data.formData.pricing.oldPrice);
//         if (data.formData.pricing.newPrice !== undefined) 
//           data.newPrice = Number(data.formData.pricing.newPrice);
//         if (data.formData.pricing.stock !== undefined) 
//           data.stock = Number(data.formData.pricing.stock);
//         if (data.formData.pricing.quality) 
//           data.quality = data.formData.pricing.quality;
//         if (data.formData.pricing.dietPreference) 
//           data.dietPreference = data.formData.pricing.dietPreference;
//       }

//       // Product Specifications
//       if (data.formData.details) {
//         const detailFields = [
//           'ageRange', 'containerType', 'itemForm', 'specialty', 
//           'countryOfOrigin', 'productTypes', 'itemTypeName', 
//           'materialTypes', 'ingredients', 'customWeight', 'customSizeInput'
//         ];
        
//         detailFields.forEach(field => {
//           if (data.formData.details[field] !== undefined) {
//             data[field] = data.formData.details[field];
//           }
//         });

//         // Flavors - Array format
//         if (data.formData.details.flavors !== undefined || 
//             data.formData.details.customFlavorInput !== undefined) {
          
//           let flavorsArray = [];
          
//           // Add predefined flavors if provided
//           if (Array.isArray(data.formData.details.flavors)) {
//             flavorsArray = [...data.formData.details.flavors];
//           }
          
//           // Add custom flavor if provided
//           if (data.formData.details.customFlavorInput && data.formData.details.customFlavorInput.trim() !== '') {
//             flavorsArray.push(data.formData.details.customFlavorInput.trim());
//           }
          
//           data.flavors = flavorsArray.filter(f => f && f.trim() !== '');
//         }

//         // Size - Array format
//         if (data.formData.details.size !== undefined || 
//             data.formData.details.customSizeInput !== undefined) {
          
//           let sizeArray = [];
          
//           // Add predefined sizes if provided
//           if (Array.isArray(data.formData.details.size)) {
//             sizeArray = [...data.formData.details.size];
//           }
          
//           // Add custom size if provided
//           if (data.formData.details.customSizeInput && data.formData.details.customSizeInput.trim() !== '') {
//             sizeArray.push(data.formData.details.customSizeInput.trim());
//           }
          
//           data.size = sizeArray.filter(s => s && s.trim() !== '');
//         }
//       }

//       // Location
//       if (data.formData.location && data.formData.location.state !== undefined) {
//         data.State = data.formData.location.state;
//       }

//       // Manufacturing & Marketing
//       if (data.formData.compliance) {
//         // DONO FIELDS ALAG - brandName aur fssaiLicense dono mein save karo
//         if (data.formData.compliance.fssaiLicense !== undefined) {
//           data.brandName = data.formData.compliance.fssaiLicense;
//           data.fssaiLicense = data.formData.compliance.fssaiLicense;
//         }
//         if (data.formData.compliance.legalDisclaimer !== undefined) 
//           data.legalDisclaimer = data.formData.compliance.legalDisclaimer;
//       }

//       // Package
//       if (data.formData.package) {
//         const packageFields = [
//           'shelfLife', 'packageColour', 'measurementUnit', 'unitCount',
//           'numberOfItems', 'itemWeight', 'totalEaches', 'itemPackageWeight'
//         ];
        
//         packageFields.forEach(field => {
//           if (data.formData.package[field] !== undefined) {
//             data[field] = data.formData.package[field];
//           }
//         });
//       }

//       // Manufacturing
//       if (data.formData.manufacturing) {
//         if (data.formData.manufacturing.manufacturerName !== undefined) 
//           data.manufacturer = data.formData.manufacturing.manufacturerName;
//         if (data.formData.manufacturing.manufacturerAddress !== undefined) 
//           data.manufacturerContact = data.formData.manufacturing.manufacturerAddress;

//         // Packager
//         if (data.formData.manufacturing.packagerName !== undefined || 
//             data.formData.manufacturing.packagerAddress !== undefined) {
//           let packerContact = data.formData.manufacturing.packagerName || "";
//           if (data.formData.manufacturing.packagerAddress) {
//             packerContact += packerContact ? ", " + data.formData.manufacturing.packagerAddress : 
//               data.formData.manufacturing.packagerAddress;
//           }
//           data.packerContact = packerContact;
//         }

//         // Marketer
//         if (data.formData.manufacturing.marketerName !== undefined || 
//             data.formData.manufacturing.marketerAddress !== undefined) {
//           let marketerNameAddress = data.formData.manufacturing.marketerName || "";
//           if (data.formData.manufacturing.marketerAddress) {
//             marketerNameAddress += marketerNameAddress ? ", " + data.formData.manufacturing.marketerAddress : 
//               data.formData.manufacturing.marketerAddress;
//           }
//           data.marketerNameAddress = marketerNameAddress;
//         }
//       }

//       // Dietary
//       if (data.formData.dietary) {
//         const dietaryFields = [
//           'dietaryPreferences', 'allergenInformation', 'nutrition',
//           'cuisine', 'directions'
//         ];
        
//         dietaryFields.forEach(field => {
//           if (data.formData.dietary[field] !== undefined) {
//             data[field] = data.formData.dietary[field];
//           }
//         });
//       }

//       delete data.formData;
//     }

//     // Handle direct array inputs
//     if (data.flavors !== undefined && !Array.isArray(data.flavors)) {
//       if (typeof data.flavors === 'string') {
//         data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
//       } else {
//         data.flavors = [];
//       }
//     }

//     if (data.size !== undefined && !Array.isArray(data.size)) {
//       if (typeof data.size === 'string') {
//         data.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
//       } else {
//         data.size = [];
//       }
//     }

//     // Backward compatibility
//     if (data.fssaiLicenseNumber) {
//       // Set both fields
//       data.brandName = data.fssaiLicenseNumber;
//       data.fssaiLicense = data.fssaiLicenseNumber;
//       delete data.fssaiLicenseNumber;
//     }

//     if (data.allergenInfo && !data.allergenInformation) {
//       data.allergenInformation = data.allergenInfo;
//     }

//     /* ========== CLOUDINARY IMAGE UPDATE ========== */
//     // Update images only if new ones are provided
//     let updateGallery = [...(product.gallery || [])];

//     // Main image
//     if (req.files?.image?.length) {
//       const mainImg = await uploadToCloudinary(
//         req.files.image[0].buffer,
//         "products/main"
//       );
//       data.image = mainImg.secure_url;
//     }

//     // Mandatory Images
//     if (req.files?.mandatoryImages) {
//       // Ingredients Image
//       if (req.files.mandatoryImages.ingredientsImage?.length) {
//         const img = await uploadToCloudinary(
//           req.files.mandatoryImages.ingredientsImage[0].buffer,
//           "products/gallery"
//         );
//         updateGallery[0] = img.secure_url;
//       }

//       // Nutrition Image
//       if (req.files.mandatoryImages.nutritionImage?.length) {
//         const img = await uploadToCloudinary(
//           req.files.mandatoryImages.nutritionImage[0].buffer,
//           "products/gallery"
//         );
//         updateGallery[1] = img.secure_url;
//       }

//       // MFG/EXP Image
//       if (req.files.mandatoryImages.mfgExpImage?.length) {
//         const img = await uploadToCloudinary(
//           req.files.mandatoryImages.mfgExpImage[0].buffer,
//           "products/gallery"
//         );
//         updateGallery[2] = img.secure_url;
//       }
//     }

//     // Additional gallery images
//     if (req.files?.gallery?.length) {
//       for (const file of req.files.gallery) {
//         const img = await uploadToCloudinary(
//           file.buffer,
//           "products/gallery"
//         );
//         updateGallery.push(img.secure_url);
//       }
//     }

//     // Update gallery if images were modified
//     if (req.files?.mandatoryImages || req.files?.gallery) {
//       data.gallery = updateGallery.filter(img => img && img.trim() !== '');
//     }

//     // Ensure arrays are properly formatted before assigning
//     if (data.flavors !== undefined) {
//       if (!Array.isArray(data.flavors)) data.flavors = [];
//       data.flavors = data.flavors.filter(f => f && f.trim() !== '');
//     }

//     if (data.size !== undefined) {
//       if (!Array.isArray(data.size)) data.size = [];
//       data.size = data.size.filter(s => s && s.trim() !== '');
//     }

//     Object.assign(product, data);
//     await product.save();

//     // Convert to response format
//     const responseData = product.toObject();
//     responseData.flavors = Array.isArray(responseData.flavors) ? responseData.flavors : [];
//     responseData.size = Array.isArray(responseData.size) ? responseData.size : [];
//     responseData.gallery = Array.isArray(responseData.gallery) ? responseData.gallery : [];

//     return res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       data: responseData,
//     });
//   } catch (error) {
//     console.error("UPDATE PRODUCT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
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
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete product",
//     });
//   }
// };

// /* =====================================================
//    BULK DELETE
// ===================================================== */
// const bulkDelete = async (req, res) => {
//   const { ids } = req.body;

//   if (!Array.isArray(ids) || ids.length === 0) {
//     return res.status(400).json({
//       success: false,
//       message: "Product IDs are required",
//     });
//   }

//   const result = await Product.deleteMany({ _id: { $in: ids } });

//   return res.status(200).json({
//     success: true,
//     message: `${result.deletedCount} products deleted`,
//   });
// };

// /* =====================================================
//    BULK UPDATE
// ===================================================== */
// const bulkUpdate = async (req, res) => {
//   const { ids, data } = req.body;

//   if (!ids?.length || !data) {
//     return res.status(400).json({
//       success: false,
//       message: "IDs and update data required",
//     });
//   }

//   // Handle arrays in bulk update
//   const updateData = { ...data };
  
//   // Convert flavors if string
//   if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
//     updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
//   }
  
//   // Convert size if string
//   if (updateData.size !== undefined && typeof updateData.size === 'string') {
//     updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
//   }

//   const result = await Product.updateMany(
//     { _id: { $in: ids } },
//     { $set: updateData }
//   );

//   return res.status(200).json({
//     success: true,
//     message: `${result.modifiedCount} products updated`,
//   });
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

    // Convert arrays properly for response
    const formattedProducts = products.map(product => ({
      ...product,
      flavors: Array.isArray(product.flavors) ? product.flavors : [],
      size: Array.isArray(product.size) ? product.size : [],
      gallery: Array.isArray(product.gallery) ? product.gallery : []
    }));

    return res.status(200).json({
      success: true,
      count: formattedProducts.length,
      data: formattedProducts,
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

    // Convert to plain object and ensure arrays
    const productData = product.toObject();
    productData.flavors = Array.isArray(productData.flavors) ? productData.flavors : [];
    productData.size = Array.isArray(productData.size) ? productData.size : [];
    productData.gallery = Array.isArray(productData.gallery) ? productData.gallery : [];

    return res.status(200).json({
      success: true,
      data: productData,
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

    // Required validation - Step 2: Basic Information
    // if (!data.name || !data.newPrice || !data.category) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Name, price and category are required",
    //   });
    // }
    if (!data.name || !data.price || !data.category) {
  return res.status(400).json({
    success: false,
    message: "Name, price and category are required",
  });
}


    // Step 1: Category Selection
    if (data.selectedCategory) {
      data.category = data.selectedCategory;
    }
    if (data.selectedSubCategory) {
      data.subcategory = data.selectedSubCategory;
    }

    // Remove frontend specific keys
    delete data.selectedCategory;
    delete data.selectedSubCategory;

    // Step 2: Basic Information
    data.restaurantName = "Havbit"; // Fixed value as per mapping

    // Step 3: Product Details - Pricing & Stock Section
    data.oldPrice = Number(data.oldPrice || 0);
    // data.newPrice = Number(data.newPrice);
    data.newPrice = Number(data.price);
delete data.price;

    data.stock = Number(data.stock || 0);
    
    // Defaults for quality and dietPreference
    if (!data.quality) data.quality = "Standard";
    if (!data.dietPreference) data.dietPreference = "Veg";

    // Initialize arrays
    data.flavors = [];
    data.size = [];

    // Process formData structure if provided
    if (data.formData) {
      // Basic Info
      if (data.formData.basic) {
        data.name = data.formData.basic.name || data.name;
        data.description = data.formData.basic.description || data.description;
      }

      // Pricing & Stock
      if (data.formData.pricing) {
        data.oldPrice = data.formData.pricing.oldPrice ? 
          Number(data.formData.pricing.oldPrice) : data.oldPrice;
        data.newPrice = data.formData.pricing.newPrice ? 
          Number(data.formData.pricing.newPrice) : data.newPrice;
        data.stock = data.formData.pricing.stock ? 
          Number(data.formData.pricing.stock) : data.stock;
        data.quality = data.formData.pricing.quality || data.quality;
        data.dietPreference = data.formData.pricing.dietPreference || data.dietPreference;
      }

      // Product Specifications
      if (data.formData.details) {
        data.ageRange = data.formData.details.ageRange || "";
        data.containerType = data.formData.details.containerType || "";
        data.itemForm = data.formData.details.itemForm || "";
        data.specialty = data.formData.details.specialty || "";
        data.countryOfOrigin = data.formData.details.countryOfOrigin || "";
        data.productTypes = data.formData.details.productTypes || "";
        data.itemTypeName = data.formData.details.itemTypeName || "";
        data.materialTypes = data.formData.details.materialTypes || "";
        data.ingredients = data.formData.details.ingredients || "";
        data.customWeight = data.formData.details.customWeight || "";
        data.customSizeInput = data.formData.details.customSizeInput || "";

        // Flavors Section - Array format
        if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
          data.flavors = [...data.formData.details.flavors].filter(f => f && f.trim() !== '');
        }
        
        // Add custom flavor if provided
        if (data.formData.details.customFlavorInput && data.formData.details.customFlavorInput.trim() !== '') {
          data.flavors.push(data.formData.details.customFlavorInput.trim());
        }

        // Size Section - Array format
        if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
          data.size = [...data.formData.details.size].filter(s => s && s.trim() !== '');
        }
        
        // Add custom size if provided
        if (data.formData.details.customSizeInput && data.formData.details.customSizeInput.trim() !== '') {
          data.size.push(data.formData.details.customSizeInput.trim());
        }
      }

      // Location
      if (data.formData.location) {
        data.State = data.formData.location.state || "";
      }

      // Step 4: Manufacturing & Marketing
      // FSSAI & Compliance - DONO FIELDS ALAG
      if (data.formData.compliance) {
        // FSSAI License goes to brandName field
        data.brandName = data.formData.compliance.fssaiLicense || "";
        // Keep fssaiLicense separate for database
        data.fssaiLicense = data.formData.compliance.fssaiLicense || "";
        data.legalDisclaimer = data.formData.compliance.legalDisclaimer || "";
      }

      // Package (shelfLife)
      if (data.formData.package) {
        data.shelfLife = data.formData.package.shelfLife || "";
      }

      // Manufacturing Information
      if (data.formData.manufacturing) {
        data.manufacturer = data.formData.manufacturing.manufacturerName || "";
        data.manufacturerContact = data.formData.manufacturing.manufacturerAddress || "";
        
        // Packager Information - Combine name and address
        let packerContact = "";
        if (data.formData.manufacturing.packagerName) {
          packerContact = data.formData.manufacturing.packagerName;
          if (data.formData.manufacturing.packagerAddress) {
            packerContact += ", " + data.formData.manufacturing.packagerAddress;
          }
        }
        data.packerContact = packerContact;

        // Marketer Information - Combine name and address
        let marketerNameAddress = "";
        if (data.formData.manufacturing.marketerName) {
          marketerNameAddress = data.formData.manufacturing.marketerName;
          if (data.formData.manufacturing.marketerAddress) {
            marketerNameAddress += ", " + data.formData.manufacturing.marketerAddress;
          }
        }
        data.marketerNameAddress = marketerNameAddress;
      }

      // Step 5: Package & Dietary
      // Package Details
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

      // Dietary & Nutrition
      if (data.formData.dietary) {
        data.dietaryPreferences = data.formData.dietary.dietaryPreferences || "";
        data.allergenInformation = data.formData.dietary.allergenInformation || "";
        data.nutrition = data.formData.dietary.nutrition || "";
        data.cuisine = data.formData.dietary.cuisine || "";
        data.directions = data.formData.dietary.directions || "";
      }

      // Remove formData object
      delete data.formData;
    }

    // Handle direct array inputs (for API calls without formData)
    if (!data.formData) {
      // Flavors array handling
      if (data.flavors) {
        if (typeof data.flavors === 'string') {
          data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
        } else if (!Array.isArray(data.flavors)) {
          data.flavors = [];
        }
      } else {
        data.flavors = [];
      }

      // Size array handling
      if (data.size) {
        if (typeof data.size === 'string') {
          data.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
        } else if (!Array.isArray(data.size)) {
          data.size = [];
        }
      } else {
        data.size = [];
      }
    }

    // Backward compatibility for old fields
    if (data.fssaiLicenseNumber) {
      // Set both fields for backward compatibility
      data.brandName = data.fssaiLicenseNumber;
      data.fssaiLicense = data.fssaiLicenseNumber;
      delete data.fssaiLicenseNumber;
    }

    if (data.allergenInfo && !data.allergenInformation) {
      data.allergenInformation = data.allergenInfo;
    }

    // Ensure empty strings for fields not provided
    const stringFields = [
      'description', 'brandName', 'ageRange', 'containerType', 'itemForm', 
      'specialty', 'countryOfOrigin', 'State', 'customWeight',
      'customSizeInput', 'productTypes', 'itemTypeName', 'materialTypes', 'ingredients',
      'legalDisclaimer', 'shelfLife', 'manufacturer', 'manufacturerContact',
      'packerContact', 'marketerNameAddress', 'packageColour', 'measurementUnit',
      'unitCount', 'numberOfItems', 'itemWeight', 'totalEaches', 'itemPackageWeight',
      'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
      'fssaiLicense'
    ];

    stringFields.forEach(field => {
      if (!data[field] && data[field] !== 0) {
        data[field] = "";
      }
    });

    // Ensure arrays are properly formatted
    if (!Array.isArray(data.flavors)) data.flavors = [];
    if (!Array.isArray(data.size)) data.size = [];
    data.flavors = data.flavors.filter(f => f && f.trim() !== '');
    data.size = data.size.filter(s => s && s.trim() !== '');

    /* ========== CLOUDINARY IMAGE UPLOAD ========== */
    // Step 6: Images
    data.gallery = [];

    // Main image
    if (req.files?.image?.length) {
      const mainImg = await uploadToCloudinary(
        req.files.image[0].buffer,
        "products/main"
      );
      data.image = mainImg.secure_url;
    }

    // Mandatory Images
    // Ingredients Image (gallery[0])
    if (req.files?.mandatoryImages?.ingredientsImage?.length) {
      const ingredientsImg = await uploadToCloudinary(
        req.files.mandatoryImages.ingredientsImage[0].buffer,
        "products/gallery"
      );
      data.gallery[0] = ingredientsImg.secure_url;
    }

    // Nutrition Image (gallery[1])
    if (req.files?.mandatoryImages?.nutritionImage?.length) {
      const nutritionImg = await uploadToCloudinary(
        req.files.mandatoryImages.nutritionImage[0].buffer,
        "products/gallery"
      );
      data.gallery[1] = nutritionImg.secure_url;
    }

    // MFG/EXP Image (gallery[2])
    if (req.files?.mandatoryImages?.mfgExpImage?.length) {
      const mfgExpImg = await uploadToCloudinary(
        req.files.mandatoryImages.mfgExpImage[0].buffer,
        "products/gallery"
      );
      data.gallery[2] = mfgExpImg.secure_url;
    }

    // Additional gallery images (gallery[3...])
    if (req.files?.gallery?.length) {
      for (let i = 0; i < req.files.gallery.length; i++) {
        const galleryImg = await uploadToCloudinary(
          req.files.gallery[i].buffer,
          "products/gallery"
        );
        data.gallery.push(galleryImg.secure_url);
      }
    }

    // Remove empty entries from gallery
    data.gallery = data.gallery.filter(img => img && img.trim() !== '');

    const product = await Product.create(data);

    // Convert to response format
    const responseData = product.toObject();
    responseData.flavors = Array.isArray(responseData.flavors) ? responseData.flavors : [];
    responseData.size = Array.isArray(responseData.size) ? responseData.size : [];
    responseData.gallery = Array.isArray(responseData.gallery) ? responseData.gallery : [];

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: responseData,
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

    // Process data similar to addProduct
    // Step 1: Category Selection
    if (data.selectedCategory) {
      data.category = data.selectedCategory;
      delete data.selectedCategory;
    }
    if (data.selectedSubCategory) {
      data.subcategory = data.selectedSubCategory;
      delete data.selectedSubCategory;
    }

    // Convert number fields
    if (data.oldPrice !== undefined) data.oldPrice = Number(data.oldPrice);
    if (data.newPrice !== undefined) data.newPrice = Number(data.newPrice);
    if (data.stock !== undefined) data.stock = Number(data.stock);

    // Initialize arrays if not provided
    if (!data.flavors && !data.formData) data.flavors = product.flavors || [];
    if (!data.size && !data.formData) data.size = product.size || [];

    // Process formData structure if provided
    if (data.formData) {
      // Basic Info
      if (data.formData.basic) {
        if (data.formData.basic.name) data.name = data.formData.basic.name;
        if (data.formData.basic.description !== undefined) 
          data.description = data.formData.basic.description;
      }

      // Pricing & Stock
      if (data.formData.pricing) {
        if (data.formData.pricing.oldPrice !== undefined) 
          data.oldPrice = Number(data.formData.pricing.oldPrice);
        if (data.formData.pricing.newPrice !== undefined) 
          data.newPrice = Number(data.formData.pricing.newPrice);
        if (data.formData.pricing.stock !== undefined) 
          data.stock = Number(data.formData.pricing.stock);
        if (data.formData.pricing.quality) 
          data.quality = data.formData.pricing.quality;
        if (data.formData.pricing.dietPreference) 
          data.dietPreference = data.formData.pricing.dietPreference;
      }

      // Product Specifications
      if (data.formData.details) {
        const detailFields = [
          'ageRange', 'containerType', 'itemForm', 'specialty', 
          'countryOfOrigin', 'productTypes', 'itemTypeName', 
          'materialTypes', 'ingredients', 'customWeight', 'customSizeInput'
        ];
        
        detailFields.forEach(field => {
          if (data.formData.details[field] !== undefined) {
            data[field] = data.formData.details[field];
          }
        });

        // Flavors - Array format
        if (data.formData.details.flavors !== undefined || 
            data.formData.details.customFlavorInput !== undefined) {
          
          let flavorsArray = [];
          
          // Add predefined flavors if provided
          if (Array.isArray(data.formData.details.flavors)) {
            flavorsArray = [...data.formData.details.flavors];
          }
          
          // Add custom flavor if provided
          if (data.formData.details.customFlavorInput && data.formData.details.customFlavorInput.trim() !== '') {
            flavorsArray.push(data.formData.details.customFlavorInput.trim());
          }
          
          data.flavors = flavorsArray.filter(f => f && f.trim() !== '');
        }

        // Size - Array format
        if (data.formData.details.size !== undefined || 
            data.formData.details.customSizeInput !== undefined) {
          
          let sizeArray = [];
          
          // Add predefined sizes if provided
          if (Array.isArray(data.formData.details.size)) {
            sizeArray = [...data.formData.details.size];
          }
          
          // Add custom size if provided
          if (data.formData.details.customSizeInput && data.formData.details.customSizeInput.trim() !== '') {
            sizeArray.push(data.formData.details.customSizeInput.trim());
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
        // DONO FIELDS ALAG - brandName aur fssaiLicense dono mein save karo
        if (data.formData.compliance.fssaiLicense !== undefined) {
          data.brandName = data.formData.compliance.fssaiLicense;
          data.fssaiLicense = data.formData.compliance.fssaiLicense;
        }
        if (data.formData.compliance.legalDisclaimer !== undefined) 
          data.legalDisclaimer = data.formData.compliance.legalDisclaimer;
      }

      // Package
      if (data.formData.package) {
        const packageFields = [
          'shelfLife', 'packageColour', 'measurementUnit', 'unitCount',
          'numberOfItems', 'itemWeight', 'totalEaches', 'itemPackageWeight'
        ];
        
        packageFields.forEach(field => {
          if (data.formData.package[field] !== undefined) {
            data[field] = data.formData.package[field];
          }
        });
      }

      // Manufacturing
      if (data.formData.manufacturing) {
        if (data.formData.manufacturing.manufacturerName !== undefined) 
          data.manufacturer = data.formData.manufacturing.manufacturerName;
        if (data.formData.manufacturing.manufacturerAddress !== undefined) 
          data.manufacturerContact = data.formData.manufacturing.manufacturerAddress;

        // Packager
        if (data.formData.manufacturing.packagerName !== undefined || 
            data.formData.manufacturing.packagerAddress !== undefined) {
          let packerContact = data.formData.manufacturing.packagerName || "";
          if (data.formData.manufacturing.packagerAddress) {
            packerContact += packerContact ? ", " + data.formData.manufacturing.packagerAddress : 
              data.formData.manufacturing.packagerAddress;
          }
          data.packerContact = packerContact;
        }

        // Marketer
        if (data.formData.manufacturing.marketerName !== undefined || 
            data.formData.manufacturing.marketerAddress !== undefined) {
          let marketerNameAddress = data.formData.manufacturing.marketerName || "";
          if (data.formData.manufacturing.marketerAddress) {
            marketerNameAddress += marketerNameAddress ? ", " + data.formData.manufacturing.marketerAddress : 
              data.formData.manufacturing.marketerAddress;
          }
          data.marketerNameAddress = marketerNameAddress;
        }
      }

      // Dietary
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
    }

    // Handle direct array inputs
    if (data.flavors !== undefined && !Array.isArray(data.flavors)) {
      if (typeof data.flavors === 'string') {
        data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
      } else {
        data.flavors = [];
      }
    }

    if (data.size !== undefined && !Array.isArray(data.size)) {
      if (typeof data.size === 'string') {
        data.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
      } else {
        data.size = [];
      }
    }

    // Backward compatibility
    if (data.fssaiLicenseNumber) {
      // Set both fields
      data.brandName = data.fssaiLicenseNumber;
      data.fssaiLicense = data.fssaiLicenseNumber;
      delete data.fssaiLicenseNumber;
    }

    if (data.allergenInfo && !data.allergenInformation) {
      data.allergenInformation = data.allergenInfo;
    }

    /* ========== CLOUDINARY IMAGE UPDATE ========== */
    // Update images only if new ones are provided
    let updateGallery = [...(product.gallery || [])];

    // Main image
    if (req.files?.image?.length) {
      const mainImg = await uploadToCloudinary(
        req.files.image[0].buffer,
        "products/main"
      );
      data.image = mainImg.secure_url;
    }

    // Mandatory Images
    if (req.files?.mandatoryImages) {
      // Ingredients Image
      if (req.files.mandatoryImages.ingredientsImage?.length) {
        const img = await uploadToCloudinary(
          req.files.mandatoryImages.ingredientsImage[0].buffer,
          "products/gallery"
        );
        updateGallery[0] = img.secure_url;
      }

      // Nutrition Image
      if (req.files.mandatoryImages.nutritionImage?.length) {
        const img = await uploadToCloudinary(
          req.files.mandatoryImages.nutritionImage[0].buffer,
          "products/gallery"
        );
        updateGallery[1] = img.secure_url;
      }

      // MFG/EXP Image
      if (req.files.mandatoryImages.mfgExpImage?.length) {
        const img = await uploadToCloudinary(
          req.files.mandatoryImages.mfgExpImage[0].buffer,
          "products/gallery"
        );
        updateGallery[2] = img.secure_url;
      }
    }

    // Additional gallery images
    if (req.files?.gallery?.length) {
      for (const file of req.files.gallery) {
        const img = await uploadToCloudinary(
          file.buffer,
          "products/gallery"
        );
        updateGallery.push(img.secure_url);
      }
    }

    // Update gallery if images were modified
    if (req.files?.mandatoryImages || req.files?.gallery) {
      data.gallery = updateGallery.filter(img => img && img.trim() !== '');
    }

    // Ensure arrays are properly formatted before assigning
    if (data.flavors !== undefined) {
      if (!Array.isArray(data.flavors)) data.flavors = [];
      data.flavors = data.flavors.filter(f => f && f.trim() !== '');
    }

    if (data.size !== undefined) {
      if (!Array.isArray(data.size)) data.size = [];
      data.size = data.size.filter(s => s && s.trim() !== '');
    }

    Object.assign(product, data);
    await product.save();

    // Convert to response format
    const responseData = product.toObject();
    responseData.flavors = Array.isArray(responseData.flavors) ? responseData.flavors : [];
    responseData.size = Array.isArray(responseData.size) ? responseData.size : [];
    responseData.gallery = Array.isArray(responseData.gallery) ? responseData.gallery : [];

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: responseData,
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

  // Handle arrays in bulk update
  const updateData = { ...data };
  
  // Convert flavors if string
  if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
    updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
  }
  
  // Convert size if string
  if (updateData.size !== undefined && typeof updateData.size === 'string') {
    updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
  }

  const result = await Product.updateMany(
    { _id: { $in: ids } },
    { $set: updateData }
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
