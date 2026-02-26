// const mongoose = require("mongoose");

// const warehouseSchema = new mongoose.Schema(
//   {
//     vendorId: {
//       type: String,
//       required: true,
//       index: true,
//     },

//     parcelxWarehouseId: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     name: {
//       type: String,
//       required: true,
//     },

//     address: {
//       type: String,
//       required: true,
//     },

//     city: {
//       type: String,
//       required: true,
//     },

//     state: {
//       type: String,
//       required: true,
//     },

//     pincode: {
//       type: String,
//       required: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },

//     contactPerson: {
//       type: String,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Warehouse", warehouseSchema);
const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    // ✅ vendorId — controller mein req.vendor._id se aata hai (ObjectId)
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },

    // ✅ required: true HATA diya — ParcelX call ke baad milta hai
    // ✅ sparse: true — E11000 duplicate null error ka permanent FIX
    parcelxWarehouseId: {
      type: String,
      unique: true,
      sparse: true,
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    contactPerson: {
      type: String,
      trim: true,
      default: "",
    },

    // ✅ createParcelxOrder controller mein use hota hai:
    // Warehouse.findOne({ isDefault: true }) — platform warehouse ke liye
    isDefault: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ✅ Controller check se match: Warehouse.findOne({ vendorId, name })
// Ek vendor ka same naam ka warehouse dobara nahi ban sakta
warehouseSchema.index({ vendorId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Warehouse", warehouseSchema);
