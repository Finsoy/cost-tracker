import api from './axios';
import type { FullUser, User } from './types';

export const register = async (data: Omit<FullUser, 'id'>): Promise<{ user: User }> => {
  const res = await api.post('/auth/register', data);

  return res.data;
};

export const login = async (data: Omit<FullUser, 'id' | 'name'>): Promise<{ user: User }> => {
  const res = await api.post('/auth/login', data);

  return res.data;
};

export const me = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export const refresh = () => {
  return api.get('/auth/refresh');
};

export const logout = () => {
  return api.get('/auth/logout');
};
