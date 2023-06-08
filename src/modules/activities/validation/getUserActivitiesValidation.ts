import { celebrate, Joi, Segments } from "celebrate";

export const getUserActivitiesValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    profileId: Joi.string().length(24).hex().required(),
  }),
});
