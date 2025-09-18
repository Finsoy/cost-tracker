import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email('Incorrect email'),
  password: z.string().min(6, 'Min 6 symbols'),
  name: z.string().optional(),
});

export type SignupFormValues = z.infer<typeof SignupSchema>;
