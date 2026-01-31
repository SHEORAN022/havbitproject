





// // routes/productRoutes.js
// const router = require("express").Router();
// const cloudUpload = require("../middleware/cloudUpload");
// const csvUpload = require("../middleware/csvUpload");
// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   bulkDelete,
//   bulkUpdate,
//   importCSV,
//   exportCSV
// } = require("../controllers/productController");

// // CRUD Operations
// router.get("/", getProducts);
// router.get("/:id", getProductById);

// router.post(
//   "/",
//   cloudUpload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//     { name: "gallery", maxCount: 10 }
//   ]),
//   addProduct
// );

// router.put(
//   "/:id",
//   cloudUpload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//     { name: "gallery", maxCount: 10 }
//   ]),
//   updateProduct
// );

// router.delete("/:id", deleteProduct);

// // Bulk Operations
// router.post("/bulk-delete", bulkDelete);
// router.put("/bulk-update", bulkUpdate);

// // CSV Operations
// router.post("/import-csv", csvUpload.single("file"), importCSV);
// router.get("/export-csv", exportCSV);

// module.exports = router;















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
//     { name: "gallery", maxCount: 10 },
//   ]),
//   addProduct
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   updateProduct
// );

// router.delete("/:id", deleteProduct);
// router.post("/bulk-delete", bulkDelete);
// router.put("/bulk-update", bulkUpdate);

// module.exports = router;








const router = require("express").Router();
const upload = require("../middleware/upload");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  bulkDelete,
  bulkUpdate,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
    { name: "mandatoryImages.nutritionImage", maxCount: 1 },
    { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  addProduct
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
    { name: "mandatoryImages.nutritionImage", maxCount: 1 },
    { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateProduct
);

router.delete("/:id", deleteProduct);
router.post("/bulk-delete", bulkDelete);
router.put("/bulk-update", bulkUpdate);

module.exports = router;
