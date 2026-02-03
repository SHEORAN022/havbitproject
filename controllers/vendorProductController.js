





// const VendorProduct = require("../models/VendorProduct");
// const Vendor = require("../models/Vendor");
// const Category = require("../models/Category");
// const SubCategory = require("../models/SubCategory");
// const cloudinary = require("../config/cloudinary");

// const csv = require("csv-parser");
// const fs = require("fs");
// const { Parser } = require("json2csv");

// /* ================= CLOUDINARY UPLOAD ================= */
// async function uploadCloud(file) {
//   try {
//     const base64 = file.buffer.toString("base64");
//     const dataUri = `data:${file.mimetype};base64,${base64}`;
//     const result = await cloudinary.uploader.upload(dataUri, {
//       folder: "vendor_products",
//       resource_type: "auto",
//     });
//     return result.secure_url;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw error;
//   }
// }

// /* ================= GET CATEGORIES ================= */
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find({ isActive: true })
//       .select("name image _id")
//       .sort({ name: 1 });
    
//     res.json({ success: true, data: categories });
//   } catch (err) {
//     console.error("Get categories error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= GET SUBCATEGORIES ================= */
// exports.getSubCategories = async (req, res) => {
//   try {
//     const { categoryId } = req.params;
    
//     const subcategories = await SubCategory.find({ 
//       category: categoryId,
//       isActive: true 
//     })
//       .select("name image _id")
//       .sort({ name: 1 });
    
//     res.json({ success: true, data: subcategories });
//   } catch (err) {
//     console.error("Get subcategories error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= GET VENDOR PRODUCTS ================= */
// exports.getVendorProducts = async (req, res) => {
//   try {
//     const products = await VendorProduct.find({
//       vendor: req.vendor._id,
//     })
//       .populate("category", "name image")
//       .populate("subcategory", "name image");

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

// /* ================= CREATE VENDOR PRODUCT ================= */
// exports.createVendorProduct = async (req, res) => {
//   try {
//     console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
//     console.log("📦 Request body keys:", Object.keys(req.body));
    
//     const vendor = await Vendor.findById(req.vendor._id);
//     if (!vendor) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Vendor not found" 
//       });
//     }
    
//     const data = { ...req.body };
    
//     // Step 1: Category Validation
//     if (data.category) {
//       const categoryExists = await Category.findById(data.category);
//       if (!categoryExists) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid category selected" 
//         });
//       }
//     }

//     // ✅ MAJOR FIX: Subcategory validation - NO POPULATE, direct field check
//     if (data.subcategory) {
//       const subcategoryExists = await SubCategory.findById(data.subcategory);
//       if (!subcategoryExists) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid subcategory selected" 
//         });
//       }
      
//       // ✅ FIX: Check the actual field name from SubCategory model
//       // SubCategory model mein field ka naam check karo - could be:
//       // - category (common)
//       // - parent (some models use this)
//       // - categoryId (some use this)
      
//       if (data.category && subcategoryExists.category) {
//         const subcatCategoryId = subcategoryExists.category.toString();
//         if (subcatCategoryId !== data.category) {
//           return res.status(400).json({ 
//             success: false, 
//             message: "Subcategory does not belong to selected category" 
//           });
//         }
//       } else if (data.category && subcategoryExists.parent) {
//         // If field is named 'parent' instead of 'category'
//         const subcatCategoryId = subcategoryExists.parent.toString();
//         if (subcatCategoryId !== data.category) {
//           return res.status(400).json({ 
//             success: false, 
//             message: "Subcategory does not belong to selected category" 
//           });
//         }
//       }
//       // Note: If no category field found in subcategory, skip validation
//     }
    
//     // Step 2: Parse data - handle formData or direct fields
//     let productData = {};
    
//     // If formData exists, process it
//     if (data.formData && typeof data.formData === 'string') {
//       try {
//         data.formData = JSON.parse(data.formData);
//       } catch (e) {
//         console.log("Could not parse formData string");
//       }
//     }
    
//     if (data.formData && typeof data.formData === 'object') {
//       console.log("📦 Processing formData structure");
      
//       // Step 1: Category Selection
//       productData.category = data.category || data.selectedCategory || data.formData.basic?.category;
//       productData.subcategory = data.subcategory || data.selectedSubCategory || data.formData.basic?.subcategory;
      
//       // Step 2: Basic Information
//       productData.name = data.formData.basic?.name || data.name || "";
//       productData.description = data.formData.basic?.description || data.description || "";
//       productData.restaurantName = vendor.storeName || data.formData.basic?.restaurantName || "";
      
//       // Step 3: Product Details - Pricing
//       if (data.formData.pricing) {
//         productData.oldPrice = Number(data.formData.pricing.oldPrice || 0);
//         productData.price = Number(data.formData.pricing.newPrice || 0);
//         productData.stock = Number(data.formData.pricing.stock || 0);
//         productData.quality = data.formData.pricing.quality || "Standard";
//         productData.dietPreference = data.formData.pricing.dietPreference || "Veg";
//       } else {
//         productData.oldPrice = Number(data.oldPrice || 0);
//         productData.price = Number(data.newPrice || data.price || 0);
//         productData.stock = Number(data.stock || 0);
//         productData.quality = data.quality || "Standard";
//         productData.dietPreference = data.dietPreference || "Veg";
//       }
      
//       // Step 3: Product Details - Specifications
//       if (data.formData.details) {
//         productData.productTypes = data.formData.details.productTypes || "";
//         productData.ingredients = data.formData.details.ingredients || "";
//         productData.materialTypes = data.formData.details.materialTypes || "";
//         productData.customWeight = data.formData.details.customWeight || "";
//         productData.customSizeInput = data.formData.details.customSizeInput || "";
//         productData.ageRange = data.formData.details.ageRange || "";
//         productData.containerType = data.formData.details.containerType || "";
//         productData.itemForm = data.formData.details.itemForm || "";
//         productData.specialty = data.formData.details.specialty || "";
//         productData.itemTypeName = data.formData.details.itemTypeName || "";
//         productData.countryOfOrigin = data.formData.details.countryOfOrigin || "";
        
//         // Flavors - ARRAY FORMAT
//         const flavorsArray = [];
//         if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
//           flavorsArray.push(...data.formData.details.flavors);
//         }
//         if (data.formData.details.customFlavorInput) {
//           flavorsArray.push(data.formData.details.customFlavorInput);
//         }
//         productData.flavors = flavorsArray.filter(f => f && f.trim() !== '');
        
//         // Size - ARRAY FORMAT
//         const sizeArray = [];
//         if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
//           sizeArray.push(...data.formData.details.size);
//         }
//         if (data.formData.details.customSizeInput) {
//           sizeArray.push(data.formData.details.customSizeInput);
//         }
//         productData.size = sizeArray.filter(s => s && s.trim() !== '');
//       } else {
//         // Handle direct fields
//         productData.productTypes = data.productTypes || "";
//         productData.ingredients = data.ingredients || "";
//         productData.materialTypes = data.materialTypes || "";
//         productData.customWeight = data.customWeight || "";
//         productData.customSizeInput = data.customSizeInput || "";
//         productData.ageRange = data.ageRange || "";
//         productData.containerType = data.containerType || "";
//         productData.itemForm = data.itemForm || "";
//         productData.specialty = data.specialty || "";
//         productData.itemTypeName = data.itemTypeName || "";
//         productData.countryOfOrigin = data.countryOfOrigin || "";
        
//         // Flavors from direct fields
//         if (data.flavors) {
//           if (typeof data.flavors === 'string') {
//             productData.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
//           } else if (Array.isArray(data.flavors)) {
//             productData.flavors = data.flavors.filter(f => f && f.trim() !== '');
//           } else {
//             productData.flavors = [];
//           }
//         } else {
//           productData.flavors = [];
//         }
        
//         // Size from direct fields
//         if (data.size) {
//           if (typeof data.size === 'string') {
//             productData.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
//           } else if (Array.isArray(data.size)) {
//             productData.size = data.size.filter(s => s && s.trim() !== '');
//           } else {
//             productData.size = [];
//           }
//         } else {
//           productData.size = [];
//         }
//       }
      
//       // Location
//       if (data.formData.location) {
//         productData.State = data.formData.location.state || "";
//       } else {
//         productData.State = data.State || "";
//       }
      
//       // Step 4: Manufacturing & Marketing
//       if (data.formData.compliance) {
//         productData.brandName = data.formData.compliance.fssaiLicense || "";
//         productData.fssaiLicense = data.formData.compliance.fssaiLicense || "";
//         productData.legalDisclaimer = data.formData.compliance.legalDisclaimer || "";
//       } else {
//         productData.brandName = data.brandName || data.fssaiLicenseNumber || "";
//         productData.fssaiLicense = data.fssaiLicense || data.fssaiLicenseNumber || "";
//         productData.legalDisclaimer = data.legalDisclaimer || "";
//       }
      
//       if (data.formData.manufacturing) {
//         productData.manufacturer = data.formData.manufacturing.manufacturerName || "";
//         productData.manufacturerContact = data.formData.manufacturing.manufacturerAddress || "";
        
//         // Packager - combine name and address
//         let packerContact = "";
//         if (data.formData.manufacturing.packagerName) {
//           packerContact = data.formData.manufacturing.packagerName;
//           if (data.formData.manufacturing.packagerAddress) {
//             packerContact += `, ${data.formData.manufacturing.packagerAddress}`;
//           }
//         }
//         productData.packerContact = packerContact;
        
//         // Marketer - combine name and address
//         let marketerNameAddress = "";
//         if (data.formData.manufacturing.marketerName) {
//           marketerNameAddress = data.formData.manufacturing.marketerName;
//           if (data.formData.manufacturing.marketerAddress) {
//             marketerNameAddress += `, ${data.formData.manufacturing.marketerAddress}`;
//           }
//         }
//         productData.marketerNameAddress = marketerNameAddress;
//       } else {
//         productData.manufacturer = data.manufacturer || "";
//         productData.manufacturerContact = data.manufacturerContact || "";
//         productData.packerContact = data.packerContact || "";
//         productData.marketerNameAddress = data.marketerNameAddress || "";
//       }
      
//       // Step 5: Package & Dietary
//       if (data.formData.package) {
//         productData.packageColour = data.formData.package.packageColour || "";
//         productData.measurementUnit = data.formData.package.measurementUnit || "";
//         productData.unitCount = data.formData.package.unitCount || "";
//         productData.numberOfItems = data.formData.package.numberOfItems || "";
//         productData.itemWeight = data.formData.package.itemWeight || "";
//         productData.totalEaches = data.formData.package.totalEaches || "";
//         productData.itemPackageWeight = data.formData.package.itemPackageWeight || "";
//         productData.shelfLife = data.formData.package.shelfLife || "";
//       } else {
//         productData.packageColour = data.packageColour || "";
//         productData.measurementUnit = data.measurementUnit || "";
//         productData.unitCount = data.unitCount || "";
//         productData.numberOfItems = data.numberOfItems || "";
//         productData.itemWeight = data.itemWeight || "";
//         productData.totalEaches = data.totalEaches || "";
//         productData.itemPackageWeight = data.itemPackageWeight || "";
//         productData.shelfLife = data.shelfLife || "";
//       }
      
//       if (data.formData.dietary) {
//         productData.dietaryPreferences = data.formData.dietary.dietaryPreferences || "";
//         productData.allergenInformation = data.formData.dietary.allergenInformation || "";
//         productData.nutrition = data.formData.dietary.nutrition || "";
//         productData.cuisine = data.formData.dietary.cuisine || "";
//         productData.directions = data.formData.dietary.directions || "";
//       } else {
//         productData.dietaryPreferences = data.dietaryPreferences || "";
//         productData.allergenInformation = data.allergenInformation || "";
//         productData.nutrition = data.nutrition || "";
//         productData.cuisine = data.cuisine || "";
//         productData.directions = data.directions || "";
//       }
//     } else {
//       // Direct fields without formData
//       productData = {
//         // Basic
//         name: data.name || "",
//         description: data.description || "",
//         restaurantName: vendor.storeName || data.restaurantName || "",
        
//         // Pricing
//         oldPrice: Number(data.oldPrice || 0),
//         price: Number(data.newPrice || data.price || 0),
//         stock: Number(data.stock || 0),
//         quality: data.quality || "Standard",
//         dietPreference: data.dietPreference || "Veg",
        
//         // Category
//         category: data.category || data.selectedCategory,
//         subcategory: data.subcategory || data.selectedSubCategory,
        
//         // Details
//         productTypes: data.productTypes || "",
//         ingredients: data.ingredients || "",
//         materialTypes: data.materialTypes || "",
//         customWeight: data.customWeight || "",
//         customSizeInput: data.customSizeInput || "",
//         ageRange: data.ageRange || "",
//         containerType: data.containerType || "",
//         itemForm: data.itemForm || "",
//         specialty: data.specialty || "",
//         itemTypeName: data.itemTypeName || "",
//         countryOfOrigin: data.countryOfOrigin || "",
        
//         // Flavors array
//         flavors: data.flavors ? (typeof data.flavors === 'string' ? 
//           data.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : 
//           (Array.isArray(data.flavors) ? data.flavors.filter(f => f && f.trim() !== '') : [])) : [],
        
//         // Size array
//         size: data.size ? (typeof data.size === 'string' ? 
//           data.size.split(',').map(s => s.trim()).filter(s => s !== '') : 
//           (Array.isArray(data.size) ? data.size.filter(s => s && s.trim() !== '') : [])) : [],
        
//         // FSSAI - DONO FIELDS
//         brandName: data.brandName || data.fssaiLicenseNumber || "",
//         fssaiLicense: data.fssaiLicense || data.fssaiLicenseNumber || "",
//         legalDisclaimer: data.legalDisclaimer || "",
        
//         // Manufacturing
//         manufacturer: data.manufacturer || "",
//         manufacturerContact: data.manufacturerContact || "",
//         packerContact: data.packerContact || "",
//         marketerNameAddress: data.marketerNameAddress || "",
        
//         // Package
//         packageColour: data.packageColour || "",
//         measurementUnit: data.measurementUnit || "",
//         unitCount: data.unitCount || "",
//         numberOfItems: data.numberOfItems || "",
//         itemWeight: data.itemWeight || "",
//         totalEaches: data.totalEaches || "",
//         itemPackageWeight: data.itemPackageWeight || "",
//         shelfLife: data.shelfLife || "",
        
//         // Dietary
//         dietaryPreferences: data.dietaryPreferences || "",
//         allergenInformation: data.allergenInformation || "",
//         nutrition: data.nutrition || "",
//         cuisine: data.cuisine || "",
//         directions: data.directions || "",
        
//         // Location
//         State: data.State || "",
//       };
//     }
    
//     // Required validation
//     if (!productData.name || !productData.price || !productData.category) {
//       console.log("❌ Validation failed:", {
//         name: productData.name,
//         price: productData.price,
//         category: productData.category
//       });
      
//       return res.status(400).json({
//         success: false,
//         message: "Name, price and category are required",
//         received: productData
//       });
//     }
    
//     // Step 6: Process images
//     let mainImage = null;
//     const galleryImages = [];
    
//     // Main image
//     if (req.files?.image?.[0]) {
//       try {
//         mainImage = await uploadCloud(req.files.image[0]);
//         productData.image = mainImage;
//       } catch (error) {
//         console.error("Main image upload error:", error);
//       }
//     }
    
//     // Mandatory images - gallery[0], gallery[1], gallery[2]
//     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
//       try {
//         const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0]);
//         galleryImages[0] = img;
//       } catch (error) {
//         console.error("Ingredients image upload error:", error);
//       }
//     }
    
//     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
//       try {
//         const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0]);
//         galleryImages[1] = img;
//       } catch (error) {
//         console.error("Nutrition image upload error:", error);
//       }
//     }
    
//     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
//       try {
//         const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0]);
//         galleryImages[2] = img;
//       } catch (error) {
//         console.error("MFG/EXP image upload error:", error);
//       }
//     }
    
//     // Additional gallery images
//     if (req.files?.gallery) {
//       for (const file of req.files.gallery) {
//         try {
//           const img = await uploadCloud(file);
//           galleryImages.push(img);
//         } catch (error) {
//           console.error("Gallery image upload error:", error);
//         }
//       }
//     }
    
//     // Clean gallery
//     const cleanGallery = galleryImages.filter(img => img && img.trim() !== '');
//     if (cleanGallery.length > 0) {
//       productData.gallery = cleanGallery;
//     }
    
//     // Add vendor ID
//     productData.vendor = req.vendor._id;
    
//     // Debug log
//     console.log("📦 Final product data:", JSON.stringify(productData, null, 2));
    
//     // Create product
//     const product = await VendorProduct.create(productData);
    
//     // Populate and return
//     const populatedProduct = await VendorProduct.findById(product._id)
//       .populate("category", "name image")
//       .populate("subcategory", "name image");
    
//     res.json({ 
//       success: true, 
//       data: populatedProduct,
//       storeName: vendor.storeName || ""
//     });
    
//   } catch (err) {
//     console.error("❌ CREATE PRODUCT ERROR:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Server Error: " + err.message,
//       stack: err.stack 
//     });
//   }
// };

// /* ================= UPDATE VENDOR PRODUCT ================= */
// exports.updateVendorProduct = async (req, res) => {
//   try {
//     console.log("🟢 UPDATE VENDOR PRODUCT API CALLED");
    
//     const product = await VendorProduct.findOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     const data = { ...req.body };
//     const updateData = {};

//     // Category validation
//     if (data.category) {
//       const categoryExists = await Category.findById(data.category);
//       if (!categoryExists) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid category selected" 
//         });
//       }
//       updateData.category = data.category;
//     }

//     // ✅ MAJOR FIX: Subcategory validation - NO POPULATE, direct field check
//     if (data.subcategory) {
//       const subcategoryExists = await SubCategory.findById(data.subcategory);
//       if (!subcategoryExists) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid subcategory selected" 
//         });
//       }
      
//       // ✅ FIX: Check the actual field name from SubCategory model
//       if (data.category && subcategoryExists.category) {
//         const subcatCategoryId = subcategoryExists.category.toString();
//         if (subcatCategoryId !== data.category) {
//           return res.status(400).json({ 
//             success: false, 
//             message: "Subcategory does not belong to selected category" 
//           });
//         }
//       } else if (data.category && subcategoryExists.parent) {
//         // If field is named 'parent' instead of 'category'
//         const subcatCategoryId = subcategoryExists.parent.toString();
//         if (subcatCategoryId !== data.category) {
//           return res.status(400).json({ 
//             success: false, 
//             message: "Subcategory does not belong to selected category" 
//           });
//         }
//       }
//       updateData.subcategory = data.subcategory;
//     }
    
//     // Process formData if present
//     if (data.formData && typeof data.formData === 'string') {
//       try {
//         data.formData = JSON.parse(data.formData);
//       } catch (e) {
//         console.log("Could not parse formData string");
//       }
//     }
    
//     if (data.formData && typeof data.formData === 'object') {
//       // Process formData fields
//       const fieldsMapping = {
//         // Basic
//         name: 'formData.basic.name',
//         description: 'formData.basic.description',
        
//         // Pricing
//         oldPrice: 'formData.pricing.oldPrice',
//         price: 'formData.pricing.newPrice',
//         stock: 'formData.pricing.stock',
//         quality: 'formData.pricing.quality',
//         dietPreference: 'formData.pricing.dietPreference',
        
//         // Details
//         productTypes: 'formData.details.productTypes',
//         ingredients: 'formData.details.ingredients',
//         materialTypes: 'formData.details.materialTypes',
//         customWeight: 'formData.details.customWeight',
//         customSizeInput: 'formData.details.customSizeInput',
//         ageRange: 'formData.details.ageRange',
//         containerType: 'formData.details.containerType',
//         itemForm: 'formData.details.itemForm',
//         specialty: 'formData.details.specialty',
//         itemTypeName: 'formData.details.itemTypeName',
//         countryOfOrigin: 'formData.details.countryOfOrigin',
        
//         // Location
//         State: 'formData.location.state',
        
//         // Compliance
//         brandName: 'formData.compliance.fssaiLicense',
//         fssaiLicense: 'formData.compliance.fssaiLicense',
//         legalDisclaimer: 'formData.compliance.legalDisclaimer',
        
//         // Manufacturing
//         manufacturer: 'formData.manufacturing.manufacturerName',
//         manufacturerContact: 'formData.manufacturing.manufacturerAddress',
        
//         // Package
//         packageColour: 'formData.package.packageColour',
//         measurementUnit: 'formData.package.measurementUnit',
//         unitCount: 'formData.package.unitCount',
//         numberOfItems: 'formData.package.numberOfItems',
//         itemWeight: 'formData.package.itemWeight',
//         totalEaches: 'formData.package.totalEaches',
//         itemPackageWeight: 'formData.package.itemPackageWeight',
//         shelfLife: 'formData.package.shelfLife',
        
//         // Dietary
//         dietaryPreferences: 'formData.dietary.dietaryPreferences',
//         allergenInformation: 'formData.dietary.allergenInformation',
//         nutrition: 'formData.dietary.nutrition',
//         cuisine: 'formData.dietary.cuisine',
//         directions: 'formData.dietary.directions',
//       };
      
//       // Process each field
//       Object.keys(fieldsMapping).forEach(field => {
//         const path = fieldsMapping[field];
//         const value = path.split('.').reduce((obj, key) => obj?.[key], data);
//         if (value !== undefined) {
//           if (field === 'oldPrice' || field === 'price' || field === 'stock') {
//             updateData[field] = Number(value) || 0;
//           } else {
//             updateData[field] = value;
//           }
//         }
//       });
      
//       // Handle packer contact (combined)
//       if (data.formData.manufacturing?.packagerName !== undefined || 
//           data.formData.manufacturing?.packagerAddress !== undefined) {
//         let packerContact = "";
//         if (data.formData.manufacturing.packagerName) {
//           packerContact = data.formData.manufacturing.packagerName;
//           if (data.formData.manufacturing.packagerAddress) {
//             packerContact += `, ${data.formData.manufacturing.packagerAddress}`;
//           }
//         }
//         updateData.packerContact = packerContact;
//       }
      
//       // Handle marketer info (combined)
//       if (data.formData.manufacturing?.marketerName !== undefined || 
//           data.formData.manufacturing?.marketerAddress !== undefined) {
//         let marketerNameAddress = "";
//         if (data.formData.manufacturing.marketerName) {
//           marketerNameAddress = data.formData.manufacturing.marketerName;
//           if (data.formData.manufacturing.marketerAddress) {
//             marketerNameAddress += `, ${data.formData.manufacturing.marketerAddress}`;
//           }
//         }
//         updateData.marketerNameAddress = marketerNameAddress;
//       }
      
//       // Handle flavors array
//       if (data.formData.details?.flavors !== undefined || 
//           data.formData.details?.customFlavorInput !== undefined) {
//         const flavorsArray = [];
//         if (Array.isArray(data.formData.details.flavors)) {
//           flavorsArray.push(...data.formData.details.flavors);
//         }
//         if (data.formData.details.customFlavorInput) {
//           flavorsArray.push(data.formData.details.customFlavorInput);
//         }
//         updateData.flavors = flavorsArray.filter(f => f && f.trim() !== '');
//       }
      
//       // Handle size array
//       if (data.formData.details?.size !== undefined || 
//           data.formData.details?.customSizeInput !== undefined) {
//         const sizeArray = [];
//         if (Array.isArray(data.formData.details.size)) {
//           sizeArray.push(...data.formData.details.size);
//         }
//         if (data.formData.details.customSizeInput) {
//           sizeArray.push(data.formData.details.customSizeInput);
//         }
//         updateData.size = sizeArray.filter(s => s && s.trim() !== '');
//       }
//     } else {
//       // Handle direct field updates
//       const directFields = [
//         'name', 'description', 'restaurantName',
//         'oldPrice', 'price', 'newPrice', 'stock', 'quality', 'dietPreference',
//         'productTypes', 'ingredients', 'materialTypes', 'customWeight', 'customSizeInput',
//         'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
//         'brandName', 'fssaiLicense', 'legalDisclaimer',
//         'manufacturer', 'manufacturerContact', 'packerContact', 'marketerNameAddress',
//         'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight',
//         'totalEaches', 'itemPackageWeight', 'shelfLife',
//         'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
//         'State'
//       ];
      
//       directFields.forEach(field => {
//         if (data[field] !== undefined) {
//           if (field === 'newPrice') {
//             updateData.price = Number(data[field]);
//           } else if (field === 'oldPrice' || field === 'price' || field === 'stock') {
//             updateData[field] = Number(data[field]);
//           } else {
//             updateData[field] = data[field];
//           }
//         }
//       });
      
//       // Handle flavors array
//       if (data.flavors !== undefined) {
//         if (typeof data.flavors === 'string') {
//           updateData.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
//         } else if (Array.isArray(data.flavors)) {
//           updateData.flavors = data.flavors.filter(f => f && f.trim() !== '');
//         }
//       }
      
//       // Handle size array
//       if (data.size !== undefined) {
//         if (typeof data.size === 'string') {
//           updateData.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
//         } else if (Array.isArray(data.size)) {
//           updateData.size = data.size.filter(s => s && s.trim() !== '');
//         }
//       }
//     }
    
//     // Update images
//     if (req.files?.image?.[0]) {
//       try {
//         updateData.image = await uploadCloud(req.files.image[0]);
//       } catch (error) {
//         console.error("Image upload error:", error);
//       }
//     }
    
//     // Update gallery
//     let gallery = [...(product.gallery || [])];
    
//     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
//       try {
//         const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0]);
//         gallery[0] = img;
//       } catch (error) {
//         console.error("Ingredients image upload error:", error);
//       }
//     }
    
//     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
//       try {
//         const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0]);
//         gallery[1] = img;
//       } catch (error) {
//         console.error("Nutrition image upload error:", error);
//       }
//     }
    
//     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
//       try {
//         const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0]);
//         gallery[2] = img;
//       } catch (error) {
//         console.error("MFG/EXP image upload error:", error);
//       }
//     }
    
//     if (req.files?.gallery) {
//       for (const file of req.files.gallery) {
//         try {
//           const img = await uploadCloud(file);
//           gallery.push(img);
//         } catch (error) {
//           console.error("Gallery image upload error:", error);
//         }
//       }
//     }
    
//     // Clean gallery
//     gallery = gallery.filter(img => img && img.trim() !== '');
//     if (gallery.length > 0) {
//       updateData.gallery = gallery;
//     }
    
//     // Update product
//     Object.assign(product, updateData);
//     await product.save();
    
//     // Populate and return
//     const populatedProduct = await VendorProduct.findById(product._id)
//       .populate("category", "name image")
//       .populate("subcategory", "name image");
    
//     res.json({ success: true, data: populatedProduct });
    
//   } catch (err) {
//     console.error("❌ UPDATE PRODUCT ERROR:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Server Error: " + err.message 
//     });
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

// /* ================= CSV IMPORT ================= */
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
//         let errors = [];

//         for (const [index, r] of rows.entries()) {
//           try {
//             if (!r.name || !r.price) continue;

//             // Find category
//             let categoryId = null;
//             if (r.category) {
//               const category = await Category.findOne({ 
//                 name: { $regex: new RegExp(`^${r.category}$`, 'i') } 
//               });
//               if (category) categoryId = category._id;
//             }

//             // Find subcategory
//             let subcategoryId = null;
//             if (r.subcategory) {
//               const subcategory = await SubCategory.findOne({ 
//                 name: { $regex: new RegExp(`^${r.subcategory}$`, 'i') },
//                 ...(categoryId ? { category: categoryId } : {})
//               });
//               if (subcategory) subcategoryId = subcategory._id;
//             }

//             // Parse arrays
//             const flavors = r.flavors ? r.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : [];
//             const size = r.size ? r.size.split(',').map(s => s.trim()).filter(s => s !== '') : [];

//             const payload = {
//               name: r.name,
//               brandName: r.brandName || "",
//               description: r.description || "",
//               oldPrice: Number(r.oldPrice) || 0,
//               price: Number(r.price),
//               stock: Number(r.stock) || 0,
//               quality: r.quality || "Standard",
//               State: r.State || "",
//               vendor: vendorId,
//               restaurantName: vendor.storeName || r.restaurantName || "",
//               category: categoryId,
//               subcategory: subcategoryId,
//               productTypes: r.productTypes || "",
//               flavors: flavors,
//               size: size,
//               dietPreference: r.dietPreference || "Veg",
//               ageRange: r.ageRange || "",
//               containerType: r.containerType || "",
//               itemForm: r.itemForm || "",
//               specialty: r.specialty || "",
//               itemTypeName: r.itemTypeName || "",
//               countryOfOrigin: r.countryOfOrigin || "",
//               manufacturer: r.manufacturer || "",
//               manufacturerContact: r.manufacturerContact || "",
//               packerContact: r.packerContact || "",
//               marketerNameAddress: r.marketerNameAddress || "",
//               packageColour: r.packageColour || "",
//               measurementUnit: r.measurementUnit || "",
//               unitCount: r.unitCount || "",
//               numberOfItems: r.numberOfItems || "",
//               itemWeight: r.itemWeight || "",
//               totalEaches: r.totalEaches || "",
//               itemPackageWeight: r.itemPackageWeight || "",
//               shelfLife: r.shelfLife || "",
//               ingredients: r.ingredients || "",
//               allergenInformation: r.allergenInformation || "",
//               directions: r.directions || "",
//               nutrition: r.nutrition || "",
//               cuisine: r.cuisine || "",
//               dietaryPreferences: r.dietaryPreferences || "",
//               materialTypes: r.materialTypes || "",
//               customWeight: r.customWeight || "",
//               customSizeInput: r.customSizeInput || "",
//               fssaiLicense: r.fssaiLicense || "",
//               legalDisclaimer: r.legalDisclaimer || "",
//             };

//             if (r._id) {
//               await VendorProduct.updateOne(
//                 { _id: r._id, vendor: vendorId },
//                 payload
//               );
//               updated++;
//             } else {
//               await VendorProduct.create(payload);
//               created++;
//             }
//           } catch (error) {
//             errors.push(`Row ${index + 1}: ${error.message}`);
//           }
//         }

//         fs.unlinkSync(req.file.path);

//         res.json({
//           success: true,
//           created,
//           updated,
//           total: rows.length,
//           errors: errors.length > 0 ? errors : undefined,
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
//     })
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .lean();

//     // Transform data
//     const transformedProducts = products.map(product => ({
//       ...product,
//       flavors: Array.isArray(product.flavors) ? product.flavors.join(',') : product.flavors || "",
//       size: Array.isArray(product.size) ? product.size.join(',') : product.size || "",
//       category: product.category ? product.category.name : "",
//       subcategory: product.subcategory ? product.subcategory.name : "",
//       categoryId: product.category ? product.category._id : "",
//       subcategoryId: product.subcategory ? product.subcategory._id : ""
//     }));

//     const fields = [
//       '_id', 'name', 'description', 'brandName', 'fssaiLicense', 'restaurantName',
//       'oldPrice', 'price', 'stock', 'quality', 'State',
//       'category', 'subcategory', 'categoryId', 'subcategoryId',
//       'productTypes', 'flavors', 'size', 'dietPreference',
//       'ageRange', 'containerType', 'itemForm', 'specialty',
//       'itemTypeName', 'countryOfOrigin', 'manufacturer',
//       'manufacturerContact', 'packerContact', 'marketerNameAddress',
//       'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
//       'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife',
//       'ingredients', 'allergenInformation', 'directions', 'nutrition',
//       'cuisine', 'dietaryPreferences', 'materialTypes', 'customWeight',
//       'customSizeInput', 'legalDisclaimer'
//     ];

//     const parser = new Parser({ fields });
//     const csvData = parser.parse(transformedProducts);

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

//     // Handle price mapping
//     const updateData = { ...data };
//     if (updateData.newPrice !== undefined) {
//       updateData.price = updateData.newPrice;
//       delete updateData.newPrice;
//     }

//     // Handle arrays
//     if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
//       updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
//     }
    
//     if (updateData.size !== undefined && typeof updateData.size === 'string') {
//       updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
//     }

//     const result = await VendorProduct.updateMany(
//       { _id: { $in: ids }, vendor: req.vendor._id },
//       { $set: updateData }
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
  try {
    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "vendor_products",
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

/* ================= HELPER: VALIDATE CATEGORY ================= */
async function validateCategory(categoryId, subcategoryId = null) {
  if (!categoryId) {
    return { valid: false, message: "Category is required" };
  }
  
  const category = await Category.findById(categoryId);
  if (!category) {
    return { valid: false, message: "Invalid category selected" };
  }
  
  if (subcategoryId && subcategoryId !== 'null' && subcategoryId !== '') {
    const subcategory = await SubCategory.findById(subcategoryId);
    if (!subcategory) {
      return { valid: false, message: "Invalid subcategory selected" };
    }
    
    // if (subcategory.category.toString() !== categoryId) {
    //   return { valid: false, message: "Subcategory does not belong to selected category" };
    // }
    if (String(subcategory.category) !== String(categoryId)) {
  return {
    valid: false,
    message: "Subcategory does not belong to selected category"
  };
}

  }
  
  return { valid: true, category, subcategory: subcategoryId || null };
}

/* ================= HELPER: PROCESS FORM DATA ================= */
function processFormData(data, vendor) {
  // Parse variations
  let variations = [];
  if (data.variations) {
    if (typeof data.variations === 'string') {
      try {
        variations = JSON.parse(data.variations);
      } catch (error) {
        console.error("Error parsing variations:", error);
        variations = [];
      }
    } else if (Array.isArray(data.variations)) {
      variations = data.variations;
    }
  }
  
  // Parse arrays
  let flavors = [];
  if (data.flavors) {
    if (typeof data.flavors === 'string') {
      try {
        flavors = JSON.parse(data.flavors);
      } catch (error) {
        flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
      }
    } else if (Array.isArray(data.flavors)) {
      flavors = data.flavors.filter(f => f && f.trim() !== '');
    }
  }
  
  let sizes = [];
  if (data.size) {
    if (typeof data.size === 'string') {
      try {
        sizes = JSON.parse(data.size);
      } catch (error) {
        sizes = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
      }
    } else if (Array.isArray(data.size)) {
      sizes = data.size.filter(s => s && s.trim() !== '');
    }
  }
  
  // Calculate prices for variations vs base product
  const hasVariations = data.hasVariations === 'true' || data.hasVariations === true || false;
  const basePrice = parseFloat(data.price) || parseFloat(data.newPrice) || 0;
  const baseOldPrice = parseFloat(data.oldPrice) || 0;
  const baseStock = parseInt(data.stock) || 0;
  
  return {
    // Basic Info
    name: data.name?.trim() || "",
    description: data.description?.trim() || "",
    restaurantName: data.restaurantName?.trim() || vendor?.storeName || vendor?.restaurantName || "",
    
    // FSSAI/Brand Info
    brandName: data.brandName?.trim() || data.fssaiLicense?.trim() || "",
    fssaiLicense: data.fssaiLicense?.trim() || data.brandName?.trim() || "",
    
    // Variations
    hasVariations: hasVariations,
    variations: variations,
    
    // Pricing & Stock (handle variations vs base product)
    oldPrice: hasVariations ? 0 : baseOldPrice,
    price: hasVariations ? 0 : basePrice,
    sellingPrice: hasVariations ? 0 : basePrice,
    stock: hasVariations ? 0 : baseStock,
    quality: data.quality || "Standard",
    dietPreference: data.dietPreference || "Veg",
    
    // Category
    category: data.category,
    subcategory: data.subcategory === 'null' || data.subcategory === '' ? null : data.subcategory,
    
    // Product Details
    productTypes: data.productTypes?.trim() || "",
    materialTypes: data.materialTypes?.trim() || "",
    ingredients: data.ingredients?.trim() || "",
    customWeight: data.customWeight?.trim() || "",
    customSizeInput: data.customSizeInput?.trim() || "",
    customFlavorInput: data.customFlavorInput?.trim() || "",
    
    // Product Specifications
    ageRange: data.ageRange?.trim() || "",
    containerType: data.containerType?.trim() || "",
    itemForm: data.itemForm?.trim() || "",
    specialty: data.specialty?.trim() || "",
    itemTypeName: data.itemTypeName?.trim() || "",
    countryOfOrigin: data.countryOfOrigin?.trim() || "India",
    
    // Compliance
    legalDisclaimer: data.legalDisclaimer?.trim() || "",
    shelfLife: data.shelfLife?.trim() || "",
    
    // Manufacturing
    manufacturer: data.manufacturer?.trim() || data.manufacturerName?.trim() || "",
    manufacturerContact: data.manufacturerContact?.trim() || data.manufacturerAddress?.trim() || "",
    manufacturerName: data.manufacturerName?.trim() || data.manufacturer?.trim() || "",
    manufacturerAddress: data.manufacturerAddress?.trim() || data.manufacturerContact?.trim() || "",
    
    // Packager Info
    packerContact: data.packerContact?.trim() || "",
    packagerName: data.packagerName?.trim() || "",
    packagerAddress: data.packagerAddress?.trim() || "",
    packagerFssaiLicense: data.packagerFssaiLicense?.trim() || "",
    
    // Marketer Info
    marketerNameAddress: data.marketerNameAddress?.trim() || "",
    marketerName: data.marketerName?.trim() || "",
    marketerAddress: data.marketerAddress?.trim() || "",
    
    // Package Details
    packageColour: data.packageColour?.trim() || "",
    measurementUnit: data.measurementUnit?.trim() || "",
    unitCount: data.unitCount?.trim() || "",
    numberOfItems: data.numberOfItems?.trim() || "",
    itemWeight: data.itemWeight?.trim() || "",
    totalEaches: data.totalEaches?.trim() || "",
    itemPackageWeight: data.itemPackageWeight?.trim() || "",
    
    // Dietary & Nutrition
    dietaryPreferences: data.dietaryPreferences?.trim() || "",
    allergenInfo: data.allergenInfo?.trim() || "",
    allergenInformation: data.allergenInformation?.trim() || data.allergenInfo?.trim() || "",
    nutrition: data.nutrition?.trim() || "",
    cuisine: data.cuisine?.trim() || "",
    directions: data.directions?.trim() || "",
    
    // Location
    State: data.State?.trim() || "",
    
    // Arrays
    flavors: flavors,
    size: sizes,
    
    // Status
    isActive: data.isActive === 'false' ? false : true,
    isFeatured: data.isFeatured === 'true' ? true : false,
    isApproved: data.isApproved === 'true' ? true : false
  };
}

/* ================= GET CATEGORIES ================= */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select("name image _id description")
      .sort({ name: 1 });
    
    res.json({ 
      success: true, 
      message: "Categories fetched successfully",
      data: categories 
    });
  } catch (err) {
    console.error("❌ Get categories error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= GET ALL SUBCATEGORIES ================= */
exports.getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find({ isActive: true })
      .select("name image _id category")
      .populate("category", "name")
      .sort({ name: 1 });
    
    res.json({ 
      success: true, 
      message: "Subcategories fetched successfully",
      data: subcategories 
    });
  } catch (err) {
    console.error("❌ Get subcategories error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= GET SUBCATEGORIES BY CATEGORY ================= */
exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Valid category ID is required" 
      });
    }
    
    const subcategories = await SubCategory.find({ 
      category: categoryId,
      isActive: true 
    })
      .select("name image _id")
      .sort({ name: 1 });
    
    res.json({ 
      success: true, 
      message: "Subcategories fetched successfully",
      data: subcategories 
    });
  } catch (err) {
    console.error("❌ Get subcategories by category error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= GET VENDOR PRODUCTS ================= */
exports.getVendorProducts = async (req, res) => {
  try {
    console.log("🟢 GET VENDOR PRODUCTS API CALLED");
    console.log("📦 Vendor ID:", req.vendor._id);
    
    // Get query parameters
    const { 
      page = 1, 
      limit = 100, 
      search = "",
      category = "",
      isActive = "true",
      hasVariations = ""
    } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Build filter
    const filter = { vendor: req.vendor._id };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brandName: { $regex: search, $options: 'i' } },
        { productTypes: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.category = category;
    }
    
    if (isActive === "true" || isActive === "false") {
      filter.isActive = isActive === "true";
    }
    
    if (hasVariations === "true" || hasVariations === "false") {
      filter.hasVariations = hasVariations === "true";
    }
    
    // Get total count
    const totalProducts = await VendorProduct.countDocuments(filter);
    
    // Get products with pagination
    const products = await VendorProduct.find(filter)
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    // Get vendor details
    const vendor = await Vendor.findById(req.vendor._id).select("storeName restaurantName businessName");
    
    // Calculate stats
    const stats = {
      total: totalProducts,
      inStock: 0,
      lowStock: 0,
      outOfStock: 0,
      withVariations: 0
    };
    
    products.forEach(product => {
      const stockStatus = product.getStockStatus ? product.getStockStatus() : 
        (product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock");
      
      if (stockStatus === "In Stock") stats.inStock++;
      else if (stockStatus === "Low Stock") stats.lowStock++;
      else stats.outOfStock++;
      
      if (product.hasVariations) stats.withVariations++;
    });
    
    res.json({
      success: true,
      message: "Products fetched successfully",
      vendorId: req.vendor._id,
      storeName: vendor?.storeName || vendor?.restaurantName || vendor?.businessName || "My Store",
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalProducts / limitNum),
        totalProducts: totalProducts
      },
      stats: stats
    });
    
  } catch (err) {
    console.error("❌ GET VENDOR PRODUCTS ERROR:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

/* ================= CREATE VENDOR PRODUCT ================= */
exports.createVendorProduct = async (req, res) => {
  try {
    console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
    
    // Get vendor
    const vendor = await Vendor.findById(req.vendor._id);
    if (!vendor) {
      return res.status(404).json({ 
        success: false, 
        message: "Vendor not found" 
      });
    }
    
    const data = { ...req.body };
    
    // Validate required fields
    if (!data.name || !data.name.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Product name is required" 
      });
    }
    
    // Validate category
    const categoryValidation = await validateCategory(data.category, data.subcategory);
    if (!categoryValidation.valid) {
      return res.status(400).json({ 
        success: false, 
        message: categoryValidation.message 
      });
    }
    
    // Process form data
    const productData = processFormData(data, vendor);
    productData.vendor = req.vendor._id;
    
    // Validate price for non-variation products
    if (!productData.hasVariations && (!productData.price || productData.price <= 0)) {
      return res.status(400).json({ 
        success: false, 
        message: "Selling price is required for non-variation products" 
      });
    }
    
    // Validate variations if product has variations
    if (productData.hasVariations) {
      if (!Array.isArray(productData.variations) || productData.variations.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: "At least one variation is required for variation-based products" 
        });
      }
      
      // Validate each variation
      for (let i = 0; i < productData.variations.length; i++) {
        const variation = productData.variations[i];
        if (!variation.newPrice || variation.newPrice <= 0) {
          return res.status(400).json({ 
            success: false, 
            message: `Variation ${i + 1}: Selling price is required` 
          });
        }
        if (!variation.stock && variation.stock !== 0) {
          return res.status(400).json({ 
            success: false, 
            message: `Variation ${i + 1}: Stock quantity is required` 
          });
        }
      }
    }
    
    // Process images
    // Main image
    if (req.files?.image?.[0]) {
      try {
        productData.image = await uploadCloud(req.files.image[0]);
      } catch (error) {
        console.error("Main image upload error:", error);
      }
    }
    
    // Process gallery images
    const galleryImages = [];
    
    // Mandatory images
    const mandatoryImages = [
      { file: req.files?.ingredientsImage?.[0], type: "ingredients" },
      { file: req.files?.nutritionImage?.[0], type: "nutrition" },
      { file: req.files?.mfgExpImage?.[0], type: "mfgExp" }
    ];
    
    for (const img of mandatoryImages) {
      if (img.file) {
        try {
          galleryImages.push(await uploadCloud(img.file));
        } catch (error) {
          console.error(`${img.type} image upload error:`, error);
        }
      }
    }
    
    // Additional gallery images
    if (req.files?.gallery) {
      for (const file of req.files.gallery) {
        try {
          galleryImages.push(await uploadCloud(file));
        } catch (error) {
          console.error("Gallery image upload error:", error);
        }
      }
    }
    
    if (galleryImages.length > 0) {
      productData.gallery = galleryImages;
    }
    
    // Process variation images
    if (productData.hasVariations && productData.variations.length > 0 && req.files?.variationImages) {
      const variationImages = {};
      const variationInfo = data.variationInfo ? 
        (typeof data.variationInfo === 'string' ? JSON.parse(data.variationInfo) : data.variationInfo) : [];
      
      if (Array.isArray(req.files.variationImages)) {
        for (let i = 0; i < Math.min(req.files.variationImages.length, variationInfo.length); i++) {
          try {
            const imgUrl = await uploadCloud(req.files.variationImages[i]);
            variationImages[variationInfo[i]?.index] = imgUrl;
          } catch (error) {
            console.error(`Variation image ${i} upload error:`, error);
          }
        }
      }
      
      // Assign images to variations
      for (let i = 0; i < productData.variations.length; i++) {
        if (variationImages[i]) {
          productData.variations[i].image = variationImages[i];
        }
      }
    }
    
    // Create product
    console.log("📦 Creating product with data:", JSON.stringify(productData, null, 2));
    
    const product = await VendorProduct.create(productData);
    
    // Populate and return
    const populatedProduct = await VendorProduct.findById(product._id)
      .populate("category", "name image")
      .populate("subcategory", "name image");
    
    res.status(201).json({ 
      success: true, 
      message: "Product created successfully",
      data: populatedProduct,
      storeName: vendor.storeName || vendor.restaurantName || ""
    });
    
  } catch (err) {
    console.error("❌ CREATE PRODUCT ERROR:", err);
    console.error("❌ Error details:", err.stack);
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Product with similar details already exists" 
      });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        success: false, 
        message: "Validation failed", 
        errors: errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= UPDATE VENDOR PRODUCT ================= */
exports.updateVendorProduct = async (req, res) => {
  try {
    console.log("🟢 UPDATE VENDOR PRODUCT API CALLED");
    
    // Find product
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found or you don't have permission to edit it" 
      });
    }

    const data = { ...req.body };
    const updateData = {};

    // Validate category if being updated
    if (data.category) {
      const categoryValidation = await validateCategory(data.category, data.subcategory);
      if (!categoryValidation.valid) {
        return res.status(400).json({ 
          success: false, 
          message: categoryValidation.message 
        });
      }
      updateData.category = data.category;
      updateData.subcategory = data.subcategory === 'null' || data.subcategory === '' ? null : data.subcategory;
    }

    // Process form data for updates
    const processedData = processFormData(data, req.vendor);
    
    // Merge processed data into updateData
    Object.keys(processedData).forEach(key => {
      if (key !== 'vendor' && key !== '_id' && processedData[key] !== undefined) {
        updateData[key] = processedData[key];
      }
    });
    
    // Handle images
    if (req.files?.image?.[0]) {
      try {
        updateData.image = await uploadCloud(req.files.image[0]);
      } catch (error) {
        console.error("Main image upload error:", error);
      }
    }
    
    // Handle gallery updates
    let gallery = [...(product.gallery || [])];
    
    // Update mandatory images if provided
    const mandatoryUpdates = [
      { file: req.files?.ingredientsImage?.[0], index: 0 },
      { file: req.files?.nutritionImage?.[0], index: 1 },
      { file: req.files?.mfgExpImage?.[0], index: 2 }
    ];
    
    for (const update of mandatoryUpdates) {
      if (update.file) {
        try {
          const imgUrl = await uploadCloud(update.file);
          gallery[update.index] = imgUrl;
        } catch (error) {
          console.error(`Gallery image update error:`, error);
        }
      }
    }
    
    // Add new gallery images
    if (req.files?.gallery) {
      for (const file of req.files.gallery) {
        try {
          const imgUrl = await uploadCloud(file);
          gallery.push(imgUrl);
        } catch (error) {
          console.error("Gallery image upload error:", error);
        }
      }
    }
    
    // Clean gallery
    gallery = gallery.filter(img => img && img.trim() !== '');
    if (gallery.length > 0 || req.files?.gallery || req.files?.ingredientsImage || req.files?.nutritionImage || req.files?.mfgExpImage) {
      updateData.gallery = gallery;
    }
    
    // Handle variation images
    if (updateData.hasVariations && updateData.variations && updateData.variations.length > 0 && req.files?.variationImages) {
      const variationImages = {};
      const variationInfo = data.variationInfo ? 
        (typeof data.variationInfo === 'string' ? JSON.parse(data.variationInfo) : data.variationInfo) : [];
      
      if (Array.isArray(req.files.variationImages)) {
        for (let i = 0; i < Math.min(req.files.variationImages.length, variationInfo.length); i++) {
          try {
            const imgUrl = await uploadCloud(req.files.variationImages[i]);
            variationImages[variationInfo[i]?.index] = imgUrl;
          } catch (error) {
            console.error(`Variation image ${i} upload error:`, error);
          }
        }
      }
      
      // Assign images to variations
      for (let i = 0; i < updateData.variations.length; i++) {
        if (variationImages[i]) {
          updateData.variations[i].image = variationImages[i];
        } else if (updateData.variations[i].image === undefined && product.variations[i]?.image) {
          // Keep existing image if not updating
          updateData.variations[i].image = product.variations[i].image;
        }
      }
    }
    
    // Update product
    Object.assign(product, updateData);
    await product.save();
    
    // Populate and return
    const populatedProduct = await VendorProduct.findById(product._id)
      .populate("category", "name image")
      .populate("subcategory", "name image");
    
    res.json({ 
      success: true, 
      message: "Product updated successfully",
      data: populatedProduct 
    });
    
  } catch (err) {
    console.error("❌ UPDATE PRODUCT ERROR:", err);
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        success: false, 
        message: "Validation failed", 
        errors: errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= DELETE PRODUCT ================= */
exports.deleteVendorProduct = async (req, res) => {
  try {
    const result = await VendorProduct.deleteOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found or already deleted" 
      });
    }
    
    res.json({ 
      success: true, 
      message: "Product deleted successfully" 
    });
  } catch (err) {
    console.error("❌ Delete product error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= CSV IMPORT ================= */
exports.importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "CSV file is required" 
      });
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
            // Skip empty rows
            if (!r.name && !r._id) {
              errors.push(`Row ${index + 1}: Empty row skipped`);
              continue;
            }

            // Prepare product data
            const productData = {
              name: r.name || "Imported Product",
              description: r.description || "",
              brandName: r.brandName || r.fssaiLicense || "",
              fssaiLicense: r.fssaiLicense || r.brandName || "",
              restaurantName: r.restaurantName || vendor?.storeName || "",
              
              oldPrice: parseFloat(r.oldPrice) || 0,
              price: parseFloat(r.price) || parseFloat(r.newPrice) || 0,
              sellingPrice: parseFloat(r.sellingPrice) || parseFloat(r.price) || parseFloat(r.newPrice) || 0,
              stock: parseInt(r.stock) || 0,
              quality: r.quality || "Standard",
              dietPreference: r.dietPreference || "Veg",
              
              productTypes: r.productTypes || "",
              materialTypes: r.materialTypes || "",
              ingredients: r.ingredients || "",
              customWeight: r.customWeight || "",
              customSizeInput: r.customSizeInput || "",
              customFlavorInput: r.customFlavorInput || "",
              
              ageRange: r.ageRange || "",
              containerType: r.containerType || "",
              itemForm: r.itemForm || "",
              specialty: r.specialty || "",
              itemTypeName: r.itemTypeName || "",
              countryOfOrigin: r.countryOfOrigin || "India",
              
              legalDisclaimer: r.legalDisclaimer || "",
              shelfLife: r.shelfLife || "",
              
              manufacturer: r.manufacturer || r.manufacturerName || "",
              manufacturerContact: r.manufacturerContact || r.manufacturerAddress || "",
              manufacturerName: r.manufacturerName || r.manufacturer || "",
              manufacturerAddress: r.manufacturerAddress || r.manufacturerContact || "",
              
              packerContact: r.packerContact || "",
              packagerName: r.packagerName || "",
              packagerAddress: r.packagerAddress || "",
              packagerFssaiLicense: r.packagerFssaiLicense || "",
              
              marketerNameAddress: r.marketerNameAddress || "",
              marketerName: r.marketerName || "",
              marketerAddress: r.marketerAddress || "",
              
              packageColour: r.packageColour || "",
              measurementUnit: r.measurementUnit || "",
              unitCount: r.unitCount || "",
              numberOfItems: r.numberOfItems || "",
              itemWeight: r.itemWeight || "",
              totalEaches: r.totalEaches || "",
              itemPackageWeight: r.itemPackageWeight || "",
              
              dietaryPreferences: r.dietaryPreferences || "",
              allergenInfo: r.allergenInfo || "",
              allergenInformation: r.allergenInformation || r.allergenInfo || "",
              nutrition: r.nutrition || "",
              cuisine: r.cuisine || "",
              directions: r.directions || "",
              
              State: r.State || "",
              vendor: vendorId,
              isActive: r.isActive !== 'false',
              isFeatured: r.isFeatured === 'true',
              isApproved: r.isApproved === 'true'
            };

            // Handle arrays
            if (r.flavors) {
              productData.flavors = r.flavors.startsWith('[') ? 
                JSON.parse(r.flavors) : 
                r.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
            }
            
            if (r.size) {
              productData.size = r.size.startsWith('[') ? 
                JSON.parse(r.size) : 
                r.size.split(',').map(s => s.trim()).filter(s => s !== '');
            }
            
            if (r.variations && r.variations.startsWith('[')) {
              try {
                productData.variations = JSON.parse(r.variations);
                productData.hasVariations = productData.variations.length > 0;
              } catch (e) {
                productData.hasVariations = false;
              }
            }

            if (r._id) {
              // Update existing
              await VendorProduct.updateOne(
                { _id: r._id, vendor: vendorId },
                { $set: productData }
              );
              updated++;
            } else {
              // Create new
              await VendorProduct.create(productData);
              created++;
            }
          } catch (error) {
            errors.push(`Row ${index + 1}: ${error.message}`);
          }
        }

        // Clean up file
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        res.json({
          success: true,
          message: `CSV import completed: ${created} created, ${updated} updated`,
          created,
          updated,
          total: rows.length,
          errors: errors.length > 0 ? errors : undefined,
        });
      });
  } catch (err) {
    console.error("❌ CSV import error:", err);
    
    // Clean up file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false, 
      message: "CSV Import Failed: " + err.message 
    });
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

    // Transform data for CSV
    const transformedProducts = products.map(product => ({
      _id: product._id,
      name: product.name,
      description: product.description,
      brandName: product.brandName,
      fssaiLicense: product.fssaiLicense,
      restaurantName: product.restaurantName,
      hasVariations: product.hasVariations,
      variations: JSON.stringify(product.variations || []),
      oldPrice: product.oldPrice,
      price: product.price,
      sellingPrice: product.sellingPrice,
      stock: product.stock,
      quality: product.quality,
      dietPreference: product.dietPreference,
      category: product.category?.name || "",
      subcategory: product.subcategory?.name || "",
      categoryId: product.category?._id || "",
      subcategoryId: product.subcategory?._id || "",
      productTypes: product.productTypes,
      flavors: JSON.stringify(product.flavors || []),
      size: JSON.stringify(product.size || []),
      materialTypes: product.materialTypes,
      ingredients: product.ingredients,
      customWeight: product.customWeight,
      customSizeInput: product.customSizeInput,
      customFlavorInput: product.customFlavorInput,
      ageRange: product.ageRange,
      containerType: product.containerType,
      itemForm: product.itemForm,
      specialty: product.specialty,
      itemTypeName: product.itemTypeName,
      countryOfOrigin: product.countryOfOrigin,
      legalDisclaimer: product.legalDisclaimer,
      shelfLife: product.shelfLife,
      manufacturer: product.manufacturer,
      manufacturerContact: product.manufacturerContact,
      manufacturerName: product.manufacturerName,
      manufacturerAddress: product.manufacturerAddress,
      packerContact: product.packerContact,
      packagerName: product.packagerName,
      packagerAddress: product.packagerAddress,
      packagerFssaiLicense: product.packagerFssaiLicense,
      marketerNameAddress: product.marketerNameAddress,
      marketerName: product.marketerName,
      marketerAddress: product.marketerAddress,
      packageColour: product.packageColour,
      measurementUnit: product.measurementUnit,
      unitCount: product.unitCount,
      numberOfItems: product.numberOfItems,
      itemWeight: product.itemWeight,
      totalEaches: product.totalEaches,
      itemPackageWeight: product.itemPackageWeight,
      dietaryPreferences: product.dietaryPreferences,
      allergenInfo: product.allergenInfo,
      allergenInformation: product.allergenInformation,
      nutrition: product.nutrition,
      cuisine: product.cuisine,
      directions: product.directions,
      State: product.State,
      image: product.image,
      gallery: JSON.stringify(product.gallery || []),
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      isApproved: product.isApproved,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    const fields = [
      '_id', 'name', 'description', 'brandName', 'fssaiLicense', 'restaurantName',
      'hasVariations', 'variations', 'oldPrice', 'price', 'sellingPrice', 'stock',
      'quality', 'dietPreference', 'category', 'subcategory', 'categoryId', 'subcategoryId',
      'productTypes', 'flavors', 'size', 'materialTypes', 'ingredients', 'customWeight',
      'customSizeInput', 'customFlavorInput', 'ageRange', 'containerType', 'itemForm',
      'specialty', 'itemTypeName', 'countryOfOrigin', 'legalDisclaimer', 'shelfLife',
      'manufacturer', 'manufacturerContact', 'manufacturerName', 'manufacturerAddress',
      'packerContact', 'packagerName', 'packagerAddress', 'packagerFssaiLicense',
      'marketerNameAddress', 'marketerName', 'marketerAddress', 'packageColour',
      'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight', 'totalEaches',
      'itemPackageWeight', 'dietaryPreferences', 'allergenInfo', 'allergenInformation',
      'nutrition', 'cuisine', 'directions', 'State', 'image', 'gallery', 'isActive',
      'isFeatured', 'isApproved', 'createdAt', 'updatedAt'
    ];

    const parser = new Parser({ fields });
    const csvData = parser.parse(transformedProducts);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=vendor_products_${Date.now()}.csv`
    );
    res.send(csvData);
  } catch (err) {
    console.error("❌ CSV export error:", err);
    res.status(500).json({ 
      success: false, 
      message: "CSV Export Failed: " + err.message 
    });
  }
};

/* ================= BULK UPDATE ================= */
exports.bulkUpdate = async (req, res) => {
  try {
    const { ids, data } = req.body;
    
    if (!ids?.length) {
      return res.status(400).json({ 
        success: false, 
        message: "Product IDs are required" 
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Update data is required" 
      });
    }

    // Prepare update data
    const updateData = { ...data };
    
    // Handle price field mapping
    if (updateData.newPrice !== undefined) {
      updateData.price = updateData.newPrice;
      updateData.sellingPrice = updateData.newPrice;
      delete updateData.newPrice;
    }
    
    // Handle array fields
    if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
      try {
        updateData.flavors = JSON.parse(updateData.flavors);
      } catch (error) {
        updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
      }
    }
    
    if (updateData.size !== undefined && typeof updateData.size === 'string') {
      try {
        updateData.size = JSON.parse(updateData.size);
      } catch (error) {
        updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
      }
    }

    // Update products
    const result = await VendorProduct.updateMany(
      { _id: { $in: ids }, vendor: req.vendor._id },
      { $set: updateData }
    );

    res.json({ 
      success: true, 
      message: `${result.modifiedCount} products updated successfully`,
      modified: result.modifiedCount 
    });
  } catch (err) {
    console.error("❌ Bulk update error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Bulk update failed: " + err.message 
    });
  }
};

/* ================= BULK DELETE ================= */
exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids?.length) {
      return res.status(400).json({ 
        success: false, 
        message: "Product IDs are required" 
      });
    }

    const result = await VendorProduct.deleteMany({
      _id: { $in: ids },
      vendor: req.vendor._id,
    });

    res.json({ 
      success: true, 
      message: `${result.deletedCount} products deleted successfully`,
      deleted: result.deletedCount 
    });
  } catch (err) {
    console.error("❌ Bulk delete error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Bulk delete failed: " + err.message 
    });
  }
};

/* ================= GET SINGLE PRODUCT ================= */
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    })
      .populate("category", "name image description")
      .populate("subcategory", "name image");

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Product fetched successfully",
      data: product 
    });
  } catch (err) {
    console.error("❌ Get single product error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= HEALTH CHECK ================= */
exports.healthCheck = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id);
    const productCount = await VendorProduct.countDocuments({ vendor: req.vendor._id });
    
    res.json({
      success: true,
      message: "Vendor Products API is healthy",
      vendor: {
        id: vendor._id,
        name: vendor.storeName || vendor.restaurantName || vendor.businessName,
        email: vendor.email
      },
      stats: {
        totalProducts: productCount,
        activeProducts: await VendorProduct.countDocuments({ vendor: req.vendor._id, isActive: true }),
        featuredProducts: await VendorProduct.countDocuments({ vendor: req.vendor._id, isFeatured: true }),
        approvedProducts: await VendorProduct.countDocuments({ vendor: req.vendor._id, isApproved: true })
      },
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (err) {
    console.error("❌ Health check error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Health check failed: " + err.message 
    });
  }
};

