import { cn, formatMoney } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: number;
  delta?: number;
  deltaLabel?: string;
  variant?: 'income' | 'expense' | 'neutral';
}

export default function KpiCard({ label, value, delta, deltaLabel, variant = 'neutral' }: KpiCardProps) {
  const accentBar = {
    income: 'bg-emerald-500',
    expense: 'bg-red-400',
    neutral: 'bg-gray-300',
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
      ? variant === 'expense' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'
      : isNegativeDelta
        ? variant === 'expense' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
        : 'bg-gray-100 text-gray-400';

  const DeltaIcon = isPositiveDelta ? TrendingUp : isNegativeDelta ? TrendingDown : Minus;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 flex gap-4 items-start hover:shadow-sm transition-shadow duration-200">
      {/* Left accent bar */}
      <div className={cn('w-1 self-stretch rounded-full flex-shrink-0', accentBar)} />

      <div className="flex-1 min-w-0">
        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-2">
          {label}
        </p>
        <p className={cn('font-mono text-[26px] font-semibold tracking-tight leading-none', valueColor)}>
          {formatMoney(value)}
        </p>

        {/* Delta pill */}
        {delta !== undefined && (
          <span className={cn(
            'inline-flex items-center gap-1 mt-2.5 rounded-full px-2 py-0.5 text-[10.5px] font-medium',
            deltaPillClass
          )}>
            <DeltaIcon size={10} strokeWidth={2.5} />
            {Math.abs(delta)}% vs mes anterior
          </span>
        )}
        {delta === undefined && deltaLabel && (
          <p className="text-[11px] mt-2 text-gray-400">{deltaLabel}</p>
        )}
      </div>
    </div>
  );
}
