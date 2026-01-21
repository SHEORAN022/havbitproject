

// // // const Vendor = require("../models/VendorModel");

// // // /* GET PROFILE */
// // // exports.getProfile = async (req, res) => {
// // //   res.status(200).json({
// // //     success: true,
// // //     data: req.vendor,
// // //   });
// // // };

// // // /* UPDATE PROFILE */
// // // exports.updateProfile = async (req, res) => {
// // //   try {
// // //     const { name, email } = req.body;

// // //     if (name) req.vendor.name = name;
// // //     if (email) req.vendor.email = email;

// // //     if (req.file) {
// // //       // 🔥 YAHI IMPORTANT LINE
// // //       req.vendor.image = `/uploads/${req.file.filename}`;
// // //     }

// // //     await req.vendor.save();

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Profile updated successfully",
// // //       data: req.vendor,
// // //     });
// // //   } catch (err) {
// // //     res.status(500).json({
// // //       success: false,
// // //       message: err.message,
// // //     });
// // //   }
// // // };

// // // /* DELETE PROFILE */
// // // exports.deleteProfile = async (req, res) => {
// // //   await Vendor.findByIdAndDelete(req.vendor._id);

// // //   res.status(200).json({
// // //     success: true,
// // //     message: "Vendor profile deleted",
// // //   });
// // // };
// // const bcrypt = require("bcryptjs");
// // const Vendor = require("../models/VendorModel");

// // /* =========================
// //    GET PROFILE
// // ========================= */
// // exports.getProfile = async (req, res) => {
// //   res.status(200).json({
// //     success: true,
// //     data: req.vendor,
// //   });
// // };

// // /* =========================
// //    UPDATE PROFILE
// //    (CURRENT PASSWORD → NEW PASSWORD)
// // ========================= */
// // exports.updateProfile = async (req, res) => {
// //   try {
// //     const {
// //       name,
// //       email,
// //       currentPassword,
// //       newPassword,
// //       confirmPassword,
// //     } = req.body;

// //     // Update name/email
// //     if (name) req.vendor.name = name;
// //     if (email) req.vendor.email = email;

// //     // 🔐 PASSWORD UPDATE LOGIC
// //     if (currentPassword || newPassword || confirmPassword) {
// //       if (!currentPassword || !newPassword || !confirmPassword) {
// //         return res.status(400).json({
// //           success: false,
// //           message: "All password fields are required",
// //         });
// //       }

// //       // check current password
// //       const isMatch = await bcrypt.compare(
// //         currentPassword,
// //         req.vendor.password
// //       );

// //       if (!isMatch) {
// //         return res.status(400).json({
// //           success: false,
// //           message: "Current password is incorrect",
// //         });
// //       }

// //       if (newPassword.length < 6) {
// //         return res.status(400).json({
// //           success: false,
// //           message: "New password must be at least 6 characters",
// //         });
// //       }

// //       if (newPassword !== confirmPassword) {
// //         return res.status(400).json({
// //           success: false,
// //           message: "New password and confirm password do not match",
// //         });
// //       }

// //       // hash new password
// //       const hashed = await bcrypt.hash(newPassword, 10);
// //       req.vendor.password = hashed;
// //     }

// //     // Image update
// //     if (req.file) {
// //       req.vendor.image = `/uploads/${req.file.filename}`;
// //     }

// //     await req.vendor.save();

// //     res.status(200).json({
// //       success: true,
// //       message: "Profile updated successfully",
// //     });
// //   } catch (err) {
// //     res.status(500).json({
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // };
// const bcrypt = require("bcryptjs");

// /* =========================
//    UPDATE PASSWORD ONLY
// ========================= */
// exports.updatePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword, confirmPassword } = req.body;

//     if (!oldPassword || !newPassword || !confirmPassword) {
//       return res.status(400).json({
//         message: "All password fields are required",
//       });
//     }

//     // 🔐 old password check (login wala)
//     const isMatch = await bcrypt.compare(
//       oldPassword,
//       req.vendor.password
//     );

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Old password is incorrect",
//       });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({
//         message: "New password must be at least 6 characters",
//       });
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({
//         message: "New & confirm password do not match",
//       });
//     }

//     // 🔥 update password
//     req.vendor.password = await bcrypt.hash(newPassword, 10);
//     await req.vendor.save();

//     res.json({
//       success: true,
//       message: "Password updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// const bcrypt = require("bcryptjs");

// exports.updatePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword, confirmPassword } = req.body;

//     if (!oldPassword || !newPassword || !confirmPassword) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     // login wala password check
//     const isMatch = await bcrypt.compare(
//       oldPassword,
//       req.vendor.password
//     );

//     if (!isMatch) {
//       return res.status(400).json({ message: "Old password incorrect" });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({
//         message: "New password must be at least 6 characters",
//       });
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({
//         message: "Confirm password does not match",
//       });
//     }

//     req.vendor.password = await bcrypt.hash(newPassword, 10);
//     await req.vendor.save();

//     res.json({
//       success: true,
//       message: "Password updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };








const bcrypt = require("bcryptjs");

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    // login wala password check
    const isMatch = await bcrypt.compare(
      oldPassword,
      req.vendor.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Confirm password does not match",
      });
    }

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

