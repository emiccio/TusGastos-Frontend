'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import AppLayout from '@/components/layout/AppLayout';
import {
  Home,
  Settings as SettingsIcon,
  ListTree,
  LogOut,
  ChevronRight,
  User,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

const settingsGroups = [
  {
    title: 'Cuenta y Hogar',
    items: [
      {
        href: '/settings/hogar',
        label: 'Mi Hogar',
        description: 'Gestionar miembros e invitaciones',
        icon: Home,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
      },
    ],
  },
  {
    title: 'Personalización',
    items: [
      {
        href: '/settings/categories',
        label: 'Gestión de Categorías',
        description: 'Personalizar tus categorías de gastos',
        icon: SettingsIcon,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
      },
      {
        href: '/settings/rules',
        label: 'Reglas Automáticas',
        description: 'Automatizar la clasificación de gastos',
        icon: ListTree,
        color: 'text-amber-500',
        bgColor: 'bg-amber-50',
      },
    ],
  },
];

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <AppLayout>
      <div className="min-h-full bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-8 md:px-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Ajustes</h1>
          <p className="text-sm text-gray-500 mt-1">Configurá tu cuenta y preferencias</p>
        </div>

        <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 pb-24">

          {/* User Profile Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white text-lg font-bold">
              {user?.name?.[0]?.toUpperCase() || user?.phone?.slice(-1)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-900 truncate">
                {user?.name || 'Usuario'}
              </h2>
              <p className="text-sm text-gray-500 truncate">+{user?.phone}</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                {user?.plan || 'FREE'}
              </span>
            </div>
          </div>

          {/* Settings Groups */}
          {settingsGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="px-1 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                {group.title}
              </h3>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-all group"
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                      item.bgColor,
                      item.color
                    )}>
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-gray-900">
                        {item.label}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Action Section */}
          <div className="space-y-3 pt-4">
            <h3 className="px-1 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
              Sesión
            </h3>
            <button
              onClick={logout}
              className="w-full flex items-center gap-4 p-4 bg-white hover:bg-red-50 rounded-2xl border border-gray-100 shadow-sm transition-all group group-hover:border-red-100"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                <LogOut size={20} />
              </div>
              <div className="text-left">
                <p className="text-[14px] font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                  Cerrar Sesión
                </p>
                <p className="text-[12px] text-gray-500">
                  Salir de tu cuenta en este dispositivo
                </p>
              </div>
            </button>
          </div>

          <div className="text-center pt-8">
            <p className="text-[11px] text-gray-400 font-medium">GestionAndo v1.0.0</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
