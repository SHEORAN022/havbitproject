// // // const mongoose = require('mongoose');

// // // const vendorOrderSchema = new mongoose.Schema(
// // //   {
// // //     user: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: 'Customer',
// // //       required: true,
// // //     },
// // //     orderId: {
// // //       type: String,
// // //       required: true,
// // //       unique: true
// // //     },
// // //     products: [
// // //       {
// // //         product: { 
// // //           type: mongoose.Schema.Types.ObjectId, 
// // //           ref: 'Product',
// // //           required: true 
// // //         },
// // //         name: String,
// // //         price: Number,
// // //         quantity: Number,
// // //         image: String,
// // //         size: String,
// // //         color: String
// // //       }
// // //     ],
// // //     shippingAddress: {
// // //       name: String,
// // //       phone: String,
// // //       address: String,
// // //       city: String,
// // //       state: String,
// // //       pincode: String,
// // //       landmark: String
// // //     },
// // //     billingAddress: {
// // //       name: String,
// // //       phone: String,
// // //       address: String,
// // //       city: String,
// // //       state: String,
// // //       pincode: String,
// // //       landmark: String
// // //     },
// // //     payment: {
// // //       method: {
// // //         type: String,
// // //         enum: ['cod', 'razorpay', 'stripe', 'paypal'],
// // //         required: true
// // //       },
// // //       status: {
// // //         type: String,
// // //         enum: ['pending', 'completed', 'failed', 'refunded'],
// // //         default: 'pending'
// // //       },
// // //       transactionId: String,
// // //       amount: Number,
// // //       currency: { type: String, default: 'INR' }
// // //     },
// // //     totalAmount: { type: Number, required: true },
// // //     shippingCharge: { type: Number, default: 0 },
// // //     taxAmount: { type: Number, default: 0 },
// // //     discountAmount: { type: Number, default: 0 },
// // //     finalAmount: { type: Number, required: true },
// // //     status: {
// // //       type: String,
// // //       enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
// // //       default: 'pending',
// // //     },
// // //     orderedAt: { type: Date, default: Date.now },
// // //     expectedDelivery: Date,
// // //     deliveredAt: Date,
// // //     shipping: {
// // //       carrier: String,
// // //       trackingNumber: String,
// // //       trackingUrl: String
// // //     },
// // //     notes: String,
// // //     cancelledAt: Date,
// // //     cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
// // //     cancellationReason: String
// // //   },
// // //   { timestamps: true }
// // // );

// // // // Auto-generate orderId & finalAmount
// // // vendorOrderSchema.pre('save', function(next) {
// // //   if (!this.orderId) {
// // //     const date = new Date();
// // //     const year = date.getFullYear();
// // //     const month = String(date.getMonth() + 1).padStart(2, '0');
// // //     const day = String(date.getDate()).padStart(2, '0');
// // //     const random = Math.floor(1000 + Math.random() * 9000);
// // //     this.orderId = `ORD-${year}${month}${day}-${random}`;
// // //   }

// // //   if (!this.finalAmount) {
// // //     this.finalAmount = this.totalAmount + this.shippingCharge + this.taxAmount - this.discountAmount;
// // //   }

// // //   next();
// // // });

// // // module.exports = mongoose.model('VendorOrder', vendorOrderSchema);







// // // const mongoose = require('mongoose');

// // // const vendorOrderSchema = new mongoose.Schema(
// // //   {
// // //     user: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: 'Customer',
// // //       required: true,
// // //     },
// // //     orderId: {
// // //       type: String,
// // //       required: true,
// // //       unique: true
// // //     },
// // //     products: [
// // //       {
// // //         product: { 
// // //           type: mongoose.Schema.Types.ObjectId, 
// // //           ref: 'Product',
// // //           required: true 
// // //         },
// // //         name: String,
// // //         price: Number,
// // //         quantity: Number,
// // //         image: String,
// // //         size: String,
// // //         color: String
// // //       }
// // //     ],
// // //     shippingAddress: { /*...*/ },
// // //     billingAddress: { /*...*/ },
// // //     payment: { /*...*/ },
// // //     totalAmount: { type: Number, required: true },
// // //     shippingCharge: { type: Number, default: 0 },
// // //     taxAmount: { type: Number, default: 0 },
// // //     discountAmount: { type: Number, default: 0 },
// // //     finalAmount: { type: Number, required: true },
// // //     status: { 
// // //       type: String, 
// // //       enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'], 
// // //       default: 'pending' 
// // //     },
// // //     orderedAt: { type: Date, default: Date.now }
// // //     // ... other fields
// // //   },
// // //   { timestamps: true }
// // // );

// // // // ✅ Pre-save hook to auto-generate orderId and finalAmount
// // // vendorOrderSchema.pre('save', function(next) {
// // //   if (!this.orderId) {
// // //     const date = new Date();
// // //     const year = date.getFullYear();
// // //     const month = String(date.getMonth() + 1).padStart(2, '0');
// // //     const day = String(date.getDate()).padStart(2, '0');
// // //     const random = Math.floor(1000 + Math.random() * 9000);
// // //     this.orderId = `ORD-${year}${month}${day}-${random}`;
// // //   }

// // //   if (!this.finalAmount) {
// // //     this.finalAmount = this.totalAmount + this.shippingCharge + this.taxAmount - this.discountAmount;
// // //   }

// // //   next();
// // // });

// // // module.exports = mongoose.model('VendorOrder', vendorOrderSchema);





// // const mongoose = require("mongoose");

// // const vendorOrderSchema = new mongoose.Schema(
// //   {
// //     user: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
// //     orderId: { type: String, required: true, unique: true },
// //     products: [
// //       {
// //         product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
// //         name: String,
// //         price: Number,
// //         quantity: Number,
// //       }
// //     ],
// //     totalAmount: { type: Number, required: true },
// //     status: { 
// //       type: String, 
// //       enum: ["pending","confirmed","processing","shipped","delivered","cancelled","returned"], 
// //       default: "pending" 
// //     },
// //     orderedAt: { type: Date, default: Date.now }
// //   },
// //   { timestamps: true }
// // );

// // // Auto-generate orderId
// // vendorOrderSchema.pre("save", function(next){
// //   if(!this.orderId){
// //     const d = new Date();
// //     const y = d.getFullYear();
// //     const m = String(d.getMonth()+1).padStart(2,"0");
// //     const day = String(d.getDate()).padStart(2,"0");
// //     const rand = Math.floor(1000 + Math.random()*9000);
// //     this.orderId = `ORD-${y}${m}${day}-${rand}`;
// //   }
// //   next();
// // });

// // module.exports = mongoose.model("VendorOrder", vendorOrderSchema);









// // const mongoose = require("mongoose");

// // const vendorOrderSchema = new mongoose.Schema(
// //   {
// //     vendor: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Vendor",
// //       required: true,
// //     },

// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Customer",
// //       required: true,
// //     },

// //     orderId: {
// //       type: String,
// //       unique: true,
// //     },

// //     products: [
// //       {
// //         product: {
// //           type: mongoose.Schema.Types.ObjectId,
// //           ref: "Product",
// //         },
// //         name: String,
// //         price: Number,
// //         quantity: Number,
// //       },
// //     ],

// //     totalAmount: {
// //       type: Number,
// //       required: true,
// //     },

// //     status: {
// //       type: String,
// //       enum: [
// //         "pending",
// //         "confirmed",
// //         "processing",
// //         "shipped",
// //         "delivered",
// //         "cancelled",
// //         "returned",
// //       ],
// //       default: "pending",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // // 🔥 Auto Order ID
// // vendorOrderSchema.pre("save", function (next) {
// //   if (!this.orderId) {
// //     this.orderId = `ORD-${Date.now()}-${Math.floor(
// //       1000 + Math.random() * 9000
// //     )}`;
// //   }
// //   next();
// // });

// // module.exports = mongoose.model("VendorOrder", vendorOrderSchema);







// const mongoose = require("mongoose");

// const vendorOrderSchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//     },

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },

//     orderId: {
//       type: String,
//       unique: true,
//     },

//     orderItems: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         productName: String,
//         price: Number,
//         qty: Number,
//         image: String,
//       },
//     ],

//     amount: {
//       type: Number,
//       required: true,
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay", "stripe", "wallet"],
//       default: "cod",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Paid", "Pending", "Failed", "Refunded"],
//       default: "Pending",
//     },

//     orderStatus: {
//       type: String,
//       enum: [
//         "Confirmed",
//         "Processing",
//         "Shipped",
//         "Delivered",
//         "Cancelled",
//         "Pending",
//       ],
//       default: "Pending",
//     },

//     shippingAddress: {
//       name: String,
//       address: String,
//       city: String,
//       state: String,
//       pincode: String,
//       phone: String,
//     },

//     tracking: {
//       provider: String,
//       trackingId: String,
//       estimatedDelivery: Date,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("VendorOrder", vendorOrderSchema);










// const mongoose = require("mongoose");

// const vendorOrderSchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//     },

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },

//     orderId: {
//       type: String,
//       unique: true,
//     },

//     orderItems: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         productName: String,
//         price: Number,
//         qty: Number,
//         image: String,
//       },
//     ],

//     amount: {
//       type: Number,
//       required: true,
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay", "stripe", "wallet"],
//       default: "cod",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Paid", "Pending", "Failed", "Refunded"],
//       default: "Pending",
//     },

//     orderStatus: {
//       type: String,
//       enum: [
//         "Confirmed",
//         "Processing",
//         "Shipped",
//         "Delivered",
//         "Cancelled",
//         "Pending",
//       ],
//       default: "Pending",
//     },

//     shippingAddress: {
//       name: String,
//       address: String,
//       city: String,
//       state: String,
//       pincode: String,
//       phone: String,
//     },

//     tracking: {
//       provider: String,
//       trackingId: String,
//       estimatedDelivery: Date,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("VendorOrder", vendorOrderSchema);







const mongoose = require("mongoose");

const VendorOrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    image: String,
  },
  { _id: false }
);

const vendorOrderSchema = new mongoose.Schema(
  {
    /* 🔴 MAIN VENDOR ID (VERY IMPORTANT) */
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true, // 🔥 vendor wise fast query
    },

    /* CUSTOMER WHO PLACED ORDER */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    /* LINK TO CUSTOMER ORDER */
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerOrder",
      required: true,
      index: true,
    },

    /* ONLY THIS VENDOR PRODUCTS */
    orderItems: {
      type: [VendorOrderItemSchema],
      required: true,
    },

    /* VENDOR TOTAL AMOUNT */
    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay", "stripe", "wallet"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed", "Refunded"],
      default: "Pending",
    },

    /* VENDOR LEVEL STATUS */
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
      index: true,
    },

    shippingAddress: {
      name: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },

    /* SHIPPING / TRACKING */
    tracking: {
      provider: String,
      trackingId: String,
      estimatedDelivery: Date,
    },

    deliveredAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorOrder", vendorOrderSchema);

