



// const Product = require("../models/Product");
// const VendorProduct = require("../models/VendorProduct");

// /* =====================================================
//    GET PUBLIC PRODUCTS (ADMIN + VENDOR)
// ===================================================== */
// const getPublicProducts = async (req, res) => {
//   try {
//     // Admin products
//     const adminProducts = await Product.find().lean();

//     // Vendor products
//     const vendorProducts = await VendorProduct.find().lean();

//     // Merge & sanitize data
//     const mergedProducts = [...adminProducts, ...vendorProducts].map(p => ({
//       /* ================= BASIC INFO ================= */
//       id: p._id,
//       name: p.name,
//       description: p.description || "",
//       brandName: p.brandName || "",
//       price: p.newPrice || 0,
//       oldPrice: p.oldPrice || 0,
//       stock: p.stock || 0,
//       quality: p.quality || "Standard",
//       dietPreference: p.dietPreference || "Veg",
//       restaurantName: p.restaurantName || "Havbit",

//       /* ================= PRODUCT DETAILS ================= */
//       productTypes: p.productTypes || "",
//       flavors: Array.isArray(p.flavors) ? p.flavors : [],
//       size: Array.isArray(p.size) ? p.size : [],
//       materialTypes: p.materialTypes || "",
//       ingredients: p.ingredients || "",
//       customWeight: p.customWeight || "",
//       customSizeInput: p.customSizeInput || "",
//       ageRange: p.ageRange || "",
//       containerType: p.containerType || "",
//       itemForm: p.itemForm || "",
//       specialty: p.specialty || "",
//       itemTypeName: p.itemTypeName || "",
//       countryOfOrigin: p.countryOfOrigin || "",

//       /* ================= COMPLIANCE ================= */
//       brandName: p.brandName || "",
//       fssaiLicense: p.fssaiLicense || "",
//       legalDisclaimer: p.legalDisclaimer || "",
//       shelfLife: p.shelfLife || "",

//       /* ================= MANUFACTURING ================= */
//       manufacturer: p.manufacturer || "",
//       manufacturerContact: p.manufacturerContact || "",
//       packerContact: p.packerContact || "",
//       marketerNameAddress: p.marketerNameAddress || "",

//       /* ================= PACKAGE DETAILS ================= */
//       packageColour: p.packageColour || "",
//       measurementUnit: p.measurementUnit || "",
//       unitCount: p.unitCount || "",
//       numberOfItems: p.numberOfItems || "",
//       itemWeight: p.itemWeight || "",
//       totalEaches: p.totalEaches || "",
//       itemPackageWeight: p.itemPackageWeight || "",

//       /* ================= DIETARY & NUTRITION ================= */
//       dietaryPreferences: p.dietaryPreferences || "",
//       allergenInfo: p.allergenInfo || "",
//       allergenInformation: p.allergenInformation || "",
//       nutrition: p.nutrition || "",
//       cuisine: p.cuisine || "",
//       directions: p.directions || "",

//       /* ================= LOCATION ================= */
//       State: p.State || "",

//       /* ================= CATEGORY ================= */
//       category: p.category || null,
//       subcategory: p.subcategory || null,

//       /* ================= MEDIA ================= */
//       image: p.image && typeof p.image === "string" && p.image.startsWith("http")
//         ? p.image
//         : null,

//       gallery: Array.isArray(p.gallery)
//         ? p.gallery.filter(img => typeof img === "string" && img.startsWith("http"))
//         : [],

//       /* ================= VENDOR ================= */
//       vendor: p.vendor || null,

//       /* ================= TIMESTAMPS ================= */
//       createdAt: p.createdAt,
//       updatedAt: p.updatedAt,
//     }));

//     return res.status(200).json({
//       success: true,
//       count: mergedProducts.length,
//       data: mergedProducts,
//     });
//   } catch (error) {
//     console.error("GET PUBLIC PRODUCTS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch public products",
//     });
//   }
// };

// // Export karo
// module.exports = {
//   getPublicProducts
// };






const Product = require("../models/Product");
const VendorProduct = require("../models/VendorProduct");

/* =====================================================
   GET PUBLIC PRODUCTS (ADMIN + VENDOR) - COMPLETE VERSION
===================================================== */
const getPublicProducts = async (req, res) => {
  try {
    // Query parameters
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      category = '', 
      quality = '', 
      dietPreference = '',
      minPrice = 0,
      maxPrice = 1000000,
      sort = '-createdAt',
      State = '',
      hasVariations = '',
      inStock = ''
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build base query for Admin Products
    const adminQuery = {};
    const vendorQuery = {};

    // ========== SEARCH FILTER ==========
    if (search) {
      const searchRegex = { $regex: search, $options: 'i' };
      adminQuery.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { brandName: searchRegex },
        { restaurantName: searchRegex },
        { 'variations.size': searchRegex },
        { 'variations.flavor': searchRegex }
      ];
      
      vendorQuery.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { brandName: searchRegex },
        { restaurantName: searchRegex },
        { 'variations.size': searchRegex },
        { 'variations.flavor': searchRegex }
      ];
    }

    // ========== CATEGORY FILTER ==========
    if (category) {
      adminQuery.category = category;
      vendorQuery.category = category;
    }

    // ========== QUALITY FILTER ==========
    if (quality) {
      adminQuery.quality = quality;
      vendorQuery.quality = quality;
    }

    // ========== DIET PREFERENCE FILTER ==========
    if (dietPreference) {
      adminQuery.dietPreference = dietPreference;
      vendorQuery.dietPreference = dietPreference;
    }

    // ========== STATE FILTER ==========
    if (State) {
      adminQuery.State = { $regex: State, $options: 'i' };
      vendorQuery.State = { $regex: State, $options: 'i' };
    }

    // ========== HAS VARIATIONS FILTER ==========
    if (hasVariations === 'true') {
      adminQuery.hasVariations = true;
      vendorQuery.hasVariations = true;
    } else if (hasVariations === 'false') {
      adminQuery.hasVariations = false;
      vendorQuery.hasVariations = false;
    }

    // ========== PRICE FILTER ==========
    const minPriceNum = parseFloat(minPrice);
    const maxPriceNum = parseFloat(maxPrice);
    
    adminQuery.$or = [
      {
        $and: [
          { hasVariations: false },
          { price: { $gte: minPriceNum } },
          { price: { $lte: maxPriceNum } }
        ]
      },
      {
        $and: [
          { hasVariations: true },
          { 'variations.newPrice': { $gte: minPriceNum } },
          { 'variations.newPrice': { $lte: maxPriceNum } }
        ]
      }
    ];
    
    vendorQuery.$or = [
      {
        $and: [
          { hasVariations: false },
          { newPrice: { $gte: minPriceNum } },
          { newPrice: { $lte: maxPriceNum } }
        ]
      },
      {
        $and: [
          { hasVariations: true },
          { 'variations.newPrice': { $gte: minPriceNum } },
          { 'variations.newPrice': { $lte: maxPriceNum } }
        ]
      }
    ];

    // ========== STOCK FILTER ==========
    if (inStock === 'true') {
      adminQuery.$or = [
        { stock: { $gt: 0 } },
        { 'variations.stock': { $gt: 0 } }
      ];
      
      vendorQuery.$or = [
        { stock: { $gt: 0 } },
        { 'variations.stock': { $gt: 0 } }
      ];
    } else if (inStock === 'false') {
      adminQuery.$and = [
        { $or: [
          { stock: { $lte: 0 } },
          { stock: { $exists: false } }
        ]},
        { $or: [
          { 'variations.stock': { $lte: 0 } },
          { 'variations.stock': { $exists: false } }
        ]}
      ];
      
      vendorQuery.$and = [
        { $or: [
          { stock: { $lte: 0 } },
          { stock: { $exists: false } }
        ]},
        { $or: [
          { 'variations.stock': { $lte: 0 } },
          { 'variations.stock': { $exists: false } }
        ]}
      ];
    }

    // ========== SORTING ==========
    let sortOptions = {};
    switch (sort) {
      case 'price-asc':
        sortOptions = { price: 1 };
        break;
      case 'price-desc':
        sortOptions = { price: -1 };
        break;
      case 'name-asc':
        sortOptions = { name: 1 };
        break;
      case 'name-desc':
        sortOptions = { name: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    // ========== FETCH DATA ==========
    // Parallel queries for better performance
    const [adminProducts, vendorProducts, adminTotal, vendorTotal] = await Promise.all([
      Product.find(adminQuery)
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .populate('vendor', 'storeName email phone')
        .sort(sortOptions)
        .limit(limitNum)
        .skip(skip)
        .lean(),
      
      VendorProduct.find(vendorQuery)
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .populate('vendor', 'storeName email phone')
        .sort(sortOptions)
        .limit(limitNum)
        .skip(skip)
        .lean(),
      
      Product.countDocuments(adminQuery),
      VendorProduct.countDocuments(vendorQuery)
    ]);

    // ========== MERGE AND TRANSFORM ==========
    const transformProduct = (product, isVendorProduct = false) => {
      const priceField = isVendorProduct ? 'newPrice' : 'price';
      const oldPriceField = isVendorProduct ? 'oldPrice' : 'oldPrice';
      
      return {
        /* ================= BASIC INFORMATION ================= */
        id: product._id.toString(),
        name: product.name || '',
        description: product.description || '',
        restaurantName: product.restaurantName || 'Havbit',
        slug: product.slug || '',
        hasVariations: product.hasVariations || false,
        
        /* ================= PRICING ================= */
        oldPrice: product[oldPriceField] || 0,
        price: product[priceField] || 0,
        stock: product.stock || 0,
        quality: product.quality || 'Standard',
        dietPreference: product.dietPreference || 'Veg',
        
        /* ================= VARIATIONS ================= */
        variations: Array.isArray(product.variations) ? product.variations.map(v => ({
          variationId: v.variationId || `var_${Date.now()}`,
          size: v.size || '',
          flavor: v.flavor || '',
          oldPrice: v.oldPrice || 0,
          price: v.newPrice || v.price || 0,
          stock: v.stock || 0,
          sku: v.sku || '',
          image: v.image || ''
        })) : [],
        
        /* ================= PRODUCT DETAILS ================= */
        productTypes: product.productTypes || '',
        materialTypes: product.materialTypes || '',
        ingredients: product.ingredients || '',
        customWeight: product.customWeight || '',
        customSizeInput: product.customSizeInput || '',
        ageRange: product.ageRange || '',
        containerType: product.containerType || '',
        itemForm: product.itemForm || '',
        specialty: product.specialty || '',
        itemTypeName: product.itemTypeName || '',
        countryOfOrigin: product.countryOfOrigin || '',
        
        /* ================= FLAVORS AND SIZES ================= */
        flavors: Array.isArray(product.flavors) ? product.flavors : [],
        size: Array.isArray(product.size) ? product.size : [],
        
        /* ================= COMPLIANCE ================= */
        fssaiLicense: product.fssaiLicense || '',
        brandName: product.brandName || '',
        legalDisclaimer: product.legalDisclaimer || '',
        
        /* ================= MANUFACTURING ================= */
        manufacturer: product.manufacturer || '',
        manufacturerName: product.manufacturerName || '',
        manufacturerAddress: product.manufacturerAddress || '',
        manufacturerContact: product.manufacturerContact || '',
        
        /* ================= PACKAGER ================= */
        packagerName: product.packagerName || '',
        packagerAddress: product.packagerAddress || '',
        packagerFssaiLicense: product.packagerFssaiLicense || '',
        packerContact: product.packerContact || '',
        
        /* ================= MARKETER ================= */
        marketerName: product.marketerName || '',
        marketerAddress: product.marketerAddress || '',
        marketerNameAddress: product.marketerNameAddress || '',
        
        /* ================= PACKAGE DETAILS ================= */
        packageColour: product.packageColour || '',
        measurementUnit: product.measurementUnit || '',
        unitCount: product.unitCount || '',
        numberOfItems: product.numberOfItems || '',
        itemWeight: product.itemWeight || '',
        totalEaches: product.totalEaches || '',
        itemPackageWeight: product.itemPackageWeight || '',
        shelfLife: product.shelfLife || '',
        
        /* ================= DIETARY & NUTRITION ================= */
        dietaryPreferences: product.dietaryPreferences || '',
        allergenInformation: product.allergenInformation || '',
        nutrition: product.nutrition || '',
        cuisine: product.cuisine || '',
        directions: product.directions || '',
        
        /* ================= LOCATION ================= */
        State: product.State || '',
        
        /* ================= CATEGORY ================= */
        category: product.category ? {
          id: product.category._id,
          name: product.category.name,
          image: product.category.image || ''
        } : null,
        
        subcategory: product.subcategory ? {
          id: product.subcategory._id,
          name: product.subcategory.name,
          image: product.subcategory.image || ''
        } : null,
        
        /* ================= VENDOR INFO ================= */
        vendor: product.vendor ? {
          id: product.vendor._id,
          storeName: product.vendor.storeName || '',
          email: product.vendor.email || '',
          phone: product.vendor.phone || ''
        } : null,
        
        /* ================= IMAGES ================= */
        image: (product.image && typeof product.image === 'string' && 
                (product.image.startsWith('http') || product.image.startsWith('data:'))) 
               ? product.image 
               : null,
        
        gallery: Array.isArray(product.gallery) 
          ? product.gallery.filter(img => 
              img && typeof img === 'string' && 
              (img.startsWith('http') || img.startsWith('data:'))
            )
          : [],
        
        /* ================= STOCK STATUS ================= */
        inStock: product.hasVariations 
          ? (product.variations || []).some(v => (v.stock || 0) > 0)
          : (product.stock || 0) > 0,
        
        /* ================= PRODUCT TYPE ================= */
        productType: isVendorProduct ? 'vendor' : 'admin',
        
        /* ================= TIMESTAMPS ================= */
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        
        /* ================= EXTRA FIELDS ================= */
        discountPercentage: product[oldPriceField] > 0 
          ? Math.round(((product[oldPriceField] - product[priceField]) / product[oldPriceField]) * 100)
          : 0,
        
        isBestSeller: product.isBestSeller || false,
        isFeatured: product.isFeatured || false,
        isNewArrival: product.isNewArrival || false,
        rating: product.rating || 0,
        totalReviews: product.totalReviews || 0
      };
    };

    // Transform all products
    const transformedAdminProducts = adminProducts.map(p => transformProduct(p, false));
    const transformedVendorProducts = vendorProducts.map(p => transformProduct(p, true));
    
    // Merge products
    const mergedProducts = [...transformedAdminProducts, ...transformedVendorProducts];
    
    // Apply additional sorting if needed (for merged results)
    if (sort === 'price-asc') {
      mergedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      mergedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'name-asc') {
      mergedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      mergedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Calculate totals
    const totalProducts = adminTotal + vendorTotal;
    const totalPages = Math.ceil(totalProducts / limitNum);

    return res.status(200).json({
      success: true,
      count: mergedProducts.length,
      total: totalProducts,
      page: pageNum,
      pages: totalPages,
      filters: {
        search,
        category,
        quality,
        dietPreference,
        minPrice: minPriceNum,
        maxPrice: maxPriceNum,
        State,
        hasVariations,
        inStock,
        sort
      },
      data: mergedProducts
    });

  } catch (error) {
    console.error("GET PUBLIC PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch public products",
      error: error.message
    });
  }
};

/* =====================================================
   GET SINGLE PUBLIC PRODUCT BY ID/SLUG
===================================================== */
const getPublicProduct = async (req, res) => {
  try {
    const { id, slug } = req.params;

    let product = null;
    let isVendorProduct = false;

    // Try to find by ID first
    if (id) {
      // Check in Admin Products
      product = await Product.findById(id)
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .populate('vendor', 'storeName email phone address')
        .lean();
      
      // If not found in Admin, check Vendor Products
      if (!product) {
        product = await VendorProduct.findById(id)
          .populate('category', 'name image')
          .populate('subcategory', 'name image')
          .populate('vendor', 'storeName email phone address')
          .lean();
        isVendorProduct = true;
      }
    } 
    // Try to find by slug
    else if (slug) {
      product = await Product.findOne({ slug })
        .populate('category', 'name image')
        .populate('subcategory', 'name image')
        .populate('vendor', 'storeName email phone address')
        .lean();
      
      if (!product) {
        product = await VendorProduct.findOne({ slug })
          .populate('category', 'name image')
          .populate('subcategory', 'name image')
          .populate('vendor', 'storeName email phone address')
          .lean();
        isVendorProduct = true;
      }
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Transform product
    const transformedProduct = {
      /* ================= BASIC INFORMATION ================= */
      id: product._id.toString(),
      name: product.name || '',
      description: product.description || '',
      restaurantName: product.restaurantName || 'Havbit',
      slug: product.slug || '',
      hasVariations: product.hasVariations || false,
      
      /* ================= PRICING ================= */
      oldPrice: isVendorProduct ? (product.oldPrice || 0) : (product.oldPrice || 0),
      price: isVendorProduct ? (product.newPrice || 0) : (product.price || 0),
      stock: product.stock || 0,
      quality: product.quality || 'Standard',
      dietPreference: product.dietPreference || 'Veg',
      
      /* ================= ALL OTHER FIELDS ... (same as above) */
      // ... (Copy all fields from transformProduct function above)
    };

    return res.status(200).json({
      success: true,
      data: transformedProduct
    });

  } catch (error) {
    console.error("GET SINGLE PRODUCT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message
    });
  }
};

/* =====================================================
   GET PRODUCTS BY CATEGORY
===================================================== */
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { limit = 20 } = req.query;

    const [adminProducts, vendorProducts] = await Promise.all([
      Product.find({ category: categoryId })
        .populate('category', 'name image')
        .limit(parseInt(limit))
        .lean(),
      
      VendorProduct.find({ category: categoryId })
        .populate('category', 'name image')
        .limit(parseInt(limit))
        .lean()
    ]);

    const transformForCategory = (product, isVendor = false) => ({
      id: product._id,
      name: product.name,
      price: isVendor ? product.newPrice : product.price,
      oldPrice: product.oldPrice || 0,
      image: product.image || null,
      inStock: product.stock > 0,
      discountPercentage: product.oldPrice > 0 
        ? Math.round(((product.oldPrice - (isVendor ? product.newPrice : product.price)) / product.oldPrice) * 100)
        : 0
    });

    const products = [
      ...adminProducts.map(p => transformForCategory(p, false)),
      ...vendorProducts.map(p => transformForCategory(p, true))
    ];

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error("GET PRODUCTS BY CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category products",
      error: error.message
    });
  }
};

// Export all functions
module.exports = {
  getPublicProducts,
  getPublicProduct,
  getProductsByCategory
};
