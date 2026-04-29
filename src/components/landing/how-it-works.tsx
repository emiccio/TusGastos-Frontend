import { MessageSquare, Cpu, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Mandás un mensaje",
      description: "Como si se lo contaras a un amigo: \"gasté 5k en farmacia\"."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Lulú procesa",
      description: "Nuestra IA entiende el monto y lo categoriza al instante."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Tu dashboard se actualiza",
      description: "Ves tus gastos organizados por categoría y presupuesto."
    }
  ];

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-text mb-4">
            Cómo funciona
          </h2>
          <p className="text-lg text-slate-muted max-w-2xl mx-auto">
            Tres pasos simples para recuperar el control total de tus finanzas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center text-brand mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-brand/10">
                {step.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-text mb-3">
                {step.title}
              </h3>
              <p className="text-slate-muted leading-relaxed">
                {step.description}
              </p>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-full h-px bg-brand-light -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
