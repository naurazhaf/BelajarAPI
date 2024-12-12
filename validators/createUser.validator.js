const Joi = require("joi");

// const createUserScheme = Joi.object({
//     nama: Joi.string().min(3).max(10).required(),
//     no_hp: Joi.string().min(3).max(10).required(),
//     no_rek: Joi.string().min(3).max(10).required(),
//   });

const createUserScheme = Joi.object({
    fullname: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).max(100).required(),
    username: Joi.string().min(3).max(100).required()
  });

module.exports = createUserScheme