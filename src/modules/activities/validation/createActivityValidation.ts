import { celebrate, Joi, Segments } from "celebrate";

export const createActivityValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(3).max(200),
    text: Joi.string().required().min(3).max(10000),
    likes: Joi.array().items(Joi.string().length(24).hex()),
    dislikes: Joi.array().items(Joi.string().length(24).hex()),
    promotions: Joi.array().items(Joi.string().length(24).hex()),
    createdAt: Joi.date(),
  }),
});
