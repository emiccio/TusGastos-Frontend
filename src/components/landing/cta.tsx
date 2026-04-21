import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';

export default function Cta() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gray-950 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
              Empezá a tomar el control hoy mismo
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Unirse toma exactamente 30 segundos. Solo tenés que registrarte y mandarle un WhatsApp a Lulu.
            </p>
            <Button asChild size="lg" className="rounded-full px-10 h-14 text-base bg-emerald-500 hover:bg-emerald-400 text-white border-0">
              <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer">
                Comenzar gratis
              </a>
            </Button>
            <p className="mt-6 text-sm text-gray-500">
              No requiere tarjeta de crédito. Cancelá cuando quieras.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
