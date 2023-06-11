import { Request, Response, NextFunction } from "express";
import {
  getUserById,
  getUsersPasswordStatus,
} from "modules/users/users.service";

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

export const getUsersPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const passwordStatus = await getUsersPasswordStatus(req.user._id);

    res.json({ password: passwordStatus });
  } catch (err) {
    next(err);
  }
};

export const setMyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const updateMyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (err) {
    next(err);
  }
};
