import { Router } from "express";

import {
    getUserPage,
    getRanking
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get("/users/me", getUserPage);
userRouter.get("/ranking", getRanking);

export default userRouter;