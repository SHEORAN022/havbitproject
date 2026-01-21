const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔒 Token missing
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

    // 🔐 Role check
    if (!decoded.role || decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    // ✅ Attach admin to request
    req.admin = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
