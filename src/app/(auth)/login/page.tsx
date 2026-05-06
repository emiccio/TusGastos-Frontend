'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Select from '@radix-ui/react-select';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, MessageCircle, TrendingUp, ShieldCheck, Zap, ArrowLeft, ChevronDown, Check } from 'lucide-react';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';
import { LOGIN_COUNTRIES, formatPhoneForDisplay, normalizePhoneByCountry } from '@/lib/phone';
import Link from 'next/link';
import Image from 'next/image';

type Step = 'phone' | 'otp';

function LoginForm() {
  const { requestOtp, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>('phone');
  const [countryCode, setCountryCode] = useState('AR');
  const [localPhone, setLocalPhone] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<'default' | 'no_account' | 'onboarding_incomplete'>('default');

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    const normalizedPhone = normalizePhoneByCountry(countryCode, localPhone);
    if (!normalizedPhone.trim()) return;
    setLoading(true);
    setError('');
    setErrorType('default');
    try {
      await requestOtp(normalizedPhone);
      setPhone(normalizedPhone);
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
            <Label htmlFor="otp-input" className="text-zinc-400 lg:text-zinc-700">Código de verificación</Label>
            <button
              type="button"
              onClick={handleBack}
              aria-label="Volver a ingresar número"
              className="flex items-center gap-1 text-xs text-zinc-500 lg:text-gray-400 hover:text-white lg:hover:text-zinc-900 font-medium transition-colors"
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
            className="bg-white/5 lg:bg-white border-white/10 lg:border-zinc-200 text-white lg:text-zinc-900 placeholder:text-zinc-600 h-12"
          />
          <p className="text-xs text-zinc-500 lg:text-gray-400 font-medium">
            Lulú te mandó un código de 6 dígitos al <span className="font-bold text-zinc-300 lg:text-zinc-600">{formatPhoneForDisplay(phone)}</span>
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-500/10 lg:bg-red-50 border border-red-500/20 lg:border-red-100 text-red-400 lg:text-red-600 text-sm px-3 py-2.5 rounded-lg">
            <span className="mt-0.5 shrink-0">⚠</span>
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-brand-dark hover:bg-brand text-white rounded-lg h-12 font-bold shadow-lg shadow-brand/10 transition-all active:scale-[0.98]"
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
          className="w-full text-xs text-zinc-500 lg:text-gray-400 hover:text-white lg:hover:text-zinc-900 font-medium transition-colors text-center"
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
        <Label htmlFor="phone-input" className="text-zinc-400 lg:text-zinc-700">Número de WhatsApp</Label>
        <div className="grid grid-cols-12 gap-2">
          <Select.Root
            value={countryCode}
            onValueChange={setCountryCode}
          >
            <Select.Trigger
              aria-label="Pais"
              className="col-span-5 h-12 bg-white/5 lg:bg-white border border-white/10 lg:border-zinc-200 rounded-lg px-3 text-white lg:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand/30 flex items-center justify-between"
            >
              <Select.Value />
              <Select.Icon>
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={6}
                className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-white/10 lg:border-zinc-200 bg-zinc-950 lg:bg-white shadow-2xl"
              >
                <Select.Viewport className="p-1">
                  {LOGIN_COUNTRIES.map((country) => (
                    <Select.Item
                      key={country.code}
                      value={country.code}
                      className="relative flex h-9 select-none items-center rounded-md px-8 pr-3 text-sm text-zinc-200 lg:text-zinc-700 outline-none cursor-pointer hover:bg-white/5 lg:hover:bg-zinc-100 data-[state=checked]:bg-brand/15 data-[state=checked]:text-white lg:data-[state=checked]:text-zinc-900"
                    >
                      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                        <Check className="h-3.5 w-3.5 text-brand" />
                      </Select.ItemIndicator>
                      <Select.ItemText>{country.code} +{country.dialCode}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <Input
            id="phone-input"
            type="tel"
            value={localPhone}
            onChange={(e) => setLocalPhone(e.target.value)}
            placeholder={countryCode === 'AR' ? '11 1234 5678' : 'Número local'}
            autoComplete="tel-national"
            autoFocus
            className="col-span-7 bg-white/5 lg:bg-white border-white/10 lg:border-zinc-200 text-white lg:text-zinc-900 placeholder:text-zinc-600 h-12"
          />
        </div>
        <p className="text-xs text-zinc-500 lg:text-gray-400 font-medium">
          {countryCode === 'AR'
            ? 'Argentina: ingresá el numero sin 0 y sin 15. Nosotros agregamos el 9.'
            : countryCode === 'MX'
              ? 'Mexico: ingresá tu numero local y lo completamos automaticamente.'
              : 'Ingresá tu numero local y completamos el codigo de pais.'}
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-500/10 lg:bg-red-50 border border-red-500/20 lg:border-red-100 text-red-400 lg:text-red-600 text-sm px-3 py-2.5 rounded-lg">
          <span className="mt-0.5 shrink-0">⚠</span>
          <div className="space-y-1.5">
            <span>{error}</span>
            {errorType === 'no_account' && (
              <a
                href={WHATSAPP_DEEP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-brand font-medium hover:underline"
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
                className="flex items-center gap-1.5 text-brand font-medium hover:underline"
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
        className="w-full bg-brand-dark hover:bg-brand text-white rounded-lg h-12 font-bold shadow-lg shadow-brand/10 transition-all active:scale-[0.98]"
        size="lg"
        disabled={loading || !localPhone.trim()}
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
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-[#09090b] overflow-hidden border-r border-white/5">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-brand/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center">
            <Link href="/" className="flex items-center font-heading text-2xl font-bold text-white tracking-tight">
              <Image src="/icons/favicon.png" className='-ml-2 mt-1' alt="GestionAndo" width={56} height={56} />
              Gestion<span className="text-brand">Ando</span>
            </Link>
          </div>
          <p className="text-zinc-400 text-sm font-medium">Tu asistente financiero personal</p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-heading font-bold text-white leading-tight tracking-tight">
              Controlá tus finanzas<br />
              <span className="text-brand">sin esfuerzo.</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xs font-medium">
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
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand/10 group-hover:border-brand/20 transition-colors duration-200">
                  <Icon className="w-3.5 h-3.5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-none">{label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 font-medium">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
            </span>
            <span className="text-xs text-zinc-300 font-bold">Lulú activa en WhatsApp</span>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#09090b] lg:bg-gray-50 min-h-screen relative overflow-hidden">
        {/* Background Glow - only mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none lg:hidden" />

        <div className="w-full max-w-sm space-y-8 relative z-10">

          <div className="flex flex-col items-center gap-3 lg:hidden">
            <div className="text-center">
              <Link href="/" className="flex items-center">
                <Image src="/icons/favicon.png" className='mt-2' alt="GestionAndo" width={56} height={56} />
                <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
                  Gestion<span className="text-brand">Ando</span>
                </h1>
              </Link>
              <p className="text-sm text-zinc-400 font-medium mt-1">Tu asistente financiero personal</p>
            </div>
          </div>

          <Card className="bg-white/5 lg:bg-white backdrop-blur-xl lg:backdrop-blur-none border-white/10 lg:border-zinc-200 shadow-2xl lg:shadow-card rounded-2xl overflow-hidden">
            <CardHeader className="pb-6 pt-8 text-center">
              <CardTitle className="text-2xl font-heading font-bold text-white lg:text-zinc-900">Ingresar al dashboard</CardTitle>
              <CardDescription className="text-zinc-400 lg:text-zinc-500 font-medium mt-2">
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

          <p className="text-center text-xs text-zinc-500 lg:text-gray-400 font-medium">
            ¿No tenés cuenta?{' '}
            <a
              href={WHATSAPP_DEEP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white lg:text-zinc-900 font-bold hover:text-brand transition-colors underline lg:no-underline"
            >
              Escribile a Lulú por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
