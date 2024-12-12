const Joi = require("joi");

// const createUserScheme = Joi.object({
//     nama: Joi.string().min(3).max(10).required(),
//     no_hp: Joi.string().min(3).max(10).required(),
//     no_rek: Joi.string().min(3).max(10).required(),
//   });

const createUserScheme = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(3).max(10).required(),
  });

module.exports = createUserScheme