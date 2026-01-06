
// const express = require("express");
// const router = express.Router();
// const cloudUpload = require("../middleware/cloudUpload");

// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   exportProductsCSV,
// } = require("../controllers/productController");

// /* CSV FIRST */
// router.get("/export/csv", exportProductsCSV);

// /* CRUD */
// router.get("/", getProducts);
// router.get("/:id", getProductById);

// router.post(
//   "/",
//   cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
//   addProduct
// );

// router.put(
//   "/:id",
//   cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
//   updateProduct
// );

// router.delete("/:id", deleteProduct);

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const cloudUpload = require("../middleware/cloudUpload");

// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   exportProductsCSV
// } = require("../controllers/productController");

// // CSV export first
// router.get("/export/csv", exportProductsCSV);

// // CRUD routes
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.post("/", cloudUpload.fields([{ name: "image" }, { name: "logo" }]), addProduct);
// router.put("/:id", cloudUpload.fields([{ name: "image" }, { name: "logo" }]), updateProduct);
// router.delete("/:id", deleteProduct);

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
