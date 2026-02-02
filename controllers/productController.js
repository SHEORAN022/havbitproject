





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
//     // if (!data.name || !data.newPrice || !data.category) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "Name, price and category are required",
//     //   });
//     // }
//     if (!data.name || !data.price || !data.category) {
//   return res.status(400).json({
//     success: false,
//     message: "Name, price and category are required",
//   });
// }


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
//     // data.newPrice = Number(data.newPrice);
//     data.newPrice = Number(data.price);
// delete data.price;

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
          
//






// const Product = require('../models/Product');
// const fs = require('fs');
// const path = require('path');

// // ==================== HELPER FUNCTIONS ====================

// /**
//  * Save image to filesystem
//  * @param {Object} file - Multer file object
//  * @param {String} folder - Subfolder name
//  * @returns {String|null} - Image path or null
//  */
// const saveImage = (file, folder = 'products') => {
//   if (!file) return null;
  
//   try {
//     const uploadDir = path.join(__dirname, '../uploads', folder);
    
//     // Create directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
    
//     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
//     const filePath = path.join(uploadDir, uniqueName);
    
//     fs.writeFileSync(filePath, file.buffer);
//     return `/uploads/${folder}/${uniqueName}`;
//   } catch (error) {
//     console.error('Error saving image:', error);
//     return null;
//   }
// };

// /**
//  * Delete image from filesystem
//  * @param {String} imagePath - Image path to delete
//  */
// const deleteImage = (imagePath) => {
//   if (!imagePath) return;
  
//   try {
//     const fullPath = path.join(__dirname, '..', imagePath);
//     if (fs.existsSync(fullPath)) {
//       fs.unlinkSync(fullPath);
//     }
//   } catch (error) {
//     console.error('Error deleting image:', error);
//   }
// };

// /**
//  * Clean and parse variations data from frontend
//  * Handles numeric IDs and converts them to proper format
//  */
// const cleanVariationsData = (variationsStr) => {
//   if (!variationsStr) return [];
  
//   try {
//     let variations = typeof variationsStr === 'string' 
//       ? JSON.parse(variationsStr) 
//       : variationsStr;
    
//     if (!Array.isArray(variations)) return [];
    
//     // Clean each variation
//     return variations.map(variation => {
//       const cleaned = { ...variation };
      
//       // Remove _id field if it exists (from previous saves)
//       delete cleaned._id;
      
//       // Handle numeric IDs from frontend
//       if (cleaned.id && typeof cleaned.id === 'number') {
//         // Convert numeric ID to string variationId
//         cleaned.variationId = `var_${cleaned.id}`;
//         delete cleaned.id; // Remove numeric id
//       } else if (cleaned.id && typeof cleaned.id === 'string') {
//         // Keep string id as variationId
//         cleaned.variationId = cleaned.id;
//         delete cleaned.id;
//       }
      
//       // Ensure variationId exists
//       if (!cleaned.variationId) {
//         cleaned.variationId = `var_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       }
      
//       // Convert numeric fields
//       cleaned.oldPrice = parseFloat(cleaned.oldPrice) || 0;
//       cleaned.newPrice = parseFloat(cleaned.newPrice) || 0;
//       cleaned.stock = parseInt(cleaned.stock) || 0;
      
//       // Ensure required fields
//       if (cleaned.newPrice === undefined || cleaned.newPrice === null) {
//         cleaned.newPrice = 0;
//       }
      
//       if (cleaned.stock === undefined || cleaned.stock === null) {
//         cleaned.stock = 0;
//       }
      
//       return cleaned;
//     });
//   } catch (error) {
//     console.error('Error cleaning variations:', error);
//     return [];
//   }
// };

// // ==================== CONTROLLERS ====================

// /**
//  * Get all products
//  * @route GET /api/products
//  * @access Public
//  */
// exports.getAllProducts = async (req, res) => {
//   try {
//     console.log('📦 Fetching all products...');
    
//     const {
//       page = 1,
//       limit = 100,
//       search = '',
//       category = '',
//       quality = '',
//       dietPreference = '',
//       inStock = '',
//       sort = '-createdAt'
//     } = req.query;

//     // Build query
//     const query = {};
    
//     // Search filter
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { brandName: { $regex: search, $options: 'i' } },
//         { State: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     // Category filter
//     if (category) {
//       query.category = category;
//     }
    
//     // Quality filter
//     if (quality) {
//       query.quality = quality;
//     }
    
//     // Diet preference filter
//     if (dietPreference) {
//       query.dietPreference = dietPreference;
//     }
    
//     // Stock filter
//     if (inStock === 'true') {
//       query.$or = [
//         { stock: { $gt: 0 } },
//         { 'variations.stock': { $gt: 0 } }
//       ];
//     } else if (inStock === 'false') {
//       query.$or = [
//         { stock: 0, 'variations.stock': { $lte: 0 } },
//         { stock: 0, variations: { $size: 0 } }
//       ];
//     }

//     const products = await Product.find(query)
//       .populate('category', 'name')
//       .populate('subcategory', 'name')
//       .sort(sort)
//       .limit(parseInt(limit))
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .lean();

//     const total = await Product.countDocuments(query);

//     console.log(`✅ Found ${products.length} products`);

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       total,
//       page: parseInt(page),
//       pages: Math.ceil(total / parseInt(limit)),
//       data: products
//     });
//   } catch (error) {
//     console.error('❌ Error fetching products:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch products',
//       error: error.message
//     });
//   }
// };

// /**
//  * Get single product
//  * @route GET /api/products/:id
//  * @access Public
//  */
// exports.getProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate('category', 'name')
//       .populate('subcategory', 'name');

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product
//     });
//   } catch (error) {
//     console.error('❌ Error fetching product:', error);
    
//     // Handle invalid ObjectId
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid product ID'
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch product',
//       error: error.message
//     });
//   }
// };

// /**
//  * Create product
//  * @route POST /api/products
//  * @access Private
//  */
// exports.createProduct = async (req, res) => {
//   try {
//     console.log('📦 Creating new product...');
//     console.log('Body:', req.body);
//     console.log('Files:', req.files ? Object.keys(req.files) : 'No files');

//     const data = { ...req.body };

//     // ========== HANDLE MAIN IMAGE ==========
//     if (req.files && req.files.image && req.files.image[0]) {
//       const mainImage = saveImage(req.files.image[0], 'products/main');
//       if (mainImage) {
//         data.image = mainImage;
//       }
//     }

//     // ========== HANDLE GALLERY IMAGES ==========
//     const galleryUrls = [];
//     if (req.files && req.files.gallery) {
//       const galleryFiles = Array.isArray(req.files.gallery) 
//         ? req.files.gallery 
//         : [req.files.gallery];
      
//       for (const file of galleryFiles) {
//         const url = saveImage(file, 'products/gallery');
//         if (url) galleryUrls.push(url);
//       }
      
//       // Limit to 9 images
//       data.gallery = galleryUrls.slice(0, 9);
//     }

//     // ========== HANDLE VARIATIONS ==========
//     if (data.variations) {
//       // Clean variation data
//       data.variations = cleanVariationsData(data.variations);
      
//       // Process variation images if any
//       if (req.files && req.files.variationImages) {
//         const variationImages = Array.isArray(req.files.variationImages) 
//           ? req.files.variationImages 
//           : [req.files.variationImages];
        
//         // Match variation images with variations
//         variationImages.forEach((file, index) => {
//           if (index < data.variations.length) {
//             const url = saveImage(file, 'products/variations');
//             if (url) {
//               data.variations[index].image = url;
//             }
//           }
//         });
//       }
//     }

//     // ========== CONVERT STRING NUMBERS ==========
//     if (data.oldPrice) data.oldPrice = parseFloat(data.oldPrice) || 0;
//     if (data.price) data.price = parseFloat(data.price) || 0;
//     if (data.stock) data.stock = parseInt(data.stock) || 0;

//     // Convert boolean strings
//     if (data.hasVariations === 'true') data.hasVariations = true;
//     if (data.hasVariations === 'false') data.hasVariations = false;

//     // If product has variations, set base price to 0
//     if (data.hasVariations && data.variations && data.variations.length > 0) {
//       data.price = 0;
//       data.oldPrice = 0;
//       data.stock = 0;
//     }

//     // ========== VALIDATE REQUIRED FIELDS ==========
//     if (!data.name) {
//       return res.status(400).json({
//         success: false,
//         message: 'Product name is required'
//       });
//     }

//     if (!data.category) {
//       return res.status(400).json({
//         success: false,
//         message: 'Category is required'
//       });
//     }

//     // Create product
//     const product = await Product.create(data);

//     console.log('✅ Product created:', product._id);

//     res.status(201).json({
//       success: true,
//       message: 'Product created successfully',
//       data: product
//     });
//   } catch (error) {
//     console.error('❌ Error creating product:', error);
    
//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: messages
//       });
//     }
    
//     // Handle duplicate key error
//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: 'Product with this name already exists'
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create product',
//       error: error.message
//     });
//   }
// };

// /**
//  * Update product
//  * @route PUT /api/products/:id
//  * @access Private
//  */
// exports.updateProduct = async (req, res) => {
//   try {
//     console.log('🔄 Updating product:', req.params.id);

//     let product = await Product.findById(req.params.id);
    
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     const updateData = { ...req.body };

//     // ========== HANDLE MAIN IMAGE ==========
//     if (req.files && req.files.image && req.files.image[0]) {
//       // Delete old image
//       if (product.image) {
//         deleteImage(product.image);
//       }
      
//       const mainImage = saveImage(req.files.image[0], 'products/main');
//       if (mainImage) {
//         updateData.image = mainImage;
//       }
//     }

//     // ========== HANDLE GALLERY IMAGES ==========
//     if (req.files && req.files.gallery) {
//       let galleryUrls = product.gallery ? [...product.gallery] : [];
//       const galleryFiles = Array.isArray(req.files.gallery) 
//         ? req.files.gallery 
//         : [req.files.gallery];
      
//       for (const file of galleryFiles) {
//         const url = saveImage(file, 'products/gallery');
//         if (url) galleryUrls.push(url);
//       }
      
//       // Limit to 9 images
//       updateData.gallery = galleryUrls.slice(0, 9);
//     }

//     // ========== HANDLE VARIATIONS ==========
//     if (updateData.variations) {
//       // Clean variation data
//       updateData.variations = cleanVariationsData(updateData.variations);
      
//       // Process variation images if any
//       if (req.files && req.files.variationImages) {
//         const variationImages = Array.isArray(req.files.variationImages) 
//           ? req.files.variationImages 
//           : [req.files.variationImages];
        
//         variationImages.forEach((file, index) => {
//           if (index < updateData.variations.length) {
//             const url = saveImage(file, 'products/variations');
//             if (url) {
//               updateData.variations[index].image = url;
//             }
//           }
//         });
//       }
//     }

//     // ========== CONVERT STRING NUMBERS ==========
//     if (updateData.oldPrice) updateData.oldPrice = parseFloat(updateData.oldPrice) || 0;
//     if (updateData.price) updateData.price = parseFloat(updateData.price) || 0;
//     if (updateData.stock) updateData.stock = parseInt(updateData.stock) || 0;

//     // Convert boolean strings
//     if (updateData.hasVariations === 'true') updateData.hasVariations = true;
//     if (updateData.hasVariations === 'false') updateData.hasVariations = false;

//     // If product has variations, set base price to 0
//     if (updateData.hasVariations && updateData.variations && updateData.variations.length > 0) {
//       updateData.price = 0;
//       updateData.oldPrice = 0;
//       updateData.stock = 0;
//     }

//     // Update product
//     product = await Product.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { 
//         new: true, 
//         runValidators: true 
//       }
//     ).populate('category', 'name').populate('subcategory', 'name');

//     console.log('✅ Product updated:', product._id);

//     res.status(200).json({
//       success: true,
//       message: 'Product updated successfully',
//       data: product
//     });
//   } catch (error) {
//     console.error('❌ Error updating product:', error);
    
//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: messages
//       });
//     }
    
//     // Handle invalid ObjectId
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid product ID'
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update product',
//       error: error.message
//     });
//   }
// };

// /**
//  * Delete product
//  * @route DELETE /api/products/:id
//  * @access Private
//  */
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
    
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     // Delete images
//     if (product.image) {
//       deleteImage(product.image);
//     }
    
//     if (product.gallery && product.gallery.length > 0) {
//       product.gallery.forEach(img => deleteImage(img));
//     }
    
//     if (product.variations && product.variations.length > 0) {
//       product.variations.forEach(variation => {
//         if (variation.image) {
//           deleteImage(variation.image);
//         }
//       });
//     }

//     await product.deleteOne();

//     console.log('✅ Product deleted:', req.params.id);

//     res.status(200).json({
//       success: true,
//       message: 'Product deleted successfully'
//     });
//   } catch (error) {
//     console.error('❌ Error deleting product:', error);
    
//     // Handle invalid ObjectId
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid product ID'
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete product',
//       error: error.message
//     });
//   }
// };

// /**
//  * Bulk delete products
//  * @route POST /api/products/bulk-delete
//  * @access Private
//  */
// exports.bulkDeleteProducts = async (req, res) => {
//   try {
//     const { ids } = req.body;

//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide an array of product IDs'
//       });
//     }

//     // Find products to delete images
//     const products = await Product.find({ _id: { $in: ids } });
    
//     // Delete images
//     for (const product of products) {
//       if (product.image) {
//         deleteImage(product.image);
//       }
//       if (product.gallery && product.gallery.length > 0) {
//         product.gallery.forEach(img => deleteImage(img));
//       }
//       if (product.variations && product.variations.length > 0) {
//         product.variations.forEach(variation => {
//           if (variation.image) {
//             deleteImage(variation.image);
//           }
//         });
//       }
//     }

//     const result = await Product.deleteMany({ _id: { $in: ids } });

//     console.log(`✅ Bulk deleted ${result.deletedCount} products`);

//     res.status(200).json({
//       success: true,
//       message: `${result.deletedCount} products deleted successfully`,
//       deletedCount: result.deletedCount
//     });
//   } catch (error) {
//     console.error('❌ Error in bulk delete:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete products',
//       error: error.message
//     });
//   }
// };

// /**
//  * Bulk update products
//  * @route PUT /api/products/bulk-update
//  * @access Private
//  */
// exports.bulkUpdateProducts = async (req, res) => {
//   try {
//     const { ids, data } = req.body;

//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide an array of product IDs'
//       });
//     }

//     if (!data || typeof data !== 'object') {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide update data'
//       });
//     }

//     // Clean data - remove empty values
//     const cleanData = {};
//     Object.keys(data).forEach(key => {
//       if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
//         cleanData[key] = data[key];
//       }
//     });

//     if (Object.keys(cleanData).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No valid data to update'
//       });
//     }

//     // Convert numeric fields
//     if (cleanData.price) cleanData.price = parseFloat(cleanData.price);
//     if (cleanData.oldPrice) cleanData.oldPrice = parseFloat(cleanData.oldPrice);
//     if (cleanData.stock) cleanData.stock = parseInt(cleanData.stock);

//     // Handle variations if present
//     if (cleanData.variations) {
//       cleanData.variations = cleanVariationsData(cleanData.variations);
//     }

//     // Update products
//     const result = await Product.updateMany(
//       { _id: { $in: ids } },
//       { $set: cleanData },
//       { runValidators: true }
//     );

//     console.log(`✅ Bulk updated ${result.modifiedCount} products`);

//     res.status(200).json({
//       success: true,
//       message: `${result.modifiedCount} products updated successfully`,
//       modifiedCount: result.modifiedCount
//     });
//   } catch (error) {
//     console.error('❌ Error in bulk update:', error);
    
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: messages
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update products',
//       error: error.message
//     });
//   }
// };

// /**
//  * Export CSV
//  * @route GET /api/products/export-csv
//  * @access Private
//  */
// exports.exportCSV = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate('category', 'name')
//       .populate('subcategory', 'name')
//       .lean();

//     // CSV headers
//     let csv = 'ID,Name,Category,Subcategory,MRP,Selling Price,Stock,Has Variations,Variations Count,Quality,Diet Preference,State,Brand,Product Type,Cuisine,Created Date\n';
    
//     products.forEach(product => {
//       const category = product.category?.name || 'N/A';
//       const subcategory = product.subcategory?.name || 'N/A';
//       const hasVariations = product.hasVariations ? 'Yes' : 'No';
//       const variationsCount = product.variations ? product.variations.length : 0;
//       const createdDate = new Date(product.createdAt).toLocaleDateString();
      
//       csv += `"${product._id}","${product.name}","${category}","${subcategory}",${product.oldPrice || 0},${product.price || 0},${product.stock || 0},"${hasVariations}",${variationsCount},"${product.quality}","${product.dietPreference}","${product.State || ''}","${product.brandName || ''}","${product.productTypes || ''}","${product.cuisine || ''}","${createdDate}"\n`;
//     });

//     res.setHeader('Content-Type', 'text/csv');
//     res.setHeader('Content-Disposition', `attachment; filename=products-${Date.now()}.csv`);
//     res.send(csv);
    
//     console.log(`✅ Exported ${products.length} products to CSV`);
//   } catch (error) {
//     console.error('❌ Error exporting CSV:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to export CSV',
//       error: error.message
//     });
//   }
// };

// /**
//  * Import CSV
//  * @route POST /api/products/import-csv
//  * @access Private
//  */
// exports.importCSV = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please upload a CSV file'
//       });
//     }

//     // Simple CSV parsing
//     const csvData = req.file.buffer.toString();
//     const rows = csvData.split('\n');
//     const headers = rows[0].split(',').map(h => h.trim());
    
//     const imported = [];
//     const errors = [];
    
//     for (let i = 1; i < rows.length; i++) {
//       if (!rows[i].trim()) continue;
      
//       const values = rows[i].split(',').map(v => v.replace(/^"|"$/g, '').trim());
//       const productData = {};
      
//       headers.forEach((header, index) => {
//         if (values[index]) {
//           productData[header] = values[index];
//         }
//       });
      
//       // Basic validation
//       if (productData.name && productData.category) {
//         productData.price = parseFloat(productData.price) || 0;
//         productData.oldPrice = parseFloat(productData.oldPrice) || 0;
//         productData.stock = parseInt(productData.stock) || 0;
//         productData.hasVariations = productData.hasVariations === 'true' || productData.hasVariations === 'Yes';
        
//         // Handle category ObjectId
//         try {
//           const product = await Product.create(productData);
//           imported.push(product);
//         } catch (error) {
//           errors.push({ row: i + 1, error: error.message });
//           console.log(`Error importing row ${i + 1}:`, error.message);
//         }
//       } else {
//         errors.push({ row: i + 1, error: 'Missing required fields (name, category)' });
//       }
//     }

//     console.log(`✅ Imported ${imported.length} products, ${errors.length} errors`);

//     res.status(200).json({
//       success: true,
//       message: `${imported.length} products imported successfully`,
//       imported: imported.length,
//       errors: errors.length > 0 ? errors : undefined
//     });
//   } catch (error) {
//     console.error('❌ Error importing CSV:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to import CSV',
//       error: error.message
//     });
//   }
// };

// /**
//  * Get product stats
//  * @route GET /api/products/stats
//  * @access Public
//  */
// exports.getProductStats = async (req, res) => {
//   try {
//     const total = await Product.countDocuments();
//     const inStock = await Product.countDocuments({ 
//       $or: [
//         { stock: { $gt: 10 } },
//         { 'variations.stock': { $gt: 10 } }
//       ]
//     });
//     const lowStock = await Product.countDocuments({ 
//       $or: [
//         { stock: { $gt: 0, $lte: 10 } },
//         { 'variations.stock': { $gt: 0, $lte: 10 } }
//       ]
//     });
//     const outOfStock = await Product.countDocuments({ 
//       $or: [
//         { stock: 0, 'variations.stock': { $lte: 0 } },
//         { stock: 0, variations: { $size: 0 } }
//       ]
//     });
    
//     const categories = await Product.distinct('category');
//     const categoriesCount = categories.length;

//     // Get products with variations
//     const productsWithVariations = await Product.countDocuments({ hasVariations: true });

//     res.status(200).json({
//       success: true,
//       data: {
//         total,
//         inStock,
//         lowStock,
//         outOfStock,
//         categories: categoriesCount,
//         productsWithVariations
//       }
//     });
//   } catch (error) {
//     console.error('❌ Error getting stats:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get statistics',
//       error: error.message
//     });
//   }
// };

// /**
//  * Get product by slug
//  * @route GET /api/products/slug/:slug
//  * @access Public
//  */
// exports.getProductBySlug = async (req, res) => {
//   try {
//     const product = await Product.findOne({ slug: req.params.slug })
//       .populate('category', 'name')
//       .populate('subcategory', 'name');

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product
//     });
//   } catch (error) {
//     console.error('❌ Error fetching product by slug:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch product',
//       error: error.message
//     });
//   }
// };

// /**
//  * Search products with advanced filters
//  * @route GET /api/products/search/advanced
//  * @access Public
//  */
// exports.advancedSearch = async (req, res) => {
//   try {
//     const {
//       q = '',
//       category = '',
//       subcategory = '',
//       minPrice = 0,
//       maxPrice = 1000000,
//       quality = '',
//       dietPreference = '',
//       inStock = '',
//       hasVariations = '',
//       sort = '-createdAt',
//       page = 1,
//       limit = 20
//     } = req.query;

//     const query = {};

//     // Text search
//     if (q) {
//       query.$or = [
//         { name: { $regex: q, $options: 'i' } },
//         { description: { $regex: q, $options: 'i' } },
//         { brandName: { $regex: q, $options: 'i' } },
//         { ingredients: { $regex: q, $options: 'i' } }
//       ];
//     }

//     // Category filters
//     if (category) query.category = category;
//     if (subcategory) query.subcategory = subcategory;

//     // Price filter
//     query.$or = [
//       { price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) } },
//       { 'variations.newPrice': { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) } }
//     ];

//     // Other filters
//     if (quality) query.quality = quality;
//     if (dietPreference) query.dietPreference = dietPreference;
//     if (hasVariations === 'true') query.hasVariations = true;
//     if (hasVariations === 'false') query.hasVariations = false;

//     // Stock filter
//     if (inStock === 'true') {
//       query.$or = [
//         { stock: { $gt: 0 } },
//         { 'variations.stock': { $gt: 0 } }
//       ];
//     } else if (inStock === 'false') {
//       query.$or = [
//         { stock: 0, 'variations.stock': { $lte: 0 } },
//         { stock: 0, variations: { $size: 0 } }
//       ];
//     }

//     const products = await Product.find(query)
//       .populate('category', 'name')
//       .populate('subcategory', 'name')
//       .sort(sort)
//       .limit(parseInt(limit))
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .lean();

//     const total = await Product.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       total,
//       page: parseInt(page),
//       pages: Math.ceil(total / parseInt(limit)),
//       data: products
//     });
//   } catch (error) {
//     console.error('❌ Error in advanced search:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to search products',
//       error: error.message
//     });
//   }
// };

// module.exports = exports;





// controllers/productController.js
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// ==================== HELPER FUNCTIONS ====================
const saveImage = (file, folder = 'products') => {
  if (!file) return null;
  
  try {
    const uploadDir = path.join(__dirname, '../uploads', folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    const filePath = path.join(uploadDir, uniqueName);
    
    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${folder}/${uniqueName}`;
  } catch (error) {
    console.error('Error saving image:', error);
    return null;
  }
};

const deleteImage = (imagePath) => {
  if (!imagePath) return;
  
  try {
    const fullPath = path.join(__dirname, '..', imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

/**
 * FIX PRODUCT DATA - Fixes all blank/zero/wrong data
 */
const fixProductData = (data) => {
  const fixedData = { ...data };
  
  // ========== FIX NUMERIC FIELDS ==========
  if (!fixedData.price || fixedData.price <= 0) {
    fixedData.price = fixedData.hasVariations ? 0 : 100; // Default price
  }
  
  if (!fixedData.oldPrice || fixedData.oldPrice <= 0) {
    fixedData.oldPrice = fixedData.price * 1.2; // 20% more than price
  }
  
  if (!fixedData.stock || fixedData.stock < 0) {
    fixedData.stock = 10; // Default stock
  }
  
  // ========== FIX STRING FIELDS ==========
  const defaultValues = {
    name: fixedData.name || "Unnamed Product",
    description: fixedData.description || "Product description not provided.",
    brandName: fixedData.brandName || "Generic Brand",
    productTypes: fixedData.productTypes || "General",
    flavors: Array.isArray(fixedData.flavors) ? fixedData.flavors.join(", ") : 
             (fixedData.flavors || "Standard"),
    size: Array.isArray(fixedData.size) ? fixedData.size.join(", ") : 
          (fixedData.size || "Standard Size"),
    materialTypes: fixedData.materialTypes || "Not Specified",
    ingredients: fixedData.ingredients || "Ingredients information not available.",
    customWeight: fixedData.customWeight || "Standard",
    customSizeInput: fixedData.customSizeInput || "Standard",
    ageRange: fixedData.ageRange || "All Ages",
    containerType: fixedData.containerType || "Regular Packaging",
    itemForm: fixedData.itemForm || "Standard Form",
    specialty: fixedData.specialty || "Regular",
    itemTypeName: fixedData.itemTypeName || "Product",
    countryOfOrigin: fixedData.countryOfOrigin || "India",
    fssaiLicense: fixedData.fssaiLicense || "Not Applicable",
    legalDisclaimer: fixedData.legalDisclaimer || "Product sold as is. Please check description for details.",
    manufacturer: fixedData.manufacturer || "Not Specified",
    manufacturerContact: fixedData.manufacturerContact || "Contact not available",
    packerContact: fixedData.packerContact || "Contact not available",
    marketerNameAddress: fixedData.marketerNameAddress || "Havbit, Not Available",
    packageColour: fixedData.packageColour || "Standard",
    measurementUnit: fixedData.measurementUnit || "Units",
    unitCount: fixedData.unitCount || "1",
    numberOfItems: fixedData.numberOfItems || "1",
    itemWeight: fixedData.itemWeight || "Standard Weight",
    totalEaches: fixedData.totalEaches || "1",
    itemPackageWeight: fixedData.itemPackageWeight || "Standard",
    shelfLife: fixedData.shelfLife || "Standard Shelf Life",
    dietaryPreferences: fixedData.dietaryPreferences || "Standard",
    allergenInformation: fixedData.allergenInformation || "No known allergens",
    nutrition: fixedData.nutrition || "Nutritional information not specified",
    cuisine: fixedData.cuisine || "General",
    directions: fixedData.directions || "Use as directed",
    State: fixedData.State || "Not Specified"
  };
  
  // Apply default values
  Object.keys(defaultValues).forEach(key => {
    if (!fixedData[key] || fixedData[key].toString().trim() === '' || 
        fixedData[key] === 'null' || fixedData[key] === null) {
      fixedData[key] = defaultValues[key];
    }
  });
  
  // ========== FIX BOOLEAN FIELDS ==========
  fixedData.hasVariations = Boolean(fixedData.hasVariations);
  fixedData.isActive = fixedData.isActive !== false;
  
  // ========== FIX VARIATIONS ==========
  if (fixedData.variations && Array.isArray(fixedData.variations)) {
    fixedData.variations = fixedData.variations.map((variation, index) => ({
      variationId: variation.variationId || `var_${Date.now()}_${index}`,
      size: variation.size || `Size ${index + 1}`,
      flavor: variation.flavor || `Flavor ${index + 1}`,
      oldPrice: Math.max(0, parseFloat(variation.oldPrice) || (100 + (index * 50))),
      newPrice: Math.max(0, parseFloat(variation.newPrice) || (80 + (index * 40))),
      stock: Math.max(0, parseInt(variation.stock) || 10),
      sku: variation.sku || `SKU${Date.now().toString(36).toUpperCase()}${index}`,
      image: variation.image || ""
    }));
    
    // If has variations, set base price to 0
    if (fixedData.variations.length > 0) {
      fixedData.hasVariations = true;
      fixedData.price = 0;
      fixedData.oldPrice = 0;
      fixedData.stock = 0;
    }
  }
  
  return fixedData;
};

/**
 * CREATE PRODUCT WITH FIXED DATA
 */
exports.createProduct = async (req, res) => {
  try {
    console.log('📦 Creating new product...');
    
    const rawData = { ...req.body };
    
    // ========== FIX ALL DATA ==========
    const data = fixProductData(rawData);
    
    // ========== HANDLE IMAGES ==========
    if (req.files?.image?.[0]) {
      const mainImage = saveImage(req.files.image[0], 'products/main');
      if (mainImage) data.image = mainImage;
    }
    
    if (req.files?.gallery) {
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      const galleryUrls = [];
      
      for (const file of galleryFiles) {
        const url = saveImage(file, 'products/gallery');
        if (url) galleryUrls.push(url);
      }
      
      data.gallery = galleryUrls.slice(0, 9);
    }
    
    // ========== VALIDATE REQUIRED FIELDS ==========
    if (!data.name || data.name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Product name is required'
      });
    }
    
    if (!data.category) {
      return res.status(400).json({
        success: false,
        message: 'Category is required'
      });
    }
    
    // ========== CREATE PRODUCT ==========
    const product = await Product.create(data);
    
    console.log('✅ Product created with ID:', product._id);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('❌ Error creating product:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

/**
 * UPDATE PRODUCT WITH DATA FIXING
 */
exports.updateProduct = async (req, res) => {
  try {
    console.log('🔄 Updating product:', req.params.id);
    
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    const rawData = { ...req.body };
    
    // ========== FIX ALL DATA ==========
    const updateData = fixProductData(rawData);
    
    // ========== HANDLE IMAGES ==========
    if (req.files?.image?.[0]) {
      if (product.image) deleteImage(product.image);
      const mainImage = saveImage(req.files.image[0], 'products/main');
      if (mainImage) updateData.image = mainImage;
    }
    
    if (req.files?.gallery) {
      let galleryUrls = [...(product.gallery || [])];
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      
      for (const file of galleryFiles) {
        const url = saveImage(file, 'products/gallery');
        if (url) galleryUrls.push(url);
      }
      
      updateData.gallery = galleryUrls.slice(0, 9);
    }
    
    // ========== UPDATE PRODUCT ==========
    product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('category', 'name').populate('subcategory', 'name');
    
    console.log('✅ Product updated:', product._id);
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('❌ Error updating product:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

/**
 * FIX EXISTING PRODUCTS DATA (Bulk fix)
 */
exports.fixAllProducts = async (req, res) => {
  try {
    console.log('🔧 Fixing all products data...');
    
    const products = await Product.find({});
    let fixedCount = 0;
    let errors = [];
    
    for (const product of products) {
      try {
        // Convert product to plain object
        const productObj = product.toObject();
        
        // Fix the data
        const fixedData = fixProductData(productObj);
        
        // Update the product
        await Product.findByIdAndUpdate(product._id, fixedData, { runValidators: true });
        fixedCount++;
        
        console.log(`✅ Fixed product: ${product.name}`);
      } catch (error) {
        errors.push({
          productId: product._id,
          productName: product.name,
          error: error.message
        });
        console.error(`❌ Error fixing product ${product.name}:`, error.message);
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Fixed ${fixedCount} products successfully`,
      fixedCount,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('❌ Error fixing products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fix products',
      error: error.message
    });
  }
};

/**
 * CREATE SAMPLE PRODUCT WITH ALL FIELDS FILLED
 */
exports.createSampleProduct = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.body;
    
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Category ID is required'
      });
    }
    
    const sampleProduct = {
      name: "Premium Fresh Fruits Basket",
      description: "A premium basket of fresh seasonal fruits including apples, bananas, oranges and grapes. Organically grown and hand-picked for maximum freshness and taste.",
      brandName: "FarmFresh Delights",
      price: 399,
      oldPrice: 499,
      stock: 50,
      quality: "Premium",
      dietPreference: "Veg",
      restaurantName: "Havbit",
      productTypes: "Fresh Fruits",
      flavors: "Sweet & Tangy Mix",
      size: "Medium Basket (2kg)",
      materialTypes: "Natural",
      ingredients: "Fresh Apples, Bananas, Oranges, Grapes. All fruits are naturally grown without artificial preservatives.",
      customWeight: "2 Kilograms",
      customSizeInput: "Standard Size",
      ageRange: "All Ages",
      containerType: "Eco-friendly Basket",
      itemForm: "Whole Fruits",
      specialty: "Organic, Gluten-Free, Fresh Daily",
      itemTypeName: "Fresh Fruits Basket",
      countryOfOrigin: "India",
      fssaiLicense: "12345678901234",
      legalDisclaimer: "Fruits are subject to seasonal availability. Color and taste may vary naturally. Consume within 3-5 days.",
      shelfLife: "3-5 days at room temperature, 7-10 days refrigerated",
      manufacturer: "FarmFresh Fruits Pvt Ltd",
      manufacturerContact: "+91-9876543210 | info@farmfreshfruits.com",
      packerContact: "Packager: FarmFresh Fruits | Contact: +91-9876543210",
      marketerNameAddress: "Havbit Food Products, Delhi - 110001",
      packageColour: "Green & Brown Natural",
      measurementUnit: "Kilograms",
      unitCount: "1",
      numberOfItems: "Approximately 12-15 fruits",
      itemWeight: "2 Kilograms",
      totalEaches: "1 Basket",
      itemPackageWeight: "2.2 Kilograms",
      dietaryPreferences: "Vegetarian, Vegan, Gluten-Free",
      allergenInformation: "No common allergens. Contains natural fruit sugars only.",
      nutrition: "Rich in Vitamin C, Vitamin A, Dietary Fiber, Potassium, and Antioxidants.",
      cuisine: "Indian, Continental, Healthy",
      directions: "1. Remove fruits from packaging\n2. Wash thoroughly\n3. Consume fresh\n4. Store in cool place",
      State: "Delhi",
      category: categoryId,
      subcategory: subcategoryId,
      isActive: true
    };
    
    const product = await Product.create(sampleProduct);
    
    res.status(201).json({
      success: true,
      message: 'Sample product created successfully',
      data: product
    });
  } catch (error) {
    console.error('❌ Error creating sample product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create sample product',
      error: error.message
    });
  }
};

// ==================== EXISTING CONTROLLERS (Updated) ====================
// Keep your existing controllers but they will now use the fixed data

/**
 * GET ALL PRODUCTS (with data fixing for response)
 */
exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 100,
      search = '',
      category = '',
      quality = '',
      dietPreference = '',
      inStock = '',
      sort = '-createdAt'
    } = req.query;

    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brandName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) query.category = category;
    if (quality) query.quality = quality;
    if (dietPreference) query.dietPreference = dietPreference;
    
    if (inStock === 'true') {
      query.$or = [
        { stock: { $gt: 0 } },
        { 'variations.stock': { $gt: 0 } }
      ];
    } else if (inStock === 'false') {
      query.$or = [
        { stock: 0, 'variations.stock': { $lte: 0 } },
        { stock: 0, variations: { $size: 0 } }
      ];
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();

    // Fix data in response
    const fixedProducts = products.map(product => fixProductData(product));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: fixedProducts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: fixedProducts
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

/**
 * GET SINGLE PRODUCT (with data fixing)
 */
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('subcategory', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Fix product data before sending
    const productObj = product.toObject();
    const fixedProduct = fixProductData(productObj);

    res.status(200).json({
      success: true,
      data: fixedProduct
    });
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// ==================== NEW ROUTES TO ADD ====================
// Add these routes to your routes file

/**
 * @route POST /api/products/fix-all
 * @desc Fix all existing products data
 * @access Private
 */
/**
 * @route POST /api/products/sample
 * @desc Create a sample product with all fields filled
 * @access Private
 * @body {categoryId, subcategoryId}
 */

module.exports = exports;
