import { Button } from '@/components/ui/button';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';
import { MessageCircle } from 'lucide-react';

export default function Cta() {
  return (
    <section className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Decorative elements - Radial Glows to match Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
          Empezá a tomar el control hoy mismo
        </h2>
        <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
          Unirse toma exactamente 30 segundos. Solo tenés que registrarte y mandarle un WhatsApp a Lulu.
        </p>

        <Button asChild size="lg" className="bg-brand hover:bg-brand-dark text-white rounded-full h-16 px-10 text-xl font-bold shadow-xl shadow-brand/20 transform transition-transform hover:scale-105 active:scale-95">
          <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            ¡Empezar ahora!
          </a>
        </Button>

        <p className="mt-6 text-zinc-500 text-sm font-medium">
          Es gratis. Podés cancelar cuando quieras.
        </p>
      </div>
    </section>
  );
}
