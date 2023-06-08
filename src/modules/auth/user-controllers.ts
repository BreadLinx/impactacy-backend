import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import UserModel, { UserDoc } from "modules/users/entities/user.entity";
import jwt from "jsonwebtoken";

const { AUTH_TOKEN_KEY = "secret" } = process.env;

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = (
      await UserModel.findOne({ email }).select("+password")
    )?.toJSON();

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const newUser = (await UserModel.create({ email, password })).toJSON();

      const authToken = jwt.sign(
        {
          _id: newUser._id,
        },
        AUTH_TOKEN_KEY,
        { expiresIn: "30d" },
      );

      const { password: userPassword, ...userData } = newUser;

      return res.json({ success: true, data: userData, token: authToken });
    }

    if (!user.password) {
      return res.json({
        success: false,
        message:
          "Пароль не задан, попробуйте авторизацию через стороние сервисы, пароль можно будет задать в личном кабинете после авторизации",
      });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.json({ success: false, message: "Неверный пароль" });
    }

    const authToken = jwt.sign(
      {
        _id: user._id,
      },
      AUTH_TOKEN_KEY,
      { expiresIn: "30d" },
    );

    const { password: userPassword, ...userData } = user;

    res.json({ success: true, data: userData, token: authToken });
  } catch (err: any) {
    next(err);
  }
};

export const getUserById = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  if (userId.length !== 24) {
    return res.status(400).json({ success: false, message: "Incorrect id" });
  }
  const user = (await UserModel.findById(userId))?.toJSON();

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const { password, emailVerified, email, ...userData } = user;
  res.json({ success: true, data: userData });
};
