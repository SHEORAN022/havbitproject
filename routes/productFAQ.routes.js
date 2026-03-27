// const router = require("express").Router();

// const {
//   addFAQ,
//   getFAQByProduct,
// } = require("../controllers/productFAQ.controller");

// // ✅ FIXED IMPORT
// const verifyVendor = require("../middleware/vendorAuth");

// // ✅ WORKING
// router.post("/", verifyVendor, addFAQ);

// router.get("/:productId", getFAQByProduct);

// module.exports = router;


const router        = require("express").Router();
const verifyVendor  = require("../middleware/vendorAuth");
const {
  addFAQ,
  getAllVendorFAQs,
  getFAQById,
  getFAQByProduct,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/productFAQ.controller");
 
// Public
router.get("/product/:productId", getFAQByProduct);
 
// Protected (vendor only)
router.post(  "/",               verifyVendor, addFAQ);
router.get(   "/vendor/all",     verifyVendor, getAllVendorFAQs);
router.get(   "/:id",            verifyVendor, getFAQById);
router.put(   "/:id",            verifyVendor, updateFAQ);
router.delete("/:id",            verifyVendor, deleteFAQ);
 
module.exports = router;
