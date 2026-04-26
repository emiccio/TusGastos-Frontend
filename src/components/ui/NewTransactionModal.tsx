'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createTransaction } from '@/lib/api';
import { CATEGORIES } from '@/lib/utils';

interface NewTransactionModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewTransactionModal({ onClose, onSuccess }: NewTransactionModalProps) {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedAmount = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
    if (!parsedAmount || parsedAmount <= 0) {
      setError('Ingresá un monto válido');
      return;
    }
    if (!category) {
      setError('Seleccioná una categoría');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await createTransaction({ 
        type, 
        amount: parsedAmount, 
        category, 
        description, 
        date,
        paymentMethod: type === 'expense' ? paymentMethod : 'cash'
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center z-[200] p-0 sm:p-4 transition-all duration-300">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-sm shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[auto] overflow-hidden animate-in slide-in-from-bottom duration-300 pb-[env(safe-area-inset-bottom)]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex-1 flex justify-center sm:justify-start relative">
            <div className="w-12 h-1 bg-gray-200 rounded-full mb-4 sm:hidden absolute -top-1.5 left-1/2 -translate-x-1/2" />
            <h2 className="text-[16px] font-bold text-gray-900">Nueva transacción</h2>
          </div>
          <button onClick={onClose} aria-label="Cerrar modal" className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto flex-1 p-5 custom-scrollbar">
          <form id="new-tx-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Tipo */}
            <div className="flex gap-2">
              {(['expense', 'income'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all ${
                    type === t
                      ? t === 'expense'
                        ? 'bg-[#fceaea] text-[#c04040]'
                        : 'bg-[#e4f5ec] text-[#2d8a5e]'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {t === 'expense' ? 'Gasto' : 'Ingreso'}
                </button>
              ))}
            </div>

            {/* Monto */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                Monto
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 text-[16px] sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50/50"
                />
              </div>
            </div>

            {/* Categoría */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-3 text-[16px] sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50/50 appearance-none"
              >
                <option value="">Seleccioná una categoría</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Medio de Pago (solo gastos) */}
            {type === 'expense' && (
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                  Medio de pago
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'cash', label: 'Efectivo', emoji: '💵' },
                    { id: 'credit', label: 'Tarjeta', emoji: '💳' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`flex-1 py-2.5 text-xs rounded-xl font-bold transition-all flex items-center justify-center gap-2 border ${
                        paymentMethod === m.id
                          ? 'bg-gray-900 text-white border-transparent shadow-md'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span>{m.emoji}</span>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Descripción */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                Descripción <span className="text-gray-300 normal-case font-medium">(opcional)</span>
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ej: Compra semanal"
                className="w-full px-3.5 py-3 text-[16px] sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50/50"
              />
            </div>

            {/* Fecha */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-3 text-[16px] sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50/50"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3.5 py-2.5 rounded-xl border border-red-100 font-medium">{error}</p>
            )}
          </form>
        </div>

        {/* Footer with Button */}
        <div className="p-5 border-t border-gray-100 bg-white flex-shrink-0">
          <button
            form="new-tx-form"
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white text-[15px] font-bold py-3.5 rounded-xl hover:bg-gray-800 disabled:opacity-40 transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
          >
            {loading ? 'Guardando...' : 'Guardar transacción'}
          </button>
        </div>
      </div>
    </div>
  );
}
