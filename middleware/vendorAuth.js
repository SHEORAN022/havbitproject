// // const jwt = require("jsonwebtoken");
// // const Vendor = require("../models/VendorModel");

// // module.exports = async (req, res, next) => {
// //   try {
// //     const authHeader = req.headers.authorization;

// //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Authorization token missing",
// //       });
// //     }

// //     const token = authHeader.split(" ")[1];
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     if (decoded.role !== "vendor") {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Access denied",
// //       });
// //     }

// //     const vendor = await Vendor.findById(decoded.id);
// //     if (!vendor) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Vendor not found",
// //       });
// //     }

// //     req.vendor = vendor; // ✅ vendor attached
// //     next();
// //   } catch (err) {
// //     return res.status(401).json({
// //       success: false,
// //       message: "Invalid or expired token",
// //     });
// //   }
// // };


// const jwt = require("jsonwebtoken");
// const Vendor = require("../models/VendorModel");

// module.exports = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     /* ================= TOKEN EXIST CHECK ================= */
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization token missing",
//         tokenExpired: true,
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     /* ================= VERIFY TOKEN ================= */
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     /* ================= ROLE CHECK ================= */
//     if (decoded.role !== "vendor") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     /* ================= FETCH VENDOR ================= */
//     const vendor = await Vendor.findById(decoded.id).select("-password");

//     if (!vendor) {
//       return res.status(401).json({
//         success: false,
//         message: "Vendor not found",
//         tokenExpired: true,
//       });
//     }

//     /* ================= ATTACH TO REQUEST ================= */
//     req.vendor = vendor;
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//       tokenExpired: true,
//     });
//   }
// };

const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    /* ================= TOKEN EXIST CHECK ================= */
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
        tokenExpired: true,
      });
    }

    const token = authHeader.split(" ")[1];

    /* ================= VERIFY TOKEN ================= */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ================= ROLE CHECK ================= */
    if (decoded.role !== "vendor") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Vendor access only.",
      });
    }

    /* ================= FETCH VENDOR ================= */
    const vendor = await Vendor.findById(decoded.id).select("-password");

    if (!vendor) {
      return res.status(401).json({
        success: false,
        message: "Vendor not found",
        tokenExpired: true,
      });
    }

    /* ================= ATTACH TO REQUEST ================= */
    req.vendor = vendor;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      tokenExpired: true,
    });
  }
};
