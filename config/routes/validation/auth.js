const Joi = require("joi");

module.exports = {
  authenticate: {
    body: {
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
    }
  }
};
