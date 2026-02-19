// // const mongoose = require("mongoose");

// // /* ================= ORDER ITEM ================= */
// // const OrderItemSchema = new mongoose.Schema(
// //   {
// //     productId: { type: mongoose.Schema.Types.ObjectId, required: true },
// //     productName: String,
// //     qty: { type: Number, required: true },
// //     price: { type: Number, required: true },
// //     vendorId: { type: mongoose.Schema.Types.ObjectId, required: true },
// //     image: String,
// //   },
// //   { _id: false }
// // );

// // /* ================= MAIN ORDER ================= */
// // const CustomerOrderSchema = new mongoose.Schema(
// //   {
// //     customer: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       required: true,
// //       index: true,
// //     },

// //     orderItems: {
// //       type: [OrderItemSchema],
// //       required: true,
// //     },

// //     amount: { type: Number, required: true },
// //     shippingCharge: { type: Number, default: 0 },
// //     discount: { type: Number, default: 0 },
// //     totalPayable: { type: Number, required: true },

// //     orderStatus: {
// //       type: String,
// //       enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
// //       default: "Pending",
// //     },

// //     paymentMethod: {
// //       type: String,
// //       enum: ["cod", "razorpay"],
// //       default: "cod",
// //     },

// //     paymentStatus: {
// //       type: String,
// //       enum: ["Pending", "Success", "Failed", "Refunded"],
// //       default: "Pending",
// //     },

// //     razorpayOrderId: String,
// //     razorpayPaymentId: String,
// //     razorpaySignature: String,

// //     shippingAddress: {
// //       name: String,
// //       phone: String,
// //       email: String,
// //       address: String,
// //       city: String,
// //       state: String,
// //       pincode: String,
// //     },

// //     deliveredAt: Date,
// //     cancelledAt: Date,
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);



// const mongoose = require("mongoose");

// /* ================= ORDER ITEM ================= */
// const OrderItemSchema = new mongoose.Schema(
//   {
//     productId: mongoose.Schema.Types.ObjectId,
//     productName: String,
//     qty: Number,
//     price: Number,
//     vendorId: mongoose.Schema.Types.ObjectId,
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

//     warehouse: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Warehouse",
//       required: true,
//     },

//     pick_address_id: {
//       type: Number,
//       required: true,
//     },

//     parcelx: {
//       awb: String,
//       courier: String,
//     },

//     amount: Number,
//     shippingCharge: { type: Number, default: 0 },
//     discount: { type: Number, default: 0 },
//     totalPayable: Number,

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
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    qty: Number,
    price: Number,
    vendorId: mongoose.Schema.Types.ObjectId,
    image: String,
  },
  { _id: false }
);

/* ================= MAIN ORDER ================= */
const CustomerOrderSchema = new mongoose.Schema(
  {
    /* ===== CUSTOMER ===== */
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /* ===== VENDOR (ADDED – FIELD NAME NEW, BUT SYSTEM SAFE) ===== */
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },

    /* ===== ORDER ITEMS ===== */
    orderItems: {
      type: [OrderItemSchema],
      required: true,
    },

    /* ===== WAREHOUSE ===== */
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },

    /* ===== PARCELX PICKUP ADDRESS ===== */
    pick_address_id: {
      type: String,            // ❗ FIXED (Number → String)
      required: true,
    },

    /* ===== SHIPMENT DETAILS (ADDED – NO STATIC) ===== */
    shipment: {
      weight: { type: Number, required: true },   // KG
      length: { type: Number, required: true },   // CM
      width:  { type: Number, required: true },
      height: { type: Number, required: true },
    },

    /* ===== PARCELX DATA ===== */
    parcelx: {
      awb: String,
      courier: String,
      status: String,
      tracking_url: String,
      last_updated: Date,
    },

    /* ===== SAFETY FLAG ===== */
    parcelxOrderCreated: {
      type: Boolean,
      default: false,
    },

    /* ===== AMOUNTS ===== */
    amount: Number,
    shippingCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalPayable: Number,

    /* ===== ORDER STATUS ===== */
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    /* ===== PAYMENT ===== */
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

    /* ===== SHIPPING ADDRESS ===== */
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

