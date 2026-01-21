// // const mongoose = require("mongoose");

// // const VendorSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //    image: { type: String, default: "" },
// //   // ... baki fields
// // }, { timestamps: true });

// // // ✅ THIS LINE FIXES OVERWRITE ERROR
// // module.exports = mongoose.models.Vendor || mongoose.model("Vendor", VendorSchema);








// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: { type: String, unique: true },
//     password: { type: String, required: true },
//     image: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// module.exports =
//   mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);














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



