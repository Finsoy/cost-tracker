import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// POST /users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

export default router;
