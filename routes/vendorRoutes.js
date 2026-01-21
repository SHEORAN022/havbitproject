
// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");
// const productCtrl = require("../controllers/vendorProductController");
// const subCtrl = require("../controllers/vendorSubCategoryController");
// const catCtrl = require("../controllers/vendorCategoryController");

// router.get("/categories", vendorAuth, catCtrl.getVendorCategories);
// router.get("/subcategories", vendorAuth, subCtrl.getVendorSubCategories);

// router.get("/products", vendorAuth, productCtrl.getVendorProducts);
// router.post("/products", vendorAuth, productCtrl.createVendorProduct);
// router.put("/products/:id", vendorAuth, productCtrl.updateVendorProduct);
// router.delete("/products/:id", vendorAuth, productCtrl.deleteVendorProduct);

// module.exports = router;








const express = require("express");
const router = express.Router();

const vendorAuth = require("../middleware/vendorAuth");
const productCtrl = require("../controllers/vendorProductController");
const subCtrl = require("../controllers/vendorSubCategoryController");
const catCtrl = require("../controllers/vendorCategoryController");

router.get("/categories", vendorAuth, catCtrl.getVendorCategories);
router.get("/subcategories", vendorAuth, subCtrl.getVendorSubCategories);

router.get("/products", vendorAuth, productCtrl.getVendorProducts);
router.post("/products", vendorAuth, productCtrl.createVendorProduct);
router.put("/products/:id", vendorAuth, productCtrl.updateVendorProduct);
router.delete("/products/:id", vendorAuth, productCtrl.deleteVendorProduct);

module.exports = router;
