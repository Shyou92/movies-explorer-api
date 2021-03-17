const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const objectIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .custom((value) => {
        if (!validator(value)) {
          throw new Error('Ошибка валидации. Передан неправильный Id');
        }
        return value;
      }),
  }),
});

module.exports = objectIdValidation;
