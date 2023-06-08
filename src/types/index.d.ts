import { Express } from "express-serve-static-core";

interface IUser {
  _id: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user: IUser;
  }
}
