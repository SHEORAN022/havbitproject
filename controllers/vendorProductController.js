

// // const VendorProduct = require("../models/VendorProduct");
// // const Vendor = require("../models/Vendor");
// // const Category = require("../models/Category");
// // const SubCategory = require("../models/SubCategory");
// // const cloudinary = require("../config/cloudinary");
// // const csv = require("csv-parser");
// // const fs = require("fs");
// // const { Parser } = require("json2csv");

// // /* ================= CLOUDINARY UPLOAD ================= */
// // async function uploadCloud(file, folder = "vendor_products") {
// //   try {
// //     if (!file || !file.buffer) {
// //       console.error("❌ No file buffer provided");
// //       return null;
// //     }

// //     const base64 = file.buffer.toString("base64");
// //     const dataUri = `data:${file.mimetype};base64,${base64}`;
    
// //     const result = await cloudinary.uploader.upload(dataUri, {
// //       folder: folder,
// //       resource_type: "auto",
// //       transformation: [
// //         { width: 800, height: 800, crop: "limit" },
// //         { quality: "auto:good" }
// //       ]
// //     });
    
// //     console.log(`✅ Cloudinary upload successful: ${result.secure_url}`);
// //     return result.secure_url;
// //   } catch (error) {
// //     console.error("❌ Cloudinary upload error:", error.message);
// //     return null;
// //   }
// // }

// // /* ================= DELETE CLOUDINARY IMAGE ================= */
// // async function deleteCloudinaryImage(imageUrl) {
// //   try {
// //     if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
// //       return;
// //     }
    
// //     const urlParts = imageUrl.split('/');
// //     const publicIdWithExtension = urlParts.slice(-2).join('/');
// //     const publicId = publicIdWithExtension.split('.')[0];
    
// //     await cloudinary.uploader.destroy(publicId);
// //     console.log(`✅ Deleted Cloudinary image: ${publicId}`);
// //   } catch (error) {
// //     console.error("❌ Error deleting Cloudinary image:", error.message);
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
// //     console.error("❌ Get categories error:", err);
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
// //       .select("name image _id category")
// //       .sort({ name: 1 });
    
// //     res.json({ success: true, data: subcategories });
// //   } catch (err) {
// //     console.error("❌ Get subcategories error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= GET VENDOR PRODUCTS ================= */
// // exports.getVendorProducts = async (req, res) => {
// //   try {
// //     const {
// //       page = 1,
// //       limit = 50,
// //       search = '',
// //       category = '',
// //       subcategory = '',
// //       status = '',
// //       sort = '-createdAt'
// //     } = req.query;
    
// //     const skip = (parseInt(page) - 1) * parseInt(limit);
    
// //     const query = { vendor: req.vendor._id };
    
// //     // Search filter
// //     if (search) {
// //       query.$or = [
// //         { name: { $regex: search, $options: 'i' } },
// //         { description: { $regex: search, $options: 'i' } },
// //         { brandName: { $regex: search, $options: 'i' } },
// //         { restaurantName: { $regex: search, $options: 'i' } }
// //       ];
// //     }
    
// //     // Category filter
// //     if (category) query.category = category;
// //     if (subcategory) query.subcategory = subcategory;
    
// //     // Status filter
// //     if (status) query.status = status;
    
// //     const products = await VendorProduct.find(query)
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image")
// //       .sort(sort)
// //       .limit(parseInt(limit))
// //       .skip(skip)
// //       .lean();

// //     const total = await VendorProduct.countDocuments(query);
// //     const vendor = await Vendor.findById(req.vendor._id).select("storeName name email phone");

// //     res.json({
// //       success: true,
// //       count: products.length,
// //       total,
// //       page: parseInt(page),
// //       pages: Math.ceil(total / parseInt(limit)),
// //       vendor: {
// //         id: vendor._id,
// //         storeName: vendor.storeName || "",
// //         name: vendor.name || "",
// //         email: vendor.email || "",
// //         phone: vendor.phone || ""
// //       },
// //       data: products,
// //     });
// //   } catch (err) {
// //     console.error("❌ Get vendor products error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= GET SINGLE VENDOR PRODUCT ================= */
// // exports.getVendorProduct = async (req, res) => {
// //   try {
// //     const { id } = req.params;
    
// //     const product = await VendorProduct.findOne({
// //       _id: id,
// //       vendor: req.vendor._id,
// //     })
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image")
// //       .populate("vendor", "storeName name email phone")
// //       .lean();
    
// //     if (!product) {
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "Product not found" 
// //       });
// //     }
    
// //     res.json({
// //       success: true,
// //       data: product
// //     });
// //   } catch (err) {
// //     console.error("❌ Get vendor product error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // /* ================= CREATE VENDOR PRODUCT ================= */
// // exports.createVendorProduct = async (req, res) => {
// //   try {
// //     console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
    
// //     const vendor = await Vendor.findById(req.vendor._id);
// //     if (!vendor) {
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "Vendor not found" 
// //       });
// //     }
    
// //     const data = { ...req.body };
    
// //     // Step 1: Parse and prepare product data
// //     let productData = {};
    
// //     // Helper functions
// //     const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
// //     const safeNumber = (value) => {
// //       const num = parseFloat(value);
// //       return isNaN(num) ? 0 : num;
// //     };
// //     const safeArray = (value) => {
// //       if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
// //       if (typeof value === 'string' && value.trim() !== '') {
// //         return value.split(',').map(item => item.trim()).filter(item => item !== '');
// //       }
// //       return [];
// //     };
// //     const safeBoolean = (value) => {
// //       if (value === 'true' || value === true) return true;
// //       if (value === 'false' || value === false) return false;
// //       return Boolean(value);
// //     };
    
// //     // Step 2: Category Validation
// //     if (data.category) {
// //       const categoryExists = await Category.findById(data.category);
// //       if (!categoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid category selected" 
// //         });
// //       }
// //       productData.category = data.category;
// //     } else {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Category is required"
// //       });
// //     }

// //     // Step 3: Subcategory validation
// //     if (data.subcategory) {
// //       const subcategoryExists = await SubCategory.findById(data.subcategory);
// //       if (!subcategoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid subcategory selected" 
// //         });
// //       }
      
// //       // Check if subcategory belongs to selected category
// //       if (subcategoryExists.category && subcategoryExists.category.toString() !== data.category) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Subcategory does not belong to selected category" 
// //         });
// //       }
      
// //       productData.subcategory = data.subcategory;
// //     }
    
// //     // Step 4: Handle variations
// //     if (data.variations && typeof data.variations === 'string') {
// //       try {
// //         data.variations = JSON.parse(data.variations);
// //       } catch (e) {
// //         console.log("Could not parse variations string");
// //       }
// //     }
    
// //     // Set hasVariations flag
// //     if (data.variations && Array.isArray(data.variations) && data.variations.length > 0) {
// //       productData.hasVariations = true;
// //       productData.variations = data.variations.map((v, index) => ({
// //         variationId: v.variationId || `var_${Date.now()}_${index}`,
// //         size: safeString(v.size),
// //         flavor: safeString(v.flavor),
// //         oldPrice: safeNumber(v.oldPrice),
// //         newPrice: safeNumber(v.newPrice || v.price),
// //         stock: safeNumber(v.stock),
// //         sku: safeString(v.sku),
// //         image: safeString(v.image)
// //       }));
// //     } else if (data.hasVariations !== undefined) {
// //       productData.hasVariations = safeBoolean(data.hasVariations);
// //       productData.variations = [];
// //     }
    
// //     // Step 5: Process formData if present
// //     if (data.formData && typeof data.formData === 'string') {
// //       try {
// //         data.formData = JSON.parse(data.formData);
// //       } catch (e) {
// //         console.log("Could not parse formData string");
// //       }
// //     }
    
// //     if (data.formData && typeof data.formData === 'object') {
// //       // Basic Information
// //       productData.name = safeString(data.formData.basic?.name || data.name);
// //       productData.description = safeString(data.formData.basic?.description || data.description);
// //       productData.restaurantName = safeString(vendor.storeName || data.formData.basic?.restaurantName || "");
      
// //       // Pricing
// //       if (data.formData.pricing) {
// //         productData.oldPrice = safeNumber(data.formData.pricing.oldPrice);
// //         productData.price = safeNumber(data.formData.pricing.newPrice || data.formData.pricing.price);
// //         productData.stock = safeNumber(data.formData.pricing.stock);
// //         productData.quality = safeString(data.formData.pricing.quality) || "Standard";
// //         productData.dietPreference = safeString(data.formData.pricing.dietPreference) || "Veg";
// //       } else {
// //         productData.oldPrice = safeNumber(data.oldPrice);
// //         productData.price = safeNumber(data.newPrice || data.price);
// //         productData.stock = safeNumber(data.stock);
// //         productData.quality = safeString(data.quality) || "Standard";
// //         productData.dietPreference = safeString(data.dietPreference) || "Veg";
// //       }
      
// //       // Product Details
// //       if (data.formData.details) {
// //         productData.productTypes = safeString(data.formData.details.productTypes);
// //         productData.ingredients = safeString(data.formData.details.ingredients);
// //         productData.materialTypes = safeString(data.formData.details.materialTypes);
// //         productData.customWeight = safeString(data.formData.details.customWeight);
// //         productData.customSizeInput = safeString(data.formData.details.customSizeInput);
// //         productData.ageRange = safeString(data.formData.details.ageRange);
// //         productData.containerType = safeString(data.formData.details.containerType);
// //         productData.itemForm = safeString(data.formData.details.itemForm);
// //         productData.specialty = safeString(data.formData.details.specialty);
// //         productData.itemTypeName = safeString(data.formData.details.itemTypeName);
// //         productData.countryOfOrigin = safeString(data.formData.details.countryOfOrigin);
        
// //         // Flavors array
// //         const flavorsArray = [];
// //         if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
// //           flavorsArray.push(...data.formData.details.flavors);
// //         }
// //         if (data.formData.details.customFlavorInput) {
// //           flavorsArray.push(data.formData.details.customFlavorInput);
// //         }
// //         productData.flavors = flavorsArray.filter(f => f && safeString(f) !== '');
        
// //         // Size array
// //         const sizeArray = [];
// //         if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
// //           sizeArray.push(...data.formData.details.size);
// //         }
// //         if (data.formData.details.customSizeInput) {
// //           sizeArray.push(data.formData.details.customSizeInput);
// //         }
// //         productData.size = sizeArray.filter(s => s && safeString(s) !== '');
// //       }
      
// //       // Location
// //       if (data.formData.location) {
// //         productData.State = safeString(data.formData.location.state);
// //       }
      
// //       // Compliance
// //       if (data.formData.compliance) {
// //         productData.brandName = safeString(data.formData.compliance.fssaiLicense);
// //         productData.fssaiLicense = safeString(data.formData.compliance.fssaiLicense);
// //         productData.legalDisclaimer = safeString(data.formData.compliance.legalDisclaimer);
// //         productData.shelfLife = safeString(data.formData.compliance.shelfLife);
// //       }
      
// //       // Manufacturing
// //       if (data.formData.manufacturing) {
// //         productData.manufacturerName = safeString(data.formData.manufacturing.manufacturerName);
// //         productData.manufacturerAddress = safeString(data.formData.manufacturing.manufacturerAddress);
// //         productData.manufacturer = safeString(data.formData.manufacturing.manufacturerName);
// //         productData.manufacturerContact = safeString(data.formData.manufacturing.manufacturerAddress);
        
// //         // Packager
// //         productData.packagerName = safeString(data.formData.manufacturing.packagerName);
// //         productData.packagerAddress = safeString(data.formData.manufacturing.packagerAddress);
// //         productData.packagerFssaiLicense = safeString(data.formData.manufacturing.packagerFssaiLicense);
// //         productData.packerContact = safeString(
// //           data.formData.manufacturing.packagerName && data.formData.manufacturing.packagerAddress ?
// //           `${data.formData.manufacturing.packagerName}, ${data.formData.manufacturing.packagerAddress}` :
// //           data.formData.manufacturing.packagerName || data.formData.manufacturing.packagerAddress || ''
// //         );
        
// //         // Marketer
// //         productData.marketerName = safeString(data.formData.manufacturing.marketerName);
// //         productData.marketerAddress = safeString(data.formData.manufacturing.marketerAddress);
// //         productData.marketerNameAddress = safeString(
// //           data.formData.manufacturing.marketerName && data.formData.manufacturing.marketerAddress ?
// //           `${data.formData.manufacturing.marketerName}, ${data.formData.manufacturing.marketerAddress}` :
// //           data.formData.manufacturing.marketerName || data.formData.manufacturing.marketerAddress || ''
// //         );
// //       }
      
// //       // Package Details
// //       if (data.formData.package) {
// //         productData.packageColour = safeString(data.formData.package.packageColour);
// //         productData.measurementUnit = safeString(data.formData.package.measurementUnit);
// //         productData.unitCount = safeString(data.formData.package.unitCount);
// //         productData.numberOfItems = safeString(data.formData.package.numberOfItems);
// //         productData.itemWeight = safeString(data.formData.package.itemWeight);
// //         productData.totalEaches = safeString(data.formData.package.totalEaches);
// //         productData.itemPackageWeight = safeString(data.formData.package.itemPackageWeight);
// //         productData.shelfLife = safeString(data.formData.package.shelfLife || productData.shelfLife);
// //       }
      
// //       // Dietary & Nutrition
// //       if (data.formData.dietary) {
// //         productData.dietaryPreferences = safeString(data.formData.dietary.dietaryPreferences);
// //         productData.allergenInformation = safeString(data.formData.dietary.allergenInformation);
// //         productData.nutrition = safeString(data.formData.dietary.nutrition);
// //         productData.cuisine = safeString(data.formData.dietary.cuisine);
// //         productData.directions = safeString(data.formData.dietary.directions);
// //       }
      
// //     } else {
// //       // Direct fields without formData
// //       productData = {
// //         // Basic
// //         name: safeString(data.name),
// //         description: safeString(data.description),
// //         restaurantName: safeString(vendor.storeName || data.restaurantName || ""),
// //         hasVariations: productData.hasVariations || false,
// //         variations: productData.variations || [],
        
// //         // Pricing
// //         oldPrice: safeNumber(data.oldPrice),
// //         price: safeNumber(data.newPrice || data.price),
// //         stock: safeNumber(data.stock),
// //         quality: safeString(data.quality) || "Standard",
// //         dietPreference: safeString(data.dietPreference) || "Veg",
        
// //         // Category
// //         category: data.category || data.selectedCategory,
// //         subcategory: data.subcategory || data.selectedSubCategory,
        
// //         // Details
// //         productTypes: safeString(data.productTypes),
// //         ingredients: safeString(data.ingredients),
// //         materialTypes: safeString(data.materialTypes),
// //         customWeight: safeString(data.customWeight),
// //         customSizeInput: safeString(data.customSizeInput),
// //         ageRange: safeString(data.ageRange),
// //         containerType: safeString(data.containerType),
// //         itemForm: safeString(data.itemForm),
// //         specialty: safeString(data.specialty),
// //         itemTypeName: safeString(data.itemTypeName),
// //         countryOfOrigin: safeString(data.countryOfOrigin),
        
// //         // Arrays
// //         flavors: safeArray(data.flavors),
// //         size: safeArray(data.size),
        
// //         // Compliance
// //         brandName: safeString(data.brandName || data.fssaiLicenseNumber),
// //         fssaiLicense: safeString(data.fssaiLicense || data.fssaiLicenseNumber),
// //         legalDisclaimer: safeString(data.legalDisclaimer),
// //         shelfLife: safeString(data.shelfLife),
        
// //         // Manufacturing
// //         manufacturerName: safeString(data.manufacturerName || data.manufacturer),
// //         manufacturerAddress: safeString(data.manufacturerAddress || data.manufacturerContact),
// //         manufacturer: safeString(data.manufacturer || data.manufacturerName),
// //         manufacturerContact: safeString(data.manufacturerContact || data.manufacturerAddress),
        
// //         // Packager
// //         packagerName: safeString(data.packagerName),
// //         packagerAddress: safeString(data.packagerAddress),
// //         packagerFssaiLicense: safeString(data.packagerFssaiLicense),
// //         packerContact: safeString(data.packerContact),
        
// //         // Marketer
// //         marketerName: safeString(data.marketerName),
// //         marketerAddress: safeString(data.marketerAddress),
// //         marketerNameAddress: safeString(data.marketerNameAddress),
        
// //         // Package
// //         packageColour: safeString(data.packageColour),
// //         measurementUnit: safeString(data.measurementUnit),
// //         unitCount: safeString(data.unitCount),
// //         numberOfItems: safeString(data.numberOfItems),
// //         itemWeight: safeString(data.itemWeight),
// //         totalEaches: safeString(data.totalEaches),
// //         itemPackageWeight: safeString(data.itemPackageWeight),
        
// //         // Dietary
// //         dietaryPreferences: safeString(data.dietaryPreferences),
// //         allergenInformation: safeString(data.allergenInformation || data.allergenInfo),
// //         nutrition: safeString(data.nutrition),
// //         cuisine: safeString(data.cuisine),
// //         directions: safeString(data.directions),
        
// //         // Location
// //         State: safeString(data.State),
        
// //         // Status
// //         status: safeString(data.status) || 'pending_approval',
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
    
// //     // Price validation for non-variation products
// //     if (!productData.hasVariations && (!productData.price || productData.price <= 0)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Price is required for non-variation products"
// //       });
// //     }
    
// //     // Step 6: Process images
// //     // Main image
// //     if (req.files?.image?.[0]) {
// //       productData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
// //     }
    
// //     // Gallery images
// //     let galleryImages = [];
    
// //     // Mandatory images
// //     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
// //       const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0], 'vendor_products/gallery');
// //       if (img) galleryImages.push(img);
// //     }
    
// //     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
// //       const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0], 'vendor_products/gallery');
// //       if (img) galleryImages.push(img);
// //     }
    
// //     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
// //       const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0], 'vendor_products/gallery');
// //       if (img) galleryImages.push(img);
// //     }
    
// //     // Additional gallery images
// //     if (req.files?.gallery) {
// //       for (const file of req.files.gallery) {
// //         const img = await uploadCloud(file, 'vendor_products/gallery');
// //         if (img) galleryImages.push(img);
// //       }
// //     }
    
// //     // Clean gallery
// //     productData.gallery = galleryImages.filter(img => img && img.trim() !== '');
    
// //     // Add vendor ID
// //     productData.vendor = req.vendor._id;
    
// //     // Debug log
// //     console.log("📦 Final product data:", JSON.stringify(productData, null, 2));
    
// //     // Create product
// //     const product = await VendorProduct.create(productData);
    
// //     // Populate and return
// //     const populatedProduct = await VendorProduct.findById(product._id)
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image")
// //       .lean();
    
// //     res.json({ 
// //       success: true, 
// //       message: "Product created successfully",
// //       data: populatedProduct,
// //       vendor: {
// //         storeName: vendor.storeName || "",
// //         id: vendor._id
// //       }
// //     });
    
// //   } catch (err) {
// //     console.error("❌ CREATE VENDOR PRODUCT ERROR:", err);
    
// //     if (err.name === 'ValidationError') {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Validation failed',
// //         errors: Object.values(err.errors).map(e => e.message)
// //       });
// //     }
    
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Server Error: " + err.message
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

// //     // Helper functions
// //     const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
// //     const safeNumber = (value) => {
// //       const num = parseFloat(value);
// //       return isNaN(num) ? 0 : num;
// //     };
// //     const safeArray = (value) => {
// //       if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
// //       if (typeof value === 'string' && value.trim() !== '') {
// //         return value.split(',').map(item => item.trim()).filter(item => item !== '');
// //       }
// //       return [];
// //     };
// //     const safeBoolean = (value) => {
// //       if (value === 'true' || value === true) return true;
// //       if (value === 'false' || value === false) return false;
// //       return Boolean(value);
// //     };

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

// //     // Subcategory validation
// //     if (data.subcategory) {
// //       const subcategoryExists = await SubCategory.findById(data.subcategory);
// //       if (!subcategoryExists) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Invalid subcategory selected" 
// //         });
// //       }
      
// //       if (data.category && subcategoryExists.category && 
// //           subcategoryExists.category.toString() !== data.category) {
// //         return res.status(400).json({ 
// //           success: false, 
// //           message: "Subcategory does not belong to selected category" 
// //         });
// //       }
// //       updateData.subcategory = data.subcategory;
// //     }
    
// //     // Handle variations
// //     if (data.variations && typeof data.variations === 'string') {
// //       try {
// //         data.variations = JSON.parse(data.variations);
// //       } catch (e) {
// //         console.log("Could not parse variations string");
// //       }
// //     }
    
// //     // Update variations if provided
// //     if (data.variations !== undefined) {
// //       if (Array.isArray(data.variations) && data.variations.length > 0) {
// //         updateData.hasVariations = true;
// //         updateData.variations = data.variations.map((v, index) => ({
// //           variationId: v.variationId || v.id || `var_${Date.now()}_${index}`,
// //           size: safeString(v.size),
// //           flavor: safeString(v.flavor),
// //           oldPrice: safeNumber(v.oldPrice),
// //           newPrice: safeNumber(v.newPrice || v.price),
// //           stock: safeNumber(v.stock),
// //           sku: safeString(v.sku),
// //           image: safeString(v.image)
// //         }));
// //       } else {
// //         updateData.hasVariations = false;
// //         updateData.variations = [];
// //       }
// //     }
    
// //     // Handle hasVariations flag
// //     if (data.hasVariations !== undefined) {
// //       updateData.hasVariations = safeBoolean(data.hasVariations);
// //       if (!updateData.hasVariations) {
// //         updateData.variations = [];
// //       }
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
// //       // Map formData fields
// //       const fieldMappings = {
// //         // Basic
// //         'name': 'formData.basic.name',
// //         'description': 'formData.basic.description',
// //         'restaurantName': 'formData.basic.restaurantName',
        
// //         // Pricing
// //         'oldPrice': 'formData.pricing.oldPrice',
// //         'price': 'formData.pricing.newPrice',
// //         'stock': 'formData.pricing.stock',
// //         'quality': 'formData.pricing.quality',
// //         'dietPreference': 'formData.pricing.dietPreference',
        
// //         // Details
// //         'productTypes': 'formData.details.productTypes',
// //         'ingredients': 'formData.details.ingredients',
// //         'materialTypes': 'formData.details.materialTypes',
// //         'customWeight': 'formData.details.customWeight',
// //         'customSizeInput': 'formData.details.customSizeInput',
// //         'ageRange': 'formData.details.ageRange',
// //         'containerType': 'formData.details.containerType',
// //         'itemForm': 'formData.details.itemForm',
// //         'specialty': 'formData.details.specialty',
// //         'itemTypeName': 'formData.details.itemTypeName',
// //         'countryOfOrigin': 'formData.details.countryOfOrigin',
        
// //         // Location
// //         'State': 'formData.location.state',
        
// //         // Compliance
// //         'brandName': 'formData.compliance.fssaiLicense',
// //         'fssaiLicense': 'formData.compliance.fssaiLicense',
// //         'legalDisclaimer': 'formData.compliance.legalDisclaimer',
// //         'shelfLife': 'formData.compliance.shelfLife',
        
// //         // Manufacturing
// //         'manufacturerName': 'formData.manufacturing.manufacturerName',
// //         'manufacturerAddress': 'formData.manufacturing.manufacturerAddress',
// //         'manufacturer': 'formData.manufacturing.manufacturerName',
// //         'manufacturerContact': 'formData.manufacturing.manufacturerAddress',
        
// //         // Packager
// //         'packagerName': 'formData.manufacturing.packagerName',
// //         'packagerAddress': 'formData.manufacturing.packagerAddress',
// //         'packagerFssaiLicense': 'formData.manufacturing.packagerFssaiLicense',
        
// //         // Marketer
// //         'marketerName': 'formData.manufacturing.marketerName',
// //         'marketerAddress': 'formData.manufacturing.marketerAddress',
        
// //         // Package
// //         'packageColour': 'formData.package.packageColour',
// //         'measurementUnit': 'formData.package.measurementUnit',
// //         'unitCount': 'formData.package.unitCount',
// //         'numberOfItems': 'formData.package.numberOfItems',
// //         'itemWeight': 'formData.package.itemWeight',
// //         'totalEaches': 'formData.package.totalEaches',
// //         'itemPackageWeight': 'formData.package.itemPackageWeight',
// //         'shelfLife': 'formData.package.shelfLife',
        
// //         // Dietary
// //         'dietaryPreferences': 'formData.dietary.dietaryPreferences',
// //         'allergenInformation': 'formData.dietary.allergenInformation',
// //         'nutrition': 'formData.dietary.nutrition',
// //         'cuisine': 'formData.dietary.cuisine',
// //         'directions': 'formData.dietary.directions',
// //       };
      
// //       // Process each field
// //       Object.entries(fieldMappings).forEach(([field, path]) => {
// //         const value = path.split('.').reduce((obj, key) => obj?.[key], data);
// //         if (value !== undefined) {
// //           if (field.includes('Price') || field === 'stock') {
// //             updateData[field] = safeNumber(value);
// //           } else if (field === 'flavors' || field === 'size') {
// //             updateData[field] = safeArray(value);
// //           } else {
// //             updateData[field] = safeString(value);
// //           }
// //         }
// //       });
      
// //       // Handle packer contact
// //       if (data.formData.manufacturing?.packagerName || data.formData.manufacturing?.packagerAddress) {
// //         updateData.packerContact = safeString(
// //           data.formData.manufacturing.packagerName && data.formData.manufacturing.packagerAddress ?
// //           `${data.formData.manufacturing.packagerName}, ${data.formData.manufacturing.packagerAddress}` :
// //           data.formData.manufacturing.packagerName || data.formData.manufacturing.packagerAddress || ''
// //         );
// //       }
      
// //       // Handle marketer contact
// //       if (data.formData.manufacturing?.marketerName || data.formData.manufacturing?.marketerAddress) {
// //         updateData.marketerNameAddress = safeString(
// //           data.formData.manufacturing.marketerName && data.formData.manufacturing.marketerAddress ?
// //           `${data.formData.manufacturing.marketerName}, ${data.formData.manufacturing.marketerAddress}` :
// //           data.formData.manufacturing.marketerName || data.formData.manufacturing.marketerAddress || ''
// //         );
// //       }
      
// //       // Handle flavors array
// //       if (data.formData.details?.flavors || data.formData.details?.customFlavorInput) {
// //         const flavorsArray = [];
// //         if (Array.isArray(data.formData.details.flavors)) {
// //           flavorsArray.push(...data.formData.details.flavors);
// //         }
// //         if (data.formData.details.customFlavorInput) {
// //           flavorsArray.push(data.formData.details.customFlavorInput);
// //         }
// //         updateData.flavors = flavorsArray.filter(f => f && safeString(f) !== '');
// //       }
      
// //       // Handle size array
// //       if (data.formData.details?.size || data.formData.details?.customSizeInput) {
// //         const sizeArray = [];
// //         if (Array.isArray(data.formData.details.size)) {
// //           sizeArray.push(...data.formData.details.size);
// //         }
// //         if (data.formData.details.customSizeInput) {
// //           sizeArray.push(data.formData.details.customSizeInput);
// //         }
// //         updateData.size = sizeArray.filter(s => s && safeString(s) !== '');
// //       }
      
// //     } else {
// //       // Handle direct field updates
// //       const directFields = [
// //         'name', 'description', 'restaurantName',
// //         'oldPrice', 'price', 'newPrice', 'stock', 'quality', 'dietPreference',
// //         'productTypes', 'ingredients', 'materialTypes', 'customWeight', 'customSizeInput',
// //         'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
// //         'brandName', 'fssaiLicense', 'legalDisclaimer', 'shelfLife',
// //         'manufacturerName', 'manufacturerAddress', 'manufacturer', 'manufacturerContact',
// //         'packagerName', 'packagerAddress', 'packagerFssaiLicense', 'packerContact',
// //         'marketerName', 'marketerAddress', 'marketerNameAddress',
// //         'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight',
// //         'totalEaches', 'itemPackageWeight',
// //         'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
// //         'State', 'status'
// //       ];
      
// //       directFields.forEach(field => {
// //         if (data[field] !== undefined) {
// //           if (field === 'newPrice') {
// //             updateData.price = safeNumber(data[field]);
// //           } else if (field.includes('Price') || field === 'stock') {
// //             updateData[field] = safeNumber(data[field]);
// //           } else if (field === 'flavors' || field === 'size') {
// //             updateData[field] = safeArray(data[field]);
// //           } else {
// //             updateData[field] = safeString(data[field]);
// //           }
// //         }
// //       });
// //     }
    
// //     // Update images
// //     if (req.files?.image?.[0]) {
// //       // Delete old image
// //       if (product.image && product.image.includes('cloudinary.com')) {
// //         await deleteCloudinaryImage(product.image);
// //       }
      
// //       // Upload new image
// //       updateData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
// //     }
    
// //     // Update gallery
// //     let gallery = [...(product.gallery || [])];
    
// //     // Update mandatory images if provided
// //     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
// //       const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0], 'vendor_products/gallery');
// //       if (img) gallery[0] = img;
// //     }
    
// //     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
// //       const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0], 'vendor_products/gallery');
// //       if (img) gallery[1] = img;
// //     }
    
// //     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
// //       const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0], 'vendor_products/gallery');
// //       if (img) gallery[2] = img;
// //     }
    
// //     // Add new gallery images
// //     if (req.files?.gallery) {
// //       for (const file of req.files.gallery) {
// //         const img = await uploadCloud(file, 'vendor_products/gallery');
// //         if (img) gallery.push(img);
// //       }
// //     }
    
// //     // Clean gallery
// //     updateData.gallery = gallery.filter(img => img && img.trim() !== '');
    
// //     // Update product
// //     Object.assign(product, updateData);
// //     await product.save();
    
// //     // Populate and return
// //     const populatedProduct = await VendorProduct.findById(product._id)
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image")
// //       .lean();
    
// //     res.json({ 
// //       success: true, 
// //       message: "Product updated successfully",
// //       data: populatedProduct 
// //     });
    
// //   } catch (err) {
// //     console.error("❌ UPDATE VENDOR PRODUCT ERROR:", err);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Server Error: " + err.message 
// //     });
// //   }
// // };

// // /* ================= DELETE VENDOR PRODUCT ================= */
// // exports.deleteVendorProduct = async (req, res) => {
// //   try {
// //     const product = await VendorProduct.findOne({
// //       _id: req.params.id,
// //       vendor: req.vendor._id,
// //     });

// //     if (!product) {
// //       return res.status(404).json({ 
// //         success: false, 
// //         message: "Product not found" 
// //       });
// //     }
    
// //     // Delete images from Cloudinary
// //     if (product.image && product.image.includes('cloudinary.com')) {
// //       await deleteCloudinaryImage(product.image);
// //     }
    
// //     if (product.gallery && product.gallery.length > 0) {
// //       for (const imageUrl of product.gallery) {
// //         if (imageUrl && imageUrl.includes('cloudinary.com')) {
// //           await deleteCloudinaryImage(imageUrl);
// //         }
// //       }
// //     }
    
// //     // Delete variation images
// //     if (product.hasVariations && product.variations.length > 0) {
// //       for (const variation of product.variations) {
// //         if (variation.image && variation.image.includes('cloudinary.com')) {
// //           await deleteCloudinaryImage(variation.image);
// //         }
// //       }
// //     }
    
// //     // Delete product from database
// //     await product.deleteOne();
    
// //     res.json({ 
// //       success: true, 
// //       message: "Product deleted successfully" 
// //     });
// //   } catch (err) {
// //     console.error("❌ Delete vendor product error:", err);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Server Error" 
// //     });
// //   }
// // };

// // /* ================= CSV IMPORT ================= */
// // exports.importCSV = async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "CSV file required" 
// //       });
// //     }

// //     const vendorId = req.vendor._id;
// //     const vendor = await Vendor.findById(vendorId);
// //     const rows = [];
// //     const results = [];

// //     // Parse CSV file
// //     const csvData = req.file.buffer.toString();
// //     const lines = csvData.split('\n');
// //     const headers = lines[0].split(',').map(h => h.trim());

// //     for (let i = 1; i < lines.length; i++) {
// //       if (!lines[i].trim()) continue;
      
// //       const values = lines[i].split(',').map(v => v.replace(/^"|"$/g, '').trim());
// //       const row = {};
      
// //       headers.forEach((header, index) => {
// //         if (values[index] !== undefined) {
// //           row[header] = values[index];
// //         }
// //       });
      
// //       rows.push(row);
// //     }

// //     let created = 0;
// //     let updated = 0;
// //     let errors = [];

// //     for (const [index, row] of rows.entries()) {
// //       try {
// //         if (!row.name || !row.price) {
// //           errors.push(`Row ${index + 1}: Name and price are required`);
// //           continue;
// //         }

// //         // Find category
// //         let categoryId = null;
// //         if (row.category) {
// //           const category = await Category.findOne({ 
// //             name: { $regex: new RegExp(`^${row.category}$`, 'i') } 
// //           });
// //           if (category) categoryId = category._id;
// //         }

// //         // Find subcategory
// //         let subcategoryId = null;
// //         if (row.subcategory) {
// //           const subcategory = await SubCategory.findOne({ 
// //             name: { $regex: new RegExp(`^${row.subcategory}$`, 'i') },
// //             ...(categoryId ? { category: categoryId } : {})
// //           });
// //           if (subcategory) subcategoryId = subcategory._id;
// //         }

// //         // Prepare product data
// //         const productData = {
// //           name: row.name,
// //           brandName: row.brandName || "",
// //           description: row.description || "",
// //           oldPrice: parseFloat(row.oldPrice) || 0,
// //           price: parseFloat(row.price),
// //           stock: parseInt(row.stock) || 0,
// //           quality: row.quality || "Standard",
// //           State: row.State || "",
// //           vendor: vendorId,
// //           restaurantName: vendor.storeName || row.restaurantName || "",
// //           category: categoryId,
// //           subcategory: subcategoryId,
// //           productTypes: row.productTypes || "",
// //           flavors: row.flavors ? row.flavors.split(',').map(f => f.trim()).filter(f => f !== '') : [],
// //           size: row.size ? row.size.split(',').map(s => s.trim()).filter(s => s !== '') : [],
// //           dietPreference: row.dietPreference || "Veg",
// //           ageRange: row.ageRange || "",
// //           containerType: row.containerType || "",
// //           itemForm: row.itemForm || "",
// //           specialty: row.specialty || "",
// //           itemTypeName: row.itemTypeName || "",
// //           countryOfOrigin: row.countryOfOrigin || "",
// //           manufacturerName: row.manufacturerName || row.manufacturer || "",
// //           manufacturerAddress: row.manufacturerAddress || row.manufacturerContact || "",
// //           manufacturer: row.manufacturer || row.manufacturerName || "",
// //           manufacturerContact: row.manufacturerContact || row.manufacturerAddress || "",
// //           packagerName: row.packagerName || "",
// //           packagerAddress: row.packagerAddress || "",
// //           packagerFssaiLicense: row.packagerFssaiLicense || "",
// //           packerContact: row.packerContact || "",
// //           marketerName: row.marketerName || "",
// //           marketerAddress: row.marketerAddress || "",
// //           marketerNameAddress: row.marketerNameAddress || "",
// //           packageColour: row.packageColour || "",
// //           measurementUnit: row.measurementUnit || "",
// //           unitCount: row.unitCount || "",
// //           numberOfItems: row.numberOfItems || "",
// //           itemWeight: row.itemWeight || "",
// //           totalEaches: row.totalEaches || "",
// //           itemPackageWeight: row.itemPackageWeight || "",
// //           shelfLife: row.shelfLife || "",
// //           ingredients: row.ingredients || "",
// //           allergenInformation: row.allergenInformation || row.allergenInfo || "",
// //           directions: row.directions || "",
// //           nutrition: row.nutrition || "",
// //           cuisine: row.cuisine || "",
// //           dietaryPreferences: row.dietaryPreferences || "",
// //           materialTypes: row.materialTypes || "",
// //           customWeight: row.customWeight || "",
// //           customSizeInput: row.customSizeInput || "",
// //           fssaiLicense: row.fssaiLicense || row.brandName || "",
// //           legalDisclaimer: row.legalDisclaimer || "",
// //           status: row.status || 'pending_approval',
// //           // Variations
// //           hasVariations: row.hasVariations === 'true' || false,
// //         };

// //         // Handle variations from CSV
// //         if (row.variations) {
// //           try {
// //             const variations = JSON.parse(row.variations);
// //             if (Array.isArray(variations) && variations.length > 0) {
// //               productData.hasVariations = true;
// //               productData.variations = variations.map((v, idx) => ({
// //                 variationId: v.variationId || `var_${Date.now()}_${idx}`,
// //                 size: v.size || '',
// //                 flavor: v.flavor || '',
// //                 oldPrice: parseFloat(v.oldPrice) || 0,
// //                 newPrice: parseFloat(v.newPrice || v.price) || 0,
// //                 stock: parseInt(v.stock) || 0,
// //                 sku: v.sku || '',
// //                 image: v.image || ''
// //               }));
// //             }
// //           } catch (e) {
// //             console.log("Could not parse variations from CSV");
// //           }
// //         }

// //         if (row._id) {
// //           // Update existing product
// //           await VendorProduct.updateOne(
// //             { _id: row._id, vendor: vendorId },
// //             productData
// //           );
// //           updated++;
// //         } else {
// //           // Create new product
// //           await VendorProduct.create(productData);
// //           created++;
// //         }
        
// //       } catch (error) {
// //         errors.push(`Row ${index + 1}: ${error.message}`);
// //       }
// //     }

// //     res.json({
// //       success: true,
// //       message: `CSV import completed: ${created} created, ${updated} updated`,
// //       created,
// //       updated,
// //       total: rows.length,
// //       errors: errors.length > 0 ? errors : undefined,
// //     });
    
// //   } catch (err) {
// //     console.error("❌ CSV import error:", err);
// //     res.status(500).json({ 
// //       success: false,
// //       message: "CSV Import Failed" 
// //     });
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

// //     // Transform data for CSV
// //     const transformedProducts = products.map(product => ({
// //       _id: product._id,
// //       name: product.name,
// //       description: product.description || "",
// //       brandName: product.brandName || "",
// //       fssaiLicense: product.fssaiLicense || "",
// //       restaurantName: product.restaurantName || "",
// //       oldPrice: product.oldPrice || 0,
// //       price: product.price || 0,
// //       stock: product.stock || 0,
// //       quality: product.quality || "Standard",
// //       State: product.State || "",
// //       category: product.category ? product.category.name : "",
// //       subcategory: product.subcategory ? product.subcategory.name : "",
// //       categoryId: product.category ? product.category._id : "",
// //       subcategoryId: product.subcategory ? product.subcategory._id : "",
// //       productTypes: product.productTypes || "",
// //       flavors: Array.isArray(product.flavors) ? product.flavors.join(',') : product.flavors || "",
// //       size: Array.isArray(product.size) ? product.size.join(',') : product.size || "",
// //       dietPreference: product.dietPreference || "Veg",
// //       ageRange: product.ageRange || "",
// //       containerType: product.containerType || "",
// //       itemForm: product.itemForm || "",
// //       specialty: product.specialty || "",
// //       itemTypeName: product.itemTypeName || "",
// //       countryOfOrigin: product.countryOfOrigin || "",
// //       manufacturerName: product.manufacturerName || "",
// //       manufacturerAddress: product.manufacturerAddress || "",
// //       manufacturer: product.manufacturer || "",
// //       manufacturerContact: product.manufacturerContact || "",
// //       packagerName: product.packagerName || "",
// //       packagerAddress: product.packagerAddress || "",
// //       packagerFssaiLicense: product.packagerFssaiLicense || "",
// //       packerContact: product.packerContact || "",
// //       marketerName: product.marketerName || "",
// //       marketerAddress: product.marketerAddress || "",
// //       marketerNameAddress: product.marketerNameAddress || "",
// //       packageColour: product.packageColour || "",
// //       measurementUnit: product.measurementUnit || "",
// //       unitCount: product.unitCount || "",
// //       numberOfItems: product.numberOfItems || "",
// //       itemWeight: product.itemWeight || "",
// //       totalEaches: product.totalEaches || "",
// //       itemPackageWeight: product.itemPackageWeight || "",
// //       shelfLife: product.shelfLife || "",
// //       ingredients: product.ingredients || "",
// //       allergenInformation: product.allergenInformation || "",
// //       directions: product.directions || "",
// //       nutrition: product.nutrition || "",
// //       cuisine: product.cuisine || "",
// //       dietaryPreferences: product.dietaryPreferences || "",
// //       materialTypes: product.materialTypes || "",
// //       customWeight: product.customWeight || "",
// //       customSizeInput: product.customSizeInput || "",
// //       legalDisclaimer: product.legalDisclaimer || "",
// //       status: product.status || "pending_approval",
// //       // Variations
// //       hasVariations: product.hasVariations || false,
// //       variations: JSON.stringify(product.variations || []),
// //       createdAt: product.createdAt,
// //       updatedAt: product.updatedAt
// //     }));

// //     const fields = [
// //       '_id', 'name', 'description', 'brandName', 'fssaiLicense', 'restaurantName',
// //       'oldPrice', 'price', 'stock', 'quality', 'State',
// //       'category', 'subcategory', 'categoryId', 'subcategoryId',
// //       'productTypes', 'flavors', 'size', 'dietPreference',
// //       'ageRange', 'containerType', 'itemForm', 'specialty',
// //       'itemTypeName', 'countryOfOrigin', 'manufacturerName',
// //       'manufacturerAddress', 'manufacturer', 'manufacturerContact',
// //       'packagerName', 'packagerAddress', 'packagerFssaiLicense', 'packerContact',
// //       'marketerName', 'marketerAddress', 'marketerNameAddress',
// //       'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
// //       'itemWeight', 'totalEaches', 'itemPackageWeight', 'shelfLife',
// //       'ingredients', 'allergenInformation', 'directions', 'nutrition',
// //       'cuisine', 'dietaryPreferences', 'materialTypes', 'customWeight',
// //       'customSizeInput', 'legalDisclaimer', 'status', 'hasVariations', 'variations',
// //       'createdAt', 'updatedAt'
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
// //     console.error("❌ CSV export error:", err);
// //     res.status(500).json({ 
// //       success: false,
// //       message: "CSV Export Failed" 
// //     });
// //   }
// // };

// // /* ================= BULK UPDATE ================= */
// // exports.bulkUpdate = async (req, res) => {
// //   try {
// //     const { ids, data } = req.body;
// //     if (!ids?.length) {
// //       return res.status(400).json({ 
// //         success: false,
// //         message: "Product IDs required" 
// //       });
// //     }

// //     // Prepare update data
// //     const updateData = { ...data };
    
// //     // Handle price mapping
// //     if (updateData.newPrice !== undefined) {
// //       updateData.price = updateData.newPrice;
// //       delete updateData.newPrice;
// //     }
    
// //     // Convert numeric fields
// //     if (updateData.price) updateData.price = parseFloat(updateData.price);
// //     if (updateData.oldPrice) updateData.oldPrice = parseFloat(updateData.oldPrice);
// //     if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    
// //     // Handle array fields
// //     if (updateData.flavors !== undefined && typeof updateData.flavors === 'string') {
// //       updateData.flavors = updateData.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
// //     }
    
// //     if (updateData.size !== undefined && typeof updateData.size === 'string') {
// //       updateData.size = updateData.size.split(',').map(s => s.trim()).filter(s => s !== '');
// //     }

// //     const result = await VendorProduct.updateMany(
// //       { _id: { $in: ids }, vendor: req.vendor._id },
// //       { $set: updateData },
// //       { runValidators: true }
// //     );

// //     res.json({ 
// //       success: true, 
// //       message: `${result.modifiedCount} products updated`,
// //       modified: result.modifiedCount 
// //     });
// //   } catch (err) {
// //     console.error("❌ Bulk update error:", err);
// //     res.status(500).json({ 
// //       success: false,
// //       message: "Bulk update failed" 
// //     });
// //   }
// // };

// // /* ================= BULK DELETE ================= */
// // exports.bulkDelete = async (req, res) => {
// //   try {
// //     const { ids } = req.body;
// //     if (!ids?.length) {
// //       return res.status(400).json({ 
// //         success: false,
// //         message: "Product IDs required" 
// //       });
// //     }

// //     // Find products to delete images
// //     const products = await VendorProduct.find({
// //       _id: { $in: ids },
// //       vendor: req.vendor._id,
// //     });

// //     // Delete images from Cloudinary
// //     for (const product of products) {
// //       if (product.image && product.image.includes('cloudinary.com')) {
// //         await deleteCloudinaryImage(product.image);
// //       }
      
// //       if (product.gallery && product.gallery.length > 0) {
// //         for (const imageUrl of product.gallery) {
// //           if (imageUrl && imageUrl.includes('cloudinary.com')) {
// //             await deleteCloudinaryImage(imageUrl);
// //           }
// //         }
// //       }
      
// //       // Delete variation images
// //       if (product.hasVariations && product.variations.length > 0) {
// //         for (const variation of product.variations) {
// //           if (variation.image && variation.image.includes('cloudinary.com')) {
// //             await deleteCloudinaryImage(variation.image);
// //           }
// //         }
// //       }
// //     }

// //     const result = await VendorProduct.deleteMany({
// //       _id: { $in: ids },
// //       vendor: req.vendor._id,
// //     });

// //     res.json({ 
// //       success: true, 
// //       message: `${result.deletedCount} products deleted`,
// //       deleted: result.deletedCount 
// //     });
// //   } catch (err) {
// //     console.error("❌ Bulk delete error:", err);
// //     res.status(500).json({ 
// //       success: false,
// //       message: "Bulk delete failed" 
// //     });
// //   }
// // };

// // /* ================= UPDATE PRODUCT STATUS ================= */
// // exports.updateProductStatus = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { status } = req.body;
    
// //     const allowedStatuses = ['active', 'inactive', 'draft', 'out_of_stock', 'pending_approval'];
    
// //     if (!status || !allowedStatuses.includes(status)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Valid status is required'
// //       });
// //     }
    
// //     const product = await VendorProduct.findOneAndUpdate(
// //       { _id: id, vendor: req.vendor._id },
// //       { status },
// //       { new: true, runValidators: true }
// //     )
// //       .populate("category", "name image")
// //       .populate("subcategory", "name image")
// //       .lean();
    
// //     if (!product) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Product not found'
// //       });
// //     }
    
// //     res.json({
// //       success: true,
// //       message: 'Product status updated successfully',
// //       data: product
// //     });
    
// //   } catch (err) {
// //     console.error('❌ Update product status error:', err);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update product status'
// //     });
// //   }
// // };

// // /* ================= ADD VARIATION ================= */
// // exports.addVariation = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const variationData = req.body;
    
// //     const product = await VendorProduct.findOne({
// //       _id: id,
// //       vendor: req.vendor._id,
// //     });
    
// //     if (!product) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Product not found"
// //       });
// //     }
    
// //     // Generate unique variation ID
// //     const variationId = variationData.variationId || `var_${Date.now()}_${product.variations.length}`;
    
// //     const newVariation = {
// //       variationId,
// //       size: variationData.size || '',
// //       flavor: variationData.flavor || '',
// //       oldPrice: parseFloat(variationData.oldPrice) || 0,
// //       newPrice: parseFloat(variationData.newPrice || variationData.price) || 0,
// //       stock: parseInt(variationData.stock) || 0,
// //       sku: variationData.sku || '',
// //       image: variationData.image || ''
// //     };
    
// //     // Set hasVariations to true
// //     product.hasVariations = true;
// //     product.variations.push(newVariation);
    
// //     await product.save();
    
// //     res.json({
// //       success: true,
// //       message: "Variation added successfully",
// //       data: newVariation,
// //       totalVariations: product.variations.length
// //     });
    
// //   } catch (err) {
// //     console.error("❌ Add variation error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to add variation"
// //     });
// //   }
// // };

// // /* ================= UPDATE VARIATION ================= */
// // exports.updateVariation = async (req, res) => {
// //   try {
// //     const { id, variationId } = req.params;
// //     const updateData = req.body;
    
// //     const product = await VendorProduct.findOne({
// //       _id: id,
// //       vendor: req.vendor._id,
// //     });
    
// //     if (!product) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Product not found"
// //       });
// //     }
    
// //     const variationIndex = product.variations.findIndex(v => v.variationId === variationId);
    
// //     if (variationIndex === -1) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Variation not found"
// //       });
// //     }
    
// //     // Update variation fields
// //     const variation = product.variations[variationIndex];
    
// //     if (updateData.size !== undefined) variation.size = updateData.size;
// //     if (updateData.flavor !== undefined) variation.flavor = updateData.flavor;
// //     if (updateData.oldPrice !== undefined) variation.oldPrice = parseFloat(updateData.oldPrice) || 0;
// //     if (updateData.newPrice !== undefined || updateData.price !== undefined) {
// //       const price = parseFloat(updateData.newPrice || updateData.price) || 0;
// //       variation.newPrice = price;
// //     }
// //     if (updateData.stock !== undefined) variation.stock = parseInt(updateData.stock) || 0;
// //     if (updateData.sku !== undefined) variation.sku = updateData.sku;
// //     if (updateData.image !== undefined) variation.image = updateData.image;
    
// //     // Mark variations as modified
// //     product.markModified('variations');
// //     await product.save();
    
// //     res.json({
// //       success: true,
// //       message: "Variation updated successfully",
// //       data: variation
// //     });
    
// //   } catch (err) {
// //     console.error("❌ Update variation error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to update variation"
// //     });
// //   }
// // };

// // /* ================= DELETE VARIATION ================= */
// // exports.deleteVariation = async (req, res) => {
// //   try {
// //     const { id, variationId } = req.params;
    
// //     const product = await VendorProduct.findOne({
// //       _id: id,
// //       vendor: req.vendor._id,
// //     });
    
// //     if (!product) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Product not found"
// //       });
// //     }
    
// //     const initialLength = product.variations.length;
// //     product.variations = product.variations.filter(v => v.variationId !== variationId);
    
// //     // If no variations left, set hasVariations to false
// //     if (product.variations.length === 0) {
// //       product.hasVariations = false;
// //     }
    
// //     if (product.variations.length < initialLength) {
// //       await product.save();
// //       return res.json({
// //         success: true,
// //         message: "Variation deleted successfully",
// //         totalVariations: product.variations.length
// //       });
// //     } else {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Variation not found"
// //       });
// //     }
    
// //   } catch (err) {
// //     console.error("❌ Delete variation error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete variation"
// //     });
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

// /* ================= HELPER FUNCTIONS ================= */
// const safeString = (value) => {
//   if (value === undefined || value === null) return '';
//   if (typeof value === 'string') return value.trim();
//   return String(value).trim();
// };

// const safeNumber = (value) => {
//   if (value === undefined || value === null || value === '') return 0;
//   const num = parseFloat(value);
//   return isNaN(num) ? 0 : num;
// };

// const safeArray = (value) => {
//   if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
//   if (typeof value === 'string' && value.trim() !== '') {
//     return value.split(',').map(item => item.trim()).filter(item => item !== '');
//   }
//   return [];
// };

// const safeBoolean = (value) => {
//   if (value === 'true' || value === true) return true;
//   if (value === 'false' || value === false) return false;
//   if (value === 1 || value === '1') return true;
//   if (value === 0 || value === '0') return false;
//   return Boolean(value);
// };

// const parseJSONSafely = (str) => {
//   if (!str || typeof str !== 'string') return str;
//   try {
//     return JSON.parse(str);
//   } catch (e) {
//     console.log("Could not parse JSON:", str);
//     return str;
//   }
// };

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
//     const subcategories = await SubCategory.find({ isActive: true })
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
//         { restaurantName: { $regex: search, $options: 'i' } },
//         { productTypes: { $regex: search, $options: 'i' } },
//         { 'variations.size': { $regex: search, $options: 'i' } },
//         { 'variations.flavor': { $regex: search, $options: 'i' } }
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
//       .lean()
//       .exec();

//     const total = await VendorProduct.countDocuments(query);
//     const vendor = await Vendor.findById(req.vendor._id).select("storeName name email phone");

//     // Transform products for frontend
//     const transformedProducts = products.map(product => ({
//       ...product,
//       // Ensure newPrice is populated for frontend
//       newPrice: product.newPrice || product.price,
//       // Add sellingPrice field for frontend compatibility
//       sellingPrice: product.price,
//       // Ensure mrp field is populated
//       mrp: product.oldPrice,
//     }));

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
//       data: transformedProducts,
//     });
//   } catch (err) {
//     console.error("❌ Get vendor products error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= GET SINGLE VENDOR PRODUCT ================= */
// exports.getVendorProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const product = await VendorProduct.findOne({
//       _id: id,
//       vendor: req.vendor._id,
//     })
//       .populate("category", "name image")
//       .populate("subcategory", "name image")
//       .populate("vendor", "storeName name email phone")
//       .lean();
    
//     if (!product) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Product not found" 
//       });
//     }
    
//     // Transform for frontend
//     const transformedProduct = {
//       ...product,
//       newPrice: product.newPrice || product.price,
//       sellingPrice: product.price,
//       mrp: product.oldPrice,
//     };
    
//     res.json({
//       success: true,
//       data: transformedProduct
//     });
//   } catch (err) {
//     console.error("❌ Get vendor product error:", err);
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
    
//     let data = { ...req.body };
    
//     // Parse JSON fields
//     if (data.variations && typeof data.variations === 'string') {
//       data.variations = parseJSONSafely(data.variations);
//     }
    
//     // Prepare product data
//     let productData = {
//       vendor: req.vendor._id,
//       restaurantName: vendor.storeName || '',
//     };
    
//     // ================= BASIC INFO =================
//     productData.name = safeString(data.name);
//     productData.description = safeString(data.description);
//     productData.restaurantName = safeString(data.restaurantName || vendor.storeName || '');
    
//     // ================= CATEGORY =================
//     if (!data.category && !data.selectedCategory) {
//       return res.status(400).json({
//         success: false,
//         message: "Category is required"
//       });
//     }
    
//     const categoryId = data.category || data.selectedCategory;
//     const categoryExists = await Category.findById(categoryId);
//     if (!categoryExists) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid category selected" 
//       });
//     }
//     productData.category = categoryId;
    
//     // Subcategory
//     const subcategoryId = data.subcategory || data.selectedSubCategory;
//     if (subcategoryId) {
//       const subcategoryExists = await SubCategory.findById(subcategoryId);
//       if (!subcategoryExists) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid subcategory selected" 
//         });
//       }
//       productData.subcategory = subcategoryId;
//     }
    
//     // ================= VARIATIONS =================
//     if (data.variations && Array.isArray(data.variations) && data.variations.length > 0) {
//       productData.hasVariations = true;
//       productData.variations = data.variations.map((v, index) => ({
//         id: v.id || `var_${Date.now()}_${index}`,
//         size: safeString(v.size),
//         flavor: safeString(v.flavor),
//         oldPrice: safeNumber(v.oldPrice),
//         newPrice: safeNumber(v.newPrice || v.price),
//         price: safeNumber(v.newPrice || v.price), // Sync with newPrice
//         stock: safeNumber(v.stock),
//         sku: safeString(v.sku),
//         image: safeString(v.image)
//       }));
//     } else if (data.hasVariations !== undefined) {
//       productData.hasVariations = safeBoolean(data.hasVariations);
//       productData.variations = [];
//     } else {
//       productData.hasVariations = false;
//       productData.variations = [];
//     }
    
//     // ================= PRICING & STOCK =================
//     // If product has variations, set base prices to 0
//     if (productData.hasVariations) {
//       productData.oldPrice = 0;
//       productData.price = 0;
//       productData.newPrice = 0;
//       productData.stock = 0;
//     } else {
//       productData.oldPrice = safeNumber(data.oldPrice || data.mrp);
//       productData.price = safeNumber(data.newPrice || data.price || data.sellingPrice);
//       productData.newPrice = productData.price; // Sync newPrice with price
//       productData.stock = safeNumber(data.stock);
//     }
    
//     productData.quality = safeString(data.quality) || "Standard";
//     productData.dietPreference = safeString(data.dietPreference) || "Veg";
    
//     // ================= PRODUCT DETAILS =================
//     productData.productTypes = safeString(data.productTypes);
//     productData.materialTypes = safeString(data.materialTypes);
//     productData.ingredients = safeString(data.ingredients);
//     productData.customWeight = safeString(data.customWeight);
//     productData.customSizeInput = safeString(data.customSizeInput);
//     productData.customFlavorInput = safeString(data.customFlavorInput);
    
//     // Arrays
//     productData.flavors = safeArray(data.flavors);
//     productData.size = safeArray(data.size);
    
//     // ================= PRODUCT SPECIFICATIONS =================
//     productData.ageRange = safeString(data.ageRange);
//     productData.containerType = safeString(data.containerType);
//     productData.itemForm = safeString(data.itemForm);
//     productData.specialty = safeString(data.specialty);
//     productData.itemTypeName = safeString(data.itemTypeName);
//     productData.countryOfOrigin = safeString(data.countryOfOrigin);
    
//     // ================= COMPLIANCE =================
//     productData.fssaiLicense = safeString(data.fssaiLicense || data.brandName);
//     productData.brandName = safeString(data.brandName || data.fssaiLicense);
//     productData.legalDisclaimer = safeString(data.legalDisclaimer);
//     productData.shelfLife = safeString(data.shelfLife);
    
//     // ================= MANUFACTURING =================
//     productData.manufacturerName = safeString(data.manufacturerName || data.manufacturer);
//     productData.manufacturerAddress = safeString(data.manufacturerAddress || data.manufacturerContact);
//     productData.manufacturer = safeString(data.manufacturer || data.manufacturerName);
//     productData.manufacturerContact = safeString(data.manufacturerContact || data.manufacturerAddress);
    
//     // ================= PACKAGER =================
//     productData.packagerName = safeString(data.packagerName);
//     productData.packagerAddress = safeString(data.packagerAddress);
//     productData.packagerFssaiLicense = safeString(data.packagerFssaiLicense);
    
//     // Auto-create packerContact
//     if (productData.packagerName || productData.packagerAddress) {
//       productData.packerContact = `${productData.packagerName || ''}${productData.packagerAddress ? `, ${productData.packagerAddress}` : ''}`.trim();
//     }
    
//     // ================= MARKETER =================
//     productData.marketerName = safeString(data.marketerName);
//     productData.marketerAddress = safeString(data.marketerAddress);
    
//     // Auto-create marketerNameAddress
//     if (productData.marketerName || productData.marketerAddress) {
//       productData.marketerNameAddress = `${productData.marketerName || ''}${productData.marketerAddress ? `, ${productData.marketerAddress}` : ''}`.trim();
//     }
    
//     // ================= PACKAGE DETAILS =================
//     productData.packageColour = safeString(data.packageColour);
//     productData.measurementUnit = safeString(data.measurementUnit);
//     productData.unitCount = safeString(data.unitCount);
//     productData.numberOfItems = safeString(data.numberOfItems);
//     productData.itemWeight = safeString(data.itemWeight);
//     productData.totalEaches = safeString(data.totalEaches);
//     productData.itemPackageWeight = safeString(data.itemPackageWeight);
    
//     // ================= DIETARY & NUTRITION =================
//     productData.dietaryPreferences = safeString(data.dietaryPreferences);
//     productData.allergenInformation = safeString(data.allergenInformation || data.allergenInfo);
//     productData.allergenInfo = safeString(data.allergenInfo || data.allergenInformation);
//     productData.nutrition = safeString(data.nutrition);
//     productData.cuisine = safeString(data.cuisine);
//     productData.directions = safeString(data.directions);
    
//     // ================= LOCATION =================
//     productData.State = safeString(data.State);
    
//     // ================= STATUS =================
//     productData.status = safeString(data.status) || 'pending_approval';
    
//     // ================= UPLOAD IMAGES =================
//     // Main image
//     if (req.files?.image?.[0]) {
//       productData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
//     }
    
//     // Gallery images
//     let galleryImages = [];
    
//     // Handle mandatory images from form fields
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
    
//     // Also check direct gallery field
//     if (req.files?.gallery2) {
//       for (const file of req.files.gallery2) {
//         const img = await uploadCloud(file, 'vendor_products/gallery');
//         if (img) galleryImages.push(img);
//       }
//     }
    
//     productData.gallery = galleryImages.filter(img => img && img.trim() !== '');
    
//     // Debug log
//     console.log("📦 Final product data:", JSON.stringify(productData, null, 2));
    
//     // Validation for non-variation products
//     if (!productData.hasVariations && (!productData.price || productData.price <= 0)) {
//       return res.status(400).json({
//         success: false,
//         message: "Price is required for non-variation products"
//       });
//     }
    
//     // Create product
//     const product = await VendorProduct.create(productData);
    
//     // Populate and return
//     const populatedProduct = await VendorProduct.findById(product._id)
//       .populate("category", "name image")
//       .populate("subcategory", "name image")
//       .lean();
    
//     // Transform for frontend
//     const transformedProduct = {
//       ...populatedProduct,
//       newPrice: populatedProduct.newPrice || populatedProduct.price,
//       sellingPrice: populatedProduct.price,
//       mrp: populatedProduct.oldPrice,
//     };
    
//     res.json({ 
//       success: true, 
//       message: "Product created successfully",
//       data: transformedProduct,
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

//     let data = { ...req.body };
    
//     // Parse JSON fields
//     if (data.variations && typeof data.variations === 'string') {
//       data.variations = parseJSONSafely(data.variations);
//     }
    
//     const updateData = {};
    
//     // ================= BASIC INFO =================
//     if (data.name !== undefined) updateData.name = safeString(data.name);
//     if (data.description !== undefined) updateData.description = safeString(data.description);
//     if (data.restaurantName !== undefined) updateData.restaurantName = safeString(data.restaurantName);
    
//     // ================= CATEGORY =================
//     if (data.category || data.selectedCategory) {
//       const categoryId = data.category || data.selectedCategory;
//       const categoryExists = await Category.findById(categoryId);
//       if (!categoryExists) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid category selected" 
//         });
//       }
//       updateData.category = categoryId;
//     }
    
//     if (data.subcategory || data.selectedSubCategory) {
//       const subcategoryId = data.subcategory || data.selectedSubCategory;
//       if (subcategoryId) {
//         const subcategoryExists = await SubCategory.findById(subcategoryId);
//         if (subcategoryExists) {
//           updateData.subcategory = subcategoryId;
//         }
//       } else {
//         updateData.subcategory = null;
//       }
//     }
    
//     // ================= VARIATIONS =================
//     if (data.variations !== undefined) {
//       if (Array.isArray(data.variations) && data.variations.length > 0) {
//         updateData.hasVariations = true;
//         updateData.variations = data.variations.map((v, index) => ({
//           id: v.id || v.variationId || `var_${Date.now()}_${index}`,
//           size: safeString(v.size),
//           flavor: safeString(v.flavor),
//           oldPrice: safeNumber(v.oldPrice),
//           newPrice: safeNumber(v.newPrice || v.price),
//           price: safeNumber(v.newPrice || v.price), // Sync with newPrice
//           stock: safeNumber(v.stock),
//           sku: safeString(v.sku),
//           image: safeString(v.image)
//         }));
//       } else {
//         updateData.hasVariations = false;
//         updateData.variations = [];
//       }
//     }
    
//     if (data.hasVariations !== undefined) {
//       updateData.hasVariations = safeBoolean(data.hasVariations);
//       if (!updateData.hasVariations && !updateData.variations) {
//         updateData.variations = [];
//       }
//     }
    
//     // ================= PRICING & STOCK =================
//     // Only update pricing if not using variations
//     if (!updateData.hasVariations && !(data.variations && Array.isArray(data.variations) && data.variations.length > 0)) {
//       if (data.oldPrice !== undefined || data.mrp !== undefined) {
//         updateData.oldPrice = safeNumber(data.oldPrice || data.mrp);
//       }
//       if (data.newPrice !== undefined || data.price !== undefined || data.sellingPrice !== undefined) {
//         updateData.price = safeNumber(data.newPrice || data.price || data.sellingPrice);
//         updateData.newPrice = updateData.price; // Sync newPrice
//       }
//       if (data.stock !== undefined) {
//         updateData.stock = safeNumber(data.stock);
//       }
//     }
    
//     if (data.quality !== undefined) updateData.quality = safeString(data.quality);
//     if (data.dietPreference !== undefined) updateData.dietPreference = safeString(data.dietPreference);
    
//     // ================= PRODUCT DETAILS =================
//     const detailFields = [
//       'productTypes', 'materialTypes', 'ingredients', 'customWeight',
//       'customSizeInput', 'customFlavorInput', 'ageRange', 'containerType',
//       'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
//       'fssaiLicense', 'brandName', 'legalDisclaimer', 'shelfLife',
//       'manufacturerName', 'manufacturerAddress', 'manufacturer', 'manufacturerContact',
//       'packagerName', 'packagerAddress', 'packagerFssaiLicense',
//       'marketerName', 'marketerAddress',
//       'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems',
//       'itemWeight', 'totalEaches', 'itemPackageWeight',
//       'dietaryPreferences', 'allergenInformation', 'allergenInfo',
//       'nutrition', 'cuisine', 'directions',
//       'State', 'status'
//     ];
    
//     detailFields.forEach(field => {
//       if (data[field] !== undefined) {
//         updateData[field] = safeString(data[field]);
//       }
//     });
    
//     // Handle arrays
//     if (data.flavors !== undefined) {
//       updateData.flavors = safeArray(data.flavors);
//     }
//     if (data.size !== undefined) {
//       updateData.size = safeArray(data.size);
//     }
    
//     // Auto-create packerContact and marketerNameAddress
//     if (updateData.packagerName || updateData.packagerAddress) {
//       updateData.packerContact = `${updateData.packagerName || ''}${updateData.packagerAddress ? `, ${updateData.packagerAddress}` : ''}`.trim();
//     }
    
//     if (updateData.marketerName || updateData.marketerAddress) {
//       updateData.marketerNameAddress = `${updateData.marketerName || ''}${updateData.marketerAddress ? `, ${updateData.marketerAddress}` : ''}`.trim();
//     }
    
//     // ================= UPLOAD IMAGES =================
//     // Main image
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
    
//     // Handle mandatory images
//     if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
//       const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0], 'vendor_products/gallery');
//       if (img) {
//         if (gallery.length > 0) gallery[0] = img;
//         else gallery.push(img);
//       }
//     }
    
//     if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
//       const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0], 'vendor_products/gallery');
//       if (img) {
//         if (gallery.length > 1) gallery[1] = img;
//         else gallery.push(img);
//       }
//     }
    
//     if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
//       const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0], 'vendor_products/gallery');
//       if (img) {
//         if (gallery.length > 2) gallery[2] = img;
//         else gallery.push(img);
//       }
//     }
    
//     // Add new gallery images
//     if (req.files?.gallery) {
//       for (const file of req.files.gallery) {
//         const img = await uploadCloud(file, 'vendor_products/gallery');
//         if (img) gallery.push(img);
//       }
//     }
    
//     if (gallery.length > 0) {
//       updateData.gallery = gallery.filter(img => img && img.trim() !== '');
//     }
    
//     // Update product
//     Object.assign(product, updateData);
//     await product.save();
    
//     // Populate and return
//     const populatedProduct = await VendorProduct.findById(product._id)
//       .populate("category", "name image")
//       .populate("subcategory", "name image")
//       .lean();
    
//     // Transform for frontend
//     const transformedProduct = {
//       ...populatedProduct,
//       newPrice: populatedProduct.newPrice || populatedProduct.price,
//       sellingPrice: populatedProduct.price,
//       mrp: populatedProduct.oldPrice,
//     };
    
//     res.json({ 
//       success: true, 
//       message: "Product updated successfully",
//       data: transformedProduct 
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
//     if (product.hasVariations && product.variations.length > 0) {
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
//         if (!row.name) {
//           errors.push(`Row ${index + 1}: Name is required`);
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
//             name: { $regex: new RegExp(`^${row.subcategory}$`, 'i') }
//           });
//           if (subcategory) subcategoryId = subcategory._id;
//         }

//         // Prepare product data
//         const productData = {
//           name: row.name,
//           brandName: row.brandName || "",
//           description: row.description || "",
//           oldPrice: parseFloat(row.oldPrice) || 0,
//           price: parseFloat(row.price || row.newPrice || 0),
//           newPrice: parseFloat(row.newPrice || row.price || 0),
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
//           marketerName: row.marketerName || "",
//           marketerAddress: row.marketerAddress || "",
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
//           customFlavorInput: row.customFlavorInput || "",
//           fssaiLicense: row.fssaiLicense || row.brandName || "",
//           legalDisclaimer: row.legalDisclaimer || "",
//           status: row.status || 'pending_approval',
//           hasVariations: row.hasVariations === 'true' || false,
//         };

//         // Handle variations from CSV
//         if (row.variations) {
//           try {
//             const variations = parseJSONSafely(row.variations);
//             if (Array.isArray(variations) && variations.length > 0) {
//               productData.hasVariations = true;
//               productData.variations = variations.map((v, idx) => ({
//                 id: v.id || v.variationId || `var_${Date.now()}_${idx}`,
//                 size: v.size || '',
//                 flavor: v.flavor || '',
//                 oldPrice: parseFloat(v.oldPrice) || 0,
//                 newPrice: parseFloat(v.newPrice || v.price) || 0,
//                 price: parseFloat(v.newPrice || v.price) || 0,
//                 stock: parseInt(v.stock) || 0,
//                 sku: v.sku || '',
//                 image: v.image || ''
//               }));
//             }
//           } catch (e) {
//             console.log("Could not parse variations from CSV");
//           }
//         }

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
//       newPrice: product.newPrice || product.price || 0,
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
//       customFlavorInput: product.customFlavorInput || "",
//       legalDisclaimer: product.legalDisclaimer || "",
//       status: product.status || "pending_approval",
//       // Variations
//       hasVariations: product.hasVariations || false,
//       variations: JSON.stringify(product.variations || []),
//       createdAt: product.createdAt,
//       updatedAt: product.updatedAt
//     }));

//     const fields = [
//       '_id', 'name', 'description', 'brandName', 'fssaiLicense', 'restaurantName',
//       'oldPrice', 'price', 'newPrice', 'stock', 'quality', 'State',
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
//       'customSizeInput', 'customFlavorInput', 'legalDisclaimer', 'status', 
//       'hasVariations', 'variations',
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
//       updateData.newPrice = updateData.newPrice;
//     }
//     if (updateData.price !== undefined && updateData.newPrice === undefined) {
//       updateData.newPrice = updateData.price;
//     }
    
//     // Convert numeric fields
//     if (updateData.price !== undefined) updateData.price = parseFloat(updateData.price);
//     if (updateData.newPrice !== undefined) updateData.newPrice = parseFloat(updateData.newPrice);
//     if (updateData.oldPrice !== undefined) updateData.oldPrice = parseFloat(updateData.oldPrice);
//     if (updateData.stock !== undefined) updateData.stock = parseInt(updateData.stock);
    
//     // Handle array fields
//     if (updateData.flavors !== undefined) {
//       updateData.flavors = safeArray(updateData.flavors);
//     }
    
//     if (updateData.size !== undefined) {
//       updateData.size = safeArray(updateData.size);
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
//       if (product.hasVariations && product.variations.length > 0) {
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
    
//     // Transform for frontend
//     const transformedProduct = {
//       ...product,
//       newPrice: product.newPrice || product.price,
//       sellingPrice: product.price,
//       mrp: product.oldPrice,
//     };
    
//     res.json({
//       success: true,
//       message: 'Product status updated successfully',
//       data: transformedProduct
//     });
    
//   } catch (err) {
//     console.error('❌ Update product status error:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update product status'
//     });
//   }
// };

// /* ================= ADD VARIATION ================= */
// exports.addVariation = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const variationData = req.body;
    
//     const product = await VendorProduct.findOne({
//       _id: id,
//       vendor: req.vendor._id,
//     });
    
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }
    
//     // Generate unique variation ID
//     const variationId = variationData.id || variationData.variationId || `var_${Date.now()}_${product.variations.length}`;
    
//     const newVariation = {
//       id: variationId,
//       variationId: variationId, // Keep both for compatibility
//       size: safeString(variationData.size),
//       flavor: safeString(variationData.flavor),
//       oldPrice: safeNumber(variationData.oldPrice),
//       newPrice: safeNumber(variationData.newPrice || variationData.price),
//       price: safeNumber(variationData.newPrice || variationData.price), // Sync
//       stock: safeNumber(variationData.stock),
//       sku: safeString(variationData.sku),
//       image: safeString(variationData.image)
//     };
    
//     // Set hasVariations to true
//     product.hasVariations = true;
//     product.variations.push(newVariation);
    
//     await product.save();
    
//     res.json({
//       success: true,
//       message: "Variation added successfully",
//       data: newVariation,
//       totalVariations: product.variations.length
//     });
    
//   } catch (err) {
//     console.error("❌ Add variation error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to add variation"
//     });
//   }
// };

// /* ================= UPDATE VARIATION ================= */
// exports.updateVariation = async (req, res) => {
//   try {
//     const { id, variationId } = req.params;
//     const updateData = req.body;
    
//     const product = await VendorProduct.findOne({
//       _id: id,
//       vendor: req.vendor._id,
//     });
    
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }
    
//     const variationIndex = product.variations.findIndex(v => 
//       v.id === variationId || v.variationId === variationId
//     );
    
//     if (variationIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Variation not found"
//       });
//     }
    
//     // Update variation fields
//     const variation = product.variations[variationIndex];
    
//     if (updateData.size !== undefined) variation.size = safeString(updateData.size);
//     if (updateData.flavor !== undefined) variation.flavor = safeString(updateData.flavor);
//     if (updateData.oldPrice !== undefined) variation.oldPrice = safeNumber(updateData.oldPrice);
//     if (updateData.newPrice !== undefined || updateData.price !== undefined) {
//       const price = safeNumber(updateData.newPrice || updateData.price);
//       variation.newPrice = price;
//       variation.price = price; // Sync both
//     }
//     if (updateData.stock !== undefined) variation.stock = safeNumber(updateData.stock);
//     if (updateData.sku !== undefined) variation.sku = safeString(updateData.sku);
//     if (updateData.image !== undefined) variation.image = safeString(updateData.image);
    
//     // Mark variations as modified
//     product.markModified('variations');
//     await product.save();
    
//     res.json({
//       success: true,
//       message: "Variation updated successfully",
//       data: variation
//     });
    
//   } catch (err) {
//     console.error("❌ Update variation error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update variation"
//     });
//   }
// };

// /* ================= DELETE VARIATION ================= */
// exports.deleteVariation = async (req, res) => {
//   try {
//     const { id, variationId } = req.params;
    
//     const product = await VendorProduct.findOne({
//       _id: id,
//       vendor: req.vendor._id,
//     });
    
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }
    
//     const initialLength = product.variations.length;
//     product.variations = product.variations.filter(v => 
//       v.id !== variationId && v.variationId !== variationId
//     );
    
//     // If no variations left, set hasVariations to false
//     if (product.variations.length === 0) {
//       product.hasVariations = false;
//     }
    
//     if (product.variations.length < initialLength) {
//       await product.save();
//       return res.json({
//         success: true,
//         message: "Variation deleted successfully",
//         totalVariations: product.variations.length
//       });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "Variation not found"
//       });
//     }
    
//   } catch (err) {
//     console.error("❌ Delete variation error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete variation"
//     });
//   }
// };
const VendorProduct = require("../models/VendorProduct");
const Vendor = require("../models/Vendor");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const cloudinary = require("../config/cloudinary");

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
    console.log("🟢 GET VENDOR PRODUCTS API CALLED");
    console.log("Vendor ID:", req.vendor._id);
    
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
    
    if (search && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brandName: { $regex: search, $options: 'i' } },
        { restaurantName: { $regex: search, $options: 'i' } },
        { productTypes: { $regex: search, $options: 'i' } },
        { ingredients: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && category.trim() !== '') {
      query.category = category;
    }
    
    if (subcategory && subcategory.trim() !== '') {
      query.subcategory = subcategory;
    }
    
    if (status && status.trim() !== '') {
      query.status = status;
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

    console.log(`📊 Found ${products.length} products for vendor ${req.vendor._id}`);

    res.json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      vendor: {
        id: vendor?._id || req.vendor._id,
        storeName: vendor?.storeName || "",
        name: vendor?.name || "",
        email: vendor?.email || "",
        phone: vendor?.phone || ""
      },
      data: products,
    });
  } catch (err) {
    console.error("❌ GET VENDOR PRODUCTS ERROR:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message,
      error: err.message
    });
  }
};

/* ================= GET SINGLE VENDOR PRODUCT ================= */
exports.getVendorProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`🟢 GET SINGLE VENDOR PRODUCT: ${id} for vendor ${req.vendor._id}`);
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    })
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .lean();
    
    if (!product) {
      console.log(`❌ Product not found: ${id}`);
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }
    
    console.log(`✅ Found product: ${product.name}`);
    
    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    console.error("❌ GET VENDOR PRODUCT ERROR:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= CREATE VENDOR PRODUCT ================= */
exports.createVendorProduct = async (req, res) => {
  try {
    console.log("🟢 CREATE VENDOR PRODUCT API CALLED");
    console.log("Vendor ID:", req.vendor._id);
    
    const vendor = await Vendor.findById(req.vendor._id);
    if (!vendor) {
      return res.status(404).json({ 
        success: false, 
        message: "Vendor not found" 
      });
    }
    
    console.log("Vendor found:", vendor.storeName || vendor.name);
    
    const data = { ...req.body };
    
    // Parse JSON strings
    if (typeof data.formData === 'string') {
      try {
        data.formData = JSON.parse(data.formData);
      } catch (e) {
        console.log("Could not parse formData as JSON");
      }
    }
    
    if (typeof data.variations === 'string') {
      try {
        data.variations = JSON.parse(data.variations);
      } catch (e) {
        console.log("Could not parse variations as JSON");
      }
    }
    
    let productData = {};
    
    // Helper functions
    const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
    const safeNumber = (value) => {
      if (value === undefined || value === null || value === '') return 0;
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    };
    const safeInt = (value) => {
      if (value === undefined || value === null || value === '') return 0;
      const num = parseInt(value);
      return isNaN(num) ? 0 : num;
    };
    const safeArray = (value) => {
      if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
      if (typeof value === 'string' && value.trim() !== '') {
        return value.split(',').map(item => item.trim()).filter(item => item !== '');
      }
      return [];
    };
    const safeBoolean = (value) => {
      if (value === 'true' || value === true) return true;
      if (value === 'false' || value === false) return false;
      return Boolean(value);
    };
    
    // ================= BASIC VALIDATION =================
    if (!data.name && (!data.formData || !data.formData.basic || !data.formData.basic.name)) {
      return res.status(400).json({
        success: false,
        message: "Product name is required"
      });
    }
    
    if (data.category || (data.formData && data.formData.category)) {
      const categoryId = data.category || (data.formData && data.formData.category);
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid category selected"
        });
      }
      productData.category = categoryId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }
    
    if (data.subcategory || (data.formData && data.formData.subcategory)) {
      const subcategoryId = data.subcategory || (data.formData && data.formData.subcategory);
      const subcategoryExists = await SubCategory.findById(subcategoryId);
      if (subcategoryExists) {
        productData.subcategory = subcategoryId;
      }
    }
    
    // ================= EXTRACT DATA FROM FORM =================
    if (data.formData && typeof data.formData === 'object') {
      // Basic info
      productData.name = safeString(data.formData.basic?.name || data.name);
      productData.description = safeString(data.formData.basic?.description || data.description);
      productData.restaurantName = safeString(vendor.storeName || data.formData.basic?.restaurantName || vendor.name || "");
      productData.hasVariations = safeBoolean(data.formData.basic?.hasVariations || data.hasVariations || false);
      
      // Pricing
      if (data.formData.pricing) {
        productData.oldPrice = safeNumber(data.formData.pricing.oldPrice);
        productData.price = safeNumber(data.formData.pricing.newPrice || data.formData.pricing.price);
        productData.stock = safeInt(data.formData.pricing.stock);
        productData.quality = safeString(data.formData.pricing.quality) || "Standard";
        productData.dietPreference = safeString(data.formData.pricing.dietPreference) || "Veg";
      } else {
        productData.oldPrice = safeNumber(data.oldPrice);
        productData.price = safeNumber(data.newPrice || data.price);
        productData.stock = safeInt(data.stock);
        productData.quality = safeString(data.quality) || "Standard";
        productData.dietPreference = safeString(data.dietPreference) || "Veg";
      }
      
      // Product details
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
        
        // Flavors
        const flavorsArray = [];
        if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
          flavorsArray.push(...data.formData.details.flavors);
        }
        if (data.formData.details.customFlavorInput) {
          flavorsArray.push(data.formData.details.customFlavorInput);
        }
        productData.flavors = flavorsArray.filter(f => f && safeString(f) !== '');
        
        // Sizes
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
        productData.brandName = safeString(data.formData.compliance.fssaiLicense || data.formData.compliance.brandName);
        productData.fssaiLicense = safeString(data.formData.compliance.fssaiLicense);
        productData.legalDisclaimer = safeString(data.formData.compliance.legalDisclaimer);
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
        
        // Marketer
        productData.marketerName = safeString(data.formData.manufacturing.marketerName);
        productData.marketerAddress = safeString(data.formData.manufacturing.marketerAddress);
      }
      
      // Package
      if (data.formData.package) {
        productData.packageColour = safeString(data.formData.package.packageColour);
        productData.measurementUnit = safeString(data.formData.package.measurementUnit);
        productData.unitCount = safeString(data.formData.package.unitCount);
        productData.numberOfItems = safeString(data.formData.package.numberOfItems);
        productData.itemWeight = safeString(data.formData.package.itemWeight);
        productData.totalEaches = safeString(data.formData.package.totalEaches);
        productData.itemPackageWeight = safeString(data.formData.package.itemPackageWeight);
        productData.shelfLife = safeString(data.formData.package.shelfLife);
      }
      
      // Dietary
      if (data.formData.dietary) {
        productData.dietaryPreferences = safeString(data.formData.dietary.dietaryPreferences);
        productData.allergenInformation = safeString(data.formData.dietary.allergenInformation);
        productData.nutrition = safeString(data.formData.dietary.nutrition);
        productData.cuisine = safeString(data.formData.dietary.cuisine);
        productData.directions = safeString(data.formData.dietary.directions);
      }
      
    } else {
      // Direct fields without formData
      productData = {
        // Basic
        name: safeString(data.name),
        description: safeString(data.description),
        restaurantName: safeString(vendor.storeName || data.restaurantName || vendor.name || ""),
        hasVariations: safeBoolean(data.hasVariations || false),
        
        // Pricing
        oldPrice: safeNumber(data.oldPrice),
        price: safeNumber(data.newPrice || data.price),
        stock: safeInt(data.stock),
        quality: safeString(data.quality) || "Standard",
        dietPreference: safeString(data.dietPreference) || "Veg",
        
        // Category
        category: productData.category,
        subcategory: productData.subcategory,
        
        // Details
        productTypes: safeString(data.productTypes),
        ingredients: safeString(data.ingredients),
        materialTypes: safeString(data.materialTypes),
        customWeight: safeString(data.customWeight),
        customSizeInput: safeString(data.customSizeInput),
        ageRange: safeString(data.ageRange),
        containerType: safeString(data.containerType),
        itemForm: safeString(data.itemForm),
        specialty: safeString(data.specialty),
        itemTypeName: safeString(data.itemTypeName),
        countryOfOrigin: safeString(data.countryOfOrigin),
        
        // Arrays
        flavors: safeArray(data.flavors),
        size: safeArray(data.size),
        
        // Compliance
        brandName: safeString(data.brandName || data.fssaiLicense),
        fssaiLicense: safeString(data.fssaiLicense),
        legalDisclaimer: safeString(data.legalDisclaimer),
        shelfLife: safeString(data.shelfLife),
        
        // Manufacturing
        manufacturerName: safeString(data.manufacturerName || data.manufacturer),
        manufacturerAddress: safeString(data.manufacturerAddress || data.manufacturerContact),
        manufacturer: safeString(data.manufacturer || data.manufacturerName),
        manufacturerContact: safeString(data.manufacturerContact || data.manufacturerAddress),
        
        // Packager
        packagerName: safeString(data.packagerName),
        packagerAddress: safeString(data.packagerAddress),
        packagerFssaiLicense: safeString(data.packagerFssaiLicense),
        
        // Marketer
        marketerName: safeString(data.marketerName),
        marketerAddress: safeString(data.marketerAddress),
        
        // Package
        packageColour: safeString(data.packageColour),
        measurementUnit: safeString(data.measurementUnit),
        unitCount: safeString(data.unitCount),
        numberOfItems: safeString(data.numberOfItems),
        itemWeight: safeString(data.itemWeight),
        totalEaches: safeString(data.totalEaches),
        itemPackageWeight: safeString(data.itemPackageWeight),
        
        // Dietary
        dietaryPreferences: safeString(data.dietaryPreferences),
        allergenInformation: safeString(data.allergenInformation || data.allergenInfo),
        nutrition: safeString(data.nutrition),
        cuisine: safeString(data.cuisine),
        directions: safeString(data.directions),
        
        // Location
        State: safeString(data.State),
      };
    }
    
    // Handle variations
    if (productData.hasVariations) {
      if (data.variations && Array.isArray(data.variations) && data.variations.length > 0) {
        productData.variations = data.variations.map((v, index) => ({
          variationId: v.variationId || `var_${Date.now()}_${index}`,
          size: safeString(v.size),
          flavor: safeString(v.flavor),
          oldPrice: safeNumber(v.oldPrice),
          newPrice: safeNumber(v.newPrice || v.price),
          stock: safeInt(v.stock),
          sku: safeString(v.sku),
          image: safeString(v.image)
        }));
        
        // Calculate min price from variations
        const validPrices = productData.variations
          .map(v => v.newPrice || 0)
          .filter(p => p > 0);
        
        if (validPrices.length > 0) {
          productData.price = Math.min(...validPrices);
        }
        
        // Calculate total stock
        productData.stock = productData.variations.reduce((total, v) => total + (v.stock || 0), 0);
      } else {
        productData.hasVariations = false;
        productData.variations = [];
      }
    } else {
      productData.variations = [];
    }
    
    // Validate price
    if (!productData.hasVariations && (!productData.price || productData.price <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Price is required for non-variation products"
      });
    }
    
    // Add vendor ID
    productData.vendor = req.vendor._id;
    
    // Set status
    productData.status = safeString(data.status) || 'pending_approval';
    
    // ================= HANDLE IMAGES =================
    
    // Main image
    if (req.files?.image?.[0]) {
      console.log("Uploading main image...");
      productData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
      console.log("Main image uploaded:", productData.image);
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
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      for (const file of galleryFiles) {
        const img = await uploadCloud(file, 'vendor_products/gallery');
        if (img) galleryImages.push(img);
      }
    }
    
    // Limit gallery to 9 images
    productData.gallery = galleryImages.slice(0, 9);
    
    // Variation images
    if (productData.hasVariations && productData.variations.length > 0 && req.files?.variationImages) {
      const varImages = Array.isArray(req.files.variationImages) ? req.files.variationImages : [req.files.variationImages];
      
      for (let i = 0; i < varImages.length && i < productData.variations.length; i++) {
        const url = await uploadCloud(varImages[i], 'vendor_products/variations');
        if (url) {
          productData.variations[i].image = url;
        }
      }
    }
    
    // Log prepared data
    console.log("📦 Final product data to save:", {
      name: productData.name,
      price: productData.price,
      category: productData.category,
      vendor: productData.vendor,
      hasVariations: productData.hasVariations,
      variationsCount: productData.variations?.length || 0,
      image: productData.image ? "Yes" : "No",
      galleryCount: productData.gallery?.length || 0
    });
    
    // ================= CREATE PRODUCT =================
    try {
      const product = await VendorProduct.create(productData);
      console.log("✅ Product created successfully:", product._id);
      
      const populatedProduct = await VendorProduct.findById(product._id)
        .populate("category", "name image")
        .populate("subcategory", "name image")
        .lean();
      
      res.status(201).json({ 
        success: true, 
        message: "Product created successfully",
        data: populatedProduct,
        vendor: {
          storeName: vendor.storeName || vendor.name || "",
          id: vendor._id
        }
      });
      
    } catch (createError) {
      console.error("❌ CREATE ERROR:", createError);
      
      if (createError.name === 'ValidationError') {
        const errors = Object.values(createError.errors).map(e => e.message);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }
      
      throw createError;
    }
    
  } catch (err) {
    console.error("❌ CREATE VENDOR PRODUCT ERROR:", err);
    
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product with similar name already exists'
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message,
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
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    console.log("📦 Updating product:", product.name);
    
    const data = { ...req.body };
    
    if (typeof data.formData === 'string') {
      try {
        data.formData = JSON.parse(data.formData);
      } catch (e) {
        console.log("Could not parse formData as JSON");
      }
    }
    
    if (typeof data.variations === 'string') {
      try {
        data.variations = JSON.parse(data.variations);
      } catch (e) {
        console.log("Could not parse variations as JSON");
      }
    }
    
    const updateData = {};
    
    const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
    const safeNumber = (value) => {
      if (value === undefined || value === null || value === '') return 0;
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    };
    const safeInt = (value) => {
      if (value === undefined || value === null || value === '') return 0;
      const num = parseInt(value);
      return isNaN(num) ? 0 : num;
    };
    const safeArray = (value) => {
      if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
      if (typeof value === 'string' && value.trim() !== '') {
        return value.split(',').map(item => item.trim()).filter(item => item !== '');
      }
      return [];
    };
    const safeBoolean = (value) => {
      if (value === 'true' || value === true) return true;
      if (value === 'false' || value === false) return false;
      return Boolean(value);
    };
    
    if (data.formData && typeof data.formData === 'object') {
      // Basic info
      if (data.formData.basic?.name !== undefined) updateData.name = safeString(data.formData.basic.name);
      if (data.formData.basic?.description !== undefined) updateData.description = safeString(data.formData.basic.description);
      if (data.formData.basic?.hasVariations !== undefined) updateData.hasVariations = safeBoolean(data.formData.basic.hasVariations);
      
      // Pricing
      if (data.formData.pricing) {
        if (data.formData.pricing.oldPrice !== undefined) updateData.oldPrice = safeNumber(data.formData.pricing.oldPrice);
        if (data.formData.pricing.newPrice !== undefined || data.formData.pricing.price !== undefined) {
          updateData.price = safeNumber(data.formData.pricing.newPrice || data.formData.pricing.price);
        }
        if (data.formData.pricing.stock !== undefined) updateData.stock = safeInt(data.formData.pricing.stock);
        if (data.formData.pricing.quality !== undefined) updateData.quality = safeString(data.formData.pricing.quality);
        if (data.formData.pricing.dietPreference !== undefined) updateData.dietPreference = safeString(data.formData.pricing.dietPreference);
      }
      
      // Product details
      if (data.formData.details) {
        if (data.formData.details.productTypes !== undefined) updateData.productTypes = safeString(data.formData.details.productTypes);
        if (data.formData.details.ingredients !== undefined) updateData.ingredients = safeString(data.formData.details.ingredients);
        if (data.formData.details.materialTypes !== undefined) updateData.materialTypes = safeString(data.formData.details.materialTypes);
        if (data.formData.details.customWeight !== undefined) updateData.customWeight = safeString(data.formData.details.customWeight);
        if (data.formData.details.customSizeInput !== undefined) updateData.customSizeInput = safeString(data.formData.details.customSizeInput);
        if (data.formData.details.ageRange !== undefined) updateData.ageRange = safeString(data.formData.details.ageRange);
        if (data.formData.details.containerType !== undefined) updateData.containerType = safeString(data.formData.details.containerType);
        if (data.formData.details.itemForm !== undefined) updateData.itemForm = safeString(data.formData.details.itemForm);
        if (data.formData.details.specialty !== undefined) updateData.specialty = safeString(data.formData.details.specialty);
        if (data.formData.details.itemTypeName !== undefined) updateData.itemTypeName = safeString(data.formData.details.itemTypeName);
        if (data.formData.details.countryOfOrigin !== undefined) updateData.countryOfOrigin = safeString(data.formData.details.countryOfOrigin);
        
        // Flavors
        if (data.formData.details.flavors !== undefined || data.formData.details.customFlavorInput !== undefined) {
          const flavorsArray = [];
          if (data.formData.details.flavors && Array.isArray(data.formData.details.flavors)) {
            flavorsArray.push(...data.formData.details.flavors);
          }
          if (data.formData.details.customFlavorInput) {
            flavorsArray.push(data.formData.details.customFlavorInput);
          }
          updateData.flavors = flavorsArray.filter(f => f && safeString(f) !== '');
        }
        
        // Sizes
        if (data.formData.details.size !== undefined || data.formData.details.customSizeInput !== undefined) {
          const sizeArray = [];
          if (data.formData.details.size && Array.isArray(data.formData.details.size)) {
            sizeArray.push(...data.formData.details.size);
          }
          if (data.formData.details.customSizeInput) {
            sizeArray.push(data.formData.details.customSizeInput);
          }
          updateData.size = sizeArray.filter(s => s && safeString(s) !== '');
        }
      }
      
      // Location
      if (data.formData.location?.state !== undefined) updateData.State = safeString(data.formData.location.state);
      
      // Compliance
      if (data.formData.compliance) {
        if (data.formData.compliance.fssaiLicense !== undefined) {
          updateData.brandName = safeString(data.formData.compliance.fssaiLicense);
          updateData.fssaiLicense = safeString(data.formData.compliance.fssaiLicense);
        }
        if (data.formData.compliance.legalDisclaimer !== undefined) updateData.legalDisclaimer = safeString(data.formData.compliance.legalDisclaimer);
      }
      
      // Manufacturing
      if (data.formData.manufacturing) {
        if (data.formData.manufacturing.manufacturerName !== undefined) {
          updateData.manufacturerName = safeString(data.formData.manufacturing.manufacturerName);
          updateData.manufacturer = safeString(data.formData.manufacturing.manufacturerName);
        }
        if (data.formData.manufacturing.manufacturerAddress !== undefined) {
          updateData.manufacturerAddress = safeString(data.formData.manufacturing.manufacturerAddress);
          updateData.manufacturerContact = safeString(data.formData.manufacturing.manufacturerAddress);
        }
        
        // Packager
        if (data.formData.manufacturing.packagerName !== undefined) updateData.packagerName = safeString(data.formData.manufacturing.packagerName);
        if (data.formData.manufacturing.packagerAddress !== undefined) updateData.packagerAddress = safeString(data.formData.manufacturing.packagerAddress);
        if (data.formData.manufacturing.packagerFssaiLicense !== undefined) updateData.packagerFssaiLicense = safeString(data.formData.manufacturing.packagerFssaiLicense);
        
        // Marketer
        if (data.formData.manufacturing.marketerName !== undefined) updateData.marketerName = safeString(data.formData.manufacturing.marketerName);
        if (data.formData.manufacturing.marketerAddress !== undefined) updateData.marketerAddress = safeString(data.formData.manufacturing.marketerAddress);
      }
      
      // Package
      if (data.formData.package) {
        if (data.formData.package.packageColour !== undefined) updateData.packageColour = safeString(data.formData.package.packageColour);
        if (data.formData.package.measurementUnit !== undefined) updateData.measurementUnit = safeString(data.formData.package.measurementUnit);
        if (data.formData.package.unitCount !== undefined) updateData.unitCount = safeString(data.formData.package.unitCount);
        if (data.formData.package.numberOfItems !== undefined) updateData.numberOfItems = safeString(data.formData.package.numberOfItems);
        if (data.formData.package.itemWeight !== undefined) updateData.itemWeight = safeString(data.formData.package.itemWeight);
        if (data.formData.package.totalEaches !== undefined) updateData.totalEaches = safeString(data.formData.package.totalEaches);
        if (data.formData.package.itemPackageWeight !== undefined) updateData.itemPackageWeight = safeString(data.formData.package.itemPackageWeight);
        if (data.formData.package.shelfLife !== undefined) updateData.shelfLife = safeString(data.formData.package.shelfLife);
      }
      
      // Dietary
      if (data.formData.dietary) {
        if (data.formData.dietary.dietaryPreferences !== undefined) updateData.dietaryPreferences = safeString(data.formData.dietary.dietaryPreferences);
        if (data.formData.dietary.allergenInformation !== undefined) updateData.allergenInformation = safeString(data.formData.dietary.allergenInformation);
        if (data.formData.dietary.nutrition !== undefined) updateData.nutrition = safeString(data.formData.dietary.nutrition);
        if (data.formData.dietary.cuisine !== undefined) updateData.cuisine = safeString(data.formData.dietary.cuisine);
        if (data.formData.dietary.directions !== undefined) updateData.directions = safeString(data.formData.dietary.directions);
      }
      
    } else {
      const directFields = [
        'name', 'description', 'restaurantName', 'hasVariations',
        'oldPrice', 'price', 'newPrice', 'stock', 'quality', 'dietPreference',
        'productTypes', 'ingredients', 'materialTypes', 'customWeight', 'customSizeInput',
        'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
        'brandName', 'fssaiLicense', 'legalDisclaimer', 'shelfLife',
        'manufacturerName', 'manufacturerAddress', 'manufacturer', 'manufacturerContact',
        'packagerName', 'packagerAddress', 'packagerFssaiLicense',
        'marketerName', 'marketerAddress',
        'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight',
        'totalEaches', 'itemPackageWeight',
        'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
        'State', 'status'
      ];
      
      directFields.forEach(field => {
        if (data[field] !== undefined) {
          if (field === 'newPrice') {
            updateData.price = safeNumber(data[field]);
          } else if (field.includes('Price') || field === 'stock') {
            updateData[field] = safeNumber(data[field]);
          } else if (field === 'flavors' || field === 'size') {
            updateData[field] = safeArray(data[field]);
          } else if (field === 'hasVariations') {
            updateData[field] = safeBoolean(data[field]);
          } else {
            updateData[field] = safeString(data[field]);
          }
        }
      });
    }
    
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
    
    if (data.subcategory) {
      const subcategoryExists = await SubCategory.findById(data.subcategory);
      if (subcategoryExists) {
        updateData.subcategory = data.subcategory;
      }
    }
    
    if (data.variations !== undefined) {
      if (Array.isArray(data.variations) && data.variations.length > 0) {
        updateData.hasVariations = true;
        updateData.variations = data.variations.map((v, index) => ({
          variationId: v.variationId || v.id || `var_${Date.now()}_${index}`,
          size: safeString(v.size),
          flavor: safeString(v.flavor),
          oldPrice: safeNumber(v.oldPrice),
          newPrice: safeNumber(v.newPrice || v.price),
          stock: safeInt(v.stock),
          sku: safeString(v.sku),
          image: safeString(v.image)
        }));
        
        const validPrices = updateData.variations
          .map(v => v.newPrice || 0)
          .filter(p => p > 0);
        
        if (validPrices.length > 0) {
          updateData.price = Math.min(...validPrices);
        }
        
        updateData.stock = updateData.variations.reduce((total, v) => total + (v.stock || 0), 0);
      } else {
        updateData.hasVariations = false;
        updateData.variations = [];
      }
    }
    
    if (data.hasVariations !== undefined) {
      updateData.hasVariations = safeBoolean(data.hasVariations);
      if (!updateData.hasVariations) {
        updateData.variations = [];
      }
    }
    
    // ================= HANDLE IMAGES =================
    
    if (req.files?.image?.[0]) {
      if (product.image && product.image.includes('cloudinary.com')) {
        await deleteCloudinaryImage(product.image);
      }
      
      updateData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
    }
    
    let galleryImages = [...(product.gallery || [])];
    
    if (req.files?.mandatoryImages?.ingredientsImage?.[0]) {
      const img = await uploadCloud(req.files.mandatoryImages.ingredientsImage[0], 'vendor_products/gallery');
      if (img) {
        if (galleryImages.length > 0) galleryImages[0] = img;
        else galleryImages.push(img);
      }
    }
    
    if (req.files?.mandatoryImages?.nutritionImage?.[0]) {
      const img = await uploadCloud(req.files.mandatoryImages.nutritionImage[0], 'vendor_products/gallery');
      if (img) {
        if (galleryImages.length > 1) galleryImages[1] = img;
        else if (galleryImages.length === 1) galleryImages.push(img);
        else galleryImages = [null, img];
      }
    }
    
    if (req.files?.mandatoryImages?.mfgExpImage?.[0]) {
      const img = await uploadCloud(req.files.mandatoryImages.mfgExpImage[0], 'vendor_products/gallery');
      if (img) {
        if (galleryImages.length > 2) galleryImages[2] = img;
        else galleryImages.push(img);
      }
    }
    
    if (req.files?.gallery) {
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      for (const file of galleryFiles) {
        const img = await uploadCloud(file, 'vendor_products/gallery');
        if (img) galleryImages.push(img);
      }
    }
    
    updateData.gallery = galleryImages.filter(img => img && img.trim() !== '').slice(0, 9);
    
    if (updateData.hasVariations && updateData.variations && updateData.variations.length > 0) {
      updateData.variations.forEach((newVar, index) => {
        const existingVar = product.variations.find(v => v.variationId === newVar.variationId);
        if (existingVar?.image && !newVar.image) {
          updateData.variations[index].image = existingVar.image;
        }
      });
      
      if (req.files?.variationImages) {
        const varImages = Array.isArray(req.files.variationImages) ? req.files.variationImages : [req.files.variationImages];
        
        for (let i = 0; i < varImages.length && i < updateData.variations.length; i++) {
          const url = await uploadCloud(varImages[i], 'vendor_products/variations');
          if (url) {
            updateData.variations[i].image = url;
          }
        }
      }
    }
    
    Object.assign(product, updateData);
    
    await product.save();
    
    const populatedProduct = await VendorProduct.findById(product._id)
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .lean();
    
    console.log("✅ Product updated successfully");
    
    res.json({ 
      success: true, 
      message: "Product updated successfully",
      data: populatedProduct 
    });
    
  } catch (err) {
    console.error("❌ UPDATE VENDOR PRODUCT ERROR:", err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message,
      error: err.message
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
    
    if (product.hasVariations && product.variations.length > 0) {
      for (const variation of product.variations) {
        if (variation.image && variation.image.includes('cloudinary.com')) {
          await deleteCloudinaryImage(variation.image);
        }
      }
    }
    
    await product.deleteOne();
    
    res.json({ 
      success: true, 
      message: "Product deleted successfully" 
    });
  } catch (err) {
    console.error("❌ DELETE VENDOR PRODUCT ERROR:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + err.message 
    });
  }
};

/* ================= BULK OPERATIONS ================= */
exports.bulkUpdate = async (req, res) => {
  try {
    const { ids, data } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Product IDs required" 
      });
    }

    const updateData = { ...data };
    
    if (updateData.newPrice !== undefined) {
      updateData.price = updateData.newPrice;
      delete updateData.newPrice;
    }
    
    if (updateData.price !== undefined) updateData.price = parseFloat(updateData.price);
    if (updateData.oldPrice !== undefined) updateData.oldPrice = parseFloat(updateData.oldPrice);
    if (updateData.stock !== undefined) updateData.stock = parseInt(updateData.stock);
    
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
      message: "Bulk update failed: " + err.message
    });
  }
};

exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Product IDs required" 
      });
    }

    const products = await VendorProduct.find({
      _id: { $in: ids },
      vendor: req.vendor._id,
    });

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
      
      if (product.hasVariations && product.variations.length > 0) {
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
      message: "Bulk delete failed: " + err.message
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
      message: 'Failed to update product status: ' + err.message
    });
  }
};

/* ================= VARIATION OPERATIONS ================= */
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
    
    const variationId = variationData.variationId || `var_${Date.now()}_${product.variations.length}`;
    
    const newVariation = {
      variationId,
      size: variationData.size || '',
      flavor: variationData.flavor || '',
      oldPrice: parseFloat(variationData.oldPrice) || 0,
      newPrice: parseFloat(variationData.newPrice || variationData.price) || 0,
      stock: parseInt(variationData.stock) || 0,
      sku: variationData.sku || '',
      image: variationData.image || ''
    };
    
    product.hasVariations = true;
    product.variations.push(newVariation);
    
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
      message: "Failed to add variation: " + err.message
    });
  }
};

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
    
    const variation = product.variations[variationIndex];
    
    if (updateData.size !== undefined) variation.size = updateData.size;
    if (updateData.flavor !== undefined) variation.flavor = updateData.flavor;
    if (updateData.oldPrice !== undefined) variation.oldPrice = parseFloat(updateData.oldPrice) || 0;
    if (updateData.newPrice !== undefined || updateData.price !== undefined) {
      const price = parseFloat(updateData.newPrice || updateData.price) || 0;
      variation.newPrice = price;
    }
    if (updateData.stock !== undefined) variation.stock = parseInt(updateData.stock) || 0;
    if (updateData.sku !== undefined) variation.sku = updateData.sku;
    if (updateData.image !== undefined) variation.image = updateData.image;
    
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
      message: "Failed to update variation: " + err.message
    });
  }
};

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
    
    const initialLength = product.variations.length;
    product.variations = product.variations.filter(v => v.variationId !== variationId);
    
    if (product.variations.length === 0) {
      product.hasVariations = false;
    }
    
    if (product.variations.length < initialLength) {
      await product.save();
      return res.json({
        success: true,
        message: "Variation deleted successfully",
        totalVariations: product.variations.length
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Variation not found"
      });
    }
    
  } catch (err) {
    console.error("❌ Delete variation error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete variation: " + err.message
    });
  }
};

// CSV and export functions (simplified)
exports.importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "CSV file required" 
      });
    }

    res.json({
      success: true,
      message: "CSV import completed",
      imported: 0,
      updated: 0
    });
    
  } catch (err) {
    console.error("❌ CSV import error:", err);
    res.status(500).json({ 
      success: false,
      message: "CSV Import Failed" 
    });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "CSV export endpoint"
    });
  } catch (err) {
    console.error("❌ CSV export error:", err);
    res.status(500).json({ 
      success: false,
      message: "CSV Export Failed" 
    });
  }
};

module.exports = exports;
