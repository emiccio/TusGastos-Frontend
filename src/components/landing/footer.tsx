import Link from 'next/link';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-surface-card border-t border-brand-light/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-heading text-2xl font-bold text-slate-text mb-4 inline-block">
              Gestion<span className="text-brand">Ando</span>
            </Link>
            <p className="text-slate-muted max-w-xs leading-relaxed">
              Tu asistente financiero personal vía WhatsApp. Controlá tus gastos, analizá tus finanzas y ahorrá más cada mes.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-text mb-4 text-sm uppercase tracking-wider">Producto</h4>
            <ul className="space-y-2 text-sm text-slate-muted">
              <li><Link href="#como-funciona" className="hover:text-brand transition-colors">Cómo funciona</Link></li>
              <li><Link href="#precios" className="hover:text-brand transition-colors">Precios</Link></li>
              <li><Link href="#demo" className="hover:text-brand transition-colors">Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-text mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-muted">
              <li><Link href="/terms" className="hover:text-brand transition-colors">Términos y condiciones</Link></li>
              <li><Link href="/privacy" className="hover:text-brand transition-colors">Privacidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-light/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-muted">
          <p>© {new Date().getFullYear()} GestionAndo. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-surface-base rounded-full border border-brand-light/20 hover:text-brand hover:border-brand transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-surface-base rounded-full border border-brand-light/20 hover:text-brand hover:border-brand transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-surface-base rounded-full border border-brand-light/20 hover:text-brand hover:border-brand transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
