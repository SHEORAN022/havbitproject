// // const Order = require("../models/order");

// // // GET ORDERS FOR VENDOR
// // exports.getVendorOrders = async (req, res) => {
// //   try {
// //     const vendorId = req.params.vendorId;

// //     const orders = await Order.find()
// //       .populate("user", "name email")
// //       .populate("products.product", "name price image vendorId");

// //     const vendorOrders = orders
// //       .map(order => {
// //         const vendorProducts = order.products.filter(
// //           p => p.product.vendorId.toString() === vendorId
// //         );
// //         if (vendorProducts.length > 0) {
// //           return { ...order._doc, products: vendorProducts };
// //         }
// //         return null;
// //       })
// //       .filter(o => o !== null);

// //     res.json(vendorOrders);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // UPDATE ORDER STATUS / TOTAL AMOUNT (Vendor only)
// // exports.updateVendorOrder = async (req, res) => {
// //   try {
// //     const { status, totalAmount } = req.body;
// //     const updated = await Order.findByIdAndUpdate(
// //       req.params.id,
// //       { status, totalAmount },
// //       { new: true }
// //     )
// //       .populate("user", "name email")
// //       .populate("products.product", "name price image vendorId");

// //     res.json(updated);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // DELETE VENDOR PRODUCTS FROM ORDER
// // exports.deleteVendorOrder = async (req, res) => {
// //   try {
// //     const vendorId = req.params.vendorId;
// //     const order = await Order.findById(req.params.id).populate(
// //       "products.product",
// //       "vendorId"
// //     );

// //     if (!order) return res.status(404).json({ message: "Order not found" });

// //     order.products = order.products.filter(
// //       p => p.product.vendorId.toString() !== vendorId
// //     );

// //     await order.save();
// //     res.json({ message: "Vendor products removed from order" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };




// // const VendorOrder = require("../models/VendorOrder");

// // // GET all orders (admin)
// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await VendorOrder.find()
// //       .populate("user", "name email")
// //       .populate("products.product", "name price image vendorId");
// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // GET vendor orders
// // exports.getVendorOrders = async (req, res) => {
// //   try {
// //     const vendorId = req.params.vendorId;
// //     const orders = await VendorOrder.find()
// //       .populate("user", "name email")
// //       .populate("products.product", "name price image vendorId");

// //     const vendorOrders = orders
// //       .map(order => {
// //         const vendorProducts = order.products.filter(
// //           p => p.product.vendorId.toString() === vendorId
// //         );
// //         if (vendorProducts.length > 0) {
// //           return { ...order._doc, products: vendorProducts };
// //         }
// //         return null;
// //       })
// //       .filter(o => o !== null);

// //     res.json(vendorOrders);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // CREATE order
// // exports.createOrder = async (req, res) => {
// //   try {
// //     const order = new VendorOrder(req.body);
// //     await order.save();
// //     res.status(201).json({ success: true, order });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // UPDATE order
// // exports.updateOrder = async (req, res) => {
// //   try {
// //     const { status, totalAmount } = req.body;
// //     const updated = await VendorOrder.findByIdAndUpdate(
// //       req.params.id,
// //       { status, totalAmount },
// //       { new: true }
// //     )
// //       .populate("user", "name email")
// //       .populate("products.product", "name price image vendorId");

// //     res.json(updated);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // DELETE order
// // exports.deleteOrder = async (req, res) => {
// //   try {
// //     await VendorOrder.findByIdAndDelete(req.params.id);
// //     res.json({ message: "Order Deleted" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };



// const VendorOrder = require("../models/VendorOrder");

// // Vendor: Get only vendor's orders
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const vendorId = req.params.vendorId;
//     const orders = await VendorOrder.find()
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

// // Create order
// exports.createOrder = async (req, res) => {
//   try {
//     const order = new VendorOrder(req.body);
//     await order.save();
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update order
// exports.updateOrder = async (req, res) => {
//   try {
//     const updated = await VendorOrder.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     )
//     .populate("user", "name email")
//     .populate("products.product", "name price image vendorId");

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete order
// exports.deleteOrder = async (req, res) => {
//   try {
//     await VendorOrder.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const VendorOrder = require("../models/VendorOrder");

/* =========================
   CREATE ORDER (WEBSITE / ADMIN)
========================= */
exports.createOrder = async (req, res) => {
  try {
    const { vendor, user, products, totalAmount, status } = req.body;

    if (!vendor || !user || !products || products.length === 0) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const order = await VendorOrder.create({
      vendor,
      user,
      products,
      totalAmount,
      status,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET ALL ORDERS (VENDOR PANEL)
========================= */
exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await VendorOrder.find({
      vendor: req.vendor._id,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET ORDER BY ID
========================= */
exports.getOrderById = async (req, res) => {
  try {
    const order = await VendorOrder.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    }).populate("user", "name");

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE ORDER
========================= */
exports.updateOrder = async (req, res) => {
  try {
    const order = await VendorOrder.findOneAndUpdate(
      { _id: req.params.id, vendor: req.vendor._id },
      req.body,
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   DELETE ORDER
========================= */
exports.deleteOrder = async (req, res) => {
  try {
    const order = await VendorOrder.findOneAndDelete({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
