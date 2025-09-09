import express, { Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env?.['PORT'] ?? '3000');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (_, res: Response) => {
  res.json({ pong: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
