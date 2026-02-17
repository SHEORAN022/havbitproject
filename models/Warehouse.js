// const mongoose = require("mongoose");

// const WarehouseSchema = new mongoose.Schema(
//   {
//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },

//     address_title: String,
//     sender_name: String,
//     full_address: String,
//     phone: String,
//     pincode: String,

//     pick_address_id: {
//       type: Number, // ParcelX
//       required: true,
//       unique: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Warehouse", WarehouseSchema);

const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    address_title: String,
    sender_name: String,
    full_address: String,
    phone: String,
    pincode: String,
    pick_address_id: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warehouse", WarehouseSchema);

