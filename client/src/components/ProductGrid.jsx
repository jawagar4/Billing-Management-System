import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading, emptyMessage }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="product-card skeleton" key={i}>
            <div className="product-image-tile skeleton-block" />
            <div className="product-info">
              <div className="skeleton-line w-40" />
              <div className="skeleton-line w-80" />
              <div className="skeleton-line w-60" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <i className="bi bi-search"></i>
        <p>{emptyMessage || 'No products found. Try a different search or category.'}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
