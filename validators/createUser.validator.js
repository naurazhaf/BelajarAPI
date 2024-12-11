const Joi = require("joi");

const createUserScheme = Joi.object({
    nama: Joi.string().min(3).max(10).required(),
    no_hp: Joi.string().min(3).max(10).required(),
    no_rek: Joi.string().min(3).max(10).required(),
  });

module.exports = createUserScheme