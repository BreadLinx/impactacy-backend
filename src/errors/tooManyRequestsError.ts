import { badStatusCodes } from "errors/statusCodes/statusCodes";

export class TooManyRequestsError extends Error {
  constructor() {
    super();
    this.statusCode = badStatusCodes.TOO_MANY_REQUESTS;
    this.message = "Too many requests";
  }

  public statusCode: number;
  public message: string;
}
