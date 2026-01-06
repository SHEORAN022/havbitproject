




// const Vendor = require("../models/Vendor");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Vendor Signup
// const addVendor = async (req, res) => {
//   try {
//     const { name, shop, email, phone, password } = req.body;
//     if (!name || !shop || !email || !phone || !password)
//       return res.status(400).json({ message: "All fields are required" });

//     const existingVendor = await Vendor.findOne({ email });
//     if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const vendor = new Vendor({ name, shop, email, phone, password: hashedPassword });
//     await vendor.save();

//     res.status(201).json({ message: "Vendor registered successfully", vendor });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Vendor Login
// const vendorLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const vendor = await Vendor.findOne({ email });
//     if (!vendor) return res.status(400).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     // Optional: token generation (can be skipped for now)
//     const token = jwt.sign({ id: vendor._id, role: "vendor" }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

//     res.status(200).json({ message: "Login successful", token, vendorId: vendor._id });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// module.exports = { addVendor, vendorLogin };
const bcrypt = require("bcryptjs");

/* =========================
   UPDATE PASSWORD ONLY
========================= */
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All password fields are required",
      });
    }

    // 🔐 old password check (login wala)
    const isMatch = await bcrypt.compare(
      oldPassword,
      req.vendor.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New & confirm password do not match",
      });
    }

    // 🔥 update password
    req.vendor.password = await bcrypt.hash(newPassword, 10);
    await req.vendor.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
