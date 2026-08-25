require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Counter = require('../models/Counter');
const products = require('./products');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/freshmart';

async function run() {
  console.log(`[seed] connecting to ${MONGODB_URI} ...`);
  await mongoose.connect(MONGODB_URI);

  console.log('[seed] clearing existing products & resetting invoice counter...');
  await Product.deleteMany({});
  await Counter.findByIdAndUpdate('invoice', { seq: 0 }, { upsert: true });

  console.log(`[seed] inserting ${products.length} products...`);
  await Product.insertMany(products);

  console.log('[seed] done!');
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
