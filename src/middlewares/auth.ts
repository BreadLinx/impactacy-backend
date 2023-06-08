import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { UnauthorizedError } from "errors/unauthorizedError";
import dotenv from "dotenv";
dotenv.config();

const { AUTH_TOKEN_KEY = "secret" } = process.env;

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization && !req.cookies["accessToken"]) {
      throw new UnauthorizedError();
    }

    if (req.headers.authorization) {
      const authToken = (req.headers.authorization || "").split(" ")[1];

      const payload = jwt.verify(authToken, AUTH_TOKEN_KEY) as {
        _id: string;
      };

      req.user = { _id: payload._id };

      return next();
    }

    if (req.cookies["accessToken"]) {
      const authToken = req.cookies["accessToken"];

      const payload = jwt.verify(authToken, AUTH_TOKEN_KEY) as {
        _id: string;
      };

      req.user = { _id: payload._id };

      return next();
    }
  } catch (err: any) {
    if (err.name === "JsonWebTokenError") {
      throw new UnauthorizedError("Invalid token");
    }
    next(err);
  }
};

export default checkAuth;
