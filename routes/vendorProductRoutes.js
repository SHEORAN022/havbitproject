// // const express = require("express");
// // const router = express.Router();
// // const vendorAuth = require("../middleware/vendorAuth");
// // const upload = require("../middleware/upload");
// // const controller = require("../controllers/vendorProductController");

// // router.use(vendorAuth);

// // router.get("/", controller.getVendorProducts);

// // router.post(
// //   "/",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "logo", maxCount: 1 },
// //     { name: "gallery", maxCount: 5 },
// //   ]),
// //   controller.createVendorProduct
// // );

// // router.put("/:id", controller.updateVendorProduct);
// // router.delete("/:id", controller.deleteVendorProduct);

// // module.exports = router;




// // const express = require("express");
// // const router = express.Router();
// // const vendorAuth = require("../middleware/vendorAuth");
// // const upload = require("../middleware/upload");
// // const controller = require("../controllers/vendorProductController");

// // router.use(vendorAuth);

// // /* GET */
// // router.get("/", controller.getVendorProducts);

// // /* CREATE */
// // router.post(
// //   "/",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "logo", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //   ]),
// //   controller.createVendorProduct
// // );

// // /* UPDATE */
// // router.put(
// //   "/:id",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "logo", maxCount: 1 },
// //     { name: "gallery", maxCount: 10 },
// //   ]),
// //   controller.updateVendorProduct
// // );

// // /* DELETE */
// // router.delete("/:id", controller.deleteVendorProduct);

// // module.exports = router;


// // const express = require("express");
// // const router = express.Router();
// // const vendorAuth = require("../middleware/vendorAuth");
// // const upload = require("../middleware/upload");
// // const P = require("../controllers/vendorProductController");

// // router.use(vendorAuth);

// // router.get("/products", P.getVendorProducts);

// // router.post(
// //   "/products",
// //   upload.fields([
// //     { name:"image", maxCount:1 },
// //     { name:"logo", maxCount:1 },
// //     { name:"gallery", maxCount:10 },
// //   ]),
// //   P.createVendorProduct
// // );

// // router.put(
// //   "/products/:id",
// //   upload.fields([
// //     { name:"image", maxCount:1 },
// //     { name:"logo", maxCount:1 },
// //     { name:"gallery", maxCount:10 },
// //   ]),
// //   P.updateVendorProduct
// // );

// // router.delete("/products/:id", P.deleteVendorProduct);

// // module.exports = router;






// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");
// const upload = require("../middleware/upload");
// const csvUpload = require("../middleware/csvUpload");
// const P = require("../controllers/vendorProductController");

// router.use(vendorAuth);

// /* ===== CRUD ===== */
// router.get("/", P.getVendorProducts);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   P.createVendorProduct
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   P.updateVendorProduct
// );

// router.delete("/:id", P.deleteVendorProduct);

// /* ===== CSV ===== */
// router.post(
//   "/import-csv",
//   csvUpload.single("file"), // 🔥 FIXED
//   P.importCSV
// );

// router.get("/export-csv", P.exportCSV);

// /* ===== BULK ===== */
// router.put("/bulk-update", P.bulkUpdate);
// router.delete("/bulk-delete", P.bulkDelete);

// module.exports = router;







// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");
// const upload = require("../middleware/upload");
// const csvUpload = require("../middleware/csvUpload");
// const P = require("../controllers/vendorProductController");

// router.use(vendorAuth);

// /* ===== CRUD ===== */
// router.get("/", P.getVendorProducts);

// router.post(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   P.createVendorProduct
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//     { name: "gallery", maxCount: 10 },
//   ]),
//   P.updateVendorProduct
// );

// router.delete("/:id", P.deleteVendorProduct);

// /* ===== CSV ===== */
// router.post(
//   "/import-csv",
//   csvUpload.single("file"), // 🔥 FIXED
//   P.importCSV
// );

// router.get("/export-csv", P.exportCSV);

// /* ===== BULK ===== */
// router.put("/bulk-update", P.bulkUpdate);
// router.delete("/bulk-delete", P.bulkDelete);

// module.exports = router;






const express = require("express");
const router = express.Router();

const vendorAuth = require("../middleware/vendorAuth");
const upload = require("../middleware/upload");
const csvUpload = require("../middleware/csvUpload");
const P = require("../controllers/vendorProductController");

router.use(vendorAuth);

/* ===== CATEGORY & SUBCATEGORY ROUTES ===== */
router.get("/categories", P.getCategories);
router.get("/subcategories/:categoryId", P.getSubCategories);

/* ===== CRUD ===== */
router.get("/", P.getVendorProducts);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mandatoryImages.ingredientsImage", maxCount: 1 },
    { name: "mandatoryImages.nutritionImage", maxCount: 1 },
    { name: "mandatoryImages.mfgExpImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  P.createVendorProduct
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
  P.updateVendorProduct
);

router.delete("/:id", P.deleteVendorProduct);

/* ===== CSV ===== */
router.post(
  "/import-csv",
  csvUpload.single("file"),
  P.importCSV
);

router.get("/export-csv", P.exportCSV);

/* ===== BULK ===== */
router.put("/bulk-update", P.bulkUpdate);
router.delete("/bulk-delete", P.bulkDelete);

module.exports = router;
