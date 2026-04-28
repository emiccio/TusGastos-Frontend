import { Mic, BarChart3, Zap, Shield, Globe2, Bell } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Decorative Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight mb-4">
            Todo lo que necesitás para tener el control
          </h2>
          <p className="text-lg text-zinc-400">
            Potentes herramientas diseñadas para simplificar tu vida financiera de forma inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-zinc-900/40 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-brand/20 transition-colors">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <Mic className="w-12 h-12 text-brand mb-8" />
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Reconocimiento por voz</h3>
              <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                No hace falta ni escribir. Mandale un audio a Lulu contándole tus movimientos financieros del día, de forma completamente natural, y el sistema se encargará del resto.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-brand/20 transition-colors">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <Zap className="w-12 h-12 text-brand mb-8" />
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Categorización AI</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                La inteligencia artificial detecta automáticamente si tu gasto fue en comida, transporte o entretenimiento.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-brand/20 transition-colors">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <BarChart3 className="w-12 h-12 text-brand mb-8" />
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Dashboard web</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Accedé a gráficos dinámicos con todo tu historial de movimientos por mes y categoría.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 bg-zinc-900/40 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-brand/20 transition-colors">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <Shield className="w-12 h-12 text-brand mb-8" />
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Privacidad total</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Tus datos están seguros y encriptados. Nadie excepto vos puede ver tu historial financiero. La seguridad es nuestra prioridad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
