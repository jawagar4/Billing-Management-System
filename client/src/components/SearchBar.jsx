import { useState } from 'react';

/**
 * Large product search bar used at the top of the Products page.
 * Also exposes a barcode-entry mode for the "scan" workflow.
 */
export default function SearchBar({ value, onChange, onBarcodeSubmit }) {
  const [barcodeMode, setBarcodeMode] = useState(false);
  const [barcode, setBarcode] = useState('');

  const submitBarcode = (e) => {
    e.preventDefault();
    if (!barcode.trim()) return;
    onBarcodeSubmit(barcode.trim());
    setBarcode('');
  };

  return (
    <div className="search-bar-wrap">
      {!barcodeMode ? (
        <div className="search-bar">
          <i className="bi bi-search"></i>
          <input
            type="search"
            placeholder="Search by product name, category, or brand..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Search products"
          />
          {value && (
            <button
              type="button"
              className="clear-search-btn"
              aria-label="Clear search"
              onClick={() => onChange('')}
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          )}
          <button
            type="button"
            className="barcode-toggle-btn"
            onClick={() => setBarcodeMode(true)}
          >
            <i className="bi bi-upc-scan me-1"></i>
            <span className="d-none d-sm-inline">Scan barcode</span>
          </button>
        </div>
      ) : (
        <form className="search-bar" onSubmit={submitBarcode}>
          <i className="bi bi-upc-scan"></i>
          <input
            type="text"
            autoFocus
            placeholder="Scan / enter barcode..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            aria-label="Scan or enter barcode"
          />
          <button type="submit" className="barcode-toggle-btn">
            Search
          </button>
          <button
            type="button"
            className="clear-search-btn"
            aria-label="Back to product search"
            onClick={() => setBarcodeMode(false)}
          >
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </form>
      )}
    </div>
  );
}
