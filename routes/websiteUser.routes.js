const express = require("express");
const router = express.Router();
const controller = require("../controllers/websiteUser.controller");

router.post("/signup", controller.signup);
router.post("/login", controller.login);

// admin usage
router.get("/all", controller.getAllWebsiteUsers);

module.exports = router;
