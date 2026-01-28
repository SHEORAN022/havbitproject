
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    /* ================= STEP 1 : BASIC ================= */
    contactName: { type: String, trim: true },
    phone: { type: String, trim: true },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false        // 🔐 security
    },

    vendorType: {
      type: String,
      enum: ["Distributor", "Direct Vendor", "Indirect Vendor"],
      default: "Direct Vendor"
    },

    brandName: { type: String, trim: true },

    /* ================= STEP 2 : BUSINESS ================= */
    annualTurnover: { type: String },
    onlineTurnover: { type: String },
    minSellingPrice: { type: String },
    maxSellingPrice: { type: String },

    website: { type: String, trim: true },
    presence: { type: [String], default: [] },
    demographic: { type: String, default: "Pan India" },

    /* ================= 🆕 BANK DETAILS (MISSING) ================= */
    accountNumber: { type: String, trim: true },
    ifsc: { type: String, trim: true, uppercase: true },
    beneficiary: { type: String, trim: true },

    /* ================= 🆕 ADDRESS (MISSING) ================= */
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },

    /* ================= STEP 3 : DOCUMENTS ================= */
    gstNumber: { type: String, trim: true, uppercase: true },
    gstFile: { type: String },

    panNumber: { type: String, trim: true, uppercase: true },
    panFile: { type: String },

    aadharNumber: { type: String, trim: true },
    aadharFile: { type: String },

    fssaiFile: { type: String },
    msmeFile: { type: String },

    ownerPhoto: { type: String },
    supportingDoc: { type: String },

    /* ================= 🆕 ADMIN CONTROL (MISSING) ================= */
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true
    },

    approvedAt: { type: Date },
    rejectedAt: { type: Date },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    }
  },
  { timestamps: true }
);

/* ================= INDEXES ================= */
vendorSchema.index({ status: 1, createdAt: -1 });

/* ================= SAFE EXPORT ================= */
module.exports =
  mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

