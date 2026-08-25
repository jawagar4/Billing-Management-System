import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const client = axios.create({ baseURL: API_URL, timeout: 10000 });

// Small helper so components can rely on a consistent error message.
const unwrap = (promise) =>
  promise.then((res) => res.data).catch((err) => {
    const message = err.response?.data?.message || err.message || 'Something went wrong';
    throw new Error(message);
  });

export const api = {
  // Products
  getProducts: (params) => unwrap(client.get('/products', { params })),
  getCategories: () => unwrap(client.get('/products/categories')),
  getProductByBarcode: (code) => unwrap(client.get(`/products/barcode/${encodeURIComponent(code)}`)),
  createProduct: (data) => unwrap(client.post('/products', data)),
  updateProduct: (id, data) => unwrap(client.put(`/products/${id}`, data)),
  deleteProduct: (id) => unwrap(client.delete(`/products/${id}`)),

  // Orders / Billing
  getOrders: () => unwrap(client.get('/orders')),
  getOrder: (id) => unwrap(client.get(`/orders/${id}`)),
  getNextInvoiceNo: () => unwrap(client.get('/orders/next-invoice-no')),
  createOrder: (data) => unwrap(client.post('/orders', data)),

  // Dashboard & shop info
  getDashboardSummary: () => unwrap(client.get('/dashboard/summary')),
  getShopInfo: () => unwrap(client.get('/shop-info')),
  getHealth: () => unwrap(client.get('/health')),
};

export default api;
