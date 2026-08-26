require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI ;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(`[mongo] connected -> ${MONGODB_URI}`))
  .catch((err) => {
    console.error('[mongo] connection error:', err.message);
    console.error(
      '        Make sure MongoDB is running locally (e.g. via MongoDB Compass / mongod) and MONGODB_URI in .env is correct.'
    );
  });

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongoConnected: mongoose.connection.readyState === 1 });
});

app.get('/api/shop-info', (req, res) => {
  res.json({
    name: process.env.SHOP_NAME ,
    addressLine1: process.env.SHOP_ADDRESS_LINE1 ,
    addressLine2: process.env.SHOP_ADDRESS_LINE2,
    phone: process.env.SHOP_PHONE ,
    gstin: process.env.SHOP_GSTIN ,
    defaultGstPercent: Number(process.env.DEFAULT_GST_PERCENT),
  });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[server] FreshMart API running on port ${PORT}`));
