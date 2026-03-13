const express = require("express");
const router = express.Router();
const auth = require("../middleware/vendorAuth");
const { createWarehouse } = require("../controllers/warehouse.controller");

router.post("/", auth, createWarehouse);

module.exports = router;
