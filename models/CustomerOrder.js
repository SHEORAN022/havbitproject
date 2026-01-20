// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true
//   },
//   orderItems: [
//     {
//       productName: String,
//       price: Number,
//       qty: Number
//     }
//   ],
//   amount: Number,
//   orderStatus: {
//     type: String,
//     default: "Pending"  // Pending, Confirmed, Shipped, Delivered, Cancelled
//   },
//   paymentMethod: {
//     type: String,
//     default: "COD"
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);





// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true
//   },
//   orderItems: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       productName: { type: String, required: true },
//       price: { type: Number, required: true },
//       qty: { type: Number, required: true }
//     }
//   ],
//   amount: { type: Number, required: true },
//   orderStatus: {
//     type: String,
//     enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending"
//   },
//   paymentMethod: {
//     type: String,
//     enum: ["COD", "Razorpay", "UPI", "Cards"],
//     default: "COD"
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed"],
//     default: "Pending"
//   },
//   shippingAddress: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true }
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);










// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true,
//   },

//   orderItems: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       productName: { type: String, required: true },
//       price: { type: Number, required: true },
//       qty: { type: Number, required: true },
//       vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//       image: { type: String }, // frontend se aa rha hai
//     }
//   ],

//   amount: { type: Number, required: true },

//   orderStatus: {
//     type: String,
//     enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending",
//   },

//   paymentMethod: {
//     type: String,
//     enum: ["cod", "razorpay", "upi", "cards"],
//     default: "cod",
//   },

//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed", "Refund Initiated"],
//     default: "Pending",
//   },

//   shippingAddress: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true },
//   },

// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);








// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true,
//   },

//   orderItems: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       productName: { type: String, required: true },
//       price: { type: Number, required: true },
//       qty: { type: Number, required: true },
//       vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//       image: { type: String }, // frontend se aa rha hai
//     }
//   ],

//   amount: { type: Number, required: true },

//   orderStatus: {
//     type: String,
//     enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending",
//   },

//   paymentMethod: {
//     type: String,
//     enum: ["cod", "razorpay", "upi", "cards"],
//     default: "cod",
//   },

//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed", "Refund Initiated"],
//     default: "Pending",
//   },

//   shippingAddress: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true },
//   },

// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);








// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },

//     // Multi vendor item structure
//     orderItems: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         productName: { type: String, required: true },
//         qty: { type: Number, required: true },
//         price: { type: Number, required: true },
//         vendorId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Vendor",
//           required: true,
//         },
//         image: String,
//       },
//     ],

//     amount: {
//       type: Number,
//       required: true,
//     },

//     orderStatus: {
//       type: String,
//       enum: [
//         "Pending",
//         "Confirmed",
//         "Processing",
//         "Shipped",
//         "Delivered",
//         "Cancelled",
//       ],
//       default: "Pending",
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay", "upi", "cards"],
//       default: "cod",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Completed", "Failed", "Refund Initiated"],
//       default: "Pending",
//     },

//     shippingAddress: {
//       name: { type: String, required: true },
//       phone: { type: String, required: true },
//       email: { type: String },
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       pincode: { type: String, required: true },
//     },

//     cancellationReason: { type: String },

//     // Future upgrade: Tracking timeline
//     timeline: [
//       {
//         status: String,
//         date: { type: Date, default: Date.now },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);






// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: String,
//       required: [true, "Customer ID is required"]
//     },

//     orderItems: [
//       {
//         productId: {
//           type: String,
//           required: [true, "Product ID is required"]
//         },
//         productName: {
//           type: String,
//           required: [true, "Product name is required"]
//         },
//         qty: {
//           type: Number,
//           required: [true, "Quantity is required"],
//           min: 1
//         },
//         price: {
//           type: Number,
//           required: [true, "Price is required"],
//           min: 1
//         },
//         vendorId: {
//           type: String,
//           required: [true, "Vendor ID is required"]
//         },
//         image: {
//           type: String,
//           default: ""
//         }
//       }
//     ],

//     amount: {
//       type: Number,
//       required: [true, "Order amount is required"]
//     },

//     orderStatus: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//       default: "Pending"
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay", "upi", "cards"],
//       default: "cod"
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Completed", "Failed", "Refund Initiated"],
//       default: "Pending"
//     },

//     shippingAddress: {
//       name: { type: String, required: [true, "Shipping name required"] },
//       phone: { type: String, required: [true, "Phone number required"] },
//       email: { type: String, default: "" },
//       address: { type: String, required: [true, "Address required"] },
//       city: { type: String, required: [true, "City required"] },
//       state: { type: String, required: [true, "State required"] },
//       pincode: { type: String, required: [true, "Pincode required"] }
//     },

//     cancellationReason: { type: String, default: "" },

//     timeline: [
//       {
//         status: String,
//         date: { type: Date, default: Date.now }
//       }
//     ]
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);





// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true
//   },
//   orderItems: [
//     {
//       productName: String,
//       price: Number,
//       qty: Number
//     }
//   ],
//   amount: Number,
//   orderStatus: {
//     type: String,
//     default: "Pending"  // Pending, Confirmed, Shipped, Delivered, Cancelled
//   },
//   paymentMethod: {
//     type: String,
//     default: "COD"
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);





// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true
//   },
//   orderItems: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       productName: { type: String, required: true },
//       price: { type: Number, required: true },
//       qty: { type: Number, required: true }
//     }
//   ],
//   amount: { type: Number, required: true },
//   orderStatus: {
//     type: String,
//     enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending"
//   },
//   paymentMethod: {
//     type: String,
//     enum: ["COD", "Razorpay", "UPI", "Cards"],
//     default: "COD"
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed"],
//     default: "Pending"
//   },
//   shippingAddress: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true }
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);










// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true,
//   },

//   orderItems: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       productName: { type: String, required: true },
//       price: { type: Number, required: true },
//       qty: { type: Number, required: true },
//       vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//       image: { type: String }, // frontend se aa rha hai
//     }
//   ],

//   amount: { type: Number, required: true },

//   orderStatus: {
//     type: String,
//     enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending",
//   },

//   paymentMethod: {
//     type: String,
//     enum: ["cod", "razorpay", "upi", "cards"],
//     default: "cod",
//   },

//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed", "Refund Initiated"],
//     default: "Pending",
//   },

//   shippingAddress: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true },
//   },

// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);








// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Customer",
//     required: true,
//   },

//   orderItems: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       productName: { type: String, required: true },
//       price: { type: Number, required: true },
//       qty: { type: Number, required: true },
//       vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//       image: { type: String }, // frontend se aa rha hai
//     }
//   ],

//   amount: { type: Number, required: true },

//   orderStatus: {
//     type: String,
//     enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending",
//   },

//   paymentMethod: {
//     type: String,
//     enum: ["cod", "razorpay", "upi", "cards"],
//     default: "cod",
//   },

//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed", "Refund Initiated"],
//     default: "Pending",
//   },

//   shippingAddress: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true },
//   },

// }, { timestamps: true });

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);








// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },

//     // Multi vendor item structure
//     orderItems: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         productName: { type: String, required: true },
//         qty: { type: Number, required: true },
//         price: { type: Number, required: true },
//         vendorId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Vendor",
//           required: true,
//         },
//         image: String,
//       },
//     ],

//     amount: {
//       type: Number,
//       required: true,
//     },

//     orderStatus: {
//       type: String,
//       enum: [
//         "Pending",
//         "Confirmed",
//         "Processing",
//         "Shipped",
//         "Delivered",
//         "Cancelled",
//       ],
//       default: "Pending",
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay", "upi", "cards"],
//       default: "cod",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Completed", "Failed", "Refund Initiated"],
//       default: "Pending",
//     },

//     shippingAddress: {
//       name: { type: String, required: true },
//       phone: { type: String, required: true },
//       email: { type: String },
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       pincode: { type: String, required: true },
//     },

//     cancellationReason: { type: String },

//     // Future upgrade: Tracking timeline
//     timeline: [
//       {
//         status: String,
//         date: { type: Date, default: Date.now },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);






// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: String,
//       required: true
//     },

//     orderItems: [
//       {
//         productId: String,
//         productName: String,
//         qty: Number,
//         price: Number,
//         vendorId: String,
//         image: String
//       }
//     ],

//     amount: {
//       type: Number,
//       required: true
//     },

//     orderStatus: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//       default: "Pending"
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay"],
//       default: "cod"
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Completed", "Failed"],
//       default: "Pending"
//     },

//     // Razorpay fields
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
//       pincode: String
//     }
//   },
//   { timestamps: true }
// );
















// const mongoose = require("mongoose");

// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: String,
//       required: true
//     },

//     orderItems: [
//       {
//         productId: String,
//         productName: String,
//         qty: Number,
//         price: Number,
//         vendorId: String,
//         image: String
//       }
//     ],

//     amount: {
//       type: Number,
//       required: true
//     },

//     orderStatus: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
//       default: "Pending"
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay"],
//       default: "cod"
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Completed", "Failed"],
//       default: "Pending"
//     },

//     // Razorpay fields
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
//       pincode: String
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);











const mongoose = require("mongoose");

/* ---------- ORDER ITEM ---------- */
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

/* ---------- MAIN ORDER ---------- */
const CustomerOrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    orderItems: [OrderItemSchema],

    amount: Number,
    shippingCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalPayable: Number,

    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay"],
      default: "razorpay",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },

    // 🔥 Razorpay fields
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);







// const mongoose = require("mongoose");

// /* ---------- ORDER ITEM ---------- */
// const OrderItemSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },
//     productName: {
//       type: String,
//       required: true,
//     },
//     qty: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Vendor', // Assuming you have a Vendor model
//       required: true,
//     },
//     image: String,
//     category: String,
//     brand: String,
//     description: String,
//   },
//   { _id: false }
// );

// /* ---------- SHIPPING ADDRESS ---------- */
// const ShippingAddressSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//     },
//     phone: {
//       type: String,
//       required: true,
//       match: /^[6-9]\d{9}$/,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     state: {
//       type: String,
//       required: true,
//     },
//     pincode: {
//       type: String,
//       required: true,
//       match: /^\d{6}$/,
//     },
//   },
//   { _id: false }
// );

// /* ---------- MAIN ORDER ---------- */
// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // Assuming you have a User model
//       required: true,
//       index: true,
//     },

//     orderItems: [OrderItemSchema],

//     // Price breakdown
//     amount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     subtotal: {
//       type: Number,
//       default: 0,
//     },
//     deliveryFee: {
//       type: Number,
//       default: 0,
//     },
//     platformFee: {
//       type: Number,
//       default: 0,
//     },
//     gst: {
//       type: Number,
//       default: 0,
//     },
//     totalPayable: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     orderStatus: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
//       default: "Pending",
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay", "card", "upi"],
//       default: "razorpay",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Success", "Failed", "Refunded", "Refund Initiated", "Cancelled"],
//       default: "Pending",
//     },

//     // Razorpay fields
//     razorpayOrderId: String,
//     razorpayPaymentId: String,
//     razorpaySignature: String,

//     // Shipping information
//     shippingAddress: ShippingAddressSchema,

//     // Tracking information
//     trackingNumber: String,
//     courierName: String,
//     estimatedDelivery: Date,
//     deliveredAt: Date,

//     // Order notes
//     notes: String,

//     // Cancellation/Return reason
//     cancellationReason: String,
//     returnReason: String,
//   },
//   { 
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Indexes for faster queries
// CustomerOrderSchema.index({ customer: 1, createdAt: -1 });
// CustomerOrderSchema.index({ orderStatus: 1 });
// CustomerOrderSchema.index({ paymentStatus: 1 });
// CustomerOrderSchema.index({ 'shippingAddress.pincode': 1 });
// CustomerOrderSchema.index({ createdAt: -1 });

// // Virtual for formatted order ID
// CustomerOrderSchema.virtual('formattedOrderId').get(function() {
//   return `ORD${this._id.toString().slice(-8).toUpperCase()}`;
// });

// // Virtual for total items count
// CustomerOrderSchema.virtual('totalItems').get(function() {
//   return this.orderItems.reduce((sum, item) => sum + item.qty, 0);
// });

// // Pre-save middleware
// CustomerOrderSchema.pre('save', function(next) {
//   // Ensure totalPayable is calculated correctly
//   if (this.isModified('subtotal') || this.isModified('deliveryFee') || 
//       this.isModified('platformFee') || this.isModified('gst')) {
//     this.totalPayable = this.subtotal + this.deliveryFee + this.platformFee + this.gst;
//   }
//   next();
// });

// // Instance method to check if order can be cancelled
// CustomerOrderSchema.methods.canCancel = function() {
//   const cancellableStatuses = ["Pending", "Confirmed"];
//   return cancellableStatuses.includes(this.orderStatus);
// };

// // Instance method to check if order can be returned
// CustomerOrderSchema.methods.canReturn = function() {
//   const returnableStatuses = ["Delivered"];
//   const returnWindow = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
//   const deliveredTime = new Date(this.deliveredAt || this.updatedAt);
//   const now = new Date();
  
//   return returnableStatuses.includes(this.orderStatus) && 
//          (now - deliveredTime) <= returnWindow;
// };

// module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);
