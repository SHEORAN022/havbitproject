// const express = require("express");
// const router = express.Router();

// const {
//   createWarehouse,
//   createOrder,
//   trackOrder,
//   shipmentDetails,
// } = require("../controllers/parcelxController");

// router.post("/warehouse", createWarehouse);
// router.post("/order", createOrder);
// router.get("/order/track", trackOrder);
// router.get("/shipment", shipmentDetails);

// module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createWarehouse,
  createOrder,
  trackOrder,
  shipmentDetails,
   getCourierRates,  
} = require("../controllers/parcelxController");

router.post("/warehouse", createWarehouse);
router.post("/courier/rates", getCourierRates);
router.post("/order", createOrder);
router.get("/order/track", trackOrder);
router.get("/shipment", shipmentDetails);

module.exports = router;
