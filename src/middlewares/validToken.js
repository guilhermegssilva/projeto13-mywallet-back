import db from "../db.js";

import tokenSchema from "../schemas/tokenSchema.js";

export default async function validToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  const tokenValidation = tokenSchema.validate(token);

  if (tokenValidation.error) {
    return res.status(422).send("Token não válido!");
  }

  try {
    const session = await db
      .collection("sessions")
      .findOne({ token: tokenValidation.value });

    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ _id: session.userId });

    if (!user) {
      return res.status(401).send("Não existe um usuário para este token!");
    }

    res.locals.user = user;
  } catch (error) {
    return res.sendStatus(500);
  }

  next();
}
