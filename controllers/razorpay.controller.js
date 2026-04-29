// // const Razorpay = require("razorpay");
// // const crypto = require("crypto");
// // const mongoose = require("mongoose");

// // const CustomerOrder = require("../models/CustomerOrder");
// // const Vendor = require("../models/VendorModel");

// // /* ================= INSTANCE ================= */
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// // /* ================= CREATE ORDER WITH SPLIT ================= */
// // exports.createRazorpayOrder = async (req, res) => {
// //   try {
// //     const { orderId } = req.body;

// //     if (!mongoose.Types.ObjectId.isValid(orderId)) {
// //       return res.status(400).json({ success: false, message: "Invalid orderId" });
// //     }

// //     const order = await CustomerOrder.findById(orderId);
// //     if (!order) {
// //       return res.status(404).json({ success: false, message: "Order not found" });
// //     }

// //     if (order.paymentStatus === "Success") {
// //       return res.status(400).json({ success: false, message: "Already paid" });
// //     }

// //     if (!order.vendorId) {
// //       return res.status(400).json({ success: false, message: "Vendor missing" });
// //     }

// //     const vendor = await Vendor.findById(order.vendorId);

// //     if (!vendor?.razorpayAccountId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vendor Razorpay account not created",
// //       });
// //     }

// //     /* ================= CALCULATE ================= */
// //     const totalAmount = Math.round(order.totalPayable * 100);
// //     const vendorAmount = Math.round(order.totalPayable * 0.8 * 100);

// //     order.vendorAmount = vendorAmount / 100;
// //     order.platformAmount = order.totalPayable - order.vendorAmount;

// //     /* ================= CREATE ORDER ================= */
// //     const razorpayOrder = await razorpay.orders.create({
// //       amount: totalAmount,
// //       currency: "INR",
// //       receipt: `order_${order._id}`,
// //       payment_capture: 1,

// //       transfers: [
// //         {
// //           account: vendor.razorpayAccountId,
// //           amount: vendorAmount,
// //           currency: "INR",
// //           notes: {
// //             order_id: order._id.toString(),
// //           },
// //           on_hold: true, // 🔥 HOLD MONEY
// //         },
// //       ],
// //     });

// //     /* ================= SAVE DATA ================= */
// //     order.razorpayOrderId = razorpayOrder.id;
// //     order.payoutStatus = "OnHold";

// //     // 🔥 IMPORTANT FIX (TRANSFER ID SAVE)
// //     if (razorpayOrder.transfers && razorpayOrder.transfers.length > 0) {
// //       order.transferId = razorpayOrder.transfers[0].id;
// //       order.transferCreated = true;
// //     }

// //     await order.save();

// //     return res.json({
// //       success: true,
// //       razorpayOrderId: razorpayOrder.id,
// //       amount: razorpayOrder.amount,
// //       key: process.env.RAZORPAY_KEY_ID,
// //     });

// //   } catch (error) {
// //     console.error("❌ CREATE ORDER ERROR:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Order creation failed",
// //       error: error.message,
// //     });
// //   }
// // };

// // /* ================= VERIFY PAYMENT ================= */
// // exports.verifyRazorpayPayment = async (req, res) => {
// //   try {
// //     const {
// //       orderId,
// //       razorpay_payment_id,
// //       razorpay_order_id,
// //       razorpay_signature,
// //     } = req.body;

// //     const order = await CustomerOrder.findById(orderId);
// //     if (!order) {
// //       return res.status(404).json({ success: false });
// //     }

// //     /* ================= VERIFY ================= */
// //     const generatedSignature = crypto
// //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
// //       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
// //       .digest("hex");

// //     if (generatedSignature !== razorpay_signature) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid signature",
// //       });
// //     }

// //     /* ================= SUCCESS ================= */
// //     order.paymentStatus = "Success";
// //     order.orderStatus = "Confirmed";
// //     order.paymentMethod = "razorpay";

// //     order.razorpayPaymentId = razorpay_payment_id;
// //     order.transferStatus = "Pending";

// //     await order.save();

// //     return res.json({
// //       success: true,
// //       message: "Payment verified",
// //     });

// //   } catch (error) {
// //     console.error("❌ VERIFY ERROR:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Verification failed",
// //     });
// //   }
// // };

// // /* ================= RELEASE AFTER 7 DAYS ================= */
// // exports.releasePaymentAfterDelivery = async (order) => {
// //   try {
// //     if (!order.transferId) {
// //       console.log("⚠️ No transferId:", order._id);
// //       return;
// //     }

// //     // 🔥 RELEASE MONEY (FIXED)
// //     await razorpay.transfers.edit(order.transferId, {
// //       on_hold: false,
// //     });

// //     order.payoutStatus = "Released";
// //     order.payoutReleasedAt = new Date();

// //     await order.save();

// //     console.log("✅ Payout released:", order._id);

// //   } catch (err) {
// //     console.error("❌ RELEASE ERROR:", err.message);
// //   }
// // };



// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const mongoose = require("mongoose");

// const CustomerOrder = require("../models/CustomerOrder");
// const Vendor = require("../models/VendorModel");

// /* ================= INSTANCE ================= */
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /* ================= SHIPPING FUNCTION ================= */
// const calculateShipping = (weightKg) => {
//   if (weightKg <= 0.5) return 75;
//   if (weightKg <= 1) return 99;
//   if (weightKg <= 2) return 135;

//   if (weightKg <= 5) {
//     const extraKg = Math.ceil(weightKg - 2);
//     return 135 + (extraKg * 35);
//   }

//   const extraKg = Math.ceil(weightKg - 5);
//   return 135 + (3 * 35) + (extraKg * 20);
// };

// /* ================= CREATE ORDER (ADMIN + VENDOR) ================= */
// exports.createRazorpayOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({ success: false, message: "Invalid orderId" });
//     }

//     const order = await CustomerOrder.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     if (order.paymentStatus === "Success") {
//       return res.status(400).json({ success: false, message: "Already paid" });
//     }

//     /* ================= COMMON CALC ================= */

//     const productPrice = order.amount;
//     const weight = order.shipment?.weight || 0.5;

//     const shippingFee = calculateShipping(weight);

//     const pgBase = productPrice * 0.02;
//     const pgFee = Math.round(pgBase * 1.18);

//     const codFee = order.paymentMethod === "cod" ? 30 : 0;

//     const totalAmount = productPrice + codFee;

//     /* =====================================================
//        🔥 CASE 1: ADMIN ORDER (NO SPLIT)
//     ===================================================== */
//     if (!order.vendorId) {
//       const razorpayOrder = await razorpay.orders.create({
//         amount: Math.round(totalAmount * 100),
//         currency: "INR",
//         receipt: `order_${order._id}`,
//         payment_capture: 1,
//       });

//       order.razorpayOrderId = razorpayOrder.id;
//       await order.save();

//       return res.json({
//         success: true,
//         razorpayOrderId: razorpayOrder.id,
//         amount: razorpayOrder.amount,
//         key: process.env.RAZORPAY_KEY_ID,
//       });
//     }

//     /* =====================================================
//        🔥 CASE 2: VENDOR ORDER (SPLIT PAYMENT)
//     ===================================================== */

//     const vendor = await Vendor.findById(order.vendorId);

//     if (!vendor?.razorpayAccountId) {
//       return res.status(400).json({
//         success: false,
//         message: "Vendor Razorpay account not created",
//       });
//     }

//     const sellerAmount = productPrice - shippingFee - pgFee;

//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(totalAmount * 100),
//       currency: "INR",
//       receipt: `order_${order._id}`,
//       payment_capture: 1,

//       transfers: [
//         {
//           account: vendor.razorpayAccountId,
//           amount: Math.round(sellerAmount * 100),
//           currency: "INR",
//           notes: {
//             order_id: order._id.toString(),
//             breakdown: "product - shipping - pg_fee",
//           },
//           on_hold: true,
//           on_hold_until: Math.floor(
//             (Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000
//           ),
//         },
//       ],
//     });

//     /* ================= SAVE DATA ================= */
//     order.razorpayOrderId = razorpayOrder.id;
//     order.vendorAmount = sellerAmount;
//     order.platformAmount = totalAmount - sellerAmount;
//     order.payoutStatus = "OnHold";

//     if (razorpayOrder.transfers?.length > 0) {
//       order.transferId = razorpayOrder.transfers[0].id;
//       order.transferCreated = true;
//     }

//     await order.save();

//     return res.json({
//       success: true,
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       key: process.env.RAZORPAY_KEY_ID,
//     });

//   } catch (error) {
//     console.error("❌ CREATE ORDER ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Order creation failed",
//       error: error.message,
//     });
//   }
// };

// /* ================= VERIFY PAYMENT ================= */
// exports.verifyRazorpayPayment = async (req, res) => {
//   try {
//     const {
//       orderId,
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//     } = req.body;

//     const order = await CustomerOrder.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false });
//     }

//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature",
//       });
//     }

//     /* ================= SUCCESS ================= */
//     order.paymentStatus = "Success";
//     order.orderStatus = "Confirmed";
//     order.paymentMethod = "razorpay";

//     order.razorpayPaymentId = razorpay_payment_id;
//     order.transferStatus = "Pending";

//     await order.save();

//     return res.json({
//       success: true,
//       message: "Payment verified",
//     });

//   } catch (error) {
//     console.error("❌ VERIFY ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Verification failed",
//     });
//   }
// };

// /* ================= RELEASE AFTER 7 DAYS ================= */
// exports.releasePaymentAfterDelivery = async (order) => {
//   try {
//     if (!order.transferId) {
//       console.log("⚠️ No transferId:", order._id);
//       return;
//     }

//     await razorpay.transfers.edit(order.transferId, {
//       on_hold: false,
//     });

//     order.payoutStatus = "Released";
//     order.payoutReleasedAt = new Date();

//     await order.save();

//     console.log("✅ Payout released:", order._id);

//   } catch (err) {
//     console.error("❌ RELEASE ERROR:", err.message);
//   }
// };


const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");

const CustomerOrder = require("../models/CustomerOrder");
const Vendor = require("../models/VendorModel");

/* ================= INSTANCE ================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= SHIPPING FUNCTION ================= */
const calculateShipping = (weightKg) => {
  if (weightKg <= 0.5) return 75;
  if (weightKg <= 1) return 99;
  if (weightKg <= 2) return 135;

  if (weightKg <= 5) {
    const extraKg = Math.ceil(weightKg - 2);
    return 135 + (extraKg * 35);
  }

  const extraKg = Math.ceil(weightKg - 5);
  return 135 + (3 * 35) + (extraKg * 20);
};

/* ================= CREATE ORDER (ADMIN + VENDOR) ================= */
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid orderId" });
    }

    const order = await CustomerOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.paymentStatus === "Success") {
      return res.status(400).json({ success: false, message: "Already paid" });
    }

    /* ================= COMMON CALC ================= */

    const productPrice = order.amount;
    const weight = order.shipment?.weight || 0.5;

    const shippingFee = calculateShipping(weight);

    const pgBase = productPrice * 0.02;
    const pgFee = Math.round(pgBase * 1.18);

    const codFee = order.paymentMethod === "cod" ? 30 : 0;

    const totalAmount = productPrice + codFee;

    /* =====================================================
       🔥 CASE 1: ADMIN ORDER (NO SPLIT)
    ===================================================== */
    if (!order.vendorId) {
      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `order_${order._id}`,
        payment_capture: 1,
      });

      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      return res.json({
        success: true,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        key: process.env.RAZORPAY_KEY_ID,
      });
    }

    /* =====================================================
       🔥 CASE 2: VENDOR ORDER (SPLIT PAYMENT)
    ===================================================== */

    const vendor = await Vendor.findById(order.vendorId);

    if (!vendor?.razorpayAccountId) {
      return res.status(400).json({
        success: false,
        message: "Vendor Razorpay account not created",
      });
    }

    const sellerAmount = productPrice - shippingFee - pgFee;

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `order_${order._id}`,
      payment_capture: 1,

      transfers: [
        {
          account: vendor.razorpayAccountId,
          amount: Math.round(sellerAmount * 100),
          currency: "INR",
          notes: {
            order_id: order._id.toString(),
            breakdown: "product - shipping - pg_fee",
          },
          on_hold: true,
          on_hold_until: Math.floor(
            (Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000
          ),
        },
      ],
    });

    /* ================= SAVE DATA ================= */
    order.razorpayOrderId = razorpayOrder.id;
    order.vendorAmount = sellerAmount;
    order.platformAmount = totalAmount - sellerAmount;
    order.payoutStatus = "OnHold";

    if (razorpayOrder.transfers?.length > 0) {
      order.transferId = razorpayOrder.transfers[0].id;
      order.transferCreated = true;
    }

    await order.save();

    return res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("❌ CREATE ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
};

/* ================= VERIFY PAYMENT ================= */
// exports.verifyRazorpayPayment = async (req, res) => {
//   try {
//     const {
//       orderId,
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//     } = req.body;

//     const order = await CustomerOrder.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false });
//     }

//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature",
//       });
//     }

//     /* ================= SUCCESS ================= */
//     order.paymentStatus = "Success";
//     order.orderStatus = "Confirmed";
//     order.paymentMethod = "razorpay";

//     order.razorpayPaymentId = razorpay_payment_id;
//     order.transferStatus = "Pending";

//     await order.save();

//     return res.json({
//       success: true,
//       message: "Payment verified",
//     });

//   } catch (error) {
//     console.error("❌ VERIFY ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Verification failed",
//     });
//   }
// };
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const order = await CustomerOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    /* ================= SUCCESS ================= */
    order.paymentStatus = "Success";
    order.orderStatus = "Confirmed";
    order.paymentMethod = "razorpay";

    order.razorpayPaymentId = razorpay_payment_id;
    order.transferStatus = "Pending";

    await order.save();

    return res.json({
      success: true,
      message: "Payment verified",
    });

  } catch (error) {
    console.error("❌ VERIFY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};
/* ================= RELEASE AFTER 7 DAYS ================= */
exports.releasePaymentAfterDelivery = async (order) => {
  try {
    if (!order.transferId) {
      console.log("⚠️ No transferId:", order._id);
      return;
    }

    await razorpay.transfers.edit(order.transferId, {
      on_hold: false,
    });

    order.payoutStatus = "Released";
    order.payoutReleasedAt = new Date();

    await order.save();

    console.log("✅ Payout released:", order._id);

  } catch (err) {
    console.error("❌ RELEASE ERROR:", err.message);
  }
};
