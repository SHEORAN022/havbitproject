


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const subCategoryController = require("../controllers/subCategoryController");

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // Serve uploads folder
// router.use("/uploads", express.static("uploads"));

// // CRUD routes
// router.get("/", subCategoryController.getAllSubCategories);
// router.post("/", upload.single("image"), subCategoryController.createSubCategory);
// router.put("/:id", upload.single("image"), subCategoryController.updateSubCategory);
// router.delete("/:id", subCategoryController.deleteSubCategory);

// module.exports = router;






const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const subCategoryController = require("../controllers/subCategoryController");

// UPLOAD CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/subcategory/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ROUTES
router.get("/", subCategoryController.getAllSubCategories);
router.post("/", upload.single("image"), subCategoryController.createSubCategory);
router.put("/:id", upload.single("image"), subCategoryController.updateSubCategory);
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
