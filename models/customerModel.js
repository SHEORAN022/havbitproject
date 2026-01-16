









// // models/customerModel.js
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const addressSchema = new mongoose.Schema({
//   addressType: {
//     type: String,
//     enum: ["Home", "Work", "Other"],
//     default: "Home"
//   },
//   fullName: { type: String, required: true },
//   mobileNumber: { type: String, required: true },
//   addressLine1: { type: String, required: true },
//   addressLine2: { type: String },
//   landmark: { type: String },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, default: "India" },
//   pincode: { type: String, required: true },
//   isDefault: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });

// const customerSchema = new mongoose.Schema({
//   // Personal Info
//   name: { 
//     type: String, 
//     required: [true, "Name is required"],
//     trim: true 
//   },
//   email: { 
//     type: String, 
//     required: [true, "Email is required"],
//     unique: true,
//     lowercase: true,
//     trim: true,
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
//   },
//   phone: { 
//     type: String, 
//     required: [true, "Phone number is required"],
//     unique: true
//   },
//   password: { 
//     type: String, 
//     required: [true, "Password is required"],
//     minlength: 6,
//     select: false
//   },
  
//   // Profile
//   profileImage: { 
//     type: String, 
//     default: "" 
//   },
//   dateOfBirth: Date,
//   gender: {
//     type: String,
//     enum: ["Male", "Female", "Other", "Prefer not to say"],
//     default: "Prefer not to say"
//   },
  
//   // Verification
//   emailVerified: { type: Boolean, default: false },
//   phoneVerified: { type: Boolean, default: false },
  
//   // Addresses
//   addresses: [addressSchema],
  
//   // Shopping
//   wishlist: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Product" 
//   }],
//   cart: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       quantity: { type: Number, default: 1, min: 1 },
//       addedAt: { type: Date, default: Date.now }
//     }
//   ],
//   orders: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Order" 
//   }],
  
//   // Stats
//   stats: {
//     totalOrders: { type: Number, default: 0 },
//     totalSpent: { type: Number, default: 0 },
//     lastOrderDate: Date
//   },
  
//   // Account Status
//   isActive: { type: Boolean, default: true },
//   isBlocked: { type: Boolean, default: false },
//   lastLogin: Date,
  
//   // Timestamps
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// // Hash password before saving
// customerSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to compare password
// customerSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model("Customer", customerSchema);