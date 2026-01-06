const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");

// Create order and save initial record (PENDING)
exports.createOrder = async (req, res) => {
  try {
    const { amount, name, email, phone, notes } = req.body;

    if (!amount || !name || !email) {
      return res.status(400).json({ success: false, message: "name, email and amount required" });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // convert rupees to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        customer_name: name,
        customer_email: email,
        ...(notes || {}),
      },
    };

    const order = await razorpay.orders.create(options);

    // Save a record in DB with status PENDING
    const paymentRecord = new Payment({
      orderId: order.id,
      amount: Number(amount),
      currency: order.currency || "INR",
      name,
      email,
      phone: phone || null,
      notes: options.notes,
      status: "PENDING",
    });

    await paymentRecord.save();

    return res.status(200).json({
      success: true,
      order,
      paymentId: paymentRecord._id, // local DB id (optional)
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// Verify payment signature and update DB
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    // Find the DB record
    const paymentRecord = await Payment.findOne({ orderId: razorpay_order_id });

    if (!paymentRecord) {
      // still respond, but warn
      console.warn("verifyPayment: no DB record for order:", razorpay_order_id);
    }

    if (isValid) {
      // update DB: success
      if (paymentRecord) {
        paymentRecord.paymentId = razorpay_payment_id;
        paymentRecord.signature = razorpay_signature;
        paymentRecord.status = "SUCCESS";
        await paymentRecord.save();
      }

      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      // update DB: failed
      if (paymentRecord) {
        paymentRecord.paymentId = razorpay_payment_id;
        paymentRecord.signature = razorpay_signature;
        paymentRecord.status = "FAILED";
        await paymentRecord.save();
      }

      return res.status(400).json({ success: false, message: "Invalid signature, verification failed" });
    }
  } catch (err) {
    console.error("verifyPayment error:", err);
    return res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};
