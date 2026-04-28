import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';

export default function Pricing() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-4">
            Empezá gratis, mejorá cuando quieras
          </h2>
          <p className="text-lg text-gray-500">
            Precios simples y transparentes para que tomes el control sin pagar de más.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm flex flex-col group hover:border-brand/20 transition-colors">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">Básico</h3>
            <p className="text-gray-500 mb-8">Para llevar un control personal simple.</p>
            <div className="mb-10">
              <span className="text-5xl font-heading font-bold text-gray-900">Gratis</span>
            </div>

            <ul className="space-y-5 mb-10 flex-1">
              {[
                'Hasta 50 transacciones por mes',
                'Dashboard web básico',
                'Modo texto en WhatsApp',
                'Categorías estándar'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" className="w-full rounded-2xl h-14 text-lg text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]">
              <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer">
                Comenzar gratis
              </a>
            </Button>
          </div>

          {/* Pro Tier */}
          <div className="bg-zinc-900 rounded-[2.5rem] p-10 border border-white/5 shadow-2xl flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1 bg-brand" />
            <div className="absolute top-8 right-8 bg-brand/10 text-brand text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-brand/20">
              Recomendado
            </div>

            <h3 className="text-2xl font-heading font-bold text-white mb-2">Pro</h3>
            <p className="text-zinc-400 mb-8">Para quienes quieren dominar sus finanzas.</p>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-5xl font-heading font-bold text-white">$4.500</span>
              <span className="text-zinc-500 text-lg">/mes</span>
            </div>

            <ul className="space-y-5 mb-10 flex-1">
              {[
                'Transacciones ilimitadas',
                'Audios de WhatsApp',
                'Dashboard completo con exportación',
                'Categorías personalizadas',
                'Alertas de presupuesto',
                'Soporte prioritario'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-300">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 border border-brand/20">
                    <Check className="w-3.5 h-3.5 text-brand" />
                  </div>
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild className="w-full rounded-2xl h-14 text-lg bg-brand hover:bg-brand-dark text-white border-0 shadow-lg shadow-brand/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer">
                Suscribirse a Pro
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
