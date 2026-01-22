const express = require("express");
const router = express.Router();

console.log("🔥 razorpay.routes.js loaded"); // DEBUG LINE

router.get("/test", (req, res) => {
  res.send("Razorpay route working");
});

const {
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../controllers/razorpay.controller");

router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", verifyRazorpayPayment);

module.exports = router;
