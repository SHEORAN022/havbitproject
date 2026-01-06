

// // // const express = require("express");
// // // const router = express.Router();

// // // const vendorAuth = require("../middleware/vendorAuth");
// // // const upload = require("../middleware/upload"); // 👈 TERA multer
// // // const controller = require("../controllers/vendorProfileController");

// // // router.get("/profile", vendorAuth, controller.getProfile);

// // // router.put(
// // //   "/profile",
// // //   vendorAuth,
// // //   upload.single("image"), // 👈 image field name
// // //   controller.updateProfile
// // // );

// // // router.delete("/profile", vendorAuth, controller.deleteProfile);

// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();

// // const vendorAuth = require("../middleware/vendorAuth");
// // const upload = require("../middleware/upload");
// // const controller = require("../controllers/vendorProfileController");

// // router.get("/profile", vendorAuth, controller.getProfile);

// // router.put(
// //   "/profile",
// //   vendorAuth,
// //   upload.single("image"),
// //   controller.updateProfile
// // );

// // router.delete("/profile", vendorAuth, controller.deleteProfile);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();

// const vendorAuth = require("../middleware/vendorAuth");
// const controller = require("../controllers/vendorProfileController");

// // 🔥 PASSWORD UPDATE ROUTE
// router.put("/password", vendorAuth, controller.updatePassword);

// module.exports = router;
const express = require("express");
const router = express.Router();

const vendorAuth = require("../middleware/vendorAuth");
const controller = require("../controllers/vendorProfileController");

// 🔥 PUT API
router.put("/password", vendorAuth, controller.updatePassword);

module.exports = router;
