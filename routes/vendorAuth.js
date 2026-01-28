
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const cloudinary = require("../config/cloudinary");
// const Vendor = require("../models/VendorModel");

// const router = express.Router();

// /* ================= MULTER (Memory Storage) ================= */
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// /* ================= FILE FIELDS ================= */
// const fileFields = upload.fields([
//   { name: "gstFile", maxCount: 1 },
//   { name: "panFile", maxCount: 1 },
//   { name: "aadharFile", maxCount: 1 },
//   { name: "fssaiFile", maxCount: 1 },
//   { name: "msmeFile", maxCount: 1 },
//   { name: "ownerPhoto", maxCount: 1 },
//   { name: "supportingDoc", maxCount: 1 },
// ]);

// /* ================= CLOUDINARY HELPER ================= */
// const uploadToCloudinary = (buffer, folder) =>
//   new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder },
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result.secure_url);
//       }
//     );
//     stream.end(buffer);
//   });

// /* =========================================================
//    VENDOR SIGNUP
// ========================================================= */
// router.post("/signup", fileFields, async (req, res) => {
//   try {
//     const {
//       email,
//       password,
//       contactName,
//       phone,
//       vendorType,
//       brandName,
//       annualTurnover,
//       onlineTurnover,
//       minSellingPrice,
//       maxSellingPrice,
//       website,
//       presence,
//       demographic,
//       gstNumber,
//       panNumber,
//       aadharNumber,
//       accountNumber,
//       ifsc,
//       beneficiary,
//       address,
//       city,
//       state,
//       pincode,
//     } = req.body;

//     /* ===== VALIDATION ===== */
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Email & password required" });
//     }

//     /* ===== CHECK EXISTING ===== */
//     const exists = await Vendor.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ success: false, message: "Vendor already exists" });
//     }

//     /* ===== UPLOAD FILES ===== */
//     const uploaded = {};
//     if (req.files) {
//       await Promise.all(
//         Object.keys(req.files).map(async (key) => {
//           const file = req.files[key][0];
//           uploaded[key] = await uploadToCloudinary(
//             file.buffer,
//             `vendors/${brandName || "documents"}`
//           );
//         })
//       );
//     }

//     /* ===== HASH PASSWORD ===== */
//     const hashedPassword = await bcrypt.hash(password, 10);

//     /* ===== CREATE VENDOR ===== */
//     await Vendor.create({
//       contactName,
//       phone,
//       email,
//       password: hashedPassword,
//       vendorType,
//       brandName,

//       annualTurnover,
//       onlineTurnover,
//       minSellingPrice,
//       maxSellingPrice,
//       website,
//       presence: presence ? presence.split(",") : [],
//       demographic,

//       /* Bank */
//       accountNumber,
//       ifsc,
//       beneficiary,

//       /* Address */
//       address,
//       city,
//       state,
//       pincode,

//       /* Documents */
//       gstNumber,
//       gstFile: uploaded.gstFile || null,
//       panNumber,
//       panFile: uploaded.panFile || null,
//       aadharNumber,
//       aadharFile: uploaded.aadharFile || null,
//       fssaiFile: uploaded.fssaiFile || null,
//       msmeFile: uploaded.msmeFile || null,
//       ownerPhoto: uploaded.ownerPhoto || null,
//       supportingDoc: uploaded.supportingDoc || null,

//       status: "PENDING",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Signup successful. Waiting for admin approval.",
//     });
//   } catch (err) {
//     console.error("Vendor Signup Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Signup failed",
//     });
//   }
// });

// /* =========================================================
//    VENDOR LOGIN
// ========================================================= */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const vendor = await Vendor.findOne({ email }).select("+password");
//     if (!vendor) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     /* ===== STATUS CHECK ===== */
//     if (vendor.status !== "APPROVED") {
//       return res.status(403).json({
//         success: false,
//         message: `Account ${vendor.status.toLowerCase()}. Please contact admin.`,
//       });
//     }

//     /* ===== PASSWORD CHECK ===== */
//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     /* ===== TOKEN ===== */
//     // const token = jwt.sign(
//     //   { id: vendor._id, role: "vendor" },
//     //   // process.env.JWT_SECRET || "yoursecretkey",
//     //   { expiresIn: "7d" }
//     // );

//     const token = jwt.sign(
//   { id: vendor._id, role: "vendor" },
//   process.env.JWT_SECRET,
//   { expiresIn: "7d" }
// );


//     res.json({
//       success: true,
//       token,
//       vendor: {
//         id: vendor._id,
//         name: vendor.contactName,
//         email: vendor.email,
//         brand: vendor.brandName,
//       },
//     });
//   } catch (err) {
//     console.error("Vendor Login Error:", err);
//     res.status(500).json({ success: false, message: "Login failed" });
//   }
// });

// module.exports = router;


const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Vendor = require("../models/VendorModel");

const router = express.Router();

/* ================= MULTER (Memory Storage) ================= */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ================= FILE FIELDS ================= */
const fileFields = upload.fields([
  { name: "gstFile", maxCount: 1 },
  { name: "panFile", maxCount: 1 },
  { name: "aadharFile", maxCount: 1 },
  { name: "fssaiFile", maxCount: 1 },
  { name: "msmeFile", maxCount: 1 },
  { name: "ownerPhoto", maxCount: 1 },
  { name: "supportingDoc", maxCount: 1 },
]);

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });

/* =========================================================
   VENDOR SIGNUP
========================================================= */
router.post("/signup", fileFields, async (req, res) => {
  try {
    const {
      email,
      password,
      contactName,
      phone,
      vendorType,
      brandName,
      annualTurnover,
      onlineTurnover,
      minSellingPrice,
      maxSellingPrice,
      website,
      presence,
      demographic,
      gstNumber,
      panNumber,
      aadharNumber,
      accountNumber,
      ifsc,
      beneficiary,
      address,
      city,
      state,
      pincode,
    } = req.body;

    /* ===== VALIDATION ===== */
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email & password required" });
    }

    /* ===== CHECK EXISTING ===== */
    const exists = await Vendor.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Vendor already exists" });
    }

    /* ===== UPLOAD FILES ===== */
    const uploaded = {};
    if (req.files) {
      await Promise.all(
        Object.keys(req.files).map(async (key) => {
          const file = req.files[key][0];
          uploaded[key] = await uploadToCloudinary(
            file.buffer,
            `vendors/${brandName || "documents"}`
          );
        })
      );
    }

    /* ===== HASH PASSWORD ===== */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ===== CREATE VENDOR ===== */
    await Vendor.create({
      contactName,
      phone,
      email,
      password: hashedPassword,
      vendorType,
      brandName,

      annualTurnover,
      onlineTurnover,
      minSellingPrice,
      maxSellingPrice,
      website,
      presence: presence ? presence.split(",") : [],
      demographic,

      /* Bank */
      accountNumber,
      ifsc,
      beneficiary,

      /* Address */
      address,
      city,
      state,
      pincode,

      /* Documents */
      gstNumber,
      gstFile: uploaded.gstFile || null,
      panNumber,
      panFile: uploaded.panFile || null,
      aadharNumber,
      aadharFile: uploaded.aadharFile || null,
      fssaiFile: uploaded.fssaiFile || null,
      msmeFile: uploaded.msmeFile || null,
      ownerPhoto: uploaded.ownerPhoto || null,
      supportingDoc: uploaded.supportingDoc || null,

      status: "PENDING",
    });

    res.status(201).json({
      success: true,
      message: "Signup successful. Waiting for admin approval.",
    });
  } catch (err) {
    console.error("Vendor Signup Error:", err);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});

/* =========================================================
   VENDOR LOGIN
========================================================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email }).select("+password");
    if (!vendor) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    /* ===== STATUS CHECK ===== */
    if (vendor.status !== "APPROVED") {
      return res.status(403).json({
        success: false,
        message: `Account ${vendor.status.toLowerCase()}. Please contact admin.`,
      });
    }

    /* ===== PASSWORD CHECK ===== */
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    /* ===== TOKEN ===== */
    // const token = jwt.sign(
    //   { id: vendor._id, role: "vendor" },
    //   // process.env.JWT_SECRET || "yoursecretkey",
    //   { expiresIn: "7d" }
    // );

    const token = jwt.sign(
  { id: vendor._id, role: "vendor" },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


    res.json({
      success: true,
      token,
      vendor: {
        id: vendor._id,
        name: vendor.contactName,
        email: vendor.email,
        brand: vendor.brandName,
      },
    });
  } catch (err) {
    console.error("Vendor Login Error:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

module.exports = router;

