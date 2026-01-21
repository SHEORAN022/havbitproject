// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/websiteUser.controller");

// router.post("/signup", controller.signup);
// router.post("/login", controller.login);

// // admin usage
// router.get("/all", controller.getAllWebsiteUsers);

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/websiteUser.controller"); // 👈 SAME NAME
// const userAuth = require("../middleware/userAuth");

// router.post("/signup", controller.signup);
// router.post("/login", controller.login);
// router.get("/all", controller.getAllWebsiteUsers);

// module.exports = router;






const express = require("express");
const router = express.Router();
const controller = require("../controllers/websiteUser.controller"); // 👈 SAME NAME
const userAuth = require("../middleware/userAuth");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/all", controller.getAllWebsiteUsers);

module.exports = router;
