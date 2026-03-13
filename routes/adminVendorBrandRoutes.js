const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const adminAuth = require("../middleware/adminAuth");

const {
  getAllVendorBrands,
  getBrandByVendorId,
  updateBrandByVendorId,
} = require("../controllers/vendorBrandController");

/**
 * 👨‍💼 ADMIN
 * Get all vendor brands
 */
router.get("/vendor-brands", adminAuth, getAllVendorBrands);

/**
 * 👨‍💼 ADMIN
 * Get single vendor brand
 */
router.get("/vendor-brands/:vendorId", adminAuth, getBrandByVendorId);

/**
 * 👨‍💼 ADMIN
 * Update vendor brand
 */
router.put(
  "/vendor-brands/:vendorId",
  adminAuth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateBrandByVendorId
);

module.exports = router;

