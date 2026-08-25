import { formatCurrency } from '../utils/billing';
import { formatInvoiceDate, formatInvoiceTime } from '../utils/invoice';

/**
 * Printable receipt. Rendered off-screen at all times and revealed only by
 * the print stylesheet (see index.css `@media print`), so the same markup
 * drives both the "preview" modal and the physical thermal printout.
 */
export default function Receipt({ shopInfo, invoiceNo, date, items, bill, customer, payment, width = '80mm' }) {
  return (
    <div id="print-receipt" className={`receipt receipt-${width === '58mm' ? '58' : '80'}`}>
      <div className="receipt-center">
        <h2>{shopInfo?.name || 'FreshMart Supermarket'}</h2>
        <p>{shopInfo?.addressLine1}</p>
        <p>{shopInfo?.addressLine2}</p>
        <p>Phone: {shopInfo?.phone}</p>
        {shopInfo?.gstin && <p>GSTIN: {shopInfo.gstin}</p>}
      </div>

      <div className="receipt-divider" />

      <div className="receipt-meta">
        <p>Bill No: {invoiceNo}</p>
        <p>Date: {formatInvoiceDate(date)}</p>
        <p>Time: {formatInvoiceTime(date)}</p>
        {customer?.name && <p>Customer: {customer.name}</p>}
        {customer?.mobile && <p>Mobile: {customer.mobile}</p>}
        {customer?.gstNumber && <p>Customer GSTIN: {customer.gstNumber}</p>}
      </div>

      <div className="receipt-divider" />

      <table className="receipt-table">
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.productId || item.name}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{formatCurrency(item.price * item.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="receipt-divider" />

      <div className="receipt-totals">
        <div><span>Subtotal:</span><span>{formatCurrency(bill.subtotal)}</span></div>
        <div><span>Discount:</span><span>{formatCurrency(bill.discount)}</span></div>
        <div><span>GST:</span><span>{formatCurrency(bill.gstAmount)}</span></div>
      </div>

      <div className="receipt-divider" />

      <div className="receipt-grand-total">
        <span>GRAND TOTAL:</span>
        <span>{formatCurrency(bill.grandTotal)}</span>
      </div>

      <div className="receipt-divider" />

      <div className="receipt-payment">
        <p>Payment: {payment.method}</p>
        {payment.method === 'Cash' && (
          <>
            <p>Cash Received: {formatCurrency(payment.cashReceived)}</p>
            <p>Change: {formatCurrency(Math.max(payment.change, 0))}</p>
          </>
        )}
      </div>

      <div className="receipt-center receipt-footer">
        <p>Thank you for shopping!</p>
        <p>Visit Again!</p>
      </div>
    </div>
  );
}
