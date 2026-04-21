'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { getHousehold, getCustomCategories, getRules, createRule, deleteRule } from '@/lib/api';
import type { HouseholdInfo, Category, CategoryRule } from '@/types';
import { Plus, Trash2, ArrowRight, Wand2, Crown } from 'lucide-react';
import Link from 'next/link';

export default function RulesSettingsPage() {
  const [household, setHousehold] = useState<HouseholdInfo | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rules, setRules] = useState<CategoryRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      const [hh, cats, rls] = await Promise.all([
        getHousehold(),
        getCustomCategories().catch(() => []),
        getRules().catch(() => [])
      ]);
      setHousehold(hh);
      setCategories(cats);
      setRules(rls);
      if (cats.length > 0) setCategoryId(cats[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!keyword.trim() || !categoryId) return;
    setIsCreating(true);
    setError(null);
    try {
      const newRule = await createRule({ keyword, categoryId });
      setRules([newRule, ...rules]);
      setKeyword('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear la regla');
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Seguro que querés eliminar esta regla?')) return;
    try {
      await deleteRule(id);
      setRules(rules.filter(r => r.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error al eliminar');
    }
  }

  const isFree = household?.plan === 'FREE';

  return (
    <AppLayout>

      {/* ── Page header ── */}
      <div className="bg-white border-b border-gray-100 px-5 py-5 md:px-8">
        <h1 className="text-[17px] font-semibold text-gray-900 tracking-tight">
          Reglas Automáticas
        </h1>
        <p className="text-[12px] text-gray-400 mt-0.5">
          Agrupá los gastos cuando el bot detecte ciertas palabras clave
        </p>
      </div>

      <div className="px-4 pt-4 pb-6 md:p-8 md:pt-8 max-w-3xl space-y-4">

        {loading ? (
          <>
            {/* Form skeleton */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="h-4 w-28 bg-gray-100 rounded animate-pulse mb-4" />
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 h-9 bg-gray-100 rounded-lg animate-pulse" />
                <div className="flex-1 h-9 bg-gray-100 rounded-lg animate-pulse" />
                <div className="w-24 h-9 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
            {/* Rules list skeleton */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-50">
                <div className="h-3.5 w-32 bg-gray-100 rounded animate-pulse" />
              </div>
              {[0, 1, 2].map(i => (
                <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-20 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-3 bg-gray-100 rounded animate-pulse" />
                    <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                  <div className="w-8 h-8 bg-gray-50 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </>
        ) : isFree ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown size={20} className="text-amber-500" />
            </div>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-1.5">
              Automatizá la categorización
            </h2>
            <p className="text-[13px] text-gray-500 mb-2 max-w-sm mx-auto">
              El sistema aprenderá tus patrones. Ej:{' '}
              <span className="font-medium text-gray-700">"uber" → Transporte</span> o{' '}
              <span className="font-medium text-gray-700">"spotify" → Entretenimiento</span>.
            </p>
            <p className="text-[12px] text-amber-600 font-medium mb-5">Disponible en el plan Premium.</p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white text-[13px] font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Upgrade a Premium
            </Link>
          </div>
        ) : (
          <>
            {/* Create form */}
            <form onSubmit={handleCreate} className="bg-white border border-gray-100 rounded-xl p-5">
              <h2 className="text-[13px] font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Wand2 size={14} className="text-emerald-500" />
                Nueva regla
              </h2>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Palabra clave
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: spotify, netflix, ypf..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full px-3.5 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                  />
                </div>

                <div className="hidden md:flex items-end pb-2.5 text-gray-300">
                  <ArrowRight size={16} />
                </div>

                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Categoría
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2 text-[13px] border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={!keyword.trim() || !categoryId || isCreating}
                    className="w-full md:w-auto px-5 py-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-[13px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    {isCreating
                      ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <Plus size={14} strokeWidth={2.5} />
                    }
                    Agregar
                  </button>
                </div>
              </div>
              {error && <p className="text-[12px] text-red-500 mt-3">{error}</p>}
            </form>

            {/* Rules list */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Reglas activas ({rules.length})
                </p>
              </div>
              {rules.length === 0 ? (
                <div className="p-8 text-center text-[13px] text-gray-400">
                  Aún no tenés palabras clave configuradas.
                </div>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {rules.map((rule) => (
                    <li key={rule.id} className="flex items-center justify-between px-5 py-3.5">
                      <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3">
                        <span className="font-mono text-[12px] font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                          {rule.keyword}
                        </span>
                        <ArrowRight size={13} className="text-gray-300 hidden md:block" />
                        <span className="text-[12px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          {rule.category?.name || 'Categoría desconocida'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(rule.id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}