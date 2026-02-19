const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    shiprocketWarehouseId: {
      type: String,
      required: true,
    },

    warehouseName: String,
    email: String,
    phone: String,
    city: String,
    state: String,
    pincode: String,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warehouse", warehouseSchema);
