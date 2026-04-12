import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-4 inline-flex">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center transition-transform group-hover:scale-105">
                <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-gray-900 font-semibold text-lg tracking-tight">TusGastos</span>
            </Link>
            <p className="text-gray-500 max-w-sm mb-6">
              Tu asistente financiero personal vía WhatsApp. Controlá tus gastos, analizá tus finanzas y ahorrá más cada mes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Producto</h4>
            <ul className="space-y-3">
              <li><Link href="/#features" className="text-gray-500 hover:text-emerald-500 transition-colors">Características</Link></li>
              {/* <li><Link href="/pricing" className="text-gray-500 hover:text-emerald-500 transition-colors">Precios</Link></li> */}
              <li><Link href="/#demo" className="text-gray-500 hover:text-emerald-500 transition-colors">Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-gray-500 hover:text-emerald-500 transition-colors">Privacidad</Link></li>
              <li><Link href="/terms" className="text-gray-500 hover:text-emerald-500 transition-colors">Términos de servicio</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TusGastos. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {/* Social links wrappers */}
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">𝕏</a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">In</a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
