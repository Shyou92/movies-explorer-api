const router = require('express').Router();
const controller = require('../controllers/movies');
const createMovieValidation = require('../middlewares/validators/createMovieValidation');
const objectIdValidation = require('../middlewares/validators/objectIdValidation');

router.get('/', controller.getSavedMoviesByUser); // obtaining all user's movies

router.post('/', createMovieValidation, controller.createMovie); // creating a movie

router.delete('/:movieId', objectIdValidation, controller.deleteMovie); // deleting a movie;

module.exports = router;
