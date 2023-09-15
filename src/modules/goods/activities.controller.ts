import { Request, Response, NextFunction } from "express";
import Activity from "modules/activities/entities/activity-model";
import { NotFoundError } from "errors/notFoundError";
import { BadRequestError } from "errors/badRequestError";
import { ActivityDoc } from "modules/activities/entities/activity-model";

export const getActivities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .populate("owner");

    res.json({ success: true, data: activities });
  } catch (err: any) {
    next(err);
  }
};

export const getUserActivities = async (
  req: Request<{ profileId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { profileId } = req.params;

    const activities = await Activity.find({ owner: profileId })
      .sort({ createdAt: -1 })
      .populate("owner");

    res.json({ success: true, data: activities });
  } catch (err: any) {
    next(err);
  }
};

export const getActivityById = async (
  req: Request<{ activityId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { activityId } = req.params;
    const activity = await Activity.findById(activityId).populate("owner");

    if (!activity) {
      throw new NotFoundError("Activity not found");
    }

    res.json({ success: true, data: activity });
  } catch (err: any) {
    next(err);
  }
};

export const createActivity = async (
  req: Request<{}, {}, ActivityDoc>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id: userId } = req.user as { _id: string };

    const newActivity = await Activity.create({
      ...req.body,
      owner: userId,
    });

    const fullActivity = await Activity.findById(newActivity._id).populate(
      "owner",
    );

    res.json({ success: true, data: fullActivity });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError(err.message));
    }
    next(err);
  }
};

export const putLike = async (
  req: Request<{ activityId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { activityId } = req.params;
    const { _id } = req.user;

    const deleteDislikeResult = await Activity.findByIdAndUpdate(
      activityId,
      { $pull: { dislikes: _id } },
      { new: true },
    );

    if (!deleteDislikeResult) {
      throw new NotFoundError("Card not found");
    }

    const putLikeResult = await Activity.findByIdAndUpdate(
      activityId,
      { $addToSet: { likes: _id } },
      { new: true },
    );

    if (!putLikeResult) {
      throw new NotFoundError("Card not found");
    }

    res.json({ success: true, data: putLikeResult });
  } catch (err: any) {
    next(err);
  }
};

export const deleteLike = async (
  req: Request<{ activityId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { activityId } = req.params;
    const { _id } = req.user;

    const deleteLikeResult = await Activity.findByIdAndUpdate(
      activityId,
      { $pull: { likes: _id } },
      { new: true },
    );

    if (!deleteLikeResult) {
      throw new NotFoundError("Card not found");
    }

    res.json({ success: true, data: deleteLikeResult });
  } catch (err: any) {
    next(err);
  }
};

export const putDislike = async (
  req: Request<{ activityId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { activityId } = req.params;
    const { _id } = req.user;

    const deleteLikeResult = await Activity.findByIdAndUpdate(
      activityId,
      { $pull: { likes: _id } },
      { new: true },
    );

    if (!deleteLikeResult) {
      throw new NotFoundError("Card not found");
    }

    const putDislikeResult = await Activity.findByIdAndUpdate(
      activityId,
      { $addToSet: { dislikes: _id } },
      { new: true },
    );

    if (!putDislikeResult) {
      throw new NotFoundError("Card not found");
    }

    res.json({ success: true, data: putDislikeResult });
  } catch (err: any) {
    next(err);
  }
};

export const deleteDislike = async (
  req: Request<{ activityId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { activityId } = req.params;
    const { _id } = req.user;

    const deleteDislikeResult = await Activity.findByIdAndUpdate(
      activityId,
      { $pull: { dislikes: _id } },
      { new: true },
    );

    if (!deleteDislikeResult) {
      throw new NotFoundError("Card not found");
    }

    res.json({ success: true, data: deleteDislikeResult });
  } catch (err: any) {
    next(err);
  }
};
