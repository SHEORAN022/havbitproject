const express = require("express");
const router = express.Router();
const vendorAuth = require("../middleware/vendorAuth");
const I = require("../controllers/inventoryController");

router.use(vendorAuth);

router.post("/", I.createInventory);     // CREATE
router.get("/", I.getMyInventory);       // READ
router.put("/:id", I.updateInventory);   // UPDATE
router.delete("/:id", I.deleteInventory);// DELETE

module.exports = router;
