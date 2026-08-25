export const formatInvoiceDate = (date = new Date()) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB'); // DD/MM/YYYY
};

export const formatInvoiceTime = (date = new Date()) => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};
