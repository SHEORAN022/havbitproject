
// const express = require("express");
// const router = express.Router();
// const { createOrder, getCustomerOrders, getVendorOrders } = require("../controllers/customerOrder.controller");

// // Customer
// router.post("/order/create", createOrder);
// router.get("/orders/:customerId", getCustomerOrders);

// // Vendor
// router.get("/vendor-orders/:vendorId", getVendorOrders);

// module.exports = router;






// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getCustomerOrders,
//   getOrderById,
//   cancelOrder,
//   getVendorOrders,
// } = require("../controllers/customerOrder.controller");

// router.post("/order/create", createOrder);

// router.get("/orders/:customerId", getCustomerOrders);

// router.get("/order/:id", getOrderById);

// router.put("/order/cancel/:id", cancelOrder);

// router.get("/vendor-orders/:vendorId", getVendorOrders);

// module.exports = router;











// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getCustomerOrders,
//   getOrderById,
//   cancelOrder,
//   getVendorOrders,
//   getAllOrdersForAdmin,
// } = require("../controllers/customerOrder.controller");

// /* ========== CUSTOMER ========== */
// router.post("/order/create", createOrder);
// router.get("/orders/:customerId", getCustomerOrders);
// router.get("/order/:id", getOrderById);
// router.put("/order/cancel/:id", cancelOrder);

// /* ========== VENDOR ========== */
// router.get("/vendor-orders/:vendorId", getVendorOrders);

// /* ========== ADMIN ========== */
// router.get("/admin/orders", getAllOrdersForAdmin);

// module.exports = router;









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

