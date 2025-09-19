import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '@/contexts/auth';

export const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold color-primary">
          Cost tracker
        </Link>

        {!user && (
          <div className="flex items-center gap-2">
            <Link to="signup">
              <Button variant="violet">Sign up</Button>
            </Link>
            <Link to="login">
              <Button>Login</Button>
            </Link>
          </div>
        )}

        {user && (
          <Button variant="violet" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};
