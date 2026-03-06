// const Transaction = require("../models/Transaction");
// const CustomerOrder = require("../models/CustomerOrder");

// /* =====================================================
//    CREATE TRANSACTION (WHEN ORDER CREATED)
// ===================================================== */
// exports.createTransaction = async ({ order, customer }) => {
//   return await Transaction.create({
//     order: order._id,
//     amount: order.amount,
//     customer: {
//       id: customer.id,
//       email: customer.email,
//       phone: customer.phone,
//     },
//     status: "PENDING",
//   });
// };

// /* =====================================================
//    UPDATE TRANSACTION (AFTER PAYMENT SUCCESS / FAIL)
// ===================================================== */
// exports.updateTransaction = async ({
//   orderId,
//   cfOrderId,
//   cfPaymentId,
//   status,
//   rawPayload,
// }) => {
//   const tx = await Transaction.findOne({ order: orderId });

//   if (!tx) return null;

//   tx.cfOrderId = cfOrderId;
//   tx.cfPaymentId = cfPaymentId;
//   tx.status = status;
//   tx.rawPayload = rawPayload;

//   await tx.save();
//   return tx;
// };

// /* =====================================================
//    CUSTOMER – MY TRANSACTIONS
// ===================================================== */
// exports.getCustomerTransactions = async (req, res) => {
//   try {
//     const customerId = req.user.id; // auth middleware se

//     const transactions = await Transaction.find({
//       "customer.id": customerId,
//     })
//       .populate("order", "amount orderStatus")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, transactions });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* =====================================================
//    ADMIN – ALL TRANSACTIONS
// ===================================================== */
// exports.getAllTransactionsForAdmin = async (req, res) => {
//   try {
//     const { status, from, to } = req.query;

//     const filter = {};
//     if (status) filter.status = status;
//     if (from && to) {
//       filter.createdAt = {
//         $gte: new Date(from),
//         $lte: new Date(to),
//       };
//     }

//     const transactions = await Transaction.find(filter)
//       .populate("order", "amount orderStatus customer")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, transactions });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

const CustomerOrder = require("../models/CustomerOrder");

/* =====================================================
   HELPER — payment status determine karna
===================================================== */
const resolvePaymentStatus = (order) => {
  // DB mein paymentStatus stored hai toh wahi use karo
  if (order.paymentStatus && order.paymentStatus !== "Pending") {
    return order.paymentStatus;
  }
  const method = (order.paymentMethod || "").toLowerCase();
  if (method === "cod") {
    return order.orderStatus === "Delivered" ? "Success" : "Pending";
  }
  if (order.orderStatus === "Cancelled") return "Failed";
  return order.paymentStatus || "Pending";
};

/* =====================================================
   CUSTOMER — MY TRANSACTIONS
   GET /api/transaction/my
   Auth: userAuth
===================================================== */
exports.getCustomerTransactions = async (req, res) => {
  try {
    const customerId = req.user?._id || req.user?.id;

    const orders = await CustomerOrder.find({ customer: customerId })
      .select("_id amount paymentMethod paymentStatus orderStatus createdAt shippingAddress parcelx razorpayOrderId razorpayPaymentId couponDiscount deliveryFee")
      .sort({ createdAt: -1 })
      .lean();

    const transactions = orders.map((order) => ({
      transactionId:  order._id,
      orderId:        order._id,
      amount:         order.amount,
      paymentMethod:  order.paymentMethod || "COD",
      paymentStatus:  resolvePaymentStatus(order),
      orderStatus:    order.orderStatus,
      awb:            order.parcelx?.awb || null,
      courier:        order.parcelx?.courier || null,
      razorpayOrderId:   order.razorpayOrderId || null,
      razorpayPaymentId: order.razorpayPaymentId || null,
      date:           order.createdAt,
    }));

    return res.json({ success: true, transactions });
  } catch (err) {
    console.error("getCustomerTransactions error:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* =====================================================
   ADMIN — ALL TRANSACTIONS
   GET /api/transaction/admin/all
   Query: status, from, to, paymentMethod, search, page, limit
   Auth: adminAuth (ya koi bhi tum lagao)
===================================================== */
exports.getAllTransactionsForAdmin = async (req, res) => {
  try {
    const {
      status,
      from,
      to,
      paymentMethod,
      search,
      page  = 1,
      limit = 50,
    } = req.query;

    /* ── Build filter from CustomerOrder ── */
    const filter = {};

    // paymentStatus filter (Pending / Success / Failed / Initiated)
    if (status && status !== "all") {
      // Special case: "Paid" maps to "Success"
      filter.paymentStatus = status === "Paid" ? "Success" : status;
    }

    if (paymentMethod && paymentMethod !== "all") {
      filter.paymentMethod = { $regex: new RegExp(paymentMethod, "i") };
    }

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) {
        const end = new Date(to);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    if (search) {
      filter.$or = [
        { "shippingAddress.name":  { $regex: search, $options: "i" } },
        { "shippingAddress.phone": { $regex: search, $options: "i" } },
        { "shippingAddress.email": { $regex: search, $options: "i" } },
        { "parcelx.awb":           { $regex: search, $options: "i" } },
        { razorpayOrderId:         { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      CustomerOrder.find(filter)
        .populate("customer", "name email phone")
        .select("_id amount paymentMethod paymentStatus orderStatus createdAt shippingAddress parcelx razorpayOrderId razorpayPaymentId couponDiscount deliveryFee customer")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      CustomerOrder.countDocuments(filter),
    ]);

    /* ── Map orders → transactions ── */
    const transactions = orders.map((order) => ({
      transactionId:  order._id,
      orderId:        order._id,
      customerName:   order.shippingAddress?.name  || order.customer?.name  || "N/A",
      customerEmail:  order.shippingAddress?.email || order.customer?.email || "N/A",
      customerPhone:  order.shippingAddress?.phone || order.customer?.phone || "N/A",
      amount:         order.amount || 0,
      paymentMethod:  order.paymentMethod || "COD",
      paymentStatus:  resolvePaymentStatus(order),
      orderStatus:    order.orderStatus,
      awb:            order.parcelx?.awb     || null,
      courier:        order.parcelx?.courier || null,
      razorpayOrderId:   order.razorpayOrderId   || null,
      razorpayPaymentId: order.razorpayPaymentId || null,
      couponDiscount: order.couponDiscount || 0,
      deliveryFee:    order.deliveryFee    || 0,
      date:           order.createdAt,
    }));

    /* ── Revenue stats aggregation ── */
    const statsAgg = await CustomerOrder.aggregate([
      {
        $group: {
          _id:            "$paymentMethod",
          totalAmount:    { $sum: "$amount" },
          count:          { $sum: 1 },
          paidAmount: {
            $sum: {
              $cond: [
                { $in: ["$paymentStatus", ["Success", "Paid"]] },
                "$amount",
                0,
              ],
            },
          },
          pendingAmount: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "Pending"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    // Summary totals
    let grandTotal   = 0;
    let totalCOD     = 0;
    let totalOnline  = 0;
    let totalPending = 0;

    statsAgg.forEach((s) => {
      grandTotal += s.totalAmount;
      if ((s._id || "").toLowerCase() === "cod") totalCOD    += s.totalAmount;
      else                                        totalOnline += s.totalAmount;
      totalPending += s.pendingAmount;
    });

    return res.json({
      success: true,
      total,
      page:       parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      summary: {
        grandTotal,
        totalCOD,
        totalOnline,
        totalPending,
      },
      transactions,
    });
  } catch (err) {
    console.error("getAllTransactionsForAdmin error:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};
