const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'dae30aa901d151753b4412de0388851c443b36835922cf7f50b95abda195af1b');
    req.user = payload;
    console.log(req.user)
  } catch(err) {
    throw new Forbidden('Необходима авторизация');
  }
  req.user = payload;

  next();
};