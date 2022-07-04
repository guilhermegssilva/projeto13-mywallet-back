import dayjs from "dayjs";

import db from "../db.js";

export async function addNewEntry(req, res) {
  try {
    const { user, body } = res.locals;
    const { value, description, type } = body;

    await db.collection("data").insertOne({
      value,
      description,
      type,
      date: dayjs().format("DD/MM"),
      userId: user._id,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getEntries(req, res) {
  try {
    const { user } = res.locals;
    const entries = await db
      .collection("data")
      .find({ userId: user._id })
      .toArray();
    const formatedEntries = entries.map((entry) => {
      delete entry.userId;
      return entry;
    });
    res.status(200).send(formatedEntries);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteEntry(req, res) {
  try {
    const { entry } = res.locals;
    await db.collection("data").deleteOne({ _id: entry._id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateEntry(req, res) {
  try {
    const { entry, body } = res.locals;
    await db.collection("data").updateOne({ _id: entry._id }, { $set: body });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
