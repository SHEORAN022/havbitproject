


// const router = require("express").Router();
// const { getPublicProducts } = require("../controllers/publicProductController");

// router.get("/products", getPublicProducts);

// module.exports = router;


// module.exports = router;
const router = require("express").Router();
const {
  getPublicProducts,
  getPublicProduct,
  getProductsByCategory
} = require("../controllers/publicProductController");

// Get all public products (with filters)
router.get("/products", getPublicProducts);

// Get single product by ID or slug
router.get("/products/:id", getPublicProduct); // By ID
router.get("/products/slug/:slug", getPublicProduct); // By slug

// Get products by category
router.get("/products/category/:categoryId", getProductsByCategory);

// Get featured products
router.get("/products/featured", async (req, res) => {
  try {
    const [adminFeatured, vendorFeatured] = await Promise.all([
      Product.find({ isFeatured: true }).limit(10).lean(),
      VendorProduct.find({ isFeatured: true }).limit(10).lean()
    ]);
    
    const featured = [...adminFeatured, ...vendorFeatured]
      .map(p => ({
        id: p._id,
        name: p.name,
        price: p.newPrice || p.price,
        image: p.image,
        discount: p.oldPrice > 0 
          ? Math.round(((p.oldPrice - (p.newPrice || p.price)) / p.oldPrice) * 100)
          : 0
      }));
    
    res.json({ success: true, data: featured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;


