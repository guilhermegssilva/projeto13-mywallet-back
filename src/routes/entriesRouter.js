import { Router } from "express";

import {
  addNewEntry,
  getEntries,
  deleteEntry,
  updateEntry,
} from "../controllers/dataController.js";
import validToken from "../middlewares/validToken.js";
import validReqBody from "../middlewares/validReqBody.js";
import validEntryId from "../middlewares/validEntryId.js";

const entriesRouter = Router();

entriesRouter.use(validToken);

entriesRouter.post("/entry", validReqBody, addNewEntry);

entriesRouter.get("/entry", getEntries);

entriesRouter.delete("/entry/:entryId", validEntryId, deleteEntry);

entriesRouter.put("/entry/:entryId", validEntryId, validReqBody, updateEntry);

export default entriesRouter;
