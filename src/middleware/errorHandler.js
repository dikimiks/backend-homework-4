export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(404).json({
      message: 'Некорректный ID',
    });
  }

  res.status(500).json({
    message: 'Ошибка сервера',
  });
}