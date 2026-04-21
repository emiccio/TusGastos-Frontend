'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { getHousehold, getCustomCategories, createCustomCategory, deleteCustomCategory } from '@/lib/api';
import type { HouseholdInfo, Category } from '@/types';
import { Plus, Trash2, Tag, Crown } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesSettingsPage() {
  const [household, setHousehold] = useState<HouseholdInfo | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      const [hh, cats] = await Promise.all([
        getHousehold(),
        getCustomCategories().catch(() => [])
      ]);
      setHousehold(hh);
      setCategories(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setIsCreating(true);
    setError(null);
    try {
      const newCat = await createCustomCategory({ name: newName });
      setCategories([...categories, newCat]);
      setNewName('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear la categoría');
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Seguro que querés eliminar esta categoría?')) return;
    try {
      await deleteCustomCategory(id);
      setCategories(categories.filter(c => c.id !== id));
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
          Gestión de Categorías
        </h1>
        <p className="text-[12px] text-gray-400 mt-0.5">
          Personalizá cómo agrupás tus transacciones
        </p>
      </div>

      <div className="px-4 pt-4 pb-6 md:p-8 md:pt-8 max-w-2xl space-y-4">

        {loading ? (
          <>
            {/* Form skeleton */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="h-4 w-36 bg-gray-100 rounded animate-pulse mb-4" />
              <div className="flex gap-3">
                <div className="flex-1 h-9 bg-gray-100 rounded-lg animate-pulse" />
                <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
            {/* List skeleton */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-50">
                <div className="h-3.5 w-32 bg-gray-100 rounded animate-pulse" />
              </div>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 w-24 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-50 rounded animate-pulse" />
                  </div>
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
              Categorías personalizadas
            </h2>
            <p className="text-[13px] text-gray-500 mb-5 max-w-xs mx-auto">
              Creá tus propias categorías para organizar mejor tus gastos. Disponible en el plan Premium.
            </p>
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
              <h2 className="text-[13px] font-semibold text-gray-700 mb-3">Nueva categoría</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Ej: Gimnasio, Mascotas..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!newName.trim() || isCreating}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-[13px] font-medium rounded-lg transition-colors flex items-center gap-1.5 active:scale-95"
                >
                  {isCreating
                    ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <Plus size={14} strokeWidth={2.5} />
                  }
                  Crear
                </button>
              </div>
              {error && <p className="text-[12px] text-red-500 mt-2">{error}</p>}
            </form>

            {/* Categories list */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Tus categorías ({categories.length})
                </p>
              </div>
              {categories.length === 0 ? (
                <div className="p-8 text-center text-[13px] text-gray-400">
                  Aún no tenés categorías personalizadas.
                </div>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {categories.map((cat) => (
                    <li key={cat.id} className="flex items-center justify-between px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                          <Tag size={13} className={cat.isCustom ? 'text-emerald-500' : 'text-gray-400'} />
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-gray-800">{cat.name}</p>
                          <p className="text-[11px] text-gray-400">
                            {cat.isCustom ? 'Personalizada' : 'Por defecto'}
                          </p>
                        </div>
                      </div>
                      {cat.isCustom && (
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
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