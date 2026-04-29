import { Button } from '@/components/ui/button';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#09090b] overflow-hidden">
      {/* Radial Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 text-brand px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Lulu activa en WhatsApp 24/7</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Controlá tu plata enviando un <span className="text-brand">WhatsApp</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed">
            No hace falta ni escribir. Mandale un audio a Lulú contándole tus movimientos y ella se encarga del resto. De forma natural, sin vueltas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-brand-dark hover:bg-brand text-white rounded-lg h-14 px-8 text-lg font-medium shadow-card hover:shadow-card-hover transition-all">
              <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Empezá gratis ahora
              </a>
            </Button>
            <div className="flex items-center gap-3 px-2">
              <div className="flex -space-x-3">
                {['matias.jpg', 'micaela.jpg', 'Elias.jpg'].map((img, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#09090b] overflow-hidden bg-zinc-800">
                    <img src={`/users/${img}`} alt="Usuario" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-zinc-500 font-medium">+1.000 usuarios ya controlan sus gastos</span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Mockup de WhatsApp con marco de dispositivo resaltado */}
          <div className="relative p-[10px] bg-[#1a1a1e] rounded-[2.5rem] shadow-2xl shadow-brand/30 border border-zinc-700/50 max-w-sm mx-auto transform rotate-2 min-[360px]:rotate-2 rotate-0">
            {/* Reflejo de luz superior */}
            <div className="absolute inset-x-4 top-2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Brillo perimetral sutil */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-brand/5 blur-xl -z-10" />

            <div className="rounded-[2rem] overflow-hidden">
              {/* Header del Chat */}
              <div className="bg-[#075e54] p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden flex items-center justify-center border border-white/10">
                  <img src="/Lulu.png" alt="Lulu AI" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Lulú (IA)</p>
                  <p className="text-[10px] text-white/80 font-medium">en línea</p>
                </div>
              </div>

              {/* Área de Mensajes */}
              <div className="p-4 space-y-4 min-h-[300px] bg-opacity-20 bg-[url('/fondoWA.png')] bg-repeat relative">
                <div className="bg-white p-3 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm relative">
                  <p className="text-[11px] text-slate-text leading-relaxed">¡Hola! Mandame cualquier gasto que hayas hecho hoy, ya sea por texto o audio. 🎙️</p>
                  <span className="absolute right-2 bottom-1 text-[8px] text-slate-400">10:45</span>
                </div>
                <div className="bg-[#dcf8c6] p-3 rounded-lg rounded-tr-none self-end ml-auto max-w-[85%] shadow-sm relative">
                  <p className="text-[11px] text-slate-text">Gasté 15k en el super recién</p>
                  <div className="absolute right-2 bottom-1 flex items-center gap-0.5">
                    <span className="text-[8px] text-slate-400">10:46</span>
                    <div className="text-brand flex -space-x-1">
                      <span className="text-[8px]">✓</span>
                      <span className="text-[8px]">✓</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm border-l-4 border-brand relative">
                  <p className="text-[11px] text-slate-text leading-relaxed">¡Perfecto! Registré <b>$15.000</b> en la categoría <b>Supermercado</b>. 🛒</p>
                  <span className="absolute right-2 bottom-1 text-[8px] text-slate-400">10:46</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
