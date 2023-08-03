import { Router } from "express";

import {
    getUrlById,
    openShortUrl,
    createShortUrl,
    deleteUrlById
} from "../controllers/url.controller.js";

import { urlSchema } from "../schemas/url.schema.js";
import { authValidation } from "../middlewares/authValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { dataSanitization } from "../middlewares/dataSanitization.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", openShortUrl);
urlRouter.post("/urls/shorten", authValidation, schemaValidation(urlSchema), dataSanitization, createShortUrl);
urlRouter.delete("/urls/:id", authValidation, deleteUrlById);

export default urlRouter;