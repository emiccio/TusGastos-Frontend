import type {
  DashboardData,
  TransactionsResponse,
  TransactionFilters,
  TopCategories,
  Transaction,
  HouseholdInfo,
  InviteResponse,
  Category,
  CategoryRule,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tg_token');
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('tg_token');
    localStorage.removeItem('tg_user');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Error desconocido' }));
    const err = new Error(body.message || body.error || 'Error en la solicitud') as any;
    err.code = body.error;
    throw err;
  }

  return res.json();
}

// ── Auth ─────────────────────────────────────────────────────────

export async function requestOtp(phone: string): Promise<{ success: boolean; message: string }> {
  return request('/api/auth/request-otp', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });
}

export async function login(phone: string, code: string) {
  return request<{ token: string; user: { id: string; phone: string; name?: string } }>(
    '/api/auth/login',
    { method: 'POST', body: JSON.stringify({ phone, code }) }
  );
}

export async function logout() {
  return request('/api/auth/logout', { method: 'POST' });
}

// ── Transactions ─────────────────────────────────────────────────

export async function getDashboard(): Promise<DashboardData> {
  return request('/api/transactions/summary');
}

export async function getTransactions(filters: TransactionFilters = {}): Promise<TransactionsResponse> {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.type) params.set('type', filters.type);
  if (filters.category) params.set('category', filters.category);
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);

  return request(`/api/transactions?${params.toString()}`);
}

export async function createTransaction(data: {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  date?: string;
  paymentMethod?: string;
}): Promise<Transaction> {
  return request('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteTransaction(id: string): Promise<void> {
  return request(`/api/transactions/${id}`, { method: 'DELETE' });
}

export async function getCategories(monthOffset = 0): Promise<TopCategories> {
  return request(`/api/transactions/categories?monthOffset=${monthOffset}`);
}

// ── Household ─────────────────────────────────────────────────────

export async function getHousehold(): Promise<HouseholdInfo> {
  return request('/api/household');
}

export async function createInvite(): Promise<InviteResponse> {
  return request('/api/household/invite', { method: 'POST' });
}

export async function joinHousehold(token: string): Promise<{ alreadyMember: boolean; householdName: string }> {
  return request('/api/household/join', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

// ── Categories & Rules ───────────────────────────────────────────

export async function getCustomCategories(): Promise<Category[]> {
  return request('/api/categories');
}

export async function createCustomCategory(data: { name: string; icon?: string }): Promise<Category> {
  return request('/api/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteCustomCategory(id: string): Promise<void> {
  return request(`/api/categories/${id}`, { method: 'DELETE' });
}

export async function getRules(): Promise<CategoryRule[]> {
  return request('/api/categories/rules');
}

export async function createRule(data: { keyword: string; categoryId: string }): Promise<CategoryRule> {
  return request('/api/categories/rules', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteRule(id: string): Promise<void> {
  return request(`/api/categories/rules/${id}`, { method: 'DELETE' });
}