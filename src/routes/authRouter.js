import { Router } from "express";

import { signInUser, signUpUser } from "../controllers/authController.js";
import validLoginBody from "../middlewares/validLoginBody.js";
import validSignUpBody from "../middlewares/validSignUpBody.js";

const authRouter = Router();

authRouter.post("/sign-up", validSignUpBody, signUpUser);

authRouter.post("/sign-in", validLoginBody, signInUser);

export default authRouter;
