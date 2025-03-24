import { Joi, validate } from "express-validation";

export const loginValidation = validate({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
})