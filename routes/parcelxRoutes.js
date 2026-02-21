// // const express = require("express");
// // const router = express.Router();

// // const {
// //   createWarehouse,
// //   createOrder,
// //   trackOrder,
// //   shipmentDetails,
// //    getCourierRates,  
// // } = require("../controllers/parcelxController");

// // router.post("/warehouse", createWarehouse);
// // router.post("/courier/rates", getCourierRates);
// // router.post("/order", createOrder);
// // router.get("/order/track", trackOrder);
// // router.get("/shipment", shipmentDetails);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const parcelxCtrl = require("../controllers/parcelxController");

// router.post("/warehouse", parcelxCtrl.createWarehouse);
// router.get("/warehouses/:vendorId", parcelxCtrl.getVendorWarehouses);

// router.post("/customer/order", parcelxCtrl.createCustomerOrder);

// router.get("/order/track", parcelxCtrl.trackOrder);
// router.get("/shipment", parcelxCtrl.shipmentDetails);
// router.post("/courier/rates", parcelxCtrl.getCourierRates);

// module.exports = router;
const express = require("express");
const router = express.Router();

const parcelxCtrl = require("../controllers/parcelxController");
const userAuth = require("../middleware/userAuth");
const vendorAuth = require("../middleware/vendorAuth");

// ========== WAREHOUSE ROUTES ==========
router.post("/warehouse/create", vendorAuth, parcelxCtrl.createWarehouse);
router.get("/warehouses/:vendorId", vendorAuth, parcelxCtrl.getVendorWarehouses);

// ========== ORDER ROUTES ==========
router.post("/order/create", userAuth, parcelxCtrl.createCustomerOrder);
router.get("/order/track", parcelxCtrl.trackOrder);
router.get("/shipment/details", parcelxCtrl.shipmentDetails);

// ========== COURIER ROUTES ==========
router.post("/courier/rates", parcelxCtrl.getCourierRates);

module.exports = router;
