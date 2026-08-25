import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import BillingSummary from './BillingSummary';
import { formatCurrency } from '../utils/billing';

export default function Cart({ onClose }) {
  const { items, bill, itemCount, clearCart } = useCart();

  return (
    <aside className="cart-panel">
      <div className="cart-panel-header">
        <h2><i className="bi bi-cart3 me-2"></i>Cart</h2>
        {onClose && (
          <button type="button" className="icon-btn" aria-label="Close cart" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>

      <div className="cart-panel-body">
        {items.length === 0 ? (
          <div className="empty-state small">
            <i className="bi bi-cart-x"></i>
            <p>Your cart is empty. Add products to start billing.</p>
          </div>
        ) : (
          <>
            <div className="cart-item-list">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>

            <button type="button" className="clear-cart-btn" onClick={clearCart}>
              <i className="bi bi-trash3 me-1"></i> Clear cart
            </button>

            <BillingSummary />
          </>
        )}
      </div>

      {items.length > 0 && (
        <div className="cart-panel-footer">
          <Link to="/billing" className="btn-primary-lg" onClick={onClose}>
            Proceed to Billing · {formatCurrency(bill.grandTotal)}
          </Link>
          <p className="cart-panel-footnote">{itemCount} item{itemCount !== 1 ? 's' : ''} in cart</p>
        </div>
      )}
    </aside>
  );
}
