







// const mongoose = require("mongoose");

// /* ================= ORDER ITEM ================= */
// const OrderItemSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },

//     productName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     qty: {
//       type: Number,
//       required: true,
//       min: 1,
//     },

//     price: {
//       type: Number,
//       required: true,
//     },

//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },

//     image: String,
//   },
//   { _id: false }
// );

// /* ================= MAIN ORDER ================= */
// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     /* ---------- CUSTOMER ---------- */
//     customer: {
//       type: mongoose.Schema.Types.ObjectId, // userId
//       required: true,
//       index: true,
//     },

//     /* ---------- ITEMS ---------- */
//     orderItems: {
//       type: [OrderItemSchema],
//       required: true,
//     },

//     /* ---------- AMOUNT ---------- */
//     amount: {
//       type: Number, // cart total
//       required: true,
//     },

//     shippingCharge: {
//       type: Number,
//       default: 0,
//     },

//     discount: {
//       type: Number,
//       default: 0,
//     },

//     totalPayable: {
//       type: Number, // final amount user pays
//       required: true,
//     },

//     /* ---------- ORDER STATUS ---------- */
//     orderStatus: {
//       type: String,
//       enum: [
//         "Pending",
//         "Confirmed",
//         "Processing",
//         "Shipped",
//         "Delivered",
//         "Cancelled",
//         "Returned",
//       ],
//       default: "Pending",
//     },

//     /* ---------- PAYMENT ---------- */
//     paymentMethod: {
//       type: String,
//       enum: ["cod", "cashfree"],
//       default: "cod",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Success", "Failed", "Refunded"],
//       default: "Pending",
//     },

//     /* ---------- CASHFREE FIELDS ---------- */
//     cashfreeOrderId: {
//       type: String, // order_id from cashfree
//     },

//     cashfreePaymentId: {
//       type: String, // cf_payment_id
//     },

//     cashfreeReferenceId: {
//       type: String, // reference_id
//     },

//     cashfreeOrderToken: {
//       type: String, // payment session id
//     },

//     cashfreeRefundId: {
//       type: String,
//     },

//     /* ---------- SHIPPING ADDRESS ---------- */
//     shippingAddress: {
//       name: {
//         type: String,
//         required: true,
//       },

//       phone: {
//         type: String,
//         required: true,
//       },

//       email: {
//         type: String,
//       },

//       address: {
//         type: String,
//         required: true,
//       },

//       city: {
//         type: String,
//         required: true,
//       },

//       state: {
//         type: String,
//         required: true,
//       },

//       pincode: {
//         type: String,
//         required: true,
//       },
//     },

//     /* ---------- TRACKING ---------- */
//     trackingId: String,
//     courierPartner: String,

//     deliveredAt: Date,
//     cancelledAt: Date,
//   },
//   {
//     timestamps: true,
//   }
// );

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
      enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
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

    deliveredAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);




