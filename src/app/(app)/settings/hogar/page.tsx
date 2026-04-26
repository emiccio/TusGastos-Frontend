'use client';

import { useEffect, useState, useCallback } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { getHousehold, createInvite, listHouseholds, createHousehold, switchHousehold } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { HouseholdInfo, InviteResponse } from '@/types';
import { cn } from '@/lib/utils';
import {
  Home,
  Users,
  Crown,
  Copy,
  MessageCircle,
  Check,
  Plus,
  Lock,
  UserPlus,
} from 'lucide-react';

const PLAN_LIMITS: Record<string, number> = {
  FREE: 2,
  PREMIUM: 999,
};

export default function HogarPage() {
  const { user } = useAuth();
  const [household, setHousehold] = useState<HouseholdInfo | null>(null);
  const [allHouseholds, setAllHouseholds] = useState<any[]>([]);
  const [invite, setInvite] = useState<InviteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [hData, listData] = await Promise.all([
        getHousehold(),
        listHouseholds()
      ]);
      setHousehold(hData);
      setAllHouseholds(listData);
    } catch (err: any) {
      setError(err.message || 'No se pudo cargar la información');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleInvite() {
    setInviteLoading(true);
    setError(null);
    try {
      const data = await createInvite();
      setInvite(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear la invitación');
    } finally {
      setInviteLoading(false);
    }
  }

  async function handleCreate() {
    if (!newName.trim()) return;
    setCreateLoading(true);
    try {
      await createHousehold(newName.trim());
      setIsCreating(false);
      setNewName('');
      // El backend ya lo marca como activo, recargamos para actualizar todo el estado de la app
      window.location.reload(); 
    } catch (err: any) {
      setError(err.message || 'Error al crear hogar');
    } finally {
      setCreateLoading(false);
    }
  }

  async function handleSwitch(id: string) {
    if (id === household?.id) return;
    try {
      await switchHousehold(id);
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    }
  }

  function handleCopy() {
    if (!invite) return;
    navigator.clipboard.writeText(invite.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleWhatsApp() {
    if (!invite) return;
    const senderName = user?.name || user?.phone || 'Alguien';
    const message = `${senderName} te invitó a compartir los gastos del hogar en TusGastos 💸\n\nRegistrá lo que gastás y vean juntos el total del mes.\n\nUnite desde acá 👇\n${invite.link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  }

  return (
    <AppLayout>

      {/* ── Page header ── */}
      <div className="bg-white border-b border-gray-100 px-5 py-5 md:px-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Home size={16} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-[17px] font-semibold text-gray-900 tracking-tight">
              Gestión de Hogares
            </h1>
            <p className="text-[12px] text-gray-500 font-medium mt-0.5">Administrá tus espacios compartidos</p>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-4 pt-4 pb-6 md:p-8 md:pt-8 max-w-2xl space-y-8">

        {/* ── Mis Hogares ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">Mis Hogares</h2>
            {user?.plan === 'PREMIUM' && (
              <button 
                onClick={() => setIsCreating(true)}
                className="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
              >
                <Plus size={14} />
                Crear nuevo
              </button>
            )}
          </div>

          {isCreating && (
            <div className="bg-white border-2 border-emerald-100 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <p className="text-[12px] font-semibold text-gray-700 mb-3">Nuevo hogar</p>
              <div className="flex gap-2">
                <input 
                  autoFocus
                  placeholder="Nombre (ej: Oficina, Playa...)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                />
                <button 
                  onClick={handleCreate}
                  disabled={createLoading || !newName.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-all"
                >
                  {createLoading ? '...' : 'Crear'}
                </button>
                <button 
                  onClick={() => setIsCreating(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-[13px] font-medium transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="grid gap-2.5">
            {loading ? (
              [0, 1].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)
            ) : (
              allHouseholds.map((h) => (
                <button
                  key={h.id}
                  onClick={() => handleSwitch(h.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                    h.id === household?.id
                      ? "bg-emerald-50 border-emerald-200 ring-1 ring-emerald-500/10"
                      : "bg-white border-gray-100 hover:border-gray-200 shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      h.id === household?.id ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"
                    )}>
                      <Home size={16} />
                    </div>
                    <div>
                      <p className={cn("text-[14px] font-semibold", h.id === household?.id ? "text-emerald-900" : "text-gray-700")}>
                        {h.name}
                      </p>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {h.isOwner ? 'Dueño' : 'Miembro'} · {h.plan === 'FREE' ? 'Plan Free' : '✦ Premium'}
                      </p>
                    </div>
                  </div>
                  {h.id === household?.id && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-white border border-emerald-200 px-2.5 py-1 rounded-full uppercase">
                      Activo
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── Detalle del hogar activo ── */}
        {household && !loading && (
          <div className="space-y-5 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">
                Detalles de: <span className="text-emerald-600">{household.name}</span>
              </h2>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                household.plan === 'FREE' ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-amber-50 border-amber-200 text-amber-600'
              }`}>
                {household.plan === 'FREE' ? 'Plan Free' : '✦ Premium'}
              </span>
            </div>

            {/* Members card */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-gray-400" />
                  <span className="text-[13px] font-semibold text-gray-700">Miembros</span>
                </div>
                <span className="text-[11px] text-gray-500 font-bold bg-white border border-gray-100 px-2.5 py-1 rounded-full">
                  {household.members.length} / {household.plan === 'FREE' ? (PLAN_LIMITS['FREE'] ?? 2) : '∞'}
                </span>
              </div>
              <ul className="divide-y divide-gray-50">
                {household.members.map((member) => {
                  const isAdmin = member.role === 'ADMIN';
                  return (
                    <li key={member.id} className="flex items-center gap-3.5 px-5 py-3.5">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[11px] font-semibold text-gray-500 flex-shrink-0">
                        {member.phone.slice(-4)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-800 truncate">
                          {member.name || `+${member.phone}`}
                        </p>
                        {member.name && (
                          <p className="text-[11px] text-gray-500">+{member.phone}</p>
                        )}
                      </div>
                      {isAdmin && (
                        <span className="flex items-center gap-1 text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                          <Crown size={9} />
                          Admin
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Invite section */}
            {household.isOwner && (
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus size={14} className="text-gray-400" />
                  <span className="text-[13px] font-semibold text-gray-700">Invitar persona</span>
                </div>

                {!household.canInvite ? (
                  <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <Lock size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[13px] font-medium text-amber-700 mb-0.5">
                        Límite de miembros alcanzado
                      </p>
                      <p className="text-[12px] text-gray-500 leading-relaxed">
                        El Plan Free permite hasta {PLAN_LIMITS['FREE'] ?? 2} miembros por hogar.
                        Actualizá al Plan Premium para agregar más personas.
                      </p>
                    </div>
                  </div>
                ) : !invite ? (
                  <button
                    onClick={handleInvite}
                    disabled={inviteLoading}
                    className="flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-[13px] font-medium rounded-lg transition-all active:scale-95"
                  >
                    {inviteLoading
                      ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <Plus size={14} strokeWidth={2.5} />
                    }
                    {inviteLoading ? 'Generando link...' : 'Generar link de invitación'}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
                      <span className="flex-1 text-[12px] text-gray-500 truncate">
                        {invite.link}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={handleCopy}
                        className={cn(
                          "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium border transition-all",
                          copied
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        )}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? '¡Copiado!' : 'Copiar link'}
                      </button>
                      <button
                        onClick={handleWhatsApp}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg text-[13px] font-medium transition-all"
                      >
                        <MessageCircle size={14} />
                        WhatsApp
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500 text-center font-medium">
                      El link vence en 7 días · Solo puede usarse una vez
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Plan info prompt for Free users */}
            {household.plan === 'FREE' && household.isOwner && (
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
                <div>
                  <p className="text-[13px] font-medium text-amber-700">Pasate a Premium</p>
                  <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">
                    Creá múltiples hogares y sumá todos los miembros que quieras.
                  </p>
                </div>
                <span className="text-[11px] text-amber-600 bg-white border border-amber-200 px-3 py-1.5 rounded-full font-bold">
                  MUY PRONTO
                </span>
              </div>
            )}
          </div>
        )}
        
        {error && <p className="text-[12px] text-red-500 text-center font-medium">{error}</p>}
      </div>
    </AppLayout>
  );
}