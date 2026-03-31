// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");
// const vendorAuth = require("../middleware/vendorAuth");

// const {
//   createBrand,
//   getBrand,
//   updateBrand,
//   deleteBrand,
// } = require("../controllers/vendorBrandController");

// /**
//  * 🧑‍💼 VENDOR
//  * Create brand
//  */
// router.post(
//   "/brand",
//   vendorAuth,
//   upload.fields([
//     { name: "logo", maxCount: 1 },
//     { name: "banner", maxCount: 1 },
//   ]),
//   createBrand
// );

// /**
//  * 🧑‍💼 VENDOR
//  * Get own brand
//  */
// router.get("/brand", vendorAuth, getBrand);

// /**
//  * 🧑‍💼 VENDOR
//  * Update own brand
//  */
// router.put(
//   "/brand",
//   vendorAuth,
//   upload.fields([
//     { name: "logo", maxCount: 1 },
//     { name: "banner", maxCount: 1 },
//   ]),
//   updateBrand
// );

// /**
//  * 🧑‍💼 VENDOR
//  * Delete own brand
//  */
// router.delete("/brand", vendorAuth, deleteBrand);

// module.exports = router;


const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const vendorAuth = require("../middleware/vendorAuth");

const {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllPublicBrands, // ✅ ADD THIS
} = require("../controllers/vendorBrandController");

/* ================= MULTER ERROR HANDLER ================= */
const handleMulterError = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "File upload error",
    });
  }
  next();
};


router.post(
  "/brand",
  vendorAuth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  handleMulterError,
  createBrand
);


router.get("/brand", vendorAuth, getBrand);


router.put(
  "/brand",
  vendorAuth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  handleMulterError,
  updateBrand
);


router.delete("/brand", vendorAuth, deleteBrand);


router.get("/brands/public", getAllPublicBrands);



module.exports = router;
