
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

// --------------------
// CORS
// --------------------
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman/server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

app.use(express.json());

// --------------------
// MongoDB
// --------------------
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined");
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("[mongo] connected");
    })
    .catch((err) => {
      console.error("[mongo] connection error:", err.message);
    });
}

// --------------------
// Health Check
// --------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    mongoConnected: mongoose.connection.readyState === 1,
  });
});

// --------------------
// Shop Information
// --------------------
app.get("/api/shop-info", (req, res) => {
  res.json({
    name: process.env.SHOP_NAME,
    addressLine1: process.env.SHOP_ADDRESS_LINE1,
    addressLine2: process.env.SHOP_ADDRESS_LINE2,
    phone: process.env.SHOP_PHONE,
    gstin: process.env.SHOP_GSTIN,
    defaultGstPercent: Number(
      process.env.DEFAULT_GST_PERCENT
    ),
  });
});

// --------------------
// API Routes
// --------------------
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --------------------
// Test Routes
// --------------------
app.get("/", (req, res) => {
  res.json({
    message: "SVVT Maligai API is running",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Test successful",
  });
});

// --------------------
// 404
// --------------------
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// --------------------
// Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
});

// IMPORTANT FOR VERCEL
// Do NOT use app.listen()

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}



module.exports = app;
