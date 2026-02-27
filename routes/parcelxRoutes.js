
// // const router = require("express").Router();
// // const ctrl = require("../controllers/parcelxController");

// // // Warehouse APIs

// // router.post("/warehouse", ctrl.createWarehouse);
// // router.get("/warehouse/:vendorId", ctrl.getVendorWarehouses);
// // router.post("/order", ctrl.createParcelxOrder);
// // router.get("/track/:awb", ctrl.trackParcelxOrder);
// // router.get("/shipment/:awb", ctrl.getParcelxShipmentDetails);
// // module.exports = router;
const router = require("express").Router();
const ctrl = require("../controllers/parcelxController");
const vendorAuth = require("../middleware/vendorAuth");

/* ===============================
   WAREHOUSE ROUTES (VENDOR ONLY)
================================ */

// ✅ Create warehouse (token required)
router.post(
  "/warehouse",
  vendorAuth,
  ctrl.createWarehouse
);

// ✅ Get logged-in vendor warehouses
router.get(
  "/warehouse",
  vendorAuth,
  ctrl.getVendorWarehouses
);

/* ===============================
   ORDER ROUTES
================================ */

// Vendor / Public order create
router.post(
  "/order",
  ctrl.createParcelxOrder
);

// Track order (public)
router.get(
  "/track/:awb",
  ctrl.trackParcelxOrder
);

// Shipment details (public)
router.get(
  "/shipment/:awb",
  ctrl.getParcelxShipmentDetails
);

module.exports = router;
