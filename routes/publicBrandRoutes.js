// const router = require("express").Router();
// const {
//   getPublicBrandByVendorId,
// } = require("../controllers/vendorBrandController");

// router.get("/brands/:vendorId", getPublicBrandByVendorId);

// module.exports = router;





const express = require("express");
const router = express.Router();

const {
  getAllPublicBrands,
  getPublicBrandByVendorId,
} = require("../controllers/vendorBrandController");

/**
 * 🌍 WEBSITE
 * Get all vendors brands
 */
router.get("/brands", getAllPublicBrands);

/**
 * 🌍 WEBSITE
 * Get single vendor brand by vendorId
 */
router.get("/brands/:vendorId", getPublicBrandByVendorId);

module.exports = router;
