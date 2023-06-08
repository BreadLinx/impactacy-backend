import { Request, Response, NextFunction } from "express";
import { badStatusCodes } from "errors/statusCodes/statusCodes";

interface ErrorWithStatusCode extends Error {
  statusCode: number;
  authError: never;
}

interface AuthError extends Error {
  statusCode: number;
  authError: boolean;
}

const handleErrors = (
  err: ErrorWithStatusCode | AuthError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = badStatusCodes.INTERNAL_SERVER_ERROR, message } = err;

  const errorMessage =
    statusCode === badStatusCodes.INTERNAL_SERVER_ERROR
      ? "There was an error on the server"
      : message;

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default handleErrors;
