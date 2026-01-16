// // models/customerModel.js
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const addressSchema = new mongoose.Schema({
//   addressType: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
//   fullName: { type: String, required: true },
//   mobileNumber: { type: String, required: true },
//   addressLine1: { type: String, required: true },
//   addressLine2: String,
//   landmark: String,
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, default: "India" },
//   pincode: { type: String, required: true },
//   isDefault: { type: Boolean, default: false },
// });

// const customerSchema = new mongoose.Schema(
//   {
//     /* 🔥 VENDOR LINK */
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true
//     },

//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, lowercase: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true, minlength: 6, select: false },

//     addresses: [addressSchema],

//     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//     cart: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         quantity: { type: Number, default: 1 },
//       },
//     ],

//     isActive: { type: Boolean, default: true },
//     isBlocked: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// /* PASSWORD HASH */
// customerSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("Customer", customerSchema);







// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const addressSchema = new mongoose.Schema({
//   addressType: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
//   fullName: { type: String, required: true },
//   mobileNumber: { type: String, required: true },
//   addressLine1: { type: String, required: true },
//   addressLine2: String,
//   landmark: String,
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, default: "India" },
//   pincode: { type: String, required: true },
//   isDefault: { type: Boolean, default: false },
// });

// const customerSchema = new mongoose.Schema(
//   {
//     vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, lowercase: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true, minlength: 6, select: false },
//     addresses: [addressSchema],
//     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//     cart: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         quantity: { type: Number, default: 1 },
//       },
//     ],
//     isActive: { type: Boolean, default: true },
//     isBlocked: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// /* PASSWORD HASH */
// customerSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("Customer", customerSchema);






// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const addressSchema = new mongoose.Schema({
//   addressType: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
//   fullName: String,
//   mobileNumber: String,
//   addressLine1: String,
//   addressLine2: String,
//   landmark: String,
//   city: String,
//   state: String,
//   country: { type: String, default: "India" },
//   pincode: String,
//   isDefault: { type: Boolean, default: false },
// });

// const customerSchema = new mongoose.Schema(
//   {
//     vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true, lowercase: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true, select: false },
//     addresses: [addressSchema],
//     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//     cart: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         quantity: { type: Number, default: 1 },
//       },
//     ],
//     isActive: { type: Boolean, default: true },
//     isBlocked: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// // Hash password
// customerSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("Customer", customerSchema);
