import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().max(64).required(),
    email: Joi.string().max(128).required(),
    password: Joi.string().max(256).required(),
    confirmPassword: Joi.string().max(256).required()
});

export const signInSchema = Joi.object({
    email: Joi.string().max(128).required(),
    password: Joi.string().max(256).required()
});