import { Joi, validate } from "express-validation";

export const loanApplicationValidation = validate({
  body: Joi.object({
    amount: Joi.number().required(),
    term_months: Joi.number().required(),
  }),
});

export const getLoanApplicationValidation = validate({
  params: Joi.object({
    id: Joi.string().required(),
  }),
});