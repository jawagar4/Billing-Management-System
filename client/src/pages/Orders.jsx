import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { formatCurrency } from '../utils/billing';
import { formatInvoiceDate, formatInvoiceTime } from '../utils/invoice';
import Receipt from '../components/Receipt';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewing, setViewing] = useState(null);
  const [shopInfo, setShopInfo] = useState(null);

  useEffect(() => {
    api.getShopInfo().then(setShopInfo).catch(() => {});
    api
      .getOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = (order) => {
    setViewing(order);
    setTimeout(() => window.print(), 150);
  };

  return (
    <div className="page-orders">
      <div className="page-heading no-print">
        <h1><i className="bi bi-clock-history me-2"></i>Billing History</h1>
        <p>{orders.length} invoice{orders.length !== 1 ? 's' : ''} recorded</p>
      </div>

      {error && <div className="alert-error no-print"><i className="bi bi-exclamation-triangle me-2"></i>{error}</div>}

      {loading ? (
        <div className="empty-state no-print"><i className="bi bi-hourglass-split"></i><p>Loading orders...</p></div>
      ) : orders.length === 0 ? (
        <div className="empty-state no-print">
          <i className="bi bi-receipt"></i>
          <p>No bills yet. Completed invoices will show up here.</p>
        </div>
      ) : (
        <div className="orders-table-wrap no-print">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td className="mono">{o.invoiceNo}</td>
                  <td>{formatInvoiceDate(o.createdAt)} <span className="muted">{formatInvoiceTime(o.createdAt)}</span></td>
                  <td>{o.customer?.name || <span className="muted">Walk-in</span>}</td>
                  <td className="mono">{formatCurrency(o.grandTotal)}</td>
                  <td><span className={`payment-chip ${o.payment.method.toLowerCase()}`}>{o.payment.method}</span></td>
                  <td className="orders-actions">
                    <button type="button" className="link-btn" onClick={() => setViewing(o)}>
                      <i className="bi bi-eye me-1"></i>View
                    </button>
                    <button type="button" className="link-btn" onClick={() => handlePrint(o)}>
                      <i className="bi bi-printer me-1"></i>Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewing && (
        <div className="cart-drawer-overlay no-print" onClick={() => setViewing(null)}>
          <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="icon-btn receipt-modal-close" onClick={() => setViewing(null)} aria-label="Close">
              <i className="bi bi-x-lg"></i>
            </button>
            <Receipt
              shopInfo={shopInfo}
              invoiceNo={viewing.invoiceNo}
              date={viewing.createdAt}
              items={viewing.items.map((i) => ({ ...i, productId: i.product }))}
              bill={{
                subtotal: viewing.subtotal,
                discount: viewing.discount,
                taxableAmount: viewing.taxableAmount,
                gstAmount: viewing.gstAmount,
                grandTotal: viewing.grandTotal,
              }}
              customer={viewing.customer}
              payment={viewing.payment}
            />
          </div>
        </div>
      )}

      {viewing && (
        <div className="print-only">
          <Receipt
            shopInfo={shopInfo}
            invoiceNo={viewing.invoiceNo}
            date={viewing.createdAt}
            items={viewing.items.map((i) => ({ ...i, productId: i.product }))}
            bill={{
              subtotal: viewing.subtotal,
              discount: viewing.discount,
              taxableAmount: viewing.taxableAmount,
              gstAmount: viewing.gstAmount,
              grandTotal: viewing.grandTotal,
            }}
            customer={viewing.customer}
            payment={viewing.payment}
          />
        </div>
      )}
    </div>
  );
}
