import type { FullUser } from '@/api/types';

export type AuthContextType = {
  user: FullUser | null;
  loading: boolean;
  login: (data: Omit<FullUser, 'id' | 'name'>) => Promise<void>;
  register: (data: Omit<FullUser, 'id'>) => Promise<void>;
  logout: () => Promise<void>;
};
