const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
