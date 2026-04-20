export type TransactionType = 'income' | 'expense';
export type PlanType = 'FREE' | 'PREMIUM';

export interface User {
  id: string;
  phone: string;
  name?: string;
  plan?: PlanType;
}

export interface HouseholdMember {
  id: string;
  phone: string;
  name?: string;
  role: 'ADMIN' | 'MEMBER';
  joinedAt: string;
}

export interface HouseholdInfo {
  id: string;
  name: string;
  plan: PlanType;
  isOwner: boolean;
  canInvite: boolean;
  members: HouseholdMember[];
}

export interface InviteResponse {
  token: string;
  link: string;
  expiresAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  householdId: string;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  paymentMethod?: string;
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

export interface Category {
  id: string;
  name: string;
  icon?: string | null;
  isCustom: boolean;
}

export interface CategoryRule {
  id: string;
  keyword: string;
  categoryId: string;
  category?: Category;
}
