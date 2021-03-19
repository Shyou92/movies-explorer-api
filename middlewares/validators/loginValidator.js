const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .custom((value) => {
        if (!validator.isEmail(value)) {
          return new Error('Невалидный email');
        }
        return value;
      }),
    password: Joi.string().required().min(8).messages({
      'string.min': 'Пароль должен быть длиной минимум в 8 символов',
      'any.required': 'Обязательное поле',
    }),
  }),
});

module.exports = loginValidation;
