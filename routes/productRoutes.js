
// // const router = require("express").Router();
// // const cloudUpload = require("../middleware/cloudUpload");
// // const {
// //   getProducts,
// //   getProductById,
// //   addProduct,
// //   updateProduct,
// //   deleteProduct
// // } = require("../controllers/productController");

// // router.get("/", getProducts);
// // router.get("/:id", getProductById);

// // router.post(
// //   "/",
// //   cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
// //   addProduct
// // );

// // router.put(
// //   "/:id",
// //   cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
// //   updateProduct
// // );

// // router.delete("/:id", deleteProduct);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");
// const upload = require("../middleware/upload");

// // Public routes
// router.get("/", productController.getProducts);
// router.get("/:id", productController.getProductById);

// // Admin routes (add authentication middleware as needed)
// router.post(
//   "/",
//   upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'logo', maxCount: 1 },
//     { name: 'gallery', maxCount: 10 }
//   ]),
//   productController.addProduct
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'logo', maxCount: 1 },
//     { name: 'gallery', maxCount: 10 }
//   ]),
//   productController.updateProduct
// );

// router.delete("/:id", productController.deleteProduct);

// // Bulk operations
// router.put("/bulk-update", productController.bulkUpdateProducts);
// router.post("/bulk-delete", productController.bulkDeleteProducts);

// // CSV operations
// router.post("/import-csv", 
//   upload.single('file'),
//   productController.importCSV
// );

// router.get("/export-csv", productController.exportCSV);

// module.exports = router;









const router = require("express").Router();
const cloudUpload = require("../middleware/cloudUpload");
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
  addProduct
);

router.put(
  "/:id",
  cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
  updateProduct
);

router.delete("/:id", deleteProduct);

module.exports = router;

