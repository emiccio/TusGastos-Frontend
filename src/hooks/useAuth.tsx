'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { requestOtp, login as apiLogin, logout as apiLogout, me as apiMe } from '@/lib/api';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  requestOtp: (phone: string) => Promise<void>;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await apiMe();
      if (data.user) {
        localStorage.setItem('tg_user', JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch (err) {
      console.error('Error refreshing user:', err);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('tg_user');
    const token = localStorage.getItem('tg_token');
    
    if (token) {
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (_) { }
      }
      // Siempre intentar refrescar si hay token
      refreshUser().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  async function handleRequestOtp(phone: string) {
    await requestOtp(phone);
  }

  async function login(phone: string, code: string) {
    const data = await apiLogin(phone, code);
    localStorage.setItem('tg_token', data.token);
    localStorage.setItem('tg_user', JSON.stringify(data.user));
    setUser(data.user);
  }

  async function logout() {
    try {
      await apiLogout();
    } catch (_) { }
    localStorage.removeItem('tg_token');
    localStorage.removeItem('tg_user');
    setUser(null);
    window.location.href = '/login';
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, requestOtp: handleRequestOtp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}