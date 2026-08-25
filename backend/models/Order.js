const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      default: '',
    },

    price: {
      type: Number,
      required: true,
    },

    // Supports:
    // 0.25 = 250g
    // 0.5  = 500g
    // 0.75 = 750g
    // 1    = 1kg
    qty: {
      type: Number,
      required: true,
      min: 0.001,
    },

    gstPercent: {
      type: Number,
      required: true,
      default: 0,
    },

    lineTotal: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const OrderSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    invoiceSeq: {
      type: Number,
      required: true,
    },

    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: 'Order must contain at least one item',
      },
    },

    subtotal: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
      default: 0,
    },

    taxableAmount: {
      type: Number,
      required: true,
    },

    gstAmount: {
      type: Number,
      required: true,
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    customer: {
      name: {
        type: String,
        default: '',
      },

      mobile: {
        type: String,
        default: '',
      },

      address: {
        type: String,
        default: '',
      },

      gstNumber: {
        type: String,
        default: '',
      },
    },

    payment: {
      method: {
        type: String,
        enum: ['Cash', 'UPI', 'Card', 'Other'],
        default: 'Cash',
      },

      cashReceived: {
        type: Number,
        default: 0,
      },

      change: {
        type: Number,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: ['completed', 'void'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema);