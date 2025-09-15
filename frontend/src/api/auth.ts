import api from './axios';
import type { User } from './types';

export const register = async (data: Omit<User, 'id'>) => {
  const res = await api.post('/auth/register', data);

  return res.data;
};
