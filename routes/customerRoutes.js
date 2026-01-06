// routes/customerRoutes.js
const express = require("express");
const router = express.Router();

// Import controller
const customerController = require("../controllers/customerController");

// ==================== PUBLIC ROUTES ====================

// Register customer
router.post("/register", customerController.registerCustomer);

// Login customer
router.post("/login", customerController.loginCustomer);

// ==================== PROTECTED ROUTES ====================

// Simple middleware to check token (demo)
const demoAuth = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }
  
  // Demo user
  req.user = { id: "cust_123456", email: "john@example.com" };
  next();
};

// Profile
router.get("/profile", demoAuth, customerController.getCustomerProfile);

// Addresses
router.get("/addresses", demoAuth, customerController.getAddresses);
router.post("/address", demoAuth, customerController.addAddress);

// Wishlist
router.get("/wishlist", demoAuth, customerController.getWishlist);

// Cart
router.get("/cart", demoAuth, customerController.getCart);

// Orders
router.get("/orders", demoAuth, customerController.getOrders);

// Test route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Customer API is working!",
    endpoints: {
      register: "POST /api/customer/register",
      login: "POST /api/customer/login",
      profile: "GET /api/customer/profile (protected)",
      addresses: "GET /api/customer/addresses (protected)",
      wishlist: "GET /api/customer/wishlist (protected)",
      cart: "GET /api/customer/cart (protected)",
      orders: "GET /api/customer/orders (protected)"
    }
  });
});

module.exports = router;