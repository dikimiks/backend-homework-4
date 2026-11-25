import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './src/middleware/logger.js';
import errorHandler from './src/middleware/errorHandler.js';
import usersRouter from './src/routes/users.js';
import booksRouter from './src/routes/books.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3005;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Подключение к MongoDB успешно');

    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Ошибка подключения к MongoDB:', err.message);
  });