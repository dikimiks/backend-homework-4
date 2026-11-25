import express from 'express';
import User from '../models/User.js';
import Book from '../models/Book.js';

const router = express.Router();

// Получить всех пользователей
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Получить пользователя по ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Создать пользователя
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Выдать книгу пользователю
router.post('/:id/books/:bookId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const book = await Book.findById(req.params.bookId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }

    if (user.books.includes(book._id)) {
      return res.status(400).json({ message: 'Книга уже выдана пользователю' });
    }

    user.books.push(book._id);
    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Вернуть книгу
router.delete('/:id/books/:bookId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const bookIndex = user.books.indexOf(req.params.bookId);

    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Книга не выдана этому пользователю' });
    }

    user.books.splice(bookIndex, 1);
    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Обновить пользователя
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Удалить пользователя
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ message: 'Пользователь удалён' });
  } catch (err) {
    next(err);
  }
});

export default router;