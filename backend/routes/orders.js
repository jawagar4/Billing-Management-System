const express = require('express');
const router = express.Router();

const Order = require('../models/Order');
const Product = require('../models/Product');
const Counter = require('../models/Counter');

const round2 = (value) =>
  Math.round((Number(value) + Number.EPSILON) * 100) / 100;


// ==========================================
// GET ALL ORDERS
// ==========================================
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(200);

    res.json(orders);
  } catch (error) {
    console.error('GET ORDERS ERROR:', error);

    res.status(500).json({
      message: 'Failed to load orders',
      error: error.message,
    });
  }
});


// ==========================================
// GET NEXT INVOICE NUMBER
// ==========================================
router.get('/next-invoice-no', async (req, res) => {
  try {
    const counter = await Counter.findById('invoice');

    const nextSeq = (counter?.seq || 0) + 1;

    const invoiceNo =
      `INV-${String(nextSeq).padStart(5, '0')}`;

    res.json({
      invoiceNo,
    });
  } catch (error) {
    console.error('INVOICE PREVIEW ERROR:', error);

    res.status(500).json({
      message: 'Failed to preview invoice number',
      error: error.message,
    });
  }
});


// ==========================================
// GET SINGLE ORDER
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.json(order);
  } catch (error) {
    console.error('GET ORDER ERROR:', error);

    res.status(500).json({
      message: 'Failed to load order',
      error: error.message,
    });
  }
});


// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================
router.post('/', async (req, res) => {
  try {
    const {
      items,
      discount = 0,
      gstPercentOverride = null,
      customer = {},
      payment = {},
    } = req.body;


    // ----------------------------------------
    // Validate items
    // ----------------------------------------
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message:
          'Please add at least one product before printing the bill.',
      });
    }


    // ----------------------------------------
    // Validate discount
    // ----------------------------------------
    const discountValue = Number(discount) || 0;

    if (discountValue < 0) {
      return res.status(400).json({
        message: 'Discount cannot be negative.',
      });
    }


    // ----------------------------------------
    // Find products
    // ----------------------------------------
    const products = [];

    let subtotal = 0;


    for (const item of items) {
      if (!item.productId) {
        return res.status(400).json({
          message: 'Product ID is required.',
        });
      }


      const qty = Number(item.qty);


      // Supports 0.25, 0.5, 0.75, 1, 2 etc.
      if (!Number.isFinite(qty) || qty <= 0) {
        return res.status(400).json({
          message: `Invalid quantity for product ${item.productId}`,
        });
      }


      const product = await Product.findById(
        item.productId
      );


      if (!product) {
        return res.status(400).json({
          message:
            `Product not found (${item.productId})`,
        });
      }


      // --------------------------------------
      // Stock validation
      // --------------------------------------
      if (Number(product.stock) < qty) {
        return res.status(400).json({
          message:
            `Insufficient stock for ${product.name}. ` +
            `Only ${product.stock} ${product.unit} available.`,
        });
      }


      const lineSubtotal =
        round2(Number(product.price) * qty);


      products.push({
        product,
        qty,
        lineSubtotal,
      });


      subtotal =
        round2(subtotal + lineSubtotal);
    }


    // ----------------------------------------
    // Discount validation
    // ----------------------------------------
    if (discountValue > subtotal) {
      return res.status(400).json({
        message:
          'Discount cannot be greater than subtotal.',
      });
    }


    const safeDiscount =
      round2(discountValue);


    // ----------------------------------------
    // Discount ratio
    // ----------------------------------------
    const discountRatio =
      subtotal > 0
        ? (subtotal - safeDiscount) / subtotal
        : 1;


    // ----------------------------------------
    // GST calculation
    // ----------------------------------------
    const lineItems = [];

    let gstAmount = 0;


    for (const item of products) {
      const {
        product,
        qty,
        lineSubtotal,
      } = item;


      const gstPercent =
        gstPercentOverride !== null
          ? Number(gstPercentOverride)
          : Number(product.gstPercent || 0);


      const taxableLine =
        round2(lineSubtotal * discountRatio);


      const lineGst =
        round2(
          (taxableLine * gstPercent) / 100
        );


      const lineTotal =
        round2(lineSubtotal + lineGst);


      lineItems.push({
        product: product._id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        qty,
        gstPercent,
        lineTotal,
      });


      gstAmount =
        round2(gstAmount + lineGst);


      // --------------------------------------
      // Reduce stock
      // --------------------------------------
      product.stock =
        Number(product.stock) - qty;

      await product.save();
    }


    // ----------------------------------------
    // Final totals
    // ----------------------------------------
    const taxableAmount =
      round2(subtotal - safeDiscount);


    const grandTotal =
      round2(taxableAmount + gstAmount);


    // ----------------------------------------
    // Payment
    // ----------------------------------------
    const paymentMethod =
      payment.method || 'Cash';


    const cashReceived =
      Number(payment.cashReceived) || 0;


    if (
      paymentMethod === 'Cash' &&
      cashReceived < grandTotal
    ) {
      return res.status(400).json({
        message:
          'Cash received is less than the grand total.',
      });
    }


    const change =
      paymentMethod === 'Cash'
        ? round2(cashReceived - grandTotal)
        : 0;


    // ----------------------------------------
    // Generate invoice number
    // ----------------------------------------
    const seq =
      await Counter.nextSequence('invoice');


    const invoiceNo =
      `INV-${String(seq).padStart(5, '0')}`;


    // ----------------------------------------
    // Create order
    // ----------------------------------------
    const order = await Order.create({
      invoiceNo,
      invoiceSeq: seq,

      items: lineItems,

      subtotal,
      discount: safeDiscount,
      taxableAmount,
      gstAmount,
      grandTotal,

      customer: {
        name: customer.name || '',
        mobile: customer.mobile || '',
        address: customer.address || '',
        gstNumber: customer.gstNumber || '',
      },

      payment: {
        method: paymentMethod,
        cashReceived,
        change,
      },

      status: 'completed',
    });


    // ----------------------------------------
    // Success
    // ----------------------------------------
    res.status(201).json(order);

  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);

    res.status(500).json({
      message: 'Failed to create bill',
      error: error.message,
    });
  }
});


module.exports = router;