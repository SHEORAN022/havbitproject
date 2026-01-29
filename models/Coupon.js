const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
    },

    discountType: {
      type: String,
      enum: ["PERCENT", "FLAT"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
    },

    minOrderAmount: {
      type: Number,
      default: 0,
    },

    maxDiscountAmount: {
      type: Number,
      default: null, // for % coupons
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    usageLimit: {
      type: Number,
      default: 1, // per user
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: String,
      enum: ["ADMIN", "SYSTEM"],
      default: "ADMIN",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", CouponSchema);
