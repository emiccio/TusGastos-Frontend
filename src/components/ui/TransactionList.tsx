import type { Transaction } from '@/types';
import TransactionCard from '@/components/ui/TransactionCard';

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
  onDelete: (id: string) => void;
  deletingId: string | null;
  getCategoryEmoji: (category: string) => string;
}

export default function TransactionList({
  transactions,
  loading,
  onDelete,
  deletingId,
  getCategoryEmoji,
}: TransactionListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 bg-gray-50 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="py-16 text-center bg-gray-50 rounded-2xl border border-gray-100/50">
        <p className="text-[14px] text-gray-500 font-medium">No hay transacciones con esos filtros</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <TransactionCard
          key={tx.id}
          transaction={tx}
          onDelete={onDelete}
          deletingId={deletingId}
          getCategoryEmoji={getCategoryEmoji}
        />
      ))}
    </div>
  );
}
