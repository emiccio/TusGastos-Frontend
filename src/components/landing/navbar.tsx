import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center transition-transform group-hover:scale-105">
            <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">TusGastos</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/#features" className="hover:text-white transition-colors">Características</Link>
          <Link href="/#demo" className="hover:text-white transition-colors">Cómo funciona</Link>
          {/* <Link href="/pricing" className="hover:text-white transition-colors">Precios</Link> */}
          <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Ingresar
          </Link>
          <Button asChild className="hidden md:block bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6">
            <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer">
              Comenzar gratis
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
