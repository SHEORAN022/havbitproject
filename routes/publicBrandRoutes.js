const router = require("express").Router();
const {
  getPublicBrandByVendorId,
} = require("../controllers/vendorBrandController");

router.get("/brands/:vendorId", getPublicBrandByVendorId);

module.exports = router;
