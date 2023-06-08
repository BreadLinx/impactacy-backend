import { CreateAccountDto } from "modules/accounts/dto/create-account.dto";
import { CreateUserAndAccountDto } from "modules/accounts/dto/create-user-and-account.dto";
import { Request, Response, NextFunction } from "express";
import { mongooseConnection } from "app";
import Account from "modules/accounts/entities/account.entity";
import User from "modules/users/entities/user.entity";

export const create = async (
  req: Request<{}, {}, CreateAccountDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accountId, userId, email, name, image } = req.body;
  } catch (err: any) {
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

export const deleteAccount = async () => {};
