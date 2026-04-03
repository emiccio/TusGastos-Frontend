'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import KpiCard from '@/components/ui/KpiCard';
import CategoryRow from '@/components/ui/CategoryRow';
import DonutChart from '@/components/charts/DonutChart';
import TransactionBadge from '@/components/ui/TransactionBadge';
import NewTransactionModal from '@/components/ui/NewTransactionModal';
import { getDashboard } from '@/lib/api';
import { formatDateShort, formatMoney, percentageChange } from '@/lib/utils';
import type { DashboardData } from '@/types';
import { Plus, MessageCircle } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  async function load() {
    try {
      const d = await getDashboard();
      setData(d);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const incomeChange = data
    ? percentageChange(data.currentMonth.income, data.lastMonth.income)
    : 0;
  const expenseChange = data
    ? percentageChange(data.currentMonth.expenses, data.lastMonth.expenses)
    : 0;

  const maxCategoryTotal = data?.topCategories.categories[0]?.total ?? 1;

  return (
    <AppLayout>
      {/* Topbar */}
      <div className="bg-white border-b border-gray-100 px-7 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-medium text-gray-900">Resumen del mes</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">
            {data?.currentMonth.period ?? 'Cargando...'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-gray-900 text-white text-[12.5px] font-medium px-3.5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={13} />
          Nueva
        </button>
      </div>

      <div className="p-7 space-y-5">
        {/* KPIs */}
        {loading ? (
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 animate-pulse h-20" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <KpiCard
              label="Ingresos"
              value={data?.currentMonth.income ?? 0}
              delta={incomeChange}
              variant="income"
            />
            <KpiCard
              label="Gastos"
              value={data?.currentMonth.expenses ?? 0}
              delta={expenseChange}
              variant="expense"
            />
            <KpiCard
              label="Balance"
              value={data?.currentMonth.balance ?? 0}
              deltaLabel="Disponible este mes"
              variant="neutral"
            />
          </div>
        )}

        {/* Gráfico + Categorías */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="text-[13px] font-medium text-gray-900 mb-3">Gastos por categoría</h2>
            {!loading && data && (
              <DonutChart data={data.topCategories.categories} />
            )}
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="text-[13px] font-medium text-gray-900 mb-4">Top categorías</h2>
            {!loading && data ? (
              <div className="space-y-3">
                {data.topCategories.categories.map((cat) => (
                  <CategoryRow
                    key={cat.category}
                    category={cat.category}
                    total={cat.total}
                    maxTotal={maxCategoryTotal}
                  />
                ))}
                {data.topCategories.categories.length === 0 && (
                  <p className="text-sm text-gray-400">Sin gastos este mes</p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {[0,1,2,3].map(i => (
                  <div key={i} className="h-8 bg-gray-50 rounded animate-pulse" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Últimos movimientos */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-medium text-gray-900">Últimos movimientos</h2>
            <a href="/transactions" className="text-[11.5px] text-gray-400 hover:text-gray-600 transition-colors">
              Ver todos →
            </a>
          </div>

          {!loading && data ? (
            data.recent.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="divide-y divide-gray-50">
                {data.recent.map((tx) => (
                  <div key={tx.id} className="flex items-center gap-3 py-2.5">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                      {getCategoryEmoji(tx.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] text-gray-800 truncate">
                        {tx.description || tx.category}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {formatDateShort(tx.date)}
                      </p>
                    </div>
                    <span
                      className={`font-mono text-[13px] font-medium flex-shrink-0 ${
                        tx.type === 'income' ? 'text-[#2d8a5e]' : 'text-[#c04040]'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '−'}{formatMoney(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-2">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="h-10 bg-gray-50 rounded animate-pulse" />
              ))}
            </div>
          )}
        </div>

        {/* WhatsApp banner */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <MessageCircle size={16} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-medium text-gray-900">Registrá desde WhatsApp</p>
            <p className="text-[11.5px] text-gray-400 mt-0.5">
              Escribile a Lulu: <span className="text-gray-600 font-medium">"gasté 20k en súper"</span> o{' '}
              <span className="text-gray-600 font-medium">"cobré 500k"</span>
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <NewTransactionModal
          onClose={() => setShowModal(false)}
          onSuccess={load}
        />
      )}
    </AppLayout>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8">
      <p className="text-sm text-gray-500">Todavía no hay movimientos este mes</p>
      <p className="text-xs text-gray-400 mt-1">
        Escribile a Lulu por WhatsApp para empezar a registrar
      </p>
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Supermercado: '🛒', Restaurantes: '🍽️', Transporte: '🚌',
    Nafta: '⛽', Servicios: '💡', Salud: '❤️', Farmacia: '💊',
    Ropa: '👕', Entretenimiento: '🎬', Educación: '📚',
    Viajes: '✈️', Hogar: '🏠', Sueldo: '💰', Freelance: '💻',
    Transferencia: '💸', Otros: '📦',
  };
  return map[category] ?? '📦';
}
