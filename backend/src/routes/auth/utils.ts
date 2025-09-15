import jwt from 'jsonwebtoken';
import {
  ACCESS_SECRET,
  ACCESS_TOKEN_EXPIRES,
  isProd,
  REFRESH_SECRET,
  REFRESH_TOKEN_EXPIRES,
} from './constants';


export const coockieOptions = (maxAgeSeconds: number) => ({
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' as const : 'lax' as const,
  maxAge: maxAgeSeconds * 1000,
  path: '/',
});

export const signAccessToken = (payload: object): string => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
};

export const signRefreshToken = (payload: object): string => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
};
