const Joi = require('joi');

const validateUser = (user, isUpdate = false) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).when('$isUpdate', { is: true, then: Joi.optional(), otherwise: Joi.required() }),
    email: Joi.string().email().when('$isUpdate', { is: true, then: Joi.optional(), otherwise: Joi.required() }),
    password: Joi.string().min(6).when('$isUpdate', { is: true, then: Joi.optional(), otherwise: Joi.required() }),
  });

  return schema.validate(user, { context: { isUpdate } });
};

module.exports = { validateUser };
