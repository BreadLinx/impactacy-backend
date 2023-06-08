import { badStatusCodes } from "errors/statusCodes/statusCodes";

export class ForbiddenError extends Error {
  constructor() {
    super();
    this.statusCode = badStatusCodes.FORBIDDEN;
    this.message = "You do not have required permissions";
  }

  public statusCode: number;
  public message: string;
}
