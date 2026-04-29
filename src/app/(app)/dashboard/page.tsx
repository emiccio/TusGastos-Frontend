'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import KpiCard from '@/components/ui/KpiCard';
import CategoryRow from '@/components/ui/CategoryRow';
import DonutChart from '@/components/charts/DonutChart';
import NewTransactionModal from '@/components/ui/NewTransactionModal';
import { getDashboard, getHousehold } from '@/lib/api';
import { formatDateShort, formatMoney, percentageChange, getCategoryEmoji } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { DashboardData, HouseholdInfo } from '@/types';
import { Plus, MessageCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [household, setHousehold] = useState<HouseholdInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  async function load() {
    try {
      const [d, h] = await Promise.all([
        getDashboard(),
        getHousehold()
      ]);
      setData(d);
      setHousehold(h);
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
            <p className="text-[12px] uppercase tracking-widest text-emerald-500/80 font-bold">GestionAndo</p>
            <h1 className="text-[16px] font-semibold text-white tracking-tight mt-0.5">
              Resumen del mes
            </h1>
          </div>
        </div>

        {/* Balance hero */}
        <div className="relative z-10">
          <p className="text-[12px] uppercase tracking-widest text-gray-400 font-bold mb-1.5">
            Balance disponible
          </p>
          {loading ? (
            <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse mb-4" />
          ) : (
            <p className="text-[36px] font-semibold text-white tabular-nums tracking-tight leading-none mb-4">
              {formatMoney(data?.currentMonth.balance ?? 0)}
            </p>
          )}

          {/* Income / Expense chips */}
          <div className="grid grid-cols-2 gap-3">
            {/* Income chip */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-1.5 mb-1.5 relative z-10">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp size={10} className="text-emerald-400" strokeWidth={2.5} />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Ingresos</p>
              </div>
              {loading ? (
                <div className="h-5 w-20 bg-white/10 rounded animate-pulse" />
              ) : (
                <p className="text-[18px] font-semibold text-emerald-400 tabular-nums tracking-tight relative z-10">
                  {formatMoney(data?.currentMonth.income ?? 0)}
                </p>
              )}
              {!loading && (
                <p className={`text-[10px] mt-1 font-bold relative z-10 flex items-center gap-1 ${incomeChange >= 0 ? 'text-emerald-500/80' : 'text-gray-500'}`}>
                  {incomeChange >= 0 ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                  {Math.abs(incomeChange)}% <span className="font-medium opacity-60">vs anterior</span>
                </p>
              )}
            </div>

            {/* Expense chip */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-1.5 mb-1.5 relative z-10">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                  <TrendingDown size={10} className="text-red-400" strokeWidth={2.5} />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Gastos</p>
              </div>
              {loading ? (
                <div className="h-5 w-20 bg-white/10 rounded animate-pulse" />
              ) : (
                <p className="text-[18px] font-semibold text-red-400 tabular-nums tracking-tight relative z-10">
                  {formatMoney(data?.currentMonth.expenses ?? 0)}
                </p>
              )}
              {!loading && (
                <p className={`text-[10px] mt-1 font-bold relative z-10 flex items-center gap-1 ${expenseChange <= 0 ? 'text-emerald-500/80' : 'text-red-500/80'}`}>
                  {expenseChange >= 0 ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                  {Math.abs(expenseChange)}% <span className="font-medium opacity-60">vs anterior</span>
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
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-4 pt-4 pb-6 md:p-8 md:pt-8 space-y-4 md:space-y-6 md:max-w-6xl"
      >

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
              <p className="text-[12px] font-bold text-gray-600 uppercase tracking-widest">
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
              <p className="text-[12px] font-bold text-gray-600 uppercase tracking-widest">
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
                          <span className="text-[11px] text-gray-400">
                            {tx.category}
                            {household && household.members.length > 1 && tx.user?.name && (
                              <span className="inline-flex items-center ml-1 opacity-70">
                                <span className="mx-1 text-[8px]">·</span>
                                {tx.user.name.split(' ')[0]}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="flex flex-col items-end gap-0.5">
                        <span
                          className={`text-[15px] font-semibold tabular-nums tracking-tight flex-shrink-0 ${tx.type === 'income' ? 'text-emerald-700' : 'text-[#c04040]'
                            }`}
                        >
                          {tx.type === 'income' ? '+' : '−'} {formatMoney(tx.amount)}
                        </span>
                        {tx.paymentMethod && tx.type === 'expense' && (
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold opacity-60">
                            {tx.paymentMethod === 'credit' ? '💳 Tarjeta' : '💵 Efectivo'}
                          </span>
                        )}
                      </div>
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

      </motion.div>

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
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageCircle size={24} className="text-gray-300" />
      </div>
      <p className="text-[15px] font-bold text-gray-900">Sin movimientos este mes</p>
      <p className="text-[13px] text-gray-500 mt-1 max-w-[200px] mx-auto">
        Registrá tu primer gasto o ingreso hablando con Lulu.
      </p>
      <a
        href={WHATSAPP_DEEP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-6 bg-emerald-500 text-white text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
      >
        <MessageCircle size={16} />
        Hablar con Lulu
      </a>
    </div>
  );
}


