export const Currencies = {
  USD: 'usd',
  BYN: 'byn',
} as const;

export type Currencies = (typeof Currencies)[keyof typeof Currencies];
