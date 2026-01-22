

// const CustomerOrder = require("../models/CustomerOrder");

// /* ================= CREATE ORDER ================= */
// exports.createOrder = async (req, res) => {
//   try {
//     const order = await CustomerOrder.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= CUSTOMER ORDERS ================= */
// exports.getCustomerOrders = async (req, res) => {
//   try {
//     const orders = await CustomerOrder.find({
//       customer: req.params.customerId,
//     }).sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= SINGLE ORDER ================= */
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await CustomerOrder.findById(req.params.id);

//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     res.json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= CANCEL ORDER ================= */
// exports.cancelOrder = async (req, res) => {
//   try {
//     const order = await CustomerOrder.findById(req.params.id);

//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     if (order.orderStatus === "Cancelled") {
//       return res.json({
//         success: false,
//         message: "Order already cancelled",
//       });
//     }

//     order.orderStatus = "Cancelled";
//     await order.save();

//     res.json({
//       success: true,
//       message: "Order cancelled successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= UPDATE ORDER STATUS (ADMIN/VENDOR) ================= */
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const order = await CustomerOrder.findById(req.params.id);
//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     order.orderStatus = status;
//     await order.save();

//     res.json({
//       success: true,
//       message: "Order status updated",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= VENDOR ORDERS ================= */
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const orders = await CustomerOrder.find({
//       "orderItems.vendorId": req.params.vendorId,
//     }).sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= ADMIN – ALL ORDERS ================= */
// exports.getAllOrdersForAdmin = async (req, res) => {
//   try {
//     const orders = await CustomerOrder.find().sort({ createdAt: -1 });
//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };












const CustomerOrder = require("../models/CustomerOrder");

/* ================= CREATE ORDER ================= */
exports.createOrder = async (req, res) => {
  try {
    const { customer, orderItems, amount, totalPayable } = req.body;

    if (!customer)
      return res.status(400).json({ success: false, message: "Customer required" });

    if (!orderItems || orderItems.length === 0)
      return res.status(400).json({ success: false, message: "Order items required" });

    if (!totalPayable)
      return res.status(400).json({ success: false, message: "Total payable required" });

    const order = await CustomerOrder.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= CUSTOMER ORDERS ================= */
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find({
      customer: req.params.customerId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= SINGLE ORDER ================= */
exports.getOrderById = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= CANCEL ORDER ================= */
exports.cancelOrder = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    if (order.orderStatus === "Cancelled")
      return res.json({ success: false, message: "Order already cancelled" });

    order.orderStatus = "Cancelled";
    order.cancelledAt = new Date();
    await order.save();

    res.json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(status))
      return res.status(400).json({ success: false, message: "Invalid status" });

    const order = await CustomerOrder.findById(req.params.id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    order.orderStatus = status;

    if (status === "Delivered") order.deliveredAt = new Date();

    await order.save();

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= VENDOR ORDERS ================= */
exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find({
      "orderItems.vendorId": req.params.vendorId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= ADMIN – ALL ORDERS ================= */
exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await CustomerOrder.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

