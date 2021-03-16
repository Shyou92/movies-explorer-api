const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    year: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    image: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new Error('Ошибка. Введите URL');
      }
      return value;
    }),
    trailer: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new Error('Ошибка. Введите URL');
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new Error('Ошибка. Введите URL');
      }
      return value;
    }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
  }),
});

module.exports = createMovieValidation;
