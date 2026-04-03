import { cn } from '@/lib/utils';
import type { TransactionType } from '@/types';

export default function TransactionBadge({ type }: { type: TransactionType }) {
  return (
    <span
      className={cn(
        'inline-block text-[10.5px] font-medium px-2 py-0.5 rounded-full',
        type === 'income'
          ? 'bg-[#e4f5ec] text-[#2d8a5e]'
          : 'bg-[#fceaea] text-[#c04040]'
      )}
    >
      {type === 'income' ? 'Ingreso' : 'Gasto'}
    </span>
  );
}
