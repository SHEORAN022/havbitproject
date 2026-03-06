

// // const jwt = require("jsonwebtoken");

// // module.exports = (req, res, next) => {
// //   try {
// //     const authHeader = req.headers.authorization;

// //     // 🔒 Token missing
// //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Token not provided",
// //       });
// //     }

// //     // 🔑 Extract token
// //     const token = authHeader.split(" ")[1];

// //     // 🔍 Verify token
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     // 🔐 Role check
// //     if (!decoded.role || decoded.role !== "admin") {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Admin access only",
// //       });
// //     }

// //     // ✅ Attach admin to request
// //     req.admin = {
// //       id: decoded.id,
// //       email: decoded.email,
// //       role: decoded.role,
// //     };

// //     next();
// //   } catch (error) {
// //     return res.status(401).json({
// //       success: false,
// //       message: "Invalid or expired token",
// //     });
// //   }
// // };
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // ❌ Token missing
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Token not provided",
//       });
//     }

//     // 🔑 Extract token
//     const token = authHeader.split(" ")[1];

//     // 🔍 Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 🔐 Role check
//     if (decoded.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Admin access only",
//       });
//     }

//     // ✅ Attach admin info
//     req.admin = {
//       id: decoded.id,
//       email: decoded.email,
//       role: decoded.role,
//     };

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };
// adminAuth.js - DEBUGGED VERSION
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ Token missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }

    // 🔑 Extract token
    const token = authHeader.split(" ")[1];

    // 🔍 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🐛 DEBUG: Log what's inside the token (remove after fixing)
    console.log("🔍 Decoded Token:", JSON.stringify(decoded, null, 2));

    // 🔐 Role check — support both "admin" and "ADMIN" just in case
    const role = decoded.role?.toLowerCase();
    if (role !== "admin") {
      console.log("❌ Role mismatch. Token role:", decoded.role);
      return res.status(403).json({
        success: false,
        message: "Admin access only",
        debug_role_found: decoded.role || "no role field in token",
      });
    }

    // ✅ Attach admin info
    req.admin = {
      id: decoded.id || decoded._id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("❌ Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
