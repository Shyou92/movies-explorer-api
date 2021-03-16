const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isEmail(value)) {
          throw new Error('Ошибка валидации. Введите правильный URL');
        }
        return value;
      }),
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Имя должно содержать хотя бы два символа',
        'string.max': 'Имя должно содержать не более 30 символов',
        'any.required': 'Обязательное поле',
      }),
  }),
});

module.exports = updateUserValidation;
