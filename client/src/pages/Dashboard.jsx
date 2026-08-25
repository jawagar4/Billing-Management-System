import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import { formatCurrency } from '../utils/billing';

const CARD_META = [
  { key: 'todaySales', label: "Today's Sales", icon: 'bi-currency-rupee', color: '#1B6B4A', isCurrency: true },
  { key: 'todayBills', label: "Today's Bills", icon: 'bi-receipt', color: '#1565C0' },
  { key: 'totalProducts', label: 'Total Products', icon: 'bi-box-seam', color: '#8E5A2B' },
  { key: 'lowStock', label: 'Low Stock', icon: 'bi-exclamation-triangle', color: '#C0392B' },
];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getDashboardSummary()
      .then(setSummary)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-dashboard">
      <div className="page-heading">
        <h1><i className="bi bi-speedometer2 me-2"></i>Dashboard</h1>
        <p>A quick snapshot of how the counter is doing today.</p>
      </div>

      {error && <div className="alert-error"><i className="bi bi-exclamation-triangle me-2"></i>{error}</div>}

      <div className="dashboard-cards">
        {CARD_META.map((card) => (
          <div className="dashboard-card" key={card.key} style={{ '--card-color': card.color }}>
            <span className="dashboard-card-icon"><i className={`bi ${card.icon}`}></i></span>
            <div>
              <p className="dashboard-card-label">{card.label}</p>
              <p className="dashboard-card-value">
                {loading || !summary
                  ? '—'
                  : card.isCurrency
                  ? formatCurrency(summary[card.key])
                  : summary[card.key]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!loading && summary?.lowStock > 0 && (
        <div className="dashboard-alert">
          <i className="bi bi-exclamation-triangle-fill"></i>
          <span>{summary.lowStock} product{summary.lowStock !== 1 ? 's are' : ' is'} running low on stock.</span>
          <Link to="/admin">Manage inventory <i className="bi bi-arrow-right"></i></Link>
        </div>
      )}
    </div>
  );
}
