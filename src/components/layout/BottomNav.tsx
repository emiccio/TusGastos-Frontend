'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ArrowLeftRight, Tag } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/transactions', label: 'Movimientos', icon: ArrowLeftRight },
  { href: '/categories', label: 'Categorías', icon: Tag },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-gray-950 border-t border-white/5 safe-bottom">
      <div className="flex items-stretch h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-150 relative',
                active ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              )}
            >
              {/* Active indicator dot */}
              {active && (
                <span className="absolute top-2 w-1 h-1 rounded-full bg-emerald-400" />
              )}
              <Icon
                size={20}
                strokeWidth={active ? 2.2 : 1.8}
                className={active ? 'text-emerald-400' : ''}
              />
              <span className={cn(
                'text-[10px] font-medium tracking-wide',
                active ? 'text-white' : 'text-gray-500'
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
