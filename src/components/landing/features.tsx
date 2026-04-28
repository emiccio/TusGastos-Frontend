import { Mic, Zap, BarChart3, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Mic className="w-6 h-6 text-brand-dark" />,
      title: "Reconocimiento por voz",
      description: "No hace falta ni escribir. Mandale un audio a Lulu contándole tus movimientos financieros del día, de forma completamente natural, y el sistema se encargará del resto.",
      className: "md:col-span-2"
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-dark" />,
      title: "Categorización AI",
      description: "La inteligencia artificial detecta automáticamente si tu gasto fue en comida, transporte o entretenimiento.",
      className: "md:col-span-1"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-brand-dark" />,
      title: "Dashboard web",
      description: "Accedé a gráficos dinámicos con todo tu historial de movimientos por mes y categoría.",
      className: "md:col-span-1"
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-dark" />,
      title: "Privacidad total",
      description: "Tus datos están seguros y encriptados. Nadie excepto vos puede ver tu historial financiero.",
      className: "md:col-span-2"
    }
  ];

  return (
    <section className="py-24 bg-[#F9FAFB] border-y border-zinc-100" id="caracteristicas">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-text mb-4">
            Todo lo que necesitás para tener el control
          </h2>
          <p className="text-lg text-slate-muted max-w-2xl mx-auto">
            Potentes herramientas diseñadas para simplificar tu vida financiera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-card bg-white border border-brand-light/30 shadow-card hover:shadow-card-hover transition-all duration-300 group ${feature.className}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-text mb-4">{feature.title}</h3>
              <p className="text-slate-muted leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
