

// const router = require("express").Router();
// const upload = require("../middleware/upload");

// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   bulkDelete,
//   bulkUpdate,
// } = require("../controllers/productController");

// router.get("/", getProducts);
// router.get("/:id", getProductById);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
//     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
//     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   addProduct
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
//     { name: "mandatoryImages.nutritionImage", maxCount: 1 },
//     { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   updateProduct
// );

// router.delete("/:id", deleteProduct);
// router.post("/bulk-delete", bulkDelete);
// router.put("/bulk-update", bulkUpdate);

// module.exports = router;






const router = require("express").Router();
const { handleProductUpload, handleVariationUpload } = require("../middleware/upload");

const {
  getProducts,
  getProductById,
  getProductBySlug,
  addProduct,
  updateProduct,
  deleteProduct,
  bulkDelete,
  bulkUpdate,
  addVariation,
  updateVariation,
  deleteVariation,
  getProductVariations,
  searchProducts,
  getFeaturedProducts,
  getProductsByCategory,
  uploadProductImages,
  uploadVariationImages,
  deleteProductImage,
  deleteVariationImage
} = require("../controllers/productController");

// Public routes
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/search", searchProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProductById);
router.get("/:id/variations", getProductVariations);

// Admin routes
router.post("/", handleProductUpload, addProduct);
router.put("/:id", handleProductUpload, updateProduct);

// Variation management
router.post("/:id/variations", handleVariationUpload, addVariation);
router.put("/:id/variations/:variationId", handleVariationUpload, updateVariation);
router.delete("/:id/variations/:variationId", deleteVariation);

// Image management
router.post("/:id/images", upload.array("images", 12), uploadProductImages);
router.delete("/:id/images/:imageIndex", deleteProductImage);
router.post("/:id/variations/:variationId/images", upload.array("images", 12), uploadVariationImages);
router.delete("/:id/variations/:variationId/images/:imageIndex", deleteVariationImage);

// Bulk operations
router.delete("/", bulkDelete);
router.put("/bulk-update", bulkUpdate);

module.exports = router;
