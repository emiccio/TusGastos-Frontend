import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WHATSAPP_DEEP_LINK } from '@/lib/constants';
import { MessageCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold text-white tracking-tight">
          Gestion<span className="text-brand">Ando</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Características
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Cómo funciona
          </Link>
          <Link href="#faq" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className=" text-sm font-medium text-zinc-400 hover:text-white transition-colors px-4">
            Ingresar
          </Link>
          <Button asChild className="hidden sm:block bg-white text-black hover:bg-zinc-200 rounded-full font-bold shadow-sm">
            <a href={WHATSAPP_DEEP_LINK} target="_blank" rel="noopener noreferrer">
              Comenzar gratis
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
