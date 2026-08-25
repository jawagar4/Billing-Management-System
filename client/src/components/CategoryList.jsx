import { CATEGORIES } from '../data/categories';
import CategoryCard from './CategoryCard';

export default function CategoryList({ activeCategory, onSelect, counts = {} }) {
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="category-list-wrap">
      <div className="category-list">
        <CategoryCard
          name="All"
          icon="bi-grid-3x3-gap-fill"
          color="#1B6B4A"
          count={totalCount || undefined}
          active={activeCategory === 'All'}
          onClick={() => onSelect('All')}
        />
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.name}
            name={cat.name}
            icon={cat.icon}
            color={cat.color}
            count={counts[cat.name]}
            active={activeCategory === cat.name}
            onClick={() => onSelect(cat.name)}
          />
        ))}
      </div>
    </div>
  );
}
