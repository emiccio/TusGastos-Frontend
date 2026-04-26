import type { Transaction } from '@/types';
import TransactionBadge from '@/components/ui/TransactionBadge';
import { formatDateShort, formatMoney } from '@/lib/utils';
import { Trash2, CreditCard } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
  deletingId: string | null;
  getCategoryEmoji: (category: string) => string;
}

export default function TransactionCard({
  transaction,
  onDelete,
  deletingId,
  getCategoryEmoji,
}: TransactionCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 shadow-sm active:scale-[0.98] transition-transform">
      <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
        {getCategoryEmoji(transaction.category)}
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="text-[14px] font-semibold text-gray-900 truncate pr-3">
            {transaction.description || transaction.category}
          </h3>
          <span
            className={`tabular-nums text-[15px] font-semibold whitespace-nowrap mt-0.5 ${
              transaction.type === 'income' ? 'text-[#2d8a5e]' : 'text-[#c04040]'
            }`}
          >
            {transaction.type === 'income' ? '+' : '−'}{formatMoney(transaction.amount)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <TransactionBadge type={transaction.type} />
            <span className="text-[12px] font-medium text-gray-500 truncate">
              {transaction.category}
            </span>
            <span className="text-gray-300 text-[10px]">&bull;</span>
            <span className="text-[12px] text-gray-400 whitespace-nowrap">
              {formatDateShort(transaction.date)}
            </span>
            {transaction.paymentMethod === 'credit' && (
              <>
                <span className="text-gray-300 text-[10px]">&bull;</span>
                <CreditCard size={14} className="text-gray-400" />
              </>
            )}
          </div>
          
          <button
            onClick={() => onDelete(transaction.id)}
            disabled={deletingId === transaction.id}
            className="text-gray-300 hover:text-red-400 p-1 -mr-1 rounded-md active:bg-red-50 transition-colors disabled:opacity-30 flex-shrink-0"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
