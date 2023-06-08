import { badStatusCodes } from "errors/statusCodes/statusCodes";

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = badStatusCodes.BAD_REQUEST;
  }

  public statusCode: number;
}
