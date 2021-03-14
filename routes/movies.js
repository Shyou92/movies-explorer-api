const router = require('express').Router();
const controller = require('../controllers/movies');

router.get('/', controller.getSavedMoviesByUser); // obtaining all user's movies

router.post('/', controller.createMovie); // creating a movie

router.delete('/:movieId', controller.deleteMovie); // deleting a movie;

module.exports = router;