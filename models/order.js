


// // const mongoose = require("mongoose");

// // const orderSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },

// //     products: [
// //       {
// //         product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
// //         quantity: Number,
// //       },
// //     ],

// //     totalAmount: {
// //       type: Number,
// //       required: true,
// //     },

// //     status: {
// //       type: String,
// //       enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
// //       default: "Pending",
// //     },

// //     orderedAt: { type: Date, default: Date.now },

// //     cancelledAt: { type: Date },
// //     cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Order", orderSchema);









// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Customer',
//       required: true,
//     },
//     orderId: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     products: [
//       {
//         product: { 
//           type: mongoose.Schema.Types.ObjectId, 
//           ref: 'Product',
//           required: true 
//         },
//         name: String,
//         price: Number,
//         quantity: Number,
//         image: String,
//         size: String,
//         color: String
//       }
//     ],
//     shippingAddress: {
//       name: String,
//       phone: String,
//       address: String,
//       city: String,
//       state: String,
//       pincode: String,
//       landmark: String
//     },
//     billingAddress: {
//       name: String,
//       phone: String,
//       address: String,
//       city: String,
//       state: String,
//       pincode: String,
//       landmark: String
//     },
//     payment: {
//       method: {
//         type: String,
//         enum: ['cod', 'razorpay', 'stripe', 'paypal'],
//         required: true
//       },
//       status: {
//         type: String,
//         enum: ['pending', 'completed', 'failed', 'refunded'],
//         default: 'pending'
//       },
//       transactionId: String,
//       amount: Number,
//       currency: {
//         type: String,
//         default: 'INR'
//       }
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     shippingCharge: {
//       type: Number,
//       default: 0
//     },
//     taxAmount: {
//       type: Number,
//       default: 0
//     },
//     discountAmount: {
//       type: Number,
//       default: 0
//     },
//     finalAmount: {
//       type: Number,
//       required: true
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
//       default: 'pending',
//     },
//     orderedAt: { 
//       type: Date, 
//       default: Date.now 
//     },
//     expectedDelivery: {
//       type: Date
//     },
//     deliveredAt: {
//       type: Date
//     },
//     shipping: {
//       carrier: String,
//       trackingNumber: String,
//       trackingUrl: String
//     },
//     notes: {
//       type: String,
//       trim: true
//     },
//     cancelledAt: { 
//       type: Date 
//     },
//     cancelledBy: { 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'Customer' 
//     },
//     cancellationReason: {
//       type: String,
//       trim: true
//     }
//   },
//   { 
//     timestamps: true 
//   }
// );

// // Generate order ID before saving
// orderSchema.pre('save', async function(next) {
//   if (!this.orderId) {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const random = Math.floor(1000 + Math.random() * 9000);
//     this.orderId = `ORD-${year}${month}${day}-${random}`;
//   }
  
//   if (!this.finalAmount) {
//     this.finalAmount = this.totalAmount + this.shippingCharge + this.taxAmount - this.discountAmount;
//   }
  
//   next();
// });







// module.exports = mongoose.model('Order', orderSchema);















const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    products: [
      {
        product: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Product',
          required: true 
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        size: String,
        color: String
      }
    ],
    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String
    },
    billingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String
    },
    payment: {
      method: {
        type: String,
        enum: ['cod', 'razorpay', 'stripe', 'paypal'],
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
      },
      transactionId: String,
      amount: Number,
      currency: {
        type: String,
        default: 'INR'
      }
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingCharge: {
      type: Number,
      default: 0
    },
    taxAmount: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    finalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      default: 'pending',
    },
    orderedAt: { 
      type: Date, 
      default: Date.now 
    },
    expectedDelivery: {
      type: Date
    },
    deliveredAt: {
      type: Date
    },
    shipping: {
      carrier: String,
      trackingNumber: String,
      trackingUrl: String
    },
    notes: {
      type: String,
      trim: true
    },
    cancelledAt: { 
      type: Date 
    },
    cancelledBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Customer' 
    },
    cancellationReason: {
      type: String,
      trim: true
    }
  },
  { 
    timestamps: true 
  }
);

// Generate order ID before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    this.orderId = `ORD-${year}${month}${day}-${random}`;
  }
  
  if (!this.finalAmount) {
    this.finalAmount = this.totalAmount + this.shippingCharge + this.taxAmount - this.discountAmount;
  }
  
  next();
});

module.exports = mongoose.model('Order', orderSchema);






