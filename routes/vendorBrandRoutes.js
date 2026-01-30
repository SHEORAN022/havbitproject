const router = require("express").Router();

const upload = require("../middleware/upload");
const vendorAuth = require("../middleware/vendorAuth");

const {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/vendorBrandController");

router.post(
  "/brand",
  vendorAuth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
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
  updateBrand
);

router.delete("/brand", vendorAuth, deleteBrand);

module.exports = router;
