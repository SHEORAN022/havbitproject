// // // const express = require("express");
// // // const bcrypt = require("bcryptjs");
// // // const jwt = require("jsonwebtoken");
// // // const Vendor = require("../models/VendorModel");

// // // const router = express.Router();

// // // /* =========================
// // //    VENDOR SIGNUP
// // // ========================= */
// // // router.post("/signup", async (req, res) => {
// // //   try {
// // //     const { name, email, password } = req.body;

// // //     const existing = await Vendor.findOne({ email });
// // //     if (existing) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Vendor already exists",
// // //       });
// // //     }

// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     await Vendor.create({
// // //       name,
// // //       email,
// // //       password: hashedPassword,
// // //       status: "PENDING",
// // //     });

// // //     res.json({
// // //       success: true,
// // //       message: "Signup successful. Waiting for admin approval.",
// // //     });
// // //   } catch (err) {
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Signup failed",
// // //     });
// // //   }
// // // });

// // // /* =========================
// // //    VENDOR LOGIN (EMAIL + PASSWORD)
// // // ========================= */
// // // router.post("/login", async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     const vendor = await Vendor.findOne({ email });
// // //     if (!vendor) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Invalid email or password",
// // //       });
// // //     }

// // //     // 🔒 BLOCK LOGIN IF NOT APPROVED
// // //     if (vendor.status !== "APPROVED") {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: "Your account is not approved by admin yet",
// // //       });
// // //     }

// // //     const isMatch = await bcrypt.compare(password, vendor.password);
// // //     if (!isMatch) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Invalid email or password",
// // //       });
// // //     }

// // //     const token = jwt.sign(
// // //       { id: vendor._id, role: "vendor" },
// // //       process.env.JWT_SECRET,
// // //       { expiresIn: "7d" }
// // //     );

// // //     res.json({
// // //       success: true,
// // //       token,
// // //       vendor: {
// // //         id: vendor._id,
// // //         name: vendor.name,
// // //         email: vendor.email,
// // //       },
// // //     });
// // //   } catch (err) {
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Login failed",
// // //     });
// // //   }
// // // });

// // // module.exports = router;


// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const Vendor = require("../models/VendorModel");

// // const router = express.Router();

// // // --- VENDOR SIGNUP ---
// // router.post("/signup", async (req, res) => {
// //   try {
// //     const { email, password, contactName, phone, vendorType, brandName, annualTurnover, onlineTurnover, website, presence, demographic } = req.body;

// //     const existing = await Vendor.findOne({ email });
// //     if (existing) {
// //       return res.status(400).json({ success: false, message: "Vendor already exists" });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newVendor = await Vendor.create({
// //       contactName,
// //       email,
// //       password: hashedPassword,
// //       phone,
// //       vendorType,
// //       brandName,
// //       annualTurnover,
// //       onlineTurnover,
// //       website,
// //       presence,
// //       demographic,
// //       status: "PENDING",
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "Signup successful. Waiting for admin approval.",
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Signup failed: " + err.message });
// //   }
// // });

// // // --- VENDOR LOGIN ---
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const vendor = await Vendor.findOne({ email });

// //     if (!vendor) {
// //       return res.status(400).json({ success: false, message: "Invalid email or password" });
// //     }

// //     if (vendor.status !== "APPROVED") {
// //       return res.status(403).json({ 
// //         success: false, 
// //         message: `Account ${vendor.status.toLowerCase()}. Please contact admin.` 
// //       });
// //     }

// //     const isMatch = await bcrypt.compare(password, vendor.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ success: false, message: "Invalid email or password" });
// //     }

// //     const token = jwt.sign(
// //       { id: vendor._id, role: "vendor" },
// //       process.env.JWT_SECRET || "yoursecretkey",
// //       { expiresIn: "7d" }
// //     );

// //     res.json({
// //       success: true,
// //       token,
// //       vendor: { id: vendor._id, name: vendor.contactName, email: vendor.email },
// //     });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Login failed" });
// //   }
// // });

// // module.exports = router;







// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const multer = require("multer");
// // const cloudinary = require("../config/cloudinary");
// // const Vendor = require("../models/VendorModel");

// // const router = express.Router();

// // // --- MULTER SETUP (Memory Storage) ---
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage });

// // // Saare file fields define karein
// // const fileFields = upload.fields([
// //   { name: 'gstFile', maxCount: 1 },
// //   { name: 'panFile', maxCount: 1 },
// //   { name: 'aadharFile', maxCount: 1 },
// //   { name: 'fssaiFile', maxCount: 1 },
// //   { name: 'msmeFile', maxCount: 1 },
// //   { name: 'ownerPhoto', maxCount: 1 },
// //   { name: 'supportingDoc', maxCount: 1 },
// // ]);

// // // --- VENDOR SIGNUP (With Cloudinary) ---
// // router.post("/signup", fileFields, async (req, res) => {
// //   try {
// //     const { 
// //       email, password, contactName, phone, vendorType, brandName, 
// //       annualTurnover, onlineTurnover, minSellingPrice, maxSellingPrice, 
// //       website, presence, demographic, gstNumber, panNumber, aadharNumber 
// //     } = req.body;

// //     // 1. Check if vendor exists
// //     const existing = await Vendor.findOne({ email });
// //     if (existing) {
// //       return res.status(400).json({ success: false, message: "Vendor already exists" });
// //     }

// //     // 2. Cloudinary Upload Helper
// //     const uploadToCloudinary = async (fileBuffer, fieldName) => {
// //       return new Promise((resolve, reject) => {
// //         const stream = cloudinary.uploader.upload_stream(
// //           { folder: `vendors/${brandName || 'documents'}` },
// //           (error, result) => {
// //             if (error) reject(error);
// //             else resolve(result.secure_url);
// //           }
// //         );
// //         stream.end(fileBuffer);
// //       });
// //     };

// //     // 3. Sari Files ko bari-bari upload karein
// //     const uploadedUrls = {};
// //     if (req.files) {
// //       const uploadPromises = Object.keys(req.files).map(async (key) => {
// //         const file = req.files[key][0];
// //         const url = await uploadToCloudinary(file.buffer, key);
// //         uploadedUrls[key] = url;
// //       });
// //       await Promise.all(uploadPromises);
// //     }

// //     // 4. Password Hash
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // 5. Create Vendor in Database
// //     const newVendor = await Vendor.create({
// //       contactName,
// //       email,
// //       password: hashedPassword,
// //       phone,
// //       vendorType,
// //       brandName,
// //       annualTurnover,
// //       onlineTurnover,
// //       minSellingPrice,
// //       maxSellingPrice,
// //       website,
// //       presence: presence ? presence.split(",") : [], // FormData string ko array mein convert karein
// //       demographic,
// //       // Document Fields
// //       gstNumber,
// //       gstFile: uploadedUrls.gstFile || null,
// //       panNumber,
// //       panFile: uploadedUrls.panFile || null,
// //       aadharNumber,
// //       aadharFile: uploadedUrls.aadharFile || null,
// //       fssaiFile: uploadedUrls.fssaiFile || null,
// //       msmeFile: uploadedUrls.msmeFile || null,
// //       ownerPhoto: uploadedUrls.ownerPhoto || null,
// //       supportingDoc: uploadedUrls.supportingDoc || null,
// //       status: "PENDING",
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "Signup successful. Waiting for admin approval.",
// //     });

// //   } catch (err) {
// //     console.error("Signup Error:", err);
// //     res.status(500).json({ success: false, message: "Signup failed: " + err.message });
// //   }
// // });

// // // --- VENDOR LOGIN ---
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const vendor = await Vendor.findOne({ email });

// //     if (!vendor) {
// //       return res.status(400).json({ success: false, message: "Invalid email or password" });
// //     }

// //     // Status check
// //     if (vendor.status !== "APPROVED") {
// //       return res.status(403).json({ 
// //         success: false, 
// //         message: `Your account is ${vendor.status.toLowerCase()}. Please contact admin.` 
// //       });
// //     }

// //     const isMatch = await bcrypt.compare(password, vendor.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ success: false, message: "Invalid email or password" });
// //     }

// //     const token = jwt.sign(
// //       { id: vendor._id, role: "vendor" },
// //       process.env.JWT_SECRET || "yoursecretkey",
// //       { expiresIn: "7d" }
// //     );

// //     res.json({
// //       success: true,
// //       token,
// //       vendor: { 
// //         id: vendor._id, 
// //         name: vendor.contactName, 
// //         email: vendor.email,
// //         brand: vendor.brandName 
// //       },
// //     });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Login failed" });
// //   }
// // });

// // module.exports = router;





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
//     const token = jwt.sign(
//       { id: vendor._id, role: "vendor" },
//       process.env.JWT_SECRET || "yoursecretkey",
//       { expiresIn: "7d" }
//     );

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

