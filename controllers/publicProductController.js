



// // const Product = require("../models/Product");
// // const VendorProduct = require("../models/VendorProduct");

// // /* =====================================================
// //    GET PUBLIC PRODUCTS (ADMIN + VENDOR)
// // ===================================================== */
// // const getPublicProducts = async (req, res) => {
// //   try {
// //     // Admin products
// //     const adminProducts = await Product.find().lean();

// //     // Vendor products
// //     const vendorProducts = await VendorProduct.find().lean();

// //     // Merge & sanitize data
// //     const mergedProducts = [...adminProducts, ...vendorProducts].map(p => ({
// //       /* ================= BASIC INFO ================= */
// //       id: p._id,
// //       name: p.name,
// //       description: p.description || "",
// //       brandName: p.brandName || "",
// //       price: p.newPrice || 0,
// //       oldPrice: p.oldPrice || 0,
// //       stock: p.stock || 0,
// //       quality: p.quality || "Standard",
// //       dietPreference: p.dietPreference || "Veg",
// //       restaurantName: p.restaurantName || "Havbit",

// //       /* ================= PRODUCT DETAILS ================= */
// //       productTypes: p.productTypes || "",
// //       flavors: Array.isArray(p.flavors) ? p.flavors : [],
// //       size: Array.isArray(p.size) ? p.size : [],
// //       materialTypes: p.materialTypes || "",
// //       ingredients: p.ingredients || "",
// //       customWeight: p.customWeight || "",
// //       customSizeInput: p.customSizeInput || "",
// //       ageRange: p.ageRange || "",
// //       containerType: p.containerType || "",
// //       itemForm: p.itemForm || "",
// //       specialty: p.specialty || "",
// //       itemTypeName: p.itemTypeName || "",
// //       countryOfOrigin: p.countryOfOrigin || "",

// //       /* ================= COMPLIANCE ================= */
// //       brandName: p.brandName || "",
// //       fssaiLicense: p.fssaiLicense || "",
// //       legalDisclaimer: p.legalDisclaimer || "",
// //       shelfLife: p.shelfLife || "",

// //       /* ================= MANUFACTURING ================= */
// //       manufacturer: p.manufacturer || "",
// //       manufacturerContact: p.manufacturerContact || "",
// //       packerContact: p.packerContact || "",
// //       marketerNameAddress: p.marketerNameAddress || "",

// //       /* ================= PACKAGE DETAILS ================= */
// //       packageColour: p.packageColour || "",
// //       measurementUnit: p.measurementUnit || "",
// //       unitCount: p.unitCount || "",
// //       numberOfItems: p.numberOfItems || "",
// //       itemWeight: p.itemWeight || "",
// //       totalEaches: p.totalEaches || "",
// //       itemPackageWeight: p.itemPackageWeight || "",

// //       /* ================= DIETARY & NUTRITION ================= */
// //       dietaryPreferences: p.dietaryPreferences || "",
// //       allergenInfo: p.allergenInfo || "",
// //       allergenInformation: p.allergenInformation || "",
// //       nutrition: p.nutrition || "",
// //       cuisine: p.cuisine || "",
// //       directions: p.directions || "",

// //       /* ================= LOCATION ================= */
// //       State: p.State || "",

// //       /* ================= CATEGORY ================= */
// //       category: p.category || null,
// //       subcategory: p.subcategory || null,

// //       /* ================= MEDIA ================= */
// //       image: p.image && typeof p.image === "string" && p.image.startsWith("http")
// //         ? p.image
// //         : null,

// //       gallery: Array.isArray(p.gallery)
// //         ? p.gallery.filter(img => typeof img === "string" && img.startsWith("http"))
// //         : [],

// //       /* ================= VENDOR ================= */
// //       vendor: p.vendor || null,

// //       /* ================= TIMESTAMPS ================= */
// //       createdAt: p.createdAt,
// //       updatedAt: p.updatedAt,
// //     }));

// //     return res.status(200).json({
// //       success: true,
// //       count: mergedProducts.length,
// //       data: mergedProducts,
// //     });
// //   } catch (error) {
// //     console.error("GET PUBLIC PRODUCTS ERROR:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch public products",
// //     });
// //   }
// // };

// // // Export karo
// // module.exports = {
// //   getPublicProducts
// // };


// // const Product = require("../models/Product");
// // const VendorProduct = require("../models/VendorProduct");

// // /* =====================================================
// //    GET PUBLIC PRODUCTS (ADMIN + VENDOR)
// // ===================================================== */
// // const getPublicProducts = async (req, res) => {
// //   try {
// //     // Admin products
// //     const adminProducts = await Product.find().lean();

// //     // Vendor products
// //     const vendorProducts = await VendorProduct.find().lean();

// //     // Merge & sanitize data
// //     const mergedProducts = [...adminProducts, ...vendorProducts].map(p => ({
// //       /* ================= BASIC INFO ================= */
// //       id: p._id,
// //       name: p.name,
// //       description: p.description || "",
// //       brandName: p.brandName || "",
// //       price: p.newPrice || 0,
// //       oldPrice: p.oldPrice || 0,
// //       stock: p.stock || 0,
// //       quality: p.quality || "Standard",
// //       dietPreference: p.dietPreference || "Veg",
// //       restaurantName: p.restaurantName || "Havbit",

// //       /* ================= PRODUCT DETAILS ================= */
// //       productTypes: p.productTypes || "",
// //       flavors: Array.isArray(p.flavors) ? p.flavors : [],
// //       size: Array.isArray(p.size) ? p.size : [],
// //       materialTypes: p.materialTypes || "",
// //       ingredients: p.ingredients || "",
// //       customWeight: p.customWeight || "",
// //       customSizeInput: p.customSizeInput || "",
// //       ageRange: p.ageRange || "",
// //       containerType: p.containerType || "",
// //       itemForm: p.itemForm || "",
// //       specialty: p.specialty || "",
// //       itemTypeName: p.itemTypeName || "",
// //       countryOfOrigin: p.countryOfOrigin || "",

// //       /* ================= COMPLIANCE ================= */
// //       brandName: p.brandName || "",
// //       fssaiLicense: p.fssaiLicense || "",
// //       legalDisclaimer: p.legalDisclaimer || "",
// //       shelfLife: p.shelfLife || "",

// //       /* ================= MANUFACTURING ================= */
// //       manufacturer: p.manufacturer || "",
// //       manufacturerContact: p.manufacturerContact || "",
// //       packerContact: p.packerContact || "",
// //       marketerNameAddress: p.marketerNameAddress || "",

// //       /* ================= PACKAGE DETAILS ================= */
// //       packageColour: p.packageColour || "",
// //       measurementUnit: p.measurementUnit || "",
// //       unitCount: p.unitCount || "",
// //       numberOfItems: p.numberOfItems || "",
// //       itemWeight: p.itemWeight || "",
// //       totalEaches: p.totalEaches || "",
// //       itemPackageWeight: p.itemPackageWeight || "",

// //       /* ================= DIETARY & NUTRITION ================= */
// //       dietaryPreferences: p.dietaryPreferences || "",
// //       allergenInfo: p.allergenInfo || "",
// //       allergenInformation: p.allergenInformation || "",
// //       nutrition: p.nutrition || "",
// //       cuisine: p.cuisine || "",
// //       directions: p.directions || "",

// //       /* ================= LOCATION ================= */
// //       State: p.State || "",

// //       /* ================= CATEGORY ================= */
// //       category: p.category || null,
// //       subcategory: p.subcategory || null,

// //       /* ================= MEDIA ================= */
// //       image: p.image && typeof p.image === "string" && p.image.startsWith("http")
// //         ? p.image
// //         : null,

// //       gallery: Array.isArray(p.gallery)
// //         ? p.gallery.filter(img => typeof img === "string" && img.startsWith("http"))
// //         : [],

// //       /* ================= VENDOR ================= */
// //       vendor: p.vendor || null,

// //       /* ================= TIMESTAMPS ================= */
// //       createdAt: p.createdAt,
// //       updatedAt: p.updatedAt,
// //     }));

// //     return res.status(200).json({
// //       success: true,
// //       count: mergedProducts.length,
// //       data: mergedProducts,
// //     });
// //   } catch (error) {
// //     console.error("GET PUBLIC PRODUCTS ERROR:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch public products",
// //     });
// //   }
// // };







// const Product = require("../models/Product");
// const VendorProduct = require("../models/VendorProduct");
// const Category = require("../models/Category");
// const SubCategory = require("../models/SubCategory");
// const Vendor = require("../models/Vendor");

// /* =====================================================
//    GET PUBLIC PRODUCTS (ADMIN + VENDOR) - COMPLETE FIXED
// ===================================================== */
// const getPublicProducts = async (req, res) => {
//   try {
//     console.log("🟢 GET PUBLIC PRODUCTS API CALLED");
    
//     // Extract query parameters
//     const { 
//       page = 1, 
//       limit = 50, 
//       category, 
//       subcategory, 
//       search, 
//       minPrice, 
//       maxPrice,
//       quality,
//       dietPreference,
//       state,
//       sort = '-createdAt'
//     } = req.query;
    
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     // Build admin product query
//     const adminQuery = {};
//     // Build vendor product query
//     const vendorQuery = {};

//     // Apply filters to both queries
//     if (category) {
//       adminQuery.category = category;
//       vendorQuery.category = category;
//     }
    
//     if (subcategory) {
//       adminQuery.subcategory = subcategory;
//       vendorQuery.subcategory = subcategory;
//     }
    
//     if (search) {
//       const searchRegex = new RegExp(search, 'i');
//       adminQuery.$or = [
//         { name: searchRegex },
//         { description: searchRegex },
//         { brandName: searchRegex },
//         { restaurantName: searchRegex }
//       ];
//       vendorQuery.$or = [
//         { name: searchRegex },
//         { description: searchRegex },
//         { brandName: searchRegex },
//         { restaurantName: searchRegex }
//       ];
//     }
    
//     if (quality) {
//       adminQuery.quality = quality;
//       vendorQuery.quality = quality;
//     }
    
//     if (dietPreference) {
//       adminQuery.dietPreference = dietPreference;
//       vendorQuery.dietPreference = dietPreference;
//     }
    
//     if (state) {
//       adminQuery.State = state;
//       vendorQuery.State = state;
//     }
    
//     // Price filtering
//     if (minPrice || maxPrice) {
//       const priceFilter = {};
//       if (minPrice) priceFilter.$gte = parseFloat(minPrice);
//       if (maxPrice) priceFilter.$lte = parseFloat(maxPrice);
      
//       adminQuery.price = priceFilter;
//       vendorQuery.price = priceFilter;
//     }
    
//     // Fetch products with population and pagination
//     const [adminProducts, vendorProducts, adminTotal, vendorTotal] = await Promise.all([
//       Product.find(adminQuery)
//         .populate('category', 'name image')
//         .populate('subcategory', 'name image')
//         .sort(sort)
//         .skip(skip)
//         .limit(parseInt(limit))
//         .lean(),
      
//       VendorProduct.find(vendorQuery)
//         .populate('category', 'name image')
//         .populate('subcategory', 'name image')
//         .populate('vendor', 'storeName name email phone')
//         .sort(sort)
//         .skip(skip)
//         .limit(parseInt(limit))
//         .lean(),
      
//       Product.countDocuments(adminQuery),
//       VendorProduct.countDocuments(vendorQuery)
//     ]);

//     console.log(`📊 Admin Products: ${adminProducts.length}, Vendor Products: ${vendorProducts.length}`);

//     // Function to map product data consistently
//     const mapProductData = (product, isVendor = false) => {
//       // Helper functions
//       const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
//       const safeNumber = (value) => {
//         const num = parseFloat(value);
//         return isNaN(num) ? 0 : num;
//       };
//       const safeArray = (value) => {
//         if (Array.isArray(value)) return value.filter(item => item && item.trim() !== '');
//         if (typeof value === 'string' && value.trim() !== '') {
//           return value.split(',').map(item => item.trim()).filter(item => item !== '');
//         }
//         return [];
//       };
      
//       // Get category/subcategory names
//       const categoryName = product.category ? 
//         (typeof product.category === 'object' ? product.category.name : '') : '';
//       const subcategoryName = product.subcategory ? 
//         (typeof product.subcategory === 'object' ? product.subcategory.name : '') : '';
      
//       // Build product object
//       const mappedProduct = {
//         // ================= BASIC INFO =================
//         id: product._id,
//         name: safeString(product.name),
//         description: safeString(product.description),
//         brandName: safeString(product.brandName),
//         price: isVendor ? safeNumber(product.price) : safeNumber(product.price || product.newPrice),
//         oldPrice: safeNumber(product.oldPrice),
//         stock: safeNumber(product.stock),
//         quality: safeString(product.quality) || "Standard",
//         dietPreference: safeString(product.dietPreference) || "Veg",
//         restaurantName: safeString(product.restaurantName) || "Havbit",
        
//         // ================= VARIATIONS =================
//         hasVariations: isVendor ? false : (product.hasVariations || false),
//         variations: isVendor ? [] : (Array.isArray(product.variations) ? product.variations : []),
        
//         // ================= PRODUCT DETAILS =================
//         productTypes: safeString(product.productTypes),
//         flavors: safeArray(product.flavors),
//         size: safeArray(product.size),
//         materialTypes: safeString(product.materialTypes),
//         ingredients: safeString(product.ingredients),
//         customWeight: safeString(product.customWeight),
//         customSizeInput: safeString(product.customSizeInput),
//         ageRange: safeString(product.ageRange),
//         containerType: safeString(product.containerType),
//         itemForm: safeString(product.itemForm),
//         specialty: safeString(product.specialty),
//         itemTypeName: safeString(product.itemTypeName),
//         countryOfOrigin: safeString(product.countryOfOrigin),
        
//         // ================= COMPLIANCE =================
//         fssaiLicense: safeString(product.fssaiLicense),
//         legalDisclaimer: safeString(product.legalDisclaimer),
//         shelfLife: safeString(product.shelfLife),
        
//         // ================= MANUFACTURING =================
//         manufacturerName: safeString(product.manufacturerName || product.manufacturer),
//         manufacturerAddress: safeString(product.manufacturerAddress || product.manufacturerContact),
//         manufacturer: safeString(product.manufacturer || product.manufacturerName),
//         manufacturerContact: safeString(product.manufacturerContact || product.manufacturerAddress),
        
//         // ================= PACKAGER =================
//         packagerName: safeString(product.packagerName),
//         packagerAddress: safeString(product.packagerAddress),
//         packagerFssaiLicense: safeString(product.packagerFssaiLicense),
//         packerContact: safeString(product.packerContact),
        
//         // ================= MARKETER =================
//         marketerName: safeString(product.marketerName),
//         marketerAddress: safeString(product.marketerAddress),
//         marketerNameAddress: safeString(product.marketerNameAddress),
        
//         // ================= PACKAGE DETAILS =================
//         packageColour: safeString(product.packageColour),
//         measurementUnit: safeString(product.measurementUnit),
//         unitCount: safeString(product.unitCount),
//         numberOfItems: safeString(product.numberOfItems),
//         itemWeight: safeString(product.itemWeight),
//         totalEaches: safeString(product.totalEaches),
//         itemPackageWeight: safeString(product.itemPackageWeight),
        
//         // ================= DIETARY & NUTRITION =================
//         dietaryPreferences: safeString(product.dietaryPreferences),
//         allergenInformation: safeString(product.allergenInformation || product.allergenInfo),
//         nutrition: safeString(product.nutrition),
//         cuisine: safeString(product.cuisine),
//         directions: safeString(product.directions),
        
//         // ================= LOCATION =================
//         State: safeString(product.State),
        
//         // ================= CATEGORY =================
//         category: product.category ? 
//           (typeof product.category === 'object' ? product.category._id : product.category) : null,
//         subcategory: product.subcategory ? 
//           (typeof product.subcategory === 'object' ? product.subcategory._id : product.subcategory) : null,
//         categoryName: categoryName,
//         subcategoryName: subcategoryName,
        
//         // ================= MEDIA =================
//         image: product.image && typeof product.image === "string" ? 
//           (product.image.startsWith('http') ? product.image : 
//            `${process.env.BASE_URL || 'http://localhost:5000'}${product.image}`) : null,
//         gallery: Array.isArray(product.gallery) ? 
//           product.gallery.map(img => 
//             img.startsWith('http') ? img : 
//             `${process.env.BASE_URL || 'http://localhost:5000'}${img}`
//           ).filter(img => img) : [],
        
//         // ================= VENDOR INFO =================
//         vendor: isVendor ? product.vendor : null,
//         isVendorProduct: isVendor,
//         vendorName: isVendor && product.vendor ? 
//           (typeof product.vendor === 'object' ? 
//             (product.vendor.storeName || product.vendor.name || "") : "") : "",
//         vendorId: isVendor && product.vendor ? 
//           (typeof product.vendor === 'object' ? product.vendor._id : product.vendor) : null,
        
//         // ================= TIMESTAMPS =================
//         createdAt: product.createdAt,
//         updatedAt: product.updatedAt,
//         slug: product.slug || null,
//       };
      
//       // Clean up - remove empty strings and null values
//       Object.keys(mappedProduct).forEach(key => {
//         if (mappedProduct[key] === "" || mappedProduct[key] === null) {
//           delete mappedProduct[key];
//         }
//       });
      
//       return mappedProduct;
//     };
    
//     // Map both admin and vendor products
//     const mappedAdminProducts = adminProducts.map(p => mapProductData(p, false));
//     const mappedVendorProducts = vendorProducts.map(p => mapProductData(p, true));
    
//     // Combine products
//     const allProducts = [...mappedAdminProducts, ...mappedVendorProducts];
    
//     // Apply final sorting
//     const sortProducts = (products, sortBy) => {
//       return products.sort((a, b) => {
//         if (sortBy.startsWith('-')) {
//           const field = sortBy.substring(1);
//           return new Date(b[field] || b.createdAt) - new Date(a[field] || a.createdAt);
//         } else {
//           const field = sortBy;
//           return new Date(a[field] || a.createdAt) - new Date(b[field] || b.createdAt);
//         }
//       });
//     };
    
//     const sortedProducts = sortProducts(allProducts, sort);
    
//     // Calculate totals
//     const totalProducts = adminTotal + vendorTotal;
//     const totalPages = Math.ceil(totalProducts / parseInt(limit));
    
//     console.log(`✅ Total Public Products: ${sortedProducts.length}`);
    
//     return res.status(200).json({
//       success: true,
//       count: sortedProducts.length,
//       total: totalProducts,
//       page: parseInt(page),
//       pages: totalPages,
//       limit: parseInt(limit),
//       data: sortedProducts,
//       filters: {
//         category: category || null,
//         subcategory: subcategory || null,
//         search: search || null,
//         minPrice: minPrice || null,
//         maxPrice: maxPrice || null,
//         quality: quality || null,
//         dietPreference: dietPreference || null,
//         state: state || null,
//         sort: sort
//       }
//     });
    
//   } catch (error) {
//     console.error("❌ GET PUBLIC PRODUCTS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch public products",
//       error: error.message,
//     });
//   }
// };

// /* =====================================================
//    GET SINGLE PUBLIC PRODUCT BY ID
// ===================================================== */
// const getPublicProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "Product ID is required"
//       });
//     }
    
//     // Try to find in admin products first
//     let product = await Product.findById(id)
//       .populate('category', 'name image')
//       .populate('subcategory', 'name image')
//       .lean();
    
//     let isVendorProduct = false;
    
//     // If not found in admin, try vendor products
//     if (!product) {
//       product = await VendorProduct.findById(id)
//         .populate('category', 'name image')
//         .populate('subcategory', 'name image')
//         .populate('vendor', 'storeName name email phone address')
//         .lean();
      
//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found"
//         });
//       }
      
//       isVendorProduct = true;
//     }
    
//     // Map product data using the same function
//     const mapProductData = (product, isVendor = false) => {
//       const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
//       const safeNumber = (value) => {
//         const num = parseFloat(value);
//         return isNaN(num) ? 0 : num;
//       };
//       const safeArray = (value) => {
//         if (Array.isArray(value)) return value.filter(item => item && item.trim() !== '');
//         if (typeof value === 'string' && value.trim() !== '') {
//           return value.split(',').map(item => item.trim()).filter(item => item !== '');
//         }
//         return [];
//       };
      
//       const categoryName = product.category ? 
//         (typeof product.category === 'object' ? product.category.name : '') : '';
//       const subcategoryName = product.subcategory ? 
//         (typeof product.subcategory === 'object' ? product.subcategory.name : '') : '';
      
//       const mappedProduct = {
//         id: product._id,
//         name: safeString(product.name),
//         description: safeString(product.description),
//         brandName: safeString(product.brandName),
//         price: isVendor ? safeNumber(product.price) : safeNumber(product.price || product.newPrice),
//         oldPrice: safeNumber(product.oldPrice),
//         stock: safeNumber(product.stock),
//         quality: safeString(product.quality) || "Standard",
//         dietPreference: safeString(product.dietPreference) || "Veg",
//         restaurantName: safeString(product.restaurantName) || "Havbit",
        
//         hasVariations: isVendor ? false : (product.hasVariations || false),
//         variations: isVendor ? [] : (Array.isArray(product.variations) ? product.variations : []),
        
//         productTypes: safeString(product.productTypes),
//         flavors: safeArray(product.flavors),
//         size: safeArray(product.size),
//         materialTypes: safeString(product.materialTypes),
//         ingredients: safeString(product.ingredients),
//         customWeight: safeString(product.customWeight),
//         customSizeInput: safeString(product.customSizeInput),
//         ageRange: safeString(product.ageRange),
//         containerType: safeString(product.containerType),
//         itemForm: safeString(product.itemForm),
//         specialty: safeString(product.specialty),
//         itemTypeName: safeString(product.itemTypeName),
//         countryOfOrigin: safeString(product.countryOrigin),
        
//         fssaiLicense: safeString(product.fssaiLicense),
//         legalDisclaimer: safeString(product.legalDisclaimer),
//         shelfLife: safeString(product.shelfLife),
        
//         manufacturerName: safeString(product.manufacturerName || product.manufacturer),
//         manufacturerAddress: safeString(product.manufacturerAddress || product.manufacturerContact),
//         manufacturer: safeString(product.manufacturer || product.manufacturerName),
//         manufacturerContact: safeString(product.manufacturerContact || product.manufacturerAddress),
        
//         packagerName: safeString(product.packagerName),
//         packagerAddress: safeString(product.packagerAddress),
//         packagerFssaiLicense: safeString(product.packagerFssaiLicense),
//         packerContact: safeString(product.packerContact),
        
//         marketerName: safeString(product.marketerName),
//         marketerAddress: safeString(product.marketerAddress),
//         marketerNameAddress: safeString(product.marketerNameAddress),
        
//         packageColour: safeString(product.packageColour),
//         measurementUnit: safeString(product.measurementUnit),
//         unitCount: safeString(product.unitCount),
//         numberOfItems: safeString(product.numberOfItems),
//         itemWeight: safeString(product.itemWeight),
//         totalEaches: safeString(product.totalEaches),
//         itemPackageWeight: safeString(product.itemPackageWeight),
        
//         dietaryPreferences: safeString(product.dietaryPreferences),
//         allergenInformation: safeString(product.allergenInformation || product.allergenInfo),
//         nutrition: safeString(product.nutrition),
//         cuisine: safeString(product.cuisine),
//         directions: safeString(product.directions),
        
//         State: safeString(product.State),
        
//         category: product.category ? 
//           (typeof product.category === 'object' ? product.category._id : product.category) : null,
//         subcategory: product.subcategory ? 
//           (typeof product.subcategory === 'object' ? product.subcategory._id : product.subcategory) : null,
//         categoryName: categoryName,
//         subcategoryName: subcategoryName,
        
//         image: product.image && typeof product.image === "string" ? 
//           (product.image.startsWith('http') ? product.image : 
//            `${process.env.BASE_URL || 'http://localhost:5000'}${product.image}`) : null,
//         gallery: Array.isArray(product.gallery) ? 
//           product.gallery.map(img => 
//             img.startsWith('http') ? img : 
//             `${process.env.BASE_URL || 'http://localhost:5000'}${img}`
//           ).filter(img => img) : [],
        
//         vendor: isVendor ? product.vendor : null,
//         isVendorProduct: isVendor,
//         vendorName: isVendor && product.vendor ? 
//           (typeof product.vendor === 'object' ? 
//             (product.vendor.storeName || product.vendor.name || "") : "") : "",
//         vendorId: isVendor && product.vendor ? 
//           (typeof product.vendor === 'object' ? product.vendor._id : product.vendor) : null,
//         vendorDetails: isVendor && product.vendor && typeof product.vendor === 'object' ? {
//           storeName: product.vendor.storeName,
//           name: product.vendor.name,
//           email: product.vendor.email,
//           phone: product.vendor.phone,
//           address: product.vendor.address
//         } : null,
        
//         createdAt: product.createdAt,
//         updatedAt: product.updatedAt,
//         slug: product.slug || null,
//       };
      
//       // Clean up empty values
//       Object.keys(mappedProduct).forEach(key => {
//         if (mappedProduct[key] === "" || mappedProduct[key] === null) {
//           delete mappedProduct[key];
//         }
//       });
      
//       return mappedProduct;
//     };
    
//     const mappedProduct = mapProductData(product, isVendorProduct);
    
//     return res.status(200).json({
//       success: true,
//       data: mappedProduct
//     });
    
//   } catch (error) {
//     console.error("❌ GET PUBLIC PRODUCT BY ID ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch product",
//       error: error.message
//     });
//   }
// };

// // Export both functions
// module.exports = {
//   getPublicProducts,
//   getPublicProductById
// };
// // // Export karo
// // module.exports = {
// //   getPublicProducts
// // };
const Product = require("../models/Product");
const VendorProduct = require("../models/VendorProduct");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Vendor = require("../models/Vendor");

// ✅ Helper: generate URL-friendly slug from product name
const generateSlug = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/* =====================================================
   GET PUBLIC PRODUCTS (ADMIN + VENDOR) - COMPLETE FIXED
===================================================== */
const getPublicProducts = async (req, res) => {
  try {
    console.log("🟢 GET PUBLIC PRODUCTS API CALLED");
    
    const { 
      page = 1, 
      limit = 50, 
      category, 
      subcategory, 
      search, 
      minPrice, 
      maxPrice,
      quality,
      dietPreference,
      state,
      sort = '-createdAt'
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const adminQuery = {};
    const vendorQuery = {};

    if (category) {
      adminQuery.category = category;
      vendorQuery.category = category;
    }
    
    if (subcategory) {
      adminQuery.subcategory = subcategory;
      vendorQuery.subcategory = subcategory;
    }
    
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      adminQuery.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { brandName: searchRegex },
        { restaurantName: searchRegex }
      ];
      vendorQuery.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { brandName: searchRegex },
        { restaurantName: searchRegex }
      ];
    }
    
    if (quality) {
      adminQuery.quality = quality;
      vendorQuery.quality = quality;
    }
    
    if (dietPreference) {
      adminQuery.dietPreference = dietPreference;
      vendorQuery.dietPreference = dietPreference;
    }
    
    if (state) {
      adminQuery.State = state;
      vendorQuery.State = state;
    }
    
    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.$gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.$lte = parseFloat(maxPrice);
      adminQuery.price = priceFilter;
      vendorQuery.price = priceFilter;
    }
    
    const [adminProducts, vendorProducts, adminTotal, vendorTotal] = await Promise.all([
      Product.find(adminQuery)
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      
      VendorProduct.find(vendorQuery)
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .populate('vendor', 'storeName name email phone')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      
      Product.countDocuments(adminQuery),
      VendorProduct.countDocuments(vendorQuery)
    ]);

    console.log(`📊 Admin Products: ${adminProducts.length}, Vendor Products: ${vendorProducts.length}`);

    const mapProductData = (product, isVendor = false) => {
      const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
      const safeNumber = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
      };
      const safeArray = (value) => {
        if (Array.isArray(value)) return value.filter(item => item && item.trim() !== '');
        if (typeof value === 'string' && value.trim() !== '') {
          return value.split(',').map(item => item.trim()).filter(item => item !== '');
        }
        return [];
      };
      
      const categoryName = product.category ? 
        (typeof product.category === 'object' ? product.category.name : '') : '';
      const subcategoryName = product.subcategory ? 
        (typeof product.subcategory === 'object' ? product.subcategory.name : '') : '';

      // ✅ SLUG: Use DB slug if exists, otherwise generate from name
      const productSlug = product.slug 
        ? product.slug 
        : generateSlug(product.name);
      
      const mappedProduct = {
        // ================= BASIC INFO =================
        id: product._id,
        name: safeString(product.name),
        description: safeString(product.description),
        brandName: safeString(product.brandName),
        price: isVendor ? safeNumber(product.price) : safeNumber(product.price || product.newPrice),
        oldPrice: safeNumber(product.oldPrice),
        stock: safeNumber(product.stock),
        quality: safeString(product.quality) || "Standard",
        dietPreference: safeString(product.dietPreference) || "Veg",
        restaurantName: safeString(product.restaurantName) || "Havbit",
        
        // ================= SLUG (SEO URL) =================
        slug: productSlug, // ✅ always present now

        // ================= VARIATIONS =================
        hasVariations: isVendor ? false : (product.hasVariations || false),
        variations: isVendor ? [] : (Array.isArray(product.variations) ? product.variations : []),
        
        // ================= PRODUCT DETAILS =================
        productTypes: safeString(product.productTypes),
        flavors: safeArray(product.flavors),
        size: safeArray(product.size),
        materialTypes: safeString(product.materialTypes),
        ingredients: safeString(product.ingredients),
        customWeight: safeString(product.customWeight),
        customSizeInput: safeString(product.customSizeInput),
        ageRange: safeString(product.ageRange),
        containerType: safeString(product.containerType),
        itemForm: safeString(product.itemForm),
        specialty: safeString(product.specialty),
        itemTypeName: safeString(product.itemTypeName),
        countryOfOrigin: safeString(product.countryOfOrigin),
        
        // ================= COMPLIANCE =================
        fssaiLicense: safeString(product.fssaiLicense),
        legalDisclaimer: safeString(product.legalDisclaimer),
        shelfLife: safeString(product.shelfLife),
        
        // ================= MANUFACTURING =================
        manufacturerName: safeString(product.manufacturerName || product.manufacturer),
        manufacturerAddress: safeString(product.manufacturerAddress || product.manufacturerContact),
        manufacturer: safeString(product.manufacturer || product.manufacturerName),
        manufacturerContact: safeString(product.manufacturerContact || product.manufacturerAddress),
        
        // ================= PACKAGER =================
        packagerName: safeString(product.packagerName),
        packagerAddress: safeString(product.packagerAddress),
        packagerFssaiLicense: safeString(product.packagerFssaiLicense),
        packerContact: safeString(product.packerContact),
        
        // ================= MARKETER =================
        marketerName: safeString(product.marketerName),
        marketerAddress: safeString(product.marketerAddress),
        marketerNameAddress: safeString(product.marketerNameAddress),
        
        // ================= PACKAGE DETAILS =================
        packageColour: safeString(product.packageColour),
        measurementUnit: safeString(product.measurementUnit),
        unitCount: safeString(product.unitCount),
        numberOfItems: safeString(product.numberOfItems),
        itemWeight: safeString(product.itemWeight),
        totalEaches: safeString(product.totalEaches),
        itemPackageWeight: safeString(product.itemPackageWeight),
        
        // ================= DIETARY & NUTRITION =================
        dietaryPreferences: safeString(product.dietaryPreferences),
        allergenInformation: safeString(product.allergenInformation || product.allergenInfo),
        nutrition: safeString(product.nutrition),
        cuisine: safeString(product.cuisine),
        directions: safeString(product.directions),
        
        // ================= LOCATION =================
        State: safeString(product.State),
        
        // ================= CATEGORY =================
        category: product.category ? 
          (typeof product.category === 'object' ? product.category._id : product.category) : null,
        subcategory: product.subcategory ? 
          (typeof product.subcategory === 'object' ? product.subcategory._id : product.subcategory) : null,
        categoryName: categoryName,
        subcategoryName: subcategoryName,
        
        // ================= MEDIA =================
        image: product.image && typeof product.image === "string" ? 
          (product.image.startsWith('http') ? product.image : 
           `${process.env.BASE_URL || 'http://localhost:5000'}${product.image}`) : null,
        gallery: Array.isArray(product.gallery) ? 
          product.gallery.map(img => 
            img.startsWith('http') ? img : 
            `${process.env.BASE_URL || 'http://localhost:5000'}${img}`
          ).filter(img => img) : [],
        
        // ================= VENDOR INFO =================
        vendor: isVendor ? product.vendor : null,
        isVendorProduct: isVendor,
        vendorName: isVendor && product.vendor ? 
          (typeof product.vendor === 'object' ? 
            (product.vendor.storeName || product.vendor.name || "") : "") : "",
        vendorId: isVendor && product.vendor ? 
          (typeof product.vendor === 'object' ? product.vendor._id : product.vendor) : null,
        
        // ================= TIMESTAMPS =================
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
      
      // Clean up - remove empty strings and null values
      // ✅ IMPORTANT: slug ko delete mat karo even if empty
      Object.keys(mappedProduct).forEach(key => {
        if (key !== 'slug' && (mappedProduct[key] === "" || mappedProduct[key] === null)) {
          delete mappedProduct[key];
        }
      });
      
      return mappedProduct;
    };
    
    const mappedAdminProducts = adminProducts.map(p => mapProductData(p, false));
    const mappedVendorProducts = vendorProducts.map(p => mapProductData(p, true));
    
    const allProducts = [...mappedAdminProducts, ...mappedVendorProducts];
    
    const sortProducts = (products, sortBy) => {
      return products.sort((a, b) => {
        if (sortBy.startsWith('-')) {
          const field = sortBy.substring(1);
          return new Date(b[field] || b.createdAt) - new Date(a[field] || a.createdAt);
        } else {
          const field = sortBy;
          return new Date(a[field] || a.createdAt) - new Date(b[field] || b.createdAt);
        }
      });
    };
    
    const sortedProducts = sortProducts(allProducts, sort);
    
    const totalProducts = adminTotal + vendorTotal;
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    
    console.log(`✅ Total Public Products: ${sortedProducts.length}`);
    
    return res.status(200).json({
      success: true,
      count: sortedProducts.length,
      total: totalProducts,
      page: parseInt(page),
      pages: totalPages,
      limit: parseInt(limit),
      data: sortedProducts,
      filters: {
        category: category || null,
        subcategory: subcategory || null,
        search: search || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        quality: quality || null,
        dietPreference: dietPreference || null,
        state: state || null,
        sort: sort
      }
    });
    
  } catch (error) {
    console.error("❌ GET PUBLIC PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch public products",
      error: error.message,
    });
  }
};

/* =====================================================
   GET SINGLE PUBLIC PRODUCT BY SLUG ✅ (was: by ID)
===================================================== */
const getPublicProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Product slug is required"
      });
    }

    // ✅ Try to find by slug field first
    let product = await Product.findOne({ slug })
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .lean();
    
    let isVendorProduct = false;
    
    // ✅ If not found by slug, try generating slug from name and matching
    if (!product) {
      const allAdminProducts = await Product.find({})
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .lean();
      
      product = allAdminProducts.find(p => generateSlug(p.name) === slug);
    }

    // ✅ Try vendor products by slug
    if (!product) {
      product = await VendorProduct.findOne({ slug })
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .populate('vendor', 'storeName name email phone address')
        .lean();
      
      if (product) isVendorProduct = true;
    }

    // ✅ Try vendor products by name-generated slug
    if (!product) {
      const allVendorProducts = await VendorProduct.find({})
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .populate('vendor', 'storeName name email phone address')
        .lean();
      
      product = allVendorProducts.find(p => generateSlug(p.name) === slug);
      if (product) isVendorProduct = true;
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
    const safeNumber = (value) => {
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    };
    const safeArray = (value) => {
      if (Array.isArray(value)) return value.filter(item => item && item.trim() !== '');
      if (typeof value === 'string' && value.trim() !== '') {
        return value.split(',').map(item => item.trim()).filter(item => item !== '');
      }
      return [];
    };

    const categoryName = product.category ? 
      (typeof product.category === 'object' ? product.category.name : '') : '';
    const subcategoryName = product.subcategory ? 
      (typeof product.subcategory === 'object' ? product.subcategory.name : '') : '';

    const mappedProduct = {
      id: product._id,
      slug: product.slug || generateSlug(product.name), // ✅
      name: safeString(product.name),
      description: safeString(product.description),
      brandName: safeString(product.brandName),
      price: isVendorProduct ? safeNumber(product.price) : safeNumber(product.price || product.newPrice),
      oldPrice: safeNumber(product.oldPrice),
      stock: safeNumber(product.stock),
      quality: safeString(product.quality) || "Standard",
      dietPreference: safeString(product.dietPreference) || "Veg",
      restaurantName: safeString(product.restaurantName) || "Havbit",
      hasVariations: isVendorProduct ? false : (product.hasVariations || false),
      variations: isVendorProduct ? [] : (Array.isArray(product.variations) ? product.variations : []),
      productTypes: safeString(product.productTypes),
      flavors: safeArray(product.flavors),
      size: safeArray(product.size),
      materialTypes: safeString(product.materialTypes),
      ingredients: safeString(product.ingredients),
      ageRange: safeString(product.ageRange),
      containerType: safeString(product.containerType),
      itemForm: safeString(product.itemForm),
      specialty: safeString(product.specialty),
      itemTypeName: safeString(product.itemTypeName),
      countryOfOrigin: safeString(product.countryOfOrigin),
      fssaiLicense: safeString(product.fssaiLicense),
      legalDisclaimer: safeString(product.legalDisclaimer),
      shelfLife: safeString(product.shelfLife),
      manufacturer: safeString(product.manufacturer || product.manufacturerName),
      manufacturerContact: safeString(product.manufacturerContact || product.manufacturerAddress),
      packagerName: safeString(product.packagerName),
      packagerFssaiLicense: safeString(product.packagerFssaiLicense),
      packerContact: safeString(product.packerContact),
      marketerNameAddress: safeString(product.marketerNameAddress),
      packageColour: safeString(product.packageColour),
      measurementUnit: safeString(product.measurementUnit),
      unitCount: safeString(product.unitCount),
      numberOfItems: safeString(product.numberOfItems),
      itemWeight: safeString(product.itemWeight),
      totalEaches: safeString(product.totalEaches),
      itemPackageWeight: safeString(product.itemPackageWeight),
      dietaryPreferences: safeString(product.dietaryPreferences),
      allergenInformation: safeString(product.allergenInformation || product.allergenInfo),
      nutrition: safeString(product.nutrition),
      cuisine: safeString(product.cuisine),
      directions: safeString(product.directions),
      State: safeString(product.State),
      category: product.category ? 
        (typeof product.category === 'object' ? product.category._id : product.category) : null,
      subcategory: product.subcategory ? 
        (typeof product.subcategory === 'object' ? product.subcategory._id : product.subcategory) : null,
      categoryName,
      subcategoryName,
      image: product.image && typeof product.image === "string" ? 
        (product.image.startsWith('http') ? product.image : 
         `${process.env.BASE_URL || 'http://localhost:5000'}${product.image}`) : null,
      gallery: Array.isArray(product.gallery) ? 
        product.gallery.map(img => 
          img.startsWith('http') ? img : 
          `${process.env.BASE_URL || 'http://localhost:5000'}${img}`
        ).filter(Boolean) : [],
      vendor: isVendorProduct ? product.vendor : null,
      isVendorProduct,
      vendorName: isVendorProduct && product.vendor ? 
        (typeof product.vendor === 'object' ? 
          (product.vendor.storeName || product.vendor.name || "") : "") : "",
      vendorId: isVendorProduct && product.vendor ? 
        (typeof product.vendor === 'object' ? product.vendor._id : product.vendor) : null,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    Object.keys(mappedProduct).forEach(key => {
      if (key !== 'slug' && (mappedProduct[key] === "" || mappedProduct[key] === null)) {
        delete mappedProduct[key];
      }
    });
    
    return res.status(200).json({
      success: true,
      data: mappedProduct
    });
    
  } catch (error) {
    console.error("❌ GET PUBLIC PRODUCT BY SLUG ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message
    });
  }
};

// ✅ Keep old ID-based function for backward compatibility
const getPublicProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }
    
    let product = await Product.findById(id)
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .lean();
    
    let isVendorProduct = false;
    
    if (!product) {
      product = await VendorProduct.findById(id)
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .populate('vendor', 'storeName name email phone address')
        .lean();
      
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      isVendorProduct = true;
    }

    // ✅ Redirect to slug-based URL (optional - or just return data)
    const slug = product.slug || generateSlug(product.name);
    
    return res.status(200).json({
      success: true,
      slug, // ✅ frontend can use this to redirect
      data: { ...product, slug }
    });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch product", error: error.message });
  }
};

module.exports = {
  getPublicProducts,
  getPublicProductById,
  getPublicProductBySlug, // ✅ new export
};
