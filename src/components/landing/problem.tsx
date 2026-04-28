import { XCircle, CheckCircle2 } from 'lucide-react';

export default function Problem() {
  const painPoints = [
    "No sé cuánto gasté en el mes",
    "Anotar en una planilla es un embole",
    "Las apps de bancos son lentas",
    "Me olvido de los gastos en efectivo"
  ];

  return (
    <section className="py-24 bg-white" id="problema">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-text mb-4">
            ¿A dónde se fue la plata?
          </h2>
          <p className="text-lg text-slate-muted max-w-2xl mx-auto leading-relaxed">
            Llegar a fin de mes no debería ser una adivinanza. El problema no es gastar, es no tener el control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-card border border-data-red/10 shadow-sm">
            <h3 className="text-xl font-heading font-bold text-data-red mb-6 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              El método tradicional
            </h3>
            <ul className="space-y-4">
              {painPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-data-red mt-2 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-light p-8 rounded-card border border-brand/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CheckCircle2 className="w-24 h-24 text-brand" />
            </div>
            <h3 className="text-xl font-heading font-bold text-brand-dark mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              El efecto Lulú
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-text font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                Anotás en 3 segundos desde WhatsApp
              </li>
              <li className="flex items-start gap-3 text-slate-text font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                La IA categoriza todo automáticamente
              </li>
              <li className="flex items-start gap-3 text-slate-text font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                Sabés cuánto te queda en tiempo real
              </li>
              <li className="flex items-start gap-3 text-slate-text font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                Tomás mejores decisiones financieras
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
