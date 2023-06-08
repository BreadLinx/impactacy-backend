import { badStatusCodes } from "errors/statusCodes/statusCodes";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = badStatusCodes.NOT_FOUND;
  }

  public statusCode: number;
}
