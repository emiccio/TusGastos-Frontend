'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import KpiCard from '@/components/ui/KpiCard';
import CategoryRow from '@/components/ui/CategoryRow';
import DonutChart from '@/components/charts/DonutChart';
import NewTransactionModal from '@/components/ui/NewTransactionModal';
import { getDashboard } from '@/lib/api';
import { formatDateShort, formatMoney, percentageChange } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { DashboardData } from '@/types';
import { Plus, MessageCircle, TrendingUp, TrendingDown } from 'lucide-react';

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

      {/* ═══════════════════════════════════════════
          MOBILE HERO — only visible below md
      ═══════════════════════════════════════════ */}
      <div className="md:hidden bg-gray-950 px-5 pt-6 pb-8 relative overflow-hidden">
        {/* Decorative orb */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Header row */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">TusGastos</p>
            <h1 className="text-[16px] font-semibold text-white tracking-tight mt-0.5">
              Resumen del mes
            </h1>
          </div>
          <button
            id="btn-new-transaction-mobile"
            onClick={() => setShowModal(true)}
            className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center hover:bg-emerald-400 active:scale-95 transition-all"
          >
            <Plus size={18} strokeWidth={2.5} className="text-white" />
          </button>
        </div>

        {/* Balance hero */}
        <div className="relative z-10">
          <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
            Balance disponible
          </p>
          {loading ? (
            <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse mb-4" />
          ) : (
            <p className="font-mono text-[36px] font-semibold text-white tracking-tight leading-none mb-4">
              {formatMoney(data?.currentMonth.balance ?? 0)}
            </p>
          )}

          {/* Income / Expense chips */}
          <div className="grid grid-cols-2 gap-3">
            {/* Income chip */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp size={10} className="text-emerald-400" strokeWidth={2.5} />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Ingresos</p>
              </div>
              {loading ? (
                <div className="h-5 w-20 bg-white/10 rounded animate-pulse" />
              ) : (
                <p className="font-mono text-[17px] font-semibold text-emerald-400 tracking-tight">
                  {formatMoney(data?.currentMonth.income ?? 0)}
                </p>
              )}
              {!loading && (
                <p className={`text-[10px] mt-0.5 font-medium ${incomeChange >= 0 ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {incomeChange >= 0 ? '↑' : '↓'} {Math.abs(incomeChange)}% vs anterior
                </p>
              )}
            </div>

            {/* Expense chip */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                  <TrendingDown size={10} className="text-red-400" strokeWidth={2.5} />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Gastos</p>
              </div>
              {loading ? (
                <div className="h-5 w-20 bg-white/10 rounded animate-pulse" />
              ) : (
                <p className="font-mono text-[17px] font-semibold text-red-400 tracking-tight">
                  {formatMoney(data?.currentMonth.expenses ?? 0)}
                </p>
              )}
              {!loading && (
                <p className={`text-[10px] mt-0.5 font-medium ${expenseChange <= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {expenseChange >= 0 ? '↑' : '↓'} {Math.abs(expenseChange)}% vs anterior
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          DESKTOP PAGE HEADER — hidden on mobile
      ═══════════════════════════════════════════ */}
      <div className="hidden md:flex bg-white border-b border-gray-100 px-8 py-5 items-center justify-between">
        <div>
          <h1 className="text-[17px] font-semibold text-gray-900 tracking-tight">Resumen del mes</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">
            {data?.currentMonth.period ?? 'Cargando...'}
          </p>
        </div>
        <button
          id="btn-new-transaction"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-gray-900 text-white text-[12.5px] font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors active:scale-95"
        >
          <Plus size={14} strokeWidth={2.5} />
          Nueva transacción
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════ */}
      <div className="px-4 pt-4 pb-6 md:p-8 md:pt-8 space-y-4 md:space-y-6 md:max-w-6xl">

        {/* ── KPI Cards — desktop only (mobile uses hero above) ── */}
        <div className="hidden md:block">
          {loading ? (
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 animate-pulse h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
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
        </div>

        {/* Mobile period label */}
        <div className="md:hidden">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
            {data?.currentMonth.period ?? ''}
          </p>
        </div>

        {/* ── Chart + Categories ── */}
        {/* Mobile: stacked (1-col) | Desktop: 9-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-9 gap-4">

          {/* Donut chart — full on mobile, 5/9 on desktop */}
          <Card className="md:col-span-5">
            <CardHeader className="pb-2 px-5 pt-5">
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
                Gastos por categoría
              </p>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {!loading && data ? (
                <DonutChart data={data.topCategories.categories} />
              ) : (
                <div className="h-48 bg-gray-50 rounded-lg animate-pulse" />
              )}
            </CardContent>
          </Card>

          {/* Top categories — full on mobile, 4/9 on desktop */}
          <Card className="md:col-span-4">
            <CardHeader className="pb-2 px-5 pt-5">
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
                Top categorías
              </p>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {!loading && data ? (
                <div className="space-y-4">
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
                <div className="space-y-4">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="h-8 bg-gray-50 rounded animate-pulse" />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Recent Transactions ── */}
        <Card>
          <CardHeader className="px-5 pt-5 pb-0 flex-row items-center justify-between md:px-6">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
              Últimos movimientos
            </p>
            <a
              href="/transactions"
              className="text-[12px] text-gray-400 hover:text-gray-700 font-medium transition-colors"
            >
              Ver todos →
            </a>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-3 md:px-6 md:pb-5">
            {!loading && data ? (
              data.recent.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="divide-y divide-gray-50">
                  {data.recent.map((tx, i) => (
                    <div key={tx.id ?? i} className="flex items-center gap-3 py-3 md:gap-4 group">
                      {/* Category icon */}
                      <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-[15px] flex-shrink-0 group-hover:bg-gray-100 transition-colors">
                        {getCategoryEmoji(tx.category)}
                      </div>

                      {/* Description + date */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-800 truncate">
                          {tx.description || tx.category}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-gray-400">
                            {formatDateShort(tx.date)}
                          </span>
                          <span className="text-[10px] text-gray-300">·</span>
                          <span className="text-[11px] text-gray-400">{tx.category}</span>
                        </div>
                      </div>

                      {/* Amount */}
                      <span
                        className={`font-mono text-[13px] md:text-[14px] font-semibold flex-shrink-0 ${
                          tx.type === 'income' ? 'text-emerald-600' : 'text-red-500'
                        }`}
                      >
                        {tx.type === 'income' ? '+' : '−'}{formatMoney(tx.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-3">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="h-12 bg-gray-50 rounded-lg animate-pulse" />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── WhatsApp Banner ── */}
        <div className="bg-emerald-950/5 border border-emerald-200/50 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <MessageCircle size={18} className="text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-gray-900">Registrá desde WhatsApp</p>
            <p className="text-[12px] text-gray-500 mt-0.5">
              Escribile a Lulu:{' '}
              <span className="text-gray-700 font-medium">"gasté 20k en súper"</span>
              {' '}o{' '}
              <span className="text-gray-700 font-medium">"cobré 500k"</span>
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
    <div className="text-center py-10">
      <p className="text-[14px] font-medium text-gray-500">Todavía no hay movimientos este mes</p>
      <p className="text-[12px] text-gray-400 mt-1">
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
