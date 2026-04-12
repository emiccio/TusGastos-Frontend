import { Calculator, Smartphone, Brain } from 'lucide-react';

export default function Problem() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-4">
            ¿Por qué siempre dejamos de anotar nuestros gastos?
          </h2>
          <p className="text-lg text-gray-500">
            Llevar el control de finanzas no debería sentirse como un segundo trabajo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
              <Calculator className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Apps complicadas</h3>
            <p className="text-gray-500 leading-relaxed">
              Las aplicaciones financieras te piden demasiada información. Seleccionar categoría, fecha, cuenta... terminás abandonando por pereza.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Demasiada fricción</h3>
            <p className="text-gray-500 leading-relaxed">
              Tener que abrir una aplicación específica cada vez que comprás un café no es natural en tu rutina diaria.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
              <Brain className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Estrés cognitivo</h3>
            <p className="text-gray-500 leading-relaxed">
              Terminás juntando tickets en tu billetera y tratando de recordar en qué gastaste el fin de semana pasado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
