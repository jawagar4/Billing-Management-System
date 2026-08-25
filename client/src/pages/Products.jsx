import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import { api } from '../api/api';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/billing';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // for category counts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const { addByBarcode, itemCount, bill, showToast } = useCart();

  const setSearch = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('search', value);
    else next.delete('search');
    setSearchParams(next, { replace: true });
  };

  const setCategory = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'All') next.set('category', value);
    else next.delete('category');
    setSearchParams(next, { replace: true });
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getProducts({ search: search || undefined, category: category !== 'All' ? category : undefined });
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Fetch the unfiltered product list once, just to compute per-category counts for the chips.
  useEffect(() => {
    api.getProducts({}).then(setAllProducts).catch(() => {});
  }, []);

  const counts = useMemo(() => {
    const map = {};
    allProducts.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [allProducts]);

  const handleBarcodeSubmit = async (code) => {
    try {
      const product = await api.getProductByBarcode(code);
      addByBarcode(product);
    } catch (err) {
      showToast(err.message || 'Product not found for this barcode', 'error');
    }
  };

  return (
    <div className="page-products">
      <div className="products-toolbar no-print">
        <SearchBar value={search} onChange={setSearch} onBarcodeSubmit={handleBarcodeSubmit} />
        <CategoryList activeCategory={category} onSelect={setCategory} counts={counts} />
      </div>

      <div className="products-layout">
        <div className="products-column">
          {error && <div className="alert-error"><i className="bi bi-exclamation-triangle me-2"></i>{error}</div>}
          <ProductGrid products={products} loading={loading} />
        </div>

        <div className="cart-column d-none d-lg-block">
          <Cart />
        </div>
      </div>

      {itemCount > 0 && (
        <div className="mobile-sticky-cart d-lg-none no-print">
          <button type="button" className="mobile-sticky-cart-btn" onClick={() => setCartDrawerOpen(true)}>
            <span><i className="bi bi-cart3 me-2"></i>{itemCount} Item{itemCount !== 1 ? 's' : ''}</span>
            <span>{formatCurrency(bill.grandTotal)}</span>
            <span className="view-cart-label">VIEW CART <i className="bi bi-chevron-up"></i></span>
          </button>
        </div>
      )}

      {cartDrawerOpen && (
        <div className="cart-drawer-overlay no-print" onClick={() => setCartDrawerOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <Cart onClose={() => setCartDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
