'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import CategoryBarChart from '@/components/charts/CategoryBarChart';
import CategoryList from '@/components/ui/CategoryList';
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
      <div className="bg-white border-b border-gray-100 px-5 md:px-7 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[16px] md:text-[15px] font-semibold md:font-medium text-gray-900 tracking-tight md:tracking-normal">Categorías</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">En qué gastás tu plata</p>
        </div>

        {/* Month navigator (Desktop only inside topbar) */}
        <div className="hidden md:flex items-center gap-2">
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

      {/* Month navigator (Mobile) */}
      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex justify-center">
        <div className="flex items-center justify-between w-full max-w-[280px]">
          <button
            onClick={() => setMonthOffset((o) => o + 1)}
            className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <span className="text-[13.5px] text-gray-800 font-bold capitalize tracking-wide">
            {monthLabel}
          </span>
          <button
            onClick={() => setMonthOffset((o) => Math.max(0, o - 1))}
            disabled={monthOffset === 0}
            className="p-2 text-gray-400 disabled:opacity-20 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="p-4 md:p-7 space-y-4 md:space-y-4">
        {/* Summary KPI */}
        {!loading && data && (
          <div className="bg-white border border-gray-100 md:rounded-xl p-5 md:p-4 text-center md:text-left rounded-2xl shadow-sm md:shadow-none w-full">
            <p className="text-[11.5px] md:text-[11px] uppercase tracking-wider md:tracking-wide text-gray-400 font-bold md:font-medium mb-1.5 md:mb-1">
              Total gastado en {monthLabel}
            </p>
            <p className="font-mono text-[34px] md:text-[22px] font-bold md:font-medium text-[#c04040] tracking-tight leading-none md:leading-normal">
              {formatMoney(data.totalExpenses)}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-4">
          {/* Bar chart */}
          <div className="bg-white border border-gray-100 rounded-2xl md:rounded-xl p-5 md:p-5 shadow-sm md:shadow-none w-full overflow-hidden">
            <h2 className="text-[14px] md:text-[13px] font-semibold md:font-medium text-gray-900 mb-4 text-center md:text-left">Distribución</h2>
            {loading ? (
              <div className="h-48 bg-gray-50 rounded-xl animate-pulse" />
            ) : data ? (
              <CategoryBarChart data={data.categories} />
            ) : null}
          </div>

          {/* Category list (Mobile) */}
          <div className="md:hidden">
            <h2 className="text-[14.5px] font-bold text-gray-900 mb-3 ml-1">
              Detalle por categoría
            </h2>
            {loading ? (
              <div className="space-y-3">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="h-16 bg-white border border-gray-100/50 rounded-2xl animate-pulse shadow-sm" />
                ))}
              </div>
            ) : data && data.categories ? (
              <CategoryList categories={data.categories} totalExpenses={data.totalExpenses} monthLabel={monthLabel} />
            ) : null}
          </div>

          {/* Category list (Desktop) */}
          <div className="hidden md:block bg-white border border-gray-100 rounded-xl p-5">
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
