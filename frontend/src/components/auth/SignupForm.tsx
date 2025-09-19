import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SignupSchema, type SignupFormValues } from './Schemas';
import type { AxiosError } from 'axios';
import { DEFAULT_ERROR_MESSAGE } from '@/api';
import type { ServerError } from './types';
import { ErrorMessageForForm } from '../ui/ErorrMessageForForm';
import { useAuth } from '@/contexts/auth';

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
  });

  const { register: registerUser } = useAuth();

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await registerUser(data);
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
          <CardTitle className="text-lg">Sign Up</CardTitle>
          <CardDescription>Enter valid email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" placeholder="m@example.com" {...register('email')} />
                {errors.email?.message && <ErrorMessageForForm text={errors.email.message} />}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password?.message && <ErrorMessageForForm text={errors.password.message} />}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" {...register('name')} />
              </div>
              {errors.root?.message && <ErrorMessageForForm text={errors.root.message} />}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-violet-500 text-primary hover:bg-violet-600"
                  loading={isSubmitting}
                >
                  Sign up
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
