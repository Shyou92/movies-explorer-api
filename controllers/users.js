const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFound, BadRequest, Unauthorized } = require('../errors');

const getCurrentUser = (req, res, next) => {
  console.log(req);
  User.find(req.user._id)
  .then((user) => {
    console.log(user)
    if (!user) {
      throw new NotFound('Нет пользователя с таким id');
    }

    return res.status(200).send(user);
  })
  .catch((err) => {
    next(err);
  });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  res.setHeader('Content-Type', 'application/json');

  bcrypt.hash(password, 10)
  .then((hash) => User.create({
    name, email, password: hash,
  }))
  .then((user) => {
    if (!user) {
      throw new BadRequest('Введите корректные данные');
    }
    const newUser = {
      name: user.name,
      _id: user._id,
      email: user.email,
    };
    res.send({data: newUser});
  })
  .catch(err => {
    next(err);
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
  .then((user) => {
    if(!user) {
      throw new Unauthorized('Неправильные почта или пароль');
    }

    const token = jwt.sign({ _id: user._id }, 'dae30aa901d151753b4412de0388851c443b36835922cf7f50b95abda195af1b', { expiresIn: '1d' } );

    res.send(token);
  })
  .catch(err => next(err));
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
}