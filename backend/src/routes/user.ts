import { Router } from 'express';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';

const router = Router();
const prisma = new PrismaClient();

// POST /users
router.post('/', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

export default router;
