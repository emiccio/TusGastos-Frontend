'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, MessageCircle, TrendingUp, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';

const WHATSAPP_DEEP_LINK = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola+Lul%C3%BA%2C+quiero+registrarme`;

type Step = 'phone' | 'otp';

function LoginForm() {
  const { requestOtp, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<'default' | 'no_account' | 'onboarding_incomplete'>('default');

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError('');
    setErrorType('default');
    try {
      await requestOtp(phone.trim());
      setStep('otp');
    } catch (err: any) {
      setErrorType(err.code || 'default');
      setError(err.message || 'Error al enviar el código');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    setErrorType('default');
    try {
      await login(phone.trim(), code.trim());
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.push(redirect);
    } catch (err: any) {
      setErrorType(err.code || 'default');
      setError(err.message || 'Error al verificar el código');
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    setStep('phone');
    setCode('');
    setError('');
    setErrorType('default');
  }

  if (step === 'otp') {
    return (
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="otp-input">Código de verificación</Label>
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Cambiar número
            </button>
          </div>
          <Input
            id="otp-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="123456"
            autoComplete="one-time-code"
            autoFocus
          />
          <p className="text-xs text-gray-400">
            Lulú te mandó un código de 6 dígitos al <span className="font-medium text-gray-500">{phone}</span>
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-700 text-sm px-3 py-2.5 rounded-lg">
            <span className="mt-0.5 shrink-0">⚠</span>
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={loading || code.length !== 6}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
              <span>Verificando...</span>
            </>
          ) : (
            'Verificar código'
          )}
        </Button>

        <button
          type="button"
          onClick={handleRequestOtp as any}
          className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors text-center"
          disabled={loading}
        >
          ¿No llegó el código? Reenviar
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleRequestOtp} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="phone-input">Número de WhatsApp</Label>
        <Input
          id="phone-input"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="ej: 5491112345678"
          autoComplete="tel"
          autoFocus
        />
        <p className="text-xs text-gray-400">
          Código de país + número (sin + ni espacios)
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-700 text-sm px-3 py-2.5 rounded-lg">
          <span className="mt-0.5 shrink-0">⚠</span>
          <div className="space-y-1.5">
            <span>{error}</span>
            {errorType === 'no_account' && (
              <a
                href={WHATSAPP_DEEP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-700 font-medium hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Registrarme con Lulú
              </a>
            )}
            {errorType === 'onboarding_incomplete' && (
              <a
                href={WHATSAPP_DEEP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-700 font-medium hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Terminar registro con Lulú
              </a>
            )}
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading || !phone.trim()}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
            <span>Enviando código...</span>
          </>
        ) : (
          'Continuar'
        )}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* ── Left decorative panel (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-gray-950 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">TusGastos</span>
          </div>
          <p className="text-gray-400 text-sm">Tu asistente financiero personal</p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold text-white leading-tight tracking-tight">
              Controlá tus finanzas<br />
              <span className="text-emerald-400">sin esfuerzo.</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-xs">
              Registrá gastos por WhatsApp, visualizá tu historial y tomá mejores decisiones financieras.
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              { icon: MessageCircle, label: 'Registrá por WhatsApp', sub: 'Sin apps extra' },
              { icon: Zap, label: 'Categorización automática', sub: 'Con inteligencia artificial' },
              { icon: ShieldCheck, label: 'Tus datos, seguros', sub: 'Solo vos tenés acceso' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors duration-200">
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white leading-none">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-gray-300 font-medium">Lulú activa en WhatsApp</span>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-sm space-y-6">

          <div className="flex flex-col items-center gap-3 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-400" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight">TusGastos</h1>
              <p className="text-sm text-gray-500">Tu asistente financiero personal</p>
            </div>
          </div>

          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle>Ingresar al dashboard</CardTitle>
              <CardDescription>
                Usá el mismo número con el que le escribís a Lulú
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={
                <div className="py-6 flex justify-center items-center">
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                </div>
              }>
                <LoginForm />
              </Suspense>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-gray-400">
            ¿No tenés cuenta?{' '}
            <a
              href={WHATSAPP_DEEP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 font-medium hover:text-emerald-600 transition-colors"
            >
              Escribile a Lulú por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}