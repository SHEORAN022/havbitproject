const express = require("express");
const router = express.Router();
const vendorAuth = require("../middleware/vendorAuth");
const I = require("../controllers/inventoryController");

router.use(vendorAuth);

router.post("/", I.createInventory);             // create inventory
router.get("/", I.getMyInventory);               // all inventory
router.put("/:productId", I.updateStock);        // update stock

module.exports = router;
