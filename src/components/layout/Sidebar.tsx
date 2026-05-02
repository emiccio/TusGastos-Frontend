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
  TrendingUp,
  Home,
  Settings,
  ListTree,
} from 'lucide-react';

import HouseholdSelector from '@/components/layout/HouseholdSelector';
import Image from 'next/image';

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/transactions', label: 'Movimientos', icon: ArrowLeftRight },
  { href: '/categories', label: 'Reportes', icon: Tag },
];

const configItems = [
  { href: '/settings/hogar', label: 'Mi Hogar', icon: Home },
  { href: '/settings/categories', label: 'Gestión Categorías', icon: Settings },
  { href: '/settings/rules', label: 'Reglas Automáticas', icon: ListTree },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const initials = user?.phone?.slice(-4) ?? '??';

  return (
    <aside className="w-[220px] min-w-[220px] h-screen sticky top-0 bg-gray-950 flex flex-col">
      {/* Logo */}
      <div className="px-2.5 pt-6 pb-2 border-b border-white/5">
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center justify-center flex-shrink-0">
            <Image src="/icons/favicon.png" className='mt-1' alt="GestionAndo" width={56} height={56} />
          </div>
          <p className="text-[20px] font-semibold text-white tracking-tight">Gestion<span className="text-brand">Ando</span></p>
        </div>
      </div>

      {/* Household Selector */}
      <HouseholdSelector />

      {/* Nav */}
      <nav className="flex-1 pt-4 px-2.5 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] transition-all duration-150',
                active
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              )}
            >
              <Icon
                size={15}
                strokeWidth={active ? 2.2 : 1.8}
                className={active ? 'text-emerald-400' : ''}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Configuración */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Configuración</p>
      </div>
      <nav className="px-2.5 space-y-0.5 pb-4">
        {configItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] transition-all duration-150',
                active
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              )}
            >
              <Icon
                size={15}
                strokeWidth={active ? 2.2 : 1.8}
                className={active ? 'text-amber-400' : ''}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-5 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2.5 mb-3 px-1">
          <div className="w-7 h-7 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-gray-300 flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-gray-200 truncate">
              {user?.name || 'Mi cuenta'}
            </p>
            <p className="text-[10.5px] text-gray-500 truncate">+{user?.phone}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-2.5 py-1.5 text-[12px] text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-md transition-colors"
        >
          <LogOut size={12} />
          Salir
        </button>
      </div>
    </aside>
  );
}
