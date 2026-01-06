const express = require("express");
const router = express.Router();
const cloudUpload = require("../middleware/cloudUpload");
const vendorAuth = require("../middleware/vendorAuth");

const {
  createVendorCategory,
  getVendorCategories,
  getVendorCategoryById,
  updateVendorCategory,
  deleteVendorCategory
} = require("../controllers/vendorCategoryController");

/* Vendor Protected Routes */
router.use(vendorAuth);

// CREATE
router.post("/", cloudUpload.single("image"), createVendorCategory);

// READ ALL
router.get("/", getVendorCategories);

// READ SINGLE
router.get("/:id", getVendorCategoryById);

// UPDATE
router.put("/:id", cloudUpload.single("image"), updateVendorCategory);

// DELETE
router.delete("/:id", deleteVendorCategory);

module.exports = router;
