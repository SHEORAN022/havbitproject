// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// require("dotenv").config();

// const router = express.Router();

// // Create Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Order
// router.post("/create-order", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100, // amount in paise
//       currency: "INR",
//       receipt: "receipt#" + Math.random(),
//     };

//     const order = await razorpay.orders.create(options);

//     res.json({
//       success: true,
//       order,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });

// // Verify Payment
// router.post("/verify-payment", async (req, res) => {
//   try {
//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       res.json({ success: true, message: "Payment verified successfully" });
//     } else {
//       res.json({ success: false, message: "Invalid signature" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// });

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const { createOrder, verifyPayment } = require("../controllers/paymentController");

// router.post("/create-order", createOrder);
// router.post("/verify-payment", verifyPayment);

// module.exports = router;










const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order API
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order
    });

  } catch (err) {
    console.log("createOrder error:", err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
});

// Verify Payment API
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      return res.json({ success: true });
    }

    res.json({ success: false });

  } catch (error) {
    console.log("verify error:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
