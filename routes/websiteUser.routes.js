const express = require("express");
const router = express.Router();
const controller = require("../controllers/websiteUser.controller");
const userAuth = require("../middleware/userAuth");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/google-login", controller.googleLogin); // 👈 ADD THIS
router.get("/all", controller.getAllWebsiteUsers);

module.exports = router;
