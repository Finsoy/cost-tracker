import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SignupSchema, type SignupFormValues } from './SignupSchema';
import { registerUser } from '@/api/auth';
import type { AxiosError } from 'axios';
import { DEFAULT_ERROR_MESSAGE } from '@/api';

type ServerError = {
  field?: keyof SignupFormValues;
  errorMessage?: string;
};

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await registerUser(data);
      console.log('🚀 ~ response:', response);
    } catch (err) {
      const error = err as AxiosError<ServerError>;

      if (error?.response?.data) {
        const { errorMessage, field } = error.response.data;

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
                {errors.email?.message && <p className="text-red-400">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password?.message && (
                  <p className="text-red-400">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" {...register('name')} />
              </div>
              {errors.root?.message && <p className="text-red-400">{errors.root.message}</p>}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-violet-500 text-primary hover:bg-violet-600"
                  loading={isSubmitting}
                >
                  Sign up
                </Button>
                <Button variant="outline" className="w-full">
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
