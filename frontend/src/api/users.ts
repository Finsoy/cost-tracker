import api from './axios';
import type { User } from './types';

export const getUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const createUser = async (data: Omit<User, 'id'>) => {
  const res = await api.post('/users', data);
  return res.data;
};
