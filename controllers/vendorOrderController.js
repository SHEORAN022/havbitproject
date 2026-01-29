

// const VendorOrder = require("../models/VendorOrder");

// const generateOrderId = () => {
//   return "HAV" + Date.now();
// };

// /* CREATE ORDER (Website + Admin) */
// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       vendor,
//       user,
//       orderItems,
//       amount,
//       paymentMethod,
//       paymentStatus,
//       orderStatus,
//       shippingAddress,
//     } = req.body;

//     if (!vendor || !user || !orderItems || orderItems.length === 0) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const order = await VendorOrder.create({
//       vendor,
//       user,
//       orderItems,
//       amount,
//       paymentMethod,
//       paymentStatus,
//       orderStatus,
//       shippingAddress,
//       orderId: generateOrderId(),
//     });

//     res.status(201).json({
//       success: true,
//       order,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* GET ALL ORDERS FOR VENDOR PANEL */
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const orders = await VendorOrder.find({ vendor: req.vendor._id })
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* GET ORDER BY ID */
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await VendorOrder.findOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     }).populate("user", "name email");

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     res.json({ success: true, order });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* UPDATE ORDER */
// exports.updateOrder = async (req, res) => {
//   try {
//     const order = await VendorOrder.findOneAndUpdate(
//       { _id: req.params.id, vendor: req.vendor._id },
//       req.body,
//       { new: true }
//     );

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     res.json({ success: true, order });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* DELETE ORDER */
// exports.deleteOrder = async (req, res) => {
//   try {
//     const order = await VendorOrder.findOneAndDelete({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!order) return res.status(404).json({ message: "Order not found" }); 

//     res.json({ success: true, message: "Order deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };   







// // controllers/vendorOrderController.js
// // const Order = require("../models/order");
// const VendorOrder = require("../models/VendorOrder");


// // ==================== VENDOR: GET ORDERS (Filtered by vendor products) ====================
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;
    
//     // Get all orders and filter those containing vendor's products
//     const orders = await Order.find()
//       .populate("user", "name email phone")
//       .populate("products.product", "name price image vendorId")
//       .sort({ createdAt: -1 });

//     // Filter orders to include only those with vendor's products
//     const vendorOrders = orders.filter(order => {
//       const vendorProducts = order.products.filter(
//         item => item.product && 
//         item.product.vendorId && 
//         item.product.vendorId.toString() === vendorId.toString()
//       );
//       return vendorProducts.length > 0;
//     }).map(order => {
//       // Create a new order object with only vendor's products
//       const vendorProducts = order.products.filter(
//         item => item.product && 
//         item.product.vendorId && 
//         item.product.vendorId.toString() === vendorId.toString()
//       );
      
//       // Calculate vendor's total from their products only
//       const vendorTotal = vendorProducts.reduce((sum, item) => {
//         return sum + (item.price * item.quantity);
//       }, 0);

//       return {
//         _id: order._id,
//         orderId: order.orderId,
//         user: order.user,
//         products: vendorProducts.map(item => ({
//           _id: item.product._id,
//           name: item.name || item.product.name,
//           price: item.price,
//           quantity: item.quantity,
//           image: item.image || item.product.image,
//           size: item.size,
//           color: item.color,
//           total: item.price * item.quantity
//         })),
//         vendorAmount: vendorTotal,
//         totalAmount: order.totalAmount,
//         finalAmount: order.finalAmount,
//         status: order.status,
//         payment: order.payment,
//         shippingAddress: order.shippingAddress,
//         shipping: order.shipping,
//         orderedAt: order.orderedAt,
//         expectedDelivery: order.expectedDelivery,
//         deliveredAt: order.deliveredAt,
//         notes: order.notes,
//         createdAt: order.createdAt,
//         updatedAt: order.updatedAt
//       };
//     });

//     res.json({ 
//       success: true, 
//       orders: vendorOrders,
//       total: vendorOrders.length
//     });
//   } catch (err) {
//     console.error("Get Vendor Orders Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================== GET SINGLE ORDER ====================
// exports.getOrderById = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;
//     const orderId = req.params.id;

//     const order = await Order.findById(orderId)
//       .populate("user", "name email phone")
//       .populate("products.product", "name price image vendorId category");

//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }

//     // Filter to show only vendor's products in this order
//     const vendorProducts = order.products.filter(
//       item => item.product && 
//       item.product.vendorId && 
//       item.product.vendorId.toString() === vendorId.toString()
//     );

//     if (vendorProducts.length === 0) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "This order doesn't contain your products" 
//       });
//     }

//     // Calculate vendor's total
//     const vendorTotal = vendorProducts.reduce((sum, item) => {
//       return sum + (item.price * item.quantity);
//     }, 0);

//     // Calculate vendor's share of shipping and taxes (proportional)
//     const vendorSharePercentage = (vendorTotal / order.totalAmount) * 100;
//     const vendorShipping = (order.shippingCharge * vendorSharePercentage) / 100;
//     const vendorTax = (order.taxAmount * vendorSharePercentage) / 100;
//     const vendorFinalAmount = vendorTotal + vendorShipping + vendorTax - ((order.discountAmount * vendorSharePercentage) / 100);

//     const orderDetails = {
//       _id: order._id,
//       orderId: order.orderId,
//       user: order.user,
//       products: vendorProducts.map(item => ({
//         _id: item.product._id,
//         name: item.name || item.product.name,
//         price: item.price,
//         quantity: item.quantity,
//         image: item.image || item.product.image,
//         size: item.size,
//         color: item.color,
//         category: item.product.category,
//         total: item.price * item.quantity
//       })),
//       vendorAmount: {
//         subtotal: vendorTotal,
//         shipping: vendorShipping,
//         tax: vendorTax,
//         discount: (order.discountAmount * vendorSharePercentage) / 100,
//         final: vendorFinalAmount
//       },
//       orderSummary: {
//         totalAmount: order.totalAmount,
//         shippingCharge: order.shippingCharge,
//         taxAmount: order.taxAmount,
//         discountAmount: order.discountAmount,
//         finalAmount: order.finalAmount
//       },
//       payment: order.payment,
//       shippingAddress: order.shippingAddress,
//       billingAddress: order.billingAddress,
//       shipping: order.shipping,
//       status: order.status,
//       notes: order.notes,
//       orderedAt: order.orderedAt,
//       expectedDelivery: order.expectedDelivery,
//       deliveredAt: order.deliveredAt,
//       createdAt: order.createdAt,
//       updatedAt: order.updatedAt
//     };

//     res.json({ success: true, order: orderDetails });
//   } catch (err) {
//     console.error("Get Order By ID Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================== UPDATE ORDER STATUS (Vendor can only update status of their products) ====================
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;
//     const orderId = req.params.id;
//     const { status, trackingNumber, carrier, notes } = req.body;

//     // Allowed status updates for vendor
//     const allowedStatuses = ['processing', 'shipped', 'cancelled'];
//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid status update for vendor" 
//       });
//     }

//     const order = await Order.findById(orderId)
//       .populate("products.product", "vendorId");

//     if (!order) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Order not found" 
//       });
//     }

//     // Check if vendor has products in this order
//     const hasVendorProducts = order.products.some(
//       item => item.product && 
//       item.product.vendorId && 
//       item.product.vendorId.toString() === vendorId.toString()
//     );

//     if (!hasVendorProducts) {
//       return res.status(403).json({ 
//         success: false, 
//         message: "You don't have permission to update this order" 
//       });
//     }

//     // Update order status
//     order.status = status;
    
//     // Update shipping info if provided
//     if (trackingNumber && carrier) {
//       order.shipping = {
//         carrier: carrier,
//         trackingNumber: trackingNumber,
//         trackingUrl: `https://www.${carrier.toLowerCase()}.com/track/${trackingNumber}`
//       };
//     }

//     // Add notes if provided
//     if (notes) {
//       order.notes = order.notes ? `${order.notes}\nVendor Update: ${notes}` : `Vendor Update: ${notes}`;
//     }

//     // If shipping status, set expected delivery (7 days from now)
//     if (status === 'shipped') {
//       const deliveryDate = new Date();
//       deliveryDate.setDate(deliveryDate.getDate() + 7);
//       order.expectedDelivery = deliveryDate;
//       order.shipping.trackingUrl = order.shipping.trackingUrl || 
//         `https://www.${order.shipping.carrier || 'tracking'}.com/track/${order.shipping.trackingNumber}`;
//     }

//     await order.save();

//     res.json({ 
//       success: true, 
//       message: "Order status updated successfully",
//       order: {
//         _id: order._id,
//         orderId: order.orderId,
//         status: order.status,
//         shipping: order.shipping,
//         expectedDelivery: order.expectedDelivery,
//         updatedAt: order.updatedAt
//       }
//     });
//   } catch (err) {
//     console.error("Update Order Status Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================== GET ORDER STATS FOR VENDOR ====================
// exports.getOrderStats = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;
    
//     const orders = await Order.find()
//       .populate("products.product", "vendorId");

//     let vendorOrders = orders.filter(order => 
//       order.products.some(
//         item => item.product && 
//         item.product.vendorId && 
//         item.product.vendorId.toString() === vendorId.toString()
//       )
//     );

//     const stats = {
//       totalOrders: vendorOrders.length,
//       totalRevenue: vendorOrders.reduce((sum, order) => {
//         const vendorProducts = order.products.filter(
//           item => item.product && 
//           item.product.vendorId && 
//           item.product.vendorId.toString() === vendorId.toString()
//         );
//         const vendorAmount = vendorProducts.reduce((s, item) => 
//           s + (item.price * item.quantity), 0
//         );
//         return sum + vendorAmount;
//       }, 0),
//       byStatus: {
//         pending: vendorOrders.filter(o => o.status === 'pending').length,
//         confirmed: vendorOrders.filter(o => o.status === 'confirmed').length,
//         processing: vendorOrders.filter(o => o.status === 'processing').length,
//         shipped: vendorOrders.filter(o => o.status === 'shipped').length,
//         delivered: vendorOrders.filter(o => o.status === 'delivered').length,
//         cancelled: vendorOrders.filter(o => o.status === 'cancelled').length,
//       },
//       recentOrders: vendorOrders.slice(0, 5).map(order => ({
//         _id: order._id,
//         orderId: order.orderId,
//         status: order.status,
//         finalAmount: order.finalAmount,
//         orderedAt: order.orderedAt
//       }))
//     };

//     res.json({ success: true, stats });
//   } catch (err) {
//     console.error("Get Order Stats Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };








const VendorOrder = require("../models/VendorOrder");

/* ================= GET ALL VENDOR ORDERS ================= */
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const orders = await VendorOrder.find({ vendor: vendorId })
      .populate("user", "name email phone")
      .populate("orderItems.productId", "name image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
      total: orders.length,
    });
  } catch (err) {
    console.error("Vendor Orders Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET SINGLE ORDER ================= */
exports.getOrderById = async (req, res) => {
  try {
    const vendorId = req.vendor._id;
    const orderId = req.params.id;

    const order = await VendorOrder.findOne({
      _id: orderId,
      vendor: vendorId,
    })
      .populate("user", "name email phone")
      .populate("orderItems.productId", "name image");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Get Order Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    const vendorId = req.vendor._id;
    const { status, tracking } = req.body;

    const allowed = ["Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await VendorOrder.findOneAndUpdate(
      { _id: req.params.id, vendor: vendorId },
      {
        orderStatus: status,
        tracking,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order updated",
      order,
    });
  } catch (err) {
    console.error("Update Order Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= VENDOR ORDER STATS ================= */
exports.getOrderStats = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const orders = await VendorOrder.find({ vendor: vendorId });

    const stats = {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
      byStatus: {
        Pending: orders.filter(o => o.orderStatus === "Pending").length,
        Processing: orders.filter(o => o.orderStatus === "Processing").length,
        Shipped: orders.filter(o => o.orderStatus === "Shipped").length,
        Delivered: orders.filter(o => o.orderStatus === "Delivered").length,
        Cancelled: orders.filter(o => o.orderStatus === "Cancelled").length,
      },
    };

    res.json({ success: true, stats });
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

