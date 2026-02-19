const express = require("express");
const router = express.Router();
const { createWarehouse } = require("../controllers/warehouse.controller");
const vendorAuth = require("../middleware/vendorAuth");

router.post("/create", vendorAuth, createWarehouse);

module.exports = router;
