// // models/customerModel.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const addressSchema = new mongoose.Schema({
//     addressType: { 
//         type: String, 
//         enum: ['Home', 'Work', 'Other'], 
//         default: 'Home' 
//     },
//     fullName: { type: String, required: true },
//     mobileNumber: { type: String, required: true },
//     addressLine1: { type: String, required: true },
//     addressLine2: { type: String },
//     landmark: { type: String },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     country: { type: String, default: 'India' },
//     pincode: { type: String, required: true },
//     isDefault: { type: Boolean, default: false }
// }, { timestamps: true });

// const customerSchema = new mongoose.Schema({
//     // Personal Information
//     name: { 
//         type: String, 
//         required: [true, 'Name is required'],
//         trim: true 
//     },
//     email: { 
//         type: String, 
//         required: [true, 'Email is required'],
//         unique: true,
//         lowercase: true,
//         trim: true,
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
//     },
//     phone: { 
//         type: String, 
//         required: [true, 'Phone number is required'],
//         unique: true,
//         match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
//     },
//     password: { 
//         type: String, 
//         required: [true, 'Password is required'],
//         minlength: 6,
//         select: false
//     },
    
//     // Profile
//     profileImage: { 
//         type: String, 
//         default: 'https://res.cloudinary.com/demo/image/upload/v1626784567/default-avatar.png' 
//     },
//     dateOfBirth: Date,
//     gender: {
//         type: String,
//         enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
//         default: 'Prefer not to say'
//     },
    
//     // Authentication & Verification
//     emailVerified: { type: Boolean, default: false },
//     phoneVerified: { type: Boolean, default: false },
//     verificationToken: String,
//     verificationTokenExpires: Date,
//     resetPasswordToken: String,
//     resetPasswordExpires: Date,
    
//     // Addresses
//     addresses: [addressSchema],
    
//     // References
//     wishlist: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Product' 
//     }],
//     cart: [
//         {
//             productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//             variantId: { type: mongoose.Schema.Types.ObjectId },
//             quantity: { type: Number, default: 1, min: 1 },
//             price: Number,
//             addedAt: { type: Date, default: Date.now }
//         }
//     ],
//     orders: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Order' 
//     }],
    
//     // Preferences
//     notificationPreferences: {
//         email: { type: Boolean, default: true },
//         sms: { type: Boolean, default: true },
//         push: { type: Boolean, default: true }
//     },
    
//     // Stats
//     stats: {
//         totalOrders: { type: Number, default: 0 },
//         totalSpent: { type: Number, default: 0 },
//         lastOrderDate: Date,
//         averageOrderValue: { type: Number, default: 0 }
//     },
    
//     // Account Status
//     isActive: { type: Boolean, default: true },
//     isBlocked: { type: Boolean, default: false },
//     lastLogin: Date,
//     loginCount: { type: Number, default: 0 },
    
//     // Timestamps
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// // Hash password before saving
// customerSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
    
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// // Update timestamps on save
// customerSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
// });

// // Method to compare password
// customerSchema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

// // Method to generate JWT token
// customerSchema.methods.generateAuthToken = function() {
//     return jwt.sign(
//         { 
//             id: this._id,
//             email: this.email,
//             role: 'customer'
//         }, 
//         process.env.JWT_SECRET, 
//         { expiresIn: '7d' }
//     );
// };

// // Method to get profile without sensitive data
// customerSchema.methods.toProfileJSON = function() {
//     return {
//         _id: this._id,
//         name: this.name,
//         email: this.email,
//         phone: this.phone,
//         profileImage: this.profileImage,
//         dateOfBirth: this.dateOfBirth,
//         gender: this.gender,
//         addresses: this.addresses,
//         wishlist: this.wishlist,
//         stats: this.stats,
//         notificationPreferences: this.notificationPreferences,
//         createdAt: this.createdAt
//     };
// };

// // Static method to find by token (for password reset)
// customerSchema.statics.findByToken = function(token) {
//     return this.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
// };

// module.exports = mongoose.model('Customer', customerSchema);




















// models/customerModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema({
  addressType: {
    type: String,
    enum: ["Home", "Work", "Other"],
    default: "Home"
  },
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "India" },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const customerSchema = new mongoose.Schema({
  // Personal Info
  name: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },
  phone: { 
    type: String, 
    required: [true, "Phone number is required"],
    unique: true
  },
  password: { 
    type: String, 
    required: [true, "Password is required"],
    minlength: 6,
    select: false
  },
  
  // Profile
  profileImage: { 
    type: String, 
    default: "" 
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"],
    default: "Prefer not to say"
  },
  
  // Verification
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  
  // Addresses
  addresses: [addressSchema],
  
  // Shopping
  wishlist: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product" 
  }],
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1, min: 1 },
      addedAt: { type: Date, default: Date.now }
    }
  ],
  orders: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order" 
  }],
  
  // Stats
  stats: {
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    lastOrderDate: Date
  },
  
  // Account Status
  isActive: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  lastLogin: Date,
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before saving
customerSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
customerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Customer", customerSchema);