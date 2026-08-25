import { formatCurrency, calculateChange } from '../utils/billing';

const METHODS = [
  { key: 'Cash', label: 'Cash', icon: 'bi-cash-coin' },
  { key: 'UPI', label: 'UPI', icon: 'bi-qr-code' },
  { key: 'Card', label: 'Card', icon: 'bi-credit-card' },
  { key: 'Other', label: 'Other', icon: 'bi-three-dots' },
];

export default function PaymentSection({ payment, setPayment, grandTotal }) {
  const change = calculateChange(payment.cashReceived, grandTotal);

  return (
    <div className="payment-section">
      <p className="section-label">Payment method</p>
      <div className="payment-methods">
        {METHODS.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`payment-method-btn ${payment.method === m.key ? 'active' : ''}`}
            onClick={() => setPayment((p) => ({ ...p, method: m.key }))}
          >
            <i className={`bi ${m.icon}`}></i>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {payment.method === 'Cash' && (
        <div className="cash-panel">
          <div className="billing-row">
            <label htmlFor="cash-received">Cash Received (₹)</label>
            <input
              id="cash-received"
              type="number"
              min="0"
              step="1"
              value={payment.cashReceived || ''}
              placeholder={grandTotal ? grandTotal.toFixed(0) : '0'}
              onChange={(e) => setPayment((p) => ({ ...p, cashReceived: Number(e.target.value) || 0 }))}
            />
          </div>
          <div className={`change-line ${change < 0 ? 'negative' : ''}`}>
            <span>Change</span>
            <span>{formatCurrency(Math.max(change, 0))}</span>
          </div>
          {change < 0 && payment.cashReceived > 0 && (
            <p className="field-error">Cash received is less than the grand total.</p>
          )}
        </div>
      )}
    </div>
  );
}
