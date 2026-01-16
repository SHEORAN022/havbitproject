// // controllers/customerController.js

// // ==================== PUBLIC ROUTES ====================

// // Register Customer
// exports.registerCustomer = async (req, res) => {
//   try {
//     console.log("📝 Registration request:", req.body);
    
//     const { name, email, phone, password } = req.body;
    
//     // Simple validation
//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });
//     }
    
//     // Simulate successful registration
//     const customer = {
//       _id: "cust_" + Date.now(),
//       name,
//       email,
//       phone,
//       addresses: [],
//       wishlist: [],
//       cart: [],
//       createdAt: new Date().toISOString()
//     };
    
//     // Generate demo token
//     const token = "demo_token_" + Date.now();
    
//     res.status(201).json({
//       success: true,
//       message: "Registration successful",
//       token,
//       customer
//     });
    
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Registration failed"
//     });
//   }
// };

// // Login Customer
// exports.loginCustomer = async (req, res) => {
//   try {
//     console.log("🔐 Login request:", req.body);
    
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required"
//       });
//     }
    
//     // Demo customer data
//     const customer = {
//       _id: "cust_123456",
//       name: "John Doe",
//       email: email,
//       phone: "9876543210",
//       addresses: [
//         {
//           _id: "addr_1",
//           addressType: "Home",
//           fullName: "John Doe",
//           mobileNumber: "9876543210",
//           addressLine1: "123 Main Street",
//           city: "Bangalore",
//           state: "Karnataka",
//           pincode: "560001",
//           isDefault: true
//         }
//       ],
//       wishlist: [],
//       cart: [],
//       stats: {
//         totalOrders: 5,
//         totalSpent: 12500
//       },
//       createdAt: "2024-01-15T10:30:00.000Z"
//     };
    
//     // Generate demo token
//     const token = "demo_token_" + Date.now();
    
//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       customer
//     });
    
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Login failed"
//     });
//   }
// };

// // ==================== PROTECTED ROUTES ====================

// // Get Customer Profile
// exports.getCustomerProfile = (req, res) => {
//   try {
//     console.log("👤 Profile request from:", req.user);
    
//     const customer = {
//       _id: "cust_123456",
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "9876543210",
//       addresses: [
//         {
//           _id: "addr_1",
//           addressType: "Home",
//           fullName: "John Doe",
//           mobileNumber: "9876543210",
//           addressLine1: "123 Main Street",
//           city: "Bangalore",
//           state: "Karnataka",
//           pincode: "560001",
//           isDefault: true
//         },
//         {
//           _id: "addr_2",
//           addressType: "Work",
//           fullName: "John Doe",
//           mobileNumber: "9876543210",
//           addressLine1: "456 Tech Park",
//           city: "Bangalore",
//           state: "Karnataka",
//           pincode: "560034",
//           isDefault: false
//         }
//       ],
//       wishlist: ["prod_1", "prod_2"],
//       cart: [
//         {
//           _id: "cart_1",
//           productId: "prod_3",
//           quantity: 2
//         }
//       ],
//       stats: {
//         totalOrders: 12,
//         totalSpent: 8456,
//         lastOrderDate: "2024-03-25"
//       },
//       createdAt: "2024-01-15T10:30:00.000Z"
//     };
    
//     res.json({
//       success: true,
//       customer
//     });
    
//   } catch (error) {
//     console.error("Profile error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get profile"
//     });
//   }
// };

// // Get Addresses
// exports.getAddresses = (req, res) => {
//   try {
//     const addresses = [
//       {
//         _id: "addr_1",
//         addressType: "Home",
//         fullName: "John Doe",
//         mobileNumber: "9876543210",
//         addressLine1: "123 Main Street",
//         city: "Bangalore",
//         state: "Karnataka",
//         pincode: "560001",
//         isDefault: true
//       },
//       {
//         _id: "addr_2",
//         addressType: "Work",
//         fullName: "John Doe",
//         mobileNumber: "9876543210",
//         addressLine1: "456 Tech Park",
//         city: "Bangalore",
//         state: "Karnataka",
//         pincode: "560034",
//         isDefault: false
//       }
//     ];
    
//     res.json({
//       success: true,
//       addresses
//     });
    
//   } catch (error) {
//     console.error("Addresses error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get addresses"
//     });
//   }
// };

// // Add Address
// exports.addAddress = (req, res) => {
//   try {
//     console.log("➕ Add address:", req.body);
    
//     const newAddress = {
//       _id: "addr_" + Date.now(),
//       ...req.body,
//       isDefault: req.body.isDefault || false
//     };
    
//     res.status(201).json({
//       success: true,
//       message: "Address added",
//       address: newAddress
//     });
    
//   } catch (error) {
//     console.error("Add address error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to add address"
//     });
//   }
// };

// // Get Wishlist
// exports.getWishlist = (req, res) => {
//   try {
//     const wishlist = [
//       {
//         _id: "prod_1",
//         name: "Product 1",
//         price: 999,
//         images: ["image1.jpg"]
//       },
//       {
//         _id: "prod_2",
//         name: "Product 2",
//         price: 1499,
//         images: ["image2.jpg"]
//       }
//     ];
    
//     res.json({
//       success: true,
//       wishlist
//     });
    
//   } catch (error) {
//     console.error("Wishlist error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get wishlist"
//     });
//   }
// };

// // Get Cart
// exports.getCart = (req, res) => {
//   try {
//     const cart = {
//       items: [
//         {
//           _id: "cart_1",
//           product: {
//             _id: "prod_3",
//             name: "Product 3",
//             price: 799,
//             images: ["image3.jpg"]
//           },
//           quantity: 2
//         }
//       ],
//       subtotal: 1598,
//       totalItems: 2,
//       shipping: 50,
//       tax: 287.64,
//       total: 1935.64
//     };
    
//     res.json({
//       success: true,
//       cart
//     });
    
//   } catch (error) {
//     console.error("Cart error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get cart"
//     });
//   }
// };

// // Get Orders
// exports.getOrders = (req, res) => {
//   try {
//     const orders = [
//       {
//         _id: "ord_1",
//         orderId: "ORD-001",
//         date: "2024-03-15",
//         items: 3,
//         amount: 1249,
//         status: "delivered",
//         deliveryDate: "2024-03-16"
//       },
//       {
//         _id: "ord_2",
//         orderId: "ORD-002",
//         date: "2024-03-10",
//         items: 2,
//         amount: 899,
//         status: "processing",
//         deliveryDate: "2024-03-12"
//       }
//     ];
    
//     res.json({
//       success: true,
//       orders
//     });
    
//   } catch (error) {
//     console.error("Orders error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get orders"
//     });
//   }
// };