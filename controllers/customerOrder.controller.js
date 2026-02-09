



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



















































// // controllers/customerOrder.controller.js
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
//       razorpayOrderId,
//       razorpayPaymentId,
//       razorpaySignature
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

//     // Determine payment status
//     let paymentStatus = "Pending";
//     if (paymentMethod === "razorpay" && razorpayPaymentId) {
//       paymentStatus = "Success";
//     }

//     const order = await CustomerOrder.create({
//       customer,
//       orderItems,
//       amount,
//       shippingCharge,
//       discount,
//       totalPayable,
//       paymentMethod,
//       shippingAddress,
//       razorpayOrderId,
//       razorpayPaymentId,
//       razorpaySignature,
//       paymentStatus,
//       orderStatus: paymentStatus === "Success" ? "Confirmed" : "Pending",
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
//     order.paymentStatus = "Cancelled";
//     order.cancelledAt = new Date();
//     await order.save();

//     res.json({ success: true, message: "Order cancelled", order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* ================= UPDATE ORDER STATUS (WITH SHIPROCKET INTEGRATION) ================= */
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "orderStatus required" });
//     }

//     const order = await CustomerOrder.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Store previous status for comparison
//     const previousStatus = order.orderStatus;
    
//     // Update order status
//     order.orderStatus = orderStatus;
    
//     // ✅ AUTO-CREATE SHIPROCKET SHIPMENT WHEN ORDER IS CONFIRMED
//     if (orderStatus === 'Confirmed' && previousStatus !== 'Confirmed') {
//       // Set a flag to indicate shipment should be created
//       order.readyForShipping = true;
//       order.estimatedDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
      
//       // Update payment status for Razorpay orders
//       if (order.paymentMethod === 'razorpay' && order.paymentStatus === 'Pending') {
//         order.paymentStatus = 'Success';
//       }
//     }
    
//     // ✅ UPDATE DATES BASED ON STATUS
//     if (orderStatus === 'Processing') {
//       order.processingAt = new Date();
//     }
    
//     if (orderStatus === 'Shipped') {
//       order.shippedAt = new Date();
//       order.pickupScheduledDate = new Date();
//       order.isShipped = true;
//     }
    
//     if (orderStatus === 'Delivered') {
//       order.deliveredAt = new Date();
//       order.deliveredDate = new Date();
      
//       // Update payment status for COD orders
//       if (order.paymentMethod === 'cod') {
//         order.paymentStatus = 'Success';
//       }
//     }
    
//     if (orderStatus === 'Cancelled') {
//       order.cancelledAt = new Date();
//       order.paymentStatus = 'Cancelled';
//     }

//     await order.save();

//     res.json({ 
//       success: true,
//       message: "Order status updated successfully", 
//       order,
//       previousStatus,
//       newStatus: orderStatus
//     });
    
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
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

// /* ================= ADMIN: GET ALL ORDERS ================= */
// exports.getAllOrdersForAdmin = async (req, res) => {
//   try {
//     const orders = await CustomerOrder.find()
//       .populate('customer', 'name email phone')
//       .sort({ createdAt: -1 });
    
//     res.json({ success: true, orders });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= DELETE ORDER ================= */
// exports.deleteOrder = async (req, res) => {
//   try {
//     await CustomerOrder.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Order deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= GET MY ORDERS (LOGGED IN USER) ================= */
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

//     res.json({
//       success: true,
//       orders,
//       count: orders.length
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= GET ORDER BY SHIPROCKET ID ================= */
// exports.getOrderByShiprocketId = async (req, res) => {
//   try {
//     const { shiprocketOrderId } = req.params;
    
//     const order = await CustomerOrder.findOne({ shiprocketOrderId });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     res.json({
//       success: true,
//       order
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// /* ================= GET ORDERS BY AWB CODE ================= */
// exports.getOrdersByAwbCode = async (req, res) => {
//   try {
//     const { awbCode } = req.params;
    
//     const orders = await CustomerOrder.find({ awbCode });
    
//     res.json({
//       success: true,
//       orders,
//       count: orders.length
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };














































































const CustomerOrder = require("../models/CustomerOrder");
const { createShipment, trackShipment, getAWBLabel: getParcelxAWBLabel, checkPincode: checkParcelxPincode } = require("../parcelx/parcelx.service");

/* ================= CREATE ORDER WITH PARCELX INTEGRATION ================= */
exports.createOrder = async (req, res) => {
  try {
    const {
      customer,
      orderItems,
      shippingCharge = 0,
      discount = 0,
      paymentMethod,
      shippingAddress,
      couponCode,
      couponDiscount = 0
    } = req.body;

    if (!customer)
      return res.status(400).json({ success: false, message: "Customer required" });

    if (!orderItems || orderItems.length === 0)
      return res.status(400).json({ success: false, message: "Order items required" });

    /* 🔥 Calculate amount from order items */
    let amount = 0;
    let subtotal = 0;

    for (let item of orderItems) {
      if (!item.vendorId) {
        return res.status(400).json({
          success: false,
          message: "vendorId required in orderItems",
        });
      }
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      amount += itemTotal;
    }

    // Calculate delivery fee: free if subtotal > 299
    const calculatedShippingCharge = subtotal > 299 ? 0 : (shippingCharge || 29);
    const platformFee = 2;
    const gst = subtotal * 0.05;
    const totalBeforeDiscount = subtotal + calculatedShippingCharge + platformFee + gst;
    const totalPayable = totalBeforeDiscount - discount - couponDiscount;

    console.log("💰 Order Calculation:");
    console.log("- Subtotal:", subtotal);
    console.log("- Shipping:", calculatedShippingCharge);
    console.log("- Platform:", platformFee);
    console.log("- GST:", gst);
    console.log("- Total Before Discount:", totalBeforeDiscount);
    console.log("- Discounts:", { discount, couponDiscount });
    console.log("- Final Total:", totalPayable);

    /* 🔥 CREATE ORDER IN DATABASE FIRST */
    let order = await CustomerOrder.create({
      customer,
      orderItems,
      amount: subtotal,
      subtotal,
      shippingCharge: calculatedShippingCharge,
      platformFee,
      gst,
      discount,
      couponDiscount,
      couponCode,
      totalBeforeDiscount,
      totalPayable,
      paymentMethod,
      shippingAddress,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Pending',
      orderStatus: "Confirmed",
    });

    console.log("✅ Order created in DB:", order._id);

    /* ================= PARCELX SHIPMENT CREATION ================= */
    try {
      console.log("🚀 Creating ParcelX shipment for order:", order._id);
      
      const shipment = await createShipment(order);
      
      console.log("📦 ParcelX shipment response:", shipment);
      
      if (shipment && shipment.status === true && shipment.data) {
        // Update order with shipment details
        order.awbNumber = shipment.data.awb_number || null;
        order.courierName = shipment.data.courier_name || null;
        order.parcelxOrderId = shipment.data.order_id || null;
        order.shipmentData = shipment.data;
        order.orderStatus = "Processing";
        order.paymentStatus = paymentMethod === 'cod' ? 'Pending' : 'Pending';
        
        await order.save();
        
        console.log("✅ Order updated with AWB:", order.awbNumber);
        
        // Optionally: Get AWB label PDF
        if (order.awbNumber) {
          try {
            const label = await getParcelxAWBLabel(order.awbNumber);
            // Save label URL or base64 to order if needed
            order.awbLabel = `data:application/pdf;base64,${label.toString('base64')}`;
            await order.save();
          } catch (labelError) {
            console.log("⚠️ Could not fetch AWB label:", labelError.message);
          }
        }
      } else {
        console.error("❌ ParcelX shipment creation failed:", shipment);
      }
    } catch (shipmentError) {
      console.error("❌ ParcelX shipment creation error:", shipmentError.message);
      // Continue with order even if shipment fails
      // But still return success to user
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        _id: order._id,
        orderId: order._id,
        amount: order.amount,
        subtotal: order.subtotal,
        shippingCharge: order.shippingCharge,
        platformFee: order.platformFee,
        gst: order.gst,
        totalBeforeDiscount: order.totalBeforeDiscount,
        totalPayable: order.totalPayable,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        awbNumber: order.awbNumber,
        courierName: order.courierName,
        createdAt: order.createdAt,
        shippingAddress: order.shippingAddress,
        couponDiscount: order.couponDiscount,
        couponCode: order.couponCode
      },
    });

  } catch (error) {
    console.error("🔥 Order creation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= RAZORPAY PAYMENT SUCCESS ================= */
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = req.body;

    const order = await CustomerOrder.findById(orderId);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    // Update payment status
    order.paymentStatus = "Success";
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;

    /* 🔥 Create ParcelX shipment after payment success */
    if (!order.awbNumber) {
      try {
        console.log("🚀 Creating ParcelX shipment for Razorpay order:", order._id);
        const shipment = await createShipment(order);

        if (shipment && shipment.status === true && shipment.data) {
          order.awbNumber = shipment.data.awb_number || null;
          order.courierName = shipment.data.courier_name || null;
          order.parcelxOrderId = shipment.data.order_id || null;
          order.shipmentData = shipment.data;
          order.orderStatus = "Processing";
        }
      } catch (shipmentError) {
        console.error("Shipment creation failed:", shipmentError.message);
      }
    }

    await order.save();

    res.json({ 
      success: true, 
      message: "Payment verified & shipment created", 
      order 
    });

  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET ORDER WITH TRACKING ================= */
exports.getOrderById = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    // Get tracking info if AWB exists
    let trackingInfo = null;
    if (order.awbNumber) {
      try {
        trackingInfo = await trackShipment(order.awbNumber);
      } catch (trackError) {
        console.log("⚠️ Could not fetch tracking:", trackError.message);
      }
    }

    // Calculate totals for display if not already stored
    const subtotal = order.subtotal || order.orderItems.reduce((sum, item) => 
      sum + (parseFloat(item.price) || 0) * (parseInt(item.qty) || 1), 0
    );
    
    const deliveryFee = order.shippingCharge || (subtotal > 299 ? 0 : 29);
    const platformFee = order.platformFee || 2;
    const gst = order.gst || (subtotal * 0.05);
    const totalBeforeDiscount = order.totalBeforeDiscount || (subtotal + deliveryFee + platformFee + gst);
    const finalAmount = order.totalPayable || totalBeforeDiscount - (order.couponDiscount || 0) - (order.discount || 0);

    const orderWithDetails = {
      ...order.toObject(),
      calculatedTotals: {
        subtotal,
        deliveryFee,
        platformFee,
        gst,
        totalBeforeDiscount,
        discount: order.discount || 0,
        couponDiscount: order.couponDiscount || 0,
        finalAmount
      },
      trackingInfo,
      awbLink: order.awbNumber ? `https://app.parcelx.in/tracking/${order.awbNumber}` : null,
    };

    res.json({ success: true, order: orderWithDetails });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET AWB LABEL ================= */
exports.getAWBLabel = async (req, res) => {
  try {
    const { awb } = req.params;
    
    const pdfBuffer = await getParcelxAWBLabel(awb);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="AWB-${awb}.pdf"`
    });
    
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Get AWB label error:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= CHECK PINCODE SERVICEABILITY ================= */
exports.checkPincode = async (req, res) => {
  try {
    const { pincode } = req.query;
    
    if (!pincode) {
      return res.status(400).json({ success: false, message: "Pincode required" });
    }
    
    const data = await checkParcelxPincode(pincode);
    res.json(data);
  } catch (error) {
    console.error("Check pincode error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE ORDER FROM PARCELX WEBHOOK ================= */
exports.parcelxWebhook = async (req, res) => {
  try {
    const { awb, status, scan_datetime, location, remarks } = req.body;
    
    console.log("📦 ParcelX Webhook received:", req.body);
    
    // Find order by AWB number
    const order = await CustomerOrder.findOne({ awbNumber: awb });
    
    if (order) {
      // Update order status based on ParcelX webhook
      const statusMap = {
        'Pickup Pending': 'Confirmed',
        'In Transit': 'Shipped',
        'Out for Delivery': 'Shipped',
        'Delivered': 'Delivered',
        'RTO': 'Returned',
        'Lost': 'Lost'
      };
      
      if (statusMap[status]) {
        order.orderStatus = statusMap[status];
        
        if (status === 'Delivered') {
          order.deliveredAt = new Date(scan_datetime);
          if (order.paymentMethod === 'cod') {
            order.paymentStatus = 'Success';
          }
        }
        
        // Add tracking history
        if (!order.trackingHistory) {
          order.trackingHistory = [];
        }
        
        order.trackingHistory.push({
          status,
          location,
          datetime: new Date(scan_datetime),
          remarks
        });
        
        await order.save();
        
        console.log(`✅ Order ${order._id} updated to ${order.orderStatus}`);
      }
    }
    
    res.json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(500).json({ error: error.message });
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

    // Also cancel ParcelX shipment if AWB exists
    if (order.awbNumber) {
      try {
        const { cancelShipment } = require("../parcelx/parcelx.service");
        await cancelShipment(order.awbNumber);
        console.log("✅ ParcelX shipment cancelled for AWB:", order.awbNumber);
      } catch (cancelError) {
        console.error("❌ Failed to cancel ParcelX shipment:", cancelError.message);
      }
    }

    res.json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus)
      return res.status(400).json({ message: "orderStatus required" });

    const order = await CustomerOrder.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    const orders = await CustomerOrder.find().sort({ createdAt: -1 });
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

/* ================= MY ORDERS ================= */
exports.getMyOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const orders = await CustomerOrder.find({ customer: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
