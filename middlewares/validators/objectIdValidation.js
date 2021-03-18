const { celebrate, Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');

const objectIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .custom((value) => {
        if (!isValidObjectId(value)) {
          throw new Error('Ошибка валидации. Передан неправильный Id');
        }
        return value;
      }),
  }),
});

module.exports = objectIdValidation;
