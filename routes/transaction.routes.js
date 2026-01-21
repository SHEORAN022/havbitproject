

const express = require("express");
const router = express.Router();

const {
  getCustomerTransactions,
  getAllTransactionsForAdmin,
} = require("../controllers/transaction.controller");

const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");

/* CUSTOMER */
router.get("/my", userAuth, getCustomerTransactions);

/* ADMIN */
router.get("/admin/all", adminAuth, getAllTransactionsForAdmin);

module.exports = router;
