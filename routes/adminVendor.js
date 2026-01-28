
const express = require("express");
const Vendor = require("../models/VendorModel");

const router = express.Router();

/* =========================
   GET ALL VENDORS
   GET /api/admin/vendors
========================= */
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json({ success: true, vendors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =========================
   GET ONLY PENDING VENDORS
   GET /api/admin/vendors/pending
========================= */
router.get("/pending", async (req, res) => {
  try {
    const vendors = await Vendor.find({ status: "PENDING" });
    res.json({ success: true, vendors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =========================
   APPROVE VENDOR
   PUT /api/admin/vendors/:id/approve
========================= */
router.put("/:id/approve", async (req, res) => {
  try {
    await Vendor.findByIdAndUpdate(req.params.id, {
      status: "APPROVED",
      approvedAt: new Date(),
    });

    res.json({
      success: true,
      message: "Vendor approved successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =========================
   REJECT VENDOR
   PUT /api/admin/vendors/:id/reject
========================= */
router.put("/:id/reject", async (req, res) => {
  try {
    await Vendor.findByIdAndUpdate(req.params.id, {
      status: "REJECTED",
      rejectedAt: new Date(),
    });

    res.json({
      success: true,
      message: "Vendor rejected successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
