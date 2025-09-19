import jwt from 'jsonwebtoken';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { cookieOptions, signAccessToken, signRefreshToken } from './utils';
import { ACCESS_SECRET, REFRESH_SECRET } from './constants';

const prisma = new PrismaClient();
export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const isExistUser = await prisma.user.findUnique({ where: { email } });
    console.log('🚀 ~ isExistUser:', isExistUser);

    if (isExistUser) return res.status(409).json({ field: 'email', error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
      select: { id: true, email: true, name: true },
    });

    console.log('user from prisma: ', user);
    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });

    res.cookie('accessToken', accessToken, cookieOptions(60 * 15)); // 15 min
    res.cookie('refreshToken', refreshToken, cookieOptions(60 * 60 * 24 * 14)); // 14 days

    return res.json({ user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: `Server error` });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return res.status(401).json({ field: 'email', error: "User with this email doesn't exist" });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res.status(401).json({ field: 'password', error: 'Incorrect password' });

    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });

    res.cookie('accessToken', accessToken, cookieOptions(60 * 15)); // 15 min
    res.cookie('refreshToken', refreshToken, cookieOptions(60 * 60 * 24 * 14)); // 14 days

    // return safe user object (no password)
    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return res.json({ user: safeUser });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ME — проверить текущего пользователя по accessToken
authRouter.get('/me', async (req, res) => {
  try {
    console.log('cookies: ', req.cookies);

    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const payload = jwt.verify(token, ACCESS_SECRET) as { userId: number };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    if (!user) return res.status(401).json({ error: 'User not found' });

    return res.json({ user });
  } catch (e) {
    console.error('me err', e);
    return res.status(401).json({ error: 'Not authenticated' });
  }
});

authRouter.get('/refresh', async (req, res) => {
  try {
    const rtoken = req.cookies?.refreshToken;
    if (!rtoken) return res.status(401).json({ error: 'No refresh token' });

    const payload = jwt.verify(rtoken, REFRESH_SECRET) as { userId: number };

    const accessToken = signAccessToken({ userId: payload.userId });

    res.cookie('accessToken', accessToken, cookieOptions(60 * 15)); // 15 min;

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

authRouter.get('/logout', async (req, res) => {
  try {
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: 'Something went wrong, try again later.' });
  }
});
