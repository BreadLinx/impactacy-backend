import { badStatusCodes } from "errors/statusCodes/statusCodes";

export class UnavaibleForLegalError extends Error {
  constructor() {
    super();
    this.statusCode = badStatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS;
    this.message = "Resource unavaible for legal reasons";
  }

  public statusCode: number;
  public message: string;
}
