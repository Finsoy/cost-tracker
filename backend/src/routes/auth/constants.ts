import { StringValue } from 'ms';

export const ACCESS_SECRET = process.env['JWT_ACCESS_SECRET']!;
export const ACCESS_TOKEN_EXPIRES = (process.env['ACCESS_TOKEN_EXPIRES'] as StringValue) ?? '15m';

export const REFRESH_SECRET = process.env['JWT_REFRESH_SECRET']!;
export const REFRESH_TOKEN_EXPIRES = (process.env['REFRESH_TOKEN_EXPIRES'] as StringValue) ?? '14d';

export const isProd = process.env['NODE_ENV'] === 'production';
