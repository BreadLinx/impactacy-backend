import { Request, Response, NextFunction } from "express";
import { getUserById } from "modules/users/users.service";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUserById(req.user._id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
