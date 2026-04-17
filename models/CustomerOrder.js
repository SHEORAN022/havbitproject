// const mongoose = require("mongoose");

// const OrderItemSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true
//     },
//     productName: {
//       type: String,
//       required: true
//     },
//     qty: {
//       type: Number,
//       required: true,
//       min: 1
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: false,   // ✅ FIX 1: public orders mein vendorId nahi hota
//       default: null
//     },
//     image: String
//   },
//   { _id: false }
// );

// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true
//     },
//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: false,   // ✅ optional
//       default: null
//     },
//     isPublicOrder: {
//       type: Boolean,
//       default: false
//     },
//     orderItems: {
//       type: [OrderItemSchema],
//       required: true,
//       validate: {
//         validator: function(items) {
//           return items && items.length > 0;
//         },
//         message: "At least one order item required"
//       }
//     },
//     warehouse: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Warehouse",
//       required: false,   // ✅ FIX 2: public orders mein warehouse _id nahi hoti
//       default: null
//     },
//     pick_address_id: {
//       type: String,      // ✅ FIX 3: Number se String karo
//       required: true
//     },
//     shipment: {
//       weight: Number,
//       length: Number,
//       width: Number,
//       height: Number
//     },
//     parcelx: {
//       awb: String,
//       courier: String,
//       status: String,
//       tracking_url: String,
//       response: mongoose.Schema.Types.Mixed,
//       last_updated: Date
//     },
//     parcelxOrderCreated: {
//       type: Boolean,
//       default: false
//     },
//     amount: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     subtotal: {
//       type: Number,
//       default: 0
//     },
//     deliveryFee: {
//       type: Number,
//       default: 0
//     },
//     platformFee: {
//       type: Number,
//       default: 0
//     },
//     gst: {
//       type: Number,
//       default: 0
//     },
//     couponCode: {
//       type: String,
//       default: null
//     },
//     couponDiscount: {
//       type: Number,
//       default: 0
//     },
//     shippingCharge: {
//       type: Number,
//       default: 0,
//       min: 0
//     },
//     discount: {
//       type: Number,
//       default: 0,
//       min: 0
//     },
//     totalPayable: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     orderStatus: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//       default: "Pending"
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay", "online"],
//       default: "cod"
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Initiated", "Success", "Failed", "Refunded"],  // ✅ FIX 4: Initiated add kiya
//       default: "Pending"
//     },
//     shippingAddress: {
//       name: { type: String, required: true },
//       phone: { type: String, required: true },
//       email: String,
//       address: { type: String, required: true },
//       city: String,
//       state: String,
//       pincode: { type: String, required: true }
//     },
//     deliveredAt: Date,
//     cancelledAt: Date,
//     cancelledReason: String
//   },
//   {
//     timestamps: true
//   }
// );

// // Indexes
// CustomerOrderSchema.index({ customer: 1, createdAt: -1 });
// CustomerOrderSchema.index({ "orderItems.vendorId": 1 });
// CustomerOrderSchema.index({ "parcelx.awb": 1 });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);


const mongoose = require("mongoose");

/* ================= ORDER ITEMS ================= */
const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },
    image: String,
  },
  { _id: false }
);

/* ================= MAIN ORDER ================= */
const CustomerOrderSchema = new mongoose.Schema(
  {
    /* ================= USER ================= */
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },

    isPublicOrder: {
      type: Boolean,
      default: false,
    },

    /* ================= ITEMS ================= */
    orderItems: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (items) => items && items.length > 0,
        message: "At least one order item required",
      },
    },

    /* ================= WAREHOUSE ================= */
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      default: null,
    },

    pick_address_id: {
      type: String,
      required: true,
    },

    /* ================= SHIPMENT ================= */
    shipment: {
      weight: Number,
      length: Number,
      width: Number,
      height: Number,
    },

    /* ================= PARCELX ================= */
    parcelx: {
      awb: String,
      courier: String,
      status: String,
      tracking_url: String,
      response: mongoose.Schema.Types.Mixed,
      last_updated: Date,
    },

    parcelxOrderCreated: {
      type: Boolean,
      default: false,
    },

    /* ================= AMOUNT ================= */
    amount: {
      type: Number,
      required: true,
    },

    subtotal: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    platformFee: { type: Number, default: 0 },
    gst: { type: Number, default: 0 },

    couponCode: { type: String, default: null },
    couponDiscount: { type: Number, default: 0 },

    shippingCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },

    totalPayable: {
      type: Number,
      required: true,
    },

    /* ================= 🔥 RAZORPAY ROUTE ================= */

    razorpayOrderId: String,
    razorpayPaymentId: String,

    transferId: {
      type: String, // trf_xxxxxx
      index: true,
    },

    transferStatus: {
      type: String,
      enum: ["Pending", "Processed", "Failed"],
      default: "Pending",
    },

    transferCreated: {
      type: Boolean,
      default: false,
    },

    /* ================= 🔥 PAYOUT LOGIC ================= */

    vendorAmount: {
      type: Number,
      default: 0,
    },

    platformAmount: {
      type: Number,
      default: 0,
    },

    payoutStatus: {
      type: String,
      enum: ["Pending", "OnHold", "Released", "Paid"],
      default: "Pending",
    },

    payoutEligibleAt: Date,

    payoutReleasedAt: Date,

    /* ================= STATUS ================= */
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay", "online"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Initiated", "Success", "Failed", "Refunded"],
      default: "Pending",
    },

    /* ================= ADDRESS ================= */
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: String,
      address: { type: String, required: true },
      city: String,
      state: String,
      pincode: { type: String, required: true },
    },

    /* ================= DATES ================= */
    deliveredAt: Date,
    cancelledAt: Date,
    cancelledReason: String,
  },
  {
    timestamps: true,
  }
);

/* ================= INDEXES ================= */
CustomerOrderSchema.index({ customer: 1, createdAt: -1 });
CustomerOrderSchema.index({ "orderItems.vendorId": 1 });
CustomerOrderSchema.index({ transferId: 1 });

/* ================= EXPORT ================= */
module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);
