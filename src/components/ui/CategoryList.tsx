import type { CategoryTotal } from '@/types';
import CategoryCard from './CategoryCard';

interface CategoryListProps {
  categories: CategoryTotal[];
  totalExpenses: number;
  monthLabel: string;
}

export default function CategoryList({ categories, totalExpenses, monthLabel }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="py-12 text-center bg-gray-50 border border-gray-100/80 rounded-2xl shadow-sm">
        <p className="text-[14px] text-gray-500 font-medium">Sin gastos en {monthLabel}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map((cat, i) => (
        <CategoryCard
          key={cat.category}
          category={cat}
          index={i}
          totalExpenses={totalExpenses}
        />
      ))}
    </div>
  );
}
