import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { tempCodes } from "modules/auth/auth.routes";
import { v4 as uuidv4 } from "uuid";
import User from "modules/users/entities/user.entity";
import { CreateUserDto } from "modules/auth/dto/create-user.dto";
import { SignInDto } from "modules/auth/dto/sign-in.dto";
import bcrypt from "bcrypt";
import { UnauthorizedError } from "errors/unauthorizedError";
import { getUserByIdWithPassword } from "modules/users/users.service";
import { BadRequestError } from "errors/badRequestError";
import dotenv from "dotenv";
dotenv.config();

const { FRONTEND_URL = "http://localhost:3000", AUTH_TOKEN_KEY = "secret" } =
  process.env;

export const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, name } = req.body.data;
    const password = await bcrypt.hash(req.body.data.password, 10);

    const newUser = (await User.create({ email, password, name })).toJSON();

    const accessToken = jwt.sign(
      {
        _id: newUser._id,
      },
      AUTH_TOKEN_KEY,
      { expiresIn: "30d" },
    );

    const { password: userPassword, ...userData } = newUser;

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json(userData);
  } catch (err) {
    next(err);
  }
};

export const signIn = async (
  req: Request<{}, {}, SignInDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body.data;

    const user = (await User.findOne({ email }).select("+password"))?.toJSON();

    if (!user?.password) {
      throw new UnauthorizedError(
        "Password is not set, try another authentication method you have registered initially with",
      );
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      throw new UnauthorizedError(
        "Incorrect login or password, please try again",
      );
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
      },
      AUTH_TOKEN_KEY,
      { expiresIn: "30d" },
    );

    const { password: userPassword, ...userData } = user;

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json(userData);
  } catch (err) {
    next(err);
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie("accessToken").json({ message: "Signed out successfully" });
  } catch (err) {
    next(err);
  }
};

export const googleCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "google",
    {
      failWithError: false,
      session: false,
    },
    (err, user, info, status) => {
      if (err?.message.startsWith("E11000 duplicate key error")) {
        return res.redirect(
          `${FRONTEND_URL}/login?error=Signing up failed, account already exist, try signing in instead`,
        );
      }

      if (!user) {
        return res.redirect(`${FRONTEND_URL}/login?error=${err.message}`);
      }

      const accessToken = jwt.sign(
        {
          _id: user._id,
        },
        AUTH_TOKEN_KEY,
        { expiresIn: "30d" },
      );

      const code = uuidv4();
      tempCodes.set(code, accessToken);

      res.redirect(`${FRONTEND_URL}/callback/auth?code=${code}`);
    },
  )(req, res, next);
};

export const linkGoogleCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "googleLink",
    {
      failWithError: false,
      session: false,
    },
    (err: any, user: any, info: any, status: any) => {
      if (!user) {
        return res.redirect(`${FRONTEND_URL}/login?error=${err.message}`);
      }

      console.log(user);

      res.redirect(`${FRONTEND_URL}/callback/link?code=${user._id}`);
    },
  )(req, res, next);
};

export const getAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { code } = req.query;
  if (!code) {
    return res.json({ success: false, message: "Code is required" });
  }

  const accessToken = tempCodes.get(code as string);
  tempCodes.delete(code as string);

  if (!accessToken) {
    return res.json({ success: false, message: "Code is invalid" });
  }

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json({ success: true, message: "Token was set successfully" });
};

export const setPassword = async (
  req: Request<{}, {}, { password: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user;
    const user = await getUserByIdWithPassword(_id);

    if (user?.password) {
      throw new BadRequestError("Password is already set");
    }

    const { password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(_id, {
      password: passwordHash,
    });

    res.json({ message: "Password was successfully set" });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (
  req: Request<{}, {}, { password: string; newPassword: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user;
    const { password, newPassword } = req.body;

    if (password === newPassword) {
      throw new BadRequestError("New password must be different");
    }

    const user = await getUserByIdWithPassword(_id);

    if (!user?.password) {
      throw new BadRequestError("Password is not set");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestError("Incorrect password");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(_id, { password: passwordHash });

    res.json({ message: "Password was successfully changed" });
  } catch (err) {
    next(err);
  }
};
