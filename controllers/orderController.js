// const Order = require("../models/order");

// // CREATE ORDER
// exports.createOrder = async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET ALL ORDERS
// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("user", "name email")
//       .populate("products.product", "name price");

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET SINGLE ORDER
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate("user", "name email")
//       .populate("products.product", "name price");

//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE ORDER
// exports.updateOrder = async (req, res) => {
//   try {
//     const { status, totalAmount } = req.body;

//     const updated = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status, totalAmount },
//       { new: true }
//     )
//       .populate("user", "name email")
//       .populate("products.product", "name price image");

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE ORDER
// exports.deleteOrder = async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET FULL ORDER HISTORY
// exports.getFullHistory = async (req, res) => {
//   try {
//     const history = await Order.find()
//       .populate("user", "name email")
//       .populate("cancelledBy", "name email")
//       .populate("products.product", "name price image")
//       .sort({ orderedAt: -1 }); // latest first

//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };









// const Order = require("../models/order");

// // GET ALL ORDERS (ADMIN)
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

// // GET VENDOR ORDERS
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const vendorId = req.params.vendorId;
//     const orders = await Order.find()
//       .populate("user", "name email")
//       .populate("products.product", "name price image vendorId");

//     // Filter products to vendor only
//     const vendorOrders = orders
//       .map(order => {
//         const vendorProducts = order.products.filter(p => p.product.vendorId.toString() === vendorId);
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

// // UPDATE ORDER
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

// // DELETE ORDER
// exports.deleteOrder = async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };








const Order = require("../models/order");

// ==================== ADMIN: GET ALL ORDERS ====================
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price image vendorId");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== VENDOR: GET ORDERS ====================
exports.getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price image vendorId");

    const vendorOrders = orders
      .map(order => {
        const vendorProducts = order.products.filter(
          p => p.product.vendorId.toString() === vendorId
        );
        if (vendorProducts.length > 0) {
          return { ...order._doc, products: vendorProducts };
        }
        return null;
      })
      .filter(o => o !== null);

    res.json(vendorOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== UPDATE ORDER ====================
exports.updateOrder = async (req, res) => {
  try {
    const { status, totalAmount } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status, totalAmount },
      { new: true }
    )
      .populate("user", "name email")
      .populate("products.product", "name price image vendorId");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== DELETE ORDER ====================
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== FULL ORDER HISTORY (ADMIN) ====================
exports.getOrderHistory = async (req, res) => {
  try {
    const history = await Order.find()
      .populate("user", "name email")
      .populate("cancelledBy", "name email")
      .populate("products.product", "name price image vendorId")
      .sort({ orderedAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
