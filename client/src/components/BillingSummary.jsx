import { formatCurrency } from '../utils/billing';
import { useCart } from '../context/CartContext';

const GST_OPTIONS = [
  { label: 'Per product', value: null },
  { label: '5%', value: 5 },
  { label: '12%', value: 12 },
  { label: '18%', value: 18 },
];

export default function BillingSummary() {
  const { bill, discount, setDiscount, gstPercentOverride, setGstPercentOverride } = useCart();

  return (
    <div className="billing-summary">
      <div className="billing-row">
        <label htmlFor="discount-input">Discount (₹)</label>
        <input
          id="discount-input"
          type="number"
          min="0"
          step="1"
          value={discount || ''}
          placeholder="0"
          onChange={(e) => setDiscount(Number(e.target.value) || 0)}
        />
      </div>

      <div className="billing-row">
        <label htmlFor="gst-select">GST rate</label>
        <select
          id="gst-select"
          value={gstPercentOverride ?? ''}
          onChange={(e) => setGstPercentOverride(e.target.value === '' ? null : Number(e.target.value))}
        >
          {GST_OPTIONS.map((opt) => (
            <option key={opt.label} value={opt.value ?? ''}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="billing-divider" />

      <div className="summary-line">
        <span>Subtotal</span>
        <span>{formatCurrency(bill.subtotal)}</span>
      </div>
      <div className="summary-line">
        <span>Discount</span>
        <span>- {formatCurrency(bill.discount)}</span>
      </div>
      <div className="summary-line">
        <span>Taxable amount</span>
        <span>{formatCurrency(bill.taxableAmount)}</span>
      </div>
      <div className="summary-line">
        <span>GST</span>
        <span>+ {formatCurrency(bill.gstAmount)}</span>
      </div>

      <div className="summary-line grand-total">
        <span>Grand Total</span>
        <span>{formatCurrency(bill.grandTotal)}</span>
      </div>
    </div>
  );
}
