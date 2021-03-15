const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const moviesRoutes = require('./movies');
const usersRoutes = require('./users');
const { NotFound } = require('../errors');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/movies', auth, moviesRoutes);
router.use('/users', auth, usersRoutes);

router.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
