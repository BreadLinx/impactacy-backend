import { badStatusCodes } from "errors/statusCodes/statusCodes";

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super();
    this.statusCode = badStatusCodes.UNAUTHORIZED;
    this.message = message || "Authorization required";
  }

  public statusCode: number;
  public message: string;
}
