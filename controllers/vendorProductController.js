





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
    
//     // ================= VARIATION FLAGS - FIXED =================
//     const hasVariations = data.hasVariations === true || data.hasVariations === "true";
    
//     // Parse variations from request
//     let variations = [];
//     if (data.variations) {
//       try {
//         variations = typeof data.variations === "string" 
//           ? JSON.parse(data.variations) 
//           : data.variations;
//       } catch (e) {
//         console.error("Error parsing variations:", e);
//         variations = [];
//       }
//     }

//     // Step 1: Initialize product data
//     let productData = {};
//     productData.hasVariations = hasVariations;
//     productData.variations = hasVariations ? variations : [];

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
      
//       // Pricing - ONLY IF NO VARIATIONS
//       if (!hasVariations) {
//         if (data.formData.pricing) {
//           productData.oldPrice = safeNumber(data.formData.pricing.oldPrice);
//           productData.price = safeNumber(data.formData.pricing.newPrice || data.formData.pricing.price);
//           productData.stock = safeNumber(data.formData.pricing.stock);
//           productData.quality = safeString(data.formData.pricing.quality) || "Standard";
//           productData.dietPreference = safeString(data.formData.pricing.dietPreference) || "Veg";
//         } else {
//           productData.oldPrice = safeNumber(data.oldPrice);
//           productData.price = safeNumber(data.newPrice || data.price);
//           productData.stock = safeNumber(data.stock);
//           productData.quality = safeString(data.quality) || "Standard";
//           productData.dietPreference = safeString(data.dietPreference) || "Veg";
//         }
//       } else {
//         // For variations, just set quality and dietPreference
//         if (data.formData.pricing) {
//           productData.quality = safeString(data.formData.pricing.quality) || "Standard";
//           productData.dietPreference = safeString(data.formData.pricing.dietPreference) || "Veg";
//         } else {
//           productData.quality = "Standard";
//           productData.dietPreference = "Veg";
//         }
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
//       productData.name = safeString(data.name);
//       productData.description = safeString(data.description);
//       productData.restaurantName = safeString(vendor.storeName || data.restaurantName || "");
      
//       // Pricing - ONLY IF NO VARIATIONS
//       if (!hasVariations) {
//         productData.oldPrice = safeNumber(data.oldPrice);
//         productData.price = safeNumber(data.newPrice || data.price);
//         productData.stock = safeNumber(data.stock);
//         productData.quality = safeString(data.quality) || "Standard";
//         productData.dietPreference = safeString(data.dietPreference) || "Veg";
//       } else {
//         productData.quality = safeString(data.quality) || "Standard";
//         productData.dietPreference = safeString(data.dietPreference) || "Veg";
//       }
      
//       // Category
//       productData.category = data.category || data.selectedCategory;
//       productData.subcategory = data.subcategory || data.selectedSubCategory;
      
//       // Details
//       productData.productTypes = safeString(data.productTypes);
//       productData.ingredients = safeString(data.ingredients);
//       productData.materialTypes = safeString(data.materialTypes);
//       productData.customWeight = safeString(data.customWeight);
//       productData.customSizeInput = safeString(data.customSizeInput);
//       productData.ageRange = safeString(data.ageRange);
//       productData.containerType = safeString(data.containerType);
//       productData.itemForm = safeString(data.itemForm);
//       productData.specialty = safeString(data.specialty);
//       productData.itemTypeName = safeString(data.itemTypeName);
//       productData.countryOfOrigin = safeString(data.countryOfOrigin);
      
//       // Arrays
//       productData.flavors = safeArray(data.flavors);
//       productData.size = safeArray(data.size);
      
//       // Compliance
//       productData.brandName = safeString(data.brandName || data.fssaiLicenseNumber);
//       productData.fssaiLicense = safeString(data.fssaiLicense || data.fssaiLicenseNumber);
//       productData.legalDisclaimer = safeString(data.legalDisclaimer);
//       productData.shelfLife = safeString(data.shelfLife);
      
//       // Manufacturing
//       productData.manufacturerName = safeString(data.manufacturerName || data.manufacturer);
//       productData.manufacturerAddress = safeString(data.manufacturerAddress || data.manufacturerContact);
//       productData.manufacturer = safeString(data.manufacturer || data.manufacturerName);
//       productData.manufacturerContact = safeString(data.manufacturerContact || data.manufacturerAddress);
      
//       // Packager
//       productData.packagerName = safeString(data.packagerName);
//       productData.packagerAddress = safeString(data.packagerAddress);
//       productData.packagerFssaiLicense = safeString(data.packagerFssaiLicense);
//       productData.packerContact = safeString(data.packerContact);
      
//       // Marketer
//       productData.marketerName = safeString(data.marketerName);
//       productData.marketerAddress = safeString(data.marketerAddress);
//       productData.marketerNameAddress = safeString(data.marketerNameAddress);
      
//       // Package
//       productData.packageColour = safeString(data.packageColour);
//       productData.measurementUnit = safeString(data.measurementUnit);
//       productData.unitCount = safeString(data.unitCount);
//       productData.numberOfItems = safeString(data.numberOfItems);
//       productData.itemWeight = safeString(data.itemWeight);
//       productData.totalEaches = safeString(data.totalEaches);
//       productData.itemPackageWeight = safeString(data.itemPackageWeight);
      
//       // Dietary
//       productData.dietaryPreferences = safeString(data.dietaryPreferences);
//       productData.allergenInformation = safeString(data.allergenInformation || data.allergenInfo);
//       productData.nutrition = safeString(data.nutrition);
//       productData.cuisine = safeString(data.cuisine);
//       productData.directions = safeString(data.directions);
      
//       // Location
//       productData.State = safeString(data.State);
      
//       // Status
//       productData.status = safeString(data.status) || 'pending_approval';
//     }
    
//     // Required validation - FIXED
//     if (!productData.name || !productData.category || (!hasVariations && !productData.price)) {
//       console.log("❌ Validation failed:", {
//         name: productData.name,
//         price: productData.price,
//         category: productData.category,
//         hasVariations: hasVariations
//       });
      
//       return res.status(400).json({
//         success: false,
//         message: "Name and category are required. Price is required for non-variation products.",
//         received: {
//           name: productData.name,
//           category: productData.category,
//           hasVariations: hasVariations,
//           price: productData.price
//         }
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
    
//     // ================= VARIATION IMAGES - FIXED ================= 
//     if (hasVariations && Array.isArray(productData.variations) && req.files?.variationImages) {
//       for (let i = 0; i < productData.variations.length; i++) {
//         if (req.files.variationImages[i]) {
//           const img = await uploadCloud(
//             req.files.variationImages[i],
//             "vendor_products/variations"
//           );
//           if (img) {
//             productData.variations[i].image = img;
//           }
//         }
//       }
//     }
    
//     // If has variations, remove base price/stock fields - MOVED TO CORRECT POSITION
//     if (hasVariations) {
//       delete productData.price;
//       delete productData.stock;
//       delete productData.oldPrice;
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

//     // ================= VARIATION FLAGS =================
//     const hasVariations = data.hasVariations === true || data.hasVariations === "true";
    
//     // Parse variations
//     if (data.variations) {
//       try {
//         updateData.variations = typeof data.variations === "string"
//           ? JSON.parse(data.variations)
//           : data.variations;
//         updateData.hasVariations = hasVariations;
//       } catch (e) {
//         console.error("Error parsing variations:", e);
//       }
//     }

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
        
//         // Pricing - Only if no variations
//         'oldPrice': !hasVariations ? 'formData.pricing.oldPrice' : null,
//         'price': !hasVariations ? 'formData.pricing.newPrice' : null,
//         'stock': !hasVariations ? 'formData.pricing.stock' : null,
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
        
//         // Dietary
//         'dietaryPreferences': 'formData.dietary.dietaryPreferences',
//         'allergenInformation': 'formData.dietary.allergenInformation',
//         'nutrition': 'formData.dietary.nutrition',
//         'cuisine': 'formData.dietary.cuisine',
//         'directions': 'formData.dietary.directions',
//       };
      
//       // Process each field
//       Object.entries(fieldMappings).forEach(([field, path]) => {
//         if (path === null) return; // Skip if path is null (variations case)
        
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
//           // Skip price/stock fields if has variations
//           if (hasVariations && (field === 'price' || field === 'stock' || field === 'oldPrice' || field === 'newPrice')) {
//             return;
//           }
          
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
    
//     // ================= VARIATION IMAGES =================
//     if (hasVariations && updateData.variations && req.files?.variationImages) {
//       for (let i = 0; i < updateData.variations.length; i++) {
//         if (req.files.variationImages[i]) {
//           const img = await uploadCloud(
//             req.files.variationImages[i],
//             "vendor_products/variations"
//           );
//           if (img) {
//             updateData.variations[i].image = img;
//           }
//         }
//       }
//     }
    
//     // If has variations, remove base price/stock fields
//     if (hasVariations) {
//       updateData.price = undefined;
//       updateData.stock = undefined;
//       updateData.oldPrice = undefined;
//     }
    
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
    
//     // Delete variation images
//     if (product.hasVariations && product.variations && product.variations.length > 0) {
//       for (const variation of product.variations) {
//         if (variation.image && variation.image.includes('cloudinary.com')) {
//           await deleteCloudinaryImage(variation.image);
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
//       hasVariations: product.hasVariations || false,
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
//       'customSizeInput', 'legalDisclaimer', 'status', 'hasVariations',
//       'createdAt', 'updatedAt'
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
      
//       // Delete variation images
//       if (product.hasVariations && product.variations && product.variations.length > 0) {
//         for (const variation of product.variations) {
//           if (variation.image && variation.image.includes('cloudinary.com')) {
//             await deleteCloudinaryImage(variation.image);
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
const mongoose = require("mongoose");

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

/* ================= UPLOAD MULTIPLE CLOUDINARY IMAGES ================= */
async function uploadMultipleCloud(files = [], folder = "vendor_products/gallery") {
  try {
    if (!files || files.length === 0) return [];
    
    const uploadPromises = files.map(file => uploadCloud(file, folder));
    const results = await Promise.allSettled(uploadPromises);
    
    return results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => result.value);
  } catch (error) {
    console.error("❌ Upload multiple images error:", error.message);
    return [];
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

/* ================= DELETE MULTIPLE CLOUDINARY IMAGES ================= */
async function deleteMultipleCloudinaryImages(imageUrls = []) {
  try {
    if (!imageUrls || imageUrls.length === 0) return;
    
    const deletePromises = imageUrls.map(url => deleteCloudinaryImage(url));
    await Promise.allSettled(deletePromises);
  } catch (error) {
    console.error("❌ Error deleting multiple images:", error.message);
  }
}

/* ================= HELPER FUNCTIONS ================= */
const safeString = (value) => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value.trim();
  return String(value).trim();
};

const safeNumber = (value) => {
  if (value === undefined || value === null) return 0;
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};

const safeInt = (value) => {
  if (value === undefined || value === null) return 0;
  const num = parseInt(value);
  return isNaN(num) ? 0 : num;
};

const safeBoolean = (value) => {
  if (value === 'true' || value === true || value === 1 || value === '1') return true;
  if (value === 'false' || value === false || value === 0 || value === '0') return false;
  return Boolean(value);
};

const safeArray = (value) => {
  if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
  if (typeof value === 'string' && value.trim() !== '') {
    return value.split(',').map(item => item.trim()).filter(item => item !== '');
  }
  return [];
};

const safeObject = (value) => {
  if (typeof value === 'object' && value !== null) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
  return {};
};

/* ================= GET CATEGORIES ================= */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select("name image _id description")
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
    
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }
    
    const subcategories = await SubCategory.find({ 
      category: categoryId,
      isActive: true 
    })
      .select("name image _id category description")
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
      approvalStatus = '',
      hasVariations = '',
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
        { restaurantName: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
        { "variations.sku": { $regex: search, $options: 'i' } },
        { "variations.barcode": { $regex: search, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    
    // Status filter
    if (status) query.status = status;
    if (approvalStatus) query.approvalStatus = approvalStatus;
    
    // Variations filter
    if (hasVariations !== '') {
      query.hasVariations = safeBoolean(hasVariations);
    }
    
    const products = await VendorProduct.find(query)
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .lean();

    const total = await VendorProduct.countDocuments(query);
    const vendor = await Vendor.findById(req.vendor._id).select("storeName name email phone");

    // Get statistics
    const stats = await VendorProduct.getStats(req.vendor._id);

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
      stats: {
        totalProducts: stats.totalProducts,
        activeProducts: stats.activeProducts,
        outOfStockProducts: stats.outOfStockProducts,
        pendingApproval: stats.pendingApproval,
        totalStock: stats.totalStock,
        totalSold: stats.totalSold
      },
      data: products,
    });
  } catch (err) {
    console.error("❌ Get vendor products error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET SINGLE VENDOR PRODUCT ================= */
exports.getVendorProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    })
      .populate("category", "name image description")
      .populate("subcategory", "name image description")
      .populate("vendor", "storeName name email phone address")
      .lean();
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    console.error("❌ Get vendor product error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= CREATE VENDOR PRODUCT ================= */
exports.createVendorProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
    
    const vendor = await Vendor.findById(req.vendor._id).session(session);
    if (!vendor) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ 
        success: false, 
        message: "Vendor not found" 
      });
    }
    
    const data = { ...req.body };
    const productData = {};
    
    // Step 1: Parse JSON strings
    if (data.formData && typeof data.formData === 'string') {
      try {
        data.formData = JSON.parse(data.formData);
      } catch (e) {
        console.log("Could not parse formData string");
      }
    }
    
    if (data.variations && typeof data.variations === 'string') {
      try {
        data.variations = JSON.parse(data.variations);
      } catch (e) {
        console.log("Could not parse variations string");
      }
    }
    
    if (data.customFields && typeof data.customFields === 'string') {
      try {
        data.customFields = JSON.parse(data.customFields);
      } catch (e) {
        console.log("Could not parse customFields string");
      }
    }
    
    // Step 2: Category Validation
    if (!data.category && !data.selectedCategory) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }
    
    const categoryId = data.category || data.selectedCategory;
    const categoryExists = await Category.findById(categoryId).session(session);
    if (!categoryExists) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        success: false, 
        message: "Invalid category selected" 
      });
    }
    productData.category = categoryId;
    
    // Step 3: Subcategory validation
    if (data.subcategory || data.selectedSubCategory) {
      const subcategoryId = data.subcategory || data.selectedSubCategory;
      const subcategoryExists = await SubCategory.findById(subcategoryId).session(session);
      
      if (!subcategoryExists) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ 
          success: false, 
          message: "Invalid subcategory selected" 
        });
      }
      
      // Check if subcategory belongs to selected category
      if (subcategoryExists.category && subcategoryExists.category.toString() !== categoryId) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ 
          success: false, 
          message: "Subcategory does not belong to selected category" 
        });
      }
      
      productData.subcategory = subcategoryId;
    }
    
    // Step 4: Process variations
    const hasVariations = data.hasVariations || 
                        (data.variations && Array.isArray(data.variations) && data.variations.length > 0);
    
    if (hasVariations) {
      productData.hasVariations = true;
      
      // Process variations
      const variations = Array.isArray(data.variations) ? data.variations : [];
      const processedVariations = [];
      
      for (let i = 0; i < variations.length; i++) {
        const variation = variations[i];
        const variationId = variation.variationId || `var_${Date.now()}_${i}`;
        
        const processedVariation = {
          variationId,
          name: safeString(variation.name),
          size: safeString(variation.size),
          flavor: safeString(variation.flavor),
          oldPrice: safeNumber(variation.oldPrice),
          newPrice: safeNumber(variation.newPrice || variation.price),
          price: safeNumber(variation.newPrice || variation.price),
          stock: safeInt(variation.stock),
          sku: safeString(variation.sku),
          barcode: safeString(variation.barcode),
          weight: safeString(variation.weight),
          dimensions: safeString(variation.dimensions),
          color: safeString(variation.color),
          material: safeString(variation.material),
          status: variation.status || 'active',
          isDefault: variation.isDefault || (i === 0),
          image: safeString(variation.image),
          gallery: safeArray(variation.gallery)
        };
        
        // Handle variation images if uploaded
        if (req.files && req.files[`variations[${i}][image]`]) {
          const imageFile = req.files[`variations[${i}][image]`][0];
          processedVariation.image = await uploadCloud(imageFile, 'vendor_products/variations');
        }
        
        // Handle variation gallery if uploaded
        if (req.files && req.files[`variations[${i}][gallery]`]) {
          const galleryFiles = req.files[`variations[${i}][gallery]`];
          const galleryUrls = await uploadMultipleCloud(galleryFiles, 'vendor_products/variations/gallery');
          processedVariation.gallery = [...(processedVariation.gallery || []), ...galleryUrls];
        }
        
        processedVariations.push(processedVariation);
      }
      
      productData.variations = processedVariations;
      
      // Set default variation
      const defaultVariation = processedVariations.find(v => v.isDefault) || processedVariations[0];
      if (defaultVariation) {
        productData.defaultVariationId = defaultVariation.variationId;
      }
    } else {
      productData.hasVariations = false;
      productData.variations = [];
    }
    
    // Step 5: Process formData or direct fields
    if (data.formData && typeof data.formData === 'object') {
      const form = data.formData;
      
      // Basic Information
      productData.name = safeString(form.basic?.name || data.name);
      productData.description = safeString(form.basic?.description || data.description);
      productData.shortDescription = safeString(form.basic?.shortDescription);
      productData.restaurantName = safeString(vendor.storeName || form.basic?.restaurantName || "");
      productData.storeName = safeString(vendor.storeName || "");
      
      // Pricing
      if (form.pricing && !productData.hasVariations) {
        productData.oldPrice = safeNumber(form.pricing.oldPrice);
        productData.price = safeNumber(form.pricing.newPrice || form.pricing.price);
        productData.costPrice = safeNumber(form.pricing.costPrice);
        productData.stock = safeInt(form.pricing.stock);
        productData.minStock = safeInt(form.pricing.minStock);
        productData.maxStock = safeInt(form.pricing.maxStock);
        productData.quality = safeString(form.pricing.quality) || "Standard";
        productData.dietPreference = safeString(form.pricing.dietPreference) || "Veg";
        productData.lowStockAlert = safeInt(form.pricing.lowStockAlert || 10);
        productData.reorderQuantity = safeInt(form.pricing.reorderQuantity || 50);
      }
      
      // Product Details
      if (form.details) {
        productData.productTypes = safeString(form.details.productTypes);
        productData.ingredients = safeString(form.details.ingredients);
        productData.materialTypes = safeString(form.details.materialTypes);
        productData.customWeight = safeString(form.details.customWeight);
        productData.customSizeInput = safeString(form.details.customSizeInput);
        productData.ageRange = safeString(form.details.ageRange);
        productData.containerType = safeString(form.details.containerType);
        productData.itemForm = safeString(form.details.itemForm);
        productData.specialty = safeString(form.details.specialty);
        productData.itemTypeName = safeString(form.details.itemTypeName);
        productData.countryOfOrigin = safeString(form.details.countryOfOrigin);
        
        // Flavors and size arrays
        const flavorsArray = [];
        if (form.details.flavors && Array.isArray(form.details.flavors)) {
          flavorsArray.push(...form.details.flavors);
        }
        if (form.details.customFlavorInput) {
          flavorsArray.push(form.details.customFlavorInput);
        }
        productData.flavors = flavorsArray.filter(f => f && safeString(f) !== '');
        
        const sizeArray = [];
        if (form.details.size && Array.isArray(form.details.size)) {
          sizeArray.push(...form.details.size);
        }
        if (form.details.customSizeInput) {
          sizeArray.push(form.details.customSizeInput);
        }
        productData.size = sizeArray.filter(s => s && safeString(s) !== '');
      }
      
      // Location
      if (form.location) {
        productData.State = safeString(form.location.state);
        productData.city = safeString(form.location.city);
        productData.pincode = safeString(form.location.pincode);
      }
      
      // Compliance
      if (form.compliance) {
        productData.brandName = safeString(form.compliance.brandName || form.compliance.fssaiLicense);
        productData.fssaiLicense = safeString(form.compliance.fssaiLicense);
        productData.legalDisclaimer = safeString(form.compliance.legalDisclaimer);
        productData.shelfLife = safeString(form.compliance.shelfLife);
        productData.expiryDate = form.compliance.expiryDate ? new Date(form.compliance.expiryDate) : null;
        productData.mfgDate = form.compliance.mfgDate ? new Date(form.compliance.mfgDate) : null;
        productData.hsnCode = safeString(form.compliance.hsnCode);
      }
      
      // Manufacturing
      if (form.manufacturing) {
        productData.manufacturerName = safeString(form.manufacturing.manufacturerName);
        productData.manufacturerAddress = safeString(form.manufacturing.manufacturerAddress);
        productData.manufacturer = safeString(form.manufacturing.manufacturerName);
        productData.manufacturerContact = safeString(form.manufacturing.manufacturerContact);
        
        // Packager
        productData.packagerName = safeString(form.manufacturing.packagerName);
        productData.packagerAddress = safeString(form.manufacturing.packagerAddress);
        productData.packagerFssaiLicense = safeString(form.manufacturing.packagerFssaiLicense);
        productData.packerContact = safeString(
          form.manufacturing.packerContact ||
          (form.manufacturing.packagerName && form.manufacturing.packagerAddress ?
          `${form.manufacturing.packagerName}, ${form.manufacturing.packagerAddress}` :
          form.manufacturing.packagerName || form.manufacturing.packagerAddress || '')
        );
        
        // Marketer
        productData.marketerName = safeString(form.manufacturing.marketerName);
        productData.marketerAddress = safeString(form.manufacturing.marketerAddress);
        productData.marketerNameAddress = safeString(
          form.manufacturing.marketerNameAddress ||
          (form.manufacturing.marketerName && form.manufacturing.marketerAddress ?
          `${form.manufacturing.marketerName}, ${form.manufacturing.marketerAddress}` :
          form.manufacturing.marketerName || form.manufacturing.marketerAddress || '')
        );
      }
      
      // Package Details
      if (form.package) {
        productData.packageColour = safeString(form.package.packageColour);
        productData.measurementUnit = safeString(form.package.measurementUnit);
        productData.unitCount = safeString(form.package.unitCount);
        productData.numberOfItems = safeString(form.package.numberOfItems);
        productData.itemWeight = safeString(form.package.itemWeight);
        productData.totalEaches = safeString(form.package.totalEaches);
        productData.itemPackageWeight = safeString(form.package.itemPackageWeight);
        productData.shelfLife = safeString(form.package.shelfLife || productData.shelfLife);
      }
      
      // Dietary & Nutrition
      if (form.dietary) {
        productData.dietaryPreferences = safeString(form.dietary.dietaryPreferences);
        productData.allergenInformation = safeString(form.dietary.allergenInformation);
        productData.nutrition = safeString(form.dietary.nutrition);
        productData.nutritionFacts = safeObject(form.dietary.nutritionFacts);
        productData.cuisine = safeString(form.dietary.cuisine);
        productData.directions = safeString(form.dietary.directions);
      }
      
      // Shipping
      if (form.shipping) {
        productData.weight = safeNumber(form.shipping.weight);
        productData.dimensions = safeObject(form.shipping.dimensions);
        productData.shippingClass = safeString(form.shipping.shippingClass) || 'standard';
        productData.isFragile = safeBoolean(form.shipping.isFragile);
      }
      
      // Tax
      if (form.tax) {
        productData.taxClass = safeString(form.tax.taxClass) || 'standard';
        productData.taxPercentage = safeNumber(form.tax.taxPercentage);
      }
      
      // Discounts
      if (form.discounts) {
        productData.discountType = safeString(form.discounts.discountType) || 'none';
        productData.discountValue = safeNumber(form.discounts.discountValue);
        productData.discountStartDate = form.discounts.discountStartDate ? new Date(form.discounts.discountStartDate) : null;
        productData.discountEndDate = form.discounts.discountEndDate ? new Date(form.discounts.discountEndDate) : null;
      }
      
      // SEO
      if (form.seo) {
        productData.metaTitle = safeString(form.seo.metaTitle);
        productData.metaDescription = safeString(form.seo.metaDescription);
        productData.keywords = safeArray(form.seo.keywords);
        productData.tags = safeArray(form.seo.tags);
      }
      
    } else {
      // Direct fields without formData
      productData.name = safeString(data.name);
      productData.description = safeString(data.description);
      productData.shortDescription = safeString(data.shortDescription);
      productData.restaurantName = safeString(vendor.storeName || data.restaurantName || "");
      productData.storeName = safeString(vendor.storeName || "");
      
      // Pricing (only if no variations)
      if (!productData.hasVariations) {
        productData.oldPrice = safeNumber(data.oldPrice);
        productData.price = safeNumber(data.newPrice || data.price);
        productData.costPrice = safeNumber(data.costPrice);
        productData.stock = safeInt(data.stock);
        productData.minStock = safeInt(data.minStock);
        productData.maxStock = safeInt(data.maxStock);
        productData.lowStockAlert = safeInt(data.lowStockAlert || 10);
        productData.reorderQuantity = safeInt(data.reorderQuantity || 50);
      }
      
      productData.quality = safeString(data.quality) || "Standard";
      productData.dietPreference = safeString(data.dietPreference) || "Veg";
      
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
      productData.tags = safeArray(data.tags);
      productData.keywords = safeArray(data.keywords);
      
      // Compliance
      productData.brandName = safeString(data.brandName || data.fssaiLicenseNumber);
      productData.fssaiLicense = safeString(data.fssaiLicense || data.fssaiLicenseNumber);
      productData.legalDisclaimer = safeString(data.legalDisclaimer);
      productData.shelfLife = safeString(data.shelfLife);
      productData.expiryDate = data.expiryDate ? new Date(data.expiryDate) : null;
      productData.mfgDate = data.mfgDate ? new Date(data.mfgDate) : null;
      productData.hsnCode = safeString(data.hsnCode);
      
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
      productData.nutritionFacts = safeObject(data.nutritionFacts);
      productData.cuisine = safeString(data.cuisine);
      productData.directions = safeString(data.directions);
      
      // Location
      productData.State = safeString(data.State);
      productData.city = safeString(data.city);
      productData.pincode = safeString(data.pincode);
      
      // Shipping
      productData.weight = safeNumber(data.weight);
      productData.dimensions = safeObject(data.dimensions);
      productData.shippingClass = safeString(data.shippingClass) || 'standard';
      productData.isFragile = safeBoolean(data.isFragile);
      
      // Tax
      productData.taxClass = safeString(data.taxClass) || 'standard';
      productData.taxPercentage = safeNumber(data.taxPercentage);
      
      // Discounts
      productData.discountType = safeString(data.discountType) || 'none';
      productData.discountValue = safeNumber(data.discountValue);
      productData.discountStartDate = data.discountStartDate ? new Date(data.discountStartDate) : null;
      productData.discountEndDate = data.discountEndDate ? new Date(data.discountEndDate) : null;
      
      // SEO
      productData.metaTitle = safeString(data.metaTitle);
      productData.metaDescription = safeString(data.metaDescription);
      
      // Status
      productData.status = safeString(data.status) || 'pending_approval';
      productData.approvalStatus = safeString(data.approvalStatus) || 'pending';
    }
    
    // Required validation
    if (!productData.name || !productData.category) {
      console.log("❌ Validation failed:", {
        name: productData.name,
        category: productData.category
      });
      
      await session.abortTransaction();
      session.endSession();
      
      return res.status(400).json({
        success: false,
        message: "Name and category are required",
        received: productData
      });
    }
    
    // Price validation for non-variation products
    if (!productData.hasVariations && (!productData.price || productData.price <= 0)) {
      await session.abortTransaction();
      session.endSession();
      
      return res.status(400).json({
        success: false,
        message: "Price is required for non-variation products"
      });
    }
    
    // Step 6: Process images
    // Main image
    if (req.files?.image?.[0]) {
      productData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
    }
    
    // Gallery images
    let galleryImages = [];
    
    // Mandatory images
    const mandatoryImageFields = [
      'mandatoryImages.ingredientsImage',
      'mandatoryImages.nutritionImage', 
      'mandatoryImages.mfgExpImage'
    ];
    
    for (const field of mandatoryImageFields) {
      if (req.files?.[field]?.[0]) {
        const img = await uploadCloud(req.files[field][0], 'vendor_products/mandatory');
        if (img) galleryImages.push(img);
      }
    }
    
    // Additional gallery images
    if (req.files?.gallery) {
      const galleryUrls = await uploadMultipleCloud(req.files.gallery, 'vendor_products/gallery');
      galleryImages = [...galleryImages, ...galleryUrls];
    }
    
    // Documents
    if (req.files?.documents) {
      const documents = [];
      for (const file of req.files.documents) {
        const docUrl = await uploadCloud(file, 'vendor_products/documents');
        if (docUrl) {
          documents.push({
            name: file.originalname,
            url: docUrl,
            type: file.mimetype
          });
        }
      }
      productData.documents = documents;
    }
    
    // Clean gallery
    productData.gallery = galleryImages.filter(img => img && img.trim() !== '');
    
    // Add vendor ID
    productData.vendor = req.vendor._id;
    productData.createdBy = req.vendor._id;
    productData.updatedBy = req.vendor._id;
    
    // Debug log
    console.log("📦 Final product data:", JSON.stringify(productData, null, 2));
    
    // Create product
    const product = new VendorProduct(productData);
    await product.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
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
    await session.abortTransaction();
    session.endSession();
    
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
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    console.log("🟢 UPDATE VENDOR PRODUCT API CALLED");
    
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    }).session(session);

    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const data = { ...req.body };
    const updateData = {};

    // Step 1: Parse JSON strings
    if (data.formData && typeof data.formData === 'string') {
      try {
        data.formData = JSON.parse(data.formData);
      } catch (e) {
        console.log("Could not parse formData string");
      }
    }
    
    if (data.variations && typeof data.variations === 'string') {
      try {
        data.variations = JSON.parse(data.variations);
      } catch (e) {
        console.log("Could not parse variations string");
      }
    }
    
    if (data.customFields && typeof data.customFields === 'string') {
      try {
        data.customFields = JSON.parse(data.customFields);
      } catch (e) {
        console.log("Could not parse customFields string");
      }
    }

    // Step 2: Category validation
    if (data.category || data.selectedCategory) {
      const categoryId = data.category || data.selectedCategory;
      const categoryExists = await Category.findById(categoryId).session(session);
      
      if (!categoryExists) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ 
          success: false, 
          message: "Invalid category selected" 
        });
      }
      updateData.category = categoryId;
    }

    // Step 3: Subcategory validation
    if (data.subcategory || data.selectedSubCategory) {
      const subcategoryId = data.subcategory || data.selectedSubCategory;
      const subcategoryExists = await SubCategory.findById(subcategoryId).session(session);
      
      if (!subcategoryExists) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ 
          success: false, 
          message: "Invalid subcategory selected" 
        });
      }
      
      if (updateData.category && subcategoryExists.category && 
          subcategoryExists.category.toString() !== updateData.category) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ 
          success: false, 
          message: "Subcategory does not belong to selected category" 
        });
      }
      updateData.subcategory = subcategoryId;
    }
    
    // Step 4: Handle variations updates
    if (data.variations !== undefined) {
      if (Array.isArray(data.variations) && data.variations.length > 0) {
        updateData.hasVariations = true;
        
        // Process variations for update
        const existingVariations = [...product.variations];
        const updatedVariations = [];
        const variationIdsToKeep = [];
        
        for (let i = 0; i < data.variations.length; i++) {
          const variationData = data.variations[i];
          let variationId = variationData.variationId;
          
          // Find existing variation or create new
          let existingVariation = existingVariations.find(v => v.variationId === variationId);
          
          if (existingVariation) {
            // Update existing variation
            const updatedVariation = {
              ...existingVariation.toObject(),
              name: safeString(variationData.name || existingVariation.name),
              size: safeString(variationData.size || existingVariation.size),
              flavor: safeString(variationData.flavor || existingVariation.flavor),
              oldPrice: safeNumber(variationData.oldPrice !== undefined ? variationData.oldPrice : existingVariation.oldPrice),
              newPrice: safeNumber(variationData.newPrice || variationData.price || existingVariation.newPrice),
              price: safeNumber(variationData.newPrice || variationData.price || existingVariation.price),
              stock: safeInt(variationData.stock !== undefined ? variationData.stock : existingVariation.stock),
              sku: safeString(variationData.sku || existingVariation.sku),
              barcode: safeString(variationData.barcode || existingVariation.barcode),
              weight: safeString(variationData.weight || existingVariation.weight),
              dimensions: safeString(variationData.dimensions || existingVariation.dimensions),
              color: safeString(variationData.color || existingVariation.color),
              material: safeString(variationData.material || existingVariation.material),
              status: variationData.status || existingVariation.status,
              isDefault: variationData.isDefault || existingVariation.isDefault,
              updatedAt: new Date()
            };
            
            // Handle variation image update
            if (req.files && req.files[`variations[${i}][image]`]) {
              // Delete old image if exists
              if (existingVariation.image && existingVariation.image.includes('cloudinary.com')) {
                await deleteCloudinaryImage(existingVariation.image);
              }
              
              // Upload new image
              const imageFile = req.files[`variations[${i}][image]`][0];
              updatedVariation.image = await uploadCloud(imageFile, 'vendor_products/variations');
            }
            
            // Handle variation gallery update
            if (req.files && req.files[`variations[${i}][gallery]`]) {
              // Delete old gallery images if needed
              if (variationData.replaceGallery) {
                await deleteMultipleCloudinaryImages(existingVariation.gallery || []);
                updatedVariation.gallery = [];
              }
              
              // Upload new gallery images
              const galleryFiles = req.files[`variations[${i}][gallery]`];
              const galleryUrls = await uploadMultipleCloud(galleryFiles, 'vendor_products/variations/gallery');
              updatedVariation.gallery = [...(updatedVariation.gallery || []), ...galleryUrls];
            }
            
            updatedVariations.push(updatedVariation);
            variationIdsToKeep.push(variationId);
            
          } else {
            // Create new variation
            variationId = variationId || `var_${Date.now()}_${i}`;
            
            const newVariation = {
              variationId,
              name: safeString(variationData.name),
              size: safeString(variationData.size),
              flavor: safeString(variationData.flavor),
              oldPrice: safeNumber(variationData.oldPrice),
              newPrice: safeNumber(variationData.newPrice || variationData.price),
              price: safeNumber(variationData.newPrice || variationData.price),
              stock: safeInt(variationData.stock),
              sku: safeString(variationData.sku),
              barcode: safeString(variationData.barcode),
              weight: safeString(variationData.weight),
              dimensions: safeString(variationData.dimensions),
              color: safeString(variationData.color),
              material: safeString(variationData.material),
              status: variationData.status || 'active',
              isDefault: variationData.isDefault || false,
              image: safeString(variationData.image),
              gallery: safeArray(variationData.gallery),
              createdAt: new Date(),
              updatedAt: new Date()
            };
            
            // Handle variation image upload
            if (req.files && req.files[`variations[${i}][image]`]) {
              const imageFile = req.files[`variations[${i}][image]`][0];
              newVariation.image = await uploadCloud(imageFile, 'vendor_products/variations');
            }
            
            // Handle variation gallery upload
            if (req.files && req.files[`variations[${i}][gallery]`]) {
              const galleryFiles = req.files[`variations[${i}][gallery]`];
              const galleryUrls = await uploadMultipleCloud(galleryFiles, 'vendor_products/variations/gallery');
              newVariation.gallery = [...(newVariation.gallery || []), ...galleryUrls];
            }
            
            updatedVariations.push(newVariation);
            variationIdsToKeep.push(variationId);
          }
        }
        
        // Delete variations that are not in the update
        const variationsToDelete = existingVariations.filter(v => !variationIdsToKeep.includes(v.variationId));
        for (const variation of variationsToDelete) {
          // Delete variation images
          if (variation.image && variation.image.includes('cloudinary.com')) {
            await deleteCloudinaryImage(variation.image);
          }
          if (variation.gallery && variation.gallery.length > 0) {
            await deleteMultipleCloudinaryImages(variation.gallery);
          }
        }
        
        updateData.variations = updatedVariations;
        
        // Set default variation
        const defaultVariation = updatedVariations.find(v => v.isDefault) || updatedVariations[0];
        if (defaultVariation) {
          updateData.defaultVariationId = defaultVariation.variationId;
        }
        
      } else {
        // No variations, delete all variation images
        for (const variation of product.variations) {
          if (variation.image && variation.image.includes('cloudinary.com')) {
            await deleteCloudinaryImage(variation.image);
          }
          if (variation.gallery && variation.gallery.length > 0) {
            await deleteMultipleCloudinaryImages(variation.gallery);
          }
        }
        
        updateData.hasVariations = false;
        updateData.variations = [];
        updateData.defaultVariationId = '';
      }
    }
    
    // Handle hasVariations flag separately
    if (data.hasVariations !== undefined) {
      updateData.hasVariations = safeBoolean(data.hasVariations);
      if (!updateData.hasVariations) {
        updateData.variations = [];
        updateData.defaultVariationId = '';
      }
    }
    
    // Step 5: Process formData or direct fields
    if (data.formData && typeof data.formData === 'object') {
      const form = data.formData;
      
      // Map form fields to updateData
      const fieldMappings = {
        // Basic
        'name': 'form.basic.name',
        'description': 'form.basic.description',
        'shortDescription': 'form.basic.shortDescription',
        'restaurantName': 'form.basic.restaurantName',
        
        // Pricing (only if no variations)
        'oldPrice': 'form.pricing.oldPrice',
        'price': 'form.pricing.newPrice',
        'costPrice': 'form.pricing.costPrice',
        'stock': 'form.pricing.stock',
        'minStock': 'form.pricing.minStock',
        'maxStock': 'form.pricing.maxStock',
        'quality': 'form.pricing.quality',
        'dietPreference': 'form.pricing.dietPreference',
        'lowStockAlert': 'form.pricing.lowStockAlert',
        'reorderQuantity': 'form.pricing.reorderQuantity',
        
        // Details
        'productTypes': 'form.details.productTypes',
        'ingredients': 'form.details.ingredients',
        'materialTypes': 'form.details.materialTypes',
        'customWeight': 'form.details.customWeight',
        'customSizeInput': 'form.details.customSizeInput',
        'ageRange': 'form.details.ageRange',
        'containerType': 'form.details.containerType',
        'itemForm': 'form.details.itemForm',
        'specialty': 'form.details.specialty',
        'itemTypeName': 'form.details.itemTypeName',
        'countryOfOrigin': 'form.details.countryOfOrigin',
        
        // Location
        'State': 'form.location.state',
        'city': 'form.location.city',
        'pincode': 'form.location.pincode',
        
        // Compliance
        'brandName': 'form.compliance.brandName',
        'fssaiLicense': 'form.compliance.fssaiLicense',
        'legalDisclaimer': 'form.compliance.legalDisclaimer',
        'shelfLife': 'form.compliance.shelfLife',
        'expiryDate': 'form.compliance.expiryDate',
        'mfgDate': 'form.compliance.mfgDate',
        'hsnCode': 'form.compliance.hsnCode',
        
        // Manufacturing
        'manufacturerName': 'form.manufacturing.manufacturerName',
        'manufacturerAddress': 'form.manufacturing.manufacturerAddress',
        'manufacturer': 'form.manufacturing.manufacturerName',
        'manufacturerContact': 'form.manufacturing.manufacturerContact',
        
        // Packager
        'packagerName': 'form.manufacturing.packagerName',
        'packagerAddress': 'form.manufacturing.packagerAddress',
        'packagerFssaiLicense': 'form.manufacturing.packagerFssaiLicense',
        'packerContact': 'form.manufacturing.packerContact',
        
        // Marketer
        'marketerName': 'form.manufacturing.marketerName',
        'marketerAddress': 'form.manufacturing.marketerAddress',
        'marketerNameAddress': 'form.manufacturing.marketerNameAddress',
        
        // Package
        'packageColour': 'form.package.packageColour',
        'measurementUnit': 'form.package.measurementUnit',
        'unitCount': 'form.package.unitCount',
        'numberOfItems': 'form.package.numberOfItems',
        'itemWeight': 'form.package.itemWeight',
        'totalEaches': 'form.package.totalEaches',
        'itemPackageWeight': 'form.package.itemPackageWeight',
        
        // Dietary
        'dietaryPreferences': 'form.dietary.dietaryPreferences',
        'allergenInformation': 'form.dietary.allergenInformation',
        'nutrition': 'form.dietary.nutrition',
        'nutritionFacts': 'form.dietary.nutritionFacts',
        'cuisine': 'form.dietary.cuisine',
        'directions': 'form.dietary.directions',
        
        // Shipping
        'weight': 'form.shipping.weight',
        'dimensions': 'form.shipping.dimensions',
        'shippingClass': 'form.shipping.shippingClass',
        'isFragile': 'form.shipping.isFragile',
        
        // Tax
        'taxClass': 'form.tax.taxClass',
        'taxPercentage': 'form.tax.taxPercentage',
        
        // Discounts
        'discountType': 'form.discounts.discountType',
        'discountValue': 'form.discounts.discountValue',
        'discountStartDate': 'form.discounts.discountStartDate',
        'discountEndDate': 'form.discounts.discountEndDate',
        
        // SEO
        'metaTitle': 'form.seo.metaTitle',
        'metaDescription': 'form.seo.metaDescription',
        'keywords': 'form.seo.keywords',
        'tags': 'form.seo.tags',
        
        // Status
        'status': 'form.status',
        'approvalStatus': 'form.approvalStatus'
      };
      
      // Process each field
      Object.entries(fieldMappings).forEach(([field, path]) => {
        const value = path.split('.').reduce((obj, key) => obj?.[key], data);
        if (value !== undefined) {
          if (field.includes('Price') || field.includes('stock') || field === 'weight' || 
              field === 'taxPercentage' || field === 'discountValue') {
            updateData[field] = safeNumber(value);
          } else if (field === 'flavors' || field === 'size' || field === 'keywords' || field === 'tags') {
            updateData[field] = safeArray(value);
          } else if (field === 'expiryDate' || field === 'mfgDate' || field === 'discountStartDate' || field === 'discountEndDate') {
            updateData[field] = value ? new Date(value) : null;
          } else if (field === 'dimensions' || field === 'nutritionFacts') {
            updateData[field] = safeObject(value);
          } else if (field === 'isFragile') {
            updateData[field] = safeBoolean(value);
          } else {
            updateData[field] = safeString(value);
          }
        }
      });
      
    } else {
      // Handle direct field updates
      const directFields = [
        'name', 'description', 'shortDescription', 'restaurantName',
        'oldPrice', 'price', 'newPrice', 'costPrice', 'stock', 'minStock', 'maxStock',
        'quality', 'dietPreference', 'lowStockAlert', 'reorderQuantity',
        'productTypes', 'ingredients', 'materialTypes', 'customWeight', 'customSizeInput',
        'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
        'brandName', 'fssaiLicense', 'legalDisclaimer', 'shelfLife', 'hsnCode',
        'manufacturerName', 'manufacturerAddress', 'manufacturer', 'manufacturerContact',
        'packagerName', 'packagerAddress', 'packagerFssaiLicense', 'packerContact',
        'marketerName', 'marketerAddress', 'marketerNameAddress',
        'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight',
        'totalEaches', 'itemPackageWeight',
        'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
        'State', 'city', 'pincode', 'status', 'approvalStatus',
        'weight', 'shippingClass', 'isFragile',
        'taxClass', 'taxPercentage',
        'discountType', 'discountValue',
        'metaTitle', 'metaDescription'
      ];
      
      directFields.forEach(field => {
        if (data[field] !== undefined) {
          if (field === 'newPrice') {
            updateData.price = safeNumber(data[field]);
          } else if (field.includes('Price') || field.includes('stock') || field === 'weight' || 
                     field === 'taxPercentage' || field === 'discountValue') {
            updateData[field] = safeNumber(data[field]);
          } else if (field === 'flavors' || field === 'size' || field === 'keywords' || field === 'tags') {
            updateData[field] = safeArray(data[field]);
          } else if (field === 'expiryDate' || field === 'mfgDate' || field === 'discountStartDate' || field === 'discountEndDate') {
            updateData[field] = data[field] ? new Date(data[field]) : null;
          } else if (field === 'dimensions' || field === 'nutritionFacts' || field === 'customFields') {
            updateData[field] = safeObject(data[field]);
          } else if (field === 'isFragile') {
            updateData[field] = safeBoolean(data[field]);
          } else {
            updateData[field] = safeString(data[field]);
          }
        }
      });
    }
    
    // Step 6: Update images
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
    
    // Handle mandatory images update
    const mandatoryImageFields = [
      { field: 'mandatoryImages.ingredientsImage', index: 0 },
      { field: 'mandatoryImages.nutritionImage', index: 1 },
      { field: 'mandatoryImages.mfgExpImage', index: 2 }
    ];
    
    for (const { field, index } of mandatoryImageFields) {
      if (req.files?.[field]?.[0]) {
        // Delete old image if exists
        if (gallery[index] && gallery[index].includes('cloudinary.com')) {
          await deleteCloudinaryImage(gallery[index]);
        }
        
        // Upload new image
        const img = await uploadCloud(req.files[field][0], 'vendor_products/mandatory');
        if (img) {
          if (gallery.length > index) {
            gallery[index] = img;
          } else {
            gallery.push(img);
          }
        }
      }
    }
    
    // Handle additional gallery images
    if (req.files?.gallery) {
      // If replace gallery flag is set, delete old gallery
      if (data.replaceGallery === 'true') {
        await deleteMultipleCloudinaryImages(gallery.slice(3)); // Keep mandatory images
        gallery = gallery.slice(0, 3); // Keep only mandatory images
      }
      
      // Upload new gallery images
      const galleryUrls = await uploadMultipleCloud(req.files.gallery, 'vendor_products/gallery');
      gallery = [...gallery, ...galleryUrls];
    }
    
    // Handle gallery removal
    if (data.removeGalleryImages && Array.isArray(data.removeGalleryImages)) {
      for (const imageUrl of data.removeGalleryImages) {
        const index = gallery.indexOf(imageUrl);
        if (index !== -1) {
          // Only delete from Cloudinary if it's not a mandatory image (first 3)
          if (index >= 3 && imageUrl.includes('cloudinary.com')) {
            await deleteCloudinaryImage(imageUrl);
          }
          gallery.splice(index, 1);
        }
      }
    }
    
    // Clean gallery
    updateData.gallery = gallery.filter(img => img && img.trim() !== '');
    
    // Handle documents update
    if (req.files?.documents) {
      const documents = [...(product.documents || [])];
      
      // Upload new documents
      for (const file of req.files.documents) {
        const docUrl = await uploadCloud(file, 'vendor_products/documents');
        if (docUrl) {
          documents.push({
            name: file.originalname,
            url: docUrl,
            type: file.mimetype
          });
        }
      }
      updateData.documents = documents;
    }
    
    // Handle document removal
    if (data.removeDocuments && Array.isArray(data.removeDocuments)) {
      const documents = [...(product.documents || [])];
      const documentsToRemove = data.removeDocuments;
      
      for (const docId of documentsToRemove) {
        const index = documents.findIndex(doc => doc._id?.toString() === docId || doc.url === docId);
        if (index !== -1) {
          const doc = documents[index];
          if (doc.url && doc.url.includes('cloudinary.com')) {
            await deleteCloudinaryImage(doc.url);
          }
          documents.splice(index, 1);
        }
      }
      updateData.documents = documents;
    }
    
    // Update updatedBy
    updateData.updatedBy = req.vendor._id;
    updateData.updatedAt = new Date();
    
    // Update product
    Object.assign(product, updateData);
    await product.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
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
    await session.abortTransaction();
    session.endSession();
    
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
    
    // Soft delete instead of hard delete
    await product.softDelete();
    
    res.json({ 
      success: true, 
      message: "Product deleted successfully",
      data: { id: product._id }
    });
  } catch (err) {
    console.error("❌ Delete vendor product error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};

/* ================= HARD DELETE VENDOR PRODUCT ================= */
exports.hardDeleteVendorProduct = async (req, res) => {
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
    
    // Delete main image from Cloudinary
    if (product.image && product.image.includes('cloudinary.com')) {
      await deleteCloudinaryImage(product.image);
    }
    
    // Delete gallery images from Cloudinary
    if (product.gallery && product.gallery.length > 0) {
      await deleteMultipleCloudinaryImages(product.gallery);
    }
    
    // Delete variation images
    if (product.hasVariations && product.variations.length > 0) {
      for (const variation of product.variations) {
        if (variation.image && variation.image.includes('cloudinary.com')) {
          await deleteCloudinaryImage(variation.image);
        }
        if (variation.gallery && variation.gallery.length > 0) {
          await deleteMultipleCloudinaryImages(variation.gallery);
        }
      }
    }
    
    // Delete documents
    if (product.documents && product.documents.length > 0) {
      for (const doc of product.documents) {
        if (doc.url && doc.url.includes('cloudinary.com')) {
          await deleteCloudinaryImage(doc.url);
        }
      }
    }
    
    // Delete product from database
    await product.deleteOne();
    
    res.json({ 
      success: true, 
      message: "Product permanently deleted successfully" 
    });
  } catch (err) {
    console.error("❌ Hard delete vendor product error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};

/* ================= RESTORE VENDOR PRODUCT ================= */
exports.restoreVendorProduct = async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
      isDeleted: true
    });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Deleted product not found" 
      });
    }
    
    await product.restore();
    
    res.json({ 
      success: true, 
      message: "Product restored successfully",
      data: product 
    });
  } catch (err) {
    console.error("❌ Restore vendor product error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};

/* ================= GET DELETED PRODUCTS ================= */
exports.getDeletedProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      search = '',
      sort = '-deletedAt'
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const query = { vendor: req.vendor._id, isDeleted: true };
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brandName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await VendorProduct.find(query)
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .lean();

    const total = await VendorProduct.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: products,
    });
  } catch (err) {
    console.error("❌ Get deleted products error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= VARIATION OPERATIONS ================= */

/* ================= ADD VARIATION ================= */
exports.addVariation = async (req, res) => {
  try {
    const { id } = req.params;
    const variationData = req.body;
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    // Generate unique variation ID
    const variationId = variationData.variationId || `var_${Date.now()}_${product.variations.length}`;
    
    const newVariation = {
      variationId,
      name: safeString(variationData.name),
      size: safeString(variationData.size),
      flavor: safeString(variationData.flavor),
      oldPrice: safeNumber(variationData.oldPrice),
      newPrice: safeNumber(variationData.newPrice || variationData.price),
      price: safeNumber(variationData.newPrice || variationData.price),
      stock: safeInt(variationData.stock),
      sku: safeString(variationData.sku),
      barcode: safeString(variationData.barcode),
      weight: safeString(variationData.weight),
      dimensions: safeString(variationData.dimensions),
      color: safeString(variationData.color),
      material: safeString(variationData.material),
      status: variationData.status || 'active',
      isDefault: variationData.isDefault || false,
      image: safeString(variationData.image),
      gallery: safeArray(variationData.gallery),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Handle variation image upload
    if (req.files?.image) {
      const imageFile = req.files.image[0];
      newVariation.image = await uploadCloud(imageFile, 'vendor_products/variations');
    }
    
    // Handle variation gallery upload
    if (req.files?.gallery) {
      const galleryUrls = await uploadMultipleCloud(req.files.gallery, 'vendor_products/variations/gallery');
      newVariation.gallery = [...(newVariation.gallery || []), ...galleryUrls];
    }
    
    // Set hasVariations to true
    product.hasVariations = true;
    product.variations.push(newVariation);
    
    // Set as default variation if specified or if it's the first variation
    if (newVariation.isDefault || product.variations.length === 1) {
      product.defaultVariationId = variationId;
      // Ensure only one variation is default
      product.variations.forEach(v => {
        v.isDefault = v.variationId === variationId;
      });
    }
    
    await product.save();
    
    res.json({
      success: true,
      message: "Variation added successfully",
      data: newVariation,
      totalVariations: product.variations.length
    });
    
  } catch (err) {
    console.error("❌ Add variation error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add variation"
    });
  }
};

/* ================= UPDATE VARIATION ================= */
exports.updateVariation = async (req, res) => {
  try {
    const { id, variationId } = req.params;
    const updateData = req.body;
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    const variationIndex = product.variations.findIndex(v => v.variationId === variationId);
    
    if (variationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Variation not found"
      });
    }
    
    // Update variation fields
    const variation = product.variations[variationIndex];
    
    // Handle image update
    if (req.files?.image) {
      // Delete old image
      if (variation.image && variation.image.includes('cloudinary.com')) {
        await deleteCloudinaryImage(variation.image);
      }
      
      // Upload new image
      const imageFile = req.files.image[0];
      variation.image = await uploadCloud(imageFile, 'vendor_products/variations');
    }
    
    // Handle gallery update
    if (req.files?.gallery) {
      // Delete old gallery if replace flag is set
      if (updateData.replaceGallery === 'true') {
        await deleteMultipleCloudinaryImages(variation.gallery || []);
        variation.gallery = [];
      }
      
      // Upload new gallery images
      const galleryUrls = await uploadMultipleCloud(req.files.gallery, 'vendor_products/variations/gallery');
      variation.gallery = [...(variation.gallery || []), ...galleryUrls];
    }
    
    // Handle gallery removal
    if (updateData.removeGalleryImages && Array.isArray(updateData.removeGalleryImages)) {
      for (const imageUrl of updateData.removeGalleryImages) {
        const index = variation.gallery.indexOf(imageUrl);
        if (index !== -1) {
          if (imageUrl.includes('cloudinary.com')) {
            await deleteCloudinaryImage(imageUrl);
          }
          variation.gallery.splice(index, 1);
        }
      }
    }
    
    // Update other fields
    if (updateData.name !== undefined) variation.name = safeString(updateData.name);
    if (updateData.size !== undefined) variation.size = safeString(updateData.size);
    if (updateData.flavor !== undefined) variation.flavor = safeString(updateData.flavor);
    if (updateData.oldPrice !== undefined) variation.oldPrice = safeNumber(updateData.oldPrice);
    if (updateData.newPrice !== undefined || updateData.price !== undefined) {
      const price = safeNumber(updateData.newPrice || updateData.price);
      variation.newPrice = price;
      variation.price = price;
    }
    if (updateData.stock !== undefined) variation.stock = safeInt(updateData.stock);
    if (updateData.sku !== undefined) variation.sku = safeString(updateData.sku);
    if (updateData.barcode !== undefined) variation.barcode = safeString(updateData.barcode);
    if (updateData.weight !== undefined) variation.weight = safeString(updateData.weight);
    if (updateData.dimensions !== undefined) variation.dimensions = safeString(updateData.dimensions);
    if (updateData.color !== undefined) variation.color = safeString(updateData.color);
    if (updateData.material !== undefined) variation.material = safeString(updateData.material);
    if (updateData.status !== undefined) variation.status = updateData.status;
    if (updateData.isDefault !== undefined) {
      variation.isDefault = safeBoolean(updateData.isDefault);
      
      // If setting as default, update product's default variation
      if (variation.isDefault) {
        product.defaultVariationId = variationId;
        // Ensure only one variation is default
        product.variations.forEach((v, idx) => {
          v.isDefault = idx === variationIndex;
        });
      }
    }
    
    variation.updatedAt = new Date();
    
    // Mark variations as modified
    product.markModified('variations');
    await product.save();
    
    res.json({
      success: true,
      message: "Variation updated successfully",
      data: variation
    });
    
  } catch (err) {
    console.error("❌ Update variation error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update variation"
    });
  }
};

/* ================= DELETE VARIATION ================= */
exports.deleteVariation = async (req, res) => {
  try {
    const { id, variationId } = req.params;
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    const variationIndex = product.variations.findIndex(v => v.variationId === variationId);
    
    if (variationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Variation not found"
      });
    }
    
    const variation = product.variations[variationIndex];
    
    // Delete variation images
    if (variation.image && variation.image.includes('cloudinary.com')) {
      await deleteCloudinaryImage(variation.image);
    }
    
    if (variation.gallery && variation.gallery.length > 0) {
      await deleteMultipleCloudinaryImages(variation.gallery);
    }
    
    // Remove variation
    product.variations.splice(variationIndex, 1);
    
    // If no variations left, set hasVariations to false
    if (product.variations.length === 0) {
      product.hasVariations = false;
      product.defaultVariationId = '';
    } else if (product.defaultVariationId === variationId) {
      // Update default variation if deleted variation was default
      product.defaultVariationId = product.variations[0].variationId;
      product.variations[0].isDefault = true;
    }
    
    await product.save();
    
    res.json({
      success: true,
      message: "Variation deleted successfully",
      totalVariations: product.variations.length
    });
    
  } catch (err) {
    console.error("❌ Delete variation error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete variation"
    });
  }
};

/* ================= UPDATE VARIATION STATUS ================= */
exports.updateVariationStatus = async (req, res) => {
  try {
    const { id, variationId } = req.params;
    const { status } = req.body;
    
    const allowedStatuses = ['active', 'inactive', 'out_of_stock', 'draft'];
    
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required'
      });
    }
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    const variationIndex = product.variations.findIndex(v => v.variationId === variationId);
    
    if (variationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Variation not found"
      });
    }
    
    product.variations[variationIndex].status = status;
    product.variations[variationIndex].updatedAt = new Date();
    
    product.markModified('variations');
    await product.save();
    
    res.json({
      success: true,
      message: 'Variation status updated successfully',
      data: product.variations[variationIndex]
    });
    
  } catch (err) {
    console.error('❌ Update variation status error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update variation status'
    });
  }
};

/* ================= SET DEFAULT VARIATION ================= */
exports.setDefaultVariation = async (req, res) => {
  try {
    const { id, variationId } = req.params;
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    const variationIndex = product.variations.findIndex(v => v.variationId === variationId);
    
    if (variationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Variation not found"
      });
    }
    
    // Update all variations to not default
    product.variations.forEach(v => {
      v.isDefault = false;
    });
    
    // Set selected variation as default
    product.variations[variationIndex].isDefault = true;
    product.defaultVariationId = variationId;
    
    product.markModified('variations');
    await product.save();
    
    res.json({
      success: true,
      message: 'Default variation set successfully',
      data: product.variations[variationIndex]
    });
    
  } catch (err) {
    console.error('❌ Set default variation error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to set default variation'
    });
  }
};

/* ================= GET PRODUCT STATISTICS ================= */
exports.getProductStatistics = async (req, res) => {
  try {
    const stats = await VendorProduct.getStats(req.vendor._id);
    
    // Get category-wise distribution
    const categoryStats = await VendorProduct.aggregate([
      { $match: { vendor: mongoose.Types.ObjectId(req.vendor._id), isDeleted: false } },
      { $group: {
        _id: '$category',
        count: { $sum: 1 },
        active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
        outOfStock: { $sum: { $cond: [{ $eq: ['$status', 'out_of_stock'] }, 1, 0] } }
      }},
      { $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'categoryInfo'
      }},
      { $unwind: { path: '$categoryInfo', preserveNullAndEmptyArrays: true } },
      { $project: {
        categoryId: '$_id',
        categoryName: '$categoryInfo.name',
        count: 1,
        active: 1,
        outOfStock: 1
      }},
      { $sort: { count: -1 } }
    ]);
    
    // Get status distribution
    const statusStats = await VendorProduct.aggregate([
      { $match: { vendor: mongoose.Types.ObjectId(req.vendor._id), isDeleted: false } },
      { $group: {
        _id: '$status',
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } }
    ]);
    
    // Get approval status distribution
    const approvalStats = await VendorProduct.aggregate([
      { $match: { vendor: mongoose.Types.ObjectId(req.vendor._id), isDeleted: false } },
      { $group: {
        _id: '$approvalStatus',
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } }
    ]);
    
    // Get variations count
    const variationsStats = await VendorProduct.aggregate([
      { $match: { vendor: mongoose.Types.ObjectId(req.vendor._id), isDeleted: false, hasVariations: true } },
      { $project: {
        variationsCount: { $size: '$variations' }
      }},
      { $group: {
        _id: null,
        totalProductsWithVariations: { $sum: 1 },
        totalVariations: { $sum: '$variationsCount' }
      }}
    ]);
    
    const variationsResult = variationsStats[0] || {
      totalProductsWithVariations: 0,
      totalVariations: 0
    };
    
    res.json({
      success: true,
      data: {
        ...stats,
        categoryStats,
        statusStats,
        approvalStats,
        ...variationsResult
      }
    });
    
  } catch (err) {
    console.error('❌ Get product statistics error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to get product statistics'
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
        if (!row.name || !row.category) {
          errors.push(`Row ${index + 1}: Name and category are required`);
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
          shortDescription: row.shortDescription || "",
          oldPrice: safeNumber(row.oldPrice),
          price: safeNumber(row.price) || 0,
          costPrice: safeNumber(row.costPrice),
          stock: safeInt(row.stock),
          minStock: safeInt(row.minStock),
          maxStock: safeInt(row.maxStock),
          quality: row.quality || "Standard",
          State: row.State || "",
          vendor: vendorId,
          restaurantName: vendor.storeName || row.restaurantName || "",
          storeName: vendor.storeName || "",
          category: categoryId,
          subcategory: subcategoryId,
          productTypes: row.productTypes || "",
          flavors: safeArray(row.flavors),
          size: safeArray(row.size),
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
          expiryDate: row.expiryDate ? new Date(row.expiryDate) : null,
          mfgDate: row.mfgDate ? new Date(row.mfgDate) : null,
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
          status: row.status || 'pending_approval',
          approvalStatus: row.approvalStatus || 'pending',
          // Variations
          hasVariations: row.hasVariations === 'true' || false,
          lowStockAlert: safeInt(row.lowStockAlert || 10),
          reorderQuantity: safeInt(row.reorderQuantity || 50),
          weight: safeNumber(row.weight),
          shippingClass: row.shippingClass || 'standard',
          isFragile: row.isFragile === 'true',
          taxClass: row.taxClass || 'standard',
          taxPercentage: safeNumber(row.taxPercentage),
          hsnCode: row.hsnCode || "",
          discountType: row.discountType || 'none',
          discountValue: safeNumber(row.discountValue),
          discountStartDate: row.discountStartDate ? new Date(row.discountStartDate) : null,
          discountEndDate: row.discountEndDate ? new Date(row.discountEndDate) : null,
          metaTitle: row.metaTitle || "",
          metaDescription: row.metaDescription || "",
          keywords: safeArray(row.keywords),
          tags: safeArray(row.tags)
        };

        // Handle variations from CSV
        if (row.variations) {
          try {
            const variations = JSON.parse(row.variations);
            if (Array.isArray(variations) && variations.length > 0) {
              productData.hasVariations = true;
              productData.variations = variations.map((v, idx) => ({
                variationId: v.variationId || `var_${Date.now()}_${idx}`,
                name: v.name || "",
                size: v.size || "",
                flavor: v.flavor || "",
                oldPrice: safeNumber(v.oldPrice),
                newPrice: safeNumber(v.newPrice || v.price),
                price: safeNumber(v.newPrice || v.price),
                stock: safeInt(v.stock),
                sku: v.sku || "",
                barcode: v.barcode || "",
                weight: v.weight || "",
                dimensions: v.dimensions || "",
                color: v.color || "",
                material: v.material || "",
                status: v.status || 'active',
                isDefault: v.isDefault || (idx === 0),
                image: v.image || "",
                gallery: safeArray(v.gallery),
                createdAt: v.createdAt ? new Date(v.createdAt) : new Date(),
                updatedAt: new Date()
              }));
              
              // Set default variation
              const defaultVariation = productData.variations.find(v => v.isDefault) || productData.variations[0];
              if (defaultVariation) {
                productData.defaultVariationId = defaultVariation.variationId;
              }
            }
          } catch (e) {
            console.log("Could not parse variations from CSV:", e.message);
          }
        }

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
      isDeleted: false
    })
      .populate("category", "name")
      .populate("subcategory", "name")
      .lean();

    // Transform data for CSV
    const transformedProducts = products.map(product => ({
      _id: product._id,
      name: product.name,
      description: product.description || "",
      shortDescription: product.shortDescription || "",
      brandName: product.brandName || "",
      fssaiLicense: product.fssaiLicense || "",
      restaurantName: product.restaurantName || "",
      storeName: product.storeName || "",
      oldPrice: product.oldPrice || 0,
      price: product.price || 0,
      costPrice: product.costPrice || 0,
      stock: product.stock || 0,
      minStock: product.minStock || 0,
      maxStock: product.maxStock || 0,
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
      expiryDate: product.expiryDate || "",
      mfgDate: product.mfgDate || "",
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
      approvalStatus: product.approvalStatus || "pending",
      // Variations
      hasVariations: product.hasVariations || false,
      defaultVariationId: product.defaultVariationId || "",
      variations: JSON.stringify(product.variations || []),
      lowStockAlert: product.lowStockAlert || 10,
      reorderQuantity: product.reorderQuantity || 50,
      soldCount: product.soldCount || 0,
      viewCount: product.viewCount || 0,
      weight: product.weight || 0,
      shippingClass: product.shippingClass || "standard",
      isFragile: product.isFragile || false,
      taxClass: product.taxClass || "standard",
      taxPercentage: product.taxPercentage || 0,
      hsnCode: product.hsnCode || "",
      discountType: product.discountType || "none",
      discountValue: product.discountValue || 0,
      discountStartDate: product.discountStartDate || "",
      discountEndDate: product.discountEndDate || "",
      metaTitle: product.metaTitle || "",
      metaDescription: product.metaDescription || "",
      keywords: Array.isArray(product.keywords) ? product.keywords.join(',') : product.keywords || "",
      tags: Array.isArray(product.tags) ? product.tags.join(',') : product.tags || "",
      slug: product.slug || "",
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    const fields = [
      '_id', 'name', 'description', 'shortDescription', 'brandName', 'fssaiLicense', 
      'restaurantName', 'storeName', 'oldPrice', 'price', 'costPrice', 'stock', 
      'minStock', 'maxStock', 'quality', 'State', 'category', 'subcategory', 
      'categoryId', 'subcategoryId', 'productTypes', 'flavors', 'size', 
      'dietPreference', 'ageRange', 'containerType', 'itemForm', 'specialty',
      'itemTypeName', 'countryOfOrigin', 'manufacturerName', 'manufacturerAddress', 
      'manufacturer', 'manufacturerContact', 'packagerName', 'packagerAddress', 
      'packagerFssaiLicense', 'packerContact', 'marketerName', 'marketerAddress', 
      'marketerNameAddress', 'packageColour', 'measurementUnit', 'unitCount', 
      'numberOfItems', 'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife',
      'expiryDate', 'mfgDate', 'ingredients', 'allergenInformation', 'directions', 
      'nutrition', 'cuisine', 'dietaryPreferences', 'materialTypes', 'customWeight',
      'customSizeInput', 'legalDisclaimer', 'status', 'approvalStatus', 'hasVariations',
      'defaultVariationId', 'variations', 'lowStockAlert', 'reorderQuantity', 
      'soldCount', 'viewCount', 'weight', 'shippingClass', 'isFragile', 'taxClass',
      'taxPercentage', 'hsnCode', 'discountType', 'discountValue', 'discountStartDate',
      'discountEndDate', 'metaTitle', 'metaDescription', 'keywords', 'tags', 'slug',
      'createdAt', 'updatedAt'
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
    updateData.updatedBy = req.vendor._id;
    updateData.updatedAt = new Date();
    
    // Handle price mapping
    if (updateData.newPrice !== undefined) {
      updateData.price = updateData.newPrice;
      delete updateData.newPrice;
    }
    
    // Convert numeric fields
    const numericFields = ['price', 'oldPrice', 'costPrice', 'stock', 'minStock', 'maxStock', 
                          'lowStockAlert', 'reorderQuantity', 'weight', 'taxPercentage', 'discountValue'];
    numericFields.forEach(field => {
      if (updateData[field] !== undefined) {
        updateData[field] = safeNumber(updateData[field]);
      }
    });
    
    // Handle array fields
    const arrayFields = ['flavors', 'size', 'keywords', 'tags'];
    arrayFields.forEach(field => {
      if (updateData[field] !== undefined) {
        updateData[field] = safeArray(updateData[field]);
      }
    });
    
    // Handle date fields
    const dateFields = ['expiryDate', 'mfgDate', 'discountStartDate', 'discountEndDate'];
    dateFields.forEach(field => {
      if (updateData[field] !== undefined) {
        updateData[field] = updateData[field] ? new Date(updateData[field]) : null;
      }
    });
    
    // Handle boolean fields
    const booleanFields = ['isFragile'];
    booleanFields.forEach(field => {
      if (updateData[field] !== undefined) {
        updateData[field] = safeBoolean(updateData[field]);
      }
    });

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

    // Soft delete products
    const result = await VendorProduct.updateMany(
      { _id: { $in: ids }, vendor: req.vendor._id },
      { 
        $set: { 
          isDeleted: true,
          deletedAt: new Date(),
          status: 'archived'
        } 
      }
    );

    res.json({ 
      success: true, 
      message: `${result.modifiedCount} products moved to trash`,
      deleted: result.modifiedCount 
    });
  } catch (err) {
    console.error("❌ Bulk delete error:", err);
    res.status(500).json({ 
      success: false,
      message: "Bulk delete failed" 
    });
  }
};

/* ================= BULK RESTORE ================= */
exports.bulkRestore = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids?.length) {
      return res.status(400).json({ 
        success: false,
        message: "Product IDs required" 
      });
    }

    // Restore products
    const result = await VendorProduct.updateMany(
      { _id: { $in: ids }, vendor: req.vendor._id, isDeleted: true },
      { 
        $set: { 
          isDeleted: false,
          deletedAt: null,
          status: 'draft'
        } 
      }
    );

    res.json({ 
      success: true, 
      message: `${result.modifiedCount} products restored`,
      restored: result.modifiedCount 
    });
  } catch (err) {
    console.error("❌ Bulk restore error:", err);
    res.status(500).json({ 
      success: false,
      message: "Bulk restore failed" 
    });
  }
};

/* ================= BULK HARD DELETE ================= */
exports.bulkHardDelete = async (req, res) => {
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
      // Delete main image
      if (product.image && product.image.includes('cloudinary.com')) {
        await deleteCloudinaryImage(product.image);
      }
      
      // Delete gallery images
      if (product.gallery && product.gallery.length > 0) {
        await deleteMultipleCloudinaryImages(product.gallery);
      }
      
      // Delete variation images
      if (product.hasVariations && product.variations.length > 0) {
        for (const variation of product.variations) {
          if (variation.image && variation.image.includes('cloudinary.com')) {
            await deleteCloudinaryImage(variation.image);
          }
          if (variation.gallery && variation.gallery.length > 0) {
            await deleteMultipleCloudinaryImages(variation.gallery);
          }
        }
      }
      
      // Delete documents
      if (product.documents && product.documents.length > 0) {
        for (const doc of product.documents) {
          if (doc.url && doc.url.includes('cloudinary.com')) {
            await deleteCloudinaryImage(doc.url);
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
      message: `${result.deletedCount} products permanently deleted`,
      deleted: result.deletedCount 
    });
  } catch (err) {
    console.error("❌ Bulk hard delete error:", err);
    res.status(500).json({ 
      success: false,
      message: "Bulk hard delete failed" 
    });
  }
};

/* ================= UPDATE PRODUCT STATUS ================= */
exports.updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const allowedStatuses = ['active', 'inactive', 'draft', 'out_of_stock', 'pending_approval', 'rejected', 'archived'];
    
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required'
      });
    }
    
    const product = await VendorProduct.findOneAndUpdate(
      { _id: id, vendor: req.vendor._id },
      { 
        status,
        updatedBy: req.vendor._id,
        updatedAt: new Date()
      },
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

/* ================= UPDATE APPROVAL STATUS ================= */
exports.updateApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvalStatus, approvalNotes } = req.body;
    
    const allowedStatuses = ['pending', 'approved', 'rejected', 'review'];
    
    if (!approvalStatus || !allowedStatuses.includes(approvalStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Valid approval status is required'
      });
    }
    
    const updateData = {
      approvalStatus,
      updatedBy: req.vendor._id,
      updatedAt: new Date()
    };
    
    if (approvalNotes !== undefined) {
      updateData.approvalNotes = approvalNotes;
    }
    
    // Update product status based on approval status
    if (approvalStatus === 'approved') {
      updateData.status = 'active';
    } else if (approvalStatus === 'rejected') {
      updateData.status = 'rejected';
    }
    
    const product = await VendorProduct.findOneAndUpdate(
      { _id: id, vendor: req.vendor._id },
      updateData,
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
      message: 'Product approval status updated successfully',
      data: product
    });
    
  } catch (err) {
    console.error('❌ Update approval status error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update approval status'
    });
  }
};

/* ================= UPDATE STOCK ================= */
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, operation = 'set' } = req.body;
    
    if (stock === undefined || isNaN(parseInt(stock))) {
      return res.status(400).json({
        success: false,
        message: 'Valid stock value is required'
      });
    }
    
    const stockValue = parseInt(stock);
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    let newStock = product.stock;
    
    if (operation === 'set') {
      newStock = stockValue;
    } else if (operation === 'increase') {
      newStock += stockValue;
    } else if (operation === 'decrease') {
      newStock = Math.max(0, newStock - stockValue);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid operation. Use: set, increase, or decrease'
      });
    }
    
    product.stock = newStock;
    
    // Update status based on stock
    if (newStock <= 0 && product.status !== 'inactive') {
      product.status = 'out_of_stock';
    } else if (product.status === 'out_of_stock' && newStock > 0 && product.approvalStatus === 'approved') {
      product.status = 'active';
    }
    
    product.updatedBy = req.vendor._id;
    product.updatedAt = new Date();
    
    await product.save();
    
    res.json({
      success: true,
      message: `Stock ${operation}d successfully`,
      data: {
        id: product._id,
        oldStock: product.stock,
        newStock,
        status: product.status
      }
    });
    
  } catch (err) {
    console.error('❌ Update stock error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update stock'
    });
  }
};

/* ================= UPDATE VARIATION STOCK ================= */
exports.updateVariationStock = async (req, res) => {
  try {
    const { id, variationId } = req.params;
    const { stock, operation = 'set' } = req.body;
    
    if (stock === undefined || isNaN(parseInt(stock))) {
      return res.status(400).json({
        success: false,
        message: 'Valid stock value is required'
      });
    }
    
    const stockValue = parseInt(stock);
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    const variationIndex = product.variations.findIndex(v => v.variationId === variationId);
    
    if (variationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Variation not found"
      });
    }
    
    const variation = product.variations[variationIndex];
    let newStock = variation.stock;
    
    if (operation === 'set') {
      newStock = stockValue;
    } else if (operation === 'increase') {
      newStock += stockValue;
    } else if (operation === 'decrease') {
      newStock = Math.max(0, newStock - stockValue);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid operation. Use: set, increase, or decrease'
      });
    }
    
    variation.stock = newStock;
    variation.updatedAt = new Date();
    
    // Update variation status based on stock
    if (newStock <= 0 && variation.status !== 'inactive') {
      variation.status = 'out_of_stock';
    } else if (variation.status === 'out_of_stock' && newStock > 0) {
      variation.status = 'active';
    }
    
    product.markModified('variations');
    product.updatedBy = req.vendor._id;
    product.updatedAt = new Date();
    
    await product.save();
    
    res.json({
      success: true,
      message: `Variation stock ${operation}d successfully`,
      data: {
        productId: product._id,
        variationId,
        variationName: variation.name,
        oldStock: variation.stock,
        newStock,
        status: variation.status
      }
    });
    
  } catch (err) {
    console.error('❌ Update variation stock error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update variation stock'
    });
  }
};

/* ================= GET LOW STOCK PRODUCTS ================= */
exports.getLowStockProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find products with low stock
    const products = await VendorProduct.find({
      vendor: req.vendor._id,
      isDeleted: false,
      $or: [
        // Products without variations
        {
          hasVariations: false,
          stock: { $gt: 0, $lte: '$lowStockAlert' }
        },
        // Products with variations
        {
          hasVariations: true,
          'variations.stock': { $gt: 0, $lte: '$lowStockAlert' },
          'variations.status': 'active'
        }
      ]
    })
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .sort({ stock: 1 })
      .limit(parseInt(limit))
      .skip(skip)
      .lean();

    const total = await VendorProduct.countDocuments({
      vendor: req.vendor._id,
      isDeleted: false,
      $or: [
        {
          hasVariations: false,
          stock: { $gt: 0, $lte: '$lowStockAlert' }
        },
        {
          hasVariations: true,
          'variations.stock': { $gt: 0, $lte: '$lowStockAlert' },
          'variations.status': 'active'
        }
      ]
    });

    res.json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: products,
    });
  } catch (err) {
    console.error("❌ Get low stock products error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET OUT OF STOCK PRODUCTS ================= */
exports.getOutOfStockProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find out of stock products
    const products = await VendorProduct.find({
      vendor: req.vendor._id,
      isDeleted: false,
      $or: [
        // Products without variations
        {
          hasVariations: false,
          stock: 0
        },
        // Products with variations but no active variations with stock
        {
          hasVariations: true,
          $or: [
            { 'variations': { $size: 0 } },
            { 
              'variations': { 
                $not: { 
                  $elemMatch: { 
                    status: 'active',
                    stock: { $gt: 0 }
                  }
                }
              }
            }
          ]
        }
      ]
    })
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .lean();

    const total = await VendorProduct.countDocuments({
      vendor: req.vendor._id,
      isDeleted: false,
      $or: [
        {
          hasVariations: false,
          stock: 0
        },
        {
          hasVariations: true,
          $or: [
            { 'variations': { $size: 0 } },
            { 
              'variations': { 
                $not: { 
                  $elemMatch: { 
                    status: 'active',
                    stock: { $gt: 0 }
                  }
                }
              }
            }
          ]
        }
      ]
    });

    res.json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: products,
    });
  } catch (err) {
    console.error("❌ Get out of stock products error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= SEARCH PRODUCTS ================= */
exports.searchProducts = async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const searchQuery = {
      vendor: req.vendor._id,
      isDeleted: false,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { brandName: { $regex: query, $options: 'i' } },
        { restaurantName: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
        { "variations.sku": { $regex: query, $options: 'i' } },
        { "variations.barcode": { $regex: query, $options: 'i' } },
        { "variations.name": { $regex: query, $options: 'i' } }
      ]
    };
    
    const products = await VendorProduct.find(searchQuery)
      .select('_id name price oldPrice image status stock hasVariations variations')
      .limit(parseInt(limit))
      .lean();
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
    
  } catch (err) {
    console.error('❌ Search products error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to search products'
    });
  }
};

/* ================= GET PRODUCTS BY CATEGORY ================= */
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const {
      page = 1,
      limit = 50,
      status = 'active',
      hasVariations = ''
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const query = {
      vendor: req.vendor._id,
      category: categoryId,
      isDeleted: false
    };
    
    if (status) query.status = status;
    if (hasVariations !== '') {
      query.hasVariations = safeBoolean(hasVariations);
    }
    
    const products = await VendorProduct.find(query)
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .lean();

    const total = await VendorProduct.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: products,
    });
  } catch (err) {
    console.error("❌ Get products by category error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
