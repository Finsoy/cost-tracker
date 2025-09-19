import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginFormValues } from './Schemas';
import type { AxiosError } from 'axios';
import type { ServerError } from './types';
import { DEFAULT_ERROR_MESSAGE } from '@/api';
import { ErrorMessageForForm } from '../ui/ErorrMessageForForm';
import { useAuth } from '@/contexts/auth';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({ resolver: zodResolver(LoginSchema) });

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
    } catch (err) {
      const error = err as AxiosError<ServerError>;

      if (error?.response?.data) {
        const { error: errorMessage, field } = error.response.data;

        setError(field ?? 'root', {
          type: 'server',
          message: errorMessage || DEFAULT_ERROR_MESSAGE,
        });
      } else {
        setError('root', { type: 'server', message: DEFAULT_ERROR_MESSAGE });
      }
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-4 max-w-sm h-9/10 justify-center mx-auto', className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Login</CardTitle>
          <CardDescription>Enter credentials from your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                {/* // TODO: create FormInput with logic label and erorr */}
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
                {errors.email?.message && <ErrorMessageForForm text={errors.email.message} />}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password?.message && <ErrorMessageForForm text={errors.password.message} />}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-violet-500 text-primary hover:bg-violet-600"
                  loading={isSubmitting}
                >
                  Login
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
