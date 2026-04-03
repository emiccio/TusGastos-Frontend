import type {
  DashboardData,
  TransactionsResponse,
  TransactionFilters,
  TopCategories,
  Transaction,
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
    // Token expirado — limpiar y redirigir al login
    localStorage.removeItem('tg_token');
    localStorage.removeItem('tg_user');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || 'Error en la solicitud');
  }

  return res.json();
}

// ── Auth ─────────────────────────────────────────────────────────

export async function login(phone: string) {
  return request<{ token: string; user: { id: string; phone: string; name?: string } }>(
    '/api/auth/login',
    { method: 'POST', body: JSON.stringify({ phone }) }
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
