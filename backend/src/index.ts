import express, { Response, Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env?.['PORT'] ?? '3000');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/ping', (req: Request, res: Response) => {
  res.json({ pong: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
