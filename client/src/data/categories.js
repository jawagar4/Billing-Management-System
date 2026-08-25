// Category metadata: icon (Bootstrap Icons class) and accent color per category.
export const CATEGORIES = [
  { name: 'Vegetables', icon: 'bi-egg-fried', color: '#4C9A2A' },
  { name: 'Fruits', icon: 'bi-apple', color: '#E67E22' },
  { name: 'Rice & Grains', icon: 'bi-basket2', color: '#D9A441' },
  { name: 'Nuts', icon: 'bi-circle-half', color: '#C7902B' },
  { name: 'Oil', icon: 'bi-droplet-half', color: '#F2C230' },
  { name: 'Spices', icon: 'bi-fire', color: '#C0392B' },
  { name: 'Coffee & Tea', icon: 'bi-cup-hot', color: '#6F4E37' },
  { name: 'Biscuits', icon: 'bi-cookie', color: '#E8C36A' },
  { name: 'Snacks', icon: 'bi-bag', color: '#F2994A' },
  { name: 'Dairy Products', icon: 'bi-cup-straw', color: '#3B82C4' },
  { name: 'Beverages', icon: 'bi-cup', color: '#2E7D32' },
  { name: 'Personal Care', icon: 'bi-droplet', color: '#1565C0' },
  { name: 'Household Products', icon: 'bi-house-door', color: '#00897B' },
  { name: 'Bakery', icon: 'bi-cake2', color: '#C68958' },
  { name: 'Frozen Foods', icon: 'bi-snow', color: '#3498DB' },
];

export const CATEGORY_NAMES = ['All', ...CATEGORIES.map((c) => c.name)];
