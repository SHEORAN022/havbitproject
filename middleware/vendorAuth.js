

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

//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({
//         success: false,
//         message: "JWT secret not configured",
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

//     /* ================= 🔥 FIXED STATUS CHECK ================= */
//     const status = (vendor.status || "PENDING").toUpperCase().trim();
    
//     if (status !== "APPROVED") {
//       return res.status(403).json({
//         success: false,
//         message: `Account ${status.toLowerCase()}. Please contact admin.`,
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
const Vendor = require("../models/VendorModel");

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

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret not configured",
      });
    }

    const token = authHeader.split(" ")[1];

    /* ================= VERIFY TOKEN ================= */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ================= ROLE CHECK ================= */
    if (decoded.role !== "vendor") {
      return res.status(403).json({
        success: false,
        message: "Access denied - Vendor only",
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

    /* ================= STATUS CHECK ================= */
    const status = (vendor.status || "PENDING").toUpperCase().trim();
    
    if (status !== "APPROVED") {
      return res.status(403).json({
        success: false,
        message: `Account ${status.toLowerCase()}. Please contact admin for approval.`,
        status: vendor.status
      });
    }

    /* ================= ATTACH TO REQUEST ================= */
    req.vendor = vendor;
    next();
    
  } catch (err) {
    console.error("Vendor Auth Error:", err.message);
    
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
        tokenExpired: true,
      });
    }
    
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
        tokenExpired: true,
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      tokenExpired: true,
    });
  }
};
