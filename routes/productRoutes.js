

const router = require("express").Router();
const upload = require("../middleware/upload");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  bulkDelete,
  bulkUpdate,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
    { name: "mandatoryImages.nutritionImage", maxCount: 1 },
    { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  addProduct
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
    { name: "mandatoryImages.nutritionImage", maxCount: 1 },
    { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateProduct
);

router.delete("/:id", deleteProduct);
router.post("/bulk-delete", bulkDelete);
router.put("/bulk-update", bulkUpdate);

module.exports = router;


