import { CreateAccountDto } from "modules/accounts/dto/create-account.dto";
import { CreateUserAndAccountDto } from "modules/accounts/dto/create-user-and-account.dto";
import { Request, Response, NextFunction } from "express";
import { mongooseConnection } from "app";
import Account from "modules/accounts/entities/account.entity";
import User from "modules/users/entities/user.entity";
import { NotFoundError } from "errors/notFoundError";
import { ForbiddenError } from "errors/forbiddenError";
import { ObjectId } from "mongoose";

export const create = async (
  req: Request<{}, {}, CreateAccountDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const createUserAndAccount = async (
  req: Request<{}, {}, CreateUserAndAccountDto>,
  res: Response,
  next: NextFunction,
) => {
  const session = await mongooseConnection.startSession();

  try {
    session.startTransaction();

    const { accountId, type, email, name, image } = req.body;

    const newUser = await User.create([{ email, name, image }], {
      session,
    });

    const newAccount = await Account.create(
      [{ accountId, type, userId: newUser, email }],
      { session },
    );

    await session.commitTransaction();

    res.json({ success: true, data: { newAccount, newUser } });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  }

  session.endSession();
};

export const getAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user;

    const accounts = await Account.find({ userId: _id });

    res.json(accounts);
  } catch (err) {
    next(err);
  }
};

export const patchMyAccount = async (
  req: Request<{ accountId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user;
    const { accountId } = req.params;

    const account = await Account.findByIdAndUpdate(accountId, { userId: _id });
    console.log(account);

    res.json(account);
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (
  req: Request<{ accountId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user;
    const { accountId } = req.params;

    const account = (await Account.findById(accountId))?.toJSON();

    if (!account) {
      throw new NotFoundError("Account not found");
    }

    if (account.userId.toString() !== _id) {
      throw new ForbiddenError();
    }

    const result = await Account.findByIdAndDelete(accountId);

    res.json(result);
  } catch (err) {
    next(err);
  }
};
