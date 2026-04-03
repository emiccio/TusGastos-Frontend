import { cn, formatMoney, CATEGORY_COLORS } from '@/lib/utils';

interface CategoryRowProps {
  category: string;
  total: number;
  maxTotal: number;
}

export default function CategoryRow({ category, total, maxTotal }: CategoryRowProps) {
  const color = CATEGORY_COLORS[category] ?? '#9c9c9c';
  const pct = maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[12.5px] text-gray-700 font-medium">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
          {category}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] text-gray-400">{pct}%</span>
          <span className="font-mono text-[12.5px] text-gray-900 font-semibold">{formatMoney(total)}</span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
