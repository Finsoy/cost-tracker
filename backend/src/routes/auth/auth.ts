import { Router } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { coockieOptions, signAccessToken, signRefreshToken } from './utils';

const prisma = new PrismaClient();
export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password)
      return res.status(400).json({ errorMessage: 'Email and password required' });

    const isExistUser = await prisma.user.findUnique({ where: { email } });
    console.log('🚀 ~ isExistUser:', isExistUser);

    if (isExistUser)
      return res.status(409).json({ field: 'email', errorMessage: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    console.log('user from prisma: ', user);
    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });

    res.cookie('accessToken', accessToken, coockieOptions(60 * 15)); // 15 min
    res.cookie('refreshToken', refreshToken, coockieOptions(60 * 60 * 24 * 14)); // 14 days

    return res.json({ user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errorMessage: `Server error` });
  }
});
