import { Joi, validate } from "express-validation";

export const createCustomerValidation = validate({
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required().$,
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
    role: Joi.string().optional().valid('admin', 'customer').default('customer'),
  }),
});