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

    phone: { type: String },

    password: {
      type: String,
      select: false, // hide by default
    },

    // 🔥 IMPORTANT CHANGE (STRING ➜ ARRAY)
    authProvider: {
      type: [String],
      enum: ["local", "google"],
      default: ["local"],
    },

    googleId: { type: String, sparse: true },

    profilePicture: { type: String },
  },
  { timestamps: true }
);

// 🔐 Hash password if changed
websiteUserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("WebsiteUser", websiteUserSchema);

