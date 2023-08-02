import Joi from "joi";

export const urlSchema = Joi.object({
    url: Joi.string().max(2048).required()
});