// const nodemailer = require("nodemailer");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // OTP ko store karne ke liye (Aap isse DB mein bhi save kar sakte hain)
// let otpStore = {}; 

// // --- 1. SEND OTP VIA EMAIL ---
// exports.sendEmailOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
//     // OTP store karna expiry ke saath (10 mins jo aapne .env mein diya hai)
//     otpStore[email] = {
//       otp: otp,
//       expiresAt: Date.now() + process.env.OTP_EXPIRY_MINUTES * 60000
//     };

//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       secure: process.env.EMAIL_SECURE === "true",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Havbit Vendor" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Verification Code for Seller Registration",
//       html: `<div style="font-family: Arial; padding: 20px; border: 1px solid #eee;">
//               <h2>Verify your email</h2>
//               <p>Your 6-digit verification code is:</p>
//               <h1 style="color: #2563eb;">${otp}</h1>
//               <p>This code expires in ${process.env.OTP_EXPIRY_MINUTES} minutes.</p>
//              </div>`,
//     });

//     res.json({ success: true, message: "OTP sent to " + email });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // --- 2. UPDATE PASSWORD (Aapka Original Code) ---
// exports.updatePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword, confirmPassword } = req.body;
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       return res.status(400).json({ message: "All password fields are required" });
//     }

//     const isMatch = await bcrypt.compare(oldPassword, req.vendor.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Old password is incorrect" });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({ message: "New password must be at least 6 characters" });
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ message: "New & confirm password do not match" });
//     }

//     req.vendor.password = await bcrypt.hash(newPassword, 10);
//     await req.vendor.save();

//     res.json({ success: true, message: "Password updated successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };






const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// OTP ko store karne ke liye (Aap isse DB mein bhi save kar sakte hain)
let otpStore = {}; 

// --- 1. SEND OTP VIA EMAIL ---
exports.sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // OTP store karna expiry ke saath (10 mins jo aapne .env mein diya hai)
    otpStore[email] = {
      otp: otp,
      expiresAt: Date.now() + process.env.OTP_EXPIRY_MINUTES * 60000
    };

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Havbit Vendor" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verification Code for Seller Registration",
      html: `<div style="font-family: Arial; padding: 20px; border: 1px solid #eee;">
              <h2>Verify your email</h2>
              <p>Your 6-digit verification code is:</p>
              <h1 style="color: #2563eb;">${otp}</h1>
              <p>This code expires in ${process.env.OTP_EXPIRY_MINUTES} minutes.</p>
             </div>`,
    });

    res.json({ success: true, message: "OTP sent to " + email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- 2. UPDATE PASSWORD (Aapka Original Code) ---
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }

    const isMatch = await bcrypt.compare(oldPassword, req.vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New & confirm password do not match" });
    }

    req.vendor.password = await bcrypt.hash(newPassword, 10);
    await req.vendor.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
