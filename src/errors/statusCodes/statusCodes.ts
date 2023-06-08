export enum fineStatusCodes {
  OK = 200,
  CREATED = 201,
}

export enum badStatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401, // no auth at all
  FORBIDDEN = 403, // no required permissions
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  INTERNAL_SERVER_ERROR = 500,
}
