import { cn, formatMoney } from '@/lib/utils';

interface KpiCardProps {
  label: string;
  value: number;
  delta?: number;
  deltaLabel?: string;
  variant?: 'income' | 'expense' | 'neutral';
}

export default function KpiCard({ label, value, delta, deltaLabel, variant = 'neutral' }: KpiCardProps) {
  const valueColor = {
    income: 'text-[#2d8a5e]',
    expense: 'text-[#c04040]',
    neutral: 'text-gray-900',
  }[variant];

  const deltaColor = delta === undefined
    ? ''
    : delta > 0
      ? variant === 'expense' ? 'text-[#c04040]' : 'text-[#2d8a5e]'
      : 'text-gray-400';

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium mb-1.5">{label}</p>
      <p className={cn('font-mono text-[22px] font-medium tracking-tight leading-none', valueColor)}>
        {formatMoney(value)}
      </p>
      {delta !== undefined && (
        <p className={cn('text-[11px] mt-1.5', deltaColor)}>
          {delta > 0 ? '↑' : delta < 0 ? '↓' : '–'} {Math.abs(delta)}% vs {deltaLabel ?? 'mes anterior'}
        </p>
      )}
      {delta === undefined && deltaLabel && (
        <p className="text-[11px] mt-1.5 text-gray-400">{deltaLabel}</p>
      )}
    </div>
  );
}
