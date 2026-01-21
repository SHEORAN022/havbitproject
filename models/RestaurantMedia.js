const mongoose = require("mongoose");

const restaurantMediaSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    ownerPhoto: {
      type: String
    },

    bannerImage: {
      type: String
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.RestaurantMedia ||
  mongoose.model("RestaurantMedia", restaurantMediaSchema);
