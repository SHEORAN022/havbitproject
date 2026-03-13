const mongoose = require("mongoose");

const VendorOrderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    image: String,
  },
  { _id: false }
);

const vendorOrderSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerOrder",
      required: true,
    },

    orderItems: {
      type: [VendorOrderItemSchema],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay", "stripe"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
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





// const mongoose = require("mongoose");

// const VendorOrderSchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//       index: true,
//     },
    
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
    
//     orderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "CustomerOrder",
//       required: true,
//       index: true,
//     },
    
//     orderItems: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
//         productName: String,
//         qty: { type: Number, required: true },
//         price: { type: Number, required: true },
//         image: String,
//         category: String,
//         brand: String,
//         description: String
//       }
//     ],
    
//     amount: { type: Number, required: true },
    
//     // ParcelX Tracking Information
//     tracking: {
//       provider: { type: String, default: "ParcelX" },
//       trackingId: String,
//       awbNumber: String,
//       orderNumber: String,
//       courierName: String,
//       warehouseId: String,
//       estimatedDelivery: Date,
//       status: {
//         type: String,
//         enum: ["Pending", "Booked", "In Transit", "Out for Delivery", "Delivered", "Cancelled", "Returned"],
//         default: "Pending"
//       },
//       parcelxData: mongoose.Schema.Types.Mixed,
//       labelUrl: String
//     },
    
//     // Shipping Address
//     shippingAddress: {
//       name: String,
//       phone: String,
//       email: String,
//       address: String,
//       city: String,
//       state: String,
//       pincode: String,
//       landmark: String
//     },
    
//     // Vendor Details
//     vendorDetails: {
//       name: String,
//       warehouseId: String,
//       city: String,
//       state: String,
//       phone: String
//     },
    
//     // Payment Info
//     paymentMethod: {
//       type: String,
//       enum: ["cod", "razorpay", "wallet", "card", "upi"],
//       default: "cod",
//     },
    
//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Success", "Failed", "Refunded", "Partially Refunded"],
//       default: "Pending",
//     },
    
//     // Order Status
//     orderStatus: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled", "Returned", "Refunded"],
//       default: "Pending",
//     },
    
//     // Timestamps
//     deliveredAt: Date,
//     cancelledAt: Date,
//     refundedAt: Date,
    
//     // Notes
//     vendorNotes: String,
//     adminNotes: String
//   },
//   { 
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Indexes
// VendorOrderSchema.index({ vendor: 1, createdAt: -1 });
// VendorOrderSchema.index({ orderId: 1 });
// VendorOrderSchema.index({ "tracking.awbNumber": 1 });
// VendorOrderSchema.index({ orderStatus: 1 });
// VendorOrderSchema.index({ paymentStatus: 1 });
// VendorOrderSchema.index({ createdAt: -1 });

// // Virtual for tracking link
// VendorOrderSchema.virtual('trackingLink').get(function() {
//   if (!this.tracking?.awbNumber) return null;
//   return `https://app.parcelx.in/tracking/${this.tracking.awbNumber}`;
// });

// // Virtual for vendor info
// VendorOrderSchema.virtual('vendorInfo', {
//   ref: 'Vendor',
//   localField: 'vendor',
//   foreignField: '_id',
//   justOne: true
// });

// // Virtual for main order info
// VendorOrderSchema.virtual('mainOrder', {
//   ref: 'CustomerOrder',
//   localField: 'orderId',
//   foreignField: '_id',
//   justOne: true
// });

// /* ================= METHODS ================= */
// VendorOrderSchema.methods.updateTracking = function(status, location = '', remarks = '') {
//   if (!this.tracking) {
//     this.tracking = {
//       provider: "ParcelX",
//       status: "Pending"
//     };
//   }
  
//   this.tracking.status = status;
  
//   if (!this.tracking.trackingHistory) {
//     this.tracking.trackingHistory = [];
//   }
  
//   this.tracking.trackingHistory.push({
//     status,
//     location,
//     remarks,
//     datetime: new Date()
//   });
  
//   this.orderStatus = status === 'Delivered' ? 'Delivered' :
//                      status === 'Cancelled' ? 'Cancelled' :
//                      status === 'Returned' ? 'Returned' :
//                      'Processing';
  
//   if (status === 'Delivered') {
//     this.deliveredAt = new Date();
//   }
  
//   return this.save();
// };

// /* ================= STATIC METHODS ================= */
// VendorOrderSchema.statics.findByVendor = function(vendorId) {
//   return this.find({ vendor: vendorId })
//     .populate('user', 'name email phone')
//     .populate('orderId', 'orderId orderStatus')
//     .sort({ createdAt: -1 });
// };

// VendorOrderSchema.statics.findByAWB = function(awbNumber) {
//   return this.findOne({ "tracking.awbNumber": awbNumber })
//     .populate('vendor', 'name shopName')
//     .populate('orderId', 'orderId customer');
// };

// module.exports = mongoose.model("VendorOrder", VendorOrderSchema);









