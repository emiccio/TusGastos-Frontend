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
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Básico</h3>
            <p className="text-gray-500 mb-6">Para llevar un control personal simple.</p>
            <div className="mb-8">
              <span className="text-5xl font-semibold text-gray-900">Gratis</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {['Hasta 50 transacciones por mes', 'Dashboard web básico', 'Modo texto en WhatsApp', 'Categorías estándar'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild variant="outline" className="w-full rounded-full h-12 text-base text-gray-900 border-gray-200 hover:bg-gray-50">
              <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer">
                Comenzar gratis
              </a>
            </Button>
          </div>

          {/* Pro Tier */}
          <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
            <div className="absolute top-6 right-6 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Recomendado
            </div>

            <h3 className="text-2xl font-semibold text-white mb-2">Pro</h3>
            <p className="text-gray-400 mb-6">Para quienes quieren dominar sus finanzas.</p>
            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-5xl font-semibold text-white">$4.500</span>
              <span className="text-gray-400">/mes</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                'Transacciones ilimitadas', 
                'Audios largos en WhatsApp', 
                'Dashboard completo con exportación', 
                'Categorías personalizadas',
                'Alertas de presupuesto',
                'Soporte prioritario'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild className="w-full rounded-full h-12 text-base bg-emerald-500 hover:bg-emerald-400 text-white border-0">
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
