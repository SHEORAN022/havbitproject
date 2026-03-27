// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const couponRoutes = require("./routes/couponRoutes");
// const vendorOrderRoutes = require("./routes/vendorOrderRoutes");
// // const parcelxRoutes = require("./routes/parcelx.routes");
// const ticketRoutes = require("./routes/Ticketroutes");
// const transactionRoutes = require("./routes/transaction.routes");
// require("dotenv").config();


// dotenv.config();

// const app = express();


// /* ======================================================
//    CORS
// ====================================================== */
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:3001",
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "http://localhost:5175",
//        "https://havbit.in",
//         "https://admin.havbit.in",
//         "https://vendor.havbit.in",
//        "https://seller.havbit.in",
      
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// /* ======================================================
//    BODY PARSER (Cashfree webhook needs rawBody)
// ====================================================== */
// app.use(
//   express.json({
//     limit: "50mb",
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString();
//     },
//   })
// );

// app.use(
//   express.urlencoded({
//     extended: true,
//     limit: "50mb",
//   })
// );

// /* ======================================================
//    STATIC FILES
// ====================================================== */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads"));

// /* ======================================================
//    REQUEST LOGGER
// ====================================================== */
// app.use((req, res, next) => {
//   console.log(
//     `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
//   );
//   next();
// });

// /* ======================================================
//    ROUTES
// ====================================================== */

// /* AUTH */
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/website-user", require("./routes/websiteUser.routes"));
// app.use("/api/transaction", transactionRoutes);

// /* PRODUCTS */
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/categories", require("./routes/categoryRoutes"));
// app.use("/api/subcategories", require("./routes/subCategoryRoutes"));
// app.use("/api/public", require("./routes/publicProducts"));
// // app.use("/api/parcelx", parcelxRoutes);

// /* CUSTOMER ORDERS */
// app.use("/api/customer", require("./routes/customerOrder.routes"));
// app.use("/api/razorpay", require("./routes/razorpay.routes"));

// /* PAYMENTS (Cashfree + Razorpay) */
// // app.use("/api/payment", require("./routes/transaction.routes"));

// /* VENDOR */
// app.use("/api/vendor", require("./routes/vendorAuth"));
// app.use("/api/vendor/profile", require("./routes/vendorProfileRoutes"));
// app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));
// app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));
// app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));
// app.use("/api/vendor/orders", require("./routes/vendorOrderRoutes"));
// app.use("/api/vendor/media", require("./routes/restaurantMediaRoutes"));
// app.use("/api/vendor/orders", vendorOrderRoutes);
// app.use("/api/vendor", require("./routes/vendorBrandRoutes"));
// app.use("/api/vendor/inventory", require("./routes/inventoryRoutes"));
// app.use("/api/public", require("./routes/publicBrandRoutes"));
// app.use("/api/parcelx", require("./routes/parcelxRoutes"));
// app.use("/api/tickets", ticketRoutes);

// /* ADMIN */
// app.use("/api/admin/vendors", require("./routes/adminVendor"));

// app.use("/api/admin/customers", require("./routes/adminCustomerRoutes"));
// app.use("/api/vendor/inventory", require("./routes/inventoryRoutes"));
// app.use("/api/coupons", couponRoutes);
// app.use("/api/lead-entries", require("./routes/leadEntryRoutes"));
// app.use("/api/admin", require("./routes/adminVendorBrandRoutes"));
// // app.use("/api/vendor/warehouse", require("./routes/warehouse.routes"));
// /* ======================================================
//    HEALTH & ROOT
// ====================================================== */
// app.get("/", (req, res) => {
//   res.send("🚀 Havbit Backend Running");
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "OK",
//     uptime: process.uptime(),
//     database:
//       mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
//     time: new Date().toISOString(),
//   });
// });

// /* ======================================================
//    404 HANDLER
// ====================================================== */
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });

// /* ======================================================
//    GLOBAL ERROR HANDLER
// ====================================================== */
// app.use((err, req, res, next) => {
//   console.error("🔥 Server Error:", err);
//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//   });
// });

// /* ======================================================
//    DB + SERVER START
// ====================================================== */
// const PORT = process.env.PORT || 7002;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const couponRoutes = require("./routes/couponRoutes");
const vendorOrderRoutes = require("./routes/vendorOrderRoutes");
// const parcelxRoutes = require("./routes/parcelx.routes");
const ticketRoutes = require("./routes/Ticketroutes");
const transactionRoutes = require("./routes/transaction.routes");
require("dotenv").config();


dotenv.config();

const app = express();


/* ======================================================
   CORS
====================================================== */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
       "https://havbit.in",
        "https://admin.havbit.in",
        "https://vendor.havbit.in",
       "https://seller.havbit.in",
      
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ======================================================
   BODY PARSER (Cashfree webhook needs rawBody)
====================================================== */
app.use(
  express.json({
    limit: "50mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

/* ======================================================
   STATIC FILES
====================================================== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));

/* ======================================================
   REQUEST LOGGER
====================================================== */
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});

/* ======================================================
   ROUTES
====================================================== */

/* AUTH */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/website-user", require("./routes/websiteUser.routes"));
app.use("/api/transaction", transactionRoutes);

/* PRODUCTS */
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/subcategories", require("./routes/subCategoryRoutes"));
app.use("/api/public", require("./routes/publicProducts"));
// app.use("/api/parcelx", parcelxRoutes);

/* CUSTOMER ORDERS */
app.use("/api/customer", require("./routes/customerOrder.routes"));
app.use("/api/razorpay", require("./routes/razorpay.routes"));

/* PAYMENTS (Cashfree + Razorpay) */
// app.use("/api/payment", require("./routes/transaction.routes"));

/* VENDOR */
app.use("/api/vendor", require("./routes/vendorAuth"));
app.use("/api/vendor/profile", require("./routes/vendorProfileRoutes"));
app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));
app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));
app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));
app.use("/api/vendor/orders", require("./routes/vendorOrderRoutes"));
app.use("/api/vendor/media", require("./routes/restaurantMediaRoutes"));
app.use("/api/vendor/orders", vendorOrderRoutes);
app.use("/api/vendor", require("./routes/vendorBrandRoutes"));
app.use("/api/vendor/inventory", require("./routes/inventoryRoutes"));
app.use("/api/public", require("./routes/publicBrandRoutes"));
app.use("/api/parcelx", require("./routes/parcelxRoutes"));
app.use("/api/tickets", ticketRoutes);
app.use("/api/faqs", require("./routes/productFAQ.routes"));
/* ADMIN */
app.use("/api/admin/vendors", require("./routes/adminVendor"));
app.use("/api/reviews", require("./routes/review.routes"));
app.use("/api/admin/customers", require("./routes/adminCustomerRoutes"));
app.use("/api/vendor/inventory", require("./routes/inventoryRoutes"));
app.use("/api/coupons", couponRoutes);
app.use("/api/lead-entries", require("./routes/leadEntryRoutes"));
app.use("/api/admin", require("./routes/adminVendorBrandRoutes"));
// app.use("/api/vendor/warehouse", require("./routes/warehouse.routes"));
/* ======================================================
   HEALTH & ROOT
====================================================== */
app.get("/", (req, res) => {
  res.send("🚀 Havbit Backend Running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    time: new Date().toISOString(),
  });
});

/* ======================================================
   404 HANDLER
====================================================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* ======================================================
   GLOBAL ERROR HANDLER
====================================================== */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ======================================================
   DB + SERVER START
====================================================== */
const PORT = process.env.PORT || 7002;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });
