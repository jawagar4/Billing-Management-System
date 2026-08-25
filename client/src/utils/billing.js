// Reusable, pure billing functions. Every screen that shows money must go through
// these so totals can never drift or be calculated inconsistently.

/** Round to 2 decimal places, avoiding floating point artifacts like 12.230000000000001 */
export const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

/** Sum of (price * qty) for every cart line, before discount or tax. */
export const calculateSubtotal = (items = []) =>
  round2(items.reduce((sum, item) => sum + item.price * item.qty, 0));

/** Clamp a discount so it can never exceed the subtotal or go negative. */
export const calculateDiscount = (discount = 0, subtotal = 0) => {
  const value = Number(discount) || 0;
  if (value < 0) return 0;
  if (value > subtotal) return round2(subtotal);
  return round2(value);
};

/** GST calculated per-line (using each product's own GST%) on the discounted taxable amount. */
export const calculateGST = (items = [], subtotal = 0, discount = 0) => {
  if (subtotal <= 0) return 0;
  const discountRatio = discount > 0 ? (subtotal - discount) / subtotal : 1;
  const total = items.reduce((sum, item) => {
    const lineSubtotal = item.price * item.qty * discountRatio;
    return sum + (lineSubtotal * item.gstPercent) / 100;
  }, 0);
  return round2(total);
};

export const calculateTaxableAmount = (subtotal = 0, discount = 0) =>
  round2(subtotal - discount);

export const calculateGrandTotal = (taxableAmount = 0, gstAmount = 0) =>
  round2(taxableAmount + gstAmount);

export const calculateChange = (cashReceived = 0, grandTotal = 0) =>
  round2((Number(cashReceived) || 0) - grandTotal);

/** Runs the whole pipeline at once - the function every page should actually call. */
export const computeBill = (items = [], discount = 0) => {
  const subtotal = calculateSubtotal(items);
  const safeDiscount = calculateDiscount(discount, subtotal);
  const gstAmount = calculateGST(items, subtotal, safeDiscount);
  const taxableAmount = calculateTaxableAmount(subtotal, safeDiscount);
  const grandTotal = calculateGrandTotal(taxableAmount, gstAmount);
  return { subtotal, discount: safeDiscount, taxableAmount, gstAmount, grandTotal };
};

export const formatCurrency = (value = 0) =>
  `₹${round2(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
