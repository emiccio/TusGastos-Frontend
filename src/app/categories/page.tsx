'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import CategoryBarChart from '@/components/charts/CategoryBarChart';
import { getCategories } from '@/lib/api';
import { formatMoney, CATEGORY_COLORS } from '@/lib/utils';
import type { TopCategories } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS_ES = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre',
];

export default function CategoriesPage() {
  const [data, setData] = useState<TopCategories | null>(null);
  const [loading, setLoading] = useState(true);
  const [monthOffset, setMonthOffset] = useState(0);

  async function load(offset: number) {
    setLoading(true);
    try {
      const res = await getCategories(offset);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(monthOffset); }, [monthOffset]);

  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
  const monthLabel = `${MONTHS_ES[targetDate.getMonth()]} ${targetDate.getFullYear()}`;

  return (
    <AppLayout>
      {/* Topbar */}
      <div className="bg-white border-b border-gray-100 px-7 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-medium text-gray-900">Categorías</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">En qué gastás tu plata</p>
        </div>

        {/* Month navigator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMonthOffset((o) => o + 1)}
            className="p-1.5 text-gray-400 hover:text-gray-700 border border-gray-200 rounded-lg transition-colors"
          >
            <ChevronLeft size={13} />
          </button>
          <span className="text-[12.5px] text-gray-600 font-medium w-32 text-center capitalize">
            {monthLabel}
          </span>
          <button
            onClick={() => setMonthOffset((o) => Math.max(0, o - 1))}
            disabled={monthOffset === 0}
            className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 border border-gray-200 rounded-lg transition-colors"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      <div className="p-7 space-y-4">
        {/* Summary KPI */}
        {!loading && data && (
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium mb-1">
              Total gastado en {monthLabel}
            </p>
            <p className="font-mono text-[22px] font-medium text-[#c04040] tracking-tight">
              {formatMoney(data.totalExpenses)}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {/* Bar chart */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="text-[13px] font-medium text-gray-900 mb-4">Distribución</h2>
            {loading ? (
              <div className="h-48 bg-gray-50 rounded animate-pulse" />
            ) : data ? (
              <CategoryBarChart data={data.categories} />
            ) : null}
          </div>

          {/* Category list */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="text-[13px] font-medium text-gray-900 mb-4">
              Detalle por categoría
            </h2>
            {loading ? (
              <div className="space-y-3">
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} className="h-10 bg-gray-50 rounded animate-pulse" />
                ))}
              </div>
            ) : data && data.categories.length > 0 ? (
              <div className="space-y-2">
                {data.categories.map((cat, i) => {
                  const color = CATEGORY_COLORS[cat.category] ?? '#9c9c9c';
                  const pct = data.totalExpenses > 0
                    ? Math.round((cat.total / data.totalExpenses) * 100)
                    : 0;
                  return (
                    <div
                      key={cat.category}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-[11px] font-medium text-gray-400 w-4 text-right"
                        >
                          {i + 1}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: color }}
                        />
                        <span className="text-[12.5px] text-gray-700">{cat.category}</span>
                        <span className="text-[10.5px] text-gray-400 bg-white px-1.5 py-0.5 rounded">
                          {pct}%
                        </span>
                      </div>
                      <span className="font-mono text-[12.5px] font-medium text-[#c04040]">
                        {formatMoney(cat.total)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-400">Sin gastos en {monthLabel}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
