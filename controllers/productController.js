





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
const mongoose = require("mongoose");

/* =====================================================
   HELPER FUNCTIONS
===================================================== */

// Process product data from request
const processProductData = (reqData) => {
  const data = { ...reqData };
  
  // Process price fields
  if (data.price !== undefined) {
    data.newPrice = data.price;
    delete data.price;
  }
  
  // Convert strings to arrays for flavors and sizes
  if (data.flavors && typeof data.flavors === 'string') {
    data.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f);
  }
  
  if (data.size && typeof data.size === 'string') {
    data.size = data.size.split(',').map(s => s.trim()).filter(s => s);
  }
  
  // Process variations if provided as string
  if (data.variations && typeof data.variations === 'string') {
    try {
      data.variations = JSON.parse(data.variations);
    } catch (e) {
      data.variations = [];
    }
  }
  
  // Process tags if provided
  if (data.tags && typeof data.tags === 'string') {
    data.tags = data.tags.split(',').map(t => t.trim()).filter(t => t);
  }
  
  // Convert number fields
  if (data.oldPrice !== undefined) data.oldPrice = Number(data.oldPrice) || 0;
  if (data.newPrice !== undefined) data.newPrice = Number(data.newPrice) || 0;
  if (data.stock !== undefined) data.stock = Number(data.stock) || 0;
  
  return data;
};

// Handle main product image uploads
const handleMainImageUploads = async (req, existingProduct = null) => {
  const imageData = {
    image: existingProduct?.image || null,
    gallery: existingProduct?.gallery || []
  };

  // MAIN PRODUCT IMAGE
  if (req.files?.image?.length) {
    const mainImg = await uploadToCloudinary(
      req.files.image[0].buffer,
      `products/${existingProduct?._id || 'temp'}/main`
    );
    imageData.image = {
      url: mainImg.secure_url,
      publicId: mainImg.public_id,
      originalname: req.files.image[0].originalname,
      mimetype: req.files.image[0].mimetype,
      size: req.files.image[0].size,
      type: 'main',
      isMain: true,
      uploadedAt: new Date()
    };
  }

  // MANDATORY IMAGES (Ingredients, Nutrition, MFG/EXP)
  const mandatoryImages = {};
  const mandatoryTypes = ['ingredientsImage', 'nutritionImage', 'mfgExpImage'];
  const mandatoryPositions = { ingredientsImage: 0, nutritionImage: 1, mfgExpImage: 2 };
  
  for (const type of mandatoryTypes) {
    if (req.files?.mandatoryImages?.[type]?.length) {
      const img = await uploadToCloudinary(
        req.files.mandatoryImages[type][0].buffer,
        `products/${existingProduct?._id || 'temp'}/mandatory`
      );
      mandatoryImages[type] = {
        url: img.secure_url,
        publicId: img.public_id,
        originalname: req.files.mandatoryImages[type][0].originalname,
        mimetype: req.files.mandatoryImages[type][0].mimetype,
        size: req.files.mandatoryImages[type][0].size,
        type: 'mandatory',
        mandatoryType: type.replace('Image', ''),
        uploadedAt: new Date()
      };
    }
  }

  // Update mandatory images in their fixed positions
  if (mandatoryImages.ingredientsImage) {
    imageData.gallery[0] = mandatoryImages.ingredientsImage;
  }
  if (mandatoryImages.nutritionImage) {
    imageData.gallery[1] = mandatoryImages.nutritionImage;
  }
  if (mandatoryImages.mfgExpImage) {
    imageData.gallery[2] = mandatoryImages.mfgExpImage;
  }

  // ADDITIONAL GALLERY IMAGES (up to 12 total)
  if (req.files?.gallery?.length) {
    // Calculate current gallery count (excluding empty slots)
    const currentCount = imageData.gallery.filter(img => img && img.url).length;
    const remainingSlots = 12 - currentCount;
    
    if (remainingSlots <= 0) {
      throw new Error(`Maximum 12 images allowed. Current: ${currentCount}`);
    }
    
    const imagesToUpload = Math.min(req.files.gallery.length, remainingSlots);
    
    for (let i = 0; i < imagesToUpload; i++) {
      const file = req.files.gallery[i];
      const img = await uploadToCloudinary(
        file.buffer,
        `products/${existingProduct?._id || 'temp'}/gallery`
      );
      imageData.gallery.push({
        url: img.secure_url,
        publicId: img.public_id,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        type: 'gallery',
        uploadedAt: new Date(),
        order: imageData.gallery.length
      });
    }
  }

  // Filter out null/undefined entries
  imageData.gallery = imageData.gallery.filter(img => img && img.url);
  
  return imageData;
};

// Handle variation images upload
const handleVariationImageUploads = async (req, productId, variationIndex, isUpdate = false) => {
  const imageData = {
    image: null,
    gallery: []
  };

  // VARIATION MAIN IMAGE
  if (req.files?.image?.length) {
    const variationImg = await uploadToCloudinary(
      req.files.image[0].buffer,
      `products/${productId}/variations/${variationIndex}/main`
    );
    imageData.image = {
      url: variationImg.secure_url,
      publicId: variationImg.public_id,
      originalname: req.files.image[0].originalname,
      mimetype: req.files.image[0].mimetype,
      size: req.files.image[0].size,
      type: 'variation_main',
      uploadedAt: new Date()
    };
  }

  // VARIATION GALLERY IMAGES (up to 12)
  if (req.files?.gallery?.length) {
    const maxImages = 12;
    const imagesToUpload = Math.min(req.files.gallery.length, maxImages);
    
    for (let i = 0; i < imagesToUpload; i++) {
      const file = req.files.gallery[i];
      const img = await uploadToCloudinary(
        file.buffer,
        `products/${productId}/variations/${variationIndex}/gallery`
      );
      imageData.gallery.push({
        url: img.secure_url,
        publicId: img.public_id,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        type: 'variation_gallery',
        uploadedAt: new Date(),
        order: i
      });
    }
  }

  return imageData;
};

// Validate product data
const validateProductData = (data, isUpdate = false) => {
  const errors = [];
  
  // Basic validation
  if (!isUpdate && !data.name) errors.push("Product name is required");
  if (!isUpdate && !data.category) errors.push("Category is required");
  
  // Price validation for non-variation products
  if (!data.hasVariations) {
    if (data.newPrice <= 0) errors.push("Selling price must be greater than 0");
    if (data.oldPrice > 0 && data.oldPrice <= data.newPrice) {
      errors.push("MRP must be greater than Selling Price");
    }
  }
  
  // Variation validation
  if (data.hasVariations && data.variations && data.variations.length > 0) {
    data.variations.forEach((variation, index) => {
      if (!variation.newPrice || variation.newPrice <= 0) {
        errors.push(`Variation ${index + 1}: Selling price is required and must be greater than 0`);
      }
      if (variation.oldPrice > 0 && variation.oldPrice <= variation.newPrice) {
        errors.push(`Variation ${index + 1}: MRP must be greater than Selling Price`);
      }
      if (!variation.stock && variation.stock !== 0) {
        errors.push(`Variation ${index + 1}: Stock is required`);
      }
    });
  }
  
  return errors;
};

/* =====================================================
   MAIN CRUD OPERATIONS
===================================================== */

// 1. GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      subcategory,
      hasVariations,
      inStock,
      minPrice,
      maxPrice,
      quality,
      dietPreference,
      search,
      sort = '-createdAt',
      isFeatured,
      isActive = true
    } = req.query;
    
    // Build filter
    const filter = { isActive: isActive === 'true' };
    
    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brandName: { $regex: search, $options: 'i' } },
        { productTypes: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Other filters
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (hasVariations) filter.hasVariations = hasVariations === 'true';
    if (quality) filter.quality = quality;
    if (dietPreference) filter.dietPreference = dietPreference;
    if (isFeatured) filter.isFeatured = isFeatured === 'true';
    
    // Price filter
    if (minPrice || maxPrice) {
      filter.newPrice = {};
      if (minPrice) filter.newPrice.$gte = Number(minPrice);
      if (maxPrice) filter.newPrice.$lte = Number(maxPrice);
    }
    
    // Stock filter
    if (inStock === 'true') filter.stock = { $gt: 0 };
    if (inStock === 'false') filter.stock = { $lte: 0 };
    
    // Pagination
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit);
    
    // Execute query
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .populate("vendor", "_id storeName email")
      .sort(sort)
      .skip(skip)
      .limit(parsedLimit)
      .lean();
    
    const total = await Product.countDocuments(filter);
    
    // Format response
    const formattedProducts = products.map(product => ({
      ...product,
      gallery: Array.isArray(product.gallery) ? product.gallery : [],
      variations: product.variations?.map(v => ({
        ...v,
        gallery: Array.isArray(v.gallery) ? v.gallery : []
      })) || []
    }));
    
    return res.status(200).json({
      success: true,
      count: formattedProducts.length,
      total,
      totalPages: Math.ceil(total / parsedLimit),
      currentPage: parseInt(page),
      data: formattedProducts,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 2. GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    
    const product = await Product.findById(id)
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .populate("vendor", "_id storeName email phone");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Convert to object and format
    const productData = product.toObject();
    productData.gallery = Array.isArray(productData.gallery) ? productData.gallery : [];
    productData.variations = productData.variations?.map(v => ({
      ...v,
      gallery: Array.isArray(v.gallery) ? v.gallery : []
    })) || [];

    return res.status(200).json({
      success: true,
      data: productData,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 3. GET PRODUCT BY SLUG
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const product = await Product.findOne({ slug, isActive: true })
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .populate("vendor", "_id storeName email phone");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Increment view count
    product.views += 1;
    await product.save();

    const productData = product.toObject();
    productData.gallery = Array.isArray(productData.gallery) ? productData.gallery : [];
    productData.variations = productData.variations?.map(v => ({
      ...v,
      gallery: Array.isArray(v.gallery) ? v.gallery : []
    })) || [];

    return res.status(200).json({
      success: true,
      data: productData,
    });
  } catch (error) {
    console.error("GET PRODUCT BY SLUG ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 4. CREATE PRODUCT
const addProduct = async (req, res) => {
  try {
    // Process request data
    const data = processProductData(req.body);
    
    // Set default values
    data.restaurantName = data.restaurantName || "Havbit";
    data.isActive = data.isActive !== undefined ? data.isActive : true;
    data.hasVariations = data.hasVariations || false;
    
    // Validate data
    const validationErrors = validateProductData(data);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }
    
    // Handle image uploads
    const imageData = await handleMainImageUploads(req);
    data.image = imageData.image;
    data.gallery = imageData.gallery;
    
    // For variations, process variation images
    if (data.hasVariations && data.variations && data.variations.length > 0) {
      // Handle variation images from request
      if (req.files?.variationImages?.length && req.body.variationInfo) {
        try {
          const variationInfo = Array.isArray(req.body.variationInfo) 
            ? req.body.variationInfo 
            : JSON.parse(req.body.variationInfo);
          
          for (const info of variationInfo) {
            const variationIndex = info.index;
            if (variationIndex < data.variations.length) {
              // Find the corresponding variation image
              const variationImage = req.files.variationImages.find(
                (_, idx) => idx === variationIndex
              );
              
              if (variationImage) {
                const uploadedImg = await uploadToCloudinary(
                  variationImage.buffer,
                  `products/temp/variations/${variationIndex}`
                );
                data.variations[variationIndex].image = {
                  url: uploadedImg.secure_url,
                  publicId: uploadedImg.public_id,
                  type: 'variation_main',
                  uploadedAt: new Date()
                };
              }
            }
          }
        } catch (error) {
          console.error("Error processing variation images:", error);
        }
      }
      
      // Initialize variation galleries
      data.variations = data.variations.map(variation => ({
        ...variation,
        gallery: Array.isArray(variation.gallery) ? variation.gallery : [],
        isActive: variation.isActive !== undefined ? variation.isActive : true
      }));
    }
    
    // Create product
    const product = await Product.create(data);
    
    // Update Cloudinary folder paths with actual product ID
    if (product._id) {
      // Update main image path
      if (product.image && product.image.url) {
        // You might want to move the image to proper folder
        // This is optional - Cloudinary already has the image
      }
      
      // For variations, update their image paths
      if (product.hasVariations && product.variations.length > 0) {
        for (const variation of product.variations) {
          if (variation.image && variation.image.url) {
            // Update variation image reference if needed
          }
        }
        await product.save();
      }
    }
    
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Product with this name or slug already exists"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 5. UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    // Process request data
    const updateData = processProductData(req.body);
    
    // Validate update data
    const validationErrors = validateProductData({...product.toObject(), ...updateData}, true);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }
    
    // Handle image uploads
    const imageData = await handleMainImageUploads(req, product);
    
    // Update image fields if new images were uploaded
    if (imageData.image) {
      updateData.image = imageData.image;
    }
    
    if (imageData.gallery.length > 0) {
      // Merge existing gallery with new gallery
      const existingGallery = product.gallery || [];
      const newGallery = imageData.gallery;
      
      // Replace mandatory images if updated
      const mandatoryIndices = [0, 1, 2];
      mandatoryIndices.forEach(index => {
        if (newGallery[index]) {
          existingGallery[index] = newGallery[index];
        }
      });
      
      // Add new gallery images
      const additionalImages = newGallery.slice(3);
      updateData.gallery = [...existingGallery, ...additionalImages].filter(img => img && img.url);
    }
    
    // Handle variation updates
    if (updateData.hasVariations !== undefined) {
      product.hasVariations = updateData.hasVariations;
    }
    
    if (updateData.variations && updateData.variations.length > 0) {
      // Update existing variations or add new ones
      for (const updateVariation of updateData.variations) {
        if (updateVariation._id) {
          // Update existing variation
          const existingVariation = product.variations.id(updateVariation._id);
          if (existingVariation) {
            Object.assign(existingVariation, updateVariation);
          }
        } else {
          // Add new variation
          product.variations.push(updateVariation);
        }
      }
      delete updateData.variations;
    }
    
    // Update other fields
    Object.keys(updateData).forEach(key => {
      if (key !== 'variations' && key !== 'gallery' && key !== 'image') {
        product[key] = updateData[key];
      }
    });
    
    // Recalculate product stats based on variations
    if (product.hasVariations && product.variations.length > 0) {
      const activeVariations = product.variations.filter(v => v.isActive !== false);
      if (activeVariations.length > 0) {
        product.stock = activeVariations.reduce((sum, v) => sum + (v.stock || 0), 0);
        const prices = activeVariations.map(v => v.newPrice || 0).filter(p => p > 0);
        if (prices.length > 0) {
          product.newPrice = Math.min(...prices);
          product.oldPrice = Math.max(...activeVariations.map(v => v.oldPrice || 0));
        }
      }
    }
    
    await product.save();
    
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 6. DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    
    // Soft delete (set isActive to false) or hard delete
    const deleteMethod = req.query.hard === 'true' ? 
      Product.findByIdAndDelete : 
      Product.findByIdAndUpdate;
    
    const result = await deleteMethod(id, 
      req.query.hard === 'true' ? {} : { isActive: false }
    );
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    const message = req.query.hard === 'true' 
      ? "Product permanently deleted successfully" 
      : "Product deactivated successfully";
    
    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/* =====================================================
   VARIATION MANAGEMENT
===================================================== */

// 7. ADD VARIATION TO PRODUCT
const addVariation = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    // Process variation data
    const variationData = { ...req.body };
    
    // Validate required fields
    if (!variationData.newPrice || variationData.newPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid selling price is required"
      });
    }
    
    if (variationData.oldPrice > 0 && variationData.oldPrice <= variationData.newPrice) {
      return res.status(400).json({
        success: false,
        message: "MRP must be greater than Selling Price"
      });
    }
    
    if (variationData.stock === undefined || variationData.stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid stock quantity is required"
      });
    }
    
    // Check for duplicate variation
    const isDuplicate = product.variations.some(variation => {
      const sameSize = (!variation.size && !variationData.size) || variation.size === variationData.size;
      const sameFlavor = (!variation.flavor && !variationData.flavor) || variation.flavor === variationData.flavor;
      const sameColor = (!variation.color && !variationData.color) || variation.color === variationData.color;
      return sameSize && sameFlavor && sameColor;
    });
    
    if (isDuplicate) {
      return res.status(400).json({
        success: false,
        message: "A variation with these attributes already exists"
      });
    }
    
    // Handle variation image uploads
    const variationIndex = product.variations.length;
    const imageData = await handleVariationImageUploads(req, product._id, variationIndex);
    
    // Create variation object
    const newVariation = {
      ...variationData,
      image: imageData.image,
      gallery: imageData.gallery,
      isActive: variationData.isActive !== undefined ? variationData.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Convert price fields to numbers
    if (newVariation.oldPrice) newVariation.oldPrice = Number(newVariation.oldPrice);
    if (newVariation.newPrice) newVariation.newPrice = Number(newVariation.newPrice);
    if (newVariation.stock) newVariation.stock = Number(newVariation.stock);
    
    // Add variation to product
    product.variations.push(newVariation);
    product.hasVariations = true;
    
    // Update product stats
    product.stock = product.variations.reduce((sum, v) => sum + (v.stock || 0), 0);
    const prices = product.variations.map(v => v.newPrice || 0).filter(p => p > 0);
    if (prices.length > 0) {
      product.newPrice = Math.min(...prices);
      product.oldPrice = Math.max(...product.variations.map(v => v.oldPrice || 0));
    }
    
    await product.save();
    
    const addedVariation = product.variations[product.variations.length - 1];
    
    return res.status(201).json({
      success: true,
      message: "Variation added successfully",
      data: addedVariation,
    });
  } catch (error) {
    console.error("ADD VARIATION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add variation",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 8. UPDATE VARIATION
const updateVariation = async (req, res) => {
  try {
    const { id, variationId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(variationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or variation ID"
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    const variation = product.variations.id(variationId);
    
    if (!variation) {
      return res.status(404).json({
        success: false,
        message: "Variation not found",
      });
    }
    
    // Process update data
    const updateData = { ...req.body };
    
    // Validate price if provided
    if (updateData.newPrice !== undefined && updateData.newPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid selling price is required"
      });
    }
    
    if (updateData.oldPrice !== undefined && updateData.newPrice !== undefined &&
        updateData.oldPrice > 0 && updateData.oldPrice <= updateData.newPrice) {
      return res.status(400).json({
        success: false,
        message: "MRP must be greater than Selling Price"
      });
    }
    
    // Handle image uploads
    const variationIndex = product.variations.findIndex(v => v._id.toString() === variationId);
    const imageData = await handleVariationImageUploads(req, product._id, variationIndex, true);
    
    // Update images if provided
    if (imageData.image) {
      updateData.image = imageData.image;
    }
    
    if (imageData.gallery.length > 0) {
      // Merge existing gallery with new gallery
      const existingGallery = variation.gallery || [];
      updateData.gallery = [...existingGallery, ...imageData.gallery].filter(img => img && img.url);
    }
    
    // Update variation
    Object.assign(variation, updateData);
    variation.updatedAt = new Date();
    
    // Convert number fields
    if (variation.oldPrice) variation.oldPrice = Number(variation.oldPrice);
    if (variation.newPrice) variation.newPrice = Number(variation.newPrice);
    if (variation.stock !== undefined) variation.stock = Number(variation.stock);
    
    // Update product stats
    product.stock = product.variations.reduce((sum, v) => sum + (v.stock || 0), 0);
    const prices = product.variations.map(v => v.newPrice || 0).filter(p => p > 0);
    if (prices.length > 0) {
      product.newPrice = Math.min(...prices);
      product.oldPrice = Math.max(...product.variations.map(v => v.oldPrice || 0));
    }
    
    await product.save();
    
    return res.status(200).json({
      success: true,
      message: "Variation updated successfully",
      data: variation,
    });
  } catch (error) {
    console.error("UPDATE VARIATION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update variation",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 9. DELETE VARIATION
const deleteVariation = async (req, res) => {
  try {
    const { id, variationId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(variationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or variation ID"
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    const variation = product.variations.id(variationId);
    
    if (!variation) {
      return res.status(404).json({
        success: false,
        message: "Variation not found",
      });
    }
    
    // Remove variation
    product.variations.pull(variationId);
    
    // Update product stats
    if (product.variations.length > 0) {
      product.stock = product.variations.reduce((sum, v) => sum + (v.stock || 0), 0);
      const prices = product.variations.map(v => v.newPrice || 0).filter(p => p > 0);
      if (prices.length > 0) {
        product.newPrice = Math.min(...prices);
        product.oldPrice = Math.max(...product.variations.map(v => v.oldPrice || 0));
      }
    } else {
      // No variations left
      product.hasVariations = false;
      product.stock = 0;
      product.newPrice = 0;
      product.oldPrice = 0;
    }
    
    await product.save();
    
    return res.status(200).json({
      success: true,
      message: "Variation deleted successfully",
    });
  } catch (error) {
    console.error("DELETE VARIATION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete variation",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 10. GET PRODUCT VARIATIONS
const getProductVariations = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    
    const product = await Product.findById(id).select('variations hasVariations');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    // Filter active variations if requested
    const onlyActive = req.query.active === 'true';
    let variations = product.variations;
    
    if (onlyActive) {
      variations = variations.filter(v => v.isActive !== false);
    }
    
    // Format variations
    const formattedVariations = variations.map(variation => ({
      ...variation.toObject(),
      gallery: Array.isArray(variation.gallery) ? variation.gallery : []
    }));
    
    return res.status(200).json({
      success: true,
      hasVariations: product.hasVariations,
      count: formattedVariations.length,
      data: formattedVariations,
    });
  } catch (error) {
    console.error("GET VARIATIONS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch variations",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/* =====================================================
   IMAGE MANAGEMENT
===================================================== */

// 11. UPLOAD PRODUCT GALLERY IMAGES
const uploadProductImages = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }
    
    // Check remaining slots (max 12 total)
    const currentCount = product.gallery ? product.gallery.length : 0;
    const remainingSlots = 12 - currentCount;
    
    if (remainingSlots <= 0) {
      return res.status(400).json({
        success: false,
        message: `Maximum 12 images allowed. Current: ${currentCount}`
      });
    }
    
    const imagesToUpload = Math.min(req.files.length, remainingSlots);
    const uploadedImages = [];
    
    // Upload each image
    for (let i = 0; i < imagesToUpload; i++) {
      const file = req.files[i];
      const img = await uploadToCloudinary(
        file.buffer,
        `products/${product._id}/gallery`
      );
      
      const imageData = {
        url: img.secure_url,
        publicId: img.public_id,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        type: 'gallery',
        uploadedAt: new Date(),
        order: currentCount + i
      };
      
      uploadedImages.push(imageData);
    }
    
    // Add to product gallery
    if (!product.gallery) product.gallery = [];
    product.gallery.push(...uploadedImages);
    await product.save();
    
    return res.status(200).json({
      success: true,
      message: `Successfully uploaded ${uploadedImages.length} images`,
      count: uploadedImages.length,
      data: uploadedImages,
      totalImages: product.gallery.length
    });
  } catch (error) {
    console.error("UPLOAD PRODUCT IMAGES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload images",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 12. DELETE PRODUCT IMAGE
const deleteProductImage = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;
    const index = parseInt(imageIndex);
    
    if (!mongoose.Types.ObjectId.isValid(id) || isNaN(index)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters"
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    // Check if image index is valid
    if (!product.gallery || index < 0 || index >= product.gallery.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid image index",
      });
    }
    
    // Don't allow deletion of mandatory images (first 3)
    if (index < 3) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete mandatory images (Ingredients, Nutrition, Mfg/Exp)"
      });
    }
    
    // Remove image from gallery
    const deletedImage = product.gallery.splice(index, 1)[0];
    await product.save();
    
    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: deletedImage,
      totalImages: product.gallery.length
    });
  } catch (error) {
    console.error("DELETE PRODUCT IMAGE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 13. UPLOAD VARIATION IMAGES
const uploadVariationImages = async (req, res) => {
  try {
    const { id, variationId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(variationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or variation ID"
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    const variation = product.variations.id(variationId);
    
    if (!variation) {
      return res.status(404).json({
        success: false,
        message: "Variation not found",
      });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }
    
    // Check remaining slots (max 12 per variation)
    const currentCount = variation.gallery ? variation.gallery.length : 0;
    const remainingSlots = 12 - currentCount;
    
    if (remainingSlots <= 0) {
      return res.status(400).json({
        success: false,
        message: `Maximum 12 images allowed for variation. Current: ${currentCount}`
      });
    }
    
    const imagesToUpload = Math.min(req.files.length, remainingSlots);
    const uploadedImages = [];
    
    // Upload each image
    for (let i = 0; i < imagesToUpload; i++) {
      const file = req.files[i];
      const img = await uploadToCloudinary(
        file.buffer,
        `products/${product._id}/variations/${variationId}/gallery`
      );
      
      const imageData = {
        url: img.secure_url,
        publicId: img.public_id,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        type: 'variation_gallery',
        uploadedAt: new Date(),
        order: currentCount + i
      };
      
      uploadedImages.push(imageData);
    }
    
    // Add to variation gallery
    if (!variation.gallery) variation.gallery = [];
    variation.gallery.push(...uploadedImages);
    await product.save();
    
    return res.status(200).json({
      success: true,
      message: `Successfully uploaded ${uploadedImages.length} variation images`,
      count: uploadedImages.length,
      data: uploadedImages,
      totalImages: variation.gallery.length
    });
  } catch (error) {
    console.error("UPLOAD VARIATION IMAGES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload variation images",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 14. DELETE VARIATION IMAGE
const deleteVariationImage = async (req, res) => {
  try {
    const { id, variationId, imageIndex } = req.params;
    const index = parseInt(imageIndex);
    
    if (!mongoose.Types.ObjectId.isValid(id) || 
        !mongoose.Types.ObjectId.isValid(variationId) || 
        isNaN(index)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters"
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    
    const variation = product.variations.id(variationId);
    
    if (!variation) {
      return res.status(404).json({
        success: false,
        message: "Variation not found",
      });
    }
    
    // Check if image index is valid
    if (!variation.gallery || index < 0 || index >= variation.gallery.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid image index",
      });
    }
    
    // Remove image from gallery
    const deletedImage = variation.gallery.splice(index, 1)[0];
    await product.save();
    
    return res.status(200).json({
      success: true,
      message: "Variation image deleted successfully",
      data: deletedImage,
      totalImages: variation.gallery.length
    });
  } catch (error) {
    console.error("DELETE VARIATION IMAGE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete variation image",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/* =====================================================
   BULK OPERATIONS
===================================================== */

// 15. BULK DELETE PRODUCTS
const bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product IDs array is required",
      });
    }
    
    // Validate all IDs
    const invalidIds = ids.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product IDs",
        invalidIds
      });
    }
    
    // Soft delete or hard delete
    const deleteMethod = req.query.hard === 'true' ? 
      Product.deleteMany : 
      Product.updateMany;
    
    const query = { _id: { $in: ids } };
    const update = req.query.hard === 'true' ? {} : { isActive: false };
    
    const result = await deleteMethod(query, update);
    
    const message = req.query.hard === 'true' 
      ? `${result.deletedCount || 0} products permanently deleted` 
      : `${result.modifiedCount || 0} products deactivated`;
    
    return res.status(200).json({
      success: true,
      message,
      count: result.deletedCount || result.modifiedCount || 0
    });
  } catch (error) {
    console.error("BULK DELETE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete products",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 16. BULK UPDATE PRODUCTS
const bulkUpdate = async (req, res) => {
  try {
    const { ids, data } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0 || !data || typeof data !== 'object') {
      return res.status(400).json({
        success: false,
        message: "Product IDs array and update data are required",
      });
    }
    
    // Validate all IDs
    const invalidIds = ids.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product IDs",
        invalidIds
      });
    }
    
    // Don't allow updating certain fields in bulk
    const restrictedFields = ['_id', 'createdAt', 'updatedAt', '__v'];
    const updateData = { ...data };
    restrictedFields.forEach(field => delete updateData[field]);
    
    // Update products
    const result = await Product.updateMany(
      { _id: { $in: ids } },
      { $set: updateData }
    );
    
    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} products updated`,
      count: result.modifiedCount
    });
  } catch (error) {
    console.error("BULK UPDATE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update products",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/* =====================================================
   SEARCH & FILTER
===================================================== */

// 17. SEARCH PRODUCTS
const searchProducts = async (req, res) => {
  try {
    const { 
      q, 
      category, 
      minPrice, 
      maxPrice, 
      inStock, 
      hasVariations,
      quality,
      dietPreference,
      state,
      limit = 20,
      sort = 'name'
    } = req.query;
    
    // Build search filter
    const filter = { isActive: true };
    
    // Text search
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brandName: { $regex: q, $options: 'i' } },
        { productTypes: { $regex: q, $options: 'i' } },
        { ingredients: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Other filters
    if (category) filter.category = category;
    if (quality) filter.quality = quality;
    if (dietPreference) filter.dietPreference = dietPreference;
    if (state) filter.State = state;
    if (hasVariations) filter.hasVariations = hasVariations === 'true';
    
    // Price filter
    if (minPrice || maxPrice) {
      filter.newPrice = {};
      if (minPrice) filter.newPrice.$gte = Number(minPrice);
      if (maxPrice) filter.newPrice.$lte = Number(maxPrice);
    }
    
    // Stock filter
    if (inStock === 'true') filter.stock = { $gt: 0 };
    if (inStock === 'false') filter.stock = { $lte: 0 };
    
    // Execute search
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .sort(sort)
      .limit(parseInt(limit))
      .lean();
    
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("SEARCH PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search products",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 18. GET FEATURED PRODUCTS
const getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const products = await Product.find({ 
      isFeatured: true, 
      isActive: true 
    })
      .populate("category", "name slug")
      .limit(parseInt(limit))
      .lean();
    
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("GET FEATURED PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 19. GET PRODUCTS BY CATEGORY
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 20, sort = '-createdAt' } = req.query;
    
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }
    
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit);
    
    const products = await Product.find({ 
      category: categoryId,
      isActive: true 
    })
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(parsedLimit)
      .lean();
    
    const total = await Product.countDocuments({ 
      category: categoryId,
      isActive: true 
    });
    
    return res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / parsedLimit),
      currentPage: parseInt(page),
      data: products,
    });
  } catch (error) {
    console.error("GET PRODUCTS BY CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 20. GET PRODUCT STATISTICS
const getProductStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $facet: {
          totalProducts: [{ $count: "count" }],
          byCategory: [
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryInfo"
              }
            },
            { $unwind: "$categoryInfo" },
            {
              $group: {
                _id: "$categoryInfo.name",
                count: { $sum: 1 },
                totalStock: { $sum: "$stock" }
              }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
          ],
          stockStatus: [
            {
              $group: {
                _id: null,
                inStock: { 
                  $sum: { 
                    $cond: [{ $gt: ["$stock", 0] }, 1, 0] 
                  } 
                },
                outOfStock: { 
                  $sum: { 
                    $cond: [{ $lte: ["$stock", 0] }, 1, 0] 
                  } 
                },
                lowStock: { 
                  $sum: { 
                    $cond: [{ $and: [{ $gt: ["$stock", 0] }, { $lte: ["$stock", 10] }] }, 1, 0] 
                  } 
                }
              }
            }
          ],
          priceRange: [
            {
              $bucket: {
                groupBy: "$newPrice",
                boundaries: [0, 100, 500, 1000, 5000, 10000],
                default: "10000+",
                output: {
                  count: { $sum: 1 },
                  minPrice: { $min: "$newPrice" },
                  maxPrice: { $max: "$newPrice" },
                  avgPrice: { $avg: "$newPrice" }
                }
              }
            }
          ],
          byDiet: [
            {
              $group: {
                _id: "$dietPreference",
                count: { $sum: 1 }
              }
            }
          ],
          byQuality: [
            {
              $group: {
                _id: "$quality",
                count: { $sum: 1 }
              }
            }
          ]
        }
      }
    ]);
    
    return res.status(200).json({
      success: true,
      data: stats[0] || {},
    });
  } catch (error) {
    console.error("GET PRODUCT STATS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product statistics",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/* =====================================================
   EXPORT ALL FUNCTIONS
===================================================== */

module.exports = {
  // Main CRUD
  getProducts,
  getProductById,
  getProductBySlug,
  addProduct,
  updateProduct,
  deleteProduct,
  
  // Variation Management
  addVariation,
  updateVariation,
  deleteVariation,
  getProductVariations,
  
  // Image Management
  uploadProductImages,
  deleteProductImage,
  uploadVariationImages,
  deleteVariationImage,
  
  // Bulk Operations
  bulkDelete,
  bulkUpdate,
  
  // Search & Filter
  searchProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductStats
};
