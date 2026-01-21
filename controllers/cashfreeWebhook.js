// controllers/cashfreeWebhook.js
const crypto = require("crypto");
const Transaction = require("../models/Transaction");

exports.cashfreeWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-webhook-signature"];
    const rawBody = req.rawBody;

    const expected = crypto
      .createHmac("sha256", process.env.CASHFREE_SECRET_KEY)
      .update(rawBody)
      .digest("base64");

    if (signature !== expected) {
      return res.status(401).send("Invalid signature");
    }

    const payload = req.body;
    const orderId = payload.data.order.order_id;
    const paymentId = payload.data.payment.payment_id;
    const status =
      payload.data.payment.payment_status === "SUCCESS"
        ? "SUCCESS"
        : "FAILED";

    await Transaction.findOneAndUpdate(
      { cfOrderId: orderId },
      {
        cfPaymentId: paymentId,
        status,
        rawPayload: payload,
      }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

