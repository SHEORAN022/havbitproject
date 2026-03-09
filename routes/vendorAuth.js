

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const axios = require("axios"); // ← ADD THIS (npm install axios)
// const cloudinary = require("../config/cloudinary");
// const Vendor = require("../models/VendorModel");
// const vendorAuth = require("../middleware/vendorAuth");

// const router = express.Router();

// /* ================= MULTER (Memory Storage) ================= */
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// /* ================= FILE FIELDS ================= */
// const fileFields = upload.fields([
//   { name: "gstFile",       maxCount: 1 },
//   { name: "panFile",       maxCount: 1 },
//   { name: "aadharFile",    maxCount: 1 },
//   { name: "fssaiFile",     maxCount: 1 },
//   { name: "msmeFile",      maxCount: 1 },
//   { name: "ownerPhoto",    maxCount: 1 },
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
//       email, password, contactName, phone, vendorType, brandName,
//       annualTurnover, onlineTurnover, minSellingPrice, maxSellingPrice,
//       website, presence, demographic, gstNumber, panNumber, aadharNumber,
//       accountNumber, ifsc, beneficiary, address, city, state, pincode,
//     } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Email & password required" });
//     }

//     const exists = await Vendor.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ success: false, message: "Vendor already exists" });
//     }

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

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await Vendor.create({
//       contactName, phone, email,
//       password: hashedPassword,
//       vendorType, brandName,
//       annualTurnover, onlineTurnover,
//       minSellingPrice, maxSellingPrice,
//       website,
//       presence: presence ? presence.split(",") : [],
//       demographic,
//       accountNumber, ifsc, beneficiary,
//       address, city, state, pincode,
//       gstNumber,
//       gstFile:      uploaded.gstFile      || null,
//       panNumber,
//       panFile:      uploaded.panFile      || null,
//       aadharNumber,
//       aadharFile:   uploaded.aadharFile   || null,
//       fssaiFile:    uploaded.fssaiFile    || null,
//       msmeFile:     uploaded.msmeFile     || null,
//       ownerPhoto:   uploaded.ownerPhoto   || null,
//       supportingDoc: uploaded.supportingDoc || null,
//       status: "PENDING",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Signup successful. Waiting for admin approval.",
//     });
//   } catch (err) {
//     console.error("Vendor Signup Error:", err);
//     res.status(500).json({ success: false, message: "Signup failed" });
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

//     if (vendor.status !== "APPROVED") {
//       return res.status(403).json({
//         success: false,
//         message: `Account ${vendor.status.toLowerCase()}. Please contact admin.`,
//       });
//     }

//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: vendor._id, role: "vendor" },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       token,
//       vendor: {
//         id:    vendor._id,
//         name:  vendor.contactName,
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
//    GET VENDOR PROFILE
//    Route: GET /api/vendor/profile
// ========================================================= */
// router.get("/profile", vendorAuth, async (req, res) => {
//   try {
//     const vendor = req.vendor;

//     res.json({
//       success: true,
//       vendor: {
//         id:             vendor._id,
//         contactName:    vendor.contactName    || "",
//         email:          vendor.email          || "",
//         phone:          vendor.phone          || "",
//         vendorType:     vendor.vendorType     || "",
//         demographic:    vendor.demographic    || "",
//         status:         vendor.status         || "PENDING",
//         isKYCCompleted: vendor.isKYCCompleted || false,
//         brandName:      vendor.brandName      || "",
//         annualTurnover: vendor.annualTurnover || "",
//         onlineTurnover: vendor.onlineTurnover || "",
//         website:        vendor.website        || "",
//         gstNumber:      vendor.gstNumber      || "",
//         panNumber:      vendor.panNumber      || "",
//         aadharNumber:   vendor.aadharNumber   || "",
//         gstFile:        vendor.gstFile        || "",
//         panFile:        vendor.panFile        || "",
//         aadharFile:     vendor.aadharFile     || "",
//         fssaiFile:      vendor.fssaiFile      || "",
//         ownerPhoto:     vendor.ownerPhoto     || "",
//         msmeFile:       vendor.msmeFile       || "",
//         supportingDoc:  vendor.supportingDoc  || "",
//         accountNumber:  vendor.accountNumber  || "",
//         ifsc:           vendor.ifsc           || "",
//         beneficiary:    vendor.beneficiary    || "",
//         address:        vendor.address        || "",
//         city:           vendor.city           || "",
//         state:          vendor.state          || "",
//         pincode:        vendor.pincode        || "",
//       },
//     });
//   } catch (err) {
//     console.error("Get Profile Error:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch profile" });
//   }
// });

// /* =========================================================
//    ✅ DOCUMENT DOWNLOAD PROXY
//    Route: GET /api/vendor/download?url=<cloudinary_url>&name=<filename>

//    - vendorAuth se sirf logged-in vendors hi download kar sakte hain
//    - Cloudinary URL ko backend se fetch karke stream karta hai
//    - Browser ko proper Content-Disposition header milta hai
//      jisse file seedha download hoti hai (no 401, no CORS)
// ========================================================= */
// router.get("/download", vendorAuth, async (req, res) => {
//   try {
//     const { url, name } = req.query;

//     // Validate: sirf Cloudinary URLs allow karo
//     if (!url || !url.includes("res.cloudinary.com")) {
//       return res.status(400).json({ success: false, message: "Invalid file URL" });
//     }

//     // Filename: query se liya ya URL se extract kiya
//     const rawName = name || url.split("/").pop().split("?")[0] || "document";
//     // Clean filename - special chars hata do
//     const filename = rawName.replace(/[^a-zA-Z0-9._-]/g, "_");

//     // Cloudinary se file fetch karo (server-to-server, koi CORS nahi)
//     const response = await axios.get(url, {
//       responseType: "stream",
//       timeout: 30000, // 30 second timeout
//     });

//     // Content type Cloudinary se hi lo
//     const contentType = response.headers["content-type"] || "application/octet-stream";

//     // Frontend ko download force karo
//     res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
//     res.setHeader("Content-Type", contentType);

//     // Content-Length bhi set karo agar available hai (progress bar ke liye)
//     if (response.headers["content-length"]) {
//       res.setHeader("Content-Length", response.headers["content-length"]);
//     }

//     // Stream directly to client
//     response.data.pipe(res);

//     // Error handling during stream
//     response.data.on("error", (err) => {
//       console.error("Stream error:", err);
//       if (!res.headersSent) {
//         res.status(500).json({ success: false, message: "Download failed" });
//       }
//     });

//   } catch (err) {
//     console.error("Download Proxy Error:", err.message);
//     if (!res.headersSent) {
//       res.status(500).json({ success: false, message: "Failed to download file" });
//     }
//   }
// });

// /* =========================================================
//    UPDATE VENDOR PROFILE (JSON + FILE SUPPORT)
//    Route: PUT /api/vendor/update-profile
// ========================================================= */
// const optionalMulter = (req, res, next) => {
//   if (req.headers["content-type"]?.includes("multipart/form-data")) {
//     fileFields(req, res, next);
//   } else {
//     next();
//   }
// };

// router.put("/update-profile", vendorAuth, optionalMulter, async (req, res) => {
//   try {
//     const vendor = req.vendor;

//     const {
//       contactName, phone,
//       gstNumber, panNumber, aadharNumber,
//       accountNumber, ifsc, beneficiary,
//       address, city, state, pincode,
//     } = req.body;

//     if (contactName)  vendor.contactName  = contactName;
//     if (phone)        vendor.phone        = phone;

//     if (gstNumber)    vendor.gstNumber    = gstNumber.toUpperCase();
//     if (panNumber)    vendor.panNumber    = panNumber.toUpperCase();
//     if (aadharNumber) vendor.aadharNumber = aadharNumber;

//     if (accountNumber) vendor.accountNumber = accountNumber;
//     if (ifsc)          vendor.ifsc          = ifsc.toUpperCase();
//     if (beneficiary)   vendor.beneficiary   = beneficiary;

//     if (address)  vendor.address  = address;
//     if (city)     vendor.city     = city;
//     if (state)    vendor.state    = state;
//     if (pincode)  vendor.pincode  = pincode;

//     if (req.files) {
//       const uploaded = {};
//       await Promise.all(
//         Object.keys(req.files).map(async (key) => {
//           const file = req.files[key][0];
//           uploaded[key] = await uploadToCloudinary(
//             file.buffer,
//             `vendors/${vendor.brandName || "documents"}`
//           );
//         })
//       );

//       if (uploaded.gstFile)       vendor.gstFile       = uploaded.gstFile;
//       if (uploaded.panFile)       vendor.panFile       = uploaded.panFile;
//       if (uploaded.aadharFile)    vendor.aadharFile    = uploaded.aadharFile;
//       if (uploaded.fssaiFile)     vendor.fssaiFile     = uploaded.fssaiFile;
//       if (uploaded.msmeFile)      vendor.msmeFile      = uploaded.msmeFile;
//       if (uploaded.ownerPhoto)    vendor.ownerPhoto    = uploaded.ownerPhoto;
//       if (uploaded.supportingDoc) vendor.supportingDoc = uploaded.supportingDoc;
//     }

//     await vendor.save();

//     res.json({
//       success: true,
//       message: "Profile updated successfully",
//       vendor,
//     });
//   } catch (err) {
//     console.error("Update Profile Error:", err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const axios = require("axios");
const cloudinary = require("../config/cloudinary");
const Vendor = require("../models/VendorModel");
const vendorAuth = require("../middleware/vendorAuth");

const router = express.Router();

/* ================= MULTER (Memory Storage) ================= */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ================= FILE FIELDS ================= */
const fileFields = upload.fields([
  { name: "gstFile",       maxCount: 1 },
  { name: "panFile",       maxCount: 1 },
  { name: "aadharFile",    maxCount: 1 },
  { name: "fssaiFile",     maxCount: 1 },
  { name: "msmeFile",      maxCount: 1 },
  { name: "ownerPhoto",    maxCount: 1 },
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
      email, password, contactName, phone, vendorType, brandName,
      annualTurnover, onlineTurnover, minSellingPrice, maxSellingPrice,
      website, presence, demographic, gstNumber, panNumber, aadharNumber,
      accountNumber, ifsc, beneficiary, address, city, state, pincode,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email & password required" });
    }

    const exists = await Vendor.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Vendor already exists" });
    }

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

    const hashedPassword = await bcrypt.hash(password, 10);

    await Vendor.create({
      contactName, phone, email,
      password: hashedPassword,
      vendorType, brandName,
      annualTurnover, onlineTurnover,
      minSellingPrice, maxSellingPrice,
      website,
      presence: presence ? presence.split(",") : [],
      demographic,
      accountNumber, ifsc, beneficiary,
      address, city, state, pincode,
      gstNumber,
      gstFile:      uploaded.gstFile      || null,
      panNumber,
      panFile:      uploaded.panFile      || null,
      aadharNumber,
      aadharFile:   uploaded.aadharFile   || null,
      fssaiFile:    uploaded.fssaiFile    || null,
      msmeFile:     uploaded.msmeFile     || null,
      ownerPhoto:   uploaded.ownerPhoto   || null,
      supportingDoc: uploaded.supportingDoc || null,
      status: "PENDING",
    });

    res.status(201).json({
      success: true,
      message: "Signup successful. Waiting for admin approval.",
    });
  } catch (err) {
    console.error("Vendor Signup Error:", err);
    res.status(500).json({ success: false, message: "Signup failed" });
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

    if (vendor.status !== "APPROVED") {
      return res.status(403).json({
        success: false,
        message: `Account ${vendor.status.toLowerCase()}. Please contact admin.`,
      });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: vendor._id, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      vendor: {
        id:    vendor._id,
        name:  vendor.contactName,
        email: vendor.email,
        brand: vendor.brandName,
      },
    });
  } catch (err) {
    console.error("Vendor Login Error:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

/* =========================================================
   GET VENDOR PROFILE
========================================================= */
router.get("/profile", vendorAuth, async (req, res) => {
  try {
    const vendor = req.vendor;

    res.json({
      success: true,
      vendor: {
        id:             vendor._id,
        contactName:    vendor.contactName    || "",
        email:          vendor.email          || "",
        phone:          vendor.phone          || "",
        vendorType:     vendor.vendorType     || "",
        demographic:    vendor.demographic    || "",
        status:         vendor.status         || "PENDING",
        isKYCCompleted: vendor.isKYCCompleted || false,
        brandName:      vendor.brandName      || "",
        annualTurnover: vendor.annualTurnover || "",
        onlineTurnover: vendor.onlineTurnover || "",
        website:        vendor.website        || "",
        gstNumber:      vendor.gstNumber      || "",
        panNumber:      vendor.panNumber      || "",
        aadharNumber:   vendor.aadharNumber   || "",
        gstFile:        vendor.gstFile        || "",
        panFile:        vendor.panFile        || "",
        aadharFile:     vendor.aadharFile     || "",
        fssaiFile:      vendor.fssaiFile      || "",
        ownerPhoto:     vendor.ownerPhoto     || "",
        msmeFile:       vendor.msmeFile       || "",
        supportingDoc:  vendor.supportingDoc  || "",
        accountNumber:  vendor.accountNumber  || "",
        ifsc:           vendor.ifsc           || "",
        beneficiary:    vendor.beneficiary    || "",
        address:        vendor.address        || "",
        city:           vendor.city           || "",
        state:          vendor.state          || "",
        pincode:        vendor.pincode        || "",
      },
    });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
});

/* =========================================================
   DOCUMENT DOWNLOAD PROXY (WITH VIEW SUPPORT)
========================================================= */
router.get("/download", vendorAuth, async (req, res) => {
  try {
    const { url, name, view } = req.query;

    if (!url || !url.includes("res.cloudinary.com")) {
      return res.status(400).json({ success: false, message: "Invalid file URL" });
    }

    const rawName = name || url.split("/").pop().split("?")[0] || "document";
    const filename = rawName.replace(/[^a-zA-Z0-9._-]/g, "_");

    const response = await axios.get(url, {
      responseType: "stream",
      timeout: 30000,
    });

    const contentType = response.headers["content-type"] || "application/octet-stream";

    if (view === 'true') {
      res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    } else {
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    }
    
    res.setHeader("Content-Type", contentType);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (response.headers["content-length"]) {
      res.setHeader("Content-Length", response.headers["content-length"]);
    }

    response.data.pipe(res);

    response.data.on("error", (err) => {
      console.error("Stream error:", err);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "Download failed" });
      }
    });

  } catch (err) {
    console.error("Download Proxy Error:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Failed to download file" });
    }
  }
});

/* =========================================================
   OPTIONS HANDLER FOR CORS
========================================================= */
router.options("/download", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
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

    const {
      contactName, phone,
      gstNumber, panNumber, aadharNumber,
      accountNumber, ifsc, beneficiary,
      address, city, state, pincode,
    } = req.body;

    if (contactName)  vendor.contactName  = contactName;
    if (phone)        vendor.phone        = phone;
    if (gstNumber)    vendor.gstNumber    = gstNumber.toUpperCase();
    if (panNumber)    vendor.panNumber    = panNumber.toUpperCase();
    if (aadharNumber) vendor.aadharNumber = aadharNumber;
    if (accountNumber) vendor.accountNumber = accountNumber;
    if (ifsc)          vendor.ifsc          = ifsc.toUpperCase();
    if (beneficiary)   vendor.beneficiary   = beneficiary;
    if (address)  vendor.address  = address;
    if (city)     vendor.city     = city;
    if (state)    vendor.state    = state;
    if (pincode)  vendor.pincode  = pincode;

    if (req.files) {
      const uploaded = {};
      await Promise.all(
        Object.keys(req.files).map(async (key) => {
          const file = req.files[key][0];
          uploaded[key] = await uploadToCloudinary(
            file.buffer,
            `vendors/${vendor.brandName || "documents"}`
          );
        })
      );

      if (uploaded.gstFile)       vendor.gstFile       = uploaded.gstFile;
      if (uploaded.panFile)       vendor.panFile       = uploaded.panFile;
      if (uploaded.aadharFile)    vendor.aadharFile    = uploaded.aadharFile;
      if (uploaded.fssaiFile)     vendor.fssaiFile     = uploaded.fssaiFile;
      if (uploaded.msmeFile)      vendor.msmeFile      = uploaded.msmeFile;
      if (uploaded.ownerPhoto)    vendor.ownerPhoto    = uploaded.ownerPhoto;
      if (uploaded.supportingDoc) vendor.supportingDoc = uploaded.supportingDoc;
    }

    await vendor.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      vendor,
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
