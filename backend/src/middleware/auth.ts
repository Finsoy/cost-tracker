import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_SECRET } from '../routes/auth/constants';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  if (!accessToken) return res.status(401).json({ error: 'No access token' });

  try {
    const payload = jwt.verify(accessToken, ACCESS_SECRET) as { userId: number };

    // 3. Кладём данные пользователя в req (чтобы дальше в хендлерах было видно)
    (req as any).user = {
      id: payload.userId,
    };

    next();
    return;
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
