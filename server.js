
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// const path = require("path");


const vendorOrderRoutes = require("./routes/vendorOrderRoutes");
// const vendorProfileRoutes = require("./routes/vendorProfileRoutes");
const adminCustomerRoutes = require("./routes/adminCustomerRoutes");
const vendorCustomerRoutes = require("./routes/vendorCustomerRoutes");
const vendorAuth = require("./middleware/vendorAuth");
// const vendorProfileRoutes = require("./routes/vendorProfileRoutes");


const vendorRoutes = require("./routes/vendorRoutes");
const vendorProfileRoutes = require("./routes/vendorProfileRoutes");








dotenv.config();

const app = express();

/* ======================= CORS ======================= */
app.use(
  cors({
    origin: ["*",
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:7002",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

/* ======================= BODY PARSER ======================= */
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

app.use(
  express.json({
    limit: "50mb",
    verify: rawBodySaver,
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
    verify: rawBodySaver,
  })
);

/* ======================= JSON ERROR HANDLER ======================= */
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
    });
  }
  next();
});

/* ======================= STATIC ======================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ======================= REQUEST LOG ======================= */
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});

/* ======================= ROUTES ======================= */
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/subcategories", require("./routes/subCategoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

/* Vendor */
app.use("/api/vendor", require("./routes/vendorAuth"));
app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));
app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));
app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));
app.use("/api/vendorOrders", vendorOrderRoutes);
app.use("/api/vendors/profile", vendorProfileRoutes);
// app.use("/api/vendor", require("./routes/vendorProfileRoutes"));
app.use("/api/admin/customers", adminCustomerRoutes);
app.use("/api/vendor/customers", vendorCustomerRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/vendor", vendorProfileRoutes);
app.use("/api/vendor", vendorRoutes);

app.use("/api/vendor", require("./routes/vendorProfileRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




/* Admin */
app.use("/api/admin", require("./routes/adminVendor"));

/* ======================= TEST ROUTES ======================= */
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

app.get("/api", (req, res) => {
  res.json({
    name: "Havbit E-commerce API",
    version: "1.0.0",
  });
});

/* ======================= 404 ======================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* ======================= GLOBAL ERROR ======================= */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ======================= DB + SERVER ======================= */
const PORT = process.env.PORT || 7002;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });
