
const router = require("express").Router();
const ctrl = require("../controllers/parcelxController");

// Warehouse APIs

router.post("/warehouse", ctrl.createWarehouse);
router.get("/warehouse/:vendorId", ctrl.getVendorWarehouses);
router.post("/order", ctrl.createParcelxOrder);
router.get("/track/:awb", ctrl.trackParcelxOrder);
router.get("/shipment/:awb", ctrl.getParcelxShipmentDetails);
module.exports = router;
