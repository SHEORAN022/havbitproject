// module.exports = { addVendor, vendorLogin };
const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ===============================
   VENDOR SIGNUP
================================ */
const addVendor = async (req, res) => {
  try {
    const { name, shop, email, phone, password } = req.body;

    // 🔍 Validation
    if (!name || !shop || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔁 Check existing vendor
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(409).json({
        success: false,
        message: "Vendor already exists",
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 Create vendor
    const vendor = await Vendor.create({
      name,
      shop,
      email,
      phone,
      password: hashedPassword,
      status: "APPROVED", // ✅ middleware ke liye IMPORTANT
    });

    return res.status(201).json({
      success: true,
      message: "Vendor registered successfully",
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

/* ===============================
   VENDOR LOGIN
================================ */
const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 🔎 Find vendor
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🚫 Status check (middleware jaisa hi)
    const status = (vendor.status || "PENDING").toUpperCase();
    if (status !== "APPROVED") {
      return res.status(403).json({
        success: false,
        message: `Account ${status.toLowerCase()}. Please contact admin.`,
      });
    }

    // 🔑 JWT TOKEN (🔥 FIXED – NO fallback secret)
    const token = jwt.sign(
      { id: vendor._id, role: "vendor" },
      process.env.JWT_SECRET, // ✅ MUST match middleware
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  addVendor,
  vendorLogin,
};




