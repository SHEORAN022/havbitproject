const Cashfree = require("../config/cashfree");
const CustomerOrder = require("../models/CustomerOrder");
const Transaction = require("../models/Transaction");
const verifySignature = require("../utils/verifyCashfreeSignature");

/* ================= CREATE PAYMENT ================= */
exports.createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await CustomerOrder.findById(orderId);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    const request = {
      order_id: "ORDER_" + order._id,
      order_amount: order.amount,
      order_currency: "INR",

      customer_details: {
        customer_id: order.customer,
        customer_email: order.shippingAddress.email,
        customer_phone: order.shippingAddress.phone,
      },

      order_meta: {
        return_url: `${process.env.FRONTEND_URL}/payment-success?order_id=${order._id}`,
      },
    };

    const response = await Cashfree.Cashfree.PGCreateOrder("2023-08-01", request);

    await Transaction.create({
      order: order._id,
      cfOrderId: response.data.order_id,
      amount: order.amount,
      customer: {
        id: order.customer,
        email: order.shippingAddress.email,
        phone: order.shippingAddress.phone,
      },
      rawPayload: response.data,
    });

    res.json({
      success: true,
      paymentSessionId: response.data.payment_session_id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CASHFREE WEBHOOK ================= */
exports.cashfreeWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-webhook-signature"];
    const timestamp = req.headers["x-webhook-timestamp"];

    const isValid = verifySignature(
      req.rawBody,
      timestamp,
      signature
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payload = req.body;

    if (payload.type === "PAYMENT_SUCCESS") {
      const cfOrderId = payload.data.order.order_id;
      const cfPaymentId = payload.data.payment.cf_payment_id;

      const transaction = await Transaction.findOneAndUpdate(
        { cfOrderId },
        {
          status: "SUCCESS",
          cfPaymentId,
          paymentMethod: payload.data.payment.payment_method,
          rawPayload: payload,
        },
        { new: true }
      );

      await CustomerOrder.findByIdAndUpdate(transaction.order, {
        paymentStatus: "Completed",
        orderStatus: "Confirmed",
      });
    }

    if (payload.type === "PAYMENT_FAILED") {
      await Transaction.findOneAndUpdate(
        { cfOrderId: payload.data.order.order_id },
        { status: "FAILED", rawPayload: payload }
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).json({ message: err.message });
  }
};

