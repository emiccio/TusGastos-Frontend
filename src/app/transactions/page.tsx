'use client';

import { useEffect, useState, useCallback } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TransactionBadge from '@/components/ui/TransactionBadge';
import NewTransactionModal from '@/components/ui/NewTransactionModal';
import { getTransactions, deleteTransaction } from '@/lib/api';
import { formatDate, formatMoney, CATEGORIES } from '@/lib/utils';
import type { Transaction, TransactionFilters } from '@/types';
import { Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const TYPE_FILTERS = [
  { value: '', label: 'Todos' },
  { value: 'expense', label: 'Gastos' },
  { value: 'income', label: 'Ingresos' },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({ page: 1, limit: 20 });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTransactions(filters);
      setTransactions(res.transactions);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  function setFilter(key: keyof TransactionFilters, value: any) {
    setFilters((prev) => ({ ...prev, [key]: value || undefined, page: 1 }));
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta transacción?')) return;
    setDeletingId(id);
    try {
      await deleteTransaction(id);
      load();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
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

  return (
    <AppLayout>
      {/* Topbar */}
      <div className="bg-white border-b border-gray-100 px-7 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-medium text-gray-900">Movimientos</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">
            {pagination.total} transacción{pagination.total !== 1 ? 'es' : ''}
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

      <div className="p-7 space-y-4">
        {/* Filters */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-wrap gap-3 items-end">
          {/* Tipo */}
          <div>
            <label className="text-[10.5px] uppercase tracking-wide text-gray-400 font-medium mb-1 block">Tipo</label>
            <div className="flex gap-1.5">
              {TYPE_FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilter('type', value)}
                  className={`px-3 py-1.5 text-[12px] rounded-lg border transition-all ${
                    (filters.type ?? '') === value
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="text-[10.5px] uppercase tracking-wide text-gray-400 font-medium mb-1 block">
              Categoría
            </label>
            <select
              value={filters.category ?? ''}
              onChange={(e) => setFilter('category', e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-900"
            >
              <option value="">Todas</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Desde */}
          <div>
            <label className="text-[10.5px] uppercase tracking-wide text-gray-400 font-medium mb-1 block">
              Desde
            </label>
            <input
              type="date"
              value={filters.from ?? ''}
              onChange={(e) => setFilter('from', e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {/* Hasta */}
          <div>
            <label className="text-[10.5px] uppercase tracking-wide text-gray-400 font-medium mb-1 block">
              Hasta
            </label>
            <input
              type="date"
              value={filters.to ?? ''}
              onChange={(e) => setFilter('to', e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {/* Limpiar */}
          {(filters.type || filters.category || filters.from || filters.to) && (
            <button
              onClick={() => setFilters({ page: 1, limit: 20 })}
              className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors px-2 py-1.5"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="h-10 bg-gray-50 rounded animate-pulse" />
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-500">No hay transacciones con esos filtros</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[10.5px] uppercase tracking-wide text-gray-400 font-medium px-5 py-3">
                    Fecha
                  </th>
                  <th className="text-left text-[10.5px] uppercase tracking-wide text-gray-400 font-medium px-3 py-3">
                    Descripción
                  </th>
                  <th className="text-left text-[10.5px] uppercase tracking-wide text-gray-400 font-medium px-3 py-3">
                    Categoría
                  </th>
                  <th className="text-left text-[10.5px] uppercase tracking-wide text-gray-400 font-medium px-3 py-3">
                    Tipo
                  </th>
                  <th className="text-right text-[10.5px] uppercase tracking-wide text-gray-400 font-medium px-5 py-3">
                    Monto
                  </th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-[11.5px] text-gray-400 whitespace-nowrap">
                      {formatDate(tx.date)}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getCategoryEmoji(tx.category)}</span>
                        <span className="text-[12.5px] text-gray-800">
                          {tx.description || tx.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-[12px] text-gray-500">{tx.category}</td>
                    <td className="px-3 py-3">
                      <TransactionBadge type={tx.type} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span
                        className={`font-mono text-[13px] font-medium ${
                          tx.type === 'income' ? 'text-[#2d8a5e]' : 'text-[#c04040]'
                        }`}
                      >
                        {tx.type === 'income' ? '+' : '−'}{formatMoney(tx.amount)}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => handleDelete(tx.id)}
                        disabled={deletingId === tx.id}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all disabled:opacity-30"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
              <p className="text-[11.5px] text-gray-400">
                Página {pagination.page} de {pagination.pages}
              </p>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setFilter('page', pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 border border-gray-200 rounded-lg"
                >
                  <ChevronLeft size={13} />
                </button>
                <button
                  onClick={() => setFilter('page', pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 border border-gray-200 rounded-lg"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
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
