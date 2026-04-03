export type TransactionType = 'income' | 'expense';

export interface User {
  id: string;
  phone: string;
  name?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: string;
  rawMessage?: string;
  createdAt: string;
}

export interface MonthlyBalance {
  period: string;
  income: number;
  expenses: number;
  balance: number;
  transactionCount: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export interface TopCategories {
  period: string;
  categories: CategoryTotal[];
  totalExpenses: number;
}

export interface DashboardData {
  currentMonth: MonthlyBalance;
  lastMonth: MonthlyBalance;
  topCategories: TopCategories;
  recent: Transaction[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: Pagination;
}

export interface TransactionFilters {
  page?: number;
  limit?: number;
  type?: TransactionType;
  category?: string;
  from?: string;
  to?: string;
}
