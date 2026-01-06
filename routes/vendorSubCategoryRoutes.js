// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");

// const vendorAuth = require("../middleware/vendorAuth");
// const controller = require("../controllers/vendorSubCategoryController");

// /* =========================
//    MULTER SETUP
// ========================= */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });

// /* =========================
//    ROUTES (Vendor Protected)
// ========================= */
// router.get("/", vendorAuth, controller.getVendorSubCategories);

// router.post(
//   "/",
//   vendorAuth,
//   upload.single("image"),
//   controller.createVendorSubCategory
// );

// router.put(
//   "/:id",
//   vendorAuth,
//   upload.single("image"),
//   controller.updateVendorSubCategory
// );

// router.delete("/:id", vendorAuth, controller.deleteVendorSubCategory);

// module.exports = router;









// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");

// const vendorAuth = require("../middleware/vendorAuth");
// const controller = require("../controllers/vendorSubCategoryController");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });

// router.get("/", vendorAuth, controller.getVendorSubCategories);
// router.post("/", vendorAuth, upload.single("image"), controller.createVendorSubCategory);
// router.put("/:id", vendorAuth, upload.single("image"), controller.updateVendorSubCategory);
// router.delete("/:id", vendorAuth, controller.deleteVendorSubCategory);

// module.exports = router;







const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const vendorAuth = require("../middleware/vendorAuth");
const controller = require("../controllers/vendorSubCategoryController");

// Image upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Routes
router.get("/", vendorAuth, controller.getVendorSubCategories);
router.post("/", vendorAuth, upload.single("image"), controller.createVendorSubCategory);
router.put("/:id", vendorAuth, upload.single("image"), controller.updateVendorSubCategory);
router.delete("/:id", vendorAuth, controller.deleteVendorSubCategory);

module.exports = router;
