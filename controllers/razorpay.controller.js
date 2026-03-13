const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const CustomerOrder = require("../models/CustomerOrder");

/* ================= RAZORPAY INSTANCE ================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= CREATE RAZORPAY ORDER ================= */
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderId, amount, currency } = req.body;

    console.log("🔥 CREATE RAZORPAY ORDER REQUEST:");
    console.log("  - Order ID:", orderId);
    console.log("  - Amount from Frontend:", amount, "paise");
    console.log("  - Currency:", currency);

    /* 🔴 VALIDATE ORDER ID */
    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid orderId",
      });
    }

    /* 🔴 VALIDATE AMOUNT */
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount - must be greater than 0",
      });
    }

    /* 🔍 FIND CUSTOMER ORDER */
    const order = await CustomerOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    /* ❌ ALREADY PAID CHECK */
    if (order.paymentStatus === "Success") {
      return res.status(400).json({
        success: false,
        message: "Order already paid",
      });
    }

    /* 🔥 USE THE AMOUNT SENT FROM FRONTEND (already in paise) */
    const finalAmountPaise = Math.round(amount);

    console.log("💰 RAZORPAY ORDER CREATION:");
    console.log("  - Final Amount (paise):", finalAmountPaise);
    console.log("  - Final Amount (₹):", finalAmountPaise / 100);

    if (finalAmountPaise <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payable amount",
      });
    }

    /* 🔐 CREATE RAZORPAY ORDER */
    const razorpayOrder = await razorpay.orders.create({
      amount: finalAmountPaise, // ✅ Use frontend's calculated amount
      currency: currency || "INR",
      receipt: `order_${order._id}`,
      payment_capture: 1,
    });

    console.log("✅ RAZORPAY ORDER CREATED:");
    console.log("  - Razorpay Order ID:", razorpayOrder.id);
    console.log("  - Amount in Razorpay:", razorpayOrder.amount, "paise");

    /* 💾 SAVE RAZORPAY ORDER ID */
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      totalPayable: razorpayOrder.amount / 100, // Send in rupees for display
    });
  } catch (error) {
    console.error("❌ Razorpay Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Razorpay order creation failed",
      error: error.message,
    });
  }
};

/* ================= VERIFY RAZORPAY PAYMENT ================= */
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    console.log("🔍 VERIFY PAYMENT REQUEST:");
    console.log("  - Order ID:", orderId);
    console.log("  - Payment ID:", razorpay_payment_id);
    console.log("  - Razorpay Order ID:", razorpay_order_id);

    /* 🔴 BASIC VALIDATION */
    if (
      !orderId ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details missing",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid orderId",
      });
    }

    /* 🔍 FIND ORDER */
    const order = await CustomerOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    /* 🔐 VERIFY SIGNATURE */
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    console.log("🔐 SIGNATURE VERIFICATION:");
    console.log("  - Generated:", generatedSignature);
    console.log("  - Received:", razorpay_signature);
    console.log("  - Match:", generatedSignature === razorpay_signature);

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed - Invalid signature",
      });
    }

    /* ✅ UPDATE ORDER STATUS */
    order.paymentMethod = "razorpay";
    order.paymentStatus = "Success";
    order.orderStatus = "Confirmed";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    await order.save();

    console.log("✅ PAYMENT VERIFIED & ORDER UPDATED");

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Payment Verify Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
