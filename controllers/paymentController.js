// const razorpay = require("../config/razorpay");
// const crypto = require("crypto");
// const Payment = require("../models/paymentModel");

// // Create order and save initial record (PENDING)
// exports.createOrder = async (req, res) => {
//   try {
//     const { amount, name, email, phone, notes } = req.body;

//     if (!amount || !name || !email) {
//       return res.status(400).json({ success: false, message: "name, email and amount required" });
//     }

//     const options = {
//       amount: Math.round(Number(amount) * 100), // convert rupees to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         customer_name: name,
//         customer_email: email,
//         ...(notes || {}),
//       },
//     };

//     const order = await razorpay.orders.create(options);

//     // Save a record in DB with status PENDING
//     const paymentRecord = new Payment({
//       orderId: order.id,
//       amount: Number(amount),
//       currency: order.currency || "INR",
//       name,
//       email,
//       phone: phone || null,
//       notes: options.notes,
//       status: "PENDING",
//     });

//     await paymentRecord.save();

//     return res.status(200).json({
//       success: true,
//       order,
//       paymentId: paymentRecord._id, // local DB id (optional)
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (err) {
//     console.error("createOrder error:", err);
//     return res.status(500).json({ success: false, message: "Server Error", error: err.message });
//   }
// };

// // Verify payment signature and update DB
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Missing payment details" });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     const isValid = expectedSignature === razorpay_signature;

//     // Find the DB record
//     const paymentRecord = await Payment.findOne({ orderId: razorpay_order_id });

//     if (!paymentRecord) {
//       // still respond, but warn
//       console.warn("verifyPayment: no DB record for order:", razorpay_order_id);
//     }

//     if (isValid) {
//       // update DB: success
//       if (paymentRecord) {
//         paymentRecord.paymentId = razorpay_payment_id;
//         paymentRecord.signature = razorpay_signature;
//         paymentRecord.status = "SUCCESS";
//         await paymentRecord.save();
//       }

//       return res.status(200).json({ success: true, message: "Payment verified successfully" });
//     } else {
//       // update DB: failed
//       if (paymentRecord) {
//         paymentRecord.paymentId = razorpay_payment_id;
//         paymentRecord.signature = razorpay_signature;
//         paymentRecord.status = "FAILED";
//         await paymentRecord.save();
//       }

//       return res.status(400).json({ success: false, message: "Invalid signature, verification failed" });
//     }
//   } catch (err) {
//     console.error("verifyPayment error:", err);
//     return res.status(500).json({ success: false, message: "Server Error", error: err.message });
//   }
// };



// exports.verifyPayment = async (req, res) => {
//   try {
//     const { 
//       razorpay_order_id, 
//       razorpay_payment_id, 
//       razorpay_signature,
//       backendOrderId // IMPORTANT - from frontend
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Missing payment details" });
//     }

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign)
//       .digest("hex");

//     const isValid = expectedSign === razorpay_signature;

//     // UPDATE PAYMENT TABLE (OPTIONAL)
//     const paymentRecord = await Payment.findOne({ orderId: razorpay_order_id });

//     if (paymentRecord) {
//       paymentRecord.paymentId = razorpay_payment_id;
//       paymentRecord.signature = razorpay_signature;
//       paymentRecord.status = isValid ? "SUCCESS" : "FAILED";
//       await paymentRecord.save();
//     }

//     if (!isValid) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     // UPDATE CUSTOMER ORDER (IMPORTANT)
//     const customerOrder = await CustomerOrder.findById(backendOrderId);

//     if (!customerOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }

//     customerOrder.paymentStatus = "Completed";
//     customerOrder.orderStatus = "Confirmed";
//     customerOrder.razorpayOrderId = razorpay_order_id;
//     customerOrder.razorpayPaymentId = razorpay_payment_id;
//     customerOrder.razorpaySignature = razorpay_signature;

//     await customerOrder.save();

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified & order confirmed",
//       orderId: backendOrderId
//     });

//   } catch (err) {
//     console.error("verifyPayment error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };






// const crypto = require("crypto");
// const razorpay = require("../config/razorpay");
// const Payment = require("../models/paymentModel");
// const CustomerOrder = require("../models/CustomerOrder");

// // ================= CREATE RAZORPAY ORDER =================
// exports.createOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     if (!orderId) {
//       return res.status(400).json({
//         success: false,
//         message: "OrderId is required"
//       });
//     }

//     const customerOrder = await CustomerOrder.findById(orderId);

//     if (!customerOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }

//     const razorOrder = await razorpay.orders.create({
//       amount: customerOrder.amount * 100,
//       currency: "INR",
//       receipt: `order_${orderId}`
//     });

//     customerOrder.razorpayOrderId = razorOrder.id;
//     customerOrder.paymentMethod = "razorpay";
//     await customerOrder.save();

//     await Payment.create({
//       razorpayOrderId: razorOrder.id,
//       customerOrderId: customerOrder._id,
//       customerId: customerOrder.customer,
//       amount: customerOrder.amount
//     });

//     return res.status(200).json({
//       success: true,
//       key: process.env.RAZORPAY_KEY_ID,
//       order_id: razorOrder.id,
//       amount: customerOrder.amount,
//       currency: "INR",
//       backendOrderId: customerOrder._id.toString()
//     });

//   } catch (error) {
//     console.error("createOrder error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create Razorpay order"
//     });
//   }
// };

// // ================= VERIFY PAYMENT =================
// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing payment details"
//       });
//     }

//     const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });

//     if (!payment) {
//       return res.status(404).json({
//         success: false,
//         message: "Payment record not found"
//       });
//     }

//     if (payment.status === "SUCCESS") {
//       return res.status(200).json({
//         success: true,
//         message: "Payment already verified"
//       });
//     }

//     const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       payment.status = "FAILED";
//       await payment.save();

//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature"
//       });
//     }

//     payment.razorpayPaymentId = razorpay_payment_id;
//     payment.signature = razorpay_signature;
//     payment.status = "SUCCESS";
//     await payment.save();

//     await CustomerOrder.findByIdAndUpdate(payment.customerOrderId, {
//       paymentStatus: "Completed",
//       orderStatus: "Confirmed",
//       razorpayPaymentId: razorpay_payment_id,
//       razorpaySignature: razorpay_signature
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully"
//     });

//   } catch (error) {
//     console.error("verifyPayment error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Payment verification failed"
//     });
//   }
// };





const crypto = require("crypto");
const razorpay = require("../config/razorpay");

// ================= CREATE RAZORPAY ORDER =================
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required"
      });
    }

    // Backend custom order id
    const backendOrderId = `BK_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const razorOrder = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: backendOrderId
    });

    return res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order_id: razorOrder.id,
      backendOrderId,
      amount,
      currency: "INR"
    });

  } catch (error) {
    console.error("createOrder error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order"
    });
  }
};



// ================= VERIFY PAYMENT =================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      backendOrderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (!backendOrderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing fields in verify"
      });
    }

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
        backendOrderId
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      backendOrderId
    });

  } catch (error) {
    console.error("verifyPayment error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed"
    });
  }
};
