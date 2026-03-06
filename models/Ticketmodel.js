const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  message:  { type: String, required: true },
  sentBy:   { type: String, enum: ["vendor", "admin"], required: true },
  sentAt:   { type: Date, default: Date.now },
});

const ticketSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    subject:  { type: String, required: true, trim: true },
    message:  { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
