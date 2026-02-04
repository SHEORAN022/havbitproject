





// // const VendorProduct = require("../models/VendorProduct");
// // const Vendor = require("../models/Vendor");
// // const Category = require("../models/Category");
// // const SubCategory = require("../models/SubCategory");
// // const cloudinary = require("../config/cloudinary");

// // const csv = require("csv-parser");
// // const fs = require("fs");
// // const { Parser } = require("json2csv");

// // /* ================= CLOUDINARY UPLOAD ================= */
// // async function uploadCloud(file) {
// //   try {
// //     const base64 = file.buffer.toString("base64");
// //     const dataUri = `data:${file.mimetype};base64,${base64}`;
// //     const result = await cloudinary.uploader.upload(dataUri, {
// //       folder: "vendor_products",
// //       resource_type: "auto",
// //     });
// //     return result.secure_url;
// //   } catch (error) {
// //     console.error("Cloudinary upload error:", error);
// //     throw error;
// //   }
// // }

// // /* ================= GET CATEGORIES ================= */
// // exports.getCategories = async (req, res) => {
// //   try {
// //     const categories = await Category.find({ isActive: true })
// //       .select("name image _id")
// //       .sort({ name: 1 });
    
// //     res.json({ success: true, data: categories });
// //   } catch (err) {
// //     console.error("Get categories error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= GET SUBCATEGORIES ================= */
// // exports.getSubCategories = async (req, res) => {
// //   try {
// //     const { categoryId } = req.params;
    
// //     const subcategories = await SubCategory.find({ 
// //       category: categoryId,
// //       isActive: true 
// //     })
// //       .select("name image _id")
// //       .sort({ name: 1 });
    
// //     res.json({ success: true, data: subcategories });
// //   } catch (err) {
// //     console.error("Get subcategories error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= GET VENDOR PRODUCTS ================= */
// // exports.getVendorProducts = async (req, res) => {
// //   try {
// //     const products = await VendorProduct.find({
// //       vendor: req.vendor._id,
// //     })
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image");

// //     const vendor = await Vendor.findById(req.vendor._id);

// //     res.json({
// //       success: true,
// //       vendorId: vendor._id,
// //       storeName: vendor.storeName || "",
// //       data: products,
// //     });
// //   } catch (err) {
// //     console.error("Get products error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= CREATE VENDOR PRODUCT ================= */
// // exports.createVendorProduct = async (req, res) => {
// //   try {
// //     console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
// //     console.log("📦 Request body keys:", Object.keys(req.body));
    
// //     const vendor = await Vendor.findById(req.vendor._id);
// //     if (!vendor) {
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "Vendor not found" 
// //       });
// //     }
    
// //     const data = { ...req.body };
    
// //     // Step 1: Category Validation
// //     if (data.category) {
// //       const categoryExists = await Category.findById(data.category);
// //       if (!categoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid category selected" 
// //         });
// //       }
// //     }

// //     // ✅ MAJOR FIX: Subcategory validation - NO POPULATE, direct field check
// //     if (data.subcategory) {
// //       const subcategoryExists = await SubCategory.findById(data.subcategory);
// //       if (!subcategoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid subcategory selected" 
// //         });
// //       }
      
// //       // ✅ FIX: Check the actual field name from SubCategory model
// //       // SubCategory model mein field ka naam check karo - could be:
// //       // - category (common)
// //       // - parent (some models use this)
// //       // - categoryId (some use this)
      
// //       if (data.category && subcategoryExists.category) {
// //         const subcatCategoryId = subcategoryExists.category.toString();
// //         if (subcatCategoryId !== data.category) {
// //           return res.status(400).json({ 
// //             success: false, 
// //             message: "Subcategory does not belong to selected category" 
// //           });
// //         }
// //       } else if (data.category && subcategoryExists.parent) {
// //         // If field is named 'parent' instead of 'category'
// //         const subcatCategoryId = subcategoryExists.parent.toString();
// //         if (subcatCategoryId !== data.category) {
// //           return res.status(400).json({ 
// //             success: false, 
// //             message: "Subcategory does not belong to selected category" 
// //           });
// //         }
// //       }
// //       // Note: If no category field found in subcategory, skip validation
// //     }
    
// //     // Step 2: Parse data - handle formData or direct fields
// //     let productData = {};
    
// //     // If formData exists, process it
// //     if (data.formData && typeof data.formData === 'string') {
// //       try {
// //         data.formData = JSON.parse(data.formData);
// //       } catch (e) {
// //         console.log("Could not parse formData string");
// //       }
// //     }
    
// //     if (data.formData && typeof data.formData === 'object') {
// //       console.log("📦 Processing formData structure");
      
// //       // Step 1: Category Selection
// //       productData.category = data.category || data.selectedCategory || data.formData.basic?.category;
// //       productData.subcategory = data.subcategory || data.selectedSubCategory || data.formData.basic?.subcategory;
      
// //       // Step 2: Basic Information
// //       productData.name = data.formData.basic?.name || data.name || "";
// //       productData.description = data.formData.basic?.description || data.description || "";
// //       productData.restaurantName = vendor.storeName || data.formData.basic?.restaurantName || "";
      
// //       // Step 3: Product Details - Pricing
// //       if (data.formData.pricing) {
// //         productData.oldPrice = Number(data.formData.pricing.oldPrice || 0);
// //         productData.price = Number(data.formData.pricing.newPrice || 0);
// //         productData.stock = Number(data.formData.pricing.stock || 0);
// //         productData.quality = data.formData.pricing.quality || "Standard";
// //         productData.dietPreference = data.formData.pricing.dietPreference || "Veg";
// //       } else {
// //         productData.oldPrice = Number(data.oldPrice || 0);
// //         productData.price = Number(data.newPrice || data.price || 0);
// //         productData.stock = Number(data.stock || 0);
// //         productData.quality = data.quality || "Standard";
// //         productData.dietPreference = data.dietPreference || "Veg";
// //       }
      
// //       // Step 3: Product Details - Specifications
// //       if (data.formData.details) {
// //         productData.productTypes = data.formData.details.productTypes || "";
// //         productData.ingredients = data.formData.details.ingredients || "";
// //         productData.materialTypes = data.formData.details.materialTypes || "";
// //         productData.customWeight = data.formData.details.customWeight || "";
// //         productData.customSizeInput = data.formData.details.customSizeInput || "";
// //         productData.ageRange = data.formData.details.ageRange || "";
// //         productData.containerType = data.formData.details.containerType || "";
// //         productData.itemForm = data.formData.details.itemForm || "";
// //         productData.specialty = data.formData.details.specialty || "";
// //         productData.itemTypeName = data.formData.details.itemTypeName || "";
// //         productData.countryOfOrigin = data.formData.details.countryOfOrigin || "";
        
// //         // Flavors - ARRAY FORMAT
// //         const flavorsArray = [];
// //         if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
// //           flavorsArray.push(...data.formData.details.flavors);
// //         }
// //         if (data.formData.details.customFlavorInput) {
// //           flavorsArray.push(data.formData.details.customFlavorInput);
// //         }
// //         productData.flavors = flavorsArray.filter(f => f && f.trim() !== '');
        
// //         // Size - ARRAY FORMAT
// //         const sizeArray = [];
// //         if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
// //           sizeArray.push(...data.formData.details.size);
// //         }
// //         if (data.formData.details.customSizeInput) {
// //           sizeArray.push(data.formData.details.customSizeInput);
// //         }
// //         productData.size = sizeArray.filter(s => s && s.trim() !== '');
// //       } else {
// //         // Handle direct fields
// //         productData.productTypes = data.productTypes || "";
// //         productData.ingredients = data.ingredients || "";
// //         productData.materialTypes = data.materialTypes || "";
// //         productData.customWeight = data.customWeight || "";
// //         productData.customSizeInput = data.customSizeInput || "";
// //         productData.ageRange = data.ageRange || "";
// //         productData.containerType = data.containerType || "";
// //         productData.itemForm = data.itemForm || "";
// //         productData.specialty = data.specialty || "";
// //         productData.itemTypeName = data.itemTypeName || "";
// //         productData.countryOfOrigin = data.countryOfOrigin || "";
        
// //         // Flavors from direct fields
// //         if (data.flavors) {
// //           if (typeof data.flavors === 'string') {
// //             productData.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
// //           } else if (Array.isArray(data.flavors)) {
// //             productData.flavors = data.flavors.filter(f => f && f.trim() !== '');
// //           } else {
// //             productData.flavors = [];
// //           }
// //         } else {
// //           productData.flavors = [];
// //         }
        
// //         // Size from direct fields
// //         if (data.size) {
// //           if (typeof data.size === 'string') {
// //             productData.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
// //           } else if (Array.isArray(data.size)) {
// //             productData.size = data.size.filter(s => s && s.trim() !== '');
// //           } else {
// //             productData.size = [];
// //           }
// //         } else {
// //           productData.size = [];
// //         }
// //       }
      
// //       // Location
// //       if (data.formData.location) {
// //         productData.State = data.formData.location.state || "";
// //       } else {
// //         productData.State = data.State || "";
// //       }
      
// //       // Step 4: Manufacturing & Marketing
// //       if (data.formData.compliance) {
// //         productData.brandName = data.formData.compliance.fssaiLicense || "";
// //         productData.fssaiLicense = data.formData.compliance.fssaiLicense || "";
// //         productData.legalDisclaimer = data.formData.compliance.legalDisclaimer || "";
// //       } else {
// //         productData.brandName = data.brandName || data.fssaiLicenseNumber || "";
// //         productData.fssaiLicense = data.fssaiLicense || data.fssaiLicenseNumber || "";
// //         productData.legalDisclaimer = data.legalDisclaimer || "";
// //       }
      
// //       if (data.formData.manufacturing) {
// //         productData.manufacturer = data.formData.manufacturing.manufacturerName || "";
// //         productData.manufacturerContact = data.formData.manufacturing.manufacturerAddress || "";
        
// //         // Packager - combine name and address
// //         let packerContact = "";
// //         if (data.formData.manufacturing.packagerName) {
// //           packerContact = data.formData.manufacturing.packagerName;
// //           if (data.formData.manufacturing.packagerAddress) {
// //             packerContact += `, ${data.formData.manufacturing.packagerAddress}`;
// //           }
// //         }
// //         productData.packerContact = packerContact;
        
// //         // Marketer - combine name and address
// //         let marketerNameAddress = "";
// //         if (data.formData.manufacturing.marketerName) {
// //           marketerNameAddress = data.formData.manufacturing.marketerName;
// //           if (data.formData.manufacturing.marketerAddress) {
// //             marketerNameAddress += `, ${data.formData.manufacturing.marketerAddress}`;
// //           }
// //         }
// //         productData.marketerNameAddress = marketerNameAddress;
// //       } else {
// //         productData.manufacturer = data.manufacturer || "";
// //         productData.manufacturerContact = data.manufacturerContact || "";
// //         productData.packerContact = data.packerContact || "";
// //         productData.marketerNameAddress = data.marketerNameAddress || "";
// //       }
      
// //       // Step 5: Package & Dietary
// //       if (data.formData.package) {
// //         productData.packageColour = data.formData.package.packageColour || "";
// //         productData.measurementUnit = data.formData.package.measurementUnit || "";
// //         productData.unitCount = data.formData.package.unitCount || "";
// //         productData.numberOfItems = data.formData.package.numberOfItems || "";
// //         productData.itemWeight = data.formData.package.itemWeight || "";
// //         productData.totalEaches = data.formData.package.totalEaches || "";
// //         productData.itemPackageWeight = data.formData.package.itemPackageWeight || "";
// //         productData.shelfLife = data.formData.package.shelfLife || "";
// //       } else {
// //         productData.packageColour = data.packageColour || "";
// //         productData.measurementUnit = data.measurementUnit || "";
// //         productData.unitCount = data.unitCount || "";
// //         productData.numberOfItems = data.numberOfItems || "";
// //         productData.itemWeight = data.itemWeight || "";
// //         productData.totalEaches = data.totalEaches || "";
// //         productData.itemPackageWeight = data.itemPackageWeight || "";
// //         productData.shelfLife = data.shelfLife || "";
// //       }
      
// //       if (data.formData.dietary) {
// //         productData.dietaryPreferences = data.formData.dietary.dietaryPreferences || "";
// //         productData.allergenInformation = data.formData.dietary.allergenInformation || "";
// //         productData.nutrition = data.formData.dietary.nutrition || "";
// //         productData.cuisine = data.formData.dietary.cuisine || "";
// //         productData.directions = data.formData.dietary.directions || "";
// //       } else {
// //         productData.dietaryPreferences = data.dietaryPreferences || "";
// //         productData.allergenInformation = data.allergenInformation || "";
// //         productData.nutrition = data.nutrition || "";
// //         productData.cuisine = data.cuisine || "";
// //         productData.directions = data.directions || "";
// //       }
// //     } else {
// //       // Direct fields without formData
// //       productData = {
// //         // Basic
// //         name: data.name || "",
// //         description: data.description || "",
// //         restaurantName: vendor.storeName || data.restaurantName || "",
        
// //         // Pricing
// //         oldPrice: Number(data.oldPrice || 0),
// //         price: Number(data.newPrice || data.price || 0),
// //         stock: Number(data.stock || 0),
// //         quality: data.quality || "Standard",
// //         dietPreference: data.dietPreference || "Veg",
        
// //         // Category
// //         category: data.category || data.selectedCategory,
// //         subcategory: data.subcategory || data.selectedSubCategory,
        
// //         // Details
// //         productTypes: data.productTypes || "",
// //         ingredients: data.ingredients || "",
// //         materialTypes: data.materialTypes || "",
// //         customWeight: data.customWeight || "",
// //         customSizeInput: data.customSizeInput || "",
// //         ageRange: data.ageRange || "",
// //         containerType: data.containerType || "",
// //         itemForm: data.itemForm || "",
// //         specialty: data.specialty || "",
// //         itemTypeName: data.itemTypeName || "",
// //         countryOfOrigin: data.countryOfOrigin || "",
        
// //         // Flavors array
// //         flavors: data.flavors ? (typeof data.flavors === 'string' ? 
// //           data.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : 
// //           (Array.isArray(data.flavors) ? data.flavors.filter(f => f && f.trim() !== '') : [])) : [],
        
// //         // Size array
// //         size: data.size ? (typeof data.size === 'string' ? 
// //           data.size.split(',').map(s => s.trim()).filter(s => s !== '') : 
// //           (Array.isArray(data.size) ? data.size.filter(s => s && s.trim() !== '') : [])) : [],
        
// //         // FSSAI - DONO FIELDS
// //         brandName: data.brandName || data.fssaiLicenseNumber || "",
// //         fssaiLicense: data.fssaiLicense || data.fssaiLicenseNumber || "",
// //         legalDisclaimer: data.legalDisclaimer || "",
        
// //         // Manufacturing
// //         manufacturer: data.manufacturer || "",
// //         manufacturerContact: data.manufacturerContact || "",
// //         packerContact: data.packerContact || "",
// //         marketerNameAddress: data.marketerNameAddress || "",
        
// //         // Package
// //         packageColour: data.packageColour || "",
// //         measurementUnit: data.measurementUnit || "",
// //         unitCount: data.unitCount || "",
// //         numberOfItems: data.numberOfItems || "",
// //         itemWeight: data.itemWeight || "",
// //         totalEaches: data.totalEaches || "",
// //         itemPackageWeight: data.itemPackageWeight || "",
// //         shelfLife: data.shelfLife || "",
        
// //         // Dietary
// //         dietaryPreferences: data.dietaryPreferences || "",
// //         allergenInformation: data.allergenInformation || "",
// //         nutrition: data.nutrition || "",
// //         cuisine: data.cuisine || "",
// //         directions: data.directions || "",
        
// //         // Location
// //         State: data.State || "",
// //       };
// //     }
    
// //     // Required validation
// //     if (!productData.name || !productData.price || !productData.category) {
// //       console.log("❌ Validation failed:", {
// //         name: productData.name,
// //         price: productData.price,
// //         category: productData.category
// //       });
      
// //       return res.status(400).json({
// //         success: false,
// //         message: "Name, price and category are required",
// //         received: productData
// //       });
// //     }
    
// //     // Step 6: Process images
// //     let mainImage = null;
// //     const galleryImages = [];
    
// //     // Main image
// //     if (req.files?.image?.[0]) {
// //       try {
// //         mainImage = await uploadCloud(req.files.image[0]);
// //         productData.image = mainImage;
// //       } catch (error) {
// //         console.error("Main image upload error:", error);
// //       }
// //     }
    
// //     // Mandatory images - gallery[0], gallery[1], gallery[2]
// //     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0]);
// //         galleryImages[0] = img;
// //       } catch (error) {
// //         console.error("Ingredients image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0]);
// //         galleryImages[1] = img;
// //       } catch (error) {
// //         console.error("Nutrition image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0]);
// //         galleryImages[2] = img;
// //       } catch (error) {
// //         console.error("MFG/EXP image upload error:", error);
// //       }
// //     }
    
// //     // Additional gallery images
// //     if (req.files?.gallery) {
// //       for (const file of req.files.gallery) {
// //         try {
// //           const img = await uploadCloud(file);
// //           galleryImages.push(img);
// //         } catch (error) {
// //           console.error("Gallery image upload error:", error);
// //         }
// //       }
// //     }
    
// //     // Clean gallery
// //     const cleanGallery = galleryImages.filter(img => img && img.trim() !== '');
// //     if (cleanGallery.length > 0) {
// //       productData.gallery = cleanGallery;
// //     }
    
// //     // Add vendor ID
// //     productData.vendor = req.vendor._id;
    
// //     // Debug log
// //     console.log("📦 Final product data:", JSON.stringify(productData, null, 2));
    
// //     // Create product
// //     const product = await VendorProduct.create(productData);
    
// //     // Populate and return
// //     const populatedProduct = await VendorProduct.findById(product._id)
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image");
    
// //     res.json({ 
// //       success: true, 
// //       data: populatedProduct,
// //       storeName: vendor.storeName || ""
// //     });
    
// //   } catch (err) {
// //     console.error("❌ CREATE PRODUCT ERROR:", err);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Server Error: " + err.message,
// //       stack: err.stack 
// //     });
// //   }
// // };

// // /* ================= UPDATE VENDOR PRODUCT ================= */
// // exports.updateVendorProduct = async (req, res) => {
// //   try {
// //     console.log("🟢 UPDATE VENDOR PRODUCT API CALLED");
    
// //     const product = await VendorProduct.findOne({
// //       _id: req.params.id,
// //       vendor: req.vendor._id,
// //     });

// //     if (!product) {
// //       return res.status(404).json({ success: false, message: "Product not found" });
// //     }

// //     const data = { ...req.body };
// //     const updateData = {};

// //     // Category validation
// //     if (data.category) {
// //       const categoryExists = await Category.findById(data.category);
// //       if (!categoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid category selected" 
// //         });
// //       }
// //       updateData.category = data.category;
// //     }

// //     // ✅ MAJOR FIX: Subcategory validation - NO POPULATE, direct field check
// //     if (data.subcategory) {
// //       const subcategoryExists = await SubCategory.findById(data.subcategory);
// //       if (!subcategoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid subcategory selected" 
// //         });
// //       }
      
// //       // ✅ FIX: Check the actual field name from SubCategory model
// //       if (data.category && subcategoryExists.category) {
// //         const subcatCategoryId = subcategoryExists.category.toString();
// //         if (subcatCategoryId !== data.category) {
// //           return res.status(400).json({ 
// //             success: false, 
// //             message: "Subcategory does not belong to selected category" 
// //           });
// //         }
// //       } else if (data.category && subcategoryExists.parent) {
// //         // If field is named 'parent' instead of 'category'
// //         const subcatCategoryId = subcategoryExists.parent.toString();
// //         if (subcatCategoryId !== data.category) {
// //           return res.status(400).json({ 
// //             success: false, 
// //             message: "Subcategory does not belong to selected category" 
// //           });
// //         }
// //       }
// //       updateData.subcategory = data.subcategory;
// //     }
    
// //     // Process formData if present
// //     if (data.formData && typeof data.formData === 'string') {
// //       try {
// //         data.formData = JSON.parse(data.formData);
// //       } catch (e) {
// //         console.log("Could not parse formData string");
// //       }
// //     }
    
// //     if (data.formData && typeof data.formData === 'object') {
// //       // Process formData fields
// //       const fieldsMapping = {
// //         // Basic
// //         name: 'formData.basic.name',
// //         description: 'formData.basic.description',
        
// //         // Pricing
// //         oldPrice: 'formData.pricing.oldPrice',
// //         price: 'formData.pricing.newPrice',
// //         stock: 'formData.pricing.stock',
// //         quality: 'formData.pricing.quality',
// //         dietPreference: 'formData.pricing.dietPreference',
        
// //         // Details
// //         productTypes: 'formData.details.productTypes',
// //         ingredients: 'formData.details.ingredients',
// //         materialTypes: 'formData.details.materialTypes',
// //         customWeight: 'formData.details.customWeight',
// //         customSizeInput: 'formData.details.customSizeInput',
// //         ageRange: 'formData.details.ageRange',
// //         containerType: 'formData.details.containerType',
// //         itemForm: 'formData.details.itemForm',
// //         specialty: 'formData.details.specialty',
// //         itemTypeName: 'formData.details.itemTypeName',
// //         countryOfOrigin: 'formData.details.countryOfOrigin',
        
// //         // Location
// //         State: 'formData.location.state',
        
// //         // Compliance
// //         brandName: 'formData.compliance.fssaiLicense',
// //         fssaiLicense: 'formData.compliance.fssaiLicense',
// //         legalDisclaimer: 'formData.compliance.legalDisclaimer',
        
// //         // Manufacturing
// //         manufacturer: 'formData.manufacturing.manufacturerName',
// //         manufacturerContact: 'formData.manufacturing.manufacturerAddress',
        
// //         // Package
// //         packageColour: 'formData.package.packageColour',
// //         measurementUnit: 'formData.package.measurementUnit',
// //         unitCount: 'formData.package.unitCount',
// //         numberOfItems: 'formData.package.numberOfItems',
// //         itemWeight: 'formData.package.itemWeight',
// //         totalEaches: 'formData.package.totalEaches',
// //         itemPackageWeight: 'formData.package.itemPackageWeight',
// //         shelfLife: 'formData.package.shelfLife',
        
// //         // Dietary
// //         dietaryPreferences: 'formData.dietary.dietaryPreferences',
// //         allergenInformation: 'formData.dietary.allergenInformation',
// //         nutrition: 'formData.dietary.nutrition',
// //         cuisine: 'formData.dietary.cuisine',
// //         directions: 'formData.dietary.directions',
// //       };
      
// //       // Process each field
// //       Object.keys(fieldsMapping).forEach(field => {
// //         const path = fieldsMapping[field];
// //         const value = path.split('.').reduce((obj, key) => obj?.[key], data);
// //         if (value !== undefined) {
// //           if (field === 'oldPrice' || field === 'price' || field === 'stock') {
// //             updateData[field] = Number(value) || 0;
// //           } else {
// //             updateData[field] = value;
// //           }
// //         }
// //       });
      
// //       // Handle packer contact (combined)
// //       if (data.formData.manufacturing?.packagerName !== undefined || 
// //           data.formData.manufacturing?.packagerAddress !== undefined) {
// //         let packerContact = "";
// //         if (data.formData.manufacturing.packagerName) {
// //           packerContact = data.formData.manufacturing.packagerName;
// //           if (data.formData.manufacturing.packagerAddress) {
// //             packerContact += `, ${data.formData.manufacturing.packagerAddress}`;
// //           }
// //         }
// //         updateData.packerContact = packerContact;
// //       }
      
// //       // Handle marketer info (combined)
// //       if (data.formData.manufacturing?.marketerName !== undefined || 
// //           data.formData.manufacturing?.marketerAddress !== undefined) {
// //         let marketerNameAddress = "";
// //         if (data.formData.manufacturing.marketerName) {
// //           marketerNameAddress = data.formData.manufacturing.marketerName;
// //           if (data.formData.manufacturing.marketerAddress) {
// //             marketerNameAddress += `, ${data.formData.manufacturing.marketerAddress}`;
// //           }
// //         }
// //         updateData.marketerNameAddress = marketerNameAddress;
// //       }
      
// //       // Handle flavors array
// //       if (data.formData.details?.flavors !== undefined || 
// //           data.formData.details?.customFlavorInput !== undefined) {
// //         const flavorsArray = [];
// //         if (Array.isArray(data.formData.details.flavors)) {
// //           flavorsArray.push(...data.formData.details.flavors);
// //         }
// //         if (data.formData.details.customFlavorInput) {
// //           flavorsArray.push(data.formData.details.customFlavorInput);
// //         }
// //         updateData.flavors = flavorsArray.filter(f => f && f.trim() !== '');
// //       }
      
// //       // Handle size array
// //       if (data.formData.details?.size !== undefined || 
// //           data.formData.details?.customSizeInput !== undefined) {
// //         const sizeArray = [];
// //         if (Array.isArray(data.formData.details.size)) {
// //           sizeArray.push(...data.formData.details.size);
// //         }
// //         if (data.formData.details.customSizeInput) {
// //           sizeArray.push(data.formData.details.customSizeInput);
// //         }
// //         updateData.size = sizeArray.filter(s => s && s.trim() !== '');
// //       }
// //     } else {
// //       // Handle direct field updates
// //       const directFields = [
// //         'name', 'description', 'restaurantName',
// //         'oldPrice', 'price', 'newPrice', 'stock', 'quality', 'dietPreference',
// //         'productTypes', 'ingredients', 'materialTypes', 'customWeight', 'customSizeInput',
// //         'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
// //         'brandName', 'fssaiLicense', 'legalDisclaimer',
// //         'manufacturer', 'manufacturerContact', 'packerContact', 'marketerNameAddress',
// //         'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight',
// //         'totalEaches', 'itemPackageWeight', 'shelfLife',
// //         'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
// //         'State'
// //       ];
      
// //       directFields.forEach(field => {
// //         if (data[field] !== undefined) {
// //           if (field === 'newPrice') {
// //             updateData.price = Number(data[field]);
// //           } else if (field === 'oldPrice' || field === 'price' || field === 'stock') {
// //             updateData[field] = Number(data[field]);
// //           } else {
// //             updateData[field] = data[field];
// //           }
// //         }
// //       });
      
// //       // Handle flavors array
// //       if (data.flavors !== undefined) {
// //         if (typeof data.flavors === 'string') {
// //           updateData.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
// //         } else if (Array.isArray(data.flavors)) {
// //           updateData.flavors = data.flavors.filter(f => f && f.trim() !== '');
// //         }
// //       }
      
// //       // Handle size array
// //       if (data.size !== undefined) {
// //         if (typeof data.size === 'string') {
// //           updateData.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
// //         } else if (Array.isArray(data.size)) {
// //           updateData.size = data.size.filter(s => s && s.trim() !== '');
// //         }
// //       }
// //     }
    
// //     // Update images
// //     if (req.files?.image?.[0]) {
// //       try {
// //         updateData.image = await uploadCloud(req.files.image[0]);
// //       } catch (error) {
// //         console.error("Image upload error:", error);
// //       }
// //     }
    
// //     // Update gallery
// //     let gallery = [...(product.gallery || [])];
    
// //     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0]);
// //         gallery[0] = img;
// //       } catch (error) {
// //         console.error("Ingredients image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0]);
// //         gallery[1] = img;
// //       } catch (error) {
// //         console.error("Nutrition image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0]);
// //         gallery[2] = img;
// //       } catch (error) {
// //         console.error("MFG/EXP image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.gallery) {
// //       for (const file of req.files.gallery) {
// //         try {
// //           const img = await uploadCloud(file);
// //           gallery.push(img);
// //         } catch (error) {
// //           console.error("Gallery image upload error:", error);
// //         }
// //       }
// //     }
    
// //     // Clean gallery
// //     gallery = gallery.filter(img => img && img.trim() !== '');
// //     if (gallery.length > 0) {
// //       updateData.gallery = gallery;
// //     }
    
// //     // Update product
// //     Object.assign(product, updateData);
// //     await product.save();
    
// //     // Populate and return
// //     const populatedProduct = await VendorProduct.findById(product._id)
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image");
    
// //     res.json({ success: true, data: populatedProduct });
    
// //   } catch (err) {
// //     console.error("❌ UPDATE PRODUCT ERROR:", err);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Server Error: " + err.message 
// //     });
// //   }
// // };

// // /* ================= DELETE PRODUCT ================= */
// // exports.deleteVendorProduct = async (req, res) => {
// //   try {
// //     await VendorProduct.deleteOne({
// //       _id: req.params.id,
// //       vendor: req.vendor._id,
// //     });
// //     res.json({ success: true });
// //   } catch (err) {
// //     console.error("Delete product error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= CSV IMPORT ================= */
// // exports.importCSV = async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ message: "CSV file required" });
// //     }

// //     const vendorId = req.vendor._id;
// //     const vendor = await Vendor.findById(vendorId);
// //     const rows = [];

// //     fs.createReadStream(req.file.path)
// //       .pipe(csv())
// //       .on("data", (row) => rows.push(row))
// //       .on("end", async () => {
// //         let created = 0;
// //         let updated = 0;
// //         let errors = [];

// //         for (const [index, r] of rows.entries()) {
// //           try {
// //             if (!r.name || !r.price) continue;

// //             // Find category
// //             let categoryId = null;
// //             if (r.category) {
// //               const category = await Category.findOne({ 
// //                 name: { $regex: new RegExp(`^${r.category}$`, 'i') } 
// //               });
// //               if (category) categoryId = category._id;
// //             }

// //             // Find subcategory
// //             let subcategoryId = null;
// //             if (r.subcategory) {
// //               const subcategory = await SubCategory.findOne({ 
// //                 name: { $regex: new RegExp(`^${r.subcategory}$`, 'i') },
// //                 ...(categoryId ? { category: categoryId } : {})
// //               });
// //               if (subcategory) subcategoryId = subcategory._id;
// //             }

// //             // Parse arrays
// //             const flavors = r.flavors ? r.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : [];
// //             const size = r.size ? r.size.split(',').map(s => s.trim()).filter(s => s !== '') : [];

// //             const payload = {
// //               name: r.name,
// //               brandName: r.brandName || "",
// //               description: r.description || "",
// //               oldPrice: Number(r.oldPrice) || 0,
// //               price: Number(r.price),
// //               stock: Number(r.stock) || 0,
// //               quality: r.quality || "Standard",
// //               State: r.State || "",
// //               vendor: vendorId,
// //               restaurantName: vendor.storeName || r.restaurantName || "",
// //               category: categoryId,
// //               subcategory: subcategoryId,
// //               productTypes: r.productTypes || "",
// //               flavors: flavors,
// //               size: size,
// //               dietPreference: r.dietPreference || "Veg",
// //               ageRange: r.ageRange || "",
// //               containerType: r.containerType || "",
// //               itemForm: r.itemForm || "",
// //               specialty: r.specialty || "",
// //               itemTypeName: r.itemTypeName || "",
// //               countryOfOrigin: r.countryOfOrigin || "",
// //               manufacturer: r.manufacturer || "",
// //               manufacturerContact: r.manufacturerContact || "",
// //               packerContact: r.packerContact || "",
// //               marketerNameAddress: r.marketerNameAddress || "",
// //               packageColour: r.packageColour || "",
// //               measurementUnit: r.measurementUnit || "",
// //               unitCount: r.unitCount || "",
// //               numberOfItems: r.numberOfItems || "",
// //               itemWeight: r.itemWeight || "",
// //               totalEaches: r.totalEaches || "",
// //               itemPackageWeight: r.itemPackageWeight || "",
// //               shelfLife: r.shelfLife || "",
// //               ingredients: r.ingredients || "",
// //               allergenInformation: r.allergenInformation || "",
// //               directions: r.directions || "",
// //               nutrition: r.nutrition || "",
// //               cuisine: r.cuisine || "",
// //               dietaryPreferences: r.dietaryPreferences || "",
// //               materialTypes: r.materialTypes || "",
// //               customWeight: r.customWeight || "",
// //               customSizeInput: r.customSizeInput || "",
// //               fssaiLicense: r.fssaiLicense || "",
// //               legalDisclaimer: r.legalDisclaimer || "",
// //             };

// //             if (r._id) {
// //               await VendorProduct.updateOne(
// //                 { _id: r._id, vendor: vendorId },
// //                 payload
// //               );
// //               updated++;
// //             } else {
// //               await VendorProduct.create(payload);
// //               created++;
// //             }
// //           } catch (error) {
// //             errors.push(`Row ${index + 1}: ${error.message}`);
// //           }
// //         }

// //         fs.unlinkSync(req.file.path);

// //         res.json({
// //           success: true,
// //           created,
// //           updated,
// //           total: rows.length,
// //           errors: errors.length > 0 ? errors : undefined,
// //         });
// //       });
// //   } catch (err) {
// //     console.error("CSV import error:", err);
// //     res.status(500).json({ message: "CSV Import Failed" });
// //   }
// // };

// // /* ================= CSV EXPORT ================= */
// // exports.exportCSV = async (req, res) => {
// //   try {
// //     const products = await VendorProduct.find({
// //       vendor: req.vendor._id,
// //     })
// //       .populate("category", "name")
// //       .populate("subcategory", "name")
// //       .lean();

// //     // Transform data
// //     const transformedProducts = products.map(product => ({
// //       ...product,
// //       flavors: Array.isArray(product.flavors) ? product.flavors.join(',') : product.flavors || "",
// //       size: Array.isArray(product.size) ? product.size.join(',') : product.size || "",
// //       category: product.category ? product.category.name : "",
// //       subcategory: product.subcategory ? product.subcategory.name : "",
// //       categoryId: product.category ? product.category._id : "",
// //       subcategoryId: product.subcategory ? product.subcategory._id : ""
// //     }));

// //     const fields = [
// //       '_id', 'name', 'description', 'brandName', 'fssaiLicense', 'restaurantName',
// //       'oldPrice', 'price', 'stock', 'quality', 'State',
// //       'category', 'subcategory', 'categoryId', 'subcategoryId',
// //       'productTypes', 'flavors', 'size', 'dietPreference',
// //       'ageRange', 'containerType', 'itemForm', 'specialty',
// //       'itemTypeName', 'countryOfOrigin', 'manufacturer',
// //       'manufacturerContact', 'packerContact', 'marketerNameAddress',
// //       'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
// //       'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife',
// //       'ingredients', 'allergenInformation', 'directions', 'nutrition',
// //       'cuisine', 'dietaryPreferences', 'materialTypes', 'customWeight',
// //       'customSizeInput', 'legalDisclaimer'
// //     ];

// //     const parser = new Parser({ fields });
// //     const csvData = parser.parse(transformedProducts);

// //     res.setHeader("Content-Type", "text/csv");
// //     res.setHeader(
// //       "Content-Disposition",
// //       "attachment; filename=vendor_products.csv"
// //     );
// //     res.send(csvData);
// //   } catch (err) {
// //     console.error("CSV export error:", err);
// //     res.status(500).json({ message: "CSV Export Failed" });
// //   }
// // };

// // /* ================= BULK UPDATE ================= */
// // exports.bulkUpdate = async (req, res) => {
// //   try {
// //     const { ids, data } = req.body;
// //     if (!ids?.length) {
// //       return res.status(400).json({ message: "IDs required" });
// //     }

// //     // Handle price mapping
// //     const updateData = { ...data };
// //     if (updateData.newPrice !== undefined) {
// //       updateData.price = updateData.newPrice;
// //       delete updateData.newPrice;
// //     }

// //     // Handle arrays
// //     if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
// //       updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
// //     }
    
// //     if (updateData.size !== undefined && typeof updateData.size === 'string') {
// //       updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
// //     }

// //     const result = await VendorProduct.updateMany(
// //       { _id: { $in: ids }, vendor: req.vendor._id },
// //       { $set: updateData }
// //     );

// //     res.json({ success: true, modified: result.modifiedCount });
// //   } catch (err) {
// //     console.error("Bulk update error:", err);
// //     res.status(500).json({ message: "Bulk update failed" });
// //   }
// // };

// // /* ================= BULK DELETE ================= */
// // exports.bulkDelete = async (req, res) => {
// //   try {
// //     const { ids } = req.body;
// //     if (!ids?.length) {
// //       return res.status(400).json({ message: "IDs required" });
// //     }

// //     const result = await VendorProduct.deleteMany({
// //       _id: { $in: ids },
// //       vendor: req.vendor._id,
// //     });

// //     res.json({ success: true, deleted: result.deletedCount });
// //   } catch (err) {
// //     console.error("Bulk delete error:", err);
// //     res.status(500).json({ message: "Bulk delete failed" });
// //   }
// // };






// // const VendorProduct = require("../models/VendorProduct");
// // const Vendor = require("../models/Vendor");
// // const Category = require("../models/Category");
// // const SubCategory = require("../models/SubCategory");
// // const cloudinary = require("../config/cloudinary");

// // const csv = require("csv-parser");
// // const fs = require("fs");
// // const { Parser } = require("json2csv");

// // /* ================= CLOUDINARY UPLOAD ================= */
// // async function uploadCloud(file) {
// //   try {
// //     const base64 = file.buffer.toString("base64");
// //     const dataUri = `data:${file.mimetype};base64,${base64}`;
// //     const result = await cloudinary.uploader.upload(dataUri, {
// //       folder: "vendor_products",
// //       resource_type: "auto",
// //     });
// //     return result.secure_url;
// //   } catch (error) {
// //     console.error("Cloudinary upload error:", error);
// //     throw error;
// //   }
// // }

// // /* ================= GET CATEGORIES ================= */
// // exports.getCategories = async (req, res) => {
// //   try {
// //     const categories = await Category.find({ isActive: true })
// //       .select("name image _id")
// //       .sort({ name: 1 });
    
// //     res.json({ success: true, data: categories });
// //   } catch (err) {
// //     console.error("Get categories error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= GET SUBCATEGORIES ================= */
// // exports.getSubCategories = async (req, res) => {
// //   try {
// //     const { categoryId } = req.params;
    
// //     const subcategories = await SubCategory.find({ 
// //       category: categoryId,
// //       isActive: true 
// //     })
// //       .select("name image _id")
// //       .sort({ name: 1 });
    
// //     res.json({ success: true, data: subcategories });
// //   } catch (err) {
// //     console.error("Get subcategories error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= GET VENDOR PRODUCTS ================= */
// // exports.getVendorProducts = async (req, res) => {
// //   try {
// //     const products = await VendorProduct.find({
// //       vendor: req.vendor._id,
// //     })
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image");

// //     const vendor = await Vendor.findById(req.vendor._id);

// //     res.json({
// //       success: true,
// //       vendorId: vendor._id,
// //       storeName: vendor.storeName || "",
// //       data: products,
// //     });
// //   } catch (err) {
// //     console.error("Get products error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= CREATE VENDOR PRODUCT ================= */
// // exports.createVendorProduct = async (req, res) => {
// //   try {
// //     console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
// //     console.log("📦 Request body keys:", Object.keys(req.body));
    
// //     const vendor = await Vendor.findById(req.vendor._id);
// //     if (!vendor) {
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "Vendor not found" 
// //       });
// //     }
    
// //     const data = { ...req.body };
    
// //     // Step 1: Category Validation
// //     if (data.category) {
// //       const categoryExists = await Category.findById(data.category);
// //       if (!categoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid category selected" 
// //         });
// //       }
// //     }

// //     // ✅ MAJOR FIX: Subcategory validation - NO POPULATE, direct field check
// //     if (data.subcategory) {
// //       const subcategoryExists = await SubCategory.findById(data.subcategory);
// //       if (!subcategoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid subcategory selected" 
// //         });
// //       }
      
// //       // ✅ FIX: Check the actual field name from SubCategory model
// //       // SubCategory model mein field ka naam check karo - could be:
// //       // - category (common)
// //       // - parent (some models use this)
// //       // - categoryId (some use this)
      
// //       if (data.category && subcategoryExists.category) {
// //         const subcatCategoryId = subcategoryExists.category.toString();
// //         if (subcatCategoryId !== data.category) {
// //           return res.status(400).json({ 
// //             success: false, 
// //             message: "Subcategory does not belong to selected category" 
// //           });
// //         }
// //       } else if (data.category && subcategoryExists.parent) {
// //         // If field is named 'parent' instead of 'category'
// //         const subcatCategoryId = subcategoryExists.parent.toString();
// //         if (subcatCategoryId !== data.category) {
// //           return res.status(400).json({ 
// //             success: false, 
// //             message: "Subcategory does not belong to selected category" 
// //           });
// //         }
// //       }
// //       // Note: If no category field found in subcategory, skip validation
// //     }
    
// //     // Step 2: Parse data - handle formData or direct fields
// //     let productData = {};
    
// //     // If formData exists, process it
// //     if (data.formData && typeof data.formData === 'string') {
// //       try {
// //         data.formData = JSON.parse(data.formData);
// //       } catch (e) {
// //         console.log("Could not parse formData string");
// //       }
// //     }
    
// //     if (data.formData && typeof data.formData === 'object') {
// //       console.log("📦 Processing formData structure");
      
// //       // Step 1: Category Selection
// //       productData.category = data.category || data.selectedCategory || data.formData.basic?.category;
// //       productData.subcategory = data.subcategory || data.selectedSubCategory || data.formData.basic?.subcategory;
      
// //       // Step 2: Basic Information
// //       productData.name = data.formData.basic?.name || data.name || "";
// //       productData.description = data.formData.basic?.description || data.description || "";
// //       productData.restaurantName = vendor.storeName || data.formData.basic?.restaurantName || "";
      
// //       // Step 3: Product Details - Pricing
// //       if (data.formData.pricing) {
// //         productData.oldPrice = Number(data.formData.pricing.oldPrice || 0);
// //         productData.price = Number(data.formData.pricing.newPrice || 0);
// //         productData.stock = Number(data.formData.pricing.stock || 0);
// //         productData.quality = data.formData.pricing.quality || "Standard";
// //         productData.dietPreference = data.formData.pricing.dietPreference || "Veg";
// //       } else {
// //         productData.oldPrice = Number(data.oldPrice || 0);
// //         productData.price = Number(data.newPrice || data.price || 0);
// //         productData.stock = Number(data.stock || 0);
// //         productData.quality = data.quality || "Standard";
// //         productData.dietPreference = data.dietPreference || "Veg";
// //       }
      
// //       // Step 3: Product Details - Specifications
// //       if (data.formData.details) {
// //         productData.productTypes = data.formData.details.productTypes || "";
// //         productData.ingredients = data.formData.details.ingredients || "";
// //         productData.materialTypes = data.formData.details.materialTypes || "";
// //         productData.customWeight = data.formData.details.customWeight || "";
// //         productData.customSizeInput = data.formData.details.customSizeInput || "";
// //         productData.ageRange = data.formData.details.ageRange || "";
// //         productData.containerType = data.formData.details.containerType || "";
// //         productData.itemForm = data.formData.details.itemForm || "";
// //         productData.specialty = data.formData.details.specialty || "";
// //         productData.itemTypeName = data.formData.details.itemTypeName || "";
// //         productData.countryOfOrigin = data.formData.details.countryOfOrigin || "";
        
// //         // Flavors - ARRAY FORMAT
// //         const flavorsArray = [];
// //         if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
// //           flavorsArray.push(...data.formData.details.flavors);
// //         }
// //         if (data.formData.details.customFlavorInput) {
// //           flavorsArray.push(data.formData.details.customFlavorInput);
// //         }
// //         productData.flavors = flavorsArray.filter(f => f && f.trim() !== '');
        
// //         // Size - ARRAY FORMAT
// //         const sizeArray = [];
// //         if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
// //           sizeArray.push(...data.formData.details.size);
// //         }
// //         if (data.formData.details.customSizeInput) {
// //           sizeArray.push(data.formData.details.customSizeInput);
// //         }
// //         productData.size = sizeArray.filter(s => s && s.trim() !== '');
// //       } else {
// //         // Handle direct fields
// //         productData.productTypes = data.productTypes || "";
// //         productData.ingredients = data.ingredients || "";
// //         productData.materialTypes = data.materialTypes || "";
// //         productData.customWeight = data.customWeight || "";
// //         productData.customSizeInput = data.customSizeInput || "";
// //         productData.ageRange = data.ageRange || "";
// //         productData.containerType = data.containerType || "";
// //         productData.itemForm = data.itemForm || "";
// //         productData.specialty = data.specialty || "";
// //         productData.itemTypeName = data.itemTypeName || "";
// //         productData.countryOfOrigin = data.countryOfOrigin || "";
        
// //         // Flavors from direct fields
// //         if (data.flavors) {
// //           if (typeof data.flavors === 'string') {
// //             productData.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
// //           } else if (Array.isArray(data.flavors)) {
// //             productData.flavors = data.flavors.filter(f => f && f.trim() !== '');
// //           } else {
// //             productData.flavors = [];
// //           }
// //         } else {
// //           productData.flavors = [];
// //         }
        
// //         // Size from direct fields
// //         if (data.size) {
// //           if (typeof data.size === 'string') {
// //             productData.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
// //           } else if (Array.isArray(data.size)) {
// //             productData.size = data.size.filter(s => s && s.trim() !== '');
// //           } else {
// //             productData.size = [];
// //           }
// //         } else {
// //           productData.size = [];
// //         }
// //       }
      
// //       // Location
// //       if (data.formData.location) {
// //         productData.State = data.formData.location.state || "";
// //       } else {
// //         productData.State = data.State || "";
// //       }
      
// //       // Step 4: Manufacturing & Marketing
// //       if (data.formData.compliance) {
// //         productData.brandName = data.formData.compliance.fssaiLicense || "";
// //         productData.fssaiLicense = data.formData.compliance.fssaiLicense || "";
// //         productData.legalDisclaimer = data.formData.compliance.legalDisclaimer || "";
// //       } else {
// //         productData.brandName = data.brandName || data.fssaiLicenseNumber || "";
// //         productData.fssaiLicense = data.fssaiLicense || data.fssaiLicenseNumber || "";
// //         productData.legalDisclaimer = data.legalDisclaimer || "";
// //       }
      
// //       if (data.formData.manufacturing) {
// //         productData.manufacturer = data.formData.manufacturing.manufacturerName || "";
// //         productData.manufacturerContact = data.formData.manufacturing.manufacturerAddress || "";
        
// //         // Packager - combine name and address
// //         let packerContact = "";
// //         if (data.formData.manufacturing.packagerName) {
// //           packerContact = data.formData.manufacturing.packagerName;
// //           if (data.formData.manufacturing.packagerAddress) {
// //             packerContact += `, ${data.formData.manufacturing.packagerAddress}`;
// //           }
// //         }
// //         productData.packerContact = packerContact;
        
// //         // Marketer - combine name and address
// //         let marketerNameAddress = "";
// //         if (data.formData.manufacturing.marketerName) {
// //           marketerNameAddress = data.formData.manufacturing.marketerName;
// //           if (data.formData.manufacturing.marketerAddress) {
// //             marketerNameAddress += `, ${data.formData.manufacturing.marketerAddress}`;
// //           }
// //         }
// //         productData.marketerNameAddress = marketerNameAddress;
// //       } else {
// //         productData.manufacturer = data.manufacturer || "";
// //         productData.manufacturerContact = data.manufacturerContact || "";
// //         productData.packerContact = data.packerContact || "";
// //         productData.marketerNameAddress = data.marketerNameAddress || "";
// //       }
      
// //       // Step 5: Package & Dietary
// //       if (data.formData.package) {
// //         productData.packageColour = data.formData.package.packageColour || "";
// //         productData.measurementUnit = data.formData.package.measurementUnit || "";
// //         productData.unitCount = data.formData.package.unitCount || "";
// //         productData.numberOfItems = data.formData.package.numberOfItems || "";
// //         productData.itemWeight = data.formData.package.itemWeight || "";
// //         productData.totalEaches = data.formData.package.totalEaches || "";
// //         productData.itemPackageWeight = data.formData.package.itemPackageWeight || "";
// //         productData.shelfLife = data.formData.package.shelfLife || "";
// //       } else {
// //         productData.packageColour = data.packageColour || "";
// //         productData.measurementUnit = data.measurementUnit || "";
// //         productData.unitCount = data.unitCount || "";
// //         productData.numberOfItems = data.numberOfItems || "";
// //         productData.itemWeight = data.itemWeight || "";
// //         productData.totalEaches = data.totalEaches || "";
// //         productData.itemPackageWeight = data.itemPackageWeight || "";
// //         productData.shelfLife = data.shelfLife || "";
// //       }
      
// //       if (data.formData.dietary) {
// //         productData.dietaryPreferences = data.formData.dietary.dietaryPreferences || "";
// //         productData.allergenInformation = data.formData.dietary.allergenInformation || "";
// //         productData.nutrition = data.formData.dietary.nutrition || "";
// //         productData.cuisine = data.formData.dietary.cuisine || "";
// //         productData.directions = data.formData.dietary.directions || "";
// //       } else {
// //         productData.dietaryPreferences = data.dietaryPreferences || "";
// //         productData.allergenInformation = data.allergenInformation || "";
// //         productData.nutrition = data.nutrition || "";
// //         productData.cuisine = data.cuisine || "";
// //         productData.directions = data.directions || "";
// //       }
// //     } else {
// //       // Direct fields without formData
// //       productData = {
// //         // Basic
// //         name: data.name || "",
// //         description: data.description || "",
// //         restaurantName: vendor.storeName || data.restaurantName || "",
        
// //         // Pricing
// //         oldPrice: Number(data.oldPrice || 0),
// //         price: Number(data.newPrice || data.price || 0),
// //         stock: Number(data.stock || 0),
// //         quality: data.quality || "Standard",
// //         dietPreference: data.dietPreference || "Veg",
        
// //         // Category
// //         category: data.category || data.selectedCategory,
// //         subcategory: data.subcategory || data.selectedSubCategory,
        
// //         // Details
// //         productTypes: data.productTypes || "",
// //         ingredients: data.ingredients || "",
// //         materialTypes: data.materialTypes || "",
// //         customWeight: data.customWeight || "",
// //         customSizeInput: data.customSizeInput || "",
// //         ageRange: data.ageRange || "",
// //         containerType: data.containerType || "",
// //         itemForm: data.itemForm || "",
// //         specialty: data.specialty || "",
// //         itemTypeName: data.itemTypeName || "",
// //         countryOfOrigin: data.countryOfOrigin || "",
        
// //         // Flavors array
// //         flavors: data.flavors ? (typeof data.flavors === 'string' ? 
// //           data.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : 
// //           (Array.isArray(data.flavors) ? data.flavors.filter(f => f && f.trim() !== '') : [])) : [],
        
// //         // Size array
// //         size: data.size ? (typeof data.size === 'string' ? 
// //           data.size.split(',').map(s => s.trim()).filter(s => s !== '') : 
// //           (Array.isArray(data.size) ? data.size.filter(s => s && s.trim() !== '') : [])) : [],
        
// //         // FSSAI - DONO FIELDS
// //         brandName: data.brandName || data.fssaiLicenseNumber || "",
// //         fssaiLicense: data.fssaiLicense || data.fssaiLicenseNumber || "",
// //         legalDisclaimer: data.legalDisclaimer || "",
        
// //         // Manufacturing
// //         manufacturer: data.manufacturer || "",
// //         manufacturerContact: data.manufacturerContact || "",
// //         packerContact: data.packerContact || "",
// //         marketerNameAddress: data.marketerNameAddress || "",
        
// //         // Package
// //         packageColour: data.packageColour || "",
// //         measurementUnit: data.measurementUnit || "",
// //         unitCount: data.unitCount || "",
// //         numberOfItems: data.numberOfItems || "",
// //         itemWeight: data.itemWeight || "",
// //         totalEaches: data.totalEaches || "",
// //         itemPackageWeight: data.itemPackageWeight || "",
// //         shelfLife: data.shelfLife || "",
        
// //         // Dietary
// //         dietaryPreferences: data.dietaryPreferences || "",
// //         allergenInformation: data.allergenInformation || "",
// //         nutrition: data.nutrition || "",
// //         cuisine: data.cuisine || "",
// //         directions: data.directions || "",
        
// //         // Location
// //         State: data.State || "",
// //       };
// //     }
    
// //     // Required validation
// //     if (!productData.name || !productData.price || !productData.category) {
// //       console.log("❌ Validation failed:", {
// //         name: productData.name,
// //         price: productData.price,
// //         category: productData.category
// //       });
      
// //       return res.status(400).json({
// //         success: false,
// //         message: "Name, price and category are required",
// //         received: productData
// //       });
// //     }
    
// //     // Step 6: Process images
// //     let mainImage = null;
// //     const galleryImages = [];
    
// //     // Main image
// //     if (req.files?.image?.[0]) {
// //       try {
// //         mainImage = await uploadCloud(req.files.image[0]);
// //         productData.image = mainImage;
// //       } catch (error) {
// //         console.error("Main image upload error:", error);
// //       }
// //     }
    
// //     // Mandatory images - gallery[0], gallery[1], gallery[2]
// //     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0]);
// //         galleryImages[0] = img;
// //       } catch (error) {
// //         console.error("Ingredients image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0]);
// //         galleryImages[1] = img;
// //       } catch (error) {
// //         console.error("Nutrition image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0]);
// //         galleryImages[2] = img;
// //       } catch (error) {
// //         console.error("MFG/EXP image upload error:", error);
// //       }
// //     }
    
// //     // Additional gallery images
// //     if (req.files?.gallery) {
// //       for (const file of req.files.gallery) {
// //         try {
// //           const img = await uploadCloud(file);
// //           galleryImages.push(img);
// //         } catch (error) {
// //           console.error("Gallery image upload error:", error);
// //         }
// //       }
// //     }
    
// //     // Clean gallery
// //     const cleanGallery = galleryImages.filter(img => img && img.trim() !== '');
// //     if (cleanGallery.length > 0) {
// //       productData.gallery = cleanGallery;
// //     }
    
// //     // Add vendor ID
// //     productData.vendor = req.vendor._id;
    
// //     // Debug log
// //     console.log("📦 Final product data:", JSON.stringify(productData, null, 2));
    
// //     // Create product
// //     const product = await VendorProduct.create(productData);
    
// //     // Populate and return
// //     const populatedProduct = await VendorProduct.findById(product._id)
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image");
    
// //     res.json({ 
// //       success: true, 
// //       data: populatedProduct,
// //       storeName: vendor.storeName || ""
// //     });
    
// //   } catch (err) {
// //     console.error("❌ CREATE PRODUCT ERROR:", err);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Server Error: " + err.message,
// //       stack: err.stack 
// //     });
// //   }
// // };

// // /* ================= UPDATE VENDOR PRODUCT ================= */
// // exports.updateVendorProduct = async (req, res) => {
// //   try {
// //     console.log("🟢 UPDATE VENDOR PRODUCT API CALLED");
    
// //     const product = await VendorProduct.findOne({
// //       _id: req.params.id,
// //       vendor: req.vendor._id,
// //     });

// //     if (!product) {
// //       return res.status(404).json({ success: false, message: "Product not found" });
// //     }

// //     const data = { ...req.body };
// //     const updateData = {};

// //     // Category validation
// //     if (data.category) {
// //       const categoryExists = await Category.findById(data.category);
// //       if (!categoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid category selected" 
// //         });
// //       }
// //       updateData.category = data.category;
// //     }

// //     // ✅ MAJOR FIX: Subcategory validation - NO POPULATE, direct field check
// //     if (data.subcategory) {
// //       const subcategoryExists = await SubCategory.findById(data.subcategory);
// //       if (!subcategoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid subcategory selected" 
// //         });
// //       }
      
// //       // ✅ FIX: Check the actual field name from SubCategory model
// //       if (data.category && subcategoryExists.category) {
// //         const subcatCategoryId = subcategoryExists.category.toString();
// //         if (subcatCategoryId !== data.category) {
// //           return res.status(400).json({ 
// //             success: false, 
// //             message: "Subcategory does not belong to selected category" 
// //           });
// //         }
// //       } else if (data.category && subcategoryExists.parent) {
// //         // If field is named 'parent' instead of 'category'
// //         const subcatCategoryId = subcategoryExists.parent.toString();
// //         if (subcatCategoryId !== data.category) {
// //           return res.status(400).json({ 
// //             success: false, 
// //             message: "Subcategory does not belong to selected category" 
// //           });
// //         }
// //       }
// //       updateData.subcategory = data.subcategory;
// //     }
    
// //     // Process formData if present
// //     if (data.formData && typeof data.formData === 'string') {
// //       try {
// //         data.formData = JSON.parse(data.formData);
// //       } catch (e) {
// //         console.log("Could not parse formData string");
// //       }
// //     }
    
// //     if (data.formData && typeof data.formData === 'object') {
// //       // Process formData fields
// //       const fieldsMapping = {
// //         // Basic
// //         name: 'formData.basic.name',
// //         description: 'formData.basic.description',
        
// //         // Pricing
// //         oldPrice: 'formData.pricing.oldPrice',
// //         price: 'formData.pricing.newPrice',
// //         stock: 'formData.pricing.stock',
// //         quality: 'formData.pricing.quality',
// //         dietPreference: 'formData.pricing.dietPreference',
        
// //         // Details
// //         productTypes: 'formData.details.productTypes',
// //         ingredients: 'formData.details.ingredients',
// //         materialTypes: 'formData.details.materialTypes',
// //         customWeight: 'formData.details.customWeight',
// //         customSizeInput: 'formData.details.customSizeInput',
// //         ageRange: 'formData.details.ageRange',
// //         containerType: 'formData.details.containerType',
// //         itemForm: 'formData.details.itemForm',
// //         specialty: 'formData.details.specialty',
// //         itemTypeName: 'formData.details.itemTypeName',
// //         countryOfOrigin: 'formData.details.countryOfOrigin',
        
// //         // Location
// //         State: 'formData.location.state',
        
// //         // Compliance
// //         brandName: 'formData.compliance.fssaiLicense',
// //         fssaiLicense: 'formData.compliance.fssaiLicense',
// //         legalDisclaimer: 'formData.compliance.legalDisclaimer',
        
// //         // Manufacturing
// //         manufacturer: 'formData.manufacturing.manufacturerName',
// //         manufacturerContact: 'formData.manufacturing.manufacturerAddress',
        
// //         // Package
// //         packageColour: 'formData.package.packageColour',
// //         measurementUnit: 'formData.package.measurementUnit',
// //         unitCount: 'formData.package.unitCount',
// //         numberOfItems: 'formData.package.numberOfItems',
// //         itemWeight: 'formData.package.itemWeight',
// //         totalEaches: 'formData.package.totalEaches',
// //         itemPackageWeight: 'formData.package.itemPackageWeight',
// //         shelfLife: 'formData.package.shelfLife',
        
// //         // Dietary
// //         dietaryPreferences: 'formData.dietary.dietaryPreferences',
// //         allergenInformation: 'formData.dietary.allergenInformation',
// //         nutrition: 'formData.dietary.nutrition',
// //         cuisine: 'formData.dietary.cuisine',
// //         directions: 'formData.dietary.directions',
// //       };
      
// //       // Process each field
// //       Object.keys(fieldsMapping).forEach(field => {
// //         const path = fieldsMapping[field];
// //         const value = path.split('.').reduce((obj, key) => obj?.[key], data);
// //         if (value !== undefined) {
// //           if (field === 'oldPrice' || field === 'price' || field === 'stock') {
// //             updateData[field] = Number(value) || 0;
// //           } else {
// //             updateData[field] = value;
// //           }
// //         }
// //       });
      
// //       // Handle packer contact (combined)
// //       if (data.formData.manufacturing?.packagerName !== undefined || 
// //           data.formData.manufacturing?.packagerAddress !== undefined) {
// //         let packerContact = "";
// //         if (data.formData.manufacturing.packagerName) {
// //           packerContact = data.formData.manufacturing.packagerName;
// //           if (data.formData.manufacturing.packagerAddress) {
// //             packerContact += `, ${data.formData.manufacturing.packagerAddress}`;
// //           }
// //         }
// //         updateData.packerContact = packerContact;
// //       }
      
// //       // Handle marketer info (combined)
// //       if (data.formData.manufacturing?.marketerName !== undefined || 
// //           data.formData.manufacturing?.marketerAddress !== undefined) {
// //         let marketerNameAddress = "";
// //         if (data.formData.manufacturing.marketerName) {
// //           marketerNameAddress = data.formData.manufacturing.marketerName;
// //           if (data.formData.manufacturing.marketerAddress) {
// //             marketerNameAddress += `, ${data.formData.manufacturing.marketerAddress}`;
// //           }
// //         }
// //         updateData.marketerNameAddress = marketerNameAddress;
// //       }
      
// //       // Handle flavors array
// //       if (data.formData.details?.flavors !== undefined || 
// //           data.formData.details?.customFlavorInput !== undefined) {
// //         const flavorsArray = [];
// //         if (Array.isArray(data.formData.details.flavors)) {
// //           flavorsArray.push(...data.formData.details.flavors);
// //         }
// //         if (data.formData.details.customFlavorInput) {
// //           flavorsArray.push(data.formData.details.customFlavorInput);
// //         }
// //         updateData.flavors = flavorsArray.filter(f => f && f.trim() !== '');
// //       }
      
// //       // Handle size array
// //       if (data.formData.details?.size !== undefined || 
// //           data.formData.details?.customSizeInput !== undefined) {
// //         const sizeArray = [];
// //         if (Array.isArray(data.formData.details.size)) {
// //           sizeArray.push(...data.formData.details.size);
// //         }
// //         if (data.formData.details.customSizeInput) {
// //           sizeArray.push(data.formData.details.customSizeInput);
// //         }
// //         updateData.size = sizeArray.filter(s => s && s.trim() !== '');
// //       }
// //     } else {
// //       // Handle direct field updates
// //       const directFields = [
// //         'name', 'description', 'restaurantName',
// //         'oldPrice', 'price', 'newPrice', 'stock', 'quality', 'dietPreference',
// //         'productTypes', 'ingredients', 'materialTypes', 'customWeight', 'customSizeInput',
// //         'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
// //         'brandName', 'fssaiLicense', 'legalDisclaimer',
// //         'manufacturer', 'manufacturerContact', 'packerContact', 'marketerNameAddress',
// //         'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight',
// //         'totalEaches', 'itemPackageWeight', 'shelfLife',
// //         'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
// //         'State'
// //       ];
      
// //       directFields.forEach(field => {
// //         if (data[field] !== undefined) {
// //           if (field === 'newPrice') {
// //             updateData.price = Number(data[field]);
// //           } else if (field === 'oldPrice' || field === 'price' || field === 'stock') {
// //             updateData[field] = Number(data[field]);
// //           } else {
// //             updateData[field] = data[field];
// //           }
// //         }
// //       });
      
// //       // Handle flavors array
// //       if (data.flavors !== undefined) {
// //         if (typeof data.flavors === 'string') {
// //           updateData.flavors = data.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
// //         } else if (Array.isArray(data.flavors)) {
// //           updateData.flavors = data.flavors.filter(f => f && f.trim() !== '');
// //         }
// //       }
      
// //       // Handle size array
// //       if (data.size !== undefined) {
// //         if (typeof data.size === 'string') {
// //           updateData.size = data.size.split(',').map(s => s.trim()).filter(s => s !== '');
// //         } else if (Array.isArray(data.size)) {
// //           updateData.size = data.size.filter(s => s && s.trim() !== '');
// //         }
// //       }
// //     }
    
// //     // Update images
// //     if (req.files?.image?.[0]) {
// //       try {
// //         updateData.image = await uploadCloud(req.files.image[0]);
// //       } catch (error) {
// //         console.error("Image upload error:", error);
// //       }
// //     }
    
// //     // Update gallery
// //     let gallery = [...(product.gallery || [])];
    
// //     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0]);
// //         gallery[0] = img;
// //       } catch (error) {
// //         console.error("Ingredients image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0]);
// //         gallery[1] = img;
// //       } catch (error) {
// //         console.error("Nutrition image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
// //       try {
// //         const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0]);
// //         gallery[2] = img;
// //       } catch (error) {
// //         console.error("MFG/EXP image upload error:", error);
// //       }
// //     }
    
// //     if (req.files?.gallery) {
// //       for (const file of req.files.gallery) {
// //         try {
// //           const img = await uploadCloud(file);
// //           gallery.push(img);
// //         } catch (error) {
// //           console.error("Gallery image upload error:", error);
// //         }
// //       }
// //     }
    
// //     // Clean gallery
// //     gallery = gallery.filter(img => img && img.trim() !== '');
// //     if (gallery.length > 0) {
// //       updateData.gallery = gallery;
// //     }
    
// //     // Update product
// //     Object.assign(product, updateData);
// //     await product.save();
    
// //     // Populate and return
// //     const populatedProduct = await VendorProduct.findById(product._id)
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image");
    
// //     res.json({ success: true, data: populatedProduct });
    
// //   } catch (err) {
// //     console.error("❌ UPDATE PRODUCT ERROR:", err);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Server Error: " + err.message 
// //     });
// //   }
// // };

// // /* ================= DELETE PRODUCT ================= */
// // exports.deleteVendorProduct = async (req, res) => {
// //   try {
// //     await VendorProduct.deleteOne({
// //       _id: req.params.id,
// //       vendor: req.vendor._id,
// //     });
// //     res.json({ success: true });
// //   } catch (err) {
// //     console.error("Delete product error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= CSV IMPORT ================= */
// // exports.importCSV = async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ message: "CSV file required" });
// //     }

// //     const vendorId = req.vendor._id;
// //     const vendor = await Vendor.findById(vendorId);
// //     const rows = [];

// //     fs.createReadStream(req.file.path)
// //       .pipe(csv())
// //       .on("data", (row) => rows.push(row))
// //       .on("end", async () => {
// //         let created = 0;
// //         let updated = 0;
// //         let errors = [];

// //         for (const [index, r] of rows.entries()) {
// //           try {
// //             if (!r.name || !r.price) continue;

// //             // Find category
// //             let categoryId = null;
// //             if (r.category) {
// //               const category = await Category.findOne({ 
// //                 name: { $regex: new RegExp(`^${r.category}$`, 'i') } 
// //               });
// //               if (category) categoryId = category._id;
// //             }

// //             // Find subcategory
// //             let subcategoryId = null;
// //             if (r.subcategory) {
// //               const subcategory = await SubCategory.findOne({ 
// //                 name: { $regex: new RegExp(`^${r.subcategory}$`, 'i') },
// //                 ...(categoryId ? { category: categoryId } : {})
// //               });
// //               if (subcategory) subcategoryId = subcategory._id;
// //             }

// //             // Parse arrays
// //             const flavors = r.flavors ? r.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : [];
// //             const size = r.size ? r.size.split(',').map(s => s.trim()).filter(s => s !== '') : [];

// //             const payload = {
// //               name: r.name,
// //               brandName: r.brandName || "",
// //               description: r.description || "",
// //               oldPrice: Number(r.oldPrice) || 0,
// //               price: Number(r.price),
// //               stock: Number(r.stock) || 0,
// //               quality: r.quality || "Standard",
// //               State: r.State || "",
// //               vendor: vendorId,
// //               restaurantName: vendor.storeName || r.restaurantName || "",
// //               category: categoryId,
// //               subcategory: subcategoryId,
// //               productTypes: r.productTypes || "",
// //               flavors: flavors,
// //               size: size,
// //               dietPreference: r.dietPreference || "Veg",
// //               ageRange: r.ageRange || "",
// //               containerType: r.containerType || "",
// //               itemForm: r.itemForm || "",
// //               specialty: r.specialty || "",
// //               itemTypeName: r.itemTypeName || "",
// //               countryOfOrigin: r.countryOfOrigin || "",
// //               manufacturer: r.manufacturer || "",
// //               manufacturerContact: r.manufacturerContact || "",
// //               packerContact: r.packerContact || "",
// //               marketerNameAddress: r.marketerNameAddress || "",
// //               packageColour: r.packageColour || "",
// //               measurementUnit: r.measurementUnit || "",
// //               unitCount: r.unitCount || "",
// //               numberOfItems: r.numberOfItems || "",
// //               itemWeight: r.itemWeight || "",
// //               totalEaches: r.totalEaches || "",
// //               itemPackageWeight: r.itemPackageWeight || "",
// //               shelfLife: r.shelfLife || "",
// //               ingredients: r.ingredients || "",
// //               allergenInformation: r.allergenInformation || "",
// //               directions: r.directions || "",
// //               nutrition: r.nutrition || "",
// //               cuisine: r.cuisine || "",
// //               dietaryPreferences: r.dietaryPreferences || "",
// //               materialTypes: r.materialTypes || "",
// //               customWeight: r.customWeight || "",
// //               customSizeInput: r.customSizeInput || "",
// //               fssaiLicense: r.fssaiLicense || "",
// //               legalDisclaimer: r.legalDisclaimer || "",
// //             };

// //             if (r._id) {
// //               await VendorProduct.updateOne(
// //                 { _id: r._id, vendor: vendorId },
// //                 payload
// //               );
// //               updated++;
// //             } else {
// //               await VendorProduct.create(payload);
// //               created++;
// //             }
// //           } catch (error) {
// //             errors.push(`Row ${index + 1}: ${error.message}`);
// //           }
// //         }

// //         fs.unlinkSync(req.file.path);

// //         res.json({
// //           success: true,
// //           created,
// //           updated,
// //           total: rows.length,
// //           errors: errors.length > 0 ? errors : undefined,
// //         });
// //       });
// //   } catch (err) {
// //     console.error("CSV import error:", err);
// //     res.status(500).json({ message: "CSV Import Failed" });
// //   }
// // };

// // /* ================= CSV EXPORT ================= */
// // exports.exportCSV = async (req, res) => {
// //   try {
// //     const products = await VendorProduct.find({
// //       vendor: req.vendor._id,
// //     })
// //       .populate("category", "name")
// //       .populate("subcategory", "name")
// //       .lean();

// //     // Transform data
// //     const transformedProducts = products.map(product => ({
// //       ...product,
// //       flavors: Array.isArray(product.flavors) ? product.flavors.join(',') : product.flavors || "",
// //       size: Array.isArray(product.size) ? product.size.join(',') : product.size || "",
// //       category: product.category ? product.category.name : "",
// //       subcategory: product.subcategory ? product.subcategory.name : "",
// //       categoryId: product.category ? product.category._id : "",
// //       subcategoryId: product.subcategory ? product.subcategory._id : ""
// //     }));

// //     const fields = [
// //       '_id', 'name', 'description', 'brandName', 'fssaiLicense', 'restaurantName',
// //       'oldPrice', 'price', 'stock', 'quality', 'State',
// //       'category', 'subcategory', 'categoryId', 'subcategoryId',
// //       'productTypes', 'flavors', 'size', 'dietPreference',
// //       'ageRange', 'containerType', 'itemForm', 'specialty',
// //       'itemTypeName', 'countryOfOrigin', 'manufacturer',
// //       'manufacturerContact', 'packerContact', 'marketerNameAddress',
// //       'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
// //       'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife',
// //       'ingredients', 'allergenInformation', 'directions', 'nutrition',
// //       'cuisine', 'dietaryPreferences', 'materialTypes', 'customWeight',
// //       'customSizeInput', 'legalDisclaimer'
// //     ];

// //     const parser = new Parser({ fields });
// //     const csvData = parser.parse(transformedProducts);

// //     res.setHeader("Content-Type", "text/csv");
// //     res.setHeader(
// //       "Content-Disposition",
// //       "attachment; filename=vendor_products.csv"
// //     );
// //     res.send(csvData);
// //   } catch (err) {
// //     console.error("CSV export error:", err);
// //     res.status(500).json({ message: "CSV Export Failed" });
// //   }
// // };

// // /* ================= BULK UPDATE ================= */
// // exports.bulkUpdate = async (req, res) => {
// //   try {
// //     const { ids, data } = req.body;
// //     if (!ids?.length) {
// //       return res.status(400).json({ message: "IDs required" });
// //     }

// //     // Handle price mapping
// //     const updateData = { ...data };
// //     if (updateData.newPrice !== undefined) {
// //       updateData.price = updateData.newPrice;
// //       delete updateData.newPrice;
// //     }

// //     // Handle arrays
// //     if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
// //       updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
// //     }
    
// //     if (updateData.size !== undefined && typeof updateData.size === 'string') {
// //       updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
// //     }

// //     const result = await VendorProduct.updateMany(
// //       { _id: { $in: ids }, vendor: req.vendor._id },
// //       { $set: updateData }
// //     );

// //     res.json({ success: true, modified: result.modifiedCount });
// //   } catch (err) {
// //     console.error("Bulk update error:", err);
// //     res.status(500).json({ message: "Bulk update failed" });
// //   }
// // };

// // /* ================= BULK DELETE ================= */
// // exports.bulkDelete = async (req, res) => {
// //   try {
// //     const { ids } = req.body;
// //     if (!ids?.length) {
// //       return res.status(400).json({ message: "IDs required" });
// //     }

// //     const result = await VendorProduct.deleteMany({
// //       _id: { $in: ids },
// //       vendor: req.vendor._id,
// //     });

// //     res.json({ success: true, deleted: result.deletedCount });
// //   } catch (err) {
// //     console.error("Bulk delete error:", err);
// //     res.status(500).json({ message: "Bulk delete failed" });
// //   }
// // };





// const VendorProduct = require("../models/VendorProduct");
// const Vendor = require("../models/Vendor");
// const Category = require("../models/Category");
// const SubCategory = require("../models/SubCategory");
// const cloudinary = require("../config/cloudinary");
// const csv = require("csv-parser");
// const fs = require("fs");
// const { Parser } = require("json2csv");

// /* ================= CLOUDINARY UPLOAD ================= */
// async function uploadCloud(file, folder = "vendor_products") {
//   try {
//     if (!file || !file.buffer) {
//       console.error("❌ No file buffer provided");
//       return null;
//     }

//     const base64 = file.buffer.toString("base64");
//     const dataUri = `data:${file.mimetype};base64,${base64}`;
    
//     const result = await cloudinary.uploader.upload(dataUri, {
//       folder: folder,
//       resource_type: "auto",
//       transformation: [
//         { width: 800, height: 800, crop: "limit" },
//         { quality: "auto:good" }
//       ]
//     });
    
//     console.log(`✅ Cloudinary upload successful: ${result.secure_url}`);
//     return result.secure_url;
//   } catch (error) {
//     console.error("❌ Cloudinary upload error:", error.message);
//     return null;
//   }
// }

// /* ================= DELETE CLOUDINARY IMAGE ================= */
// async function deleteCloudinaryImage(imageUrl) {
//   try {
//     if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
//       return;
//     }
    
//     const urlParts = imageUrl.split('/');
//     const publicIdWithExtension = urlParts.slice(-2).join('/');
//     const publicId = publicIdWithExtension.split('.')[0];
    
//     await cloudinary.uploader.destroy(publicId);
//     console.log(`✅ Deleted Cloudinary image: ${publicId}`);
//   } catch (error) {
//     console.error("❌ Error deleting Cloudinary image:", error.message);
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
//     console.error("❌ Get categories error:", err);
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
//       .select("name image _id category")
//       .sort({ name: 1 });
    
//     res.json({ success: true, data: subcategories });
//   } catch (err) {
//     console.error("❌ Get subcategories error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= GET VENDOR PRODUCTS ================= */
// exports.getVendorProducts = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 50,
//       search = '',
//       category = '',
//       subcategory = '',
//       status = '',
//       sort = '-createdAt'
//     } = req.query;
    
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const query = { vendor: req.vendor._id };
    
//     // Search filter
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { brandName: { $regex: search, $options: 'i' } },
//         { restaurantName: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     // Category filter
//     if (category) query.category = category;
//     if (subcategory) query.subcategory = subcategory;
    
//     // Status filter
//     if (status) query.status = status;
    
//     const products = await VendorProduct.find(query)
//       .populate("category", "name image")
//       .populate("subcategory", "name image")
//       .sort(sort)
//       .limit(parseInt(limit))
//       .skip(skip)
//       .lean();

//     const total = await VendorProduct.countDocuments(query);
//     const vendor = await Vendor.findById(req.vendor._id).select("storeName name email phone");

//     res.json({
//       success: true,
//       count: products.length,
//       total,
//       page: parseInt(page),
//       pages: Math.ceil(total / parseInt(limit)),
//       vendor: {
//         id: vendor._id,
//         storeName: vendor.storeName || "",
//         name: vendor.name || "",
//         email: vendor.email || "",
//         phone: vendor.phone || ""
//       },
//       data: products,
//     });
//   } catch (err) {
//     console.error("❌ Get vendor products error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= CREATE VENDOR PRODUCT ================= */
// exports.createVendorProduct = async (req, res) => {
//   try {
//     console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
    
//     const vendor = await Vendor.findById(req.vendor._id);
//     if (!vendor) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Vendor not found" 
//       });
//     }
    
//     const data = { ...req.body };
    
//     // Step 1: Parse and prepare product data
//     let productData = {};
    
//     // Helper functions
//     const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
//     const safeNumber = (value) => {
//       const num = parseFloat(value);
//       return isNaN(num) ? 0 : num;
//     };
//     const safeArray = (value) => {
//       if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
//       if (typeof value === 'string' && value.trim() !== '') {
//         return value.split(',').map(item => item.trim()).filter(item => item !== '');
//       }
//       return [];
//     };
    
//     // Step 2: Category Validation
//     if (data.category) {
//       const categoryExists = await Category.findById(data.category);
//       if (!categoryExists) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid category selected" 
//         });
//       }
//       productData.category = data.category;
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Category is required"
//       });
//     }

//     // Step 3: Subcategory validation
//     if (data.subcategory) {
//       const subcategoryExists = await SubCategory.findById(data.subcategory);
//       if (!subcategoryExists) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid subcategory selected" 
//         });
//       }
      
//       // Check if subcategory belongs to selected category
//       if (subcategoryExists.category && subcategoryExists.category.toString() !== data.category) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Subcategory does not belong to selected category" 
//         });
//       }
      
//       productData.subcategory = data.subcategory;
//     }
    
//     // Step 4: Process formData if present
//     if (data.formData && typeof data.formData === 'string') {
//       try {
//         data.formData = JSON.parse(data.formData);
//       } catch (e) {
//         console.log("Could not parse formData string");
//       }
//     }
    
//     if (data.formData && typeof data.formData === 'object') {
//       // Basic Information
//       productData.name = safeString(data.formData.basic?.name || data.name);
//       productData.description = safeString(data.formData.basic?.description || data.description);
//       productData.restaurantName = safeString(vendor.storeName || data.formData.basic?.restaurantName || "");
      
//       // Pricing
//       if (data.formData.pricing) {
//         productData.oldPrice = safeNumber(data.formData.pricing.oldPrice);
//         productData.price = safeNumber(data.formData.pricing.newPrice || data.formData.pricing.price);
//         productData.stock = safeNumber(data.formData.pricing.stock);
//         productData.quality = safeString(data.formData.pricing.quality) || "Standard";
//         productData.dietPreference = safeString(data.formData.pricing.dietPreference) || "Veg";
//       } else {
//         productData.oldPrice = safeNumber(data.oldPrice);
//         productData.price = safeNumber(data.newPrice || data.price);
//         productData.stock = safeNumber(data.stock);
//         productData.quality = safeString(data.quality) || "Standard";
//         productData.dietPreference = safeString(data.dietPreference) || "Veg";
//       }
      
//       // Product Details
//       if (data.formData.details) {
//         productData.productTypes = safeString(data.formData.details.productTypes);
//         productData.ingredients = safeString(data.formData.details.ingredients);
//         productData.materialTypes = safeString(data.formData.details.materialTypes);
//         productData.customWeight = safeString(data.formData.details.customWeight);
//         productData.customSizeInput = safeString(data.formData.details.customSizeInput);
//         productData.ageRange = safeString(data.formData.details.ageRange);
//         productData.containerType = safeString(data.formData.details.containerType);
//         productData.itemForm = safeString(data.formData.details.itemForm);
//         productData.specialty = safeString(data.formData.details.specialty);
//         productData.itemTypeName = safeString(data.formData.details.itemTypeName);
//         productData.countryOfOrigin = safeString(data.formData.details.countryOfOrigin);
        
//         // Flavors array
//         const flavorsArray = [];
//         if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
//           flavorsArray.push(...data.formData.details.flavors);
//         }
//         if (data.formData.details.customFlavorInput) {
//           flavorsArray.push(data.formData.details.customFlavorInput);
//         }
//         productData.flavors = flavorsArray.filter(f => f && safeString(f) !== '');
        
//         // Size array
//         const sizeArray = [];
//         if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
//           sizeArray.push(...data.formData.details.size);
//         }
//         if (data.formData.details.customSizeInput) {
//           sizeArray.push(data.formData.details.customSizeInput);
//         }
//         productData.size = sizeArray.filter(s => s && safeString(s) !== '');
//       }
      
//       // Location
//       if (data.formData.location) {
//         productData.State = safeString(data.formData.location.state);
//       }
      
//       // Compliance
//       if (data.formData.compliance) {
//         productData.brandName = safeString(data.formData.compliance.fssaiLicense);
//         productData.fssaiLicense = safeString(data.formData.compliance.fssaiLicense);
//         productData.legalDisclaimer = safeString(data.formData.compliance.legalDisclaimer);
//         productData.shelfLife = safeString(data.formData.compliance.shelfLife);
//       }
      
//       // Manufacturing
//       if (data.formData.manufacturing) {
//         productData.manufacturerName = safeString(data.formData.manufacturing.manufacturerName);
//         productData.manufacturerAddress = safeString(data.formData.manufacturing.manufacturerAddress);
//         productData.manufacturer = safeString(data.formData.manufacturing.manufacturerName);
//         productData.manufacturerContact = safeString(data.formData.manufacturing.manufacturerAddress);
        
//         // Packager
//         productData.packagerName = safeString(data.formData.manufacturing.packagerName);
//         productData.packagerAddress = safeString(data.formData.manufacturing.packagerAddress);
//         productData.packagerFssaiLicense = safeString(data.formData.manufacturing.packagerFssaiLicense);
//         productData.packerContact = safeString(
//           data.formData.manufacturing.packagerName && data.formData.manufacturing.packagerAddress ?
//           `${data.formData.manufacturing.packagerName}, ${data.formData.manufacturing.packagerAddress}` :
//           data.formData.manufacturing.packagerName || data.formData.manufacturing.packagerAddress || ''
//         );
        
//         // Marketer
//         productData.marketerName = safeString(data.formData.manufacturing.marketerName);
//         productData.marketerAddress = safeString(data.formData.manufacturing.marketerAddress);
//         productData.marketerNameAddress = safeString(
//           data.formData.manufacturing.marketerName && data.formData.manufacturing.marketerAddress ?
//           `${data.formData.manufacturing.marketerName}, ${data.formData.manufacturing.marketerAddress}` :
//           data.formData.manufacturing.marketerName || data.formData.manufacturing.marketerAddress || ''
//         );
//       }
      
//       // Package Details
//       if (data.formData.package) {
//         productData.packageColour = safeString(data.formData.package.packageColour);
//         productData.measurementUnit = safeString(data.formData.package.measurementUnit);
//         productData.unitCount = safeString(data.formData.package.unitCount);
//         productData.numberOfItems = safeString(data.formData.package.numberOfItems);
//         productData.itemWeight = safeString(data.formData.package.itemWeight);
//         productData.totalEaches = safeString(data.formData.package.totalEaches);
//         productData.itemPackageWeight = safeString(data.formData.package.itemPackageWeight);
//         productData.shelfLife = safeString(data.formData.package.shelfLife || productData.shelfLife);
//       }
      
//       // Dietary & Nutrition
//       if (data.formData.dietary) {
//         productData.dietaryPreferences = safeString(data.formData.dietary.dietaryPreferences);
//         productData.allergenInformation = safeString(data.formData.dietary.allergenInformation);
//         productData.nutrition = safeString(data.formData.dietary.nutrition);
//         productData.cuisine = safeString(data.formData.dietary.cuisine);
//         productData.directions = safeString(data.formData.dietary.directions);
//       }
      
//     } else {
//       // Direct fields without formData
//       productData = {
//         // Basic
//         name: safeString(data.name),
//         description: safeString(data.description),
//         restaurantName: safeString(vendor.storeName || data.restaurantName || ""),
        
//         // Pricing
//         oldPrice: safeNumber(data.oldPrice),
//         price: safeNumber(data.newPrice || data.price),
//         stock: safeNumber(data.stock),
//         quality: safeString(data.quality) || "Standard",
//         dietPreference: safeString(data.dietPreference) || "Veg",
        
//         // Category
//         category: data.category || data.selectedCategory,
//         subcategory: data.subcategory || data.selectedSubCategory,
        
//         // Details
//         productTypes: safeString(data.productTypes),
//         ingredients: safeString(data.ingredients),
//         materialTypes: safeString(data.materialTypes),
//         customWeight: safeString(data.customWeight),
//         customSizeInput: safeString(data.customSizeInput),
//         ageRange: safeString(data.ageRange),
//         containerType: safeString(data.containerType),
//         itemForm: safeString(data.itemForm),
//         specialty: safeString(data.specialty),
//         itemTypeName: safeString(data.itemTypeName),
//         countryOfOrigin: safeString(data.countryOfOrigin),
        
//         // Arrays
//         flavors: safeArray(data.flavors),
//         size: safeArray(data.size),
        
//         // Compliance
//         brandName: safeString(data.brandName || data.fssaiLicenseNumber),
//         fssaiLicense: safeString(data.fssaiLicense || data.fssaiLicenseNumber),
//         legalDisclaimer: safeString(data.legalDisclaimer),
//         shelfLife: safeString(data.shelfLife),
        
//         // Manufacturing
//         manufacturerName: safeString(data.manufacturerName || data.manufacturer),
//         manufacturerAddress: safeString(data.manufacturerAddress || data.manufacturerContact),
//         manufacturer: safeString(data.manufacturer || data.manufacturerName),
//         manufacturerContact: safeString(data.manufacturerContact || data.manufacturerAddress),
        
//         // Packager
//         packagerName: safeString(data.packagerName),
//         packagerAddress: safeString(data.packagerAddress),
//         packagerFssaiLicense: safeString(data.packagerFssaiLicense),
//         packerContact: safeString(data.packerContact),
        
//         // Marketer
//         marketerName: safeString(data.marketerName),
//         marketerAddress: safeString(data.marketerAddress),
//         marketerNameAddress: safeString(data.marketerNameAddress),
        
//         // Package
//         packageColour: safeString(data.packageColour),
//         measurementUnit: safeString(data.measurementUnit),
//         unitCount: safeString(data.unitCount),
//         numberOfItems: safeString(data.numberOfItems),
//         itemWeight: safeString(data.itemWeight),
//         totalEaches: safeString(data.totalEaches),
//         itemPackageWeight: safeString(data.itemPackageWeight),
        
//         // Dietary
//         dietaryPreferences: safeString(data.dietaryPreferences),
//         allergenInformation: safeString(data.allergenInformation || data.allergenInfo),
//         nutrition: safeString(data.nutrition),
//         cuisine: safeString(data.cuisine),
//         directions: safeString(data.directions),
        
//         // Location
//         State: safeString(data.State),
        
//         // Status
//         status: safeString(data.status) || 'pending_approval',
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
    
//     // Step 5: Process images
//     // Main image
//     if (req.files?.image?.[0]) {
//       productData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
//     }
    
//     // Gallery images
//     let galleryImages = [];
    
//     // Mandatory images
//     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
//       const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0], 'vendor_products/gallery');
//       if (img) galleryImages.push(img);
//     }
    
//     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
//       const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0], 'vendor_products/gallery');
//       if (img) galleryImages.push(img);
//     }
    
//     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
//       const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0], 'vendor_products/gallery');
//       if (img) galleryImages.push(img);
//     }
    
//     // Additional gallery images
//     if (req.files?.gallery) {
//       for (const file of req.files.gallery) {
//         const img = await uploadCloud(file, 'vendor_products/gallery');
//         if (img) galleryImages.push(img);
//       }
//     }
    
//     // Clean gallery
//     productData.gallery = galleryImages.filter(img => img && img.trim() !== '');
    
//     // Add vendor ID
//     productData.vendor = req.vendor._id;
    
//     // Debug log
//     console.log("📦 Final product data:", JSON.stringify(productData, null, 2));
    
//     // Create product
//     const product = await VendorProduct.create(productData);
    
//     // Populate and return
//     const populatedProduct = await VendorProduct.findById(product._id)
//       .populate("category", "name image")
//       .populate("subcategory", "name image")
//       .lean();
    
//     res.json({ 
//       success: true, 
//       message: "Product created successfully",
//       data: populatedProduct,
//       vendor: {
//         storeName: vendor.storeName || "",
//         id: vendor._id
//       }
//     });
    
//   } catch (err) {
//     console.error("❌ CREATE VENDOR PRODUCT ERROR:", err);
    
//     if (err.name === 'ValidationError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: Object.values(err.errors).map(e => e.message)
//       });
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: "Server Error: " + err.message
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

//     // Helper functions
//     const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
//     const safeNumber = (value) => {
//       const num = parseFloat(value);
//       return isNaN(num) ? 0 : num;
//     };
//     const safeArray = (value) => {
//       if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
//       if (typeof value === 'string' && value.trim() !== '') {
//         return value.split(',').map(item => item.trim()).filter(item => item !== '');
//       }
//       return [];
//     };

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

//     // Subcategory validation
//     if (data.subcategory) {
//       const subcategoryExists = await SubCategory.findById(data.subcategory);
//       if (!subcategoryExists) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid subcategory selected" 
//         });
//       }
      
//       if (data.category && subcategoryExists.category && 
//           subcategoryExists.category.toString() !== data.category) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Subcategory does not belong to selected category" 
//         });
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
//       // Map formData fields
//       const fieldMappings = {
//         // Basic
//         'name': 'formData.basic.name',
//         'description': 'formData.basic.description',
//         'restaurantName': 'formData.basic.restaurantName',
        
//         // Pricing
//         'oldPrice': 'formData.pricing.oldPrice',
//         'price': 'formData.pricing.newPrice',
//         'stock': 'formData.pricing.stock',
//         'quality': 'formData.pricing.quality',
//         'dietPreference': 'formData.pricing.dietPreference',
        
//         // Details
//         'productTypes': 'formData.details.productTypes',
//         'ingredients': 'formData.details.ingredients',
//         'materialTypes': 'formData.details.materialTypes',
//         'customWeight': 'formData.details.customWeight',
//         'customSizeInput': 'formData.details.customSizeInput',
//         'ageRange': 'formData.details.ageRange',
//         'containerType': 'formData.details.containerType',
//         'itemForm': 'formData.details.itemForm',
//         'specialty': 'formData.details.specialty',
//         'itemTypeName': 'formData.details.itemTypeName',
//         'countryOfOrigin': 'formData.details.countryOfOrigin',
        
//         // Location
//         'State': 'formData.location.state',
        
//         // Compliance
//         'brandName': 'formData.compliance.fssaiLicense',
//         'fssaiLicense': 'formData.compliance.fssaiLicense',
//         'legalDisclaimer': 'formData.compliance.legalDisclaimer',
//         'shelfLife': 'formData.compliance.shelfLife',
        
//         // Manufacturing
//         'manufacturerName': 'formData.manufacturing.manufacturerName',
//         'manufacturerAddress': 'formData.manufacturing.manufacturerAddress',
//         'manufacturer': 'formData.manufacturing.manufacturerName',
//         'manufacturerContact': 'formData.manufacturing.manufacturerAddress',
        
//         // Packager
//         'packagerName': 'formData.manufacturing.packagerName',
//         'packagerAddress': 'formData.manufacturing.packagerAddress',
//         'packagerFssaiLicense': 'formData.manufacturing.packagerFssaiLicense',
        
//         // Marketer
//         'marketerName': 'formData.manufacturing.marketerName',
//         'marketerAddress': 'formData.manufacturing.marketerAddress',
        
//         // Package
//         'packageColour': 'formData.package.packageColour',
//         'measurementUnit': 'formData.package.measurementUnit',
//         'unitCount': 'formData.package.unitCount',
//         'numberOfItems': 'formData.package.numberOfItems',
//         'itemWeight': 'formData.package.itemWeight',
//         'totalEaches': 'formData.package.totalEaches',
//         'itemPackageWeight': 'formData.package.itemPackageWeight',
//         'shelfLife': 'formData.package.shelfLife',
        
//         // Dietary
//         'dietaryPreferences': 'formData.dietary.dietaryPreferences',
//         'allergenInformation': 'formData.dietary.allergenInformation',
//         'nutrition': 'formData.dietary.nutrition',
//         'cuisine': 'formData.dietary.cuisine',
//         'directions': 'formData.dietary.directions',
//       };
      
//       // Process each field
//       Object.entries(fieldMappings).forEach(([field, path]) => {
//         const value = path.split('.').reduce((obj, key) => obj?.[key], data);
//         if (value !== undefined) {
//           if (field.includes('Price') || field === 'stock') {
//             updateData[field] = safeNumber(value);
//           } else if (field === 'flavors' || field === 'size') {
//             updateData[field] = safeArray(value);
//           } else {
//             updateData[field] = safeString(value);
//           }
//         }
//       });
      
//       // Handle packer contact
//       if (data.formData.manufacturing?.packagerName || data.formData.manufacturing?.packagerAddress) {
//         updateData.packerContact = safeString(
//           data.formData.manufacturing.packagerName && data.formData.manufacturing.packagerAddress ?
//           `${data.formData.manufacturing.packagerName}, ${data.formData.manufacturing.packagerAddress}` :
//           data.formData.manufacturing.packagerName || data.formData.manufacturing.packagerAddress || ''
//         );
//       }
      
//       // Handle marketer contact
//       if (data.formData.manufacturing?.marketerName || data.formData.manufacturing?.marketerAddress) {
//         updateData.marketerNameAddress = safeString(
//           data.formData.manufacturing.marketerName && data.formData.manufacturing.marketerAddress ?
//           `${data.formData.manufacturing.marketerName}, ${data.formData.manufacturing.marketerAddress}` :
//           data.formData.manufacturing.marketerName || data.formData.manufacturing.marketerAddress || ''
//         );
//       }
      
//       // Handle flavors array
//       if (data.formData.details?.flavors || data.formData.details?.customFlavorInput) {
//         const flavorsArray = [];
//         if (Array.isArray(data.formData.details.flavors)) {
//           flavorsArray.push(...data.formData.details.flavors);
//         }
//         if (data.formData.details.customFlavorInput) {
//           flavorsArray.push(data.formData.details.customFlavorInput);
//         }
//         updateData.flavors = flavorsArray.filter(f => f && safeString(f) !== '');
//       }
      
//       // Handle size array
//       if (data.formData.details?.size || data.formData.details?.customSizeInput) {
//         const sizeArray = [];
//         if (Array.isArray(data.formData.details.size)) {
//           sizeArray.push(...data.formData.details.size);
//         }
//         if (data.formData.details.customSizeInput) {
//           sizeArray.push(data.formData.details.customSizeInput);
//         }
//         updateData.size = sizeArray.filter(s => s && safeString(s) !== '');
//       }
      
//     } else {
//       // Handle direct field updates
//       const directFields = [
//         'name', 'description', 'restaurantName',
//         'oldPrice', 'price', 'newPrice', 'stock', 'quality', 'dietPreference',
//         'productTypes', 'ingredients', 'materialTypes', 'customWeight', 'customSizeInput',
//         'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
//         'brandName', 'fssaiLicense', 'legalDisclaimer', 'shelfLife',
//         'manufacturerName', 'manufacturerAddress', 'manufacturer', 'manufacturerContact',
//         'packagerName', 'packagerAddress', 'packagerFssaiLicense', 'packerContact',
//         'marketerName', 'marketerAddress', 'marketerNameAddress',
//         'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight',
//         'totalEaches', 'itemPackageWeight',
//         'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
//         'State', 'status'
//       ];
      
//       directFields.forEach(field => {
//         if (data[field] !== undefined) {
//           if (field === 'newPrice') {
//             updateData.price = safeNumber(data[field]);
//           } else if (field.includes('Price') || field === 'stock') {
//             updateData[field] = safeNumber(data[field]);
//           } else if (field === 'flavors' || field === 'size') {
//             updateData[field] = safeArray(data[field]);
//           } else {
//             updateData[field] = safeString(data[field]);
//           }
//         }
//       });
//     }
    
//     // Update images
//     if (req.files?.image?.[0]) {
//       // Delete old image
//       if (product.image && product.image.includes('cloudinary.com')) {
//         await deleteCloudinaryImage(product.image);
//       }
      
//       // Upload new image
//       updateData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
//     }
    
//     // Update gallery
//     let gallery = [...(product.gallery || [])];
    
//     // Update mandatory images if provided
//     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
//       const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0], 'vendor_products/gallery');
//       if (img) gallery[0] = img;
//     }
    
//     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
//       const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0], 'vendor_products/gallery');
//       if (img) gallery[1] = img;
//     }
    
//     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
//       const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0], 'vendor_products/gallery');
//       if (img) gallery[2] = img;
//     }
    
//     // Add new gallery images
//     if (req.files?.gallery) {
//       for (const file of req.files.gallery) {
//         const img = await uploadCloud(file, 'vendor_products/gallery');
//         if (img) gallery.push(img);
//       }
//     }
    
//     // Clean gallery
//     updateData.gallery = gallery.filter(img => img && img.trim() !== '');
    
//     // Update product
//     Object.assign(product, updateData);
//     await product.save();
    
//     // Populate and return
//     const populatedProduct = await VendorProduct.findById(product._id)
//       .populate("category", "name image")
//       .populate("subcategory", "name image")
//       .lean();
    
//     res.json({ 
//       success: true, 
//       message: "Product updated successfully",
//       data: populatedProduct 
//     });
    
//   } catch (err) {
//     console.error("❌ UPDATE VENDOR PRODUCT ERROR:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Server Error: " + err.message 
//     });
//   }
// };

// /* ================= DELETE VENDOR PRODUCT ================= */
// exports.deleteVendorProduct = async (req, res) => {
//   try {
//     const product = await VendorProduct.findOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!product) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Product not found" 
//       });
//     }
    
//     // Delete images from Cloudinary
//     if (product.image && product.image.includes('cloudinary.com')) {
//       await deleteCloudinaryImage(product.image);
//     }
    
//     if (product.gallery && product.gallery.length > 0) {
//       for (const imageUrl of product.gallery) {
//         if (imageUrl && imageUrl.includes('cloudinary.com')) {
//           await deleteCloudinaryImage(imageUrl);
//         }
//       }
//     }
    
//     // Delete product from database
//     await product.deleteOne();
    
//     res.json({ 
//       success: true, 
//       message: "Product deleted successfully" 
//     });
//   } catch (err) {
//     console.error("❌ Delete vendor product error:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Server Error" 
//     });
//   }
// };

// /* ================= CSV IMPORT ================= */
// exports.importCSV = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "CSV file required" 
//       });
//     }

//     const vendorId = req.vendor._id;
//     const vendor = await Vendor.findById(vendorId);
//     const rows = [];
//     const results = [];

//     // Parse CSV file
//     const csvData = req.file.buffer.toString();
//     const lines = csvData.split('\n');
//     const headers = lines[0].split(',').map(h => h.trim());

//     for (let i = 1; i < lines.length; i++) {
//       if (!lines[i].trim()) continue;
      
//       const values = lines[i].split(',').map(v => v.replace(/^"|"$/g, '').trim());
//       const row = {};
      
//       headers.forEach((header, index) => {
//         if (values[index] !== undefined) {
//           row[header] = values[index];
//         }
//       });
      
//       rows.push(row);
//     }

//     let created = 0;
//     let updated = 0;
//     let errors = [];

//     for (const [index, row] of rows.entries()) {
//       try {
//         if (!row.name || !row.price) {
//           errors.push(`Row ${index + 1}: Name and price are required`);
//           continue;
//         }

//         // Find category
//         let categoryId = null;
//         if (row.category) {
//           const category = await Category.findOne({ 
//             name: { $regex: new RegExp(`^${row.category}$`, 'i') } 
//           });
//           if (category) categoryId = category._id;
//         }

//         // Find subcategory
//         let subcategoryId = null;
//         if (row.subcategory) {
//           const subcategory = await SubCategory.findOne({ 
//             name: { $regex: new RegExp(`^${row.subcategory}$`, 'i') },
//             ...(categoryId ? { category: categoryId } : {})
//           });
//           if (subcategory) subcategoryId = subcategory._id;
//         }

//         // Prepare product data
//         const productData = {
//           name: row.name,
//           brandName: row.brandName || "",
//           description: row.description || "",
//           oldPrice: parseFloat(row.oldPrice) || 0,
//           price: parseFloat(row.price),
//           stock: parseInt(row.stock) || 0,
//           quality: row.quality || "Standard",
//           State: row.State || "",
//           vendor: vendorId,
//           restaurantName: vendor.storeName || row.restaurantName || "",
//           category: categoryId,
//           subcategory: subcategoryId,
//           productTypes: row.productTypes || "",
//           flavors: row.flavors ? row.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : [],
//           size: row.size ? row.size.split(',').map(s => s.trim()).filter(s => s !== '') : [],
//           dietPreference: row.dietPreference || "Veg",
//           ageRange: row.ageRange || "",
//           containerType: row.containerType || "",
//           itemForm: row.itemForm || "",
//           specialty: row.specialty || "",
//           itemTypeName: row.itemTypeName || "",
//           countryOfOrigin: row.countryOfOrigin || "",
//           manufacturerName: row.manufacturerName || row.manufacturer || "",
//           manufacturerAddress: row.manufacturerAddress || row.manufacturerContact || "",
//           manufacturer: row.manufacturer || row.manufacturerName || "",
//           manufacturerContact: row.manufacturerContact || row.manufacturerAddress || "",
//           packagerName: row.packagerName || "",
//           packagerAddress: row.packagerAddress || "",
//           packagerFssaiLicense: row.packagerFssaiLicense || "",
//           packerContact: row.packerContact || "",
//           marketerName: row.marketerName || "",
//           marketerAddress: row.marketerAddress || "",
//           marketerNameAddress: row.marketerNameAddress || "",
//           packageColour: row.packageColour || "",
//           measurementUnit: row.measurementUnit || "",
//           unitCount: row.unitCount || "",
//           numberOfItems: row.numberOfItems || "",
//           itemWeight: row.itemWeight || "",
//           totalEaches: row.totalEaches || "",
//           itemPackageWeight: row.itemPackageWeight || "",
//           shelfLife: row.shelfLife || "",
//           ingredients: row.ingredients || "",
//           allergenInformation: row.allergenInformation || row.allergenInfo || "",
//           directions: row.directions || "",
//           nutrition: row.nutrition || "",
//           cuisine: row.cuisine || "",
//           dietaryPreferences: row.dietaryPreferences || "",
//           materialTypes: row.materialTypes || "",
//           customWeight: row.customWeight || "",
//           customSizeInput: row.customSizeInput || "",
//           fssaiLicense: row.fssaiLicense || row.brandName || "",
//           legalDisclaimer: row.legalDisclaimer || "",
//           status: row.status || 'pending_approval'
//         };

//         if (row._id) {
//           // Update existing product
//           await VendorProduct.updateOne(
//             { _id: row._id, vendor: vendorId },
//             productData
//           );
//           updated++;
//         } else {
//           // Create new product
//           await VendorProduct.create(productData);
//           created++;
//         }
        
//       } catch (error) {
//         errors.push(`Row ${index + 1}: ${error.message}`);
//       }
//     }

//     res.json({
//       success: true,
//       message: `CSV import completed: ${created} created, ${updated} updated`,
//       created,
//       updated,
//       total: rows.length,
//       errors: errors.length > 0 ? errors : undefined,
//     });
    
//   } catch (err) {
//     console.error("❌ CSV import error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "CSV Import Failed" 
//     });
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

//     // Transform data for CSV
//     const transformedProducts = products.map(product => ({
//       _id: product._id,
//       name: product.name,
//       description: product.description || "",
//       brandName: product.brandName || "",
//       fssaiLicense: product.fssaiLicense || "",
//       restaurantName: product.restaurantName || "",
//       oldPrice: product.oldPrice || 0,
//       price: product.price || 0,
//       stock: product.stock || 0,
//       quality: product.quality || "Standard",
//       State: product.State || "",
//       category: product.category ? product.category.name : "",
//       subcategory: product.subcategory ? product.subcategory.name : "",
//       categoryId: product.category ? product.category._id : "",
//       subcategoryId: product.subcategory ? product.subcategory._id : "",
//       productTypes: product.productTypes || "",
//       flavors: Array.isArray(product.flavors) ? product.flavors.join(',') : product.flavors || "",
//       size: Array.isArray(product.size) ? product.size.join(',') : product.size || "",
//       dietPreference: product.dietPreference || "Veg",
//       ageRange: product.ageRange || "",
//       containerType: product.containerType || "",
//       itemForm: product.itemForm || "",
//       specialty: product.specialty || "",
//       itemTypeName: product.itemTypeName || "",
//       countryOfOrigin: product.countryOfOrigin || "",
//       manufacturerName: product.manufacturerName || "",
//       manufacturerAddress: product.manufacturerAddress || "",
//       manufacturer: product.manufacturer || "",
//       manufacturerContact: product.manufacturerContact || "",
//       packagerName: product.packagerName || "",
//       packagerAddress: product.packagerAddress || "",
//       packagerFssaiLicense: product.packagerFssaiLicense || "",
//       packerContact: product.packerContact || "",
//       marketerName: product.marketerName || "",
//       marketerAddress: product.marketerAddress || "",
//       marketerNameAddress: product.marketerNameAddress || "",
//       packageColour: product.packageColour || "",
//       measurementUnit: product.measurementUnit || "",
//       unitCount: product.unitCount || "",
//       numberOfItems: product.numberOfItems || "",
//       itemWeight: product.itemWeight || "",
//       totalEaches: product.totalEaches || "",
//       itemPackageWeight: product.itemPackageWeight || "",
//       shelfLife: product.shelfLife || "",
//       ingredients: product.ingredients || "",
//       allergenInformation: product.allergenInformation || "",
//       directions: product.directions || "",
//       nutrition: product.nutrition || "",
//       cuisine: product.cuisine || "",
//       dietaryPreferences: product.dietaryPreferences || "",
//       materialTypes: product.materialTypes || "",
//       customWeight: product.customWeight || "",
//       customSizeInput: product.customSizeInput || "",
//       legalDisclaimer: product.legalDisclaimer || "",
//       status: product.status || "pending_approval",
//       createdAt: product.createdAt,
//       updatedAt: product.updatedAt
//     }));

//     const fields = [
//       '_id', 'name', 'description', 'brandName', 'fssaiLicense', 'restaurantName',
//       'oldPrice', 'price', 'stock', 'quality', 'State',
//       'category', 'subcategory', 'categoryId', 'subcategoryId',
//       'productTypes', 'flavors', 'size', 'dietPreference',
//       'ageRange', 'containerType', 'itemForm', 'specialty',
//       'itemTypeName', 'countryOfOrigin', 'manufacturerName',
//       'manufacturerAddress', 'manufacturer', 'manufacturerContact',
//       'packagerName', 'packagerAddress', 'packagerFssaiLicense', 'packerContact',
//       'marketerName', 'marketerAddress', 'marketerNameAddress',
//       'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
//       'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife',
//       'ingredients', 'allergenInformation', 'directions', 'nutrition',
//       'cuisine', 'dietaryPreferences', 'materialTypes', 'customWeight',
//       'customSizeInput', 'legalDisclaimer', 'status', 'createdAt', 'updatedAt'
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
//     console.error("❌ CSV export error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "CSV Export Failed" 
//     });
//   }
// };

// /* ================= BULK UPDATE ================= */
// exports.bulkUpdate = async (req, res) => {
//   try {
//     const { ids, data } = req.body;
//     if (!ids?.length) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Product IDs required" 
//       });
//     }

//     // Prepare update data
//     const updateData = { ...data };
    
//     // Handle price mapping
//     if (updateData.newPrice !== undefined) {
//       updateData.price = updateData.newPrice;
//       delete updateData.newPrice;
//     }
    
//     // Convert numeric fields
//     if (updateData.price) updateData.price = parseFloat(updateData.price);
//     if (updateData.oldPrice) updateData.oldPrice = parseFloat(updateData.oldPrice);
//     if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    
//     // Handle array fields
//     if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
//       updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
//     }
    
//     if (updateData.size !== undefined && typeof updateData.size === 'string') {
//       updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
//     }

//     const result = await VendorProduct.updateMany(
//       { _id: { $in: ids }, vendor: req.vendor._id },
//       { $set: updateData },
//       { runValidators: true }
//     );

//     res.json({ 
//       success: true, 
//       message: `${result.modifiedCount} products updated`,
//       modified: result.modifiedCount 
//     });
//   } catch (err) {
//     console.error("❌ Bulk update error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Bulk update failed" 
//     });
//   }
// };

// /* ================= BULK DELETE ================= */
// exports.bulkDelete = async (req, res) => {
//   try {
//     const { ids } = req.body;
//     if (!ids?.length) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Product IDs required" 
//       });
//     }

//     // Find products to delete images
//     const products = await VendorProduct.find({
//       _id: { $in: ids },
//       vendor: req.vendor._id,
//     });

//     // Delete images from Cloudinary
//     for (const product of products) {
//       if (product.image && product.image.includes('cloudinary.com')) {
//         await deleteCloudinaryImage(product.image);
//       }
      
//       if (product.gallery && product.gallery.length > 0) {
//         for (const imageUrl of product.gallery) {
//           if (imageUrl && imageUrl.includes('cloudinary.com')) {
//             await deleteCloudinaryImage(imageUrl);
//           }
//         }
//       }
//     }

//     const result = await VendorProduct.deleteMany({
//       _id: { $in: ids },
//       vendor: req.vendor._id,
//     });

//     res.json({ 
//       success: true, 
//       message: `${result.deletedCount} products deleted`,
//       deleted: result.deletedCount 
//     });
//   } catch (err) {
//     console.error("❌ Bulk delete error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Bulk delete failed" 
//     });
//   }
// };

// /* ================= UPDATE PRODUCT STATUS ================= */
// exports.updateProductStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
    
//     const allowedStatuses = ['active', 'inactive', 'draft', 'out_of_stock', 'pending_approval'];
    
//     if (!status || !allowedStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Valid status is required'
//       });
//     }
    
//     const product = await VendorProduct.findOneAndUpdate(
//       { _id: id, vendor: req.vendor._id },
//       { status },
//       { new: true, runValidators: true }
//     )
//       .populate("category", "name image")
//       .populate("subcategory", "name image")
//       .lean();
    
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Product status updated successfully',
//       data: product
//     });
    
//   } catch (err) {
//     console.error('❌ Update product status error:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update product status'
//     });
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
async function uploadCloud(file, folder = "vendor_products") {
  try {
    if (!file || !file.buffer) {
      console.error("❌ No file buffer provided");
      return null;
    }

    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;
    
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: "auto",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto:good" }
      ]
    });
    
    console.log(`✅ Cloudinary upload successful: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error.message);
    return null;
  }
}

/* ================= DELETE CLOUDINARY IMAGE ================= */
async function deleteCloudinaryImage(imageUrl) {
  try {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
      return;
    }
    
    const urlParts = imageUrl.split('/');
    const publicIdWithExtension = urlParts.slice(-2).join('/');
    const publicId = publicIdWithExtension.split('.')[0];
    
    await cloudinary.uploader.destroy(publicId);
    console.log(`✅ Deleted Cloudinary image: ${publicId}`);
  } catch (error) {
    console.error("❌ Error deleting Cloudinary image:", error.message);
  }
}

/* ================= GET CATEGORIES ================= */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select("name image _id")
      .sort({ name: 1 });
    
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error("❌ Get categories error:", err);
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
      .select("name image _id category")
      .sort({ name: 1 });
    
    res.json({ success: true, data: subcategories });
  } catch (err) {
    console.error("❌ Get subcategories error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET VENDOR PRODUCTS ================= */
exports.getVendorProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      search = '',
      category = '',
      subcategory = '',
      status = '',
      sort = '-createdAt'
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const query = { vendor: req.vendor._id };
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brandName: { $regex: search, $options: 'i' } },
        { restaurantName: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    
    // Status filter
    if (status) query.status = status;
    
    const products = await VendorProduct.find(query)
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .lean();

    const total = await VendorProduct.countDocuments(query);
    const vendor = await Vendor.findById(req.vendor._id).select("storeName name email phone");

    res.json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      vendor: {
        id: vendor._id,
        storeName: vendor.storeName || "",
        name: vendor.name || "",
        email: vendor.email || "",
        phone: vendor.phone || ""
      },
      data: products,
    });
  } catch (err) {
    console.error("❌ Get vendor products error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= CREATE VENDOR PRODUCT ================= */
exports.createVendorProduct = async (req, res) => {
  try {
    console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
    
    const vendor = await Vendor.findById(req.vendor._id);
    if (!vendor) {
      return res.status(404).json({ 
        success: false, 
        message: "Vendor not found" 
      });
    }
    
    const data = { ...req.body };
    
    // ================= VARIATION FLAGS - FIXED =================
    const hasVariations = data.hasVariations === true || data.hasVariations === "true";
    
    // Parse variations from request
    let variations = [];
    if (data.variations) {
      try {
        variations = typeof data.variations === "string" 
          ? JSON.parse(data.variations) 
          : data.variations;
      } catch (e) {
        console.error("Error parsing variations:", e);
        variations = [];
      }
    }

    // Step 1: Initialize product data
    let productData = {};
    productData.hasVariations = hasVariations;
    productData.variations = hasVariations ? variations : [];

    // Helper functions
    const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
    const safeNumber = (value) => {
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    };
    const safeArray = (value) => {
      if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
      if (typeof value === 'string' && value.trim() !== '') {
        return value.split(',').map(item => item.trim()).filter(item => item !== '');
      }
      return [];
    };
    
    // Step 2: Category Validation
    if (data.category) {
      const categoryExists = await Category.findById(data.category);
      if (!categoryExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid category selected" 
        });
      }
      productData.category = data.category;
    } else {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }

    // Step 3: Subcategory validation
    if (data.subcategory) {
      const subcategoryExists = await SubCategory.findById(data.subcategory);
      if (!subcategoryExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid subcategory selected" 
        });
      }
      
      if (subcategoryExists.category && subcategoryExists.category.toString() !== data.category) {
        return res.status(400).json({ 
          success: false, 
          message: "Subcategory does not belong to selected category" 
        });
      }
      
      productData.subcategory = data.subcategory;
    }
    
    // Step 4: Process formData if present
    if (data.formData && typeof data.formData === 'string') {
      try {
        data.formData = JSON.parse(data.formData);
      } catch (e) {
        console.log("Could not parse formData string");
      }
    }
    
    if (data.formData && typeof data.formData === 'object') {
      // Basic Information
      productData.name = safeString(data.formData.basic?.name || data.name);
      productData.description = safeString(data.formData.basic?.description || data.description);
      productData.restaurantName = safeString(vendor.storeName || data.formData.basic?.restaurantName || "");
      
      // Pricing - ONLY IF NO VARIATIONS
      if (!hasVariations) {
        if (data.formData.pricing) {
          productData.oldPrice = safeNumber(data.formData.pricing.oldPrice);
          productData.price = safeNumber(data.formData.pricing.newPrice || data.formData.pricing.price);
          productData.stock = safeNumber(data.formData.pricing.stock);
          productData.quality = safeString(data.formData.pricing.quality) || "Standard";
          productData.dietPreference = safeString(data.formData.pricing.dietPreference) || "Veg";
        } else {
          productData.oldPrice = safeNumber(data.oldPrice);
          productData.price = safeNumber(data.newPrice || data.price);
          productData.stock = safeNumber(data.stock);
          productData.quality = safeString(data.quality) || "Standard";
          productData.dietPreference = safeString(data.dietPreference) || "Veg";
        }
      } else {
        // For variations, just set quality and dietPreference
        if (data.formData.pricing) {
          productData.quality = safeString(data.formData.pricing.quality) || "Standard";
          productData.dietPreference = safeString(data.formData.pricing.dietPreference) || "Veg";
        } else {
          productData.quality = "Standard";
          productData.dietPreference = "Veg";
        }
      }
      
      // Product Details
      if (data.formData.details) {
        productData.productTypes = safeString(data.formData.details.productTypes);
        productData.ingredients = safeString(data.formData.details.ingredients);
        productData.materialTypes = safeString(data.formData.details.materialTypes);
        productData.customWeight = safeString(data.formData.details.customWeight);
        productData.customSizeInput = safeString(data.formData.details.customSizeInput);
        productData.ageRange = safeString(data.formData.details.ageRange);
        productData.containerType = safeString(data.formData.details.containerType);
        productData.itemForm = safeString(data.formData.details.itemForm);
        productData.specialty = safeString(data.formData.details.specialty);
        productData.itemTypeName = safeString(data.formData.details.itemTypeName);
        productData.countryOfOrigin = safeString(data.formData.details.countryOfOrigin);
        
        // Flavors array
        const flavorsArray = [];
        if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
          flavorsArray.push(...data.formData.details.flavors);
        }
        if (data.formData.details.customFlavorInput) {
          flavorsArray.push(data.formData.details.customFlavorInput);
        }
        productData.flavors = flavorsArray.filter(f => f && safeString(f) !== '');
        
        // Size array
        const sizeArray = [];
        if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
          sizeArray.push(...data.formData.details.size);
        }
        if (data.formData.details.customSizeInput) {
          sizeArray.push(data.formData.details.customSizeInput);
        }
        productData.size = sizeArray.filter(s => s && safeString(s) !== '');
      }
      
      // Location
      if (data.formData.location) {
        productData.State = safeString(data.formData.location.state);
      }
      
      // Compliance
      if (data.formData.compliance) {
        productData.brandName = safeString(data.formData.compliance.fssaiLicense);
        productData.fssaiLicense = safeString(data.formData.compliance.fssaiLicense);
        productData.legalDisclaimer = safeString(data.formData.compliance.legalDisclaimer);
        productData.shelfLife = safeString(data.formData.compliance.shelfLife);
      }
      
      // Manufacturing
      if (data.formData.manufacturing) {
        productData.manufacturerName = safeString(data.formData.manufacturing.manufacturerName);
        productData.manufacturerAddress = safeString(data.formData.manufacturing.manufacturerAddress);
        productData.manufacturer = safeString(data.formData.manufacturing.manufacturerName);
        productData.manufacturerContact = safeString(data.formData.manufacturing.manufacturerAddress);
        
        // Packager
        productData.packagerName = safeString(data.formData.manufacturing.packagerName);
        productData.packagerAddress = safeString(data.formData.manufacturing.packagerAddress);
        productData.packagerFssaiLicense = safeString(data.formData.manufacturing.packagerFssaiLicense);
        productData.packerContact = safeString(
          data.formData.manufacturing.packagerName && data.formData.manufacturing.packagerAddress ?
          `${data.formData.manufacturing.packagerName}, ${data.formData.manufacturing.packagerAddress}` :
          data.formData.manufacturing.packagerName || data.formData.manufacturing.packagerAddress || ''
        );
        
        // Marketer
        productData.marketerName = safeString(data.formData.manufacturing.marketerName);
        productData.marketerAddress = safeString(data.formData.manufacturing.marketerAddress);
        productData.marketerNameAddress = safeString(
          data.formData.manufacturing.marketerName && data.formData.manufacturing.marketerAddress ?
          `${data.formData.manufacturing.marketerName}, ${data.formData.manufacturing.marketerAddress}` :
          data.formData.manufacturing.marketerName || data.formData.manufacturing.marketerAddress || ''
        );
      }
      
      // Package Details
      if (data.formData.package) {
        productData.packageColour = safeString(data.formData.package.packageColour);
        productData.measurementUnit = safeString(data.formData.package.measurementUnit);
        productData.unitCount = safeString(data.formData.package.unitCount);
        productData.numberOfItems = safeString(data.formData.package.numberOfItems);
        productData.itemWeight = safeString(data.formData.package.itemWeight);
        productData.totalEaches = safeString(data.formData.package.totalEaches);
        productData.itemPackageWeight = safeString(data.formData.package.itemPackageWeight);
        productData.shelfLife = safeString(data.formData.package.shelfLife || productData.shelfLife);
      }
      
      // Dietary & Nutrition
      if (data.formData.dietary) {
        productData.dietaryPreferences = safeString(data.formData.dietary.dietaryPreferences);
        productData.allergenInformation = safeString(data.formData.dietary.allergenInformation);
        productData.nutrition = safeString(data.formData.dietary.nutrition);
        productData.cuisine = safeString(data.formData.dietary.cuisine);
        productData.directions = safeString(data.formData.dietary.directions);
      }
      
    } else {
      // Direct fields without formData
      productData.name = safeString(data.name);
      productData.description = safeString(data.description);
      productData.restaurantName = safeString(vendor.storeName || data.restaurantName || "");
      
      // Pricing - ONLY IF NO VARIATIONS
      if (!hasVariations) {
        productData.oldPrice = safeNumber(data.oldPrice);
        productData.price = safeNumber(data.newPrice || data.price);
        productData.stock = safeNumber(data.stock);
        productData.quality = safeString(data.quality) || "Standard";
        productData.dietPreference = safeString(data.dietPreference) || "Veg";
      } else {
        productData.quality = safeString(data.quality) || "Standard";
        productData.dietPreference = safeString(data.dietPreference) || "Veg";
      }
      
      // Category
      productData.category = data.category || data.selectedCategory;
      productData.subcategory = data.subcategory || data.selectedSubCategory;
      
      // Details
      productData.productTypes = safeString(data.productTypes);
      productData.ingredients = safeString(data.ingredients);
      productData.materialTypes = safeString(data.materialTypes);
      productData.customWeight = safeString(data.customWeight);
      productData.customSizeInput = safeString(data.customSizeInput);
      productData.ageRange = safeString(data.ageRange);
      productData.containerType = safeString(data.containerType);
      productData.itemForm = safeString(data.itemForm);
      productData.specialty = safeString(data.specialty);
      productData.itemTypeName = safeString(data.itemTypeName);
      productData.countryOfOrigin = safeString(data.countryOfOrigin);
      
      // Arrays
      productData.flavors = safeArray(data.flavors);
      productData.size = safeArray(data.size);
      
      // Compliance
      productData.brandName = safeString(data.brandName || data.fssaiLicenseNumber);
      productData.fssaiLicense = safeString(data.fssaiLicense || data.fssaiLicenseNumber);
      productData.legalDisclaimer = safeString(data.legalDisclaimer);
      productData.shelfLife = safeString(data.shelfLife);
      
      // Manufacturing
      productData.manufacturerName = safeString(data.manufacturerName || data.manufacturer);
      productData.manufacturerAddress = safeString(data.manufacturerAddress || data.manufacturerContact);
      productData.manufacturer = safeString(data.manufacturer || data.manufacturerName);
      productData.manufacturerContact = safeString(data.manufacturerContact || data.manufacturerAddress);
      
      // Packager
      productData.packagerName = safeString(data.packagerName);
      productData.packagerAddress = safeString(data.packagerAddress);
      productData.packagerFssaiLicense = safeString(data.packagerFssaiLicense);
      productData.packerContact = safeString(data.packerContact);
      
      // Marketer
      productData.marketerName = safeString(data.marketerName);
      productData.marketerAddress = safeString(data.marketerAddress);
      productData.marketerNameAddress = safeString(data.marketerNameAddress);
      
      // Package
      productData.packageColour = safeString(data.packageColour);
      productData.measurementUnit = safeString(data.measurementUnit);
      productData.unitCount = safeString(data.unitCount);
      productData.numberOfItems = safeString(data.numberOfItems);
      productData.itemWeight = safeString(data.itemWeight);
      productData.totalEaches = safeString(data.totalEaches);
      productData.itemPackageWeight = safeString(data.itemPackageWeight);
      
      // Dietary
      productData.dietaryPreferences = safeString(data.dietaryPreferences);
      productData.allergenInformation = safeString(data.allergenInformation || data.allergenInfo);
      productData.nutrition = safeString(data.nutrition);
      productData.cuisine = safeString(data.cuisine);
      productData.directions = safeString(data.directions);
      
      // Location
      productData.State = safeString(data.State);
      
      // Status
      productData.status = safeString(data.status) || 'pending_approval';
    }
    
    // Required validation - FIXED
    if (!productData.name || !productData.category || (!hasVariations && !productData.price)) {
      console.log("❌ Validation failed:", {
        name: productData.name,
        price: productData.price,
        category: productData.category,
        hasVariations: hasVariations
      });
      
      return res.status(400).json({
        success: false,
        message: "Name and category are required. Price is required for non-variation products.",
        received: {
          name: productData.name,
          category: productData.category,
          hasVariations: hasVariations,
          price: productData.price
        }
      });
    }
    
    // Step 5: Process images
    // Main image
    if (req.files?.image?.[0]) {
      productData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
    }
    
    // Gallery images
    let galleryImages = [];
    
    // Mandatory images
    if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
      const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0], 'vendor_products/gallery');
      if (img) galleryImages.push(img);
    }
    
    if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
      const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0], 'vendor_products/gallery');
      if (img) galleryImages.push(img);
    }
    
    if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
      const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0], 'vendor_products/gallery');
      if (img) galleryImages.push(img);
    }
    
    // Additional gallery images
    if (req.files?.gallery) {
      for (const file of req.files.gallery) {
        const img = await uploadCloud(file, 'vendor_products/gallery');
        if (img) galleryImages.push(img);
      }
    }
    
    // Clean gallery
    productData.gallery = galleryImages.filter(img => img && img.trim() !== '');
    
    // ================= VARIATION IMAGES - FIXED ================= 
    if (hasVariations && Array.isArray(productData.variations) && req.files?.variationImages) {
      for (let i = 0; i < productData.variations.length; i++) {
        if (req.files.variationImages[i]) {
          const img = await uploadCloud(
            req.files.variationImages[i],
            "vendor_products/variations"
          );
          if (img) {
            productData.variations[i].image = img;
          }
        }
      }
    }
    
    // If has variations, remove base price/stock fields - MOVED TO CORRECT POSITION
    if (hasVariations) {
      delete productData.price;
      delete productData.stock;
      delete productData.oldPrice;
    }

    // Add vendor ID
    productData.vendor = req.vendor._id;
    
    // Debug log
    console.log("📦 Final product data:", JSON.stringify(productData, null, 2));
    
    // Create product
    const product = await VendorProduct.create(productData);
    
    // Populate and return
    const populatedProduct = await VendorProduct.findById(product._id)
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .lean();
    
    res.json({ 
      success: true, 
      message: "Product created successfully",
      data: populatedProduct,
      vendor: {
        storeName: vendor.storeName || "",
        id: vendor._id
      }
    });
    
  } catch (err) {
    console.error("❌ CREATE VENDOR PRODUCT ERROR:", err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(err.errors).map(e => e.message)
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
    
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const data = { ...req.body };
    const updateData = {};

    // ================= VARIATION FLAGS =================
    const hasVariations = data.hasVariations === true || data.hasVariations === "true";
    
    // Parse variations
    if (data.variations) {
      try {
        updateData.variations = typeof data.variations === "string"
          ? JSON.parse(data.variations)
          : data.variations;
        updateData.hasVariations = hasVariations;
      } catch (e) {
        console.error("Error parsing variations:", e);
      }
    }

    // Helper functions
    const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
    const safeNumber = (value) => {
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    };
    const safeArray = (value) => {
      if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
      if (typeof value === 'string' && value.trim() !== '') {
        return value.split(',').map(item => item.trim()).filter(item => item !== '');
      }
      return [];
    };

    // Category validation
    if (data.category) {
      const categoryExists = await Category.findById(data.category);
      if (!categoryExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid category selected" 
        });
      }
      updateData.category = data.category;
    }

    // Subcategory validation
    if (data.subcategory) {
      const subcategoryExists = await SubCategory.findById(data.subcategory);
      if (!subcategoryExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid subcategory selected" 
        });
      }
      
      if (data.category && subcategoryExists.category && 
          subcategoryExists.category.toString() !== data.category) {
        return res.status(400).json({ 
          success: false, 
          message: "Subcategory does not belong to selected category" 
        });
      }
      updateData.subcategory = data.subcategory;
    }
    
    // Process formData if present
    if (data.formData && typeof data.formData === 'string') {
      try {
        data.formData = JSON.parse(data.formData);
      } catch (e) {
        console.log("Could not parse formData string");
      }
    }
    
    if (data.formData && typeof data.formData === 'object') {
      // Map formData fields
      const fieldMappings = {
        // Basic
        'name': 'formData.basic.name',
        'description': 'formData.basic.description',
        'restaurantName': 'formData.basic.restaurantName',
        
        // Pricing - Only if no variations
        'oldPrice': !hasVariations ? 'formData.pricing.oldPrice' : null,
        'price': !hasVariations ? 'formData.pricing.newPrice' : null,
        'stock': !hasVariations ? 'formData.pricing.stock' : null,
        'quality': 'formData.pricing.quality',
        'dietPreference': 'formData.pricing.dietPreference',
        
        // Details
        'productTypes': 'formData.details.productTypes',
        'ingredients': 'formData.details.ingredients',
        'materialTypes': 'formData.details.materialTypes',
        'customWeight': 'formData.details.customWeight',
        'customSizeInput': 'formData.details.customSizeInput',
        'ageRange': 'formData.details.ageRange',
        'containerType': 'formData.details.containerType',
        'itemForm': 'formData.details.itemForm',
        'specialty': 'formData.details.specialty',
        'itemTypeName': 'formData.details.itemTypeName',
        'countryOfOrigin': 'formData.details.countryOfOrigin',
        
        // Location
        'State': 'formData.location.state',
        
        // Compliance
        'brandName': 'formData.compliance.fssaiLicense',
        'fssaiLicense': 'formData.compliance.fssaiLicense',
        'legalDisclaimer': 'formData.compliance.legalDisclaimer',
        'shelfLife': 'formData.compliance.shelfLife',
        
        // Manufacturing
        'manufacturerName': 'formData.manufacturing.manufacturerName',
        'manufacturerAddress': 'formData.manufacturing.manufacturerAddress',
        'manufacturer': 'formData.manufacturing.manufacturerName',
        'manufacturerContact': 'formData.manufacturing.manufacturerAddress',
        
        // Packager
        'packagerName': 'formData.manufacturing.packagerName',
        'packagerAddress': 'formData.manufacturing.packagerAddress',
        'packagerFssaiLicense': 'formData.manufacturing.packagerFssaiLicense',
        
        // Marketer
        'marketerName': 'formData.manufacturing.marketerName',
        'marketerAddress': 'formData.manufacturing.marketerAddress',
        
        // Package
        'packageColour': 'formData.package.packageColour',
        'measurementUnit': 'formData.package.measurementUnit',
        'unitCount': 'formData.package.unitCount',
        'numberOfItems': 'formData.package.numberOfItems',
        'itemWeight': 'formData.package.itemWeight',
        'totalEaches': 'formData.package.totalEaches',
        'itemPackageWeight': 'formData.package.itemPackageWeight',
        
        // Dietary
        'dietaryPreferences': 'formData.dietary.dietaryPreferences',
        'allergenInformation': 'formData.dietary.allergenInformation',
        'nutrition': 'formData.dietary.nutrition',
        'cuisine': 'formData.dietary.cuisine',
        'directions': 'formData.dietary.directions',
      };
      
      // Process each field
      Object.entries(fieldMappings).forEach(([field, path]) => {
        if (path === null) return; // Skip if path is null (variations case)
        
        const value = path.split('.').reduce((obj, key) => obj?.[key], data);
        if (value !== undefined) {
          if (field.includes('Price') || field === 'stock') {
            updateData[field] = safeNumber(value);
          } else if (field === 'flavors' || field === 'size') {
            updateData[field] = safeArray(value);
          } else {
            updateData[field] = safeString(value);
          }
        }
      });
      
      // Handle packer contact
      if (data.formData.manufacturing?.packagerName || data.formData.manufacturing?.packagerAddress) {
        updateData.packerContact = safeString(
          data.formData.manufacturing.packagerName && data.formData.manufacturing.packagerAddress ?
          `${data.formData.manufacturing.packagerName}, ${data.formData.manufacturing.packagerAddress}` :
          data.formData.manufacturing.packagerName || data.formData.manufacturing.packagerAddress || ''
        );
      }
      
      // Handle marketer contact
      if (data.formData.manufacturing?.marketerName || data.formData.manufacturing?.marketerAddress) {
        updateData.marketerNameAddress = safeString(
          data.formData.manufacturing.marketerName && data.formData.manufacturing.marketerAddress ?
          `${data.formData.manufacturing.marketerName}, ${data.formData.manufacturing.marketerAddress}` :
          data.formData.manufacturing.marketerName || data.formData.manufacturing.marketerAddress || ''
        );
      }
      
      // Handle flavors array
      if (data.formData.details?.flavors || data.formData.details?.customFlavorInput) {
        const flavorsArray = [];
        if (Array.isArray(data.formData.details.flavors)) {
          flavorsArray.push(...data.formData.details.flavors);
        }
        if (data.formData.details.customFlavorInput) {
          flavorsArray.push(data.formData.details.customFlavorInput);
        }
        updateData.flavors = flavorsArray.filter(f => f && safeString(f) !== '');
      }
      
      // Handle size array
      if (data.formData.details?.size || data.formData.details?.customSizeInput) {
        const sizeArray = [];
        if (Array.isArray(data.formData.details.size)) {
          sizeArray.push(...data.formData.details.size);
        }
        if (data.formData.details.customSizeInput) {
          sizeArray.push(data.formData.details.customSizeInput);
        }
        updateData.size = sizeArray.filter(s => s && safeString(s) !== '');
      }
      
    } else {
      // Handle direct field updates
      const directFields = [
        'name', 'description', 'restaurantName',
        'oldPrice', 'price', 'newPrice', 'stock', 'quality', 'dietPreference',
        'productTypes', 'ingredients', 'materialTypes', 'customWeight', 'customSizeInput',
        'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
        'brandName', 'fssaiLicense', 'legalDisclaimer', 'shelfLife',
        'manufacturerName', 'manufacturerAddress', 'manufacturer', 'manufacturerContact',
        'packagerName', 'packagerAddress', 'packagerFssaiLicense', 'packerContact',
        'marketerName', 'marketerAddress', 'marketerNameAddress',
        'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight',
        'totalEaches', 'itemPackageWeight',
        'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
        'State', 'status'
      ];
      
      directFields.forEach(field => {
        if (data[field] !== undefined) {
          // Skip price/stock fields if has variations
          if (hasVariations && (field === 'price' || field === 'stock' || field === 'oldPrice' || field === 'newPrice')) {
            return;
          }
          
          if (field === 'newPrice') {
            updateData.price = safeNumber(data[field]);
          } else if (field.includes('Price') || field === 'stock') {
            updateData[field] = safeNumber(data[field]);
          } else if (field === 'flavors' || field === 'size') {
            updateData[field] = safeArray(data[field]);
          } else {
            updateData[field] = safeString(data[field]);
          }
        }
      });
    }
    
    // Update images
    if (req.files?.image?.[0]) {
      // Delete old image
      if (product.image && product.image.includes('cloudinary.com')) {
        await deleteCloudinaryImage(product.image);
      }
      
      // Upload new image
      updateData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
    }
    
    // Update gallery
    let gallery = [...(product.gallery || [])];
    
    // Update mandatory images if provided
    if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
      const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0], 'vendor_products/gallery');
      if (img) gallery[0] = img;
    }
    
    if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
      const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0], 'vendor_products/gallery');
      if (img) gallery[1] = img;
    }
    
    if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
      const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0], 'vendor_products/gallery');
      if (img) gallery[2] = img;
    }
    
    // Add new gallery images
    if (req.files?.gallery) {
      for (const file of req.files.gallery) {
        const img = await uploadCloud(file, 'vendor_products/gallery');
        if (img) gallery.push(img);
      }
    }
    
    // Clean gallery
    updateData.gallery = gallery.filter(img => img && img.trim() !== '');
    
    // ================= VARIATION IMAGES =================
    if (hasVariations && updateData.variations && req.files?.variationImages) {
      for (let i = 0; i < updateData.variations.length; i++) {
        if (req.files.variationImages[i]) {
          const img = await uploadCloud(
            req.files.variationImages[i],
            "vendor_products/variations"
          );
          if (img) {
            updateData.variations[i].image = img;
          }
        }
      }
    }
    
    // If has variations, remove base price/stock fields
    if (hasVariations) {
      updateData.price = undefined;
      updateData.stock = undefined;
      updateData.oldPrice = undefined;
    }
    
    // Update product
    Object.assign(product, updateData);
    await product.save();
    
    // Populate and return
    const populatedProduct = await VendorProduct.findById(product._id)
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .lean();
    
    res.json({ 
      success: true, 
      message: "Product updated successfully",
      data: populatedProduct 
    });
    
  } catch (err) {
    console.error("❌ UPDATE VENDOR PRODUCT ERROR:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= DELETE VENDOR PRODUCT ================= */
exports.deleteVendorProduct = async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }
    
    // Delete images from Cloudinary
    if (product.image && product.image.includes('cloudinary.com')) {
      await deleteCloudinaryImage(product.image);
    }
    
    if (product.gallery && product.gallery.length > 0) {
      for (const imageUrl of product.gallery) {
        if (imageUrl && imageUrl.includes('cloudinary.com')) {
          await deleteCloudinaryImage(imageUrl);
        }
      }
    }
    
    // Delete variation images
    if (product.hasVariations && product.variations && product.variations.length > 0) {
      for (const variation of product.variations) {
        if (variation.image && variation.image.includes('cloudinary.com')) {
          await deleteCloudinaryImage(variation.image);
        }
      }
    }
    
    // Delete product from database
    await product.deleteOne();
    
    res.json({ 
      success: true, 
      message: "Product deleted successfully" 
    });
  } catch (err) {
    console.error("❌ Delete vendor product error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};

/* ================= CSV IMPORT ================= */
exports.importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "CSV file required" 
      });
    }

    const vendorId = req.vendor._id;
    const vendor = await Vendor.findById(vendorId);
    const rows = [];
    const results = [];

    // Parse CSV file
    const csvData = req.file.buffer.toString();
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',').map(v => v.replace(/^"|"$/g, '').trim());
      const row = {};
      
      headers.forEach((header, index) => {
        if (values[index] !== undefined) {
          row[header] = values[index];
        }
      });
      
      rows.push(row);
    }

    let created = 0;
    let updated = 0;
    let errors = [];

    for (const [index, row] of rows.entries()) {
      try {
        if (!row.name || !row.price) {
          errors.push(`Row ${index + 1}: Name and price are required`);
          continue;
        }

        // Find category
        let categoryId = null;
        if (row.category) {
          const category = await Category.findOne({ 
            name: { $regex: new RegExp(`^${row.category}$`, 'i') } 
          });
          if (category) categoryId = category._id;
        }

        // Find subcategory
        let subcategoryId = null;
        if (row.subcategory) {
          const subcategory = await SubCategory.findOne({ 
            name: { $regex: new RegExp(`^${row.subcategory}$`, 'i') },
            ...(categoryId ? { category: categoryId } : {})
          });
          if (subcategory) subcategoryId = subcategory._id;
        }

        // Prepare product data
        const productData = {
          name: row.name,
          brandName: row.brandName || "",
          description: row.description || "",
          oldPrice: parseFloat(row.oldPrice) || 0,
          price: parseFloat(row.price),
          stock: parseInt(row.stock) || 0,
          quality: row.quality || "Standard",
          State: row.State || "",
          vendor: vendorId,
          restaurantName: vendor.storeName || row.restaurantName || "",
          category: categoryId,
          subcategory: subcategoryId,
          productTypes: row.productTypes || "",
          flavors: row.flavors ? row.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : [],
          size: row.size ? row.size.split(',').map(s => s.trim()).filter(s => s !== '') : [],
          dietPreference: row.dietPreference || "Veg",
          ageRange: row.ageRange || "",
          containerType: row.containerType || "",
          itemForm: row.itemForm || "",
          specialty: row.specialty || "",
          itemTypeName: row.itemTypeName || "",
          countryOfOrigin: row.countryOfOrigin || "",
          manufacturerName: row.manufacturerName || row.manufacturer || "",
          manufacturerAddress: row.manufacturerAddress || row.manufacturerContact || "",
          manufacturer: row.manufacturer || row.manufacturerName || "",
          manufacturerContact: row.manufacturerContact || row.manufacturerAddress || "",
          packagerName: row.packagerName || "",
          packagerAddress: row.packagerAddress || "",
          packagerFssaiLicense: row.packagerFssaiLicense || "",
          packerContact: row.packerContact || "",
          marketerName: row.marketerName || "",
          marketerAddress: row.marketerAddress || "",
          marketerNameAddress: row.marketerNameAddress || "",
          packageColour: row.packageColour || "",
          measurementUnit: row.measurementUnit || "",
          unitCount: row.unitCount || "",
          numberOfItems: row.numberOfItems || "",
          itemWeight: row.itemWeight || "",
          totalEaches: row.totalEaches || "",
          itemPackageWeight: row.itemPackageWeight || "",
          shelfLife: row.shelfLife || "",
          ingredients: row.ingredients || "",
          allergenInformation: row.allergenInformation || row.allergenInfo || "",
          directions: row.directions || "",
          nutrition: row.nutrition || "",
          cuisine: row.cuisine || "",
          dietaryPreferences: row.dietaryPreferences || "",
          materialTypes: row.materialTypes || "",
          customWeight: row.customWeight || "",
          customSizeInput: row.customSizeInput || "",
          fssaiLicense: row.fssaiLicense || row.brandName || "",
          legalDisclaimer: row.legalDisclaimer || "",
          status: row.status || 'pending_approval'
        };

        if (row._id) {
          // Update existing product
          await VendorProduct.updateOne(
            { _id: row._id, vendor: vendorId },
            productData
          );
          updated++;
        } else {
          // Create new product
          await VendorProduct.create(productData);
          created++;
        }
        
      } catch (error) {
        errors.push(`Row ${index + 1}: ${error.message}`);
      }
    }

    res.json({
      success: true,
      message: `CSV import completed: ${created} created, ${updated} updated`,
      created,
      updated,
      total: rows.length,
      errors: errors.length > 0 ? errors : undefined,
    });
    
  } catch (err) {
    console.error("❌ CSV import error:", err);
    res.status(500).json({ 
      success: false,
      message: "CSV Import Failed" 
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
      description: product.description || "",
      brandName: product.brandName || "",
      fssaiLicense: product.fssaiLicense || "",
      restaurantName: product.restaurantName || "",
      oldPrice: product.oldPrice || 0,
      price: product.price || 0,
      stock: product.stock || 0,
      quality: product.quality || "Standard",
      State: product.State || "",
      category: product.category ? product.category.name : "",
      subcategory: product.subcategory ? product.subcategory.name : "",
      categoryId: product.category ? product.category._id : "",
      subcategoryId: product.subcategory ? product.subcategory._id : "",
      productTypes: product.productTypes || "",
      flavors: Array.isArray(product.flavors) ? product.flavors.join(',') : product.flavors || "",
      size: Array.isArray(product.size) ? product.size.join(',') : product.size || "",
      dietPreference: product.dietPreference || "Veg",
      ageRange: product.ageRange || "",
      containerType: product.containerType || "",
      itemForm: product.itemForm || "",
      specialty: product.specialty || "",
      itemTypeName: product.itemTypeName || "",
      countryOfOrigin: product.countryOfOrigin || "",
      manufacturerName: product.manufacturerName || "",
      manufacturerAddress: product.manufacturerAddress || "",
      manufacturer: product.manufacturer || "",
      manufacturerContact: product.manufacturerContact || "",
      packagerName: product.packagerName || "",
      packagerAddress: product.packagerAddress || "",
      packagerFssaiLicense: product.packagerFssaiLicense || "",
      packerContact: product.packerContact || "",
      marketerName: product.marketerName || "",
      marketerAddress: product.marketerAddress || "",
      marketerNameAddress: product.marketerNameAddress || "",
      packageColour: product.packageColour || "",
      measurementUnit: product.measurementUnit || "",
      unitCount: product.unitCount || "",
      numberOfItems: product.numberOfItems || "",
      itemWeight: product.itemWeight || "",
      totalEaches: product.totalEaches || "",
      itemPackageWeight: product.itemPackageWeight || "",
      shelfLife: product.shelfLife || "",
      ingredients: product.ingredients || "",
      allergenInformation: product.allergenInformation || "",
      directions: product.directions || "",
      nutrition: product.nutrition || "",
      cuisine: product.cuisine || "",
      dietaryPreferences: product.dietaryPreferences || "",
      materialTypes: product.materialTypes || "",
      customWeight: product.customWeight || "",
      customSizeInput: product.customSizeInput || "",
      legalDisclaimer: product.legalDisclaimer || "",
      status: product.status || "pending_approval",
      hasVariations: product.hasVariations || false,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    const fields = [
      '_id', 'name', 'description', 'brandName', 'fssaiLicense', 'restaurantName',
      'oldPrice', 'price', 'stock', 'quality', 'State',
      'category', 'subcategory', 'categoryId', 'subcategoryId',
      'productTypes', 'flavors', 'size', 'dietPreference',
      'ageRange', 'containerType', 'itemForm', 'specialty',
      'itemTypeName', 'countryOfOrigin', 'manufacturerName',
      'manufacturerAddress', 'manufacturer', 'manufacturerContact',
      'packagerName', 'packagerAddress', 'packagerFssaiLicense', 'packerContact',
      'marketerName', 'marketerAddress', 'marketerNameAddress',
      'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
      'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife',
      'ingredients', 'allergenInformation', 'directions', 'nutrition',
      'cuisine', 'dietaryPreferences', 'materialTypes', 'customWeight',
      'customSizeInput', 'legalDisclaimer', 'status', 'hasVariations',
      'createdAt', 'updatedAt'
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
    console.error("❌ CSV export error:", err);
    res.status(500).json({ 
      success: false,
      message: "CSV Export Failed" 
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
        message: "Product IDs required" 
      });
    }

    // Prepare update data
    const updateData = { ...data };
    
    // Handle price mapping
    if (updateData.newPrice !== undefined) {
      updateData.price = updateData.newPrice;
      delete updateData.newPrice;
    }
    
    // Convert numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.oldPrice) updateData.oldPrice = parseFloat(updateData.oldPrice);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    
    // Handle array fields
    if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
      updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
    }
    
    if (updateData.size !== undefined && typeof updateData.size === 'string') {
      updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
    }

    const result = await VendorProduct.updateMany(
      { _id: { $in: ids }, vendor: req.vendor._id },
      { $set: updateData },
      { runValidators: true }
    );

    res.json({ 
      success: true, 
      message: `${result.modifiedCount} products updated`,
      modified: result.modifiedCount 
    });
  } catch (err) {
    console.error("❌ Bulk update error:", err);
    res.status(500).json({ 
      success: false,
      message: "Bulk update failed" 
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
        message: "Product IDs required" 
      });
    }

    // Find products to delete images
    const products = await VendorProduct.find({
      _id: { $in: ids },
      vendor: req.vendor._id,
    });

    // Delete images from Cloudinary
    for (const product of products) {
      if (product.image && product.image.includes('cloudinary.com')) {
        await deleteCloudinaryImage(product.image);
      }
      
      if (product.gallery && product.gallery.length > 0) {
        for (const imageUrl of product.gallery) {
          if (imageUrl && imageUrl.includes('cloudinary.com')) {
            await deleteCloudinaryImage(imageUrl);
          }
        }
      }
      
      // Delete variation images
      if (product.hasVariations && product.variations && product.variations.length > 0) {
        for (const variation of product.variations) {
          if (variation.image && variation.image.includes('cloudinary.com')) {
            await deleteCloudinaryImage(variation.image);
          }
        }
      }
    }

    const result = await VendorProduct.deleteMany({
      _id: { $in: ids },
      vendor: req.vendor._id,
    });

    res.json({ 
      success: true, 
      message: `${result.deletedCount} products deleted`,
      deleted: result.deletedCount 
    });
  } catch (err) {
    console.error("❌ Bulk delete error:", err);
    res.status(500).json({ 
      success: false,
      message: "Bulk delete failed" 
    });
  }
};

/* ================= UPDATE PRODUCT STATUS ================= */
exports.updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const allowedStatuses = ['active', 'inactive', 'draft', 'out_of_stock', 'pending_approval'];
    
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required'
      });
    }
    
    const product = await VendorProduct.findOneAndUpdate(
      { _id: id, vendor: req.vendor._id },
      { status },
      { new: true, runValidators: true }
    )
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .lean();
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product status updated successfully',
      data: product
    });
    
  } catch (err) {
    console.error('❌ Update product status error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update product status'
    });
  }
};
