// // const mongoose = require('mongoose');

// // const vendorOrderSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'Customer',
// //       required: true,
// //     },
// //     orderId: {
// //       type: String,
// //       required: true,
// //       unique: true
// //     },
// //     products: [
// //       {
// //         product: { 
// //           type: mongoose.Schema.Types.ObjectId, 
// //           ref: 'Product',
// //           required: true 
// //         },
// //         name: String,
// //         price: Number,
// //         quantity: Number,
// //         image: String,
// //         size: String,
// //         color: String
// //       }
// //     ],
// //     shippingAddress: {
// //       name: String,
// //       phone: String,
// //       address: String,
// //       city: String,
// //       state: String,
// //       pincode: String,
// //       landmark: String
// //     },
// //     billingAddress: {
// //       name: String,
// //       phone: String,
// //       address: String,
// //       city: String,
// //       state: String,
// //       pincode: String,
// //       landmark: String
// //     },
// //     payment: {
// //       method: {
// //         type: String,
// //         enum: ['cod', 'razorpay', 'stripe', 'paypal'],
// //         required: true
// //       },
// //       status: {
// //         type: String,
// //         enum: ['pending', 'completed', 'failed', 'refunded'],
// //         default: 'pending'
// //       },
// //       transactionId: String,
// //       amount: Number,
// //       currency: { type: String, default: 'INR' }
// //     },
// //     totalAmount: { type: Number, required: true },
// //     shippingCharge: { type: Number, default: 0 },
// //     taxAmount: { type: Number, default: 0 },
// //     discountAmount: { type: Number, default: 0 },
// //     finalAmount: { type: Number, required: true },
// //     status: {
// //       type: String,
// //       enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
// //       default: 'pending',
// //     },
// //     orderedAt: { type: Date, default: Date.now },
// //     expectedDelivery: Date,
// //     deliveredAt: Date,
// //     shipping: {
// //       carrier: String,
// //       trackingNumber: String,
// //       trackingUrl: String
// //     },
// //     notes: String,
// //     cancelledAt: Date,
// //     cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
// //     cancellationReason: String
// //   },
// //   { timestamps: true }
// // );

// // // Auto-generate orderId & finalAmount
// // vendorOrderSchema.pre('save', function(next) {
// //   if (!this.orderId) {
// //     const date = new Date();
// //     const year = date.getFullYear();
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const day = String(date.getDate()).padStart(2, '0');
// //     const random = Math.floor(1000 + Math.random() * 9000);
// //     this.orderId = `ORD-${year}${month}${day}-${random}`;
// //   }

// //   if (!this.finalAmount) {
// //     this.finalAmount = this.totalAmount + this.shippingCharge + this.taxAmount - this.discountAmount;
// //   }

// //   next();
// // });

// // module.exports = mongoose.model('VendorOrder', vendorOrderSchema);







// // const mongoose = require('mongoose');

// // const vendorOrderSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'Customer',
// //       required: true,
// //     },
// //     orderId: {
// //       type: String,
// //       required: true,
// //       unique: true
// //     },
// //     products: [
// //       {
// //         product: { 
// //           type: mongoose.Schema.Types.ObjectId, 
// //           ref: 'Product',
// //           required: true 
// //         },
// //         name: String,
// //         price: Number,
// //         quantity: Number,
// //         image: String,
// //         size: String,
// //         color: String
// //       }
// //     ],
// //     shippingAddress: { /*...*/ },
// //     billingAddress: { /*...*/ },
// //     payment: { /*...*/ },
// //     totalAmount: { type: Number, required: true },
// //     shippingCharge: { type: Number, default: 0 },
// //     taxAmount: { type: Number, default: 0 },
// //     discountAmount: { type: Number, default: 0 },
// //     finalAmount: { type: Number, required: true },
// //     status: { 
// //       type: String, 
// //       enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'], 
// //       default: 'pending' 
// //     },
// //     orderedAt: { type: Date, default: Date.now }
// //     // ... other fields
// //   },
// //   { timestamps: true }
// // );

// // // ✅ Pre-save hook to auto-generate orderId and finalAmount
// // vendorOrderSchema.pre('save', function(next) {
// //   if (!this.orderId) {
// //     const date = new Date();
// //     const year = date.getFullYear();
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const day = String(date.getDate()).padStart(2, '0');
// //     const random = Math.floor(1000 + Math.random() * 9000);
// //     this.orderId = `ORD-${year}${month}${day}-${random}`;
// //   }

// //   if (!this.finalAmount) {
// //     this.finalAmount = this.totalAmount + this.shippingCharge + this.taxAmount - this.discountAmount;
// //   }

// //   next();
// // });

// // module.exports = mongoose.model('VendorOrder', vendorOrderSchema);





// const mongoose = require("mongoose");

// const vendorOrderSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
//     orderId: { type: String, required: true, unique: true },
//     products: [
//       {
//         product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//         name: String,
//         price: Number,
//         quantity: Number,
//       }
//     ],
//     totalAmount: { type: Number, required: true },
//     status: { 
//       type: String, 
//       enum: ["pending","confirmed","processing","shipped","delivered","cancelled","returned"], 
//       default: "pending" 
//     },
//     orderedAt: { type: Date, default: Date.now }
//   },
//   { timestamps: true }
// );

// // Auto-generate orderId
// vendorOrderSchema.pre("save", function(next){
//   if(!this.orderId){
//     const d = new Date();
//     const y = d.getFullYear();
//     const m = String(d.getMonth()+1).padStart(2,"0");
//     const day = String(d.getDate()).padStart(2,"0");
//     const rand = Math.floor(1000 + Math.random()*9000);
//     this.orderId = `ORD-${y}${m}${day}-${rand}`;
//   }
//   next();
// });

// module.exports = mongoose.model("VendorOrder", vendorOrderSchema);
const mongoose = require("mongoose");

const vendorOrderSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    orderId: {
      type: String,
      unique: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

// 🔥 Auto Order ID
vendorOrderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = `ORD-${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
  }
  next();
});

module.exports = mongoose.model("VendorOrder", vendorOrderSchema);
