const { CelebrateError } = require('celebrate');
const { Conflict } = require('../errors');

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError) {
    return res.status(400).send(err.details.get('body'));
  }

  if (err.code === 11000) {
    throw new Conflict('Такие данные уже зарегистрированы в базе');
  }

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  res.status(500).send({ message: err.message });

  return next();
};

module.exports = ErrorHandler;
