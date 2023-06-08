import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { NotFoundError } from "errors/notFoundError";
import handleErrors from "middlewares/handleErrors";
import { errors } from "celebrate";

import AuthRoutes from "modules/auth/auth.routes";
import ActivityRoutes from "modules/activities/activities.routes";
import UsersRoutes from "modules/users/users.routes";

import { googleStrategy } from "modules/passport/strategies/google-strategy";

dotenv.config();

const {
  SERVER_PORT = 5000,
  DATABASE_URL = "mongodb://Platons-OMEN:27017/impactacy?replicaSet=rs",
  FRONTEND_URL = "http://localhost:3000",
} = process.env;

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
  }),
);

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("DB ok"))
  .catch((err: Error | null) => console.log("DB error", err));

export const mongooseConnection = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
passport.use(googleStrategy);

app.use(AuthRoutes);
app.use(ActivityRoutes);
app.use(UsersRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Requested resource was not found"));
});

app.use(errors());
app.use(handleErrors);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
