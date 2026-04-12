import { Send } from 'lucide-react';

export default function DemoChat() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-emerald-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-6">
              Sin procesos complicados. <br className="hidden md:block"/>
              Anotá mientras caminás.
            </h2>
            <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto md:mx-0">
              Simplemente abrí WhatsApp y decile a tu asistente qué compraste. Nosotros nos encargamos de organizarlo en tu dashboard.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">1</div>
                <p className="text-gray-700">Entrás al chat de <span className="font-semibold text-gray-900">Lulu</span></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">2</div>
                <p className="text-gray-700">Escribís o mandás un audio natural</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">3</div>
                <p className="text-gray-700">Recibís confirmación al instante 🎉</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-sm mx-auto">
            {/* Phone mockup */}
            <div className="bg-gray-100 border-[8px] border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative h-[600px] flex flex-col">
              {/* Dynamic island */}
              <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
                <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
              </div>

              {/* Chat Header */}
              <div className="bg-emerald-600 pt-10 pb-3 px-4 flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 shrink-0">
                  L
                </div>
                <div>
                  <h4 className="text-white font-semibold leading-tight">Lulu</h4>
                  <p className="text-emerald-100 text-xs">en línea</p>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 bg-[#efeae2] p-4 flex flex-col gap-4 overflow-hidden relative">
                {/* Chat Background pattern (simulated) */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')] bg-repeat z-0 mix-blend-multiply" />
                
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="bg-emerald-100 text-[#111b21] p-2.5 rounded-2xl rounded-tr-sm self-end max-w-[85%] text-[15px] shadow-sm">
                    Recién gasté 15k en el supermercado Día y 4500 de un café.
                    <div className="text-[10px] text-gray-500 text-right mt-1">10:30</div>
                  </div>
                  
                  <div className="bg-white text-[#111b21] p-2.5 rounded-2xl rounded-tl-sm self-start max-w-[90%] text-[15px] shadow-sm">
                    ¡Anotado! 🛒 ☕️ <br/>
                    • $15,000 en Supermercado<br/>
                    • $4,500 en Restaurantes<br/>
                    <br/>
                    Balance del mes actual: $245,500
                    <div className="text-[10px] text-gray-500 text-right mt-1">10:30</div>
                  </div>
                </div>
              </div>

              {/* Chat Footer */}
              <div className="bg-[#f0f2f5] px-2 py-2.5 flex items-center gap-2 relative z-10">
                <div className="flex-1 bg-white rounded-full py-2.5 px-4 text-gray-400 text-[15px]">
                  Escribe un mensaje...
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <Send className="w-5 h-5 ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
