import type { LoginFormValues } from './Schemas';

export type ServerError = {
  field?: keyof LoginFormValues;
  error?: string;
};
