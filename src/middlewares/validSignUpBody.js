import signUpSchema from "../schemas/signUpSchema.js";
import { stripHtml } from "string-strip-html";

export default async function validSignUpBody(req, res, next) {
  const { name, email, password, repeat_password } = req.body;
  const signUpBody = {
    name: stripHtml(name).result.trim(),
    email: stripHtml(email).result.trim(),
    password: stripHtml(password).result.trim(),
    repeat_password: stripHtml(repeat_password).result.trim(),
  };
  try {
    const userInfoValidation = await signUpSchema.validateAsync(signUpBody);
    res.locals.body = userInfoValidation;
  } catch (error) {
    console.log(error);
    return res.status(422).send(error.message);
  }

  next();
}
