



// const CustomerOrder = require("../models/CustomerOrder");
// /* ================= CREATE ORDER ================= */
// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       customer,
//       orderItems,
//       shippingCharge = 0,
//       discount = 0,
//       paymentMethod,
//       shippingAddress,
//     } = req.body;

//     if (!customer)
//       return res.status(400).json({ success: false, message: "Customer required" });

//     if (!orderItems || orderItems.length === 0)
//       return res.status(400).json({ success: false, message: "Order items required" });

//     /* 🔥 AUTO CALCULATE AMOUNT */
//     let amount = 0;

//     for (let item of orderItems) {
//       if (!item.vendorId) {
//         return res.status(400).json({
//           success: false,
//           message: "vendorId required in orderItems",
//         });
//       }

//       amount += item.price * item.qty;
//     }

//     const totalPayable = amount + shippingCharge - discount;

//     const order = await CustomerOrder.create({
//       customer,
//       orderItems,
//       amount,
//       shippingCharge,
//       discount,
//       totalPayable,
//       paymentMethod,
//       shippingAddress,
//       paymentStatus: "Pending",
//       orderStatus: "Pending",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // /* ================= CREATE ORDER ================= */
// // exports.createOrder = async (req, res) => {
// //   try {
// //     const { customer, orderItems, amount, totalPayable } = req.body;

// //     if (!customer)
// //       return res.status(400).json({ success: false, message: "Customer required" });

// //     if (!orderItems || orderItems.length === 0)
// //       return res.status(400).json({ success: false, message: "Order items required" });

// //     if (!totalPayable)
// //       return res.status(400).json({ success: false, message: "Total payable required" });

// //     const order = await CustomerOrder.create(req.body);

// //     res.status(201).json({
// //       success: true,
// //       message: "Order created successfully",
// //       order,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

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

//     if (!order)
//       return res.status(404).json({ success: false, message: "Order not found" });

//     res.json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= CANCEL ORDER ================= */
// exports.cancelOrder = async (req, res) => {
//   try {
//     const order = await CustomerOrder.findById(req.params.id);

//     if (!order)
//       return res.status(404).json({ success: false, message: "Order not found" });

//     if (order.orderStatus === "Cancelled")
//       return res.json({ success: false, message: "Order already cancelled" });

//     order.orderStatus = "Cancelled";
//     order.cancelledAt = new Date();
//     await order.save();

//     res.json({ success: true, message: "Order cancelled", order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= UPDATE ORDER STATUS ================= */
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const allowedStatus = [
//       "Pending",
//       "Confirmed",
//       "Processing",
//       "Shipped",
//       "Delivered",
//       "Cancelled",
//     ];

//     if (!allowedStatus.includes(status))
//       return res.status(400).json({ success: false, message: "Invalid status" });

//     const order = await CustomerOrder.findById(req.params.id);

//     if (!order)
//       return res.status(404).json({ success: false, message: "Order not found" });

//     order.orderStatus = status;

//     if (status === "Delivered") order.deliveredAt = new Date();

//     await order.save();

//     res.json({ success: true, message: "Order status updated", order });
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












// const CustomerOrder = require("../models/CustomerOrder");
// /* ================= CREATE ORDER ================= */
// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       customer,
//       orderItems,
//       shippingCharge = 0,
//       discount = 0,
//       paymentMethod,
//       shippingAddress,
//     } = req.body;

//     if (!customer)
//       return res.status(400).json({ success: false, message: "Customer required" });

//     if (!orderItems || orderItems.length === 0)
//       return res.status(400).json({ success: false, message: "Order items required" });

//     /* 🔥 AUTO CALCULATE AMOUNT */
//     let amount = 0;

//     for (let item of orderItems) {
//       if (!item.vendorId) {
//         return res.status(400).json({
//           success: false,
//           message: "vendorId required in orderItems",
//         });
//       }

//       amount += item.price * item.qty;
//     }

//     const totalPayable = amount + shippingCharge - discount;

//     const order = await CustomerOrder.create({
//       customer,
//       orderItems,
//       amount,
//       shippingCharge,
//       discount,
//       totalPayable,
//       paymentMethod,
//       shippingAddress,
//       paymentStatus: "Pending",
//       orderStatus: "Pending",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // /* ================= CREATE ORDER ================= */
// // exports.createOrder = async (req, res) => {
// //   try {
// //     const { customer, orderItems, amount, totalPayable } = req.body;

// //     if (!customer)
// //       return res.status(400).json({ success: false, message: "Customer required" });

// //     if (!orderItems || orderItems.length === 0)
// //       return res.status(400).json({ success: false, message: "Order items required" });

// //     if (!totalPayable)
// //       return res.status(400).json({ success: false, message: "Total payable required" });

// //     const order = await CustomerOrder.create(req.body);

// //     res.status(201).json({
// //       success: true,
// //       message: "Order created successfully",
// //       order,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

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

//     if (!order)
//       return res.status(404).json({ success: false, message: "Order not found" });

//     res.json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= CANCEL ORDER ================= */
// exports.cancelOrder = async (req, res) => {
//   try {
//     const order = await CustomerOrder.findById(req.params.id);

//     if (!order)
//       return res.status(404).json({ success: false, message: "Order not found" });

//     if (order.orderStatus === "Cancelled")
//       return res.json({ success: false, message: "Order already cancelled" });

//     order.orderStatus = "Cancelled";
//     order.cancelledAt = new Date();
//     await order.save();

//     res.json({ success: true, message: "Order cancelled", order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // /* ================= UPDATE ORDER STATUS ================= */
// // exports.updateOrderStatus = async (req, res) => {
// //   try {
// //     const { status } = req.body;

// //     const allowedStatus = [
// //       "Pending",
// //       "Confirmed",
// //       "Processing",
// //       "Shipped",
// //       "Delivered",
// //       "Cancelled",
// //     ];

// //     if (!allowedStatus.includes(status))
// //       return res.status(400).json({ success: false, message: "Invalid status" });

// //     const order = await CustomerOrder.findById(req.params.id);

// //     if (!order)
// //       return res.status(404).json({ success: false, message: "Order not found" });

// //     order.orderStatus = status;

// //     if (status === "Delivered") order.deliveredAt = new Date();

// //     await order.save();

// //     res.json({ success: true, message: "Order status updated", order });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// /* ================= UPDATE ORDER STATUS (FIX) ================= */
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "orderStatus required" });
//     }

//     const order = await CustomerOrder.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.json({ message: "Order status updated", order });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
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

// // /* ================= ADMIN – ALL ORDERS ================= */
// // exports.getAllOrdersForAdmin = async (req, res) => {
// //   try {
// //     const orders = await CustomerOrder.find().sort({ createdAt: -1 });
// //     res.json({ success: true, orders });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// /* ================= ADMIN: GET ALL ORDERS ================= */
// exports.getAllOrdersForAdmin = async (req, res) => {
//   try {
//     const orders = await CustomerOrder.find().sort({ createdAt: -1 });
//     res.json({ orders });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// /* ================= DELETE ORDER ================= */
// exports.deleteOrder = async (req, res) => {
//   try {
//     await CustomerOrder.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.getMyOrders = async (req, res) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const customerId = req.user.id;

//     const orders = await CustomerOrder.find({ customer: customerId })
//       .sort({ createdAt: -1 });

//     if (!orders.length) {
//       return res.json({
//         success: true,
//         orders: [],
//         message: "No orders found",
//       });
//     }

//     res.json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



















































// controllers/customerOrder.controller.js
const CustomerOrder = require("../models/CustomerOrder");

/* ================= CREATE ORDER ================= */
exports.createOrder = async (req, res) => {
  try {
    const {
      customer,
      orderItems,
      shippingCharge = 0,
      discount = 0,
      paymentMethod,
      shippingAddress,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    } = req.body;

    if (!customer)
      return res.status(400).json({ success: false, message: "Customer required" });

    if (!orderItems || orderItems.length === 0)
      return res.status(400).json({ success: false, message: "Order items required" });

    /* 🔥 AUTO CALCULATE AMOUNT */
    let amount = 0;

    for (let item of orderItems) {
      if (!item.vendorId) {
        return res.status(400).json({
          success: false,
          message: "vendorId required in orderItems",
        });
      }

      amount += item.price * item.qty;
    }

    const totalPayable = amount + shippingCharge - discount;

    // Determine payment status
    let paymentStatus = "Pending";
    if (paymentMethod === "razorpay" && razorpayPaymentId) {
      paymentStatus = "Success";
    }

    const order = await CustomerOrder.create({
      customer,
      orderItems,
      amount,
      shippingCharge,
      discount,
      totalPayable,
      paymentMethod,
      shippingAddress,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentStatus,
      orderStatus: paymentStatus === "Success" ? "Confirmed" : "Pending",
    });

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
    order.paymentStatus = "Cancelled";
    order.cancelledAt = new Date();
    await order.save();

    res.json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE ORDER STATUS (WITH SHIPROCKET INTEGRATION) ================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({ message: "orderStatus required" });
    }

    const order = await CustomerOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Store previous status for comparison
    const previousStatus = order.orderStatus;
    
    // Update order status
    order.orderStatus = orderStatus;
    
    // ✅ AUTO-CREATE SHIPROCKET SHIPMENT WHEN ORDER IS CONFIRMED
    if (orderStatus === 'Confirmed' && previousStatus !== 'Confirmed') {
      // Set a flag to indicate shipment should be created
      order.readyForShipping = true;
      order.estimatedDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
      
      // Update payment status for Razorpay orders
      if (order.paymentMethod === 'razorpay' && order.paymentStatus === 'Pending') {
        order.paymentStatus = 'Success';
      }
    }
    
    // ✅ UPDATE DATES BASED ON STATUS
    if (orderStatus === 'Processing') {
      order.processingAt = new Date();
    }
    
    if (orderStatus === 'Shipped') {
      order.shippedAt = new Date();
      order.pickupScheduledDate = new Date();
      order.isShipped = true;
    }
    
    if (orderStatus === 'Delivered') {
      order.deliveredAt = new Date();
      order.deliveredDate = new Date();
      
      // Update payment status for COD orders
      if (order.paymentMethod === 'cod') {
        order.paymentStatus = 'Success';
      }
    }
    
    if (orderStatus === 'Cancelled') {
      order.cancelledAt = new Date();
      order.paymentStatus = 'Cancelled';
    }

    await order.save();

    res.json({ 
      success: true,
      message: "Order status updated successfully", 
      order,
      previousStatus,
      newStatus: orderStatus
    });
    
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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

/* ================= ADMIN: GET ALL ORDERS ================= */
exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await CustomerOrder.find()
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ORDER ================= */
exports.deleteOrder = async (req, res) => {
  try {
    await CustomerOrder.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET MY ORDERS (LOGGED IN USER) ================= */
exports.getMyOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const customerId = req.user.id;

    const orders = await CustomerOrder.find({ customer: customerId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ORDER BY SHIPROCKET ID ================= */
exports.getOrderByShiprocketId = async (req, res) => {
  try {
    const { shiprocketOrderId } = req.params;
    
    const order = await CustomerOrder.findOne({ shiprocketOrderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    
    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ================= GET ORDERS BY AWB CODE ================= */
exports.getOrdersByAwbCode = async (req, res) => {
  try {
    const { awbCode } = req.params;
    
    const orders = await CustomerOrder.find({ awbCode });
    
    res.json({
      success: true,
      orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



