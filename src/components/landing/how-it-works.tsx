import { MessageSquareText, Sparkles, LineChart } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: MessageSquareText,
      title: 'Escribile a Lulu en WhatsApp',
      desc: 'Mandale un mensaje de texto o audio diciendo "Gasté 5000 en el chino" o "Cobré 150 mil pesos".',
    },
    {
      icon: Sparkles,
      title: 'Lulu clasifica automáticamente',
      desc: 'La inteligencia artificial entiende el contexto, asigna la categoría correcta y registra la fecha de forma automática.',
    },
    {
      icon: LineChart,
      title: 'Mirá tu reporte mensual',
      desc: 'Entrá al dashboard y visualizá en qué gastaste, tu balance actual y compará con el mes anterior.',
    }
  ];

  return (
    <section id="demo" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-4">
            Tan simple como chatear con un amigo
          </h2>
          <p className="text-lg text-gray-500">
            En solo 3 pasos tu información financiera queda guardada y organizada.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-gray-100 via-emerald-100 to-gray-100 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-6 relative">
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gray-900 text-white rounded-full text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <step.icon className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
