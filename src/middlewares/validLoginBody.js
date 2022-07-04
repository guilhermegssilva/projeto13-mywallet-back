import loginSchema from "../schemas/loginSchema.js";
import { stripHtml } from "string-strip-html";

export default async function validLoginBody(req, res, next) {
  const { email, password } = req.body;
  const loginBody = {
    email: stripHtml(email).result.trim(),
    password: stripHtml(password).result.trim(),
  };
  try {
    const loginValidation = await loginSchema.validateAsync(loginBody);
    res.locals.body = loginValidation;
  } catch (error) {
    console.log(error);
    return res.status(422).send(error.message);
  }

  next();
}
