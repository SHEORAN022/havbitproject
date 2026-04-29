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

//     // ✅ Attach user info
//     req.user = {
//       id: decoded.id,
//       role: decoded.role || "user",
//       email: decoded.email || null,
//     };

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };


const jwt = require("jsonwebtoken");
const WebsiteUser = require("../models/WebsiteUser");

module.exports = async (req, res, next) => {
  try {
    /* ================= TOKEN CHECK ================= */
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }

    /* ================= EXTRACT TOKEN ================= */
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    /* ================= VERIFY TOKEN ================= */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    /* ================= FETCH USER FROM DB ================= */
    const user = await WebsiteUser.findById(decoded.id).select("_id fullName email phone");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    /* ================= ATTACH USER ================= */
    req.user = user; // 🔥 IMPORTANT

    next();
  } catch (error) {
    console.error("❌ USER AUTH ERROR:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
        tokenExpired: true,
      });
    }

    if (error.name === "JsonWebTokenError") {
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
