const Joi = require('joi');

module.exports = {
  body: {
    histories: Joi.array().items(Joi.string()),
    squires: Joi.array(),
    xIsNext: Joi.boolean(),
  },
};
