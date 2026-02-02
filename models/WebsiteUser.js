
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const websiteUserSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true, trim: true },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       select: true,
//     },
//     phone: { type: String, required: true },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       select: false,
//     },
//   },
//   { timestamps: true }
// );

// // 🔐 hash password
// websiteUserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("WebsiteUser", websiteUserSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const websiteUserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: false }, // Make optional for Google login
    password: {
      type: String,
      required: false, // Make optional for Google login
      minlength: 6,
      select: false,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: { type: String, unique: true, sparse: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

// 🔐 hash password (only for local auth)
websiteUserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("WebsiteUser", websiteUserSchema);
