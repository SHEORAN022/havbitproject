// module.exports = router;
const express = require("express");
const router = express.Router();
const Vendor = require("../models/VendorModel");
const adminAuth = require("../middleware/adminAuth");

/* =====================================================
   GET ALL VENDORS — GET /api/admin/vendors
===================================================== */
router.get("/", adminAuth, async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status.toUpperCase();

    const vendors = await Vendor.find(filter)
      .select("-password -passwordResetToken -passwordResetExpires")
      .sort({ createdAt: -1 });

    const stats = {
      total:     await Vendor.countDocuments(),
      pending:   await Vendor.countDocuments({ status: "PENDING" }),
      approved:  await Vendor.countDocuments({ status: "APPROVED" }),
      rejected:  await Vendor.countDocuments({ status: "REJECTED" }),
      suspended: await Vendor.countDocuments({ status: "SUSPENDED" }),
    };

    return res.json({ success: true, stats, vendors });
  } catch (error) {
    console.error("Get Vendors Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/* =====================================================
   GET SINGLE VENDOR — GET /api/admin/vendors/:id
===================================================== */
router.get("/:id", adminAuth, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
      .select("-password -passwordResetToken -passwordResetExpires");

    if (!vendor)
      return res.status(404).json({ success: false, message: "Vendor not found" });

    return res.json({ success: true, vendor });
  } catch (error) {
    console.error("Get Vendor Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/* =====================================================
   APPROVE VENDOR — PUT /api/admin/vendors/:id/approve
===================================================== */
router.put("/:id/approve", adminAuth, async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "APPROVED",
          approvedAt: new Date(),
          approvedBy: req.admin?.id,
        },
        $unset: { rejectionReason: 1 },
      },
      { new: true }
    ).select("-password");

    if (!vendor)
      return res.status(404).json({ success: false, message: "Vendor not found" });

    return res.json({
      success: true,
      message: "Vendor approved successfully",
      vendor: {
        id: vendor._id,
        email: vendor.email,
        name: vendor.contactName || vendor.name,
        businessName: vendor.brandName || vendor.businessName,
        status: vendor.status,
        approvedAt: vendor.approvedAt,
      },
    });
  } catch (error) {
    console.error("Approve Vendor Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/* =====================================================
   REJECT VENDOR — PUT /api/admin/vendors/:id/reject
===================================================== */
router.put("/:id/reject", adminAuth, async (req, res) => {
  try {
    const { reason } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "REJECTED",
          rejectedAt: new Date(),
          rejectionReason: reason || "Not specified",
          approvedBy: req.admin?.id,
        },
      },
      { new: true }
    ).select("-password");

    if (!vendor)
      return res.status(404).json({ success: false, message: "Vendor not found" });

    return res.json({
      success: true,
      message: "Vendor rejected",
      vendor: {
        id: vendor._id,
        email: vendor.email,
        name: vendor.contactName || vendor.name,
        status: vendor.status,
        rejectionReason: vendor.rejectionReason,
      },
    });
  } catch (error) {
    console.error("Reject Vendor Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/* =====================================================
   UPDATE STATUS (GENERIC) — PUT /api/admin/vendors/:id/status
===================================================== */
router.put("/:id/status", adminAuth, async (req, res) => {
  try {
    const { status, reason } = req.body;

    if (!["PENDING", "APPROVED", "REJECTED", "SUSPENDED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be PENDING, APPROVED, REJECTED, or SUSPENDED",
      });
    }

    const updateData = { status, approvedBy: req.admin?.id };

    if (status === "APPROVED") {
      updateData.approvedAt = new Date();
      updateData.rejectedAt = null;
      updateData.rejectionReason = null;
    } else if (status === "REJECTED") {
      updateData.rejectedAt = new Date();
      updateData.approvedAt = null;
      updateData.rejectionReason = reason || "Rejected by admin";
    } else if (status === "SUSPENDED") {
      updateData.rejectionReason = reason || "Suspended by admin";
    }

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!vendor)
      return res.status(404).json({ success: false, message: "Vendor not found" });

    return res.json({
      success: true,
      message: `Vendor ${status.toLowerCase()} successfully`,
      vendor: {
        id: vendor._id,
        email: vendor.email,
        name: vendor.contactName || vendor.name,
        businessName: vendor.brandName || vendor.businessName,
        status: vendor.status,
        approvedAt: vendor.approvedAt,
        rejectedAt: vendor.rejectedAt,
        rejectionReason: vendor.rejectionReason,
      },
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/* =====================================================
   DELETE VENDOR — DELETE /api/admin/vendors/:id
===================================================== */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor)
      return res.status(404).json({ success: false, message: "Vendor not found" });

    return res.json({ success: true, message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Delete Vendor Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
