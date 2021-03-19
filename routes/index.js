const router = require('express').Router();
const createUserValidation = require('../middlewares/validators/createUserValidation');
const loginValidation = require('../middlewares/validators/loginValidator');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const moviesRoutes = require('./movies');
const usersRoutes = require('./users');
const { NotFound } = require('../errors');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/movies', auth, moviesRoutes);
router.use('/users', auth, usersRoutes);

router.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
