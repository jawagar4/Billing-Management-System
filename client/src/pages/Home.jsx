import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';

const QUICK_LINKS = [
  { to: '/products', label: 'Start Billing', icon: 'bi-cart-plus', desc: 'Search, scan, and add products to a new bill', primary: true },
  { to: '/orders', label: 'Billing History', icon: 'bi-clock-history', desc: 'View, reprint, or track past invoices' },
  { to: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2', desc: "See today's sales, bills, and stock" },
  { to: '/admin', label: 'Manage Products', icon: 'bi-box-seam', desc: 'Add, edit, or restock inventory' },
];

export default function Home() {
  return (
    <div className="page-home">
      <section className="hero-section">
        <div className="hero-text">
          <p className="hero-eyebrow">Counter-ready POS</p>
          <h1>Bill every customer in seconds.</h1>
          <p className="hero-sub">
            SVVT Maligai billing counter — search or scan a product, adjust quantity, and print a
            GST-accurate receipt without ever leaving the keyboard.
          </p>
          <Link to="/products" className="btn-primary-lg hero-cta">
            <i className="bi bi-cart-plus me-2"></i>Start a new bill
          </Link>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-receipt-card">
            <div className="hero-receipt-line"><span>Bru Coffee ×2</span><span>₹370</span></div>
            <div className="hero-receipt-line"><span>Biscuits ×3</span><span>₹90</span></div>
            <div className="hero-receipt-divider" />
            <div className="hero-receipt-line total"><span>Grand Total</span><span>₹462</span></div>
          </div>
        </div>
      </section>

      <section className="quick-links-section">
        <div className="quick-links-grid">
          {QUICK_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={`quick-link-card ${link.primary ? 'primary' : ''}`}>
              <span className="quick-link-icon"><i className={`bi ${link.icon}`}></i></span>
              <div>
                <h3>{link.label}</h3>
                <p>{link.desc}</p>
              </div>
              <i className="bi bi-arrow-right quick-link-arrow"></i>
            </Link>
          ))}
        </div>
      </section>

      <section className="category-showcase">
        <div className="section-heading">
          <h2>Browse by category</h2>
          <Link to="/products">See all products <i className="bi bi-arrow-right"></i></Link>
        </div>
        <div className="category-showcase-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="category-showcase-card"
              style={{ '--cat-color': cat.color }}
            >
              <i className={`bi ${cat.icon}`}></i>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
