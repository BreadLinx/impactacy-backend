import express, { Request, Response } from "express";
import {
  getActivities,
  getActivityById,
  createActivity,
  getUserActivities,
  putLike,
  deleteLike,
  putDislike,
  deleteDislike,
} from "modules/activities/activities.controller";
import { getActivityByIdValidation } from "modules/activities/validation/getActivityByIdValidation";
import { createActivityValidation } from "modules/activities/validation/createActivityValidation";
import { getUserActivitiesValidation } from "modules/activities/validation/getUserActivitiesValidation";

import { putLikeValidation } from "modules/activities/validation/putLikeValidation";
import { deleteLikeValidation } from "modules/activities/validation/deleteLikeValidation";

import { putDislikeValidation } from "modules/activities/validation/putDislikeValidation";
import { deleteDislikeValidation } from "modules/activities/validation/deleteDislikeValidation";

import checkAuth from "middlewares/auth";

const router = express.Router();

router.get("/activities", getActivities);
router.get(
  "/activities/:activityId",
  getActivityByIdValidation,
  getActivityById,
);
router.get(
  "/user-activities/:profileId",
  getUserActivitiesValidation,
  getUserActivities,
);

router.put(
  "/activities/:activityId/likes",
  checkAuth,
  putLikeValidation,
  putLike,
);
router.delete(
  "/activities/:activityId/likes",
  checkAuth,
  deleteLikeValidation,
  deleteLike,
);

router.put(
  "/activities/:activityId/dislikes",
  checkAuth,
  putDislikeValidation,
  putDislike,
);
router.delete(
  "/activities/:activityId/dislikes",
  checkAuth,
  deleteDislikeValidation,
  deleteDislike,
);

router.post("/activities", checkAuth, createActivityValidation, createActivity);

router.delete("/activities/:activityId");

export default router;
