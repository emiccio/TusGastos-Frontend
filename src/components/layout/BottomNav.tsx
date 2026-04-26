'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ArrowLeftRight, Tag, Settings, Plus } from 'lucide-react';
import NewTransactionModal from '@/components/ui/NewTransactionModal';

const leftItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/transactions', label: 'Movimientos', icon: ArrowLeftRight },
];

const rightItems = [
  { href: '/categories', label: 'Categorías', icon: Tag },
  { href: '/settings', label: 'Ajustes', icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Modal de nueva transacción */}
      {showModal && (
        <NewTransactionModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            router.refresh();
          }}
        />
      )}

      <nav className="fixed bottom-0 inset-x-0 z-[100] md:hidden">
        {/* Barra principal */}
        <div className="relative bg-gray-950 border-t border-white/5 safe-bottom">
          <div className="flex items-stretch h-16">

            {/* Items izquierda */}
            {leftItems.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  className={cn(
                    'flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-150 relative',
                    active ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  )}
                >
                  {active && (
                    <span className="absolute top-2 w-1 h-1 rounded-full bg-emerald-400" />
                  )}
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.5 : 1.8}
                    className={active ? 'text-emerald-400' : ''}
                  />
                  <span className={cn(
                    'text-[10px] font-semibold tracking-wide',
                    active ? 'text-white' : 'text-gray-500'
                  )}>
                    {label}
                  </span>
                </Link>
              );
            })}

            {/* Espacio central para el FAB */}
            <div className="flex-none w-16" />

            {/* Items derecha */}
            {rightItems.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  className={cn(
                    'flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-150 relative',
                    active ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  )}
                >
                  {active && (
                    <span className="absolute top-2 w-1 h-1 rounded-full bg-emerald-400" />
                  )}
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.5 : 1.8}
                    className={active ? 'text-emerald-400' : ''}
                  />
                  <span className={cn(
                    'text-[10px] font-semibold tracking-wide',
                    active ? 'text-white' : 'text-gray-500'
                  )}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAB central flotante — posicionado sobre la barra */}
        <button
          id="bottom-nav-add-btn"
          aria-label="Agregar transacción"
          onClick={() => setShowModal(true)}
          className={cn(
            'absolute left-1/2 -translate-x-1/2 -top-6',
            'w-14 h-14 rounded-full',
            'bg-emerald-500 hover:bg-emerald-400 active:scale-95',
            'shadow-lg shadow-emerald-500/40',
            'flex items-center justify-center',
            'transition-all duration-200',
            'border-4 border-gray-950'
          )}
        >
          <Plus size={26} strokeWidth={2.5} className="text-white" />
        </button>
      </nav>
    </>
  );
}
