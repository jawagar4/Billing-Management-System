const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// GET /api/dashboard/summary
router.get('/summary', async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [todayOrders, totalProducts, lowStock] = await Promise.all([
      Order.find({ createdAt: { $gte: startOfDay }, status: 'completed' }),
      Product.countDocuments({ active: true }),
      Product.countDocuments({ active: true, stock: { $lte: 10 } }),
    ]);

    const todaySales = todayOrders.reduce((sum, o) => sum + o.grandTotal, 0);

    res.json({
      todaySales: Math.round(todaySales * 100) / 100,
      todayBills: todayOrders.length,
      totalProducts,
      lowStock,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard summary', error: err.message });
  }
});

module.exports = router;
