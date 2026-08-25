import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastMessage from './components/ToastMessage';
import Home from './pages/Home';
import Products from './pages/Products';
import Billing from './pages/Billing';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<ProductManagement />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ToastMessage />
    </div>
  );
}
