import { formatCurrency } from '../utils/billing';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeItem } = useCart();
  const lineTotal = item.price * item.qty;

  return (
    <div className="cart-item">
      <div className="cart-item-tile" style={{ background: item.color || '#EFF3EE' }}>
        <img  aria-hidden="true" 
        src={item.image} 
        alt={item.name}

        />
      </div>

      <div className="cart-item-body">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-meta">{item.unit} · {formatCurrency(item.price)} each</p>

        <div className="qty-stepper">
          <button
            type="button"
            className="qty-btn"
            aria-label={`Decrease quantity of ${item.name}`}
            onClick={() => decreaseQty(item.productId)}
          >
            <i className="bi bi-dash-lg"></i>
          </button>
          <span className="qty-value">{item.qty}</span>
          <button
            type="button"
            className="qty-btn"
            aria-label={`Increase quantity of ${item.name}`}
            onClick={() => increaseQty(item.productId)}
            disabled={item.qty >= item.stock}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <div className="cart-item-end">
        <span className="cart-item-total">{formatCurrency(lineTotal)}</span>
        <button
          type="button"
          className="cart-remove-btn"
          aria-label={`Remove ${item.name} from cart`}
          onClick={() => removeItem(item.productId)}
        >
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  );
}
