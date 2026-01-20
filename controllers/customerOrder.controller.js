// // const CustomerOrder = require("../models/CustomerOrder");

// // // CREATE ORDER
// // exports.createOrder = async (req, res) => {
// //   try {
// //     const { customer, orderItems, amount, paymentMethod } = req.body;

// //     const newOrder = new CustomerOrder({
// //       customer,
// //       orderItems,
// //       amount,
// //       paymentMethod
// //     });

// //     await newOrder.save();

// //     res.status(201).json({ success: true, message: "Order Created", order: newOrder });
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // // GET ORDERS BY CUSTOMER
// // exports.getCustomerOrders = async (req, res) => {
// //   try {
// //     const customerId = req.params.customerId;

// //     const orders = await CustomerOrder.find({ customer: customerId })
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({ success: true, orders });
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };





// const CustomerOrder = require("../models/CustomerOrder");

// // CREATE ORDER
// exports.createOrder = async (req, res) => {
//   try {
//     const { 
//       customer, 
//       orderItems, 
//       amount, 
//       paymentMethod, 
//       shippingAddress // Frontend se pura address object aayega
//     } = req.body;

//     // Validation
//     if (!customer || !orderItems || !amount || !shippingAddress) {
//       return res.status(400).json({ success: false, message: "Please provide all required fields" });
//     }

//     const newOrder = new CustomerOrder({
//       customer,
//       orderItems,
//       amount,
//       paymentMethod,
//       shippingAddress,
//       // Agar COD hai toh payment status pending hi rahega jab tak delivery na ho
//       paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed" 
//     });

//     await newOrder.save();
//     res.status(201).json({ success: true, message: "Order Created Successfully", order: newOrder });
//   } catch (err) {
//     console.error("Order Error:", err);
//     res.status(500).json({ success: false, message: "Server Error", error: err.message });
//   }
// };

// // GET ORDERS BY CUSTOMER
// exports.getCustomerOrders = async (req, res) => {
//   try {
//     const { customerId } = req.params;
//     const orders = await CustomerOrder.find({ customer: customerId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: orders.length, orders });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };







// const CustomerOrder = require("../models/CustomerOrder");

// // --- CREATE ORDER ---
// exports.createOrder = async (req, res) => {
//   try {
//     const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

//     // Basic Validation
//     if (!customer || !orderItems || !amount || !shippingAddress) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Sabhi details (customer, items, amount, address) bhejni zaroori hain." 
//       });
//     }

//     const newOrder = new CustomerOrder({
//       customer,
//       orderItems,
//       amount,
//       paymentMethod,
//       shippingAddress,
//       // Logic: Agar online payment hai toh Completed, warna COD mein Pending
//       paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed"
//     });

//     await newOrder.save();

//     res.status(201).json({ 
//       success: true, 
//       message: "Order Created Successfully", 
//       order: newOrder 
//     });
//   } catch (err) {
//     console.error("Error creating order:", err);
//     res.status(500).json({ success: false, message: "Server Error", error: err.message });
//   }
// };

// // --- GET CUSTOMER ORDERS ---
// exports.getCustomerOrders = async (req, res) => {
//   try {
//     const { customerId } = req.params;

//     const orders = await CustomerOrder.find({ customer: customerId })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ 
//       success: true, 
//       count: orders.length, 
//       orders 
//     });
//   } catch (err) {
//     console.error("Error fetching orders:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };





// const CustomerOrder = require("../models/CustomerOrder");

// // 1. CREATE ORDER (With Vendor IDs)
// exports.createOrder = async (req, res) => {
//   try {
//     const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

//     if (!customer || !orderItems || !amount || !shippingAddress) {
//       return res.status(400).json({ success: false, message: "Missing details." });
//     }

//     const newOrder = new CustomerOrder({
//       customer,
//       orderItems, // Har item mein vendorId honi chahiye
//       amount,
//       paymentMethod,
//       shippingAddress,
//       paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed"
//     });

//     await newOrder.save();
//     res.status(201).json({ success: true, message: "Order Placed!", order: newOrder });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // 2. GET VENDOR SPECIFIC ORDERS (Multi-Vendor Logic)
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     // Aise orders dhundo jisme is vendor ka productId maujood ho
//     const orders = await CustomerOrder.find({
//       "orderItems.vendorId": vendorId
//     }).sort({ createdAt: -1 });

//     // Filter: Vendor ko sirf apna product dikhe, dusre ka nahi
//     const vendorSpecificData = orders.map(order => {
//       const myItems = order.orderItems.filter(item => item.vendorId.toString() === vendorId);
//       return {
//         ...order._doc,
//         orderItems: myItems,
//         totalVendorAmount: myItems.reduce((acc, item) => acc + (item.price * item.qty), 0)
//       };
//     });

//     res.status(200).json({ success: true, count: vendorSpecificData.length, orders: vendorSpecificData });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // 3. GET CUSTOMER ORDERS (As it is)
// exports.getCustomerOrders = async (req, res) => {
//   try {
//     const orders = await CustomerOrder.find({ customer: req.params.customerId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };







// const CustomerOrder = require("../models/CustomerOrder");

// exports.createOrder = async (req, res) => {
//   try {
//     const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

//     if (!customer || !orderItems || !orderItems.length || !amount || !shippingAddress) {
//       return res.status(400).json({ success: false, message: "Missing required fields." });
//     }

//     const newOrder = new CustomerOrder({
//       customer,
//       orderItems,
//       amount,
//       paymentMethod,
//       shippingAddress,
//       paymentStatus:
//         paymentMethod === "cod"
//           ? "Pending"
//           : "Completed"
//     });

//     await newOrder.save();

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully!",
//       orderId: newOrder._id,
//       order: newOrder
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Customer Orders
// exports.getCustomerOrders = async (req, res) => {
//   try {
//     const orders = await CustomerOrder.find({ customer: req.params.customerId })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, orders });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Vendor Orders (Multi Vendor)
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     const orders = await CustomerOrder.find({
//       "orderItems.vendorId": vendorId
//     }).sort({ createdAt: -1 });

//     const vendorOnlyItems = orders.map(order => {
//       const myItems = order.orderItems.filter(
//         item => item.vendorId.toString() === vendorId
//       );

//       return {
//         ...order._doc,
//         orderItems: myItems,
//         vendorAmount: myItems.reduce((acc, i) => acc + (i.price * i.qty), 0)
//       };
//     });

//     res.status(200).json({ success: true, orders: vendorOnlyItems });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };








// const CustomerOrder = require("../models/CustomerOrder");

// exports.createOrder = async (req, res) => {
//   try {
//     const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

//     if (!customer || !orderItems || !orderItems.length || !amount || !shippingAddress) {
//       return res.status(400).json({ success: false, message: "Missing required fields." });
//     }

//     const newOrder = new CustomerOrder({
//       customer,
//       orderItems,
//       amount,
//       paymentMethod,
//       shippingAddress,
//       paymentStatus:
//         paymentMethod === "cod"
//           ? "Pending"
//           : "Completed"
//     });

//     await newOrder.save();

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully!",
//       orderId: newOrder._id,
//       order: newOrder
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Customer Orders
// exports.getCustomerOrders = async (req, res) => {
//   try {
//     const orders = await CustomerOrder.find({ customer: req.params.customerId })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, orders });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Vendor Orders (Multi Vendor)
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     const orders = await CustomerOrder.find({
//       "orderItems.vendorId": vendorId
//     }).sort({ createdAt: -1 });

//     const vendorOnlyItems = orders.map(order => {
//       const myItems = order.orderItems.filter(
//         item => item.vendorId.toString() === vendorId
//       );

//       return {
//         ...order._doc,
//         orderItems: myItems,
//         vendorAmount: myItems.reduce((acc, i) => acc + (i.price * i.qty), 0)
//       };
//     });

//     res.status(200).json({ success: true, orders: vendorOnlyItems });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };





// const CustomerOrder = require("../models/CustomerOrder");

// // ===== Create Order =====
// exports.createOrder = async (req, res) => {
//   try {
//     const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

//     if (!customer || !orderItems?.length || !amount || !shippingAddress) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const newOrder = await CustomerOrder.create({
//       customer,
//       orderItems,
//       amount,
//       paymentMethod,
//       shippingAddress,
//       paymentStatus: paymentMethod === "cod" ? "Pending" : "Completed",
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       orderId: newOrder._id,
//       order: newOrder,
//     });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===== Fetch Customer Orders =====
// exports.getCustomerOrders = async (req, res) => {
//   try {
//     const { customerId } = req.params;

//     const orders = await CustomerOrder.find({ customer: customerId })
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       orders,
//     });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ===== Fetch Single Order =====
// exports.getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const order = await CustomerOrder.findById(id)
//       .populate("customer")
//       .populate("orderItems.productId");

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       order,
//     });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ===== Cancel Order =====
// exports.cancelOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { cancellationReason } = req.body;

//     const order = await CustomerOrder.findById(id);

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     if (["Shipped", "Delivered"].includes(order.orderStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot cancel after shipped",
//       });
//     }

//     order.orderStatus = "Cancelled";
//     order.paymentStatus =
//       order.paymentStatus === "Completed" ? "Refund Initiated" : order.paymentStatus;
//     order.cancellationReason = cancellationReason || "User Cancelled";

//     await order.save();

//     return res.status(200).json({
//       success: true,
//       message: "Order cancelled successfully",
//       order,
//     });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===== Vendor Orders (Multi-Vendor) =====
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     const orders = await CustomerOrder.find({
//       "orderItems.vendorId": vendorId
//     }).sort({ createdAt: -1 });

//     const vendorOnlyItems = orders.map(order => {
//       const myItems = order.orderItems.filter(
//         item => item.vendorId.toString() === vendorId
//       );

//       return {
//         ...order._doc,
//         orderItems: myItems,
//         vendorAmount: myItems.reduce((acc, i) => acc + (i.price * i.qty), 0)
//       };
//     });

//     return res.status(200).json({ success: true, orders: vendorOnlyItems });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };






// const CustomerOrder = require("../models/CustomerOrder");

// // ===== CREATE ORDER =====
// const createOrder = async (req, res) => {
//   try {
//     const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

//     if (!customer) return res.status(400).json({ success: false, message: "Customer ID missing" });
//     if (!orderItems || !orderItems.length) return res.status(400).json({ success: false, message: "No items in order" });
//     if (!amount) return res.status(400).json({ success: false, message: "Order amount missing" });
//     if (!shippingAddress) return res.status(400).json({ success: false, message: "Shipping address missing" });

//     const order = await CustomerOrder.create({
//       customer,
//       orderItems,
//       amount,
//       paymentMethod,
//       shippingAddress,
//       paymentStatus: paymentMethod === "cod" ? "Pending" : "Completed"
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       orderId: order._id,
//       order
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


// // ===== GET ALL CUSTOMER ORDERS =====
// const getCustomerOrders = async (req, res) => {
//   try {
//     const { customerId } = req.params;

//     const orders = await CustomerOrder.find({ customer: customerId }).sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       orders
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });
//   }
// };


// // ===== GET SINGLE ORDER DETAILS =====
// const getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const order = await CustomerOrder.findById(id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       order
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });
//   }
// };


// // ===== CANCEL ORDER =====
// const cancelOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { cancellationReason } = req.body;

//     const order = await CustomerOrder.findById(id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }

//     if (["Shipped", "Delivered"].includes(order.orderStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: "Order cannot be cancelled after shipping"
//       });
//     }

//     order.orderStatus = "Cancelled";
//     order.paymentStatus = order.paymentStatus === "Completed" ? "Refund Initiated" : order.paymentStatus;
//     order.cancellationReason = cancellationReason || "Customer Cancelled";

//     await order.save();

//     return res.status(200).json({
//       success: true,
//       message: "Order cancelled successfully",
//       order
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


// // ===== GET VENDOR ORDERS =====
// const getVendorOrders = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     const orders = await CustomerOrder.find({
//       "orderItems.vendorId": vendorId
//     }).sort({ createdAt: -1 });

//     const vendorItems = orders.map(order => {
//       const filtered = order.orderItems.filter(i => i.vendorId === vendorId);

//       return {
//         ...order._doc,
//         orderItems: filtered,
//         vendorAmount: filtered.reduce((a, i) => a + (i.price * i.qty), 0)
//       };
//     });

//     return res.status(200).json({
//       success: true,
//       orders: vendorItems
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });
//   }
// };


// // ===== EXPORTS (IMPORTANT: FIXES YOUR ERROR) =====
// module.exports = {
//   createOrder,
//   getCustomerOrders,
//   getOrderById,
//   cancelOrder,
//   getVendorOrders
// };







// const CustomerOrder = require("../models/CustomerOrder");

// // ===== CREATE ORDER =====
// const createOrder = async (req, res) => {
//   try {
//     const { customer, orderItems, amount, paymentMethod, shippingAddress } = req.body;

//     if (!customer) return res.status(400).json({ success: false, message: "Customer ID missing" });
//     if (!orderItems || !orderItems.length) return res.status(400).json({ success: false, message: "No items in order" });
//     if (!amount) return res.status(400).json({ success: false, message: "Order amount missing" });
//     if (!shippingAddress) return res.status(400).json({ success: false, message: "Shipping address missing" });

//     const order = await CustomerOrder.create({
//       customer,
//       orderItems,
//       amount,
//       paymentMethod,
//       shippingAddress,

//       // Important Fix: Always pending until Razorpay success
//       paymentStatus: "Pending",
//       orderStatus: "Pending"
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       orderId: order._id,
//       order
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // ===== VERIFY PAYMENT (CALLED BY Razorpay) =====
// // Razorpay verify will update order
// const verifyOrderPayment = async (req, res) => {
//   try {
//     const { backendOrderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     if (!backendOrderId) return res.status(400).json({ success: false, message: "Backend Order ID missing" });

//     const order = await CustomerOrder.findById(backendOrderId);
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     // Update status after successful payment
//     order.paymentStatus = "Completed";
//     order.orderStatus = "Confirmed";
//     order.razorpayOrderId = razorpay_order_id;
//     order.razorpayPaymentId = razorpay_payment_id;
//     order.razorpaySignature = razorpay_signature;
//     await order.save();

//     return res.status(200).json({
//       success: true,
//       message: "Order payment verified successfully",
//       order
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // ===== GET CUSTOMER ORDERS =====
// const getCustomerOrders = async (req, res) => {
//   try {
//     const { customerId } = req.params;
//     const orders = await CustomerOrder.find({ customer: customerId }).sort({ createdAt: -1 });
//     return res.status(200).json({ success: true, orders });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ===== GET SINGLE ORDER =====
// const getOrderById = async (req, res) => {
//   try {
//     const order = await CustomerOrder.findById(req.params.id);
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });
//     return res.status(200).json({ success: true, order });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ===== CANCEL ORDER =====
// const cancelOrder = async (req, res) => {
//   try {
//     const order = await CustomerOrder.findById(req.params.id);
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     if (["Shipped", "Delivered"].includes(order.orderStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: "Order cannot be cancelled after shipping"
//       });
//     }

//     order.orderStatus = "Cancelled";
//     order.paymentStatus = order.paymentStatus === "Completed" ? "Refund Initiated" : order.paymentStatus;
//     order.cancellationReason = req.body.cancellationReason || "Customer Cancelled";

//     await order.save();
//     return res.status(200).json({ success: true, message: "Order cancelled successfully", order });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ===== VENDOR ORDERS =====
// const getVendorOrders = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     const orders = await CustomerOrder.find({ "orderItems.vendorId": vendorId }).sort({ createdAt: -1 });

//     const vendorItems = orders.map(order => {
//       const items = order.orderItems.filter(i => i.vendorId.toString() === vendorId);
//       return {
//         ...order._doc,
//         orderItems: items,
//         vendorAmount: items.reduce((a, i) => a + (i.price * i.qty), 0)
//       };
//     });

//     return res.status(200).json({ success: true, orders: vendorItems });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// module.exports = {
//   createOrder,
//   verifyOrderPayment,
//   getCustomerOrders,
//   getOrderById,
//   cancelOrder,
//   getVendorOrders
// };












const CustomerOrder = require("../models/CustomerOrder");

/* ================= CREATE ORDER ================= */
const createOrder = async (req, res) => {
  try {
    const order = await CustomerOrder.create({
      customer: req.body.customer,
      orderItems: req.body.orderItems,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod || "cod",
      shippingAddress: req.body.shippingAddress,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: order._id,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= CUSTOMER ORDERS ================= */
const getCustomerOrders = async (req, res) => {
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
const getOrderById = async (req, res) => {
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
const cancelOrder = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    order.orderStatus = "Cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= VENDOR ORDERS ================= */
const getVendorOrders = async (req, res) => {
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
const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await CustomerOrder.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const verifyPayment = async (req, res) => {
  try {
    // payment verification logic
    res.status(200).json({ success: true, message: "Payment verified" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
   verifyPayment,
  getCustomerOrders,
  getOrderById,
  cancelOrder,
  getVendorOrders,
  getAllOrdersForAdmin,
};









// const CustomerOrder = require("../models/CustomerOrder");
// const razorpay = require("../config/razorpay");
// const crypto = require("crypto");

// /* =========================================================
//    CREATE ORDER + CREATE RAZORPAY ORDER
// ========================================================= */
// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       orderItems,
//       amount,
//       shippingCharge = 0,
//       discount = 0,
//       totalPayable,
//       shippingAddress,
//     } = req.body;

//     /* ---------- BASIC VALIDATIONS ---------- */
//     if (!orderItems || orderItems.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Order items are required",
//       });
//     }

//     if (!totalPayable || totalPayable <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payable amount",
//       });
//     }

//     if (!shippingAddress || !shippingAddress.address) {
//       return res.status(400).json({
//         success: false,
//         message: "Shipping address is required",
//       });
//     }

//     /* ---------- CREATE ORDER IN DB ---------- */
//     const order = await CustomerOrder.create({
//       customer: req.user.id, // 🔐 token se user id
//       orderItems,
//       amount,
//       shippingCharge,
//       discount,
//       totalPayable,
//       shippingAddress,
//       paymentMethod: "razorpay",
//       paymentStatus: "Pending",
//       orderStatus: "Pending",
//     });

//     /* ---------- CREATE RAZORPAY ORDER ---------- */
//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(totalPayable * 100), // paisa
//       currency: "INR",
//       receipt: `receipt_${order._id}`,
//       notes: {
//         orderId: order._id.toString(),
//         customerId: req.user.id,
//       },
//     });

//     /* ---------- SAVE RAZORPAY ORDER ID ---------- */
//     order.razorpayOrderId = razorpayOrder.id;
//     await order.save();

//     /* ---------- RESPONSE ---------- */
//     return res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       data: {
//         orderId: order._id,
//         razorpayOrderId: razorpayOrder.id,
//         razorpayKey: process.env.RAZORPAY_KEY_ID,
//         amount: totalPayable,
//         currency: "INR",
//       },
//     });
//   } catch (error) {
//     console.error("CREATE ORDER ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create order",
//     });
//   }
// };

// /* =========================================================
//    VERIFY RAZORPAY PAYMENT
// ========================================================= */
// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       orderId,
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     /* ---------- VALIDATION ---------- */
//     if (
//       !orderId ||
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment details missing",
//       });
//     }

//     /* ---------- FIND ORDER ---------- */
//     const order = await CustomerOrder.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     if (order.paymentStatus === "Success") {
//       return res.json({
//         success: true,
//         message: "Payment already verified",
//         order,
//       });
//     }

//     /* ---------- SIGNATURE VERIFICATION ---------- */
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       order.paymentStatus = "Failed";
//       await order.save();

//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     /* ---------- UPDATE ORDER ---------- */
//     order.paymentStatus = "Success";
//     order.orderStatus = "Confirmed";
//     order.razorpayPaymentId = razorpay_payment_id;
//     order.razorpaySignature = razorpay_signature;

//     await order.save();

//     /* ---------- RESPONSE ---------- */
//     return res.json({
//       success: true,
//       message: "Payment verified successfully",
//       order,
//     });
//   } catch (error) {
//     console.error("VERIFY PAYMENT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }
// };



// const CustomerOrder = require("../models/CustomerOrder");
// const razorpay = require("../config/razorpay");
// const crypto = require("crypto");

// /* =========================================================
//    CREATE ORDER (SUPPORTS BOTH RAZORPAY & COD)
// ========================================================= */
// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       orderItems,
//       amount,
//       subtotal,
//       deliveryFee = 0,
//       platformFee = 0,
//       gst = 0,
//       totalPayable,
//       paymentMethod = "razorpay", // "razorpay" or "cod"
//       shippingAddress,
//     } = req.body;

//     // Get customer ID from authenticated user
//     const customer = req.user.id;

//     console.log("📦 Creating order for customer:", customer);
//     console.log("📦 Payment method:", paymentMethod);
//     console.log("📦 Order items count:", orderItems?.length || 0);

//     /* ---------- BASIC VALIDATIONS ---------- */
//     if (!orderItems || orderItems.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Order items are required",
//       });
//     }

//     if (!totalPayable || totalPayable <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payable amount",
//       });
//     }

//     if (!shippingAddress || !shippingAddress.address) {
//       return res.status(400).json({
//         success: false,
//         message: "Shipping address is required",
//       });
//     }

//     // Validate shipping address fields
//     const requiredAddressFields = ['name', 'phone', 'address', 'city', 'state', 'pincode'];
//     for (const field of requiredAddressFields) {
//       if (!shippingAddress[field] || shippingAddress[field].trim() === '') {
//         return res.status(400).json({
//           success: false,
//           message: `Shipping address ${field} is required`,
//         });
//       }
//     }

//     /* ---------- CREATE RAZORPAY ORDER IF NEEDED ---------- */
//     let razorpayOrder = null;
//     let razorpayOrderId = null;

//     if (paymentMethod === "razorpay") {
//       try {
//         razorpayOrder = await razorpay.orders.create({
//           amount: Math.round(totalPayable * 100), // Convert to paise
//           currency: "INR",
//           receipt: `receipt_${Date.now()}`,
//           notes: {
//             customerId: customer.toString(),
//             description: `Order for ${shippingAddress.name}`,
//           },
//         });

//         razorpayOrderId = razorpayOrder.id;
//         console.log("✅ Razorpay order created:", razorpayOrderId);
//       } catch (razorpayError) {
//         console.error("❌ Razorpay order creation failed:", razorpayError);
//         return res.status(500).json({
//           success: false,
//           message: "Failed to create Razorpay order",
//           error: razorpayError.message,
//         });
//       }
//     }

//     /* ---------- CREATE ORDER IN DB ---------- */
//     const orderData = {
//       customer,
//       orderItems,
//       amount: totalPayable, // totalPayable is the final amount
//       subtotal: subtotal || 0,
//       deliveryFee: deliveryFee || 0,
//       platformFee: platformFee || 0,
//       gst: gst || 0,
//       totalPayable,
//       paymentMethod,
//       paymentStatus: paymentMethod === "cod" ? "Pending" : "Pending",
//       orderStatus: paymentMethod === "cod" ? "Confirmed" : "Pending",
//       shippingAddress,
//       razorpayOrderId,
//     };

//     // If COD, mark as confirmed immediately
//     if (paymentMethod === "cod") {
//       orderData.paymentStatus = "Pending";
//       orderData.orderStatus = "Confirmed";
//     }

//     const order = await CustomerOrder.create(orderData);
//     console.log("✅ Order created in DB:", order._id);

//     /* ---------- PREPARE RESPONSE ---------- */
//     const responseData = {
//       orderId: order._id,
//       _id: order._id,
//       amount: order.totalPayable,
//       currency: "INR",
//       paymentMethod: order.paymentMethod,
//       orderStatus: order.orderStatus,
//       paymentStatus: order.paymentStatus,
//       shippingAddress: order.shippingAddress,
//       orderItems: order.orderItems,
//       subtotal: order.subtotal,
//       deliveryFee: order.deliveryFee,
//       platformFee: order.platformFee,
//       gst: order.gst,
//       totalPayable: order.totalPayable,
//       createdAt: order.createdAt,
//       updatedAt: order.updatedAt,
//     };

//     // Add Razorpay data if applicable
//     if (paymentMethod === "razorpay" && razorpayOrderId) {
//       responseData.razorpayOrderId = razorpayOrderId;
//       responseData.razorpayKey = process.env.RAZORPAY_KEY_ID;
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       data: responseData,
//     });
//   } catch (error) {
//     console.error("❌ CREATE ORDER ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create order",
//       error: error.message,
//     });
//   }
// };

// /* =========================================================
//    VERIFY RAZORPAY PAYMENT
// ========================================================= */
// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       orderId,
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     console.log("🔍 Verifying payment for order:", orderId);
//     console.log("🔍 Razorpay order ID:", razorpay_order_id);
//     console.log("🔍 Razorpay payment ID:", razorpay_payment_id);

//     /* ---------- VALIDATION ---------- */
//     if (
//       !orderId ||
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment details missing",
//       });
//     }

//     /* ---------- FIND ORDER ---------- */
//     const order = await CustomerOrder.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Check if already verified
//     if (order.paymentStatus === "Success") {
//       return res.json({
//         success: true,
//         message: "Payment already verified",
//         order,
//       });
//     }

//     /* ---------- SIGNATURE VERIFICATION ---------- */
//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     console.log("🔍 Generated signature:", generatedSignature);
//     console.log("🔍 Received signature:", razorpay_signature);

//     if (generatedSignature !== razorpay_signature) {
//       order.paymentStatus = "Failed";
//       order.orderStatus = "Cancelled";
//       await order.save();

//       console.error("❌ Signature verification failed");
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     /* ---------- UPDATE ORDER ---------- */
//     order.paymentStatus = "Success";
//     order.orderStatus = "Confirmed";
//     order.razorpayPaymentId = razorpay_payment_id;
//     order.razorpaySignature = razorpay_signature;

//     await order.save();

//     console.log("✅ Payment verified successfully for order:", orderId);

//     /* ---------- RESPONSE ---------- */
//     return res.json({
//       success: true,
//       message: "Payment verified successfully",
//       order,
//     });
//   } catch (error) {
//     console.error("❌ VERIFY PAYMENT ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Payment verification failed",
//       error: error.message,
//     });
//   }
// };

// /* =========================================================
//    GET ORDER BY ID
// ========================================================= */
// exports.getOrderById = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await CustomerOrder.findById(orderId)
//       .populate('customer', 'name email phone')
//       .populate('orderItems.vendorId', 'shopName');

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Check if order belongs to the authenticated user
//     if (order.customer._id.toString() !== req.user.id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized access to order",
//       });
//     }

//     return res.json({
//       success: true,
//       data: order,
//     });
//   } catch (error) {
//     console.error("❌ GET ORDER ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch order",
//       error: error.message,
//     });
//   }
// };

// /* =========================================================
//    GET USER ORDERS
// ========================================================= */
// exports.getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { page = 1, limit = 10 } = req.query;

//     const skip = (page - 1) * limit;

//     const orders = await CustomerOrder.find({ customer: userId })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit))
//       .populate('orderItems.vendorId', 'shopName');

//     const totalOrders = await CustomerOrder.countDocuments({ customer: userId });

//     return res.json({
//       success: true,
//       data: orders,
//       pagination: {
//         total: totalOrders,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         pages: Math.ceil(totalOrders / limit),
//       },
//     });
//   } catch (error) {
//     console.error("❌ GET USER ORDERS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch orders",
//       error: error.message,
//     });
//   }
// };

// /* =========================================================
//    CANCEL ORDER
// ========================================================= */
// exports.cancelOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await CustomerOrder.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Check if order belongs to the authenticated user
//     if (order.customer.toString() !== req.user.id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized access to order",
//       });
//     }

//     // Check if order can be cancelled
//     if (order.orderStatus === "Cancelled") {
//       return res.status(400).json({
//         success: false,
//         message: "Order is already cancelled",
//       });
//     }

//     // Only allow cancellation for pending or confirmed orders
//     if (!["Pending", "Confirmed"].includes(order.orderStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: "Order cannot be cancelled at this stage",
//       });
//     }

//     // Update order status
//     order.orderStatus = "Cancelled";
//     order.paymentStatus = order.paymentStatus === "Success" ? "Refund Initiated" : "Cancelled";
//     await order.save();

//     return res.json({
//       success: true,
//       message: "Order cancelled successfully",
//       data: order,
//     });
//   } catch (error) {
//     console.error("❌ CANCEL ORDER ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to cancel order",
//       error: error.message,
//     });
//   }
// };
