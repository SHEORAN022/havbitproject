
// // const router = require("express").Router();
// // const ctrl = require("../controllers/parcelxController");
// // const vendorAuth = require("../middleware/vendorAuth");

// // /* ===============================
// //    WAREHOUSE ROUTES (VENDOR ONLY)
// // ================================ */

// // // ✅ Create warehouse (token required)
// // router.post(
// //   "/warehouse",
// //   vendorAuth,
// //   ctrl.createWarehouse
// // );

// // // ✅ Get logged-in vendor warehouses
// // router.get(
// //   "/warehouse",
// //   vendorAuth,
// //   ctrl.getVendorWarehouses
// // );

// // /* ===============================
// //    ORDER ROUTES
// // ================================ */

// // // Vendor / Public order create
// // router.post(
// //   "/order",
// //   ctrl.createParcelxOrder
// // );

// // // Track order (public)
// // router.get(
// //   "/track/:awb",
// //   ctrl.trackParcelxOrder
// // );

// // // Shipment details (public)
// // router.get(
// //   "/shipment/:awb",
// //   ctrl.getParcelxShipmentDetails
// // );

// // module.exports = router;


// const router = require("express").Router();
// const ctrl = require("../controllers/parcelxController");
// const vendorAuth = require("../middleware/vendorAuth");
// const userAuth = require("../middleware/userAuth"); // ← ADD THIS LINE

// /* ===============================
//    WAREHOUSE ROUTES
// ================================ */
// // Vendor: create warehouse
// router.post("/warehouse", vendorAuth, ctrl.createWarehouse);

// // Vendor: seller panel ke liye (vendor token)
// router.get("/warehouse/vendor", vendorAuth, ctrl.getVendorWarehouses); // ← CHANGED

// // Customer: checkout ke liye (customer token) ← NEW ROUTE
// router.get("/warehouse", userAuth, ctrl.getWarehouseForCustomer);

// /* ===============================
//    ORDER ROUTES
// ================================ */
// router.post("/order", userAuth, ctrl.createParcelxOrder); // ← ADD userAuth
// router.get("/track/:awb", ctrl.trackParcelxOrder);
// router.get("/shipment/:awb", ctrl.getParcelxShipmentDetails);

// module.exports = router;
const router = require("express").Router();
const ctrl = require("../controllers/parcelxController");
const vendorAuth = require("../middleware/vendorAuth");
const userAuth = require("../middleware/userAuth");
const parcelx = require("../config/parcelx");

/* ===============================
   WAREHOUSE ROUTES
================================ */
router.post("/warehouse", vendorAuth, ctrl.createWarehouse);
router.get("/warehouse/vendor", vendorAuth, ctrl.getVendorWarehouses);
router.get("/warehouse", userAuth, ctrl.getWarehouseForCustomer);

/* ===============================
   ORDER ROUTES
================================ */
router.post("/order", userAuth, ctrl.createParcelxOrder);
router.get("/track/:awb", ctrl.trackParcelxOrder);
router.get("/shipment/:awb", ctrl.getParcelxShipmentDetails);

/* ===============================
   TEMPORARY DEBUG ROUTE
   Courier response structure dekhne ke liye
   Kaam ho jaaye toh is route ko hata dena
================================ */
router.post("/debug-couriers", userAuth, async (req, res) => {
  try {
    const pincode = req.body.pincode || "141001";
    const pick_address_id = req.body.pick_address_id || 92016;

    const payload = {
      pick_address_id: parseInt(pick_address_id),
      pincode: pincode.toString(),
      weight: "0.5",
      payment_mode: "Cod",
    };

    console.log("🔍 DEBUG courier payload:", JSON.stringify(payload));

    const r = await parcelx.post("/get_couriers", payload);

    console.log("🔍 DEBUG courier response:", JSON.stringify(r.data));

    return res.json({
      success: true,
      payload_sent: payload,
      parcelx_response: r.data,
    });

  } catch (err) {
    console.error("🔍 DEBUG courier error:", err.response?.data || err.message);
    return res.json({
      success: false,
      error: err.response?.data || err.message,
      status_code: err.response?.status,
    });
  }
});

module.exports = router;
