import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import BillingSummary from '../components/BillingSummary';
import PaymentSection from '../components/PaymentSection';
import Receipt from '../components/Receipt';
import { api } from '../api/api';
import { formatCurrency } from '../utils/billing';

export default function Billing() {
  const { items, billingItems, bill, discount, gstPercentOverride, customer, setCustomer, clearCart, showToast } = useCart();
  const navigate = useNavigate();

  const [payment, setPayment] = useState({ method: 'Cash', cashReceived: 0 });
  const [shopInfo, setShopInfo] = useState(null);
  const [nextInvoiceNo, setNextInvoiceNo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    api.getShopInfo().then(setShopInfo).catch(() => {});
    api.getNextInvoiceNo().then((r) => setNextInvoiceNo(r.invoiceNo)).catch(() => {});
  }, []);

  const handlePrintBill = async () => {
    if (items.length === 0) {
      showToast('Please add at least one product before printing the bill.', 'error');
      return;
    }
    if (payment.method === 'Cash' && (Number(payment.cashReceived) || 0) < bill.grandTotal) {
      showToast('Cash received is less than the grand total.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const order = await api.createOrder({
        items: billingItems.map((i) => ({ productId: i.productId, qty: i.qty })),
        discount,
        gstPercentOverride,
        customer,
        payment,
      });
      setCompletedOrder(order);
      // Let React paint the receipt before invoking the print dialog.
      setTimeout(() => window.print(), 150);
    } catch (err) {
      showToast(err.message || 'Failed to print bill', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewBill = () => {
    clearCart();
    setPayment({ method: 'Cash', cashReceived: 0 });
    setCompletedOrder(null);
    api.getNextInvoiceNo().then((r) => setNextInvoiceNo(r.invoiceNo)).catch(() => {});
    navigate('/products');
  };

  if (items.length === 0 && !completedOrder) {
    return (
      <div className="page-billing">
        <div className="empty-state">
          <i className="bi bi-cart-x"></i>
          <p>Please add at least one product before printing the bill.</p>
          <Link to="/products" className="btn-primary-lg">Browse products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-billing">
      {!completedOrder ? (
        <>
          <div className="billing-header no-print">
            <h1><i className="bi bi-receipt me-2"></i>Billing</h1>
            <span className="invoice-preview">Invoice: {nextInvoiceNo || '—'}</span>
          </div>

          <div className="billing-layout no-print">
            <div className="billing-left">
              <section className="billing-block">
                <h2 className="section-label">Cart items</h2>
                <div className="cart-item-list">
                  {items.map((item) => (
                    <CartItem key={item.productId} item={item} />
                  ))}
                </div>
              </section>

              <section className="billing-block">
                <h2 className="section-label">Customer details <span className="optional-tag">optional</span></h2>
                <div className="customer-form">
                  <input
                    type="text"
                    placeholder="Customer name"
                    value={customer.name}
                    onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                  />
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    value={customer.mobile}
                    onChange={(e) => setCustomer((c) => ({ ...c, mobile: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={customer.address}
                    onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="GST number"
                    value={customer.gstNumber}
                    onChange={(e) => setCustomer((c) => ({ ...c, gstNumber: e.target.value }))}
                  />
                </div>
              </section>
            </div>

            <div className="billing-right">
              <section className="billing-block">
                <h2 className="section-label">Bill summary</h2>
                <BillingSummary />
              </section>

              <section className="billing-block">
                <PaymentSection payment={payment} setPayment={setPayment} grandTotal={bill.grandTotal} />
              </section>

              <button
                type="button"
                className="btn-primary-lg print-bill-btn"
                onClick={handlePrintBill}
                disabled={submitting}
              >
                {submitting ? (
                  <><span className="spinner"></span> Processing...</>
                ) : (
                  <><i className="bi bi-printer me-2"></i>Print Bill · {formatCurrency(bill.grandTotal)}</>
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="receipt-preview-wrap no-print">
          <div className="receipt-success">
            <i className="bi bi-check-circle-fill"></i>
            <h2>Bill printed — {completedOrder.invoiceNo}</h2>
            <p>Grand total {formatCurrency(completedOrder.grandTotal)}</p>
          </div>
          <div className="receipt-frame">
            <Receipt
              shopInfo={shopInfo}
              invoiceNo={completedOrder.invoiceNo}
              date={completedOrder.createdAt}
              items={completedOrder.items.map((i) => ({ ...i, productId: i.product }))}
              bill={{
                subtotal: completedOrder.subtotal,
                discount: completedOrder.discount,
                taxableAmount: completedOrder.taxableAmount,
                gstAmount: completedOrder.gstAmount,
                grandTotal: completedOrder.grandTotal,
              }}
              customer={completedOrder.customer}
              payment={completedOrder.payment}
            />
          </div>
          <div className="receipt-actions">
            <button type="button" className="btn-secondary-lg" onClick={() => window.print()}>
              <i className="bi bi-printer me-2"></i>Reprint
            </button>
            <button type="button" className="btn-primary-lg" onClick={handleNewBill}>
              <i className="bi bi-plus-lg me-2"></i>New Bill
            </button>
          </div>
        </div>
      )}

      {/* Always mounted so the print stylesheet can reveal it; kept off-screen otherwise. */}
      {completedOrder && (
        <div className="print-only">
          <Receipt
            shopInfo={shopInfo}
            invoiceNo={completedOrder.invoiceNo}
            date={completedOrder.createdAt}
            items={completedOrder.items.map((i) => ({ ...i, productId: i.product }))}
            bill={{
              subtotal: completedOrder.subtotal,
              discount: completedOrder.discount,
              taxableAmount: completedOrder.taxableAmount,
              gstAmount: completedOrder.gstAmount,
              grandTotal: completedOrder.grandTotal,
            }}
            customer={completedOrder.customer}
            payment={completedOrder.payment}
          />
        </div>
      )}
    </div>
  );
}
