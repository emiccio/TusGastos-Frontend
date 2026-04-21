import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gray-950">
      {/* Background Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-gray-300 font-medium">Lulu activa en WhatsApp 24/7</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Controlá todos tus gastos <span className="text-emerald-400">desde WhatsApp</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Olvidate de las apps complicadas. Registrá gastos, consultá tus balances y tomá mejores decisiones financieras solo mandando un mensaje.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto text-base rounded-full px-8 h-14 bg-emerald-500 hover:bg-emerald-400 text-white">
            <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Probar gratis ahora
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base rounded-full px-8 h-14 border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
            <Link href="/#demo">
              Ver demo de 1 minuto
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
