const Transaction = require("../models/Transaction");
const CustomerOrder = require("../models/CustomerOrder");

/* =====================================================
   CREATE TRANSACTION (WHEN ORDER CREATED)
===================================================== */
exports.createTransaction = async ({ order, customer }) => {
  return await Transaction.create({
    order: order._id,
    amount: order.amount,
    customer: {
      id: customer.id,
      email: customer.email,
      phone: customer.phone,
    },
    status: "PENDING",
  });
};

/* =====================================================
   UPDATE TRANSACTION (AFTER PAYMENT SUCCESS / FAIL)
===================================================== */
exports.updateTransaction = async ({
  orderId,
  cfOrderId,
  cfPaymentId,
  status,
  rawPayload,
}) => {
  const tx = await Transaction.findOne({ order: orderId });

  if (!tx) return null;

  tx.cfOrderId = cfOrderId;
  tx.cfPaymentId = cfPaymentId;
  tx.status = status;
  tx.rawPayload = rawPayload;

  await tx.save();
  return tx;
};

/* =====================================================
   CUSTOMER – MY TRANSACTIONS
===================================================== */
exports.getCustomerTransactions = async (req, res) => {
  try {
    const customerId = req.user.id; // auth middleware se

    const transactions = await Transaction.find({
      "customer.id": customerId,
    })
      .populate("order", "amount orderStatus")
      .sort({ createdAt: -1 });

    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =====================================================
   ADMIN – ALL TRANSACTIONS
===================================================== */
exports.getAllTransactionsForAdmin = async (req, res) => {
  try {
    const { status, from, to } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (from && to) {
      filter.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const transactions = await Transaction.find(filter)
      .populate("order", "amount orderStatus customer")
      .sort({ createdAt: -1 });

    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
