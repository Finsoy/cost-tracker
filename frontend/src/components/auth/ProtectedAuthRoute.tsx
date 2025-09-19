import { useAuth } from '@/contexts/auth';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedAuthRoute: React.FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};
