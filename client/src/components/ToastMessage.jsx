import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function ToastMessage() {
  const { toast, dismissToast } = useCart();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(dismissToast, 2200);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="toast-wrapper no-print" role="status" aria-live="polite">
      <div key={toast.id} className={`app-toast ${isError ? 'app-toast-error' : 'app-toast-success'}`}>
        <i className={`bi ${isError ? 'bi-exclamation-circle' : 'bi-check-circle'} me-2`}></i>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
