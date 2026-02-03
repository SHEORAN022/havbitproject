




//   // controllers/vendorOrderController.js
// const VendorOrder = require("../models/VendorOrder");

// /* ================= GET ALL VENDOR ORDERS ================= */
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;

//     const orders = await VendorOrder.find({ vendor: vendorId })
//       .populate("customer", "name email phone")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       orders,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= GET SINGLE ORDER ================= */
// exports.getVendorOrderById = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;

//     const order = await VendorOrder.findOne({
//       _id: req.params.id,
//       vendor: vendorId,
//     }).populate("customer", "name email phone");

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     res.json({ success: true, order });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= UPDATE ORDER STATUS ================= */
// exports.updateVendorOrderStatus = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;
//     const { status, carrier, trackingNumber, trackingUrl } = req.body;

//     const allowed = [
//       "confirmed",
//       "processing",
//       "shipped",
//       "delivered",
//       "cancelled",
//     ];
//     if (!allowed.includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const order = await VendorOrder.findOne({
//       _id: req.params.id,
//       vendor: vendorId,
//     });

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     order.orderStatus = status;

//     if (status === "shipped") {
//       order.shipping = { carrier, trackingNumber, trackingUrl };
//     }

//     if (status === "delivered") {
//       order.deliveredAt = new Date();
//     }

//     if (status === "cancelled") {
//       order.cancelledAt = new Date();
//     }

//     await order.save();

//     res.json({ success: true, message: "Order updated", order });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= VENDOR STATS ================= */
// exports.getVendorOrderStats = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;

//     const orders = await VendorOrder.find({ vendor: vendorId });

//     const stats = {
//       totalOrders: orders.length,
//       totalRevenue: orders.reduce((s, o) => s + o.amount.final, 0),
//       byStatus: {
//         pending: 0,
//         confirmed: 0,
//         processing: 0,
//         shipped: 0,
//         delivered: 0,
//         cancelled: 0,
//       },
//     };

//     orders.forEach(o => stats.byStatus[o.orderStatus]++);






//   // controllers/vendorOrderController.js
// const VendorOrder = require("../models/VendorOrder");

// /* ================= GET ALL VENDOR ORDERS ================= */
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;

//     const orders = await VendorOrder.find({ vendor: vendorId })
//       .populate("customer", "name email phone")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       orders,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= GET SINGLE ORDER ================= */
// exports.getVendorOrderById = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;

//     const order = await VendorOrder.findOne({
//       _id: req.params.id,
//       vendor: vendorId,
//     }).populate("customer", "name email phone");

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     res.json({ success: true, order });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= UPDATE ORDER STATUS ================= */
// exports.updateVendorOrderStatus = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;
//     const { status, carrier, trackingNumber, trackingUrl } = req.body;

//     const allowed = [
//       "confirmed",
//       "processing",
//       "shipped",
//       "delivered",
//       "cancelled",
//     ];
//     if (!allowed.includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const order = await VendorOrder.findOne({
//       _id: req.params.id,
//       vendor: vendorId,
//     });

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     order.orderStatus = status;

//     if (status === "shipped") {
//       order.shipping = { carrier, trackingNumber, trackingUrl };
//     }

//     if (status === "delivered") {
//       order.deliveredAt = new Date();
//     }

//     if (status === "cancelled") {
//       order.cancelledAt = new Date();
//     }

//     await order.save();

//     res.json({ success: true, message: "Order updated", order });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= VENDOR STATS ================= */
// exports.getVendorOrderStats = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;

//     const orders = await VendorOrder.find({ vendor: vendorId });

//     const stats = {
//       totalOrders: orders.length,
//       totalRevenue: orders.reduce((s, o) => s + o.amount.final, 0),
//       byStatus: {
//         pending: 0,
//         confirmed: 0,
//         processing: 0,
//         shipped: 0,
//         delivered: 0,
//         cancelled: 0,
//       },
//     };

//     orders.forEach(o => stats.byStatus[o.orderStatus]++);

//     res.json({ success: true, stats });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// //=========single product 

// exports.getVendorSingleProduct = async(req,res)=> {

//   console.log("getSingleOrder===============lopgsssssssss");
//   console.log("Body======================", req.params);


//       const { orderId } = req.params;
//           // const vendorId = req..name;

//           if(!orderId){
//              return res.status(400).json({
//         success: false,
//         message: "orderId is required",
//       });
//           }

//           else{
//             const order = await VendorOrder.findOne({
//       orderId: orderId,
//       vendor: vendorId,
//     })
//       .populate("customer", "name email phone")
//       .lean();

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }
//        return res.status(200).json({
//       success: true,
//       data: order,
//     });

//           }

// }

// //     res.json({ success: true, stats });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };









const VendorOrder = require("../models/VendorOrder");

/* ================= GET ALL VENDOR ORDERS ================= */
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const orders = await VendorOrder.find({ vendor: vendorId })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET SINGLE VENDOR ORDER ================= */
exports.getVendorOrderById = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const order = await VendorOrder.findOne({
      _id: req.params.id,
      vendor: vendorId,
    }).populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE VENDOR ORDER STATUS ================= */
exports.updateVendorOrderStatus = async (req, res) => {
  try {
    const vendorId = req.vendor._id;
    const { orderStatus, tracking } = req.body;

    const allowedStatus = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await VendorOrder.findOne({
      _id: req.params.id,
      vendor: vendorId,
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.orderStatus = orderStatus;

    if (orderStatus === "Shipped" && tracking) {
      order.tracking = tracking;
    }

    if (orderStatus === "Delivered") {
      order.deliveredAt = new Date();
    }

    if (orderStatus === "Cancelled") {
      order.cancelledAt = new Date();
    }

    await order.save();

    res.json({ success: true, message: "Order updated", order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= VENDOR ORDER STATS ================= */
exports.getVendorOrderStats = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const orders = await VendorOrder.find({ vendor: vendorId });

    const stats = {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
      byStatus: {
        Pending: 0,
        Confirmed: 0,
        Processing: 0,
        Shipped: 0,
        Delivered: 0,
        Cancelled: 0,
      },
    };

    orders.forEach(o => {
      if (stats.byStatus[o.orderStatus] !== undefined) {
        stats.byStatus[o.orderStatus]++;
      }
    });

    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
