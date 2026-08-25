import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: 'bi-house' },
  { to: '/products', label: 'Products', icon: 'bi-box-seam' },
  { to: '/billing', label: 'Billing', icon: 'bi-receipt' },
  { to: '/orders', label: 'Orders', icon: 'bi-clock-history' },
  { to: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { to: '/admin', label: 'Admin', icon: 'bi-gear' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setMobileSearchOpen(false);
    setQuery('');
  };

  return (
    <header className="app-navbar no-print">
      <div className="app-navbar-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">
            <i className="bi bi-basket3-fill"></i>
          </span>
          <span className="brand-name d-none d-sm-inline">SVVT Maligai</span>
          <span className="brand-name d-inline d-sm-none">SVVT</span>
        </NavLink>

        {/* Desktop links */}
        <nav className="desktop-links d-none d-lg-flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
              end={link.to === '/'}
            >
              <i className={`bi ${link.icon} me-1`}></i>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <form className="desktop-search d-none d-lg-flex" onSubmit={submitSearch}>
            <i className="bi bi-search"></i>
            <input
              type="search"
              placeholder="Search products, brands, barcodes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
          </form>

          <button
            className="icon-btn d-lg-none"
            aria-label="Search"
            onClick={() => setMobileSearchOpen((v) => !v)}
          >
            <i className="bi bi-search"></i>
          </button>

          <NavLink to="/billing" className="icon-btn cart-icon-btn" aria-label="Cart">
            <i className="bi bi-cart3"></i>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </NavLink>

          <button
            className="icon-btn d-lg-none"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <form className="mobile-search-bar d-lg-none" onSubmit={submitSearch}>
          <i className="bi bi-search"></i>
          <input
            type="search"
            autoFocus
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
        </form>
      )}

      <nav className={`mobile-menu d-lg-none ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
            end={link.to === '/'}
          >
            <i className={`bi ${link.icon} me-2`}></i>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
