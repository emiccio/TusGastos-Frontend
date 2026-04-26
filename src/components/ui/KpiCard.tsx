import { cn, formatMoney } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface KpiCardProps {
  label: string;
  value: number;
  delta?: number;
  deltaLabel?: string;
  variant?: 'income' | 'expense' | 'neutral';
}

export default function KpiCard({ label, value, delta, deltaLabel, variant = 'neutral' }: KpiCardProps) {
  const accentGradient = {
    income: 'from-emerald-500 to-emerald-600',
    expense: 'from-red-400 to-red-500',
    neutral: 'from-gray-300 to-gray-400',
  }[variant];

  const valueColor = {
    income: 'text-emerald-700',
    expense: 'text-red-600',
    neutral: 'text-gray-900',
  }[variant];

  const isPositiveDelta = delta !== undefined && delta > 0;
  const isNegativeDelta = delta !== undefined && delta < 0;

  // For expenses, going up is bad (red), going down is good (green)
  const deltaPillClass = delta === undefined
    ? ''
    : isPositiveDelta
      ? variant === 'expense' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : isNegativeDelta
        ? variant === 'expense' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-100 text-gray-500 border-gray-200'
        : 'bg-gray-100 text-gray-400 border-gray-200';

  const DeltaIcon = isPositiveDelta ? TrendingUp : isNegativeDelta ? TrendingDown : Minus;

  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 items-start shadow-sm transition-all duration-300 relative overflow-hidden group"
    >
      {/* Background subtle glow on hover */}
      <div className={cn('absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full', variant === 'income' ? 'bg-emerald-500' : variant === 'expense' ? 'bg-red-500' : 'bg-gray-500')} />

      {/* Left accent bar with gradient */}
      <div className={cn('w-1.5 self-stretch rounded-full flex-shrink-0 bg-gradient-to-b', accentGradient)} />

      <div className="flex-1 min-w-0 z-10">
        <p className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-2 opacity-80">
          {label}
        </p>
        <div className="flex items-baseline gap-1">
          <span className={cn('text-[28px] font-semibold tabular-nums tracking-tight leading-none', valueColor)}>
            {formatMoney(value)}
          </span>
        </div>

        {/* Delta pill */}
        {delta !== undefined && (
          <span className={cn(
            'inline-flex items-center gap-1.5 mt-3 rounded-full px-2.5 py-1 text-[11px] font-bold border transition-colors',
            deltaPillClass
          )}>
            <DeltaIcon size={11} strokeWidth={2.5} />
            {Math.abs(delta)}% <span className="opacity-70 font-medium">vs mes anterior</span>
          </span>
        )}
        {delta === undefined && deltaLabel && (
          <p className="text-[11px] mt-2 text-gray-500 font-medium">{deltaLabel}</p>
        )}
      </div>
    </motion.div>
  );
}
