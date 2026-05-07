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

// // /* ================= SHIPPING FUNCTION ================= */
// // const calculateShipping = (weightKg) => {
// //   if (weightKg <= 0.5) return 75;
// //   if (weightKg <= 1) return 99;
// //   if (weightKg <= 2) return 135;

// //   if (weightKg <= 5) {
// //     const extraKg = Math.ceil(weightKg - 2);
// //     return 135 + (extraKg * 35);
// //   }

// //   const extraKg = Math.ceil(weightKg - 5);
// //   return 135 + (3 * 35) + (extraKg * 20);
// // };

// // /* ================= CREATE ORDER (ADMIN + VENDOR) ================= */
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

// //     /* ================= COMMON CALC ================= */

// //     const productPrice = order.amount;
// //     const weight = order.shipment?.weight || 0.5;

// //     const shippingFee = calculateShipping(weight);

// //     const pgBase = productPrice * 0.02;
// //     const pgFee = Math.round(pgBase * 1.18);

// //     const codFee = order.paymentMethod === "cod" ? 30 : 0;

// //     const totalAmount = productPrice + codFee;

// //     /* =====================================================
// //        🔥 CASE 1: ADMIN ORDER (NO SPLIT)
// //     ===================================================== */
// //     if (!order.vendorId) {
// //       const razorpayOrder = await razorpay.orders.create({
// //         amount: Math.round(totalAmount * 100),
// //         currency: "INR",
// //         receipt: `order_${order._id}`,
// //         payment_capture: 1,
// //       });

// //       order.razorpayOrderId = razorpayOrder.id;
// //       await order.save();

// //       return res.json({
// //         success: true,
// //         razorpayOrderId: razorpayOrder.id,
// //         amount: razorpayOrder.amount,
// //         key: process.env.RAZORPAY_KEY_ID,
// //       });
// //     }

// //     /* =====================================================
// //        🔥 CASE 2: VENDOR ORDER (SPLIT PAYMENT)
// //     ===================================================== */

// //     const vendor = await Vendor.findById(order.vendorId);

// //     if (!vendor?.razorpayAccountId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vendor Razorpay account not created",
// //       });
// //     }

// //     const sellerAmount = productPrice - shippingFee - pgFee;

// //     const razorpayOrder = await razorpay.orders.create({
// //       amount: Math.round(totalAmount * 100),
// //       currency: "INR",
// //       receipt: `order_${order._id}`,
// //       payment_capture: 1,

// //       transfers: [
// //         {
// //           account: vendor.razorpayAccountId,
// //           amount: Math.round(sellerAmount * 100),
// //           currency: "INR",
// //           notes: {
// //             order_id: order._id.toString(),
// //             breakdown: "product - shipping - pg_fee",
// //           },
// //           on_hold: true,
// //           on_hold_until: Math.floor(
// //             (Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000
// //           ),
// //         },
// //       ],
// //     });

// //     /* ================= SAVE DATA ================= */
// //     order.razorpayOrderId = razorpayOrder.id;
// //     order.vendorAmount = sellerAmount;
// //     order.platformAmount = totalAmount - sellerAmount;
// //     order.payoutStatus = "OnHold";

// //     if (razorpayOrder.transfers?.length > 0) {
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

// /* ===============================
//    RAZORPAY INSTANCE
// ================================ */
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /* ===============================
//    SHIPPING CALCULATOR
// ================================ */
// const calculateShipping = (weightKg) => {
//   if (weightKg <= 0.5) return 75;
//   if (weightKg <= 1) return 99;
//   if (weightKg <= 2) return 135;
//   if (weightKg <= 5) return 135 + Math.ceil(weightKg - 2) * 35;
//   return 135 + 3 * 35 + Math.ceil(weightKg - 5) * 20;
// };

// /* ===============================
//    CREATE RAZORPAY ORDER
//    सभी payments पहले Admin के pass
//    Vendor को delivery के 7 दिन बाद
// ================================ */
// exports.createRazorpayOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     /* ── 1. VALIDATION ── */
//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid orderId",
//       });
//     }

//     const order = await CustomerOrder.findById(orderId);
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     if (order.paymentStatus === "Success") {
//       return res.status(400).json({
//         success: false,
//         message: "Already paid",
//       });
//     }

//     /* ── 2. AMOUNT CALCULATION ── */
//     const productPrice = order.amount;
//     const codFee = order.paymentMethod === "cod" ? 30 : 0;
//     const totalAmount = productPrice + codFee;

//     console.log("💰 productPrice:", productPrice, "| totalAmount:", totalAmount);

//     /* ── 3. CREATE RAZORPAY ORDER ── */
//     // ✅ सभी payments Admin के pass जाएंगी
//     // Vendor को delivery के 7 दिन बाद automatically मिलेगा
//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(totalAmount * 100),
//       currency: "INR",
//       receipt: `order_${order._id}`,
//       payment_capture: 1,
//     });

//     /* ── 4. SAVE ── */
//     order.razorpayOrderId = razorpayOrder.id;
//     order.payoutStatus = "Pending";
//     await order.save();

//     console.log("✅ Razorpay order created:", razorpayOrder.id);

//     return res.json({
//       success: true,
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: "INR",
//       key: process.env.RAZORPAY_KEY_ID,
//     });

//   } catch (error) {
//     console.error("❌ CREATE ORDER ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Order creation failed",
//       error: error.message,
//     });
//   }
// };

// /* ===============================
//    VERIFY RAZORPAY PAYMENT
// ================================ */
// exports.verifyRazorpayPayment = async (req, res) => {
//   try {
//     const {
//       orderId,
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//     } = req.body;

//     /* ── 1. DEBUG LOGS ── */
//     console.log("📩 VERIFY REQUEST:");
//     console.log("   orderId            :", orderId);
//     console.log("   razorpay_order_id  :", razorpay_order_id);
//     console.log("   razorpay_payment_id:", razorpay_payment_id);
//     console.log("   KEY_SECRET exists  :", !!process.env.RAZORPAY_KEY_SECRET);

//     /* ── 2. VALIDATION ── */
//     if (!orderId || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required payment fields",
//       });
//     }

//     /* ── 3. FIND ORDER ── */
//     const order = await CustomerOrder.findById(orderId);
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     if (order.paymentStatus === "Success") {
//       return res.json({
//         success: true,
//         message: "Payment already verified",
//       });
//     }

//     /* ── 4. SIGNATURE VERIFY ── */
//     const orderIdForSig = razorpay_order_id || order.razorpayOrderId;

//     if (!orderIdForSig) {
//       return res.status(400).json({
//         success: false,
//         message: "razorpay_order_id missing",
//       });
//     }

//     const body = orderIdForSig + "|" + razorpay_payment_id;

//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     console.log("   Generated :", generatedSignature);
//     console.log("   Received  :", razorpay_signature);
//     console.log("   Match     :", generatedSignature === razorpay_signature);

//     if (generatedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature — payment verification failed",
//       });
//     }

//     /* ── 5. UPDATE ORDER ── */
//     order.paymentStatus     = "Success";
//     order.orderStatus       = "Confirmed";
//     order.paymentMethod     = "razorpay";
//     order.razorpayPaymentId = razorpay_payment_id;
//     order.transferStatus    = "Pending";

//     await order.save();

//     /* ── 6. VENDOR ORDER है तो transfer create करो ── */
//     // ✅ PDF Step 2: Payment capture के बाद transfer create करो on_hold: true के साथ
//     if (order.vendorId) {
//       try {
//         await createTransferForVendor(order, razorpay_payment_id);
//       } catch (transferErr) {
//         // Transfer fail होने पर order cancel मत करो — log करो
//         console.error("⚠️ Transfer creation failed:", transferErr.message);
//       }
//     }

//     console.log("✅ Payment verified for order:", orderId);

//     return res.json({
//       success: true,
//       message: "Payment verified successfully",
//     });

//   } catch (error) {
//     console.error("❌ VERIFY ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Verification failed",
//       error: error.message,
//     });
//   }
// };

// /* ===============================
//    TRANSFER CREATE FOR VENDOR
//    PDF Step 2: on_hold: true
//    Payment capture के बाद
// ================================ */
// const createTransferForVendor = async (order, paymentId) => {
//   try {
//     const vendor = await Vendor.findById(order.vendorId);

//     if (!vendor?.razorpayAccountId) {
//       console.log("⚠️ Vendor has no razorpayAccountId:", order.vendorId);
//       return;
//     }

//     const productPrice  = order.amount;
//     const weight        = order.shipment?.weight || 0.5;
//     const shippingFee   = calculateShipping(weight);
//     const pgBase        = productPrice * 0.02;
//     const pgFee         = Math.round(pgBase * 1.18);
//     const sellerAmount  = Math.max(0, productPrice - shippingFee - pgFee);

//     if (sellerAmount <= 0) {
//       console.log("⚠️ sellerAmount is 0, skipping transfer");
//       return;
//     }

//     console.log("💸 Creating transfer — sellerAmount:", sellerAmount);

//     // ✅ PDF: Post-payment transfer via /v1/payments/{payment_id}/transfers
//     const transfer = await razorpay.payments.transfer(paymentId, {
//       transfers: [
//         {
//           account: vendor.razorpayAccountId,
//           amount: Math.round(sellerAmount * 100),
//           currency: "INR",
//           notes: {
//             order_id: order._id.toString(),
//             vendor_id: order.vendorId.toString(),
//             breakdown: "product - shipping - pg_fee",
//           },
//           on_hold: true, // ✅ PDF: Hold lagao — delivery ke 7 din baad release
//         },
//       ],
//     });

//     const transferId = transfer?.items?.[0]?.id;

//     /* ── DB UPDATE ── */
//     order.transferId      = transferId;
//     order.transferCreated = true;
//     order.vendorAmount    = sellerAmount;
//     order.platformAmount  = productPrice - sellerAmount;
//     order.payoutStatus    = "OnHold";

//     await order.save();

//     console.log("✅ Transfer created:", transferId, "| sellerAmount:", sellerAmount);

//   } catch (err) {
//     console.error("❌ createTransferForVendor ERROR:", err.message);
//     throw err;
//   }
// };

// /* ===============================
//    DELIVERY CONFIRM → 7 DAY HOLD
//    PDF Step 3: on_hold_until set करो
// ================================ */
// exports.setDeliveryHold = async (order) => {
//   try {
//     if (!order.transferId) {
//       console.log("⚠️ No transferId for order:", order._id);
//       return;
//     }

//     // ✅ PDF: deliveredAt + 7 days का Unix timestamp
//     const releaseTime = Math.floor(
//       (new Date(order.deliveredAt).getTime() + 7 * 24 * 60 * 60 * 1000) / 1000
//     );

//     await razorpay.transfers.edit(order.transferId, {
//       on_hold: true,
//       on_hold_until: releaseTime, // ✅ PDF: exactly 7 din baad
//     });

//     order.payoutEligibleAt = new Date(releaseTime * 1000);
//     order.payoutStatus     = "OnHold";
//     await order.save();

//     console.log("✅ 7-day hold set for order:", order._id, "| release at:", new Date(releaseTime * 1000));

//   } catch (err) {
//     console.error("❌ setDeliveryHold ERROR:", err.message);
//   }
// };

// /* ===============================
//    RELEASE PAYMENT AFTER 7 DAYS
//    PDF Step 3: Manual release
//    (Razorpay auto-release करेगा)
// ================================ */
// exports.releasePaymentAfterDelivery = async (order) => {
//   try {
//     if (!order.transferId) {
//       console.log("⚠️ No transferId for order:", order._id);
//       return;
//     }

//     await razorpay.transfers.edit(order.transferId, {
//       on_hold: false,
//     });

//     order.payoutStatus     = "Released";
//     order.payoutReleasedAt = new Date();
//     await order.save();

//     console.log("✅ Payout released for order:", order._id);

//   } catch (err) {
//     console.error("❌ RELEASE ERROR:", err.message);
//   }
// };



const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");

const CustomerOrder = require("../models/CustomerOrder");
const Vendor = require("../models/VendorModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const calculateShipping = (weightKg) => {
  if (weightKg <= 0.5) return 75;
  if (weightKg <= 1) return 99;
  if (weightKg <= 2) return 135;
  if (weightKg <= 5) return 135 + Math.ceil(weightKg - 2) * 35;

  return 135 + 3 * 35 + Math.ceil(weightKg - 5) * 20;
};

/* =========================================================
   CREATE RAZORPAY ORDER
========================================================= */
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid orderId",
      });
    }

    const order = await CustomerOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "Success") {
      return res.status(400).json({
        success: false,
        message: "Already paid",
      });
    }

    const productPrice = order.amount;

    const codFee =
      order.paymentMethod === "cod"
        ? 30
        : 0;

    const totalAmount = productPrice + codFee;

    console.log(
      "💰 productPrice:",
      productPrice,
      "| totalAmount:",
      totalAmount
    );

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `order_${order._id}`,
      payment_capture: 1,
    });

    order.razorpayOrderId = razorpayOrder.id;
    order.payoutStatus = "Pending";

    await order.save();

    console.log(
      "✅ Razorpay order created:",
      razorpayOrder.id
    );

    return res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error(
      "❌ CREATE ORDER ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
};

/* =========================================================
   VERIFY PAYMENT
========================================================= */
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    console.log("📩 VERIFY REQUEST:");
    console.log("orderId :", orderId);
    console.log("razorpay_order_id :", razorpay_order_id);
    console.log("razorpay_payment_id :", razorpay_payment_id);

    if (
      !orderId ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment fields",
      });
    }

    const order = await CustomerOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "Success") {
      return res.json({
        success: true,
        message: "Payment already verified",
      });
    }

    const orderIdForSig =
      razorpay_order_id ||
      order.razorpayOrderId;

    if (!orderIdForSig) {
      return res.status(400).json({
        success: false,
        message: "razorpay_order_id missing",
      });
    }

    const body =
      orderIdForSig +
      "|" +
      razorpay_payment_id;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    order.paymentStatus = "Success";
    order.orderStatus = "Confirmed";
    order.paymentMethod = "razorpay";
    order.razorpayPaymentId =
      razorpay_payment_id;

    await order.save();

    if (order.vendorId) {
      try {
        await createTransferForVendor(
          order,
          razorpay_payment_id
        );
      } catch (transferErr) {
        console.error(
          "⚠️ Transfer creation failed:",
          transferErr.message
        );
      }
    }

    console.log(
      "✅ Payment verified:",
      orderId
    );

    return res.json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.error(
      "❌ VERIFY ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message,
    });
  }
};

/* =========================================================
   CREATE TRANSFER FOR VENDOR
========================================================= */
const createTransferForVendor = async (
  order,
  paymentId
) => {
  try {
    const vendor = await Vendor.findById(
      order.vendorId
    );

    if (!vendor?.razorpayAccountId) {
      console.log(
        "⚠️ Vendor has no razorpayAccountId"
      );
      return;
    }

    const productPrice = Number(order.amount || 0);

    const weight =
      Number(order?.shipment?.weight || 0.5);

    const shippingFee =
      calculateShipping(weight);

    const pgBase = productPrice * 0.02;

    const pgFee = Math.round(pgBase * 1.18);

    // NEVER NEGATIVE
    const sellerAmount = Math.max(
      0,
      Math.round(
        productPrice -
          shippingFee -
          pgFee
      )
    );

    if (sellerAmount <= 0) {
      console.log(
        "⚠️ sellerAmount <= 0"
      );

      order.vendorAmount = 0;
      order.platformAmount = productPrice;
      order.payoutStatus = "Blocked";

      await order.save();

      return;
    }

    console.log(
      "💸 Creating transfer:",
      sellerAmount
    );

    const transfer =
      await razorpay.payments.transfer(
        paymentId,
        {
          transfers: [
            {
              account:
                vendor.razorpayAccountId,

              amount:
                Math.round(
                  sellerAmount * 100
                ),

              currency: "INR",

              notes: {
                order_id:
                  order._id.toString(),

                vendor_id:
                  order.vendorId.toString(),

                breakdown:
                  "product - shipping - pg_fee",
              },

              // HOLD PAYMENT
              on_hold: true,
            },
          ],
        }
      );

    const transferId =
      transfer?.items?.[0]?.id;

    order.transferId = transferId;

    order.transferCreated = true;

    order.vendorAmount = sellerAmount;

    order.platformAmount =
      productPrice - sellerAmount;

    // WAITING FOR ADMIN RELEASE
    order.payoutStatus = "OnHold";

    await order.save();

    console.log(
      "✅ Transfer created:",
      transferId
    );

  } catch (err) {
    console.error(
      "❌ createTransferForVendor ERROR:",
      err.message
    );

    throw err;
  }
};

/* =========================================================
   ADMIN RELEASE PAYMENT
   ONLY AFTER:
   1. DELIVERED
   2. 7 DAYS COMPLETED
========================================================= */
exports.adminReleaseVendorPayment =
  async (req, res) => {
    try {
      const { orderId } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          orderId
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid order id",
        });
      }

      const order =
        await CustomerOrder.findById(
          orderId
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // already released
      if (
        order.payoutStatus ===
        "Released"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Payment already released",
        });
      }

      // transfer check
      if (!order.transferId) {
        return res.status(400).json({
          success: false,
          message: "Transfer not found",
        });
      }

      // delivery check
      if (
        order.orderStatus !==
        "Delivered"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Order not delivered yet",
        });
      }

      // deliveredAt check
      if (!order.deliveredAt) {
        return res.status(400).json({
          success: false,
          message:
            "Delivery date missing",
        });
      }

      // 7 days check
      const deliveredTime =
        new Date(
          order.deliveredAt
        ).getTime();

      const currentTime = Date.now();

      const sevenDaysMs =
        7 *
        24 *
        60 *
        60 *
        1000;

      const sevenDaysPassed =
        currentTime - deliveredTime >=
        sevenDaysMs;

      if (!sevenDaysPassed) {
        return res.status(400).json({
          success: false,
          message:
            "7 days not completed yet",
        });
      }

      // RELEASE PAYMENT
      await razorpay.transfers.edit(
        order.transferId,
        {
          on_hold: false,
        }
      );

      order.payoutStatus = "Released";

      order.payoutReleasedAt =
        new Date();

      await order.save();

      console.log(
        "✅ Vendor payment released:",
        order._id
      );

      return res.json({
        success: true,
        message:
          "Vendor payment released successfully",
      });

    } catch (err) {
      console.error(
        "❌ ADMIN RELEASE ERROR:",
        err.message
      );

      return res.status(500).json({
        success: false,
        message: "Release failed",
        error: err.message,
      });
    }
  };
