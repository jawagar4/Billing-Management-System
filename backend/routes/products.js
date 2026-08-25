const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products?search=&category=
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = { active: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: regex }, { brand: regex }, { category: regex }, { barcode: regex }];
    }

    const products = await Product.find(query).sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load products', error: err.message });
  }
});

// GET /api/products/categories - distinct category list with counts
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { active: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(categories.map((c) => ({ name: c._id, count: c.count })));
  } catch (err) {
    res.status(500).json({ message: 'Failed to load categories', error: err.message });
  }
});

// GET /api/products/barcode/:code
router.get('/barcode/:code', async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.code, active: true });
    if (!product) return res.status(404).json({ message: 'Product not found for this barcode' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Barcode lookup failed', error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load product', error: err.message });
  }
});

// POST /api/products - create
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product', error: err.message });
  }
});

// PUT /api/products/:id - update (price, stock, category, image, etc.)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product', error: err.message });
  }
});

// DELETE /api/products/:id - soft delete
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
});

module.exports = router;
