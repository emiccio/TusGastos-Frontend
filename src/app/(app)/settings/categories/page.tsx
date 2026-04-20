'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { getHousehold, getCustomCategories, createCustomCategory, deleteCustomCategory } from '@/lib/api';
import type { HouseholdInfo, Category } from '@/types';
import { Loader2, Plus, Trash2, Tag, Crown } from 'lucide-react';
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

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    
    setIsCreating(true);
    setError(null);
    try {
      const newCat = await createCustomCategory({ name: newName });
      setCategories([...categories, newCat]);
      setNewName('');
    } catch (err: any) {
      setError(err.message || 'Error al crear la categoría');
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Seguro que querés eliminar esta categoría?')) return;
    try {
      await deleteCustomCategory(id);
      setCategories(categories.filter(c => c.id !== id));
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
          Gestión de Categorías
        </h1>
        <p className="text-[12px] text-gray-500 mt-0.5">
          Personalizá cómo agrupas tus transacciones
        </p>
      </div>

      <div className="p-4 md:p-7 max-w-2xl">
        {isFree ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="text-amber-500" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Categorías personalizadas
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Da de alta tus propias categorías para organizar mejor tus gastos e ingresos. Disponible en el plan Premium.
            </p>
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
              <h2 className="text-sm font-medium text-gray-900 mb-3">Nueva categoría</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Ej: Gimnasio, Mascotas..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!newName.trim() || isCreating}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  {isCreating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  Crear
                </button>
              </div>
              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            </form>

            {/* Lista */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tus Categorías ({categories.length})
                </h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {categories.map((cat) => (
                  <li key={cat.id} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                        <Tag size={14} className={cat.isCustom ? 'text-emerald-500' : 'text-gray-400'} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                        <p className="text-[11px] text-gray-500">
                          {cat.isCustom ? 'Personalizada' : 'Por defecto'}
                        </p>
                      </div>
                    </div>
                    {cat.isCustom && (
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
