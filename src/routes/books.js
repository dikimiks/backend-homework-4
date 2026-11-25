import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Получить все книги
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// Получить книгу по ID
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
});

// Создать книгу
router.post('/', async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// Обновить книгу
router.put('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
});

// Удалить книгу
router.delete('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }

    res.json({ message: 'Книга удалена' });
  } catch (err) {
    next(err);
  }
});

export default router;