import { Router } from "express";

import {
    getUserPage,
    getRanking
} from '../controllers/user.controller.js';

import { authValidation } from "../middlewares/authValidation.js";

const userRouter = Router();

userRouter.get("/users/me", authValidation, getUserPage);
userRouter.get("/ranking", getRanking);

export default userRouter;