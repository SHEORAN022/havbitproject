// module.exports = exports;
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
        { restaurantName: { $regex: search, $options: 'i' } }
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
      .populate("vendor", "name email storeName phone")
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
      message: "Server Error: " + err.message
    });
  }
};

/* ================= GET SINGLE VENDOR PRODUCT ================= */
exports.getVendorProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`🟢 GET SINGLE VENDOR PRODUCT: ${id}`);
    
    const product = await VendorProduct.findOne({
      _id: id,
      vendor: req.vendor._id,
    })
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .populate("vendor", "name email storeName phone")
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
    
    const vendor = await Vendor.findById(req.vendor._id);
    if (!vendor) {
      return res.status(404).json({ 
        success: false, 
        message: "Vendor not found" 
      });
    }
    
    const data = { ...req.body };
    
    // Parse formData if present
    if (typeof data.formData === 'string') {
      try {
        data.formData = JSON.parse(data.formData);
      } catch (e) {
        console.log("Could not parse formData as JSON");
      }
    }
    
    // Parse variations - THIS IS CRITICAL
    let variationsData = [];
    if (data.variations) {
      if (typeof data.variations === 'string') {
        try {
          variationsData = JSON.parse(data.variations);
          console.log("📊 Parsed variations from string:", variationsData);
        } catch (e) {
          console.log("❌ Could not parse variations as JSON");
          variationsData = [];
        }
      } else if (Array.isArray(data.variations)) {
        variationsData = data.variations;
        console.log("📊 Variations from array:", variationsData);
      }
    }
    
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
    
    // ===== VALIDATE BASIC FIELDS =====
    if (!data.name && (!data.formData || !data.formData.basic || !data.formData.basic.name)) {
      return res.status(400).json({
        success: false,
        message: "Product name is required"
      });
    }
    
    // Validate category
    let categoryId = data.category || (data.formData && data.formData.category);
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }
    
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category selected"
      });
    }
    
    // Validate subcategory
    let subcategoryId = data.subcategory || (data.formData && data.formData.subcategory);
    if (subcategoryId) {
      const subcategoryExists = await SubCategory.findById(subcategoryId);
      if (!subcategoryExists) {
        subcategoryId = null;
      }
    }
    
    // Extract data based on form structure or direct fields
    let productData = {
      name: '',
      description: '',
      price: 0,
      oldPrice: 0,
      stock: 0,
      quality: 'Standard',
      dietPreference: 'Veg',
      restaurantName: vendor.storeName || vendor.name || "My Store",
      hasVariations: false,
      category: categoryId,
      subcategory: subcategoryId,
      vendor: req.vendor._id,
      status: 'pending_approval'
    };
    
    // Extract from formData or direct fields
    if (data.formData && typeof data.formData === 'object') {
      // Basic info
      productData.name = safeString(data.formData.basic?.name || data.name);
      productData.description = safeString(data.formData.basic?.description || data.description);
      productData.hasVariations = safeBoolean(data.formData.basic?.hasVariations || false);
      
      // Pricing
      if (data.formData.pricing) {
        productData.oldPrice = safeNumber(data.formData.pricing.oldPrice);
        productData.price = safeNumber(data.formData.pricing.newPrice || data.formData.pricing.price);
        productData.stock = safeInt(data.formData.pricing.stock);
        productData.quality = safeString(data.formData.pricing.quality) || "Standard";
        productData.dietPreference = safeString(data.formData.pricing.dietPreference) || "Veg";
      }
      
      // Other fields can be extracted similarly...
    } else {
      // Direct fields
      productData.name = safeString(data.name);
      productData.description = safeString(data.description);
      productData.oldPrice = safeNumber(data.oldPrice);
      productData.price = safeNumber(data.newPrice || data.price);
      productData.stock = safeInt(data.stock);
      productData.quality = safeString(data.quality) || "Standard";
      productData.dietPreference = safeString(data.dietPreference) || "Veg";
      productData.hasVariations = safeBoolean(data.hasVariations || false);
    }
    
    // ===== HANDLE VARIATIONS =====
    console.log("🔍 Checking variations:", {
      hasVariations: productData.hasVariations,
      variationsDataLength: variationsData.length,
      variationsData: variationsData
    });
    
    if (productData.hasVariations) {
      if (variationsData && Array.isArray(variationsData) && variationsData.length > 0) {
        // Process each variation
        productData.variations = variationsData.map((v, index) => {
          // Ensure newPrice exists - this is REQUIRED
          let newPrice = safeNumber(v.newPrice || v.price);
          if (newPrice <= 0 && v.oldPrice > 0) {
            newPrice = safeNumber(v.oldPrice);
          }
          
          const variation = {
            variationId: v.variationId || `var_${Date.now()}_${index}`,
            size: safeString(v.size),
            flavor: safeString(v.flavor),
            oldPrice: safeNumber(v.oldPrice),
            newPrice: newPrice,
            stock: safeInt(v.stock),
            sku: safeString(v.sku) || `SKU-${Date.now()}-${index}`,
            image: safeString(v.image)
          };
          
          return variation;
        }).filter(v => v.newPrice > 0); // Remove invalid variations
        
        console.log(`✅ Valid variations after filtering: ${productData.variations.length}`);
        
        if (productData.variations.length === 0) {
          productData.hasVariations = false;
          console.log("⚠️ No valid variations, setting hasVariations to false");
        } else {
          // Calculate min price and total stock
          const validPrices = productData.variations.map(v => v.newPrice).filter(p => p > 0);
          productData.price = validPrices.length > 0 ? Math.min(...validPrices) : 0;
          productData.stock = productData.variations.reduce((total, v) => total + (v.stock || 0), 0);
        }
      } else {
        console.log("❌ hasVariations is true but no variations data");
        productData.hasVariations = false;
        productData.variations = [];
      }
    } else {
      productData.variations = [];
      
      // Validate non-variation product
      if (!productData.price || productData.price <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be greater than 0 for non-variation products"
        });
      }
    }
    
    // ===== ADD OTHER FIELDS =====
    const fieldMapping = {
      // Basic
      brandName: data.brandName || data.fssaiLicense,
      fssaiLicense: data.fssaiLicense,
      legalDisclaimer: data.legalDisclaimer,
      shelfLife: data.shelfLife,
      
      // Product details
      productTypes: data.productTypes,
      ingredients: data.ingredients,
      materialTypes: data.materialTypes,
      customWeight: data.customWeight,
      customSizeInput: data.customSizeInput,
      ageRange: data.ageRange,
      containerType: data.containerType,
      itemForm: data.itemForm,
      specialty: data.specialty,
      itemTypeName: data.itemTypeName,
      countryOfOrigin: data.countryOfOrigin,
      
      // Arrays
      flavors: safeArray(data.flavors),
      size: safeArray(data.size),
      
      // Manufacturing
      manufacturerName: data.manufacturerName || data.manufacturer,
      manufacturerAddress: data.manufacturerAddress || data.manufacturerContact,
      manufacturer: data.manufacturer || data.manufacturerName,
      manufacturerContact: data.manufacturerContact || data.manufacturerAddress,
      
      // Packager
      packagerName: data.packagerName,
      packagerAddress: data.packagerAddress,
      packagerFssaiLicense: data.packagerFssaiLicense,
      
      // Marketer
      marketerName: data.marketerName,
      marketerAddress: data.marketerAddress,
      
      // Package
      packageColour: data.packageColour,
      measurementUnit: data.measurementUnit,
      unitCount: data.unitCount,
      numberOfItems: data.numberOfItems,
      itemWeight: data.itemWeight,
      totalEaches: data.totalEaches,
      itemPackageWeight: data.itemPackageWeight,
      
      // Dietary
      dietaryPreferences: data.dietaryPreferences,
      allergenInformation: data.allergenInformation || data.allergenInfo,
      nutrition: data.nutrition,
      cuisine: data.cuisine,
      directions: data.directions,
      
      // Location
      State: data.State,
    };
    
    // Add mapped fields
    Object.keys(fieldMapping).forEach(key => {
      if (fieldMapping[key] !== undefined) {
        productData[key] = fieldMapping[key];
      }
    });
    
    // ===== HANDLE IMAGES =====
    
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
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      for (const file of galleryFiles) {
        const img = await uploadCloud(file, 'vendor_products/gallery');
        if (img) galleryImages.push(img);
      }
    }
    
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
    
    // ===== CREATE PRODUCT =====
    console.log("📦 Creating product with data:", {
      name: productData.name,
      price: productData.price,
      hasVariations: productData.hasVariations,
      variationsCount: productData.variations?.length || 0,
      stock: productData.stock
    });
    
    try {
      const product = await VendorProduct.create(productData);
      
      const populatedProduct = await VendorProduct.findById(product._id)
        .populate("category", "name image")
        .populate("subcategory", "name image")
        .populate("vendor", "name email storeName phone")
        .lean();
      
      res.status(201).json({ 
        success: true, 
        message: "Product created successfully",
        data: populatedProduct
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
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }
    
    const data = { ...req.body };
    
    // Parse variations
    let variationsData = [];
    if (data.variations) {
      if (typeof data.variations === 'string') {
        try {
          variationsData = JSON.parse(data.variations);
        } catch (e) {
          variationsData = [];
        }
      } else if (Array.isArray(data.variations)) {
        variationsData = data.variations;
      }
    }
    
    const updateData = {};
    
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
    const safeBoolean = (value) => {
      if (value === 'true' || value === true) return true;
      if (value === 'false' || value === false) return false;
      return Boolean(value);
    };
    
    // Update basic fields
    const fieldsToUpdate = [
      'name', 'description', 'brandName', 'fssaiLicense', 'legalDisclaimer',
      'productTypes', 'ingredients', 'materialTypes', 'customWeight', 'customSizeInput',
      'ageRange', 'containerType', 'itemForm', 'specialty', 'itemTypeName', 'countryOfOrigin',
      'manufacturerName', 'manufacturerAddress', 'manufacturer', 'manufacturerContact',
      'packagerName', 'packagerAddress', 'packagerFssaiLicense',
      'marketerName', 'marketerAddress',
      'packageColour', 'measurementUnit', 'unitCount', 'numberOfItems', 'itemWeight',
      'totalEaches', 'itemPackageWeight', 'shelfLife',
      'dietaryPreferences', 'allergenInformation', 'nutrition', 'cuisine', 'directions',
      'State', 'status'
    ];
    
    fieldsToUpdate.forEach(field => {
      if (data[field] !== undefined) {
        updateData[field] = safeString(data[field]);
      }
    });
    
    // Update price fields
    if (data.price !== undefined) updateData.price = safeNumber(data.price);
    if (data.newPrice !== undefined) updateData.price = safeNumber(data.newPrice);
    if (data.oldPrice !== undefined) updateData.oldPrice = safeNumber(data.oldPrice);
    if (data.stock !== undefined) updateData.stock = safeInt(data.stock);
    if (data.quality !== undefined) updateData.quality = safeString(data.quality);
    if (data.dietPreference !== undefined) updateData.dietPreference = safeString(data.dietPreference);
    
    // Update arrays
    if (data.flavors !== undefined) {
      if (Array.isArray(data.flavors)) {
        updateData.flavors = data.flavors.filter(f => f && safeString(f) !== '');
      } else {
        updateData.flavors = safeString(data.flavors).split(',').map(f => f.trim()).filter(f => f !== '');
      }
    }
    
    if (data.size !== undefined) {
      if (Array.isArray(data.size)) {
        updateData.size = data.size.filter(s => s && safeString(s) !== '');
      } else {
        updateData.size = safeString(data.size).split(',').map(s => s.trim()).filter(s => s !== '');
      }
    }
    
    // Handle variations
    if (data.hasVariations !== undefined) {
      updateData.hasVariations = safeBoolean(data.hasVariations);
      
      if (updateData.hasVariations && variationsData.length > 0) {
        updateData.variations = variationsData.map((v, index) => {
          let newPrice = safeNumber(v.newPrice || v.price);
          if (newPrice <= 0 && v.oldPrice > 0) {
            newPrice = safeNumber(v.oldPrice);
          }
          
          return {
            variationId: v.variationId || v.id || `var_${Date.now()}_${index}`,
            size: safeString(v.size),
            flavor: safeString(v.flavor),
            oldPrice: safeNumber(v.oldPrice),
            newPrice: newPrice,
            stock: safeInt(v.stock),
            sku: safeString(v.sku) || `SKU-${Date.now()}-${index}`,
            image: safeString(v.image)
          };
        }).filter(v => v.newPrice > 0);
      } else {
        updateData.variations = [];
      }
    }
    
    // Handle images
    if (req.files?.image?.[0]) {
      if (product.image && product.image.includes('cloudinary.com')) {
        await deleteCloudinaryImage(product.image);
      }
      updateData.image = await uploadCloud(req.files.image[0], 'vendor_products/main');
    }
    
    // Update gallery
    if (req.files?.gallery) {
      let galleryImages = [...(product.gallery || [])];
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      
      for (const file of galleryFiles) {
        const img = await uploadCloud(file, 'vendor_products/gallery');
        if (img) galleryImages.push(img);
      }
      
      updateData.gallery = galleryImages.slice(0, 9);
    }
    
    // Update variation images
    if (updateData.hasVariations && updateData.variations && updateData.variations.length > 0 && req.files?.variationImages) {
      const varImages = Array.isArray(req.files.variationImages) ? req.files.variationImages : [req.files.variationImages];
      
      for (let i = 0; i < varImages.length && i < updateData.variations.length; i++) {
        const url = await uploadCloud(varImages[i], 'vendor_products/variations');
        if (url) {
          updateData.variations[i].image = url;
        }
      }
    }
    
    // Apply updates
    Object.keys(updateData).forEach(key => {
      product[key] = updateData[key];
    });
    
    // Save product
    await product.save();
    
    const populatedProduct = await VendorProduct.findById(product._id)
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .populate("vendor", "name email storeName phone")
      .lean();
    
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
    
    // Delete images from cloudinary
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
      .populate("vendor", "name email storeName phone")
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
    
    // Ensure newPrice exists
    let newPrice = parseFloat(variationData.newPrice || variationData.price) || 0;
    if (newPrice <= 0 && variationData.oldPrice > 0) {
      newPrice = parseFloat(variationData.oldPrice) || 0;
    }
    
    const newVariation = {
      variationId: variationData.variationId || `var_${Date.now()}_${product.variations.length}`,
      size: variationData.size || '',
      flavor: variationData.flavor || '',
      oldPrice: parseFloat(variationData.oldPrice) || 0,
      newPrice: newPrice,
      stock: parseInt(variationData.stock) || 0,
      sku: variationData.sku || `SKU-${Date.now()}-${product.variations.length}`,
      image: variationData.image || ''
    };
    
    // Validate variation
    if (newVariation.newPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Variation price must be greater than 0"
      });
    }
    
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
    
    // Update fields
    if (updateData.size !== undefined) variation.size = updateData.size;
    if (updateData.flavor !== undefined) variation.flavor = updateData.flavor;
    if (updateData.oldPrice !== undefined) variation.oldPrice = parseFloat(updateData.oldPrice) || 0;
    if (updateData.newPrice !== undefined || updateData.price !== undefined) {
      let newPrice = parseFloat(updateData.newPrice || updateData.price) || 0;
      if (newPrice <= 0 && variation.oldPrice > 0) {
        newPrice = variation.oldPrice;
      }
      variation.newPrice = newPrice;
    }
    if (updateData.stock !== undefined) variation.stock = parseInt(updateData.stock) || 0;
    if (updateData.sku !== undefined) variation.sku = updateData.sku;
    if (updateData.image !== undefined) variation.image = updateData.image;
    
    // Validate
    if (variation.newPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Variation price must be greater than 0"
      });
    }
    
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
      updateData.price = parseFloat(updateData.newPrice) || 0;
      delete updateData.newPrice;
    }
    
    if (updateData.price !== undefined) updateData.price = parseFloat(updateData.price) || 0;
    if (updateData.oldPrice !== undefined) updateData.oldPrice = parseFloat(updateData.oldPrice) || 0;
    if (updateData.stock !== undefined) updateData.stock = parseInt(updateData.stock) || 0;

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

/* ================= CSV OPERATIONS (Simplified) ================= */
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
      message: "CSV import endpoint - Not implemented"
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
      message: "CSV export endpoint - Not implemented"
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
