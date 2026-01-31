

// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const mongoose = require("mongoose");
// const CustomerOrder = require("../models/CustomerOrder");

// /* ================= RAZORPAY INSTANCE ================= */
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /* ================= CREATE RAZORPAY ORDER ================= */
// exports.createRazorpayOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     /* 🔴 ORDER ID VALIDATION */
//     if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid orderId",
//       });
//     }

//     /* 🔍 FIND ORDER */
//     const order = await CustomerOrder.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     /* 🔐 CREATE RAZORPAY ORDER */
//     const options = {
//       amount: order.totalPayable * 100, // rupees → paise
//       currency: "INR",
//       receipt: order._id.toString(),
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     /* 💾 SAVE RAZORPAY ORDER ID */
//     order.razorpayOrderId = razorpayOrder.id;
//     await order.save();

//     return res.status(200).json({
//       success: true,
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= VERIFY RAZORPAY PAYMENT ================= */
// exports.verifyRazorpayPayment = async (req, res) => {
//   try {
//     const {
//       orderId,
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//     } = req.body;

//     /* 🔴 BASIC VALIDATION */
//     if (
//       !orderId ||
//       !razorpay_payment_id ||
//       !razorpay_order_id ||
//       !razorpay_signature
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment details missing",
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid orderId",
//       });
//     }

//     /* 🔍 FIND ORDER */
//     const order = await CustomerOrder.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     /* 🔐 SIGNATURE VERIFY */
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     /* ✅ UPDATE ORDER */
//     order.paymentMethod = "razorpay";
//     order.paymentStatus = "Success";
//     order.orderStatus = "Confirmed";
//     order.razorpayPaymentId = razorpay_payment_id;
//     order.razorpaySignature = razorpay_signature;

//     await order.save();

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//       order,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




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
    const { orderId } = req.body;

    /* 🔴 VALIDATE ORDER ID */
    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid orderId",
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

    /* 🔥 FINAL AMOUNT (DISCOUNT + SHIPPING APPLIED) */
    const finalAmount = Math.max(
      0,
      Math.round(order.totalPayable * 100) // rupees → paise
    );

    if (finalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payable amount",
      });
    }

    /* 🔐 CREATE RAZORPAY ORDER */
    const razorpayOrder = await razorpay.orders.create({
      amount: finalAmount,
      currency: "INR",
      receipt: `order_${order._id}`,
      payment_capture: 1,
    });

    /* 💾 SAVE RAZORPAY ORDER ID */
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      totalPayable: order.totalPayable, // frontend ke liye
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Razorpay order creation failed",
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

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    /* ✅ UPDATE ORDER STATUS */
    order.paymentMethod = "razorpay";
    order.paymentStatus = "Success";
    order.orderStatus = "Confirmed";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    console.error("Payment Verify Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

