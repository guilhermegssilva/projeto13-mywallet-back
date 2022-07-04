import joi from "joi";

const signUpSchema = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    repeat_password: joi.ref("password"),
  })
  .with("password", "repeat_password");

export default signUpSchema;
