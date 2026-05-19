// const mongoose = require("mongoose");

// /* ================= ORDER ITEMS ================= */
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
//       ref: "Vendor",
//       default: null,
//     },
//     image: String,
//   },
//   { _id: false }
// );

// /* ================= MAIN ORDER ================= */
// const CustomerOrderSchema = new mongoose.Schema(
//   {
//     /* ================= USER ================= */
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "WebsiteUser",   // ✅ "User" से "WebsiteUser" किया
//       required: true,
//       index: true,
//     },

//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       default: null,
//     },

//     isPublicOrder: {
//       type: Boolean,
//       default: false,
//     },

//     /* ================= ITEMS ================= */
//     orderItems: {
//       type: [OrderItemSchema],
//       required: true,
//       validate: {
//         validator: (items) => items && items.length > 0,
//         message: "At least one order item required",
//       },
//     },

//     /* ================= WAREHOUSE ================= */
//     warehouse: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Warehouse",
//       default: null,
//     },

//     pick_address_id: {
//       type: String,
//       required: true,
//     },

//     /* ================= SHIPMENT ================= */
//     shipment: {
//       weight: Number,
//       length: Number,
//       width: Number,
//       height: Number,
//     },

//     /* ================= PARCELX ================= */
//     // parcelx: {
//     //   awb: String,
//     //   courier: String,
//     //   status: String,
//     //   tracking_url: String,
//     //   response: mongoose.Schema.Types.Mixed,
//     //   last_updated: Date,
//     // },


//     parcelx: {

//   order_id: {
//     type: String,
//     default: "",
//   },

//   awb: {
//     type: String,
//     default: "",
//   },

//   courier: {
//     type: String,
//     default: "",
//   },

//   status: {
//     type: String,
//     default: "",
//   },

//   tracking_url: {
//     type: String,
//     default: "",
//   },

//   response:
//     mongoose.Schema.Types.Mixed,

//   last_updated: Date,
// },

//     parcelxOrderCreated: {
//       type: Boolean,
//       default: false,
//     },

//     /* ================= AMOUNT ================= */
//     amount: {
//       type: Number,
//       required: true,
//     },

//     subtotal: { type: Number, default: 0 },
//     deliveryFee: { type: Number, default: 0 },
//     platformFee: { type: Number, default: 0 },
//     gst: { type: Number, default: 0 },

//     couponCode: { type: String, default: null },
//     couponDiscount: { type: Number, default: 0 },

//     shippingCharge: { type: Number, default: 0 },
//     discount: { type: Number, default: 0 },

//     totalPayable: {
//       type: Number,
//       required: true,
//     },

//     /* ================= RAZORPAY ================= */
//     razorpayOrderId: String,
//     razorpayPaymentId: String,

//     transferId: {
//       type: String,
//       index: true,
//     },

//     transferStatus: {
//       type: String,
//       enum: ["Pending", "Processed", "Failed"],
//       default: "Pending",
//     },

//     transferCreated: {
//       type: Boolean,
//       default: false,
//     },

//     /* ================= PAYOUT LOGIC ================= */
//     vendorAmount: {
//       type: Number,
//       default: 0,
//     },

//     platformAmount: {
//       type: Number,
//       default: 0,
//     },

//     payoutStatus: {
//       type: String,
//       enum: ["Pending", "OnHold", "Released", "Paid"],
//       default: "Pending",
//     },

//     payoutEligibleAt: Date,
//     payoutReleasedAt: Date,
    


//         /* ================= RETURN ================= */

//     returnRequested: {
//       type: Boolean,
//       default: false,
//     },

//     returnReason: {
//       type: String,
//       default: "",
//     },

//     returnStatus: {
//       type: String,
//       enum: [
//         "None",
//         "Requested",
//         "Approved",
//         "Rejected",
//         "ReverseBooked",
//         "Picked",
//         "Refunded",
//       ],
//       default: "None",
//     },

//     reverseAwb: {
//       type: String,
//       default: "",
//     },

//     reverseCourier: {
//       type: String,
//       default: "",
//     },

//     reverseTrackingUrl: {
//       type: String,
//       default: "",
//     },

//     refundId: {
//       type: String,
//       default: "",
//     },

//     refundAmount: {
//       type: Number,
//       default: 0,
//     },

//     refundStatus: {
//       type: String,
//       enum: [
//         "Pending",
//         "Processed",
//         "Failed",
//       ],
//       default: "Pending",
//     },

//     returnRequestedAt: Date,

//     returnApprovedAt: Date,

//     returnPickedAt: Date,

//     refundProcessedAt: Date,
//     /* ================= STATUS ================= */
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
//       enum: ["cod", "razorpay", "online"],
//       default: "cod",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Initiated", "Success", "Failed", "Refunded", "Cancelled"],  
//       default: "Pending",
//     },

//     /* ================= ADDRESS ================= */
//     shippingAddress: {
//       name: { type: String, required: true },
//       phone: { type: String, required: true },
//       email: String,
//       address: { type: String, required: true },
//       city: String,
//       state: String,
//       pincode: { type: String, required: true },
//     },

//     /* ================= DATES ================= */
//     deliveredAt: Date,
//     cancelledAt: Date,
//     cancelledReason: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// /* ================= INDEXES ================= */
// CustomerOrderSchema.index({ customer: 1, createdAt: -1 });
// CustomerOrderSchema.index({ "orderItems.vendorId": 1 });
// CustomerOrderSchema.index({ transferId: 1 });

// /* ================= EXPORT ================= */
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
      ref: "WebsiteUser",
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
        validator: (items) =>
          items && items.length > 0,

        message:
          "At least one order item required",
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
      weight: {
        type: Number,
        default: 0,
      },

      length: {
        type: Number,
        default: 0,
      },

      width: {
        type: Number,
        default: 0,
      },

      height: {
        type: Number,
        default: 0,
      },
    },

    /* ================= PARCELX ================= */

    parcelx: {

      order_id: {
        type: String,
        default: "",
      },

      order_number: {
        type: String,
        default: "",
      },

      shipment_id: {
        type: String,
        default: "",
      },

      awb: {
        type: String,
        default: "",
      },

      courier: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        default: "",
      },

      tracking_url: {
        type: String,
        default: "",
      },

      response:
        mongoose.Schema.Types.Mixed,

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

    subtotal: {
      type: Number,
      default: 0,
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    platformFee: {
      type: Number,
      default: 0,
    },

    gst: {
      type: Number,
      default: 0,
    },

    couponCode: {
      type: String,
      default: null,
    },

    couponDiscount: {
      type: Number,
      default: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalPayable: {
      type: Number,
      required: true,
    },

    /* ================= RAZORPAY ================= */

    razorpayOrderId: String,

    razorpayPaymentId: String,

    transferId: {
      type: String,
      index: true,
    },

    transferStatus: {
      type: String,

      enum: [
        "Pending",
        "Processed",
        "Failed",
      ],

      default: "Pending",
    },

    transferCreated: {
      type: Boolean,
      default: false,
    },

    /* ================= PAYOUT ================= */

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

      enum: [
        "Pending",
        "OnHold",
        "Released",
        "Paid",
      ],

      default: "Pending",
    },

    payoutEligibleAt: Date,

    payoutReleasedAt: Date,

    /* ================= RETURN ================= */

    returnRequested: {
      type: Boolean,
      default: false,
    },

    returnReason: {
      type: String,
      default: "",
    },

    returnStatus: {
      type: String,

      enum: [
        "None",
        "Requested",
        "Approved",
        "Rejected",
        "ReverseBooked",
        "Picked",
        "Refunded",
      ],

      default: "None",
    },

    reverseAwb: {
      type: String,
      default: "",
    },

    reverseCourier: {
      type: String,
      default: "",
    },

    reverseTrackingUrl: {
      type: String,
      default: "",
    },

    reverseResponse:
      mongoose.Schema.Types.Mixed,

    refundId: {
      type: String,
      default: "",
    },

    refundAmount: {
      type: Number,
      default: 0,
    },

    refundStatus: {
      type: String,

      enum: [
        "Pending",
        "Processed",
        "Failed",
      ],

      default: "Pending",
    },

    returnRequestedAt: Date,

    returnApprovedAt: Date,

    returnPickedAt: Date,

    refundProcessedAt: Date,

    /* ================= ORDER STATUS ================= */

    orderStatus: {
      type: String,

      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Refunded",
        "Return Approved",
      ],

      default: "Pending",
    },

    /* ================= PAYMENT ================= */

    paymentMethod: {
      type: String,

      enum: [
        "cod",
        "razorpay",
        "online",
      ],

      default: "cod",
    },

    paymentStatus: {
      type: String,

      enum: [
        "Pending",
        "Initiated",
        "Success",
        "Failed",
        "Refunded",
        "Cancelled",
      ],

      default: "Pending",
    },

    /* ================= ADDRESS ================= */

    shippingAddress: {

      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      pincode: {
        type: String,
        required: true,
      },
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

CustomerOrderSchema.index({
  customer: 1,
  createdAt: -1,
});

CustomerOrderSchema.index({
  "orderItems.vendorId": 1,
});

CustomerOrderSchema.index({
  transferId: 1,
});

CustomerOrderSchema.index({
  "parcelx.awb": 1,
});

CustomerOrderSchema.index({
  orderStatus: 1,
});

CustomerOrderSchema.index({
  returnStatus: 1,
});

/* ================= EXPORT ================= */

module.exports = mongoose.model(
  "CustomerOrder",
  CustomerOrderSchema
);
