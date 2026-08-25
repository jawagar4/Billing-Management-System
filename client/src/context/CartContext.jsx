import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { computeBill } from '../utils/billing';

const CartContext = createContext(null);
const STORAGE_KEY = 'freshmart_cart_v1';
const DEFAULT_GST_PERCENT = 5;

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitialCart);
  const [discount, setDiscount] = useState(0);
  const [gstPercentOverride, setGstPercentOverride] = useState(null); // null = use per-product GST
  const [customer, setCustomer] = useState({ name: '', mobile: '', address: '', gstNumber: '' });
  const [toast, setToast] = useState(null); // { message, type }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const addItem = useCallback(
    (product, qty = 1) => {
      if (product.stock <= 0) {
        showToast(`${product.name} is out of stock`, 'error');
        return;
      }
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product._id);
        if (existing) {
          if (existing.qty + qty > product.stock) {
            showToast(`Only ${product.stock} ${product.name} in stock`, 'error');
            return prev;
          }
          return prev.map((i) =>
            i.productId === product._id ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [
          ...prev,
          {
            productId: product._id,
            name: product.name,
            unit: product.unit,
            price: product.price,
            gstPercent: product.gstPercent,
            image: product.image,
            color: product.color,
            stock: product.stock,
            qty,
          },
        ];
      });
      showToast(`${product.name} added to cart`);
    },
    [showToast]
  );

  const addByBarcode = useCallback(
    (product) => {
      addItem(product, 1);
    },
    [addItem]
  );

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const increaseQty = useCallback((productId) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.productId !== productId) return i;
        if (i.qty + 1 > i.stock) {
          return i;
        }
        return { ...i, qty: i.qty + 1 };
      })
    );
  }, []);

  const decreaseQty = useCallback((productId) => {
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const setQty = useCallback((productId, qty) => {
    const safeQty = Math.max(0, Math.floor(Number(qty) || 0));
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, qty: Math.min(safeQty, i.stock) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscount(0);
    setCustomer({ name: '', mobile: '', address: '', gstNumber: '' });
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const billingItems = useMemo(
    () =>
      items.map((i) => ({
        ...i,
        gstPercent: gstPercentOverride ?? i.gstPercent ?? DEFAULT_GST_PERCENT,
      })),
    [items, gstPercentOverride]
  );

  const bill = useMemo(() => computeBill(billingItems, discount), [billingItems, discount]);

  const value = {
    items,
    billingItems,
    itemCount,
    bill,
    discount,
    setDiscount,
    gstPercentOverride,
    setGstPercentOverride,
    customer,
    setCustomer,
    addItem,
    addByBarcode,
    removeItem,
    increaseQty,
    decreaseQty,
    setQty,
    clearCart,
    toast,
    showToast,
    dismissToast: () => setToast(null),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
