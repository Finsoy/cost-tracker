import type { FullUser } from '@/api/types';
import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthContextType } from './types';
import * as authApi from '@/api/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await authApi.me();
      console.log('me resp: ', res);

      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login: AuthContextType['login'] = async (data) => {
    const res = await authApi.login(data);
    console.log('🚀 ~ login ~ res:', res);
    setUser(res.user);
  };
  const register: AuthContextType['register'] = async (data) => {
    const res = await authApi.register(data);
    console.log('🚀 ~ register ~ res:', res);
    setUser(res.user);
  };
  const logout: AuthContextType['logout'] = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
