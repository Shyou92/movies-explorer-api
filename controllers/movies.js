const Movie = require('../models/movie');
const { NotFound, BadRequest, Forbidden } = require('../errors');

const getSavedMoviesByUser = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
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
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  res.setHeader('Content-Type', 'application/json');
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadRequest('Введите корректные данные');
      }
      res.status(200).send(movie);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndDelete(movieId)
    .then((data) => {
      if (!data) {
        throw new NotFound('Такого фильма не существует');
      }
      if (data.owner.toString() !== req.user._id) {
        throw new Forbidden('Нет доступа к этому фильму');
      }

      res.status(200).send(data);
    })
    .catch((err) => next(err));
};

module.exports = {
  getSavedMoviesByUser,
  createMovie,
  deleteMovie,
};
