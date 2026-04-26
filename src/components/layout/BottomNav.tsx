'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ArrowLeftRight, Tag, Home } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/transactions', label: 'Movimientos', icon: ArrowLeftRight },
  { href: '/categories', label: 'Categorías', icon: Tag },
  { href: '/hogar', label: 'Hogar', icon: Home },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-[100] md:hidden bg-gray-950 border-t border-white/5 safe-bottom">
      <div className="flex items-stretch h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-150 relative',
                active ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              )}
            >
              {/* Active indicator dot */}
              {active && (
                <span className="absolute top-2 w-1 h-1 rounded-full bg-emerald-400" />
              )}
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 2}
                className={active ? 'text-emerald-400' : ''}
              />
              <span className={cn(
                'text-[11px] font-bold tracking-wide',
                active ? 'text-white' : 'text-gray-400'
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
