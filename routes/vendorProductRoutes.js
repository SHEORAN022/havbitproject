// const express = require("express");
// const router = express.Router();

// const cloudUpload = require("../middleware/cloudUpload");
// const vendorAuth = require("../middleware/vendorAuth");

// const {
//   getVendorProducts,
//   getVendorProductById,
//   addVendorProduct,
//   updateVendorProduct,
//   deleteVendorProduct
// } = require("../controllers/vendorProductController");

// /* PROTECTED */
// router.use(vendorAuth);

// // GET ALL
// router.get("/", getVendorProducts);

// // GET ONE
// router.get("/:id", getVendorProductById);

// // CREATE
// router.post(
//   "/",
//   cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
//   addVendorProduct
// );

// // UPDATE
// router.put(
//   "/:id",
//   cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
//   updateVendorProduct
// );

// // DELETE
// router.delete("/:id", deleteVendorProduct);

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const vendorAuth = require("../middleware/vendorAuth");
// const upload = require("../middleware/upload");

// const {
//   getVendorProducts,
//   addVendorProduct,
//   updateVendorProduct,
//   deleteVendorProduct
// } = require("../controllers/vendorProductController");

// router.use(vendorAuth);

// router.get("/", getVendorProducts);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 }
//   ]),
//   addVendorProduct
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 }
//   ]),
//   updateVendorProduct
// );

// router.delete("/:id", deleteVendorProduct);

// module.exports = router;








// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");
// const upload = require("../middleware/upload");

// const {
//   getVendorProducts,
//   addVendorProduct,
//   updateVendorProduct,
//   deleteVendorProduct,
// } = require("../controllers/vendorProductController");

// router.use(vendorAuth);

// router.get("/", getVendorProducts);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//   ]),
//   addVendorProduct
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//   ]),
//   updateVendorProduct
// );

// router.delete("/:id", deleteVendorProduct);

// module.exports = router;








// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//     },

//     name: { type: String, required: true },
//     description: String,
//     restaurantName: String,

//     oldPrice: Number,
//     newPrice: { type: Number, required: true },
//     quality: String,
//     stock: Number,

//     image: String,
//     logo: String,

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorCategory",
//       required: true,
//     },

//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorSubCategory",
//     },

//     cuisine: String,
//     size: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);






const express = require("express");
const router = express.Router();
const multer = require("multer");
const vendorAuth = require("../middleware/vendorAuth");
const controller = require("../controllers/vendorProductController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.use(vendorAuth);

router.get("/", controller.getVendorProducts);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  controller.createVendorProduct
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  controller.updateVendorProduct
);

router.delete("/:id", controller.deleteVendorProduct);

module.exports = router;
