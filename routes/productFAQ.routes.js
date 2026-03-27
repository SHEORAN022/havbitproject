const router = require("express").Router();

const {
  addFAQ,
  getFAQByProduct,
} = require("../controllers/productFAQ.controller");

// ✅ FIXED IMPORT
const verifyVendor = require("../middleware/vendorAuth");

// ✅ WORKING
router.post("/", verifyVendor, addFAQ);

router.get("/:productId", getFAQByProduct);

module.exports = router;
