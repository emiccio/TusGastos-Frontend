'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { formatMoney, CATEGORY_COLORS } from '@/lib/utils';
import type { CategoryTotal } from '@/types';

interface DonutChartProps {
  data: CategoryTotal[];
}

export default function DonutChart({ data }: DonutChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-gray-400">
        Sin datos para mostrar
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={2}
          dataKey="total"
          nameKey="category"
        >
          {data.map((entry) => (
            <Cell
              key={entry.category}
              fill={CATEGORY_COLORS[entry.category] ?? '#9c9c9c'}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [formatMoney(value), '']}
          labelFormatter={(label) => label}
          contentStyle={{
            fontSize: 12,
            border: '0.5px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: 'none',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
