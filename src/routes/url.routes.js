import { Router } from "express";

import {
    getUrlById,
    openShortUrl,
    createShortUrl,
    deleteUrlById
} from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", openShortUrl);
urlRouter.post("/urls/shorten", createShortUrl);
urlRouter.delete("/urls/:id", deleteUrlById);

export default urlRouter;