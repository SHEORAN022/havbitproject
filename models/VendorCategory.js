
const mongoose = require("mongoose");

const vendorCategorySchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String, // Cloudinary URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorCategory", vendorCategorySchema);
