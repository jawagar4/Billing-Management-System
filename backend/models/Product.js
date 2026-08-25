const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, default: '', trim: true },
    category: { type: String, required: true, trim: true, index: true },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true }, // e.g. "1 kg", "200 g", "1 pc"
    gstPercent: { type: Number, required: true, min: 0, default: 5 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    barcode: { type: String, required: true, unique: true, trim: true, index: true },
    image: { type: String, default: '' }, // emoji / icon fallback, or an image URL
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProductSchema.index({ name: 'text', brand: 'text', category: 'text' });

ProductSchema.virtual('discountPercent').get(function () {
  if (!this.mrp || this.mrp <= this.price) return 0;
  return Math.round(((this.mrp - this.price) / this.mrp) * 100);
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', ProductSchema);
