'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { getHousehold, getCustomCategories, getRules, createRule, deleteRule } from '@/lib/api';
import type { HouseholdInfo, Category, CategoryRule } from '@/types';
import { Loader2, Plus, Trash2, ArrowRight, Wand2, Crown } from 'lucide-react';
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
      
      if (cats.length > 0) {
        setCategoryId(cats[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!keyword.trim() || !categoryId) return;
    
    setIsCreating(true);
    setError(null);
    try {
      const newRule = await createRule({ keyword, categoryId });
      setRules([newRule, ...rules]);
      setKeyword('');
    } catch (err: any) {
      setError(err.message || 'Error al crear la regla');
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Seguro que querés eliminar esta regla?')) return;
    try {
      await deleteRule(id);
      setRules(rules.filter(r => r.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error al eliminar');
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        </div>
      </AppLayout>
    );
  }

  const isFree = household?.plan === 'FREE';

  return (
    <AppLayout>
      <div className="bg-white border-b border-gray-100 px-5 md:px-7 py-4">
        <h1 className="text-[16px] md:text-[15px] font-semibold md:font-medium text-gray-900 tracking-tight md:tracking-normal">
          Reglas Automáticas
        </h1>
        <p className="text-[12px] text-gray-500 mt-0.5">
          Agrupá los gastos cuando el bot de WhatsApp detecte ciertas palabras clave
        </p>
      </div>

      <div className="p-4 md:p-7 max-w-3xl">
        {isFree ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="text-amber-500" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Automatizá la categorización de tus gastos
            </h2>
            <p className="text-sm text-gray-600 mb-4 max-w-sm mx-auto">
              El sistema aprenderá tus patrones. Ej: <strong>"uber" → Transporte</strong> o <strong>"spotify" → Entretenimiento</strong>. 
            </p>
            <p className="text-xs text-amber-700 font-medium mb-6">Disponible en el plan Premium.</p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Upgrade a Premium
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Formulario */}
            <form onSubmit={handleCreate} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h2 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Wand2 size={16} className="text-emerald-500" />
                Nueva regla
              </h2>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Palabra clave
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: spotify, netflix, ypf..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                  />
                </div>
                
                <div className="flex items-end pb-3 hidden md:flex text-gray-300">
                  <ArrowRight size={18} />
                </div>

                <div className="flex-1">
                  <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Categoría
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
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
                    className="w-full md:w-auto px-5 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isCreating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                    Agregar
                  </button>
                </div>
              </div>
              {error && <p className="text-xs text-red-500 mt-3">{error}</p>}
            </form>

            {/* Lista */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Reglas Activas ({rules.length})
                </h3>
              </div>
              {rules.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-400">
                  Aún no tenés palabras clave configuradas.
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {rules.map((rule) => (
                    <li key={rule.id} className="flex items-center justify-between px-5 py-3.5">
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <span className="font-mono text-sm font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                          {rule.keyword}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400 hidden md:flex">
                          <ArrowRight size={14} />
                        </div>
                        <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          {rule.category?.name || 'Categoría Desconocida'}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleDelete(rule.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
