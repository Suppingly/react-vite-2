import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
import logger from './middlewares/loggerMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
export const prisma = new PrismaClient();


app.use(
  cors({
    origin: 'http://localhost:5173', // фронт, который будет обращаться к API
    credentials: true, // разрешаем отправку кук
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(logger);

app.use('/api/auth', authRoutes);




app.use(errorMiddleware);

export default app;
