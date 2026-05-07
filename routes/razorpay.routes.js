// // const express = require("express");
// // const router = express.Router();

// // console.log("🔥 razorpay.routes.js loaded"); // DEBUG LINE

// // router.get("/test", (req, res) => {
// //   res.send("Razorpay route working");
// // });

// // const {
// //   createRazorpayOrder,
// //   verifyRazorpayPayment,
// // } = require("../controllers/razorpay.controller");

// // router.post("/create-order", createRazorpayOrder);
// // router.post("/verify-payment", verifyRazorpayPayment);

// // module.exports = router;



// const express = require("express");
// const router = express.Router();

// const userAuth = require("../middleware/userAuth");

// const {
//   createRazorpayOrder,
//   verifyRazorpayPayment,
// } = require("../controllers/razorpay.controller");

// // TEST
// router.get("/test", (req, res) => {
//   res.send("Razorpay route working");
// });

// // MAIN
// router.post("/create-order", userAuth, createRazorpayOrder);
// router.post("/verify-payment", userAuth, verifyRazorpayPayment);

// module.exports = router;


const express = require("express");
const router = express.Router();

const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");

const {
  createRazorpayOrder,
  verifyRazorpayPayment,
  adminReleaseVendorPayment,
} = require("../controllers/razorpay.controller");


router.get("/test", (req, res) => {
  res.send("Razorpay route working");
});


router.post(
  "/create-order",
  userAuth,
  createRazorpayOrder
);

router.post(
  "/verify-payment",
  userAuth,
  verifyRazorpayPayment
);


router.put(
  "/admin/release-payment/:orderId",
  adminAuth,
  adminReleaseVendorPayment
);

module.exports = router;
