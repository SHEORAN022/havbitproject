

// const jwt = require("jsonwebtoken");
// const Vendor = require("../models/VendorModel");

// const vendorAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer "))
//       return res.status(401).json({ message: "Authorization token missing" });

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const vendor = await Vendor.findById(decoded.id).select("-password");
//     if (!vendor) return res.status(401).json({ message: "Vendor not found" });

//     req.vendor = vendor;
//     next();
//   } catch (err) {
//     console.error("VendorAuth Error:", err.message);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = vendorAuth;
const jwt = require("jsonwebtoken");
const Vendor = require("../models/VendorModel");

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) {
      return res.status(401).json({ message: "Vendor not found" });
    }

    req.vendor = vendor;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
