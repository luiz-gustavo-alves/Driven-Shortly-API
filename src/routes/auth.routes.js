import { Router } from "express";

import { 
    signIn,
    signUp,
    logout
} from "../controllers/auth.controller.js";

import { 
    signInSchema,
    signUpSchema
} from "../schemas/auth.schema.js";

import { authValidation } from "../middlewares/authValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { dataSanitization } from "../middlewares/dataSanitization.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidation(signUpSchema), dataSanitization, signUp);
authRouter.post("/signin", schemaValidation(signInSchema), dataSanitization, signIn);
authRouter.post("/logout", authValidation, logout);

export default authRouter;