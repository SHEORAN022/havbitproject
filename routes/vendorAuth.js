const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const axios = require("axios");
const cloudinary = require("../config/cloudinary");
const Vendor = require("../models/VendorModel");
const vendorAuth = require("../middleware/vendorAuth");

const router = express.Router();

/* ================= MULTER ================= */
const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileFields = upload.fields([
  { name: "gstFile", maxCount: 1 },
  { name: "panFile", maxCount: 1 },
  { name: "aadharFile", maxCount: 1 },
  { name: "fssaiFile", maxCount: 1 },
  { name: "msmeFile", maxCount: 1 },
  { name: "ownerPhoto", maxCount: 1 },
  { name: "supportingDoc", maxCount: 1 },
]);

/* ================= CLOUDINARY UPLOAD ================= */
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

/* ================= SIGNUP ================= */
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
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

/* ================= LOGIN ================= */
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

/* ================= PROFILE ================= */
router.get("/profile", vendorAuth, async (req, res) => {
  try {
    const vendor = req.vendor;
    res.json({ success: true, vendor });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
});

/* ================= 📄 DOWNLOAD PROXY (PDF/Image) ================= */
router.get("/download", vendorAuth, async (req, res) => {
  try {
    const { url, name, view } = req.query;

    if (!url || !url.includes("res.cloudinary.com")) {
      return res.status(400).json({ success: false, message: "Invalid file URL" });
    }

    const rawName = name || url.split("/").pop().split("?")[0] || "document";
    const filename = rawName.replace(/[^a-zA-Z0-9._-]/g, "_");

    // 🔐 Agar signed URL chahiye to Cloudinary se sign kar lo
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

/* ================= 📄 VIEW PDF (Alternate endpoint) ================= */
router.get("/view-pdf", vendorAuth, async (req, res) => {
  try {
    const { url, name } = req.query;

    if (!url || !url.includes("res.cloudinary.com")) {
      return res.status(400).json({ success: false, message: "Invalid file URL" });
    }

    const rawName = name || url.split("/").pop().split("?")[0] || "document.pdf";
    const filename = rawName.replace(/[^a-zA-Z0-9._-]/g, "_");

    const response = await axios.get(url, {
      responseType: "stream",
      timeout: 30000,
    });

    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.setHeader("Content-Type", response.headers["content-type"] || "application/pdf");
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (response.headers["content-length"]) {
      res.setHeader("Content-Length", response.headers["content-length"]);
    }

    response.data.pipe(res);

    response.data.on("error", (err) => {
      console.error("Stream error:", err);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "View failed" });
      }
    });

  } catch (err) {
    console.error("View PDF Error:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Failed to view PDF" }); 
    }
  }
});

/* ================= OPTIONS HANDLER ================= */
router.options("/download", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

router.options("/view-pdf", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

/* ================= UPDATE PROFILE ================= */
router.put("/update-profile", vendorAuth, async (req, res) => {
  try {
    const vendor = req.vendor;
    const updates = req.body;

    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        vendor[key] = updates[key];
      }
    });

    await vendor.save();
    res.json({ success: true, message: "Profile updated", vendor });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

module.exports = router;
