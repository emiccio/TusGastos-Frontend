'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { joinHousehold } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Home, Loader2, CheckCircle2, XCircle } from 'lucide-react';

type Status = 'loading' | 'success' | 'already_member' | 'error';

export default function JoinPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const token = searchParams.get('token');
  const [status, setStatus] = useState<Status>('loading');
  const [householdName, setHouseholdName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleJoin = useCallback(async () => {
    if (!token) {
      setStatus('error');
      setErrorMsg('El link de invitación no es válido');
      return;
    }

    try {
      const result = await joinHousehold(token);
      setHouseholdName(result.householdName);
      setStatus(result.alreadyMember ? 'already_member' : 'success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al procesar la invitación');
      setStatus('error');
    }
  }, [token]);

  useEffect(() => {
    if (authLoading) return;

    // Si no hay sesión, redirigir al login guardando el redirect
    if (!user) {
      const redirectUrl = `/join?token=${token}`;
      router.replace(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    handleJoin();
  }, [authLoading, user, token, router, handleJoin]);

  // Redirigir al dashboard después del éxito
  useEffect(() => {
    if (status === 'success' || status === 'already_member') {
      const timer = setTimeout(() => router.replace('/dashboard'), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Home size={15} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">TusGastos</span>
          </div>
        </div>

        <div className="bg-gray-900 border border-white/8 rounded-2xl p-8 text-center">
          {(status === 'loading' || authLoading) && (
            <>
              <Loader2 size={36} className="animate-spin text-emerald-400 mx-auto mb-4" />
              <p className="text-gray-300 font-medium">Procesando invitación…</p>
              <p className="text-sm text-gray-500 mt-1">Un momento por favor</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-4" />
              <p className="text-white font-semibold text-lg mb-1">¡Te uniste al hogar!</p>
              <p className="text-gray-400 text-sm">
                Ahora sos parte de <span className="text-white font-medium">{householdName}</span>.
                Pueden ver los gastos juntos en el dashboard.
              </p>
              <p className="text-xs text-gray-600 mt-4">Redirigiendo al dashboard…</p>
            </>
          )}

          {status === 'already_member' && (
            <>
              <CheckCircle2 size={40} className="text-blue-400 mx-auto mb-4" />
              <p className="text-white font-semibold text-lg mb-1">Ya eras parte del hogar</p>
              <p className="text-gray-400 text-sm">
                Ya pertenecés a <span className="text-white font-medium">{householdName}</span>.
              </p>
              <p className="text-xs text-gray-600 mt-4">Redirigiendo al dashboard…</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle size={40} className="text-red-400 mx-auto mb-4" />
              <p className="text-white font-semibold text-lg mb-1">Invitación no válida</p>
              <p className="text-gray-400 text-sm">{errorMsg}</p>
              <button
                onClick={() => router.replace('/dashboard')}
                className="mt-6 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-medium rounded-xl transition-colors"
              >
                Ir al dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
