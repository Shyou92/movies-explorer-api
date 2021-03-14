const Movie = require('../models/movie');
const { NotFound, BadRequest, Forbidden } = require('../errors');

const getSavedMoviesByUser = (req, res, next) => {
  Movie.find({})
  .then((movie) => {
    if (!movie) {
      throw new NotFound('Фильмов не найдено');
    }

    res.status(200).send(movie);
  })
  .catch((err) => {
    next(err);
  });
};

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN } = req.body;
  res.setHeader('Content-Type', 'application/json');
  Movie.create({ country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN, _id: req.user._id })
  .then((movie) => {
    console.log(movie);
    if (!movie) {
      throw new BadRequest('Введите корректные данные');
    }
    res.status(200).send(movie);
  })
  .catch((err) => {
    next(err);
  });
};

module.exports = {
  getSavedMoviesByUser,
  createMovie,
}