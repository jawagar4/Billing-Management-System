import { useEffect, useState } from 'react';
import { formatCurrency } from '../utils/billing';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();

  const [justAdded, setJustAdded] = useState(false);

  // Only vegetables get unit selection
  const isVegetable =
    product.category?.toLowerCase() === 'vegetables';

  const vegetableUnits = [
    {
      label: '100 g',
      multiplier: 0.13,
    },
    
    {
      label: '250 g',
      multiplier: 0.22,
    },
    {
      label: '500 g',
      multiplier: 0.51,
    },
    {
      label: '750 g',
      multiplier: 0.7,
    },
    {
      label: '1 kg',
      multiplier: 1,
    },
    {
      label: '2 kg',
      multiplier: 2,
    },
  ];

  const [selectedUnit, setSelectedUnit] = useState(
    isVegetable ? vegetableUnits[1] : null
  );

  // Keep non-vegetable products unchanged
  const currentPrice = isVegetable
    ? product.price * selectedUnit.multiplier
    : product.price;

  const currentMrp = isVegetable && product.mrp
    ? product.mrp * selectedUnit.multiplier
    : product.mrp;

  const inCart = items.find(
    (i) => i.productId === product._id
  );

  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 10;

  const discountPercent =
    currentMrp > currentPrice
      ? Math.round(
          ((currentMrp - currentPrice) / currentMrp) * 100
        )
      : 0;

  const handleAdd = () => {
    if (outOfStock) return;

    // Send selected vegetable unit + calculated price
    const productToAdd = isVegetable
      ? {
          ...product,
          unit: selectedUnit.label,
          price: currentPrice,
          mrp: currentMrp,
        }
      : product;

    addItem(productToAdd, 1);

    setJustAdded(true);

    setTimeout(() => {
      setJustAdded(false);
    }, 500);
  };

  return (
    <div
      className={`product-card ${
        outOfStock ? 'is-out' : ''
      } ${lowStock ? 'is-low' : ''}`}
    >

      {/* IMAGE */}
      <div
        className="product-image-tile w-100 overflow-hidden"
        style={{
          background: product.color || '#EFF3EE',
        }}
      >
        <img
          className="product-emoji w-100"
          aria-hidden="true"
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/product-placeholder.png';
          }}
        />

        {discountPercent > 0 && (
          <span className="discount-badge">
            {discountPercent}% OFF
          </span>
        )}

        {outOfStock && (
          <span className="stock-badge out">
            Out of stock
          </span>
        )}

        {lowStock && (
          <span className="stock-badge low">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="product-info w-100">

        <p className="product-category">
          {product.category}
        </p>

        <h3
          className="product-name"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* VEGETABLE UNIT SELECTOR */}
        {isVegetable ? (
          <select
            className="vegetable-unit-select"
            value={selectedUnit.label}
            onChange={(e) => {
              const unit = vegetableUnits.find(
                (u) => u.label === e.target.value
              );

              setSelectedUnit(unit);
            }}
          >
            {vegetableUnits.map((unit) => (
              <option
                key={unit.label}
                value={unit.label}
              >
                {unit.label}
              </option>
            ))}
          </select>
        ) : (
          <p className="product-unit">
            {product.brand
              ? `${product.brand} · `
              : ''}
            {product.unit}
          </p>
        )}

        {/* PRICE */}
        <div className="product-price-row w-100">

          <div>
            <span className="product-price">
              {formatCurrency(currentPrice)}
            </span>

            {currentMrp > currentPrice && (
              <span className="product-mrp">
                {formatCurrency(currentMrp)}
              </span>
            )}
          </div>

          {/* ADD */}
          <button
            type="button"
            className={`add-btn ${
              inCart ? 'in-cart' : ''
            } ${justAdded ? 'bump' : ''}`}
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label={`Add ${product.name} to cart`}
          >
            {outOfStock ? (
              <i className="bi bi-slash-circle"></i>
            ) : inCart ? (
              <>
                <i className="bi bi-check-lg me-1"></i>
                {inCart.qty}
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg me-1"></i>
                Add
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}