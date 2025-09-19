import express, { Response, Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user';
import { authRouter } from './routes/auth';

dotenv.config();

const PORT: number = parseInt(process.env['PORT'] ?? '3000');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env['FRONTEND_URL'] || 'http://localhost:5173',
    credentials: true,
  }),
);


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
