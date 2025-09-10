import express, { Response, Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './routes/user';

dotenv.config();

const PORT: number = parseInt(process.env?.['PORT'] ?? '3000');

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://cost-tracker-ten.vercel.app'];

app.use(
  cors({
    origin: allowedOrigins,
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
