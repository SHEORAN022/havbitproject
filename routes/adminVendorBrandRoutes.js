const router = require("express").Router();
const upload = require("../middleware/upload");
const adminAuth = require("../middleware/adminAuth");

const {
  getAllVendorBrands,
  getBrandByVendorId,
  updateBrandByVendorId,
} = require("../controllers/vendorBrandController");

router.get("/vendor-brands", adminAuth, getAllVendorBrands);

router.get("/vendor-brands/:vendorId", adminAuth, getBrandByVendorId);

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
