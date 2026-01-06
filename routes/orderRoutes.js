// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getOrders,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
//   getFullHistory
// } = require("../controllers/orderController");

// router.post("/create", createOrder);
// router.get("/", getOrders);
// router.get("/history/all", getFullHistory);  // <-- NEW
// router.get("/:id", getOrderById);
// router.put("/:id", updateOrder);
// router.delete("/:id", deleteOrder);

// module.exports = router;













// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
// const csv = require("fast-csv");

// const {
//   createOrder,
//   getOrders,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
//   getFullHistory
// } = require("../controllers/orderController");

// const order = require("../models/order");


// // const Order = require("../models/orderModel");

// // Multer upload config
// const upload = multer({ dest: "uploads/" });

// // ====================== IMPORT CSV ======================
// router.post("/import", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     let orders = [];

//     fs.createReadStream(req.file.path)
//       .pipe(csv.parse({ headers: true }))
//       .on("data", (row) => {
//         orders.push(row);
//       })
//       .on("end", async () => {
//         try {
//           for (let item of orders) {
//             await Order.create({
//               user: { name: item.User },
//               products: [
//                 {
//                   product: { name: item.Product },
//                   quantity: item.Quantity,
//                 },
//               ],
//               status: item.Status,
//               orderedAt: item.OrderedAt ? new Date(item.OrderedAt) : new Date(),
//               cancelledAt:
//                 item.CancelledAt && item.CancelledAt !== "-"
//                   ? new Date(item.CancelledAt)
//                   : null,
//               cancelledBy:
//                 item.CancelledBy && item.CancelledBy !== "-"
//                   ? { name: item.CancelledBy }
//                   : null,
//             });
//           }

//           fs.unlinkSync(req.file.path); // Delete temp file
//           res.json({ message: "Import Successful" });
//         } catch (e) {
//           console.log(e);
//           res.status(500).json({ message: "Database Insert Error" });
//         }
//       });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Import Failed" });
//   }
// });

// // ====================== EXISTING ROUTES ======================
// router.post("/create", createOrder);
// router.get("/", getOrders);
// router.get("/history/all", getFullHistory);
// router.get("/:id", getOrderById);
// router.put("/:id", updateOrder);
// router.delete("/:id", deleteOrder);

// module.exports = router;






const express = require("express");
const router = express.Router();
const {
  getOrders,
  getVendorOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// ADMIN ORDERS
router.get("/", getOrders);

// VENDOR ORDERS
router.get("/vendor/:vendorId", getVendorOrders);

// UPDATE ORDER
router.put("/:id", updateOrder);

// DELETE ORDER
router.delete("/:id", deleteOrder);

module.exports = router;
