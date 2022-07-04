import { ObjectId } from "mongodb";
import db from "../db.js";

export default async function validEntryId(req, res, next) {
  const { entryId } = req.params;
  const { user } = res.locals;
  try {
    const entry = await db
      .collection("data")
      .findOne({ _id: new ObjectId(entryId) });

    if (!entry) {
      return res.status(401).send("Não existe entrada para este id!");
    }

    if (entry.userId.toString() !== user._id.toString()) {
      return res.status(401).send("Este usuário não pertence a este entrada!");
    }

    res.locals.entry = entry;
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
  next();
}
