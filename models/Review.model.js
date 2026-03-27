const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    userEmail: {
      type: String,
      required: true,
      lowercase: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    source: {
      type: String,
      enum: ["website", "app"],
      default: "website",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
