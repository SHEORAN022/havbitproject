// // const mongoose = require("mongoose");

// // const warehouseSchema = new mongoose.Schema({
// //   vendorId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Vendor",
// //     required: true
// //   },

// //   address_title: { type: String, required: true },
// //   sender_name: { type: String, required: true },
// //   full_address: { type: String, required: true },
// //   phone: { type: String, required: true },

// //   city: { type: String, required: true },
// //   state: { type: String, required: true },
// //   pincode: { type: String, required: true },
// //   country: { type: String, default: "India" },

// //   pick_address_id: { type: String, required: true }
// // }, { timestamps: true });

// // warehouseSchema.index({ vendorId: 1 });

// // module.exports = mongoose.model("Warehouse", warehouseSchema);
// const mongoose = require("mongoose");

// const WarehouseSchema = new mongoose.Schema(
//   {
//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//       index: true
//     },
//     address_title: {
//       type: String,
//       required: true
//     },
//     sender_name: {
//       type: String,
//       required: true
//     },
//     full_address: {
//       type: String,
//       required: true
//     },
//     phone: {
//       type: String,
//       required: true
//     },
//     pincode: {
//       type: String,
//       required: true
//     },
//     pick_address_id: {
//       type: Number,
//       required: true,
//       unique: true
//     },
//     is_active: {
//       type: Boolean,
//       default: true
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// module.exports = mongoose.model("Warehouse", WarehouseSchema);


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

    name: { type: String, required: true },

    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },

    contactPerson: String,
    phone: { type: String, required: true },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warehouse", warehouseSchema);
