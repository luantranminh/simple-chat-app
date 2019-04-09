const Joi = require("joi");

module.exports = {
  load: {
    params: {
      userId: Joi.number()
        .integer()
        .min(1)
        .required()
    }
  },

  create: {
    body: Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .error(new Error("Invalid username")),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
        .error(new Error("Invalid password"))
    })
  },

  update: {
    body: Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
    })
  }
};
