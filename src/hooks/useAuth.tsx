'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout } from '@/lib/api';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phone: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('tg_user');
    const token = localStorage.getItem('tg_token');
    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch (_) {}
    }
    setIsLoading(false);
  }, []);

  async function login(phone: string) {
    const data = await apiLogin(phone);
    localStorage.setItem('tg_token', data.token);
    localStorage.setItem('tg_user', JSON.stringify(data.user));
    setUser(data.user);
  }

  async function logout() {
    try {
      await apiLogout();
    } catch (_) {}
    localStorage.removeItem('tg_token');
    localStorage.removeItem('tg_user');
    setUser(null);
    window.location.href = '/login';
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
