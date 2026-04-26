import { formatMoney, CATEGORY_COLORS } from '@/lib/utils';
import type { CategoryTotal } from '@/types';

interface CategoryCardProps {
  category: CategoryTotal;
  index: number;
  totalExpenses: number;
}

export default function CategoryCard({ category, index, totalExpenses }: CategoryCardProps) {
  const color = CATEGORY_COLORS[category.category] ?? '#9c9c9c';
  const pct = totalExpenses > 0 ? Math.round((category.total / totalExpenses) * 100) : 0;

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100/80 rounded-2xl shadow-sm active:scale-[0.98] transition-transform">
      <div className="flex items-center gap-3.5">
        <span className="text-[12px] font-semibold text-gray-400 w-3 text-right">
          {index + 1}
        </span>
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ background: color }}
        />
        <span className="text-[14px] font-semibold text-gray-800">{category.category}</span>
        <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
          {pct}%
        </span>
      </div>
      <span className="text-[14.5px] font-bold text-[#c04040] tabular-nums tracking-tight">
        {formatMoney(category.total)}
      </span>
    </div>
  );
}
