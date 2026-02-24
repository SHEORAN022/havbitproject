// // // // const express = require("express");
// // // // const router = express.Router();

// // // // const {
// // // //   createWarehouse,
// // // //   createOrder,
// // // //   trackOrder,
// // // //   shipmentDetails,
// // // //    getCourierRates,  
// // // // } = require("../controllers/parcelxController");

// // // // router.post("/warehouse", createWarehouse);
// // // // router.post("/courier/rates", getCourierRates);
// // // // router.post("/order", createOrder);
// // // // router.get("/order/track", trackOrder);
// // // // router.get("/shipment", shipmentDetails);

// // // // module.exports = router;

// // // const express = require("express");
// // // const router = express.Router();

// // // const parcelxCtrl = require("../controllers/parcelxController");

// // // router.post("/warehouse", parcelxCtrl.createWarehouse);
// // // router.get("/warehouses/:vendorId", parcelxCtrl.getVendorWarehouses);

// // // router.post("/customer/order", parcelxCtrl.createCustomerOrder);

// // // router.get("/order/track", parcelxCtrl.trackOrder);
// // // router.get("/shipment", parcelxCtrl.shipmentDetails);
// // // router.post("/courier/rates", parcelxCtrl.getCourierRates);

// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();

// // const parcelxCtrl = require("../controllers/parcelxController");
// // const userAuth = require("../middleware/userAuth");
// // const vendorAuth = require("../middleware/vendorAuth");

// // // ========== WAREHOUSE ROUTES ==========
// // router.post("/warehouse/create", vendorAuth, parcelxCtrl.createWarehouse);
// // router.get("/warehouses/:vendorId", vendorAuth, parcelxCtrl.getVendorWarehouses);

// // // ========== ORDER ROUTES ==========
// // router.post("/order/create", userAuth, parcelxCtrl.createCustomerOrder);
// // router.get("/order/track", parcelxCtrl.trackOrder);
// // router.get("/shipment/details", parcelxCtrl.shipmentDetails);

// // // ========== COURIER ROUTES ==========
// // router.post("/courier/rates", parcelxCtrl.getCourierRates);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();

// // Import controllers
// const parcelxCtrl = require("../controllers/parcelxController");

// // Import middleware
// const vendorAuth = require("../middleware/vendorAuth");
// const userAuth = require("../middleware/userAuth");

// // ========== WAREHOUSE ROUTES ==========
// // @route   POST /api/parcelx/warehouse/create
// // @desc    Create new warehouse (Vendor only)
// // @access  Private (Vendor)
// router.post("/warehouse/create", vendorAuth, parcelxCtrl.createWarehouse);

// // @route   GET /api/parcelx/warehouses/:vendorId
// // @desc    Get all warehouses of a vendor
// // @access  Private (Vendor)
// router.get("/warehouses/:vendorId", vendorAuth, parcelxCtrl.getVendorWarehouses);

// // ========== ORDER ROUTES ==========
// // @route   POST /api/parcelx/order/create
// // @desc    Create new order (Customer only)
// // @access  Private (User)
// router.post("/order/create", userAuth, parcelxCtrl.createCustomerOrder);

// // @route   GET /api/parcelx/order/track
// // @desc    Track order by AWB number
// // @access  Public
// router.get("/order/track", parcelxCtrl.trackOrder);

// // ========== COURIER ROUTES ==========
// // @route   POST /api/parcelx/courier/rates
// // @desc    Get courier rates and serviceability
// // @access  Private (Vendor/Admin)
// router.post("/courier/rates", vendorAuth, parcelxCtrl.getCourierRates);

// module.exports = router;


const router = require("express").Router();
const ctrl = require("../controllers/parcelxController");

// Warehouse APIs
router.post("/warehouse", ctrl.createWarehouse);
router.get("/warehouse/:vendorId", ctrl.getVendorWarehouses);
router.post("/order", ctrl.createParcelxOrder);
module.exports = router;
