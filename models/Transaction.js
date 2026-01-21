


const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerOrder",
      required: true,
    },

    cfOrderId: String,
    cfPaymentId: String,

    amount: Number,
    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    paymentMethod: String,

    customer: {
      id: String,
      email: String,
      phone: String,
    },

    rawPayload: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
