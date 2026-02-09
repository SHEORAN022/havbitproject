// // models/CustomerOrder.js
// const mongoose = require("mongoose");

// /* ================= ORDER ITEM ================= */
// const OrderItemSchema = new mongoose.Schema(
//   {
//     productId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     productName: String,
//     qty: { type: Number, required: true },
//     price: { type: Number, required: true },
//     vendorId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     image: String,
//   },
//   { _id: false }
// );

// /* ================= SHIPPING ADDRESS ================= */
// const ShippingAddressSchema = new mongoose.Schema(
//   {
//     name: String,
//     phone: String,
//     email: String,
//     address: String,
//     city: String,
//     state: String,
//     pincode: String,
//   },
//   { _id: false }
// );

// /* ================= MAIN ORDER ================= */
// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       index: true,
//       ref: 'User'
//     },

//     orderItems: {
//       type: [OrderItemSchema],
//       required: true,
//     },

//     amount: { type: Number, required: true },
//     shippingCharge: { type: Number, default: 0 },
//     discount: { type: Number, default: 0 },
//     totalPayable: { type: Number, required: true },

//     orderStatus: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//       default: "Pending",
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay"],
//       default: "cod",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Success", "Failed", "Refunded", "Cancelled"],
//       default: "Pending",
//     },

//     razorpayOrderId: String,
//     razorpayPaymentId: String,
//     razorpaySignature: String,

//     shippingAddress: ShippingAddressSchema,

//     // Shiprocket Integration Fields
//     shiprocketOrderId: String,
//     shiprocketShipmentId: String,
//     shiprocketStatus: String,
//     awbCode: String,
//     courierName: String,
//     courierCompanyId: String,
//     trackingUrl: String,
    
//     // Additional shipping details
//     shippingProvider: {
//       type: String,
//       default: 'shiprocket'
//     },
//     shippingLabelUrl: String,
//     manifestUrl: String,
    
//     // Date fields for tracking
//     processingAt: Date,
//     shippedAt: Date,
//     deliveredAt: Date,
//     cancelledAt: Date,
//     estimatedDeliveryDate: Date,
//     pickupScheduledDate: Date,

//     // Flags
//     readyForShipping: {
//       type: Boolean,
//       default: false
//     },
//     isShipped: {
//       type: Boolean,
//       default: false
//     }
//   },
//   { timestamps: true }
// );

// // Indexes for better performance
// CustomerOrderSchema.index({ customer: 1, createdAt: -1 });
// CustomerOrderSchema.index({ orderStatus: 1 });
// CustomerOrderSchema.index({ shiprocketOrderId: 1 });
// CustomerOrderSchema.index({ awbCode: 1 });
// CustomerOrderSchema.index({ 'orderItems.vendorId': 1 });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);















































































// const mongoose = require("mongoose");

// /* ================= ORDER ITEM ================= */
// const OrderItemSchema = new mongoose.Schema(
//   {
//     productId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     productName: String,
//     qty: { type: Number, required: true },
//     price: { type: Number, required: true },
//     vendorId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     image: String,
//   },
//   { _id: false }
// );

// /* ================= MAIN ORDER ================= */
// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       index: true,
//     },

//     orderItems: {
//       type: [OrderItemSchema],
//       required: true,
//     },

//     amount: { type: Number, required: true },
//     shippingCharge: { type: Number, default: 0 },
//     discount: { type: Number, default: 0 },
//     totalPayable: { type: Number, required: true },

//     orderStatus: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//       default: "Pending",
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay"],
//       default: "cod",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Success", "Failed", "Refunded"],
//       default: "Pending",
//     },

//     razorpayOrderId: String,
//     razorpayPaymentId: String,
//     razorpaySignature: String,

//     shippingAddress: {
//       name: String,
//       phone: String,
//       email: String,
//       address: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },
//  awbNumber: {
//   type: String,
//   index: true,   // tracking fast ho jayega
// },

// courierName: {
//   type: String,
// },

// parcelxOrderId: {
//   type: String,
// },

//     deliveredAt: Date,
//     cancelledAt: Date,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);













































const mongoose = require("mongoose");

/* ================= ORDER ITEM ================= */
const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productName: String,
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    image: String,
  },
  { _id: false }
);

/* ================= MAIN ORDER ================= */
const CustomerOrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    orderItems: {
      type: [OrderItemSchema],
      required: true,
    },

    amount: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalPayable: { type: Number, required: true },

    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled", "Returned", "Lost"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Refunded"],
      default: "Pending",
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    shippingAddress: {
      name: String,
      phone: String,
      email: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },
    
    /* ============ PARCELX FIELDS ============ */
    awbNumber: {
      type: String,
      index: true,   // tracking fast ho jayega
    },
    
    courierName: {
      type: String,
    },
    
    parcelxOrderId: {
      type: String,
    },
    
    parcelxStatus: {
      type: String,
      default: "Pending"
    },
    
    shipmentData: {
      type: mongoose.Schema.Types.Mixed, // Store full ParcelX response
    },
    
    trackingHistory: [{
      status: String,
      location: String,
      datetime: Date,
      remarks: String
    }],
    
    parcelxData: {
      type: mongoose.Schema.Types.Mixed, // Store parcelxData from frontend
    },
    
    pickupLocationId: {
      type: String,
      default: "90533"
    },
    /* ============ END PARCELX FIELDS ============ */

    deliveredAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);
