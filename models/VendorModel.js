// // // const mongoose = require("mongoose");

// // // const vendorSchema = new mongoose.Schema(
// // //   {
// // //     name: {
// // //       type: String,
// // //       required: true,
// // //     },

// // //     email: {
// // //       type: String,
// // //       required: true,
// // //       unique: true,
// // //     },

// // //     password: {
// // //       type: String,
// // //       required: true,
// // //     },

// // //     status: {
// // //       type: String,
// // //       enum: ["PENDING", "APPROVED", "REJECTED"],
// // //       default: "PENDING",
// // //     },
// // //   },
// // //   { timestamps: true }
// // // );

// // // // ✅ SAFE EXPORT (nodemon friendly)
// // // module.exports =
// // //   mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

// // const mongoose = require("mongoose");

// // const vendorSchema = new mongoose.Schema(
// //   {
// //     // --- Step 1 Fields ---
// //     contactName: {
// //       type: String,
// //       required: [true, "Contact name is required"],
// //     },
// //     phone: {
// //       type: String,
// //       required: [true, "Phone number is required"],
// //     },
// //     email: {
// //       type: String,
// //       required: [true, "Email is required"],
// //       unique: true,
// //       lowercase: true,
// //       trim: true,
// //     },
// //     password: {
// //       type: String,
// //       required: [true, "Password is required"],
// //     },
// //     vendorType: {
// //       type: String,
// //       enum: ["Distributor", "Direct Vendor", "Indirect Vendor"],
// //       default: "Direct Vendor",
// //     },
// //     brandName: {
// //       type: String,
// //       required: [true, "Brand name is required"],
// //     },

// //     // --- Step 2 Fields ---
// //     annualTurnover: {
// //       type: String,
// //     },
// //     onlineTurnover: {
// //       type: String,
// //     },
// //     website: {
// //       type: String,
// //     },
// //     presence: {
// //       type: [String], // Array of strings (e.g. ["Amazon", "Flipkart"])
// //       default: [],
// //     },
// //     demographic: {
// //       type: String,
// //       default: "Pan India",
// //     },

// //     // --- Status Control ---
// //     status: {
// //       type: String,
// //       enum: ["PENDING", "APPROVED", "REJECTED"],
// //       default: "PENDING",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // // Password hashing ya extra methods yahan add kar sakte hain

// // // ✅ SAFE EXPORT (serverless aur nodemon friendly)
// // module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);







// // const mongoose = require("mongoose");

// // const vendorSchema = new mongoose.Schema(
// //   {
// //     // --- Step 1 Fields ---
// //     contactName: { type: String, required: [true, "Contact name is required"] },
// //     phone: { type: String, required: [true, "Phone number is required"] },
// //     email: { 
// //       type: String, 
// //       required: [true, "Email is required"], 
// //       unique: true, 
// //       lowercase: true, 
// //       trim: true 
// //     },
// //     password: { type: String, required: [true, "Password is required"] },
// //     vendorType: { 
// //       type: String, 
// //       enum: ["Distributor", "Direct Vendor", "Indirect Vendor"], 
// //       default: "Direct Vendor" 
// //     },
// //     brandName: { type: String, required: [true, "Brand name is required"] },

// //     // --- Step 2 Fields ---
// //     annualTurnover: { type: String },
// //     onlineTurnover: { type: String },
// //     minSellingPrice: { type: String },
// //     maxSellingPrice: { type: String },
// //     website: { type: String },
// //     presence: { type: [String], default: [] },
// //     demographic: { type: String, default: "Pan India" },

// //     // --- Step 3 Fields (Documents - Storing Cloudinary URLs & Numbers) ---
// //     gstNumber: { type: String },
// //     gstFile: { type: String }, // Cloudinary URL

// //     panNumber: { type: String },
// //     panFile: { type: String }, // Cloudinary URL

// //     aadharNumber: { type: String },
// //     aadharFile: { type: String }, // Cloudinary URL

// //     fssaiFile: { type: String }, // Cloudinary URL
// //     msmeFile: { type: String },  // Cloudinary URL
// //     ownerPhoto: { type: String }, // Cloudinary URL
// //     supportingDoc: { type: String }, // Optional Cloudinary URL

// //     // --- Status Control ---
// //     status: { 
// //       type: String, 
// //       enum: ["PENDING", "APPROVED", "REJECTED"], 
// //       default: "PENDING" 
// //     },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);







// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.Schema(
//   {
//     // --- Step 1 Fields (Required removed for smooth product saving) ---
//     contactName: { type: String }, 
//     phone: { type: String },
//     email: { 
//       type: String, 
//       required: [true, "Email is required"], 
//       unique: true, 
//       lowercase: true, 
//       trim: true 
//     },
//     password: { type: String, required: [true, "Password is required"] },
//     vendorType: { 
//       type: String, 
//       enum: ["Distributor", "Direct Vendor", "Indirect Vendor"], 
//       default: "Direct Vendor" 
//     },
//     brandName: { type: String }, 

//     // --- Step 2 Fields ---
//     annualTurnover: { type: String },
//     onlineTurnover: { type: String },
//     minSellingPrice: { type: String },
//     maxSellingPrice: { type: String },
//     website: { type: String },
//     presence: { type: [String], default: [] },
//     demographic: { type: String, default: "Pan India" },

//     // --- Step 3 Fields (Documents) ---
//     gstNumber: { type: String },
//     gstFile: { type: String }, 
//     panNumber: { type: String },
//     panFile: { type: String }, 
//     aadharNumber: { type: String },
//     aadharFile: { type: String }, 
//     fssaiFile: { type: String }, 
//     msmeFile: { type: String },  
//     ownerPhoto: { type: String }, 
//     supportingDoc: { type: String }, 

//     // --- Status Control ---
//     status: { 
//       type: String, 
//       enum: ["PENDING", "APPROVED", "REJECTED"], 
//       default: "PENDING" 
//     },
//   },
//   { timestamps: true }
// );

// // Ye check important hai Vercel/Next.js ke liye taaki model dubara compile na ho
// module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);


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
