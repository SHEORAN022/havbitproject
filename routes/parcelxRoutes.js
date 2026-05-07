// // const router = require("express").Router();
// // const ctrl   = require("../controllers/parcelxController");
// // const vendorAuth = require("../middleware/vendorAuth");
// // const userAuth   = require("../middleware/userAuth");
// // const parcelx    = require("../config/parcelx");

// // /* ===============================
// //    WAREHOUSE ROUTES
// // ================================ */
// // router.post("/warehouse",        vendorAuth, ctrl.createWarehouse);
// // router.get("/warehouse/vendor",  vendorAuth, ctrl.getVendorWarehouses);
// // router.get("/warehouse",         userAuth,   ctrl.getWarehouseForCustomer);

// // /* ===============================
// //    ORDER ROUTES
// // ================================ */
// // router.post("/order",            userAuth,   ctrl.createParcelxOrder);
// // router.get("/vendor-orders", vendorAuth, ctrl.getVendorOrders);
// // // Admin — sabhi orders (filter/search/pagination support)
// // router.get("/orders",                        ctrl.getAllOrders);
// // router.post("/cancel-order", userAuth, ctrl.cancelParcelxOrder);

// // router.get("/parcelx-orders",                ctrl.getParcelxOrders);
// // router.get("/label/:awb", ctrl.downloadParcelxLabel);
// // // Tracking
// // router.get("/track/:awb",                    ctrl.trackParcelxOrder);
// // router.get("/shipment/:awb",                 ctrl.getParcelxShipmentDetails);

// // /* ===============================
// //    TEMPORARY DEBUG ROUTE
// //    Courier response structure dekhne ke liye
// //    Kaam ho jaaye toh is route ko hata dena
// // ================================ */
// // router.post("/debug-couriers", userAuth, async (req, res) => {
// //   try {
// //     const pincode        = req.body.pincode        || "141001";
// //     const pick_address_id = req.body.pick_address_id || 92016;

// //     const payload = {
// //       pick_address_id: parseInt(pick_address_id),
// //       pincode:         pincode.toString(),
// //       weight:          "0.5",
// //       payment_mode:    "Cod",
// //     };

// //     console.log("🔍 DEBUG courier payload:", JSON.stringify(payload));
// //     const r = await parcelx.post("/get_couriers", payload);
// //     console.log("🔍 DEBUG courier response:", JSON.stringify(r.data));

// //     return res.json({
// //       success: true,
// //       payload_sent:      payload,
// //       parcelx_response:  r.data,
// //     });
// //   } catch (err) {
// //     console.error("🔍 DEBUG courier error:", err.response?.data || err.message);
// //     return res.json({
// //       success: false,
// //       error:       err.response?.data || err.message,
// //       status_code: err.response?.status,
// //     });
// //   }
// // });

// // module.exports = router;





// const router = require("express").Router();

// const ctrl = require("../controllers/parcelxController");

// const vendorAuth = require("../middleware/vendorAuth");
// const userAuth = require("../middleware/userAuth");
// const adminAuth = require("../middleware/adminAuth");

// const parcelx = require("../config/parcelx");

// /* ===============================
//    WAREHOUSE ROUTES
// ================================ */

// // CREATE WAREHOUSE
// router.post(
//   "/warehouse",
//   vendorAuth,
//   ctrl.createWarehouse
// );

// // GET VENDOR WAREHOUSES
// router.get(
//   "/warehouse/vendor",
//   vendorAuth,
//   ctrl.getVendorWarehouses
// );

// // GET CUSTOMER WAREHOUSE
// router.get(
//   "/warehouse",
//   userAuth,
//   ctrl.getWarehouseForCustomer
// );

// /* ===============================
//    ORDER ROUTES
// ================================ */

// // CREATE ORDER
// router.post(
//   "/order",
//   userAuth,
//   ctrl.createParcelxOrder
// );

// // UPDATE ORDER STATUS (ADMIN)
// router.put(
//   "/order/:id",
//   adminAuth,
//   ctrl.updateOrderStatus
// );

// // GET VENDOR ORDERS
// router.get(
//   "/vendor-orders",
//   vendorAuth,
//   ctrl.getVendorOrders
// );

// // GET ALL ORDERS (ADMIN)
// router.get(
//   "/orders",
//   adminAuth,
//   ctrl.getAllOrders
// );

// // CANCEL ORDER
// router.post(
//   "/cancel-order",
//   userAuth,
//   ctrl.cancelParcelxOrder
// );

// // GET PARCELX ORDERS
// router.get(
//   "/parcelx-orders",
//   adminAuth,
//   ctrl.getParcelxOrders
// );

// // DOWNLOAD LABEL
// router.get(
//   "/label/:awb",
//   adminAuth,
//   ctrl.downloadParcelxLabel
// );

// /* ===============================
//    TRACKING ROUTES
// ================================ */

// // TRACK ORDER
// router.get(
//   "/track/:awb",
//   ctrl.trackParcelxOrder
// );

// // SHIPMENT DETAILS
// router.get(
//   "/shipment/:awb",
//   ctrl.getParcelxShipmentDetails
// );

// /* ===============================
//    TEMPORARY DEBUG ROUTE
// ================================ */

// router.post(
//   "/debug-couriers",
//   userAuth,
//   async (req, res) => {
//     try {
//       const pincode =
//         req.body.pincode || "141001";

//       const pick_address_id =
//         req.body.pick_address_id || 92016;

//       const payload = {
//         pick_address_id: parseInt(
//           pick_address_id
//         ),

//         pincode: pincode.toString(),

//         weight: "0.5",

//         payment_mode: "Cod",
//       };

//       console.log(
//         "🔍 DEBUG courier payload:",
//         JSON.stringify(payload)
//       );

//       const r = await parcelx.post(
//         "/get_couriers",
//         payload
//       );

//       console.log(
//         "🔍 DEBUG courier response:",
//         JSON.stringify(r.data)
//       );

//       return res.json({
//         success: true,

//         payload_sent: payload,

//         parcelx_response: r.data,
//       });

//     } catch (err) {

//       console.error(
//         "🔍 DEBUG courier error:",
//         err.response?.data || err.message
//       );

//       return res.json({
//         success: false,

//         error:
//           err.response?.data ||
//           err.message,

//         status_code:
//           err.response?.status,
//       });
//     }
//   }
// );

// module.exports = router;


// const router = require("express").Router();
// const ctrl   = require("../controllers/parcelxController");
// const vendorAuth = require("../middleware/vendorAuth");
// const userAuth   = require("../middleware/userAuth");
// const parcelx    = require("../config/parcelx");

// /* ===============================
//    WAREHOUSE ROUTES
// ================================ */
// router.post("/warehouse",        vendorAuth, ctrl.createWarehouse);
// router.get("/warehouse/vendor",  vendorAuth, ctrl.getVendorWarehouses);
// router.get("/warehouse",         userAuth,   ctrl.getWarehouseForCustomer);

// /* ===============================
//    ORDER ROUTES
// ================================ */
// router.post("/order",            userAuth,   ctrl.createParcelxOrder);
// router.get("/vendor-orders", vendorAuth, ctrl.getVendorOrders);
// // Admin — sabhi orders (filter/search/pagination support)
// router.get("/orders",                        ctrl.getAllOrders);
// router.post("/cancel-order", userAuth, ctrl.cancelParcelxOrder);

// router.get("/parcelx-orders",                ctrl.getParcelxOrders);
// router.get("/label/:awb", ctrl.downloadParcelxLabel);
// // Tracking
// router.get("/track/:awb",                    ctrl.trackParcelxOrder);
// router.get("/shipment/:awb",                 ctrl.getParcelxShipmentDetails);

// /* ===============================
//    TEMPORARY DEBUG ROUTE
//    Courier response structure dekhne ke liye
//    Kaam ho jaaye toh is route ko hata dena
// ================================ */
// router.post("/debug-couriers", userAuth, async (req, res) => {
//   try {
//     const pincode        = req.body.pincode        || "141001";
//     const pick_address_id = req.body.pick_address_id || 92016;

//     const payload = {
//       pick_address_id: parseInt(pick_address_id),
//       pincode:         pincode.toString(),
//       weight:          "0.5",
//       payment_mode:    "Cod",
//     };

//     console.log("🔍 DEBUG courier payload:", JSON.stringify(payload));
//     const r = await parcelx.post("/get_couriers", payload);
//     console.log("🔍 DEBUG courier response:", JSON.stringify(r.data));

//     return res.json({
//       success: true,
//       payload_sent:      payload,
//       parcelx_response:  r.data,
//     });
//   } catch (err) {
//     console.error("🔍 DEBUG courier error:", err.response?.data || err.message);
//     return res.json({
//       success: false,
//       error:       err.response?.data || err.message,
//       status_code: err.response?.status,
//     });
//   }
// });

// module.exports = router;



const router = require("express").Router();

const ctrl = require("../controllers/parcelxController");

const vendorAuth = require("../middleware/vendorAuth");
const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");

const parcelx = require("../config/parcelx");

/* ===============================
   WAREHOUSE ROUTES
================================ */

// CREATE WAREHOUSE
router.post(
  "/warehouse",
  vendorAuth,
  ctrl.createWarehouse
);

// GET VENDOR WAREHOUSES
router.get(
  "/warehouse/vendor",
  vendorAuth,
  ctrl.getVendorWarehouses
);

// GET CUSTOMER WAREHOUSE
router.get(
  "/warehouse",
  userAuth,
  ctrl.getWarehouseForCustomer
);

/* ===============================
   ORDER ROUTES
================================ */

// CREATE ORDER
router.post(
  "/order",
  userAuth,
  ctrl.createParcelxOrder
);

// UPDATE ORDER STATUS (ADMIN)
router.put(
  "/order/:id",
  ctrl.updateOrderStatus
);

// GET VENDOR ORDERS
router.get(
  "/vendor-orders",
  vendorAuth,
  ctrl.getVendorOrders
);

// GET ALL ORDERS (ADMIN)
router.get(
  "/orders",
 
  ctrl.getAllOrders
);

// CANCEL ORDER
router.post(
  "/cancel-order",
  userAuth,
  ctrl.cancelParcelxOrder
);

// GET PARCELX ORDERS
router.get(
  "/parcelx-orders",
 
  ctrl.getParcelxOrders
);

// DOWNLOAD LABEL
router.get(
  "/label/:awb",
  adminAuth,
  ctrl.downloadParcelxLabel
);

/* ===============================
   TRACKING ROUTES
================================ */

// TRACK ORDER
router.get(
  "/track/:awb",
  ctrl.trackParcelxOrder
);

// SHIPMENT DETAILS
router.get(
  "/shipment/:awb",
  ctrl.getParcelxShipmentDetails
);

/* ===============================
   TEMPORARY DEBUG ROUTE
================================ */

router.post(
  "/debug-couriers",
  userAuth,
  async (req, res) => {
    try {
      const pincode =
        req.body.pincode || "141001";

      const pick_address_id =
        req.body.pick_address_id || 92016;

      const payload = {
        pick_address_id: parseInt(
          pick_address_id
        ),

        pincode: pincode.toString(),

        weight: "0.5",

        payment_mode: "Cod",
      };

      console.log(
        "🔍 DEBUG courier payload:",
        JSON.stringify(payload)
      );

      const r = await parcelx.post(
        "/get_couriers",
        payload
      );

      console.log(
        "🔍 DEBUG courier response:",
        JSON.stringify(r.data)
      );

      return res.json({
        success: true,

        payload_sent: payload,

        parcelx_response: r.data,
      });

    } catch (err) {

      console.error(
        "🔍 DEBUG courier error:",
        err.response?.data || err.message
      );

      return res.json({
        success: false,

        error:
          err.response?.data ||
          err.message,

        status_code:
          err.response?.status,
      });
    }
  }
);

module.exports = router;
