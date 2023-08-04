import Joi from "joi";

export const urlSchema = Joi.object({
    url: Joi.string().uri().max(2048).required()
});