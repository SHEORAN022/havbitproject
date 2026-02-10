




// const Order = require("../models/order");

// // ==================== ADMIN: GET ALL ORDERS ====================
// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("user", "name email")
//       .populate("products.product", "name price image vendorId");

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ==================== VENDOR: GET ORDERS ====================
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const vendorId = req.params.vendorId;

//     const orders = await Order.find()
//       .populate("user", "name email")
//       .populate("products.product", "name price image vendorId");

//     const vendorOrders = orders
//       .map(order => {
//         const vendorProducts = order.products.filter(
//           p => p.product.vendorId.toString() === vendorId
//         );
//         if (vendorProducts.length > 0) {
//           return { ...order._doc, products: vendorProducts };
//         }
//         return null;
//       })
//       .filter(o => o !== null);

//     res.json(vendorOrders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ==================== UPDATE ORDER ====================
// exports.updateOrder = async (req, res) => {
//   try {
//     const { status, totalAmount } = req.body;

//     const updated = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status, totalAmount },
//       { new: true }
//     )
//       .populate("user", "name email")
//       .populate("products.product", "name price image vendorId");

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ==================== DELETE ORDER ====================
// exports.deleteOrder = async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ==================== FULL ORDER HISTORY (ADMIN) ====================
// exports.getOrderHistory = async (req, res) => {
//   try {
//     const history = await Order.find()
//       .populate("user", "name email")
//       .populate("cancelledBy", "name email")
//       .populate("products.product", "name price image vendorId")
//       .sort({ orderedAt: -1 });

//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };





const mongoose = require("mongoose");
const CustomerOrder = require("../models/CustomerOrder");
const VendorOrder = require("../models/VendorOrder");
const Vendor = require("../models/Vendor");
const parcelxService = require("../services/parcelx.service");

/* ================= CREATE MULTI-VENDOR ORDER ================= */
exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const {
      customer,
      orderItems,
      shippingCharge = 0,
      discount = 0,
      couponDiscount = 0,
      couponCode,
      paymentMethod,
      shippingAddress,
      createShipmentForCOD = false
    } = req.body;

    // Validation
    if (!customer) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        success: false, 
        message: "Customer required" 
      });
    }

    if (!orderItems || orderItems.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        success: false, 
        message: "Order items required" 
      });
    }

    console.log("📦 Creating multi-vendor order with", orderItems.length, "items");

    /* 🔥 STEP 1: CALCULATE TOTALS & GROUP BY VENDOR */
    let subtotal = 0;
    const vendorGroups = {};
    
    for (let item of orderItems) {
      if (!item.vendorId) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "vendorId required in all order items",
        });
      }
      
      // Get vendor details
      const vendor = await Vendor.findById(item.vendorId).session(session);
      if (!vendor) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: `Vendor ${item.vendorId} not found`,
        });
      }
      
      const itemTotal = (parseFloat(item.price) || 0) * (parseInt(item.qty) || 1);
      subtotal += itemTotal;
      
      // Group by vendor
      const vendorId = item.vendorId.toString();
      if (!vendorGroups[vendorId]) {
        vendorGroups[vendorId] = {
          vendor: vendor,
          items: [],
          total: 0
        };
      }
      
      vendorGroups[vendorId].items.push({
        productId: item.productId,
        productName: item.productName || "Product",
        price: parseFloat(item.price) || 0,
        qty: parseInt(item.qty) || 1,
        image: item.image || "",
        category: item.category || "General",
        vendorId: item.vendorId,
        vendorName: vendor.shopName || vendor.name
      });
      
      vendorGroups[vendorId].total += itemTotal;
    }

    // Calculate fees
    const deliveryFee = subtotal > 299 ? 0 : (shippingCharge || 29);
    const platformFee = 2;
    const gst = subtotal * 0.05;
    const totalBeforeDiscount = subtotal + deliveryFee + platformFee + gst;
    const totalPayable = totalBeforeDiscount - discount - couponDiscount;

    console.log("💰 Order Calculation:");
    console.log("- Vendors:", Object.keys(vendorGroups).length);
    console.log("- Total Payable:", totalPayable);

    /* 🔥 STEP 2: CREATE MAIN CUSTOMER ORDER */
    const customerOrderData = {
      customer,
      orderItems,
      amount: subtotal,
      subtotal: subtotal,
      shippingCharge: deliveryFee,
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
      isSplitOrder: Object.keys(vendorGroups).length > 1
    };

    const order = await CustomerOrder.create([customerOrderData], { session });
    const savedOrder = order[0];
    
    console.log("✅ Main Customer Order created:", savedOrder._id);

    /* 🔥 STEP 3: CREATE SEPARATE VENDOR ORDERS */
    const vendorOrders = [];
    
    for (const [vendorId, vendorData] of Object.entries(vendorGroups)) {
      const vendorOrderData = {
        vendor: vendorId,
        user: customer,
        orderId: savedOrder._id,
        orderItems: vendorData.items,
        amount: vendorData.total,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Pending',
        orderStatus: "Confirmed",
        shippingAddress: shippingAddress,
        vendorDetails: {
          name: vendorData.vendor.shopName || vendorData.vendor.name,
          warehouseId: vendorData.vendor.parcelxWarehouseId,
          city: vendorData.vendor.warehouseAddress?.city,
          state: vendorData.vendor.warehouseAddress?.state,
          phone: vendorData.vendor.phone
        }
      };
      
      const vendorOrder = await VendorOrder.create([vendorOrderData], { session });
      vendorOrders.push(vendorOrder[0]);
    }
    
    console.log(`✅ Created ${vendorOrders.length} Vendor Orders`);

    /* 🔥 STEP 4: CREATE PARCELX SHIPMENTS FOR EACH VENDOR */
    const shipmentResults = [];
    
    // Check if we should create shipments
    const shouldCreateShipments = paymentMethod !== 'cod' || createShipmentForCOD === true;
    
    if (shouldCreateShipments) {
      console.log('🚀 Creating ParcelX shipments for vendors...');
      
      // Process each vendor shipment
      for (const [vendorId, vendorData] of Object.entries(vendorGroups)) {
        try {
          const vendor = vendorData.vendor;
          
          // Check if vendor has warehouse
          if (!vendor.parcelxWarehouseId) {
            console.log(`⚠️ Vendor ${vendor.shopName} has no warehouse. Skipping shipment.`);
            shipmentResults.push({
              vendorId: vendorId,
              vendorName: vendor.shopName || vendor.name,
              success: false,
              error: 'Vendor warehouse not setup'
            });
            continue;
          }
          
          // Create shipment in ParcelX
          const shipment = await parcelxService.createVendorShipment(
            vendorId,
            savedOrder,
            vendorData.items
          );
          
          if (shipment.success) {
            // Find vendor order
            const vendorOrder = vendorOrders.find(
              vo => vo.vendor.toString() === vendorId
            );
            
            if (vendorOrder) {
              // Update vendor order
              vendorOrder.tracking = {
                provider: shipment.courierName || 'ParcelX',
                trackingId: shipment.awbNumber,
                awbNumber: shipment.awbNumber,
                orderNumber: shipment.orderNumber,
                courierName: shipment.courierName,
                warehouseId: vendor.parcelxWarehouseId,
                estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                status: "Booked",
                parcelxData: shipment.fullResponse
              };
              
              vendorOrder.orderStatus = "Processing";
              await vendorOrder.save({ session });
              
              // Add to main order's vendor shipments
              savedOrder.vendorShipments.push({
                vendorId: vendorId,
                vendorName: vendor.shopName || vendor.name,
                awbNumber: shipment.awbNumber,
                courierName: shipment.courierName,
                parcelxOrderId: shipment.orderNumber,
                warehouseId: vendor.parcelxWarehouseId,
                warehouseCity: vendor.warehouseAddress?.city,
                status: "Booked",
                shipmentData: shipment.fullResponse,
                trackingHistory: [{
                  status: "Booked",
                  location: "",
                  datetime: new Date(),
                  remarks: "Shipment booked with ParcelX"
                }]
              });
              
              shipmentResults.push({
                vendorId: vendorId,
                vendorName: vendor.shopName || vendor.name,
                success: true,
                awbNumber: shipment.awbNumber,
                courierName: shipment.courierName,
                orderNumber: shipment.orderNumber,
                warehouseCity: vendor.warehouseAddress?.city
              });
              
              console.log(`✅ Shipment created for ${vendor.shopName}: ${shipment.awbNumber}`);
            }
          } else {
            shipmentResults.push({
              vendorId: vendorId,
              vendorName: vendor.shopName || vendor.name,
              success: false,
              error: shipment.error
            });
            
            console.log(`❌ Shipment failed for ${vendor.shopName}: ${shipment.error}`);
          }
        } catch (error) {
          console.error(`❌ Error creating shipment for vendor ${vendorId}:`, error);
          shipmentResults.push({
            vendorId: vendorId,
            success: false,
            error: error.message
          });
        }
      }
      
      // Update main order with shipment info
      if (savedOrder.vendorShipments.length > 0) {
        savedOrder.awbNumbers = savedOrder.vendorShipments.map(s => s.awbNumber).filter(Boolean);
        savedOrder.courierNames = savedOrder.vendorShipments.map(s => s.courierName).filter(Boolean);
        
        const successfulShipments = shipmentResults.filter(r => r.success);
        if (successfulShipments.length === vendorOrders.length) {
          savedOrder.orderStatus = "Processing";
        } else if (successfulShipments.length > 0) {
          savedOrder.orderStatus = "Partially Processed";
        }
      }
      
      await savedOrder.save({ session });
    }

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    /* 🔥 STEP 5: PREPARE RESPONSE */
    const responseData = {
      success: true,
      message: "Order created successfully",
      order: {
        _id: savedOrder._id,
        orderId: savedOrder.orderId,
        amount: savedOrder.totalPayable,
        paymentMethod: savedOrder.paymentMethod,
        paymentStatus: savedOrder.paymentStatus,
        orderStatus: savedOrder.orderStatus,
        shippingAddress: savedOrder.shippingAddress,
        createdAt: savedOrder.createdAt,
        isSplitOrder: savedOrder.isSplitOrder,
        vendorCount: Object.keys(vendorGroups).length,
        awbNumbers: savedOrder.awbNumbers || [],
        courierNames: savedOrder.courierNames || [],
        vendorShipments: savedOrder.vendorShipments || [],
        vendorOrders: vendorOrders.map(vo => ({
          _id: vo._id,
          vendorId: vo.vendor,
          vendorName: vo.vendorDetails?.name,
          amount: vo.amount,
          orderStatus: vo.orderStatus,
          tracking: vo.tracking
        })),
        shipmentResults: shipmentResults
      }
    };

    console.log("🎉 Multi-vendor order creation completed!");
    
    res.status(201).json(responseData);

  } catch (error) {
    // Rollback transaction on error
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    
    console.error("🔥 Order creation error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/* ================= GET ORDER BY ID ================= */
exports.getOrderById = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('orderItems.vendorId', 'shopName name warehouseAddress');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // Get vendor orders
    const vendorOrders = await VendorOrder.find({ orderId: order._id })
      .populate('vendor', 'shopName name phone');

    res.json({
      success: true,
      order: {
        ...order.toObject(),
        vendorOrders: vendorOrders
      }
    });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* ================= GET ORDER TRACKING ================= */
exports.getOrderTracking = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await CustomerOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }
    
    // Get tracking info for each vendor shipment
    const trackingPromises = order.vendorShipments.map(async (shipment) => {
      if (shipment.awbNumber) {
        const tracking = await parcelxService.trackShipment(shipment.awbNumber);
        return {
          vendorId: shipment.vendorId,
          vendorName: shipment.vendorName,
          awbNumber: shipment.awbNumber,
          courierName: shipment.courierName,
          warehouseCity: shipment.warehouseCity,
          currentStatus: shipment.status,
          tracking: tracking.success ? tracking.data : [],
          lastUpdate: tracking.currentStatus
        };
      }
      return null;
    });
    
    const trackingResults = (await Promise.all(trackingPromises)).filter(r => r !== null);
    
    res.json({
      success: true,
      order: {
        _id: order._id,
        orderId: order.orderId,
        orderStatus: order.orderStatus,
        isSplitOrder: order.isSplitOrder,
        vendorCount: order.vendorShipments.length
      },
      tracking: trackingResults
    });
    
  } catch (error) {
    console.error("Get order tracking error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* ================= GET CUSTOMER ORDERS ================= */
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find({
      customer: req.params.customerId,
    })
    .populate('customer', 'name email')
    .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      count: orders.length,
      orders 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* ================= CANCEL ORDER ================= */
exports.cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const order = await CustomerOrder.findById(req.params.id).session(session);

    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    if (order.orderStatus === "Cancelled") {
      await session.abortTransaction();
      session.endSession();
      return res.json({ 
        success: false, 
        message: "Order already cancelled" 
      });
    }

    // Cancel all vendor orders
    await VendorOrder.updateMany(
      { orderId: order._id },
      { 
        orderStatus: "Cancelled",
        cancelledAt: new Date()
      },
      { session }
    );

    // Update main order
    order.orderStatus = "Cancelled";
    order.cancelledAt = new Date();
    order.paymentStatus = order.paymentMethod === 'cod' ? 'Cancelled' : 'Refunded';
    
    await order.save({ session });

    // Cancel ParcelX shipments if they exist
    for (const shipment of order.vendorShipments) {
      if (shipment.awbNumber && shipment.status !== 'Cancelled') {
        try {
          await parcelxService.cancelShipment(shipment.awbNumber, 'Order cancelled by customer');
        } catch (error) {
          console.error(`Failed to cancel shipment ${shipment.awbNumber}:`, error);
        }
      }
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ 
      success: true, 
      message: "Order cancelled successfully", 
      order 
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* ================= PARCELX WEBHOOK ================= */
exports.parcelxWebhook = async (req, res) => {
  try {
    const { awb, status, scan_datetime, location, remarks, status_code } = req.body;
    
    console.log("📦 ParcelX Webhook received for AWB:", awb);
    
    // Find order with this AWB
    const order = await CustomerOrder.findOne({ 
      "vendorShipments.awbNumber": awb 
    });
    
    if (order) {
      // Update the specific vendor shipment
      const shipmentIndex = order.vendorShipments.findIndex(
        s => s.awbNumber === awb
      );
      
      if (shipmentIndex !== -1) {
        // Map ParcelX status to our status
        const statusMap = {
          '221': 'Booked',
          '222': 'Manifested',
          '223': 'In Transit',
          '228': 'Out for Delivery',
          '226': 'Delivered',
          '227': 'Cancelled',
          '229': 'RTO'
        };
        
        const newStatus = statusMap[status_code] || status;
        
        // Update shipment
        order.vendorShipments[shipmentIndex].status = newStatus;
        order.vendorShipments[shipmentIndex].trackingHistory.push({
          status: newStatus,
          location: location || '',
          datetime: new Date(scan_datetime || Date.now()),
          remarks: remarks || ''
        });
        
        if (newStatus === 'Delivered') {
          order.vendorShipments[shipmentIndex].deliveredAt = new Date();
        }
        
        // Update vendor order
        const vendorId = order.vendorShipments[shipmentIndex].vendorId;
        await VendorOrder.findOneAndUpdate(
          { 
            orderId: order._id,
            vendor: vendorId 
          },
          {
            'tracking.status': newStatus,
            orderStatus: newStatus === 'Delivered' ? 'Delivered' : 
                        newStatus === 'Cancelled' ? 'Cancelled' : 'Processing',
            ...(newStatus === 'Delivered' && { deliveredAt: new Date() })
          }
        );
        
        // Update overall order status
        order.updateOrderStatus();
        await order.save();
        
        console.log(`✅ Updated shipment ${awb} to ${newStatus}`);
      }
    }
    
    res.json({ 
      success: true, 
      message: "Webhook processed" 
    });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* ================= TRACK SPECIFIC AWB ================= */
exports.trackAWB = async (req, res) => {
  try {
    const { awb } = req.params;
    
    if (!awb) {
      return res.status(400).json({ 
        success: false, 
        message: "AWB number required" 
      });
    }
    
    // Get tracking from ParcelX
    const tracking = await parcelxService.trackShipment(awb);
    
    // Find which orders have this AWB
    const [vendorOrder, customerOrder] = await Promise.all([
      VendorOrder.findOne({ "tracking.awbNumber": awb })
        .populate('vendor', 'shopName name'),
      CustomerOrder.findOne({ awbNumbers: awb })
        .populate('customer', 'name')
    ]);
    
    res.json({
      success: tracking.success,
      awb: awb,
      tracking: tracking.data || [],
      currentStatus: tracking.currentStatus,
      orderInfo: customerOrder ? {
        orderId: customerOrder._id,
        orderStatus: customerOrder.orderStatus,
        customer: customerOrder.customer
      } : null,
      vendorInfo: vendorOrder ? {
        vendorOrderId: vendorOrder._id,
        vendor: vendorOrder.vendor
      } : null
    });
    
  } catch (error) {
    console.error("Track AWB error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* ================= CHECK PINCODE SERVICEABILITY ================= */
exports.checkPincode = async (req, res) => {
  try {
    const { pincode } = req.query;
    
    if (!pincode) {
      return res.status(400).json({ 
        success: false, 
        message: "Pincode required" 
      });
    }
    
    const result = await parcelxService.checkPincode(pincode);
    
    res.json(result);
  } catch (error) {
    console.error("Check pincode error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* ================= GET ALL ORDERS (ADMIN) ================= */
exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    
    const query = {};
    
    if (status && status !== 'all') {
      query.orderStatus = status;
    }
    
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'shippingAddress.name': { $regex: search, $options: 'i' } },
        { 'shippingAddress.phone': { $regex: search, $options: 'i' } },
        { awbNumbers: { $in: [search] } }
      ];
    }
    
    const orders = await CustomerOrder.find(query)
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await CustomerOrder.countDocuments(query);
    
    res.json({ 
      success: true, 
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};

/* ================= GET MY ORDERS (LOGGED IN USER) ================= */
exports.getMyOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized" 
      });
    }

    const orders = await CustomerOrder.find({ customer: req.user.id })
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      count: orders.length,
      orders 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({ 
        message: "orderStatus required" 
      });
    }

    const order = await CustomerOrder.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ 
        message: "Order not found" 
      });
    }

    res.json({ 
      success: true,
      message: "Order status updated", 
      order 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

/* ================= GET AWB LABEL ================= */
exports.getAWBLabel = async (req, res) => {
  try {
    const { awb } = req.params;
    
    if (!awb) {
      return res.status(400).json({ 
        success: false, 
        message: "AWB number required" 
      });
    }
    
    const result = await parcelxService.getLabel(awb);
    
    if (result.success) {
      res.set({
        'Content-Type': result.contentType,
        'Content-Disposition': `attachment; filename="${result.filename}"`
      });
      res.send(result.data);
    } else {
      res.status(400).json({ 
        success: false, 
        message: result.error 
      });
    }
  } catch (error) {
    console.error("Get AWB label error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

