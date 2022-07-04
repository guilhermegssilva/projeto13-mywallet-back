import bodySchema from "../schemas/bodySchema.js";
import { stripHtml } from "string-strip-html";

export default async function validReqBody(req, res, next) {
  const reqBody = {
    ...req.body,
    description: stripHtml(req.body.description).result.trim(),
  };
  try {
    const bodyValidation = await bodySchema.validateAsync(reqBody);
    res.locals.body = bodyValidation;
  } catch (error) {
    return res.status(422).send(error.message);
  }

  next();
}
