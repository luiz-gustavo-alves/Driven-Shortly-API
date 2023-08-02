import { Router } from "express";

import { 
    signIn,
    signUp
} from "../controllers/auth.controller.js";

import { 
    signInSchema,
    signUpSchema
} from "../schemas/auth.schema.js";

import { schemaValidation } from "../middlewares/schemaValidation.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidation(signUpSchema), signUp);
authRouter.post("/signin", schemaValidation(signInSchema), signIn);

export default authRouter;