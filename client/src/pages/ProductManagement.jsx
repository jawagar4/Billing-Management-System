import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { CATEGORIES } from '../data/categories';
import { formatCurrency } from '../utils/billing';

const EMPTY_FORM = {
  name: '', brand: '', category: CATEGORIES[0].name, price: '', mrp: '',
  unit: '', gstPercent: 5, stock: '', barcode: '', image: '',
};

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const load = () => {
    setLoading(true);
    api.getProducts({}).then(setProducts).catch((err) => setError(err.message)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = products.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q) || p.barcode.includes(q);
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError('');
    setFormOpen(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name, brand: p.brand || '', category: p.category, price: p.price, mrp: p.mrp,
      unit: p.unit, gstPercent: p.gstPercent, stock: p.stock, barcode: p.barcode,
      image: p.image,
    });
    setFormError('');
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const price = Number(form.price);
    const mrp = Number(form.mrp);
    const stock = Number(form.stock);

    if (!form.name.trim()) return setFormError('Product name is required.');
    if (!form.category) return setFormError('Category is required.');
    if (!form.unit.trim()) return setFormError('Unit is required (e.g. "1 kg", "200 g").');
    if (!(price >= 0)) return setFormError('Enter a valid price.');
    if (!(mrp >= 0)) return setFormError('Enter a valid MRP.');
    if (mrp < price) return setFormError('MRP cannot be less than the selling price.');
    if (!(stock >= 0)) return setFormError('Enter a valid stock quantity.');
    if (!form.barcode.trim()) return setFormError('Barcode is required.');

    const payload = { ...form, price, mrp, stock, gstPercent: Number(form.gstPercent) || 0 };

    setSaving(true);
    try {
      if (editingId) {
        await api.updateProduct(editingId, payload);
      } else {
        await api.createProduct(payload);
      }
      setFormOpen(false);
      load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Remove "${p.name}" from the catalog?`)) return;
    try {
      await api.deleteProduct(p._id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const quickStockUpdate = async (p, delta) => {
    const newStock = Math.max(0, p.stock + delta);
    try {
      await api.updateProduct(p._id, { stock: newStock });
      setProducts((prev) => prev.map((x) => (x._id === p._id ? { ...x, stock: newStock } : x)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-admin">
      <div className="page-heading admin-heading">
        <div>
          <h1><i className="bi bi-gear me-2"></i>Product Management</h1>
          <p>Add products, update prices and stock, or retire discontinued items.</p>
        </div>
        <button type="button" className="btn-primary-lg" onClick={openAdd}>
          <i className="bi bi-plus-lg me-2"></i>Add Product
        </button>
      </div>

      <div className="admin-search">
        <i className="bi bi-search"></i>
        <input
          type="search"
          placeholder="Search by name, brand, or barcode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="alert-error"><i className="bi bi-exclamation-triangle me-2"></i>{error}</div>}

      {loading ? (
        <div className="empty-state"><i className="bi bi-hourglass-split"></i><p>Loading products...</p></div>
      ) : (
        <div className="admin-table-wrap">
          <table className="orders-table admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>GST</th>
                <th>Stock</th>
                <th>Barcode</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id}>
                  <td><div className="admin-tile" style={{ background: p.color }}>
                    <div className="admin-tile-image ">
                      <img
                        src={p.image}
                        alt={p.name}
                        onError={(e) => {
                          e.currentTarget.src = `${p.barcode || p.image}`;
                        }}
                      />
                    </div></div></td>
                  <td>
                    <p className="admin-prod-name">{p.name}</p>
                    <p className="muted">{p.brand} · {p.unit}</p>
                  </td>
                  <td>{p.category}</td>
                  <td className="mono">{formatCurrency(p.price)}</td>
                  <td>{p.gstPercent}%</td>
                  <td>
                    <div className="stock-stepper">
                      <button type="button" onClick={() => quickStockUpdate(p, -1)} aria-label={`Decrease stock of ${p.name}`}><i className="bi bi-dash"></i></button>
                      <span className={p.stock <= 10 ? 'low-stock-text' : ''}>{p.stock}</span>
                      <button type="button" onClick={() => quickStockUpdate(p, 1)} aria-label={`Increase stock of ${p.name}`}><i className="bi bi-plus"></i></button>
                    </div>
                  </td>
                  <td className="mono muted">{p.barcode}</td>
                  <td className="orders-actions">
                    <button type="button" className="link-btn" onClick={() => openEdit(p)}><i className="bi bi-pencil me-1"></i>Edit</button>
                    <button type="button" className="link-btn danger" onClick={() => handleDelete(p)}><i className="bi bi-trash3 me-1"></i>Remove</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8}><div className="empty-state small"><p>No products match your search.</p></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <div className="cart-drawer-overlay" onClick={closeForm}>
          <div className="product-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="product-form-header">
              <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button type="button" className="icon-btn" onClick={closeForm} aria-label="Close"><i className="bi bi-x-lg"></i></button>
            </div>

            <form className="product-form" onSubmit={handleSubmit}>
              {formError && <div className="alert-error">{formError}</div>}

              <label>Product name
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </label>

              <label>Brand
                <input value={form.brand} onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} />
              </label>

              <label>Category
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </label>

              <div className="form-row">
                <label>Price (₹)
                  <input type="number" min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
                </label>
                <label>MRP (₹)
                  <input type="number" min="0" value={form.mrp} onChange={(e) => setForm((f) => ({ ...f, mrp: e.target.value }))} required />
                </label>
              </div>

              <div className="form-row">
                <label>Unit
                  <input placeholder="e.g. 1 kg, 200 g" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))} required />
                </label>
                <label>GST %
                  <select value={form.gstPercent} onChange={(e) => setForm((f) => ({ ...f, gstPercent: e.target.value }))}>
                    {[0, 5, 12, 18, 28].map((g) => <option key={g} value={g}>{g}%</option>)}
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>Stock
                  <input type="number" min="0" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} required />
                </label>
                <label>Barcode
                  <input value={form.barcode} onChange={(e) => setForm((f) => ({ ...f, barcode: e.target.value }))} required />
                </label>
              </div>

              <div className="product-form">
                <label>Image (emoji or image URL)
                  <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className=' w-100' placeholder="https://..." />
                </label>

              </div>

              <button type="submit" className="btn-primary-lg" disabled={saving}>
                {saving ? 'Saving...' : editingId ? 'Save changes' : 'Add product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
