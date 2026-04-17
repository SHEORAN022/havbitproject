// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.Schema(
//   {
//     /* ================= STEP 1 : BASIC ================= */
//     contactName: { 
//       type: String, 
//       trim: true 
//     },
//     name: {                    // ✅ Alias for contactName (for compatibility)
//       type: String, 
//       trim: true 
//     },
    
//     phone: { 
//       type: String, 
//       trim: true,
//       unique: true,
//       sparse: true
//     },

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
//       select: false
//     },

//     vendorType: {
//       type: String,
//       enum: ["Distributor", "Direct Vendor", "Indirect Vendor"],
//       default: "Direct Vendor"
//     },

//     businessName: {             // ✅ Alias for brandName
//       type: String, 
//       trim: true 
//     },
    
//     brandName: { 
//       type: String, 
//       trim: true 
//     },

//     /* ================= STEP 2 : BUSINESS ================= */
//     annualTurnover: { 
//       type: String 
//     },
//     onlineTurnover: { 
//       type: String 
//     },
//     minSellingPrice: { 
//       type: String 
//     },
//     maxSellingPrice: { 
//       type: String 
//     },

//     website: { 
//       type: String, 
//       trim: true 
//     },
//     presence: { 
//       type: [String], 
//       default: [] 
//     },
//     demographic: { 
//       type: String, 
//       default: "Pan India" 
//     },

//     /* ================= BANK DETAILS ================= */
//     accountNumber: { 
//       type: String, 
//       trim: true 
//     },
//     ifsc: { 
//       type: String, 
//       trim: true, 
//       uppercase: true 
//     },
//     beneficiary: { 
//       type: String, 
//       trim: true 
//     },
    
//     // Bank details object (for compatibility)
//     bankDetails: {
//       accountHolder: String,
//       accountNumber: String,
//       ifscCode: String,
//       bankName: String
//     },

//     /* ================= ADDRESS ================= */
//     address: { 
//       type: String, 
//       trim: true 
//     },
//     city: { 
//       type: String, 
//       trim: true 
//     },
//     state: { 
//       type: String, 
//       trim: true 
//     },
//     pincode: { 
//       type: String, 
//       trim: true 
//     },
    
//     // Business address object (for compatibility)
//     businessAddress: {
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//       country: { type: String, default: "India" }
//     },

//     /* ================= STEP 3 : DOCUMENTS ================= */
//     gstNumber: { 
//       type: String, 
//       trim: true, 
//       uppercase: true 
//     },
//     gstFile: { 
//       type: String 
//     },

//     panNumber: { 
//       type: String, 
//       trim: true, 
//       uppercase: true 
//     },
//     panFile: { 
//       type: String 
//     },

//     aadharNumber: { 
//       type: String, 
//       trim: true 
//     },
//     aadharFile: { 
//       type: String 
//     },

//     fssaiFile: { 
//       type: String 
//     },
//     msmeFile: { 
//       type: String 
//     },

//     ownerPhoto: { 
//       type: String 
//     },
//     supportingDoc: { 
//       type: String 
//     },

//     /* ================= DOCUMENTS ARRAY (for compatibility) ================= */
//     documents: [{
//       type: { type: String },
//       url: String,
//       verified: { type: Boolean, default: false }
//     }],

//     /* ================= ADMIN CONTROL ================= */
//     status: {
//       type: String,
//       enum: ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"],
//       default: "PENDING",
//       index: true
//     },

//     approvedAt: { 
//       type: Date 
//     },
//     rejectedAt: { 
//       type: Date 
//     },
//     rejectionReason: {
//       type: String
//     },

//     approvedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin"
//     },

//     /* ================= ADDITIONAL FIELDS ================= */
//     role: {
//       type: String,
//       default: "vendor"
//     },
    
//     isEmailVerified: {
//       type: Boolean,
//       default: false
//     },
    
//     isPhoneVerified: {
//       type: Boolean,
//       default: false
//     },
    
//     profileImage: String,
    
//     lastLoginAt: Date,
    
//     passwordResetToken: String,
//     passwordResetExpires: Date,

//     /* ================= STATS ================= */
//     totalProducts: {
//       type: Number,
//       default: 0
//     },
//     totalOrders: {
//       type: Number,
//       default: 0
//     },
//     totalRevenue: {
//       type: Number,
//       default: 0
//     },
//     rating: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5
//     },

//     /* ================= SETTINGS ================= */
//     settings: {
//       notifications: {
//         email: { type: Boolean, default: true },
//         sms: { type: Boolean, default: true }
//       },
//       autoAcceptOrders: { type: Boolean, default: false },
//       holidayMode: { type: Boolean, default: false }
//     }
//   },
//   { 
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// /* ================= VIRTUAL FIELDS ================= */
// vendorSchema.virtual('fullBusinessName').get(function() {
//   return this.businessName || this.brandName || this.contactName || this.name;
// });

// /* ================= INDEXES ================= */
// vendorSchema.index({ status: 1, createdAt: -1 });
// vendorSchema.index({ email: 1 });
// vendorSchema.index({ phone: 1 });

// /* ================= PRE-SAVE HOOK ================= */
// vendorSchema.pre('save', function(next) {
//   // Sync alias fields
//   if (this.contactName && !this.name) {
//     this.name = this.contactName;
//   }
//   if (this.name && !this.contactName) {
//     this.contactName = this.name;
//   }
  
//   if (this.brandName && !this.businessName) {
//     this.businessName = this.brandName;
//   }
//   if (this.businessName && !this.brandName) {
//     this.brandName = this.businessName;
//   }
  
//   next();
// });

// /* ================= SAFE EXPORT ================= */
// module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    /* ================= BASIC ================= */
    contactName: { type: String, trim: true },
    name: { type: String, trim: true },

    phone: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    vendorType: {
      type: String,
      enum: ["Distributor", "Direct Vendor", "Indirect Vendor"],
      default: "Direct Vendor",
    },

    businessName: { type: String, trim: true },
    brandName: { type: String, trim: true },

    /* ================= BUSINESS ================= */
    annualTurnover: String,
    onlineTurnover: String,
    minSellingPrice: String,
    maxSellingPrice: String,

    website: { type: String, trim: true },
    presence: { type: [String], default: [] },
    demographic: { type: String, default: "Pan India" },

    /* ================= BANK ================= */
    accountNumber: { type: String, trim: true },
    ifsc: { type: String, trim: true, uppercase: true },
    beneficiary: { type: String, trim: true },

    bankDetails: {
      accountHolder: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String,
    },

    /* ================= 🔥 RAZORPAY ROUTE ================= */
    razorpayAccountId: {
      type: String, // acc_xxxxx
      default: null,
      index: true,
    },

    isRouteAccountCreated: {
      type: Boolean,
      default: false,
    },

    transferIds: [
      {
        type: String, // trf_xxxxx
      },
    ],

    /* ================= ADDRESS ================= */
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },

  businessAddress: {
  street: {
    type: String,
    required: true,
    trim: true,
  },

  // 🔥 ADD THIS
  street2: {
    type: String,
    default: "",
    trim: true,
  },

  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    default: "IN",
  },
},


    /* ================= DOCUMENTS ================= */
    gstNumber: { type: String, trim: true, uppercase: true },
    gstFile: String,

    panNumber: { type: String, trim: true, uppercase: true },
    panFile: String,

    aadharNumber: { type: String, trim: true },
    aadharFile: String,

    documents: [
      {
        type: { type: String },
        url: String,
        verified: { type: Boolean, default: false },
      },
    ],

    /* ================= ADMIN ================= */
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"],
      default: "PENDING",
      index: true,
    },

    approvedAt: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    /* ================= AUTH ================= */
    role: { type: String, default: "vendor" },

    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },

    /* ================= STATS ================= */
    totalProducts: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    /* ================= SETTINGS ================= */
    settings: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
      },
      autoAcceptOrders: { type: Boolean, default: false },
      holidayMode: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* ================= VIRTUAL ================= */
vendorSchema.virtual("fullBusinessName").get(function () {
  return (
    this.businessName ||
    this.brandName ||
    this.contactName ||
    this.name
  );
});

/* ================= INDEX ================= */
vendorSchema.index({ status: 1, createdAt: -1 });
vendorSchema.index({ email: 1 });
vendorSchema.index({ phone: 1 });

/* ================= PRE SAVE ================= */
vendorSchema.pre("save", function (next) {
  if (this.contactName && !this.name) this.name = this.contactName;
  if (this.name && !this.contactName) this.contactName = this.name;

  if (this.brandName && !this.businessName)
    this.businessName = this.brandName;
  if (this.businessName && !this.brandName)
    this.brandName = this.businessName;

  next();
});

/* ================= EXPORT ================= */
module.exports =
  mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
