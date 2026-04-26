import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number): string {
  return '$' + Math.round(amount).toLocaleString('es-AR');
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Hoy';
  if (date.toDateString() === yesterday.toDateString()) return 'Ayer';

  return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
}

export function percentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
}

export const CATEGORY_COLORS: Record<string, string> = {
  Supermercado: '#e05c5c',
  Comida: '#e09a3e',
  Salidas: '#e07c3e',
  Transporte: '#5b8dd9',
  Auto: '#5b8dd9',
  Casa: '#a0836b',
  Salud: '#5dab7a',
  Farmacia: '#5dab7a',
  Ropa: '#d96ba8',
  Educación: '#4ab8c4',
  Viajes: '#3ea8e0',
  Sueldo: '#2d8a5e',
  Freelance: '#2d8a5e',
  Transferencia: '#3e8fd9',
  Otros: '#9c9c9c',
};

export const CATEGORIES = Object.keys(CATEGORY_COLORS);

export function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Supermercado: '🛒',
    Comida: '🍕',
    Salidas: '🍻',
    Transporte: '🚍',
    Auto: '🚗',
    Casa: '🏠',
    Salud: '❤️',
    Farmacia: '💊',
    Ropa: '👕',
    Educación: '📚',
    Viajes: '✈️',
    Sueldo: '💲',
    Freelance: '💻',
    Transferencia: '💸',
    Otros: '📦',
  };
  return map[category] ?? '📦';
}
