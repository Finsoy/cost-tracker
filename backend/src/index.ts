import express, { Response, Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './routes/user';
import { authRouter } from './routes/auth';

dotenv.config();

const PORT: number = parseInt(process.env['PORT'] ?? '3000');

const app = express();

const ALLOWED_ORIGINS = ['http://localhost:5173', 'https://cost-tracker-ten.vercel.app'];

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  }),
);

app.use(express.json());

app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/ping', (req: Request, res: Response) => {
  res.json({ pong: 'pong' });
});

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
