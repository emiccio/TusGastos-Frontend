'use client';

import { useEffect, useState, useCallback } from 'react';
import { getHousehold, createInvite } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { HouseholdInfo, InviteResponse } from '@/types';
import {
  Home,
  Users,
  Crown,
  Copy,
  MessageCircle,
  Check,
  Plus,
  Lock,
  Loader2,
  UserPlus,
} from 'lucide-react';

const PLAN_LIMITS: Record<string, number> = {
  FREE: 2,
  PREMIUM: 999,
};

export default function HogarPage() {
  const { user } = useAuth();
  const [household, setHousehold] = useState<HouseholdInfo | null>(null);
  const [invite, setInvite] = useState<InviteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await getHousehold();
      setHousehold(data);
    } catch (err) {
      setError('No se pudo cargar la información del hogar');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (!household) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
        {error || 'No se encontró el hogar'}
      </div>
    );
  }

  const maxMembers = PLAN_LIMITS[household.plan] ?? 2;
  const memberCount = household.members.length;
  const isFree = household.plan === 'FREE';
  const limitReached = !household.canInvite;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Home size={18} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">{household.name}</h1>
            <p className="text-xs text-gray-500">Tu hogar compartido</p>
          </div>
          {/* Plan badge */}
          <span
            className={`ml-auto text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
              isFree
                ? 'bg-gray-800 border-white/10 text-gray-400'
                : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
            }`}
          >
            {isFree ? 'Plan Free' : '✦ Premium'}
          </span>
        </div>
      </div>

      {/* Members card */}
      <section className="bg-gray-900 border border-white/8 rounded-2xl overflow-hidden mb-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-200">Miembros</span>
          </div>
          <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">
            {memberCount} / {isFree ? maxMembers : '∞'}
          </span>
        </div>

        <ul className="divide-y divide-white/5">
          {household.members.map((member) => {
            const initials = member.phone.slice(-4);
            const isAdmin = member.role === 'ADMIN';
            return (
              <li key={member.id} className="flex items-center gap-3.5 px-5 py-3.5">
                <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-[11px] font-semibold text-gray-300 flex-shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-gray-100 truncate">
                    {member.name || `+${member.phone}`}
                  </p>
                  {member.name && (
                    <p className="text-[11px] text-gray-500">+{member.phone}</p>
                  )}
                </div>
                {isAdmin && (
                  <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    <Crown size={9} />
                    Admin
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Invite section — solo para admin */}
      {household.isOwner && (
        <section className="bg-gray-900 border border-white/8 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus size={15} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-200">Invitar persona</span>
          </div>

          {limitReached ? (
            /* Límite alcanzado */
            <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/15 rounded-xl p-4">
              <Lock size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-300 mb-0.5">
                  Límite de miembros alcanzado
                </p>
                <p className="text-xs text-gray-400">
                  El Plan Free permite hasta {maxMembers} miembros por hogar.
                  Actualizá al Plan Premium para agregar más personas.
                </p>
              </div>
            </div>
          ) : (
            <>
              {!invite ? (
                <button
                  onClick={handleInvite}
                  disabled={inviteLoading}
                  className="flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-all duration-150"
                >
                  {inviteLoading ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Plus size={15} />
                  )}
                  {inviteLoading ? 'Generando link...' : 'Generar link de invitación'}
                </button>
              ) : (
                <div className="space-y-3">
                  {/* Link display */}
                  <div className="flex items-center gap-2 bg-gray-800 border border-white/8 rounded-xl px-3 py-2.5">
                    <span className="flex-1 text-[12px] text-gray-400 truncate font-mono">
                      {invite.link}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Copiar */}
                    <button
                      onClick={handleCopy}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 ${
                        copied
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      {copied ? '¡Copiado!' : 'Copiar link'}
                    </button>

                    {/* WhatsApp */}
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/25 text-[#25D366] rounded-xl text-sm font-medium transition-all duration-150"
                    >
                      <MessageCircle size={15} />
                      WhatsApp
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-600 text-center">
                    El link vence en 7 días · Solo puede usarse una vez
                  </p>
                </div>
              )}

              {error && (
                <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
              )}
            </>
          )}
        </section>
      )}

      {/* Plan info — Free upgrade prompt */}
      {isFree && household.isOwner && (
        <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/15 rounded-2xl px-5 py-4">
          <div>
            <p className="text-sm font-medium text-amber-300">Plan Free</p>
            <p className="text-xs text-gray-500 mt-0.5">Hasta 2 miembros por hogar</p>
          </div>
          <span className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full font-medium">
            Próximamente Premium
          </span>
        </div>
      )}
    </main>
  );
}
