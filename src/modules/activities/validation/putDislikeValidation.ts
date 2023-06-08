import { celebrate, Joi, Segments } from "celebrate";

export const putDislikeValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    activityId: Joi.string().length(24).hex().required(),
  }),
});