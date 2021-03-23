const Movie = require('../models/movie');
const { NotFound, Forbidden } = require('../errors');

const getSavedMoviesByUser = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильмов не найдено');
      }

      const newMovie = movie.map((item) => {
        const newMovieObj = {
          _id: item._id,
          country: item.country,
          director: item.director,
          duration: item.duration,
          year: item.year,
          description: item.description,
          image: item.image,
          trailer: item.trailer,
          thumbnail: item.thumbnail,
          movieId: item.movieId,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
        };

        return newMovieObj;
      });

      res.status(200).send(newMovie);
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
      const newMovie = {
        _id: movie._id,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };
      res.status(200).send(newMovie);
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

      const newData = {
        _id: data._id,
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailer,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      };

      res.status(200).send(newData);
    })
    .catch((err) => next(err));
};

module.exports = {
  getSavedMoviesByUser,
  createMovie,
  deleteMovie,
};
