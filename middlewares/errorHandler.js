const { CelebrateError } = require('celebrate');

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError) {
    return res.status(400).send({
      message:
      err.details.get([...err.details.keys()][0]).details[0].message,
    });
  }

  if (err.code === 11000 && err.name === 'MongoError') {
    return res.status(409).send({ message: 'Такие данные уже зарегистрированы в базе' });
  }

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  res.status(500).send({ message: 'Произошла ошибка' });

  return next();
};

module.exports = ErrorHandler;
