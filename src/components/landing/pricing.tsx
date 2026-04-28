import { Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Para los que recién empiezan",
      features: [
        "1 Hogar (Household)",
        "30 días de historial",
        "Categorización IA estándar",
        "Soporte por WhatsApp"
      ],
      cta: "Empezar gratis",
      popular: false
    },
    {
      name: "Pro",
      price: "$5",
      period: "/mes",
      description: "Para control total y familias",
      features: [
        "Hogares ilimitados",
        "Historial para siempre",
        "Reglas de IA personalizadas",
        "Compartir con otros usuarios",
        "Exportar datos a Excel/CSV"
      ],
      cta: "Pasar a Pro",
      popular: true
    }
  ];

  return (
    <section className="py-24 bg-white" id="precios">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-text mb-4">
            Planes simples, sin vueltas
          </h2>
          <p className="text-lg text-slate-muted max-w-2xl mx-auto">
            Empezá gratis y escalá cuando necesites más control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-8 rounded-card border transition-all duration-300 flex flex-col h-full ${
                plan.popular 
                  ? 'bg-white border-brand shadow-card-hover scale-105 z-10' 
                  : 'bg-surface-base border-brand-light/50 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Más elegido
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-bold text-slate-text mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-heading font-bold text-slate-text">{plan.price}</span>
                  {plan.period && <span className="text-slate-muted font-medium">{plan.period}</span>}
                </div>
                <p className="text-sm text-slate-muted">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-slate-text font-medium">
                    <Check className={`w-4 h-4 ${plan.popular ? 'text-brand' : 'text-slate-muted'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                asChild 
                className={`w-full h-12 rounded-lg font-bold transition-all mt-auto ${
                  plan.popular 
                    ? 'bg-brand-dark hover:bg-brand text-white' 
                    : 'bg-white border-brand-light text-brand hover:bg-brand-light'
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer">
                  {plan.cta}
                </a>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-sm text-slate-muted">
          ¿Dudas? <a href={WHATSAPP_DEEP_LINK} className="text-brand font-bold underline decoration-brand-light underline-offset-4">Hablemos por WhatsApp</a>
        </p>
      </div>
    </section>
  );
}
