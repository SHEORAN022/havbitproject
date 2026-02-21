
// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.Schema(
//   {
//     /* ================= STEP 1 : BASIC ================= */
//     contactName: { type: String, trim: true },
//     phone: { type: String, trim: true },

//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       index: true
//     },

//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       select: false        // 🔐 security
//     },

//     vendorType: {
//       type: String,
//       enum: ["Distributor", "Direct Vendor", "Indirect Vendor"],
//       default: "Direct Vendor"
//     },

//     brandName: { type: String, trim: true },

//     /* ================= STEP 2 : BUSINESS ================= */
//     annualTurnover: { type: String },
//     onlineTurnover: { type: String },
//     minSellingPrice: { type: String },
//     maxSellingPrice: { type: String },

//     website: { type: String, trim: true },
//     presence: { type: [String], default: [] },
//     demographic: { type: String, default: "Pan India" },

//     /* ================= 🆕 BANK DETAILS (MISSING) ================= */
//     accountNumber: { type: String, trim: true },
//     ifsc: { type: String, trim: true, uppercase: true },
//     beneficiary: { type: String, trim: true },

//     /* ================= 🆕 ADDRESS (MISSING) ================= */
//     address: { type: String, trim: true },
//     city: { type: String, trim: true },
//     state: { type: String, trim: true },
//     pincode: { type: String, trim: true },

//     /* ================= STEP 3 : DOCUMENTS ================= */
//     gstNumber: { type: String, trim: true, uppercase: true },
//     gstFile: { type: String },

//     panNumber: { type: String, trim: true, uppercase: true },
//     panFile: { type: String },

//     aadharNumber: { type: String, trim: true },
//     aadharFile: { type: String },

//     fssaiFile: { type: String },
//     msmeFile: { type: String },

//     ownerPhoto: { type: String },
//     supportingDoc: { type: String },

//     /* ================= 🆕 ADMIN CONTROL (MISSING) ================= */
//     status: {
//       type: String,
//       enum: ["PENDING", "APPROVED", "REJECTED"],
//       default: "PENDING",
//       index: true
//     },

//     approvedAt: { type: Date },
//     rejectedAt: { type: Date },

//     approvedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin"
//     }
//   },
//   { timestamps: true }
// );

// /* ================= INDEXES ================= */
// vendorSchema.index({ status: 1, createdAt: -1 });

// /* ================= SAFE EXPORT ================= */
// module.exports =
//   mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

const express = require("express");
const router = express.Router();
const Vendor = require("../models/VendorModel");
const adminAuth = require("../middleware/adminAuth"); // Add admin auth

/* =====================================================
   GET ALL VENDORS (ADMIN PANEL)
===================================================== */
router.get("/vendors", adminAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) {
      filter.status = status.toUpperCase();
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const vendors = await Vendor.find(filter)
      .select("-password -passwordResetToken -passwordResetExpires")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Vendor.countDocuments(filter);

    // Stats for dashboard
    const stats = {
      total: await Vendor.countDocuments(),
      pending: await Vendor.countDocuments({ status: "PENDING" }),
      approved: await Vendor.countDocuments({ status: "APPROVED" }),
      rejected: await Vendor.countDocuments({ status: "REJECTED" }),
      suspended: await Vendor.countDocuments({ status: "SUSPENDED" })
    };

    return res.json({
      success: true,
      stats,
      vendors,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error("Get Vendors Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* =====================================================
   GET SINGLE VENDOR
===================================================== */
router.get("/vendor/:vendorId", adminAuth, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId)
      .select("-password -passwordResetToken -passwordResetExpires");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    return res.json({
      success: true,
      vendor
    });
  } catch (error) {
    console.error("Get Vendor Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* =====================================================
   APPROVE VENDOR
===================================================== */
router.put("/vendor/approve/:vendorId", adminAuth, async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.vendorId,
      {
        $set: {
          status: "APPROVED",
          approvedAt: new Date(),
          approvedBy: req.admin?.id || req.admin?._id
        },
        $unset: { rejectionReason: 1 }
      },
      { new: true }
    ).select("-password");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    return res.json({
      success: true,
      message: "Vendor approved successfully",
      vendor: {
        id: vendor._id,
        email: vendor.email,
        name: vendor.name || vendor.contactName,
        businessName: vendor.businessName || vendor.brandName,
        status: vendor.status,
        approvedAt: vendor.approvedAt
      }
    });
  } catch (error) {
    console.error("Approve Vendor Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* =====================================================
   REJECT VENDOR
===================================================== */
router.put("/vendor/reject/:vendorId", adminAuth, async (req, res) => {
  try {
    const { reason } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.vendorId,
      {
        $set: {
          status: "REJECTED",
          rejectedAt: new Date(),
          rejectionReason: reason || "Not specified",
          approvedBy: req.admin?.id || req.admin?._id
        }
      },
      { new: true }
    ).select("-password");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    return res.json({
      success: true,
      message: "Vendor rejected",
      vendor: {
        id: vendor._id,
        email: vendor.email,
        name: vendor.name || vendor.contactName,
        status: vendor.status,
        rejectionReason: vendor.rejectionReason
      }
    });
  } catch (error) {
    console.error("Reject Vendor Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* =====================================================
   UPDATE VENDOR STATUS (GENERIC)
===================================================== */
router.put("/vendor/status/:vendorId", adminAuth, async (req, res) => {
  try {
    const { status, reason } = req.body;

    if (!["PENDING", "APPROVED", "REJECTED", "SUSPENDED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be PENDING, APPROVED, REJECTED, or SUSPENDED"
      });
    }

    const updateData = { 
      status,
      approvedBy: req.admin?.id || req.admin?._id
    };

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
      req.params.vendorId,
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    return res.json({
      success: true,
      message: `Vendor ${status.toLowerCase()} successfully`,
      vendor: {
        id: vendor._id,
        email: vendor.email,
        name: vendor.name || vendor.contactName,
        businessName: vendor.businessName || vendor.brandName,
        status: vendor.status,
        approvedAt: vendor.approvedAt,
        rejectedAt: vendor.rejectedAt,
        rejectionReason: vendor.rejectionReason
      }
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* =====================================================
   DELETE VENDOR
===================================================== */
router.delete("/vendor/:vendorId", adminAuth, async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.vendorId);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    return res.json({
      success: true,
      message: "Vendor deleted successfully"
    });
  } catch (error) {
    console.error("Delete Vendor Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
