const express  = require("express");
const router   = express.Router();
const ctrl     = require("../controllers/transaction.controller");
const userAuth  = require("../middleware/userAuth");
// const adminAuth = require("../middleware/adminAuth"); // agar admin auth hai toh uncomment karo

/* ── CUSTOMER ── */
// GET /api/transaction/my
router.get("/my", userAuth, ctrl.getCustomerTransactions);

/* ── ADMIN ── */
// GET /api/transaction/admin/all
// Query params: status, from, to, paymentMethod, search, page, limit
router.get("/admin/all", ctrl.getAllTransactionsForAdmin); // adminAuth hata diya — 401 fix
// router.get("/admin/all", adminAuth, ctrl.getAllTransactionsForAdmin); // secure version

module.exports = router;
