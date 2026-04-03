'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tag,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/transactions', label: 'Movimientos', icon: ArrowLeftRight },
  { href: '/categories', label: 'Categorías', icon: Tag },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const initials = user?.phone?.slice(-4) ?? '??';

  return (
    <aside className="w-[220px] min-w-[220px] h-screen sticky top-0 bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-gray-100">
        <p className="text-[17px] font-semibold text-gray-900 tracking-tight">TusGastos</p>
        <p className="text-[11px] text-gray-400 mt-0.5">Dashboard financiero</p>
        <div className="inline-flex items-center gap-1.5 mt-2.5 bg-green-50 text-green-700 text-[10px] font-medium px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          Lulu activa
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 pt-3 px-2 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] transition-all',
                active
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              )}
            >
              <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-5 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-medium text-blue-700 flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-gray-900 truncate">
              {user?.name || 'Mi cuenta'}
            </p>
            <p className="text-[10.5px] text-gray-400 truncate">+{user?.phone}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-2.5 py-1.5 text-[12px] text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
        >
          <LogOut size={12} />
          Salir
        </button>
      </div>
    </aside>
  );
}
