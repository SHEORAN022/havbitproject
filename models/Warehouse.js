const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    vendorId: {
      type: String,
      required: true,
      index: true,
    },

    parcelxWarehouseId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    contactPerson: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warehouse", warehouseSchema);
