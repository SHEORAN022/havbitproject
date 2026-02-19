// const express = require("express");
// const router = express.Router();
// const { createWarehouse } = require("../controllers/warehouse.controller");
// const vendorAuth = require("../middleware/vendorAuth");

// router.post("/create", vendorAuth, createWarehouse);

// module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/vendorAuth");
const { createWarehouse } = require("../controllers/warehouse.controller");

router.post("/warehouse", auth, createWarehouse);

module.exports = router;
