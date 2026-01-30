
// const jwt = require("jsonwebtoken");
// // const Vendor = require("../models/VendorModel");
// const Vendor = require("../models/VendorModel");

// module.exports = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization token missing",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("DECODED:", decoded); // 🔍 DEBUG

//     if (decoded.role !== "vendor") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     const vendor = await Vendor.findById(decoded.id);
//     console.log("VENDOR:", vendor); // 🔍 DEBUG

//     if (!vendor) {
//       return res.status(401).json({
//         success: false,
//         message: "Vendor not found",
//       });
//     }

//     req.vendor = vendor;
//     next();
//   } catch (err) {
//     console.error("VENDOR AUTH ERROR:", err.message);
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };





const jwt = require("jsonwebtoken");
const Vendor = require("../models/VendorModel");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "vendor") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) {
      return res.status(401).json({
        success: false,
        message: "Vendor not found",
      });
    }

    req.vendor = vendor;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
