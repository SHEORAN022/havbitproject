

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

    // ✅ Attach user info
    req.user = {
      id: decoded.id,
      role: decoded.role || "user",
      email: decoded.email || null,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

