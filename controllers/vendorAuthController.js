




const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Vendor Signup
const addVendor = async (req, res) => {
  try {
    const { name, shop, email, phone, password } = req.body;
    if (!name || !shop || !email || !phone || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = new Vendor({ name, shop, email, phone, password: hashedPassword });
    await vendor.save();

    res.status(201).json({ message: "Vendor registered successfully", vendor });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Vendor Login
const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Optional: token generation (can be skipped for now)
    const token = jwt.sign({ id: vendor._id, role: "vendor" }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, vendorId: vendor._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addVendor, vendorLogin };




// const Vendor = require("../models/Vendor");
// const transporter = require("../config/mailer");

// /* ============================
//    SEND OTP (Login Flow)
// ============================ */
// exports.sendOtpToVendor = async (req, res) => {
//   try {
//     const { email } = req.body;

//     let vendor = await Vendor.findOne({ email });

//     if (!vendor) {
//       // New vendor auto-create (optional)
//       vendor = await Vendor.create({ email });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     vendor.otp = otp;
//     vendor.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
//     await vendor.save();

//     await transporter.sendMail({
//       from: "Your App",
//       to: email,
//       subject: "Vendor OTP Login",
//       html: `<h2>Your OTP: <b>${otp}</b></h2><p>Valid for 5 minutes</p>`,
//     });

//     return res.json({ success: true, message: "OTP sent to email" });

//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };


// /* ============================
//    VERIFY OTP (Login Success)
// ============================ */
// exports.verifyVendorOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const vendor = await Vendor.findOne({ email });
//     if (!vendor || !vendor.otp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     if (vendor.otp !== otp)
//       return res.status(400).json({ message: "Incorrect OTP" });

//     if (vendor.otpExpires < new Date()) {
//       vendor.otp = null;
//       vendor.otpExpires = null;
//       await vendor.save();
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     // LOGIN SUCCESS
//     vendor.otp = null;
//     vendor.otpExpires = null;
//     await vendor.save();

//     return res.json({
//       success: true,
//       message: "OTP Verified — Login Success",
//       vendor
//     });

//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };


// /* ============================
//    RESEND OTP (Optional)
// ============================ */
// exports.resendVendorOtp = async (req, res) => {
//   return exports.sendOtpToVendor(req, res);
// };





// const jwt = require("jsonwebtoken");
// const Vendor = require("../models/Vendor");
// const sendEmail = require("../utils/sendEmail");

// // Send OTP
// exports.sendVendorOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     let vendor = await Vendor.findOne({ email });

//     if (!vendor) vendor = await Vendor.create({ email });

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     vendor.otp = otp;
//     vendor.otpExpiry = Date.now() + 5 * 60 * 1000;
//     await vendor.save();

//     await sendEmail(email, "Your Vendor Login OTP", `<h2>Your OTP is: ${otp}</h2>`);

//     res.json({ success: true, message: "OTP Sent Successfully!" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: "Failed to send OTP" });
//   }
// };

// // Verify OTP + Login
// exports.verifyVendorOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const vendor = await Vendor.findOne({ email });

//     if (!vendor || vendor.otp != otp || vendor.otpExpiry < Date.now()) {
//       return res.status(400).json({ success: false, message: "Invalid or Expired OTP" });
//     }

//     const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     vendor.otp = null;
//     vendor.otpExpiry = null;
//     await vendor.save();

//     res.json({ success: true, token, message: "Login Successful!" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: "Login Failed" });
//   }
// };
