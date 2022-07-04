import joi from "joi";

const bodySchema = joi.object({
  description: joi.string().required(),
  value: joi.number().required(),
  type: joi.string().valid("credit", "debit").required(),
});

export default bodySchema;
