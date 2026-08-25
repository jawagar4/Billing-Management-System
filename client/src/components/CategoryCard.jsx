export default function CategoryCard({ name, icon, color, count, active, onClick }) {
  return (
    <button
      type="button"
      className={`category-card ${active ? 'active' : ''}`}
      style={{ '--cat-color': color || '#1B6B4A' }}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="category-icon">
        <i className={`bi ${icon || 'bi-basket'}`}></i>
      </span>
      <span className="category-name">{name}</span>
      {typeof count === 'number' && <span className="category-count">{count}</span>}
    </button>
  );
}
