// // const express = require("express");
// // const Razorpay = require("razorpay");
// // const crypto = require("crypto");
// // require("dotenv").config();

// // const router = express.Router();

// // // Create Razorpay instance
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// // // Create Order
// // router.post("/create-order", async (req, res) => {
// //   try {
// //     const { amount } = req.body;

// //     const options = {
// //       amount: amount * 100, // amount in paise
// //       currency: "INR",
// //       receipt: "receipt#" + Math.random(),
// //     };

// //     const order = await razorpay.orders.create(options);

// //     res.json({
// //       success: true,
// //       order,
// //       key: process.env.RAZORPAY_KEY_ID,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ success: false });
// //   }
// // });

// // // Verify Payment
// // router.post("/verify-payment", async (req, res) => {
// //   try {
// //     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

// //     const body = razorpay_order_id + "|" + razorpay_payment_id;

// //     const expectedSignature = crypto
// //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
// //       .update(body.toString())
// //       .digest("hex");

// //     if (expectedSignature === razorpay_signature) {
// //       res.json({ success: true, message: "Payment verified successfully" });
// //     } else {
// //       res.json({ success: false, message: "Invalid signature" });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ success: false, error });
// //   }
// // });

// // module.exports = router;





// // const express = require("express");
// // const router = express.Router();
// // const { createOrder, verifyPayment } = require("../controllers/paymentController");

// // router.post("/create-order", createOrder);
// // router.post("/verify-payment", verifyPayment);

// // module.exports = router;










// // const express = require("express");
// // const Razorpay = require("razorpay");
// // const crypto = require("crypto");
// // require("dotenv").config();

// // const router = express.Router();

// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET
// // });

// // // Create Order API
// // router.post("/create-order", async (req, res) => {
// //   try {
// //     const { amount } = req.body;

// //     const options = {
// //       amount: Number(amount) * 100,
// //       currency: "INR",
// //       receipt: "receipt_" + Date.now(),
// //     };

// //     const order = await razorpay.orders.create(options);
// //     res.json({
// //       success: true,
// //       key: process.env.RAZORPAY_KEY_ID,
// //       order
// //     });

// //   } catch (err) {
// //     console.log("createOrder error:", err);
// //     res.status(500).json({ success: false, message: "Order creation failed" });
// //   }
// // });

// // // Verify Payment API
// // router.post("/verify-payment", async (req, res) => {
// //   try {
// //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
// //       req.body;

// //     const sign = razorpay_order_id + "|" + razorpay_payment_id;
// //     const expectedSign = crypto
// //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
// //       .update(sign)
// //       .digest("hex");

// //     if (expectedSign === razorpay_signature) {
// //       return res.json({ success: true });
// //     }

// //     res.json({ success: false });

// //   } catch (error) {
// //     console.log("verify error:", error);
// //     res.status(500).json({ success: false });
// //   }
// // });

// // module.exports = router;





// // const express = require("express");
// // const crypto = require("crypto");
// // const Razorpay = require("razorpay");
// // const Payment = require("../models/paymentModel");
// // const CustomerOrder = require("../models/CustomerOrder");

// // const router = express.Router();

// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// // // ================= CREATE PAYMENT ORDER =================
// // router.post("/razorpay/create-order", async (req, res) => {
// //   try {
// //     const { amount, orderId, customerId } = req.body;

// //     if (!amount || !orderId) {
// //       return res.status(400).json({ success: false, message: "Amount and orderId required" });
// //     }

// //     const options = {
// //       amount: Number(amount) * 100, // RSI → Paisa
// //       currency: "INR",
// //       receipt: orderId,
// //     };

// //     const razorOrder = await razorpay.orders.create(options);

// //     // Save payment initial record
// //     await Payment.create({
// //       razorpayOrderId: razorOrder.id,
// //       customerOrderId: orderId,
// //       amount: amount,
// //       status: "PENDING",
// //       customer: customerId || null
// //     });

// //     return res.status(200).json({
// //       success: true,
// //       key: process.env.RAZORPAY_KEY_ID,
// //       order_id: razorOrder.id,
// //       amount: amount,
// //       currency: "INR"
// //     });

// //   } catch (error) {
// //     console.log("create-order error:", error);
// //     return res.status(500).json({ success: false, message: "Payment order creation failed" });
// //   }
// // });

// // // ================= VERIFY PAYMENT =================
// // router.post("/razorpay/verify-payment", async (req, res) => {
// //   try {
// //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

// //     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
// //       return res.status(400).json({ success: false, message: "Missing payment details" });
// //     }

// //     const sign = razorpay_order_id + "|" + razorpay_payment_id;
// //     const expectedSignature = crypto
// //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
// //       .update(sign)
// //       .digest("hex");

// //     const paymentStatus = expectedSignature === razorpay_signature ? "SUCCESS" : "FAILED";

// //     // Update Payment DB
// //     const payment = await Payment.findOneAndUpdate(
// //       { razorpayOrderId: razorpay_order_id },
// //       {
// //         razorpayPaymentId: razorpay_payment_id,
// //         signature: razorpay_signature,
// //         status: paymentStatus
// //       },
// //       { new: true }
// //     );

// //     // Update CustomerOrder DB
// //     if (payment && payment.customerOrderId) {
// //       await CustomerOrder.findByIdAndUpdate(payment.customerOrderId, {
// //         paymentStatus: paymentStatus === "SUCCESS" ? "Completed" : "Failed",
// //         orderStatus: paymentStatus === "SUCCESS" ? "Confirmed" : "Pending"
// //       });
// //     }

// //     return res.status(200).json({
// //       success: paymentStatus === "SUCCESS",
// //       message: paymentStatus === "SUCCESS" ? "Payment verified successfully" : "Invalid Signature"
// //     });

// //   } catch (error) {
// //     console.log("verify-payment error:", error);
// //     return res.status(500).json({ success: false, message: "Payment verification failed" });
// //   }
// // });

// // module.exports = router;





// // const express = require("express");
// // const crypto = require("crypto");
// // const Razorpay = require("razorpay");
// // const Payment = require("../models/paymentModel");
// // const CustomerOrder = require("../models/CustomerOrder");

// // const router = express.Router();

// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// // // ================= CREATE PAYMENT ORDER =================
// // router.post("/create-order", async (req, res) => {
// //   try {
// //     const { amount, orderId, customerId } = req.body;

// //     if (!amount || !orderId) {
// //       return res.status(400).json({ success: false, message: "Amount and OrderId required" });
// //     }

// //     const razorOrder = await razorpay.orders.create({
// //       amount: Number(amount) * 100, // convert rupees to paisa
// //       currency: "INR",
// //       receipt: `${orderId}`,
// //     });

// //     await Payment.create({
// //       razorpayOrderId: razorOrder.id,
// //       customerOrderId: orderId,
// //       amount,
// //       status: "PENDING",
// //       customerId: customerId || null
// //     });

// //     return res.status(200).json({
// //       success: true,
// //       key: process.env.RAZORPAY_KEY_ID,
// //       order_id: razorOrder.id,
// //       amount,
// //       currency: "INR"
// //     });

// //   } catch (error) {
// //     console.log("create-order error:", error);
// //     return res.status(500).json({ success: false, message: "Payment order creation failed" });
// //   }
// // });

// // // ================= VERIFY PAYMENT =================
// // router.post("/verify-payment", async (req, res) => {
// //   try {
// //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

// //     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
// //       return res.status(400).json({ success: false, message: "Missing payment details" });
// //     }

// //     const sign = razorpay_order_id + "|" + razorpay_payment_id;
// //     const expectedSignature = crypto
// //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
// //       .update(sign)
// //       .digest("hex");

// //     const status = expectedSignature === razorpay_signature ? "SUCCESS" : "FAILED";

// //     // update payment record
// //     const payment = await Payment.findOneAndUpdate(
// //       { razorpayOrderId: razorpay_order_id },
// //       {
// //         razorpayPaymentId: razorpay_payment_id,
// //         signature: razorpay_signature,
// //         status
// //       },
// //       { new: true }
// //     );

// //     // update order record
// //     if (payment && payment.customerOrderId) {
// //       await CustomerOrder.findByIdAndUpdate(payment.customerOrderId, {
// //         paymentStatus: status === "SUCCESS" ? "Completed" : "Failed",
// //         orderStatus: status === "SUCCESS" ? "Confirmed" : "Pending"
// //       });
// //     }

// //     return res.status(200).json({
// //       success: status === "SUCCESS",
// //       message: status === "SUCCESS" ? "Payment verified successfully" : "Invalid signature"
// //     });

// //   } catch (error) {
// //     console.log("verify-payment error:", error);
// //     return res.status(500).json({ success: false, message: "Payment verification failed" });
// //   }
// // });

// // module.exports = router;






// const express = require("express");
// const {
//   createOrder,
//   verifyPayment
// } = require("../controllers/paymentController");

// const router = express.Router();

// router.post("/create-order", createOrder);
// router.post("/verify-payment", verifyPayment);

// module.exports = router;
