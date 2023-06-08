import { badStatusCodes } from "errors/statusCodes/statusCodes";

export class NotAllowedMethodError extends Error {
  constructor() {
    super();
    this.statusCode = badStatusCodes.METHOD_NOT_ALLOWED;
    this.message = "Method not allowed";
  }

  public statusCode: number;
  public message: string;
}
