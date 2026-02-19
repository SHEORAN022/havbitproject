const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  },

  address_title: { type: String, required: true },
  sender_name: { type: String, required: true },
  full_address: { type: String, required: true },
  phone: { type: String, required: true },

  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, default: "India" },

  pick_address_id: { type: String, required: true }
}, { timestamps: true });

warehouseSchema.index({ vendorId: 1 });

module.exports = mongoose.model("Warehouse", warehouseSchema);
