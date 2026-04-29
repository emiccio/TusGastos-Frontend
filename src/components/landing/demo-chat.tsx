import { MessageCircle } from 'lucide-react';

export default function DemoChat() {
  const messages = [
    { type: 'user', text: 'Gasté 4500 en café y medialunas' },
    { type: 'bot', text: '¡Anotado! $4.500 en la categoría <b>Comida</b>.' },
    { type: 'user', text: '¿Cuánto me queda de presupuesto?' },
    { type: 'bot', text: 'Te quedan $12.400 para el resto del mes. ¡Vas bien! 🚀' },
    { type: 'user', text: 'Pagué el internet 8500' },
    { type: 'bot', text: 'Listo. Registré $8.500 en <b>Servicios</b>.' },
  ];

  return (
    <section className="py-20 bg-surface-card" id="demo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-text mb-6">
              Hablar con Lulú es como hablar con un amigo
            </h2>
            <p className="text-lg text-slate-muted mb-8 leading-relaxed">
              Nuestra IA entiende lenguaje natural. No tenés que aprender comandos raros ni llenar formularios tediosos. Solo escribí lo que gastaste y listo.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <p className="text-slate-text font-medium text-sm">Entiende montos y monedas</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <p className="text-slate-text font-medium text-sm">Categoriza automáticamente</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <p className="text-slate-text font-medium text-sm">Responde tus dudas financieras</p>
              </div>
            </div>
          </div>

          <div className="bg-[#E5DDD5] rounded-card shadow-card-hover border border-slate-200 overflow-hidden max-w-md w-full mx-auto">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] p-4 flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center text-[#075E54] font-bold text-lg">
                L
              </div>
              <div>
                <p className="font-bold">Lulú (IA)</p>
                <p className="text-[10px] opacity-80">en línea</p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3 h-[400px] overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`max-w-[85%] p-3 rounded-lg shadow-sm text-sm ${
                    m.type === 'user' 
                      ? 'bg-[#DCF8C6] ml-auto rounded-tr-none' 
                      : 'bg-white mr-auto rounded-tl-none'
                  }`}
                >
                  <p dangerouslySetInnerHTML={{ __html: m.text }} />
                  <p className="text-[9px] text-slate-400 text-right mt-1">14:0{i}</p>
                </div>
              ))}
            </div>

            {/* Chat Footer */}
            <div className="bg-[#F0F0F0] p-3 flex items-center gap-2">
              <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-slate-400">
                Escribe un mensaje...
              </div>
              <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
