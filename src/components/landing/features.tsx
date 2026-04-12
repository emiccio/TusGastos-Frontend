import { Mic, BarChart3, Zap, Shield, Globe2, Bell } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Todo lo que necesitás para tener el control
          </h2>
          <p className="text-lg text-gray-400">
            Potentes herramientas diseñadas para simplificar tu vida financiera.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-900/50 p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Mic className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-3">Reconocimiento por voz</h3>
            <p className="text-gray-400 max-w-md">No hace falta ni escribir. Mandale un audio a Lulu contándole tus movimientos financieros del día, de forma completamente natural, y el sistema se encargará del resto.</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Categorización AI</h3>
            <p className="text-gray-400">La inteligencia artificial detecta automáticamente si tu gasto fue en comida, transporte o entretenimiento.</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <BarChart3 className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Dashboard web</h3>
            <p className="text-gray-400">Accedé a gráficos dinámicos con todo tu historial de movimientos por mes y categoría.</p>
          </div>

          {/* <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Globe2 className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Multi-moneda</h3>
            <p className="text-gray-400">Lulu entiende diferentes monedas. Podés registrar gastos en pesos y dólares sin problemas.</p>
          </div> */}

          <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-900/50 p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Shield className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Privacidad total</h3>
            <p className="text-gray-400">Tus datos están seguros y encriptados. Nadie excepto vos puede ver tu historial financiero.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
