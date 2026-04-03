'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatMoney, CATEGORY_COLORS } from '@/lib/utils';
import type { CategoryTotal } from '@/types';

interface CategoryBarChartProps {
  data: CategoryTotal[];
}

export default function CategoryBarChart({ data }: CategoryBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-gray-400">
        Sin datos para mostrar
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
        <XAxis
          dataKey="category"
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => '$' + (v / 1000).toFixed(0) + 'k'}
          width={44}
        />
        <Tooltip
          formatter={(value: number) => [formatMoney(value), 'Total']}
          contentStyle={{
            fontSize: 12,
            border: '0.5px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: 'none',
          }}
          cursor={{ fill: '#f9fafb' }}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.category}
              fill={CATEGORY_COLORS[entry.category] ?? '#9c9c9c'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
