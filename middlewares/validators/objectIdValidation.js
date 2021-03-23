const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const objectIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .custom((value) => {
        if (!ObjectId.isValid(value)) {
          throw new Error('Ошибка валидации. Передан неправильный Id');
        }
        return value;
      }),
  }),
});

module.exports = objectIdValidation;
