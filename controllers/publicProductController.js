



const Product = require("../models/Product");
const VendorProduct = require("../models/VendorProduct");

/* =====================================================
   GET PUBLIC PRODUCTS (ADMIN + VENDOR)
===================================================== */
const getPublicProducts = async (req, res) => {
  try {
    // Admin products
    const adminProducts = await Product.find().lean();

    // Vendor products
    const vendorProducts = await VendorProduct.find().lean();

    // Merge & sanitize data
    const mergedProducts = [...adminProducts, ...vendorProducts].map(p => ({
      /* ================= BASIC INFO ================= */
      id: p._id,
      name: p.name,
      description: p.description || "",
      brandName: p.brandName || "",
      price: p.newPrice || 0,
      oldPrice: p.oldPrice || 0,
      stock: p.stock || 0,
      quality: p.quality || "Standard",
      dietPreference: p.dietPreference || "Veg",
      restaurantName: p.restaurantName || "Havbit",

      /* ================= PRODUCT DETAILS ================= */
      productTypes: p.productTypes || "",
      flavors: Array.isArray(p.flavors) ? p.flavors : [],
      size: Array.isArray(p.size) ? p.size : [],
      materialTypes: p.materialTypes || "",
      ingredients: p.ingredients || "",
      customWeight: p.customWeight || "",
      customSizeInput: p.customSizeInput || "",
      ageRange: p.ageRange || "",
      containerType: p.containerType || "",
      itemForm: p.itemForm || "",
      specialty: p.specialty || "",
      itemTypeName: p.itemTypeName || "",
      countryOfOrigin: p.countryOfOrigin || "",

      /* ================= COMPLIANCE ================= */
      brandName: p.brandName || "",
      fssaiLicense: p.fssaiLicense || "",
      legalDisclaimer: p.legalDisclaimer || "",
      shelfLife: p.shelfLife || "",

      /* ================= MANUFACTURING ================= */
      manufacturer: p.manufacturer || "",
      manufacturerContact: p.manufacturerContact || "",
      packerContact: p.packerContact || "",
      marketerNameAddress: p.marketerNameAddress || "",

      /* ================= PACKAGE DETAILS ================= */
      packageColour: p.packageColour || "",
      measurementUnit: p.measurementUnit || "",
      unitCount: p.unitCount || "",
      numberOfItems: p.numberOfItems || "",
      itemWeight: p.itemWeight || "",
      totalEaches: p.totalEaches || "",
      itemPackageWeight: p.itemPackageWeight || "",

      /* ================= DIETARY & NUTRITION ================= */
      dietaryPreferences: p.dietaryPreferences || "",
      allergenInfo: p.allergenInfo || "",
      allergenInformation: p.allergenInformation || "",
      nutrition: p.nutrition || "",
      cuisine: p.cuisine || "",
      directions: p.directions || "",

      /* ================= LOCATION ================= */
      State: p.State || "",

      /* ================= CATEGORY ================= */
      category: p.category || null,
      subcategory: p.subcategory || null,

      /* ================= MEDIA ================= */
      image: p.image && typeof p.image === "string" && p.image.startsWith("http")
        ? p.image
        : null,

      gallery: Array.isArray(p.gallery)
        ? p.gallery.filter(img => typeof img === "string" && img.startsWith("http"))
        : [],

      /* ================= VENDOR ================= */
      vendor: p.vendor || null,

      /* ================= TIMESTAMPS ================= */
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      count: mergedProducts.length,
      data: mergedProducts,
    });
  } catch (error) {
    console.error("GET PUBLIC PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch public products",
    });
  }
};

// Export karo
module.exports = {
  getPublicProducts
};



