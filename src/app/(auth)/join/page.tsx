'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { previewJoin, joinHousehold } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Home, Loader2, CheckCircle2, XCircle, AlertTriangle, ArrowLeft, ArrowRight, Crown } from 'lucide-react';

type Status = 'loading' | 'preview' | 'confirming' | 'success' | 'already_member' | 'error';

interface InviteData {
  householdName: string;
  inviterName: string;
  expiresAt: string;
}

function JoinContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const token = searchParams.get('token');
  const [status, setStatus] = useState<Status>('loading');
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [householdName, setHouseholdName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isFree = user?.plan === 'FREE';

  const loadPreview = useCallback(async () => {
    if (!token || !user) return;

    try {
      const data = await previewJoin(token);
      setInviteData(data);
      setStatus('preview');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al procesar la invitación');
      setStatus('error');
    }
  }, [token, user]);

  const handleAccept = useCallback(async () => {
    if (!token) return;

    setStatus('confirming');
    try {
      const result = await joinHousehold(token);
      setHouseholdName(result.householdName);
      setStatus(result.alreadyMember ? 'already_member' : 'success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al procesar la invitación');
      setStatus('error');
    }
  }, [token]);

  const handleUpgrade = useCallback(() => {
    router.replace('/settings?tab=plan');
  }, [router]);

  const handleReject = useCallback(() => {
    router.replace('/dashboard');
  }, [router]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      const redirectUrl = `/join?token=${token}`;
      router.replace(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    loadPreview();
  }, [authLoading, user, token, router, loadPreview]);

  useEffect(() => {
    if (status === 'success' || status === 'already_member') {
      const timer = setTimeout(() => router.replace('/dashboard'), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  return (
    <div className="bg-gray-900 border border-white/8 rounded-2xl p-6">
      {(status === 'loading' || authLoading) && (
        <div className="text-center">
          <Loader2 size={36} className="animate-spin text-emerald-400 mx-auto mb-4" />
          <p className="text-gray-300 font-medium">Procesando invitación…</p>
          <p className="text-sm text-gray-500 mt-1">Un momento por favor</p>
        </div>
      )}

      {status === 'preview' && inviteData && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} className="text-amber-400" />
          </div>
          <p className="text-white font-semibold text-lg mb-2">Te invitaron a un hogar</p>
          <p className="text-gray-400 text-sm mb-6">
            <span className="text-white font-medium">{inviteData.inviterName}</span> te invitó a formar parte del hogar <span className="text-white font-medium">{inviteData.householdName}</span>.
          </p>

          {isFree && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4 text-left">
              <p className="text-red-300 text-sm font-medium mb-1">⚠️ Vas a perder tus datos actuales</p>
              <p className="text-red-400/70 text-xs">
                Si aceptás la invitación tal cual, abandonarás tu hogar actual y todos tus gastos se borrarán. No podrás recuperarlos.
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleReject}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Cancelar
            </button>

            {isFree && (
              <button
                onClick={handleUpgrade}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Crown size={18} />
                Mejorar a PREMIUM
              </button>
            )}

            <button
              onClick={handleAccept}
              className={`w-full py-3 font-medium rounded-xl transition-colors flex items-center justify-center gap-2 ${
                isFree
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {isFree ? (
                <>
                  Aceptar y cambiar
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  Unirse al hogar
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {isFree && (
            <p className="text-gray-500 text-xs mt-4">
              Con PREMIUM podés mantener ambos hogares sin perder tus gastos.
            </p>
          )}
        </div>
      )}

      {status === 'confirming' && (
        <div className="text-center">
          <Loader2 size={36} className="animate-spin text-emerald-400 mx-auto mb-4" />
          <p className="text-gray-300 font-medium">Uniéndote al hogar…</p>
          <p className="text-sm text-gray-500 mt-1">Esto puede tomar unos segundos</p>
        </div>
      )}

      {status === 'success' && (
        <div className="text-center">
          <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-4" />
          <p className="text-white font-semibold text-lg mb-1">¡Te uniste al hogar!</p>
          <p className="text-gray-400 text-sm">
            Ahora sos parte de <span className="text-white font-medium">{householdName}</span>.
            Pueden ver los gastos juntos en el dashboard.
          </p>
          <p className="text-xs text-gray-600 mt-4">Redirigiendo al dashboard…</p>
        </div>
      )}

      {status === 'already_member' && (
        <div className="text-center">
          <CheckCircle2 size={40} className="text-blue-400 mx-auto mb-4" />
          <p className="text-white font-semibold text-lg mb-1">Ya eras parte del hogar</p>
          <p className="text-gray-400 text-sm">
            Ya pertenecés a <span className="text-white font-medium">{householdName}</span>.
          </p>
          <p className="text-xs text-gray-600 mt-4">Redirigiendo al dashboard…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="text-center">
          <XCircle size={40} className="text-red-400 mx-auto mb-4" />
          <p className="text-white font-semibold text-lg mb-1">Invitación no válida</p>
          <p className="text-gray-400 text-sm">{errorMsg}</p>
          <button
            onClick={() => router.replace('/dashboard')}
            className="mt-6 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-medium rounded-xl transition-colors"
          >
            Ir al dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Home size={15} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">GestionAndo</span>
          </div>
        </div>

        <Suspense fallback={
          <div className="bg-gray-900 border border-white/8 rounded-2xl p-8 text-center">
            <Loader2 size={36} className="animate-spin text-emerald-400 mx-auto mb-4" />
            <p className="text-gray-300 font-medium">Cargando…</p>
          </div>
        }>
          <JoinContent />
        </Suspense>
      </div>
    </div>
  );
}