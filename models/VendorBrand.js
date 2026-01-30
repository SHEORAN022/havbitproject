// const mongoose = require("mongoose");

// const vendorBrandSchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//       unique: true,
//     },
//     brandName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     logo: {
//       url: String,
//       public_id: String,
//     },
//     banner: {
//       url: String,
//       public_id: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("VendorBrand", vendorBrandSchema);




// module.exports = mongoose.model("VendorBrand", vendorBrandSchema);
const mongoose = require("mongoose");

const vendorBrandSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      unique: true,
    },
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      url: String,
      public_id: String,
    },
    banner: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorBrand", vendorBrandSchema);

