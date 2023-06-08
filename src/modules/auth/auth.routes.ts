import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import dotenv from "dotenv";
import {
  googleCallback,
  getAccessToken,
  createUser,
  signIn,
  signOut,
  linkGoogleCallback,
} from "modules/auth/auth.controller";
import checkAuth from "middlewares/auth";
import {
  googleStrategy,
  linkGoogleStrategy,
} from "modules/passport/strategies/google-strategy";
dotenv.config();

export const tempCodes = new Map<string, string>();

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", signIn);
router.post("/signout", checkAuth, signOut);

router.get(
  "/signin/google",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(googleStrategy)(req, res, next);
  },
);

router.get("/callback/google", googleCallback);

router.get(
  "/link/google",
  checkAuth,
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(linkGoogleStrategy)(req, res, next);
  },
);

router.get("/callback/link/google", linkGoogleCallback);

router.get("/auth/token", getAccessToken);

export default router;
