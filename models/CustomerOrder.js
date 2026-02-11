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

/* ================= ORDER ITEM SCHEMA ================= */
const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    productName: String,
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vendor' },
    vendorName: String,
    image: String,
    category: String,
    brand: String,
    description: String
  },
  { _id: false }
);

/* ================= SHIPPING ADDRESS SCHEMA ================= */
const ShippingAddressSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    landmark: String
  },
  { _id: false }
);

/* ================= VENDOR SHIPMENT SCHEMA ================= */
const VendorShipmentSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Vendor' },
    vendorName: String,
    awbNumber: String,
    courierName: String,
    parcelxOrderId: String,
    warehouseId: String,
    warehouseCity: String,
    status: {
      type: String,
      enum: ["Pending", "Booked", "In Transit", "Out for Delivery", "Delivered", "Cancelled", "Returned", "Lost", "NDR"],
      default: "Pending"
    },
    trackingHistory: [{
      status: String,
      location: String,
      datetime: Date,
      remarks: String
    }],
    shipmentData: mongoose.Schema.Types.Mixed,
    labelUrl: String,
    cancelReason: String,
    cancelledAt: Date,
    deliveredAt: Date
  },
  { _id: false }
);

/* ================= MAIN ORDER SCHEMA ================= */
const CustomerOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () => `ORD${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    },
    
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },

    orderItems: {
      type: [OrderItemSchema],
      required: true,
    },

    // Payment details
    amount: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    platformFee: { type: Number, default: 2 },
    gst: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    couponDiscount: { type: Number, default: 0 },
    couponCode: String,
    totalBeforeDiscount: { type: Number, default: 0 },
    totalPayable: { type: Number, required: true },

    // Overall order status
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Processing", "Partially Shipped", "Shipped", "Partially Delivered", "Delivered", "Cancelled", "Returned", "Refunded"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay", "wallet", "card", "upi"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Refunded", "Partially Refunded"],
      default: "Pending",
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    shippingAddress: ShippingAddressSchema,
    
    /* ============ VENDOR SHIPMENTS ============ */
    vendorShipments: [VendorShipmentSchema],
    
    // Tracking
    awbNumbers: [String],
    courierNames: [String],
    
    trackingHistory: [{
      status: String,
      description: String,
      datetime: Date,
      source: String
    }],

    // Timestamps
    deliveredAt: Date,
    cancelledAt: Date,
    refundedAt: Date,
    
    // Notes
    adminNotes: String,
    customerNotes: String,
    
    // Flags
    isSplitOrder: {
      type: Boolean,
      default: false
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/* ================= VIRTUAL FIELDS ================= */
CustomerOrderSchema.virtual('vendorCount').get(function() {
  const vendorIds = new Set(this.orderItems.map(item => item.vendorId.toString()));
  return vendorIds.size;
});

CustomerOrderSchema.virtual('shipmentCount').get(function() {
  return this.vendorShipments.length;
});

CustomerOrderSchema.virtual('deliveredShipments').get(function() {
  return this.vendorShipments.filter(s => s.status === 'Delivered').length;
});

CustomerOrderSchema.virtual('trackingLinks').get(function() {
  return this.vendorShipments.map(shipment => ({
    vendorId: shipment.vendorId,
    vendorName: shipment.vendorName,
    awbNumber: shipment.awbNumber,
    courierName: shipment.courierName,
    warehouseCity: shipment.warehouseCity,
    trackingUrl: shipment.awbNumber ? 
      `https://app.parcelx.in/tracking/${shipment.awbNumber}` : 
      null,
    status: shipment.status
  }));
});

/* ================= METHODS ================= */
CustomerOrderSchema.methods.getVendorItems = function(vendorId) {
  return this.orderItems.filter(item => item.vendorId.toString() === vendorId.toString());
};

CustomerOrderSchema.methods.getVendorShipment = function(vendorId) {
  return this.vendorShipments.find(shipment => shipment.vendorId.toString() === vendorId.toString());
};

CustomerOrderSchema.methods.updateOrderStatus = function() {
  const shipments = this.vendorShipments;
  if (shipments.length === 0) return;
  
  const allDelivered = shipments.every(s => s.status === 'Delivered');
  const allCancelled = shipments.every(s => s.status === 'Cancelled');
  const anyShipped = shipments.some(s => ['In Transit', 'Out for Delivery'].includes(s.status));
  const anyDelivered = shipments.some(s => s.status === 'Delivered');
  const anyBooked = shipments.some(s => s.status === 'Booked');
  
  if (allDelivered) {
    this.orderStatus = 'Delivered';
    this.deliveredAt = new Date();
  } else if (allCancelled) {
    this.orderStatus = 'Cancelled';
    this.cancelledAt = new Date();
  } else if (anyDelivered) {
    this.orderStatus = 'Partially Delivered';
  } else if (anyShipped) {
    this.orderStatus = 'Shipped';
  } else if (anyBooked) {
    this.orderStatus = 'Processing';
  } else {
    this.orderStatus = 'Confirmed';
  }
};

CustomerOrderSchema.methods.addTrackingEvent = function(status, description, source = 'system') {
  this.trackingHistory.push({
    status,
    description,
    datetime: new Date(),
    source
  });
};

/* ================= STATIC METHODS ================= */
CustomerOrderSchema.statics.findByAWB = function(awbNumber) {
  return this.findOne({ awbNumbers: awbNumber });
};

CustomerOrderSchema.statics.findByCustomer = function(customerId) {
  return this.find({ customer: customerId }).sort({ createdAt: -1 });
};

/* ================= INDEXES ================= */
CustomerOrderSchema.index({ orderId: 1 });
CustomerOrderSchema.index({ customer: 1, createdAt: -1 });
CustomerOrderSchema.index({ "vendorShipments.vendorId": 1 });
CustomerOrderSchema.index({ "vendorShipments.awbNumber": 1 });
CustomerOrderSchema.index({ "orderStatus": 1 });
CustomerOrderSchema.index({ "paymentStatus": 1 });
CustomerOrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);
