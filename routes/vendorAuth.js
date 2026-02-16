
// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const multer = require("multer");
// // const cloudinary = require("../config/cloudinary");
// // const Vendor = require("../models/VendorModel");

// // const router = express.Router();

// // /* ================= MULTER (Memory Storage) ================= */
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage });

// // /* ================= FILE FIELDS ================= */
// // const fileFields = upload.fields([
// //   { name: "gstFile", maxCount: 1 },
// //   { name: "panFile", maxCount: 1 },
// //   { name: "aadharFile", maxCount: 1 },
// //   { name: "fssaiFile", maxCount: 1 },
// //   { name: "msmeFile", maxCount: 1 },
// //   { name: "ownerPhoto", maxCount: 1 },
// //   { name: "supportingDoc", maxCount: 1 },
// // ]);

// // /* ================= CLOUDINARY HELPER ================= */
// // const uploadToCloudinary = (buffer, folder) =>
// //   new Promise((resolve, reject) => {
// //     const stream = cloudinary.uploader.upload_stream(
// //       { folder },
// //       (err, result) => {
// //         if (err) reject(err);
// //         else resolve(result.secure_url);
// //       }
// //     );
// //     stream.end(buffer);
// //   });

// // /* =========================================================
// //    VENDOR SIGNUP
// // ========================================================= */
// // router.post("/signup", fileFields, async (req, res) => {
// //   try {
// //     const {
// //       email,
// //       password,
// //       contactName,
// //       phone,
// //       vendorType,
// //       brandName,
// //       annualTurnover,
// //       onlineTurnover,
// //       minSellingPrice,
// //       maxSellingPrice,
// //       website,
// //       presence,
// //       demographic,
// //       gstNumber,
// //       panNumber,
// //       aadharNumber,
// //       accountNumber,
// //       ifsc,
// //       beneficiary,
// //       address,
// //       city,
// //       state,
// //       pincode,
// //     } = req.body;

// //     /* ===== VALIDATION ===== */
// //     if (!email || !password) {
// //       return res.status(400).json({ success: false, message: "Email & password required" });
// //     }

// //     /* ===== CHECK EXISTING ===== */
// //     const exists = await Vendor.findOne({ email });
// //     if (exists) {
// //       return res.status(400).json({ success: false, message: "Vendor already exists" });
// //     }

// //     /* ===== UPLOAD FILES ===== */
// //     const uploaded = {};
// //     if (req.files) {
// //       await Promise.all(
// //         Object.keys(req.files).map(async (key) => {
// //           const file = req.files[key][0];
// //           uploaded[key] = await uploadToCloudinary(
// //             file.buffer,
// //             `vendors/${brandName || "documents"}`
// //           );
// //         })
// //       );
// //     }

// //     /* ===== HASH PASSWORD ===== */
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     /* ===== CREATE VENDOR ===== */
// //     await Vendor.create({
// //       contactName,
// //       phone,
// //       email,
// //       password: hashedPassword,
// //       vendorType,
// //       brandName,

// //       annualTurnover,
// //       onlineTurnover,
// //       minSellingPrice,
// //       maxSellingPrice,
// //       website,
// //       presence: presence ? presence.split(",") : [],
// //       demographic,

// //       /* Bank */
// //       accountNumber,
// //       ifsc,
// //       beneficiary,

// //       /* Address */
// //       address,
// //       city,
// //       state,
// //       pincode,

// //       /* Documents */
// //       gstNumber,
// //       gstFile: uploaded.gstFile || null,
// //       panNumber,
// //       panFile: uploaded.panFile || null,
// //       aadharNumber,
// //       aadharFile: uploaded.aadharFile || null,
// //       fssaiFile: uploaded.fssaiFile || null,
// //       msmeFile: uploaded.msmeFile || null,
// //       ownerPhoto: uploaded.ownerPhoto || null,
// //       supportingDoc: uploaded.supportingDoc || null,

// //       status: "PENDING",
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "Signup successful. Waiting for admin approval.",
// //     });
// //   } catch (err) {
// //     console.error("Vendor Signup Error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Signup failed",
// //     });
// //   }
// // });

// // /* =========================================================
// //    VENDOR LOGIN
// // ========================================================= */
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const vendor = await Vendor.findOne({ email }).select("+password");
// //     if (!vendor) {
// //       return res.status(400).json({ success: false, message: "Invalid credentials" });
// //     }

// //     /* ===== STATUS CHECK ===== */
// //     if (vendor.status !== "APPROVED") {
// //       return res.status(403).json({
// //         success: false,
// //         message: `Account ${vendor.status.toLowerCase()}. Please contact admin.`,
// //       });
// //     }

// //     /* ===== PASSWORD CHECK ===== */
// //     const isMatch = await bcrypt.compare(password, vendor.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ success: false, message: "Invalid credentials" });
// //     }

// //     /* ===== TOKEN ===== */
// //     // const token = jwt.sign(
// //     //   { id: vendor._id, role: "vendor" },
// //     //   // process.env.JWT_SECRET || "yoursecretkey",
// //     //   { expiresIn: "7d" }
// //     // );

// //     const token = jwt.sign(
// //   { id: vendor._id, role: "vendor" },
// //   process.env.JWT_SECRET,
// //   { expiresIn: "7d" }
// // );


// //     res.json({
// //       success: true,
// //       token,
// //       vendor: {
// //         id: vendor._id,
// //         name: vendor.contactName,
// //         email: vendor.email,
// //         brand: vendor.brandName,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Vendor Login Error:", err);
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
// // const vendorAuth = require("../middleware/vendorAuth");

// // const router = express.Router();

// // /* ================= MULTER (Memory Storage) ================= */
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage });

// // /* ================= FILE FIELDS ================= */
// // const fileFields = upload.fields([
// //   { name: "gstFile", maxCount: 1 },
// //   { name: "panFile", maxCount: 1 },
// //   { name: "aadharFile", maxCount: 1 },
// //   { name: "fssaiFile", maxCount: 1 },
// //   { name: "msmeFile", maxCount: 1 },
// //   { name: "ownerPhoto", maxCount: 1 },
// //   { name: "supportingDoc", maxCount: 1 },
// // ]);

// // /* ================= CLOUDINARY HELPER ================= */
// // const uploadToCloudinary = (buffer, folder) =>
// //   new Promise((resolve, reject) => {
// //     const stream = cloudinary.uploader.upload_stream(
// //       { folder },
// //       (err, result) => {
// //         if (err) reject(err);
// //         else resolve(result.secure_url);
// //       }
// //     );
// //     stream.end(buffer);
// //   });

// // /* =========================================================
// //    VENDOR SIGNUP
// // ========================================================= */
// // router.post("/signup", fileFields, async (req, res) => {
// //   try {
// //     const {
// //       email,
// //       password,
// //       contactName,
// //       phone,
// //       vendorType,
// //       brandName,
// //       annualTurnover,
// //       onlineTurnover,
// //       minSellingPrice,
// //       maxSellingPrice,
// //       website,
// //       presence,
// //       demographic,
// //       gstNumber,
// //       panNumber,
// //       aadharNumber,
// //       accountNumber,
// //       ifsc,
// //       beneficiary,
// //       address,
// //       city,
// //       state,
// //       pincode,
// //     } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Email & password required",
// //       });
// //     }

// //     const exists = await Vendor.findOne({ email });
// //     if (exists) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Vendor already exists",
// //       });
// //     }

// //     /* ===== Upload Files ===== */
// //     const uploaded = {};
// //     if (req.files) {
// //       await Promise.all(
// //         Object.keys(req.files).map(async (key) => {
// //           const file = req.files[key][0];
// //           uploaded[key] = await uploadToCloudinary(
// //             file.buffer,
// //             `vendors/${brandName || "documents"}`
// //           );
// //         })
// //       );
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     await Vendor.create({
// //       contactName,
// //       phone,
// //       email,
// //       password: hashedPassword,
// //       vendorType,
// //       brandName,

// //       annualTurnover,
// //       onlineTurnover,
// //       minSellingPrice,
// //       maxSellingPrice,
// //       website,
// //       presence: presence ? presence.split(",") : [],
// //       demographic,

// //       accountNumber,
// //       ifsc: ifsc?.toUpperCase(),
// //       beneficiary,

// //       address,
// //       city,
// //       state,
// //       pincode,

// //       gstNumber: gstNumber?.toUpperCase(),
// //       gstFile: uploaded.gstFile || null,

// //       panNumber: panNumber?.toUpperCase(),
// //       panFile: uploaded.panFile || null,

// //       aadharNumber,
// //       aadharFile: uploaded.aadharFile || null,

// //       fssaiFile: uploaded.fssaiFile || null,
// //       msmeFile: uploaded.msmeFile || null,
// //       ownerPhoto: uploaded.ownerPhoto || null,
// //       supportingDoc: uploaded.supportingDoc || null,

// //       status: "PENDING",
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "Signup successful. Waiting for admin approval.",
// //     });
// //   } catch (err) {
// //     console.error("Vendor Signup Error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Signup failed",
// //     });
// //   }
// // });

// // /* =========================================================
// //    VENDOR LOGIN
// // ========================================================= */
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const vendor = await Vendor.findOne({ email }).select("+password");
// //     if (!vendor) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid credentials",
// //       });
// //     }

// //     if (vendor.status !== "APPROVED") {
// //       return res.status(403).json({
// //         success: false,
// //         message: `Account ${vendor.status.toLowerCase()}. Please contact admin.`,
// //       });
// //     }

// //     const isMatch = await bcrypt.compare(password, vendor.password);
// //     if (!isMatch) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid credentials",
// //       });
// //     }

// //     const token = jwt.sign(
// //       { id: vendor._id, role: "vendor" },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     res.json({
// //       success: true,
// //       token,
// //       vendor: {
// //         id: vendor._id,
// //         name: vendor.contactName,
// //         email: vendor.email,
// //         brand: vendor.brandName,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Vendor Login Error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Login failed",
// //     });
// //   }
// // });

// // /* =========================================================
// //    UPDATE VENDOR PROFILE & DOCUMENTS
// // ========================================================= */
// // router.put("/update-profile", vendorAuth, fileFields, async (req, res) => {
// //   try {
// //     const vendor = req.vendor;

// //     const {
// //       contactName,
// //       phone,
// //       gstNumber,
// //       panNumber,
// //       aadharNumber,
// //       accountNumber,
// //       ifsc,
// //       beneficiary,
// //       address,
// //       city,
// //       state,
// //       pincode,
// //     } = req.body;

// //     if (contactName) vendor.contactName = contactName;
// //     if (phone) vendor.phone = phone;

// //     if (gstNumber) vendor.gstNumber = gstNumber.toUpperCase();
// //     if (panNumber) vendor.panNumber = panNumber.toUpperCase();
// //     if (aadharNumber) vendor.aadharNumber = aadharNumber;

// //     if (accountNumber) vendor.accountNumber = accountNumber;
// //     if (ifsc) vendor.ifsc = ifsc.toUpperCase();
// //     if (beneficiary) vendor.beneficiary = beneficiary;

// //     if (address) vendor.address = address;
// //     if (city) vendor.city = city;
// //     if (state) vendor.state = state;
// //     if (pincode) vendor.pincode = pincode;

// //     if (req.files) {
// //       const uploaded = {};

// //       await Promise.all(
// //         Object.keys(req.files).map(async (key) => {
// //           const file = req.files[key][0];
// //           uploaded[key] = await uploadToCloudinary(
// //             file.buffer,
// //             `vendors/${vendor.brandName || "documents"}`
// //           );
// //         })
// //       );

// //       if (uploaded.gstFile) vendor.gstFile = uploaded.gstFile;
// //       if (uploaded.panFile) vendor.panFile = uploaded.panFile;
// //       if (uploaded.aadharFile) vendor.aadharFile = uploaded.aadharFile;
// //       if (uploaded.fssaiFile) vendor.fssaiFile = uploaded.fssaiFile;
// //       if (uploaded.msmeFile) vendor.msmeFile = uploaded.msmeFile;
// //       if (uploaded.ownerPhoto) vendor.ownerPhoto = uploaded.ownerPhoto;
// //       if (uploaded.supportingDoc)
// //         vendor.supportingDoc = uploaded.supportingDoc;
// //     }

// //     await vendor.save();

// //     res.json({
// //       success: true,
// //       message: "Vendor profile updated successfully",
// //       vendor,
// //     });
// //   } catch (err) {
// //     console.error("Vendor Update Error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Profile update failed",
// //     });
// //   }
// // });






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
// /* =========================================================
//    UPDATE VENDOR PROFILE (JSON + FILE SUPPORT)
// ========================================================= */

// const vendorAuth = require("../middleware/vendorAuth");

// // middleware wrapper so JSON bhi chale aur form-data bhi
// const optionalMulter = (req, res, next) => {
//   if (req.headers["content-type"]?.includes("multipart/form-data")) {
//     fileFields(req, res, next);
//   } else {
//     next();
//   }
// };

// router.put(
//   "/update-profile",
//   vendorAuth,
//   optionalMulter,
//   async (req, res) => {
//     try {
//       const vendor = req.vendor;

//       const {
//         contactName,
//         phone,
//         gstNumber,
//         panNumber,
//         aadharNumber,
//         accountNumber,
//         ifsc,
//         beneficiary,
//         address,
//         city,
//         state,
//         pincode,
//       } = req.body;

//       /* ================= TEXT FIELD UPDATE ================= */

//       if (contactName) vendor.contactName = contactName;
//       if (phone) vendor.phone = phone;

//       if (gstNumber) vendor.gstNumber = gstNumber.toUpperCase();
//       if (panNumber) vendor.panNumber = panNumber.toUpperCase();
//       if (aadharNumber) vendor.aadharNumber = aadharNumber;

//       if (accountNumber) vendor.accountNumber = accountNumber;
//       if (ifsc) vendor.ifsc = ifsc.toUpperCase();
//       if (beneficiary) vendor.beneficiary = beneficiary;

//       if (address) vendor.address = address;
//       if (city) vendor.city = city;
//       if (state) vendor.state = state;
//       if (pincode) vendor.pincode = pincode;

//       /* ================= FILE UPDATE ================= */

//       if (req.files) {
//         const uploaded = {};

//         await Promise.all(
//           Object.keys(req.files).map(async (key) => {
//             const file = req.files[key][0];
//             uploaded[key] = await uploadToCloudinary(
//               file.buffer,
//               `vendors/${vendor.brandName || "documents"}`
//             );
//           })
//         );

//         if (uploaded.gstFile) vendor.gstFile = uploaded.gstFile;
//         if (uploaded.panFile) vendor.panFile = uploaded.panFile;
//         if (uploaded.aadharFile) vendor.aadharFile = uploaded.aadharFile;
//         if (uploaded.fssaiFile) vendor.fssaiFile = uploaded.fssaiFile;
//         if (uploaded.msmeFile) vendor.msmeFile = uploaded.msmeFile;
//         if (uploaded.ownerPhoto) vendor.ownerPhoto = uploaded.ownerPhoto;
//         if (uploaded.supportingDoc)
//           vendor.supportingDoc = uploaded.supportingDoc;
//       }

//       await vendor.save();

//       res.json({
//         success: true,
//         message: "Profile updated successfully",
//         vendor,
//       });
//     } catch (err) {
//       console.error("Update Profile Error:", err);
//       res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//       });
//     }
//   }
// );


// module.exports = router;




const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Vendor = require("../models/VendorModel");
const vendorAuth = require("../middleware/vendorAuth");

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
    let {
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
      return res.status(400).json({
        success: false,
        message: "Email & password required",
      });
    }

    email = email.toLowerCase(); // 🔥 VERY IMPORTANT

    /* ===== CHECK EXISTING ===== */
    const exists = await Vendor.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Vendor already exists",
      });
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

      accountNumber,
      ifsc,
      beneficiary,

      address,
      city,
      state,
      pincode,

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

    return res.status(201).json({
      success: true,
      message: "Signup successful. Waiting for admin approval.",
    });
  } catch (err) {
    console.error("Vendor Signup Error:", err);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});

/* =========================================================
   VENDOR LOGIN  ✅ FIXED
========================================================= */
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email & password required",
      });
    }

    email = email.toLowerCase(); // 🔥 MAIN FIX

    const vendor = await Vendor.findOne({ email }).select("+password");

    /* 🔥 NULL CHECK (MOST IMPORTANT) */
    if (!vendor) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
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
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /* ===== TOKEN ===== */
    const token = jwt.sign(
      { id: vendor._id, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
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
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

/* =========================================================
   UPDATE VENDOR PROFILE
========================================================= */
const optionalMulter = (req, res, next) => {
  if (req.headers["content-type"]?.includes("multipart/form-data")) {
    fileFields(req, res, next);
  } else {
    next();
  }
};

router.put("/update-profile", vendorAuth, optionalMulter, async (req, res) => {
  try {
    const vendor = req.vendor;

    Object.assign(vendor, req.body);

    if (req.files) {
      for (const key of Object.keys(req.files)) {
        const file = req.files[key][0];
        vendor[key] = await uploadToCloudinary(
          file.buffer,
          `vendors/${vendor.brandName || "documents"}`
        );
      }
    }

    await vendor.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      vendor,
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;

