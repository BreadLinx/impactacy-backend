import { badStatusCodes } from "errors/statusCodes/statusCodes";

export class ConflictError extends Error {
  constructor(message?: string) {
    super();
    this.statusCode = badStatusCodes.CONFLICT;
    this.message = message || "Conflict with the current state of the resource";
  }

  public statusCode: number;
  public message: string;
}
