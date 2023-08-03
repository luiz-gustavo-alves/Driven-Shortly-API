import { Router } from "express";

import {
    getUrlById,
    openShortUrl,
    createShortUrl,
    deleteUrlById
} from "../controllers/url.controller.js";

import { urlSchema } from "../schemas/url.schema.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { dataSanitization } from "../middlewares/dataSanitization.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", openShortUrl);
urlRouter.post("/urls/shorten", schemaValidation(urlSchema), dataSanitization, createShortUrl);
urlRouter.delete("/urls/:id", deleteUrlById);

export default urlRouter;