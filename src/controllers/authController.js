import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "./../db.js";
import signUpSchema from "../schemas/signUpSchema.js";
import loginSchema from "../schemas/loginSchema.js";

export async function signUpUser(req, res) {
  try {
    const { body } = res.locals;
    const userRegistry = await db
      .collection("users")
      .findOne({ email: body.email });

    if (userRegistry) {
      return res.status(422).send("Já existe um usuário com este e-mail.");
    }

    const passwordHash = bcrypt.hashSync(body.password, 10);
    delete body.repeat_password;
    await db.collection("users").insertOne({ ...body, password: passwordHash });
    res.sendStatus(201);
  } catch (error) {
    console.log("Houve um erro!", error);
    if (error.isJoi === true) {
      return res.status(422).send(error.message);
    }
    res.sendStatus(500);
  }
}

export async function signInUser(req, res) {
  try {
    const { body } = res.locals;
    const user = await db.collection("users").findOne({ email: body.email });

    if (user && bcrypt.compareSync(body.password, user.password)) {
      const token = uuid();
      const userHasPreviousSession = await db
        .collection("sessions")
        .findOne({ userId: user._id });
      if (!userHasPreviousSession) {
        await db.collection("sessions").insertOne({ userId: user._id, token });
        res.send({ token, name: user.name });
      } else {
        const oldToken = userHasPreviousSession.token;
        res.send({ token: oldToken, name: user.name });
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log("Houve um erro!", error);
    if (error.isJoi === true) {
      return res.status(422).send(error.message);
    }
    res.sendStatus(500);
  }
}
