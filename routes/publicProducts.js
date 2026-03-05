


// // const router = require("express").Router();
// // const { getPublicProducts } = require("../controllers/publicProductController");

// // router.get("/products", getPublicProducts);

// // module.exports = router;


// // module.exports = router;



// const router = require("express").Router();
// const { getPublicProducts } = require("../controllers/publicProductController");

// router.get("/products", getPublicProducts);

// module.exports = router;
const router = require("express").Router();

const {
  getPublicProducts,
  getPublicProductById,
  getPublicProductBySlug
} = require("../controllers/publicProductController");

/* ===============================
   GET ALL PUBLIC PRODUCTS
================================ */
router.get("/products", getPublicProducts);

/* ===============================
   GET SINGLE PRODUCT BY SLUG
   Example:
   /api/public/product/iphone-15
================================ */
router.get("/product/:slug", getPublicProductBySlug);

/* ===============================
   GET PRODUCT BY ID (OPTIONAL)
================================ */
router.get("/product-id/:id", getPublicProductById);

module.exports = router;
