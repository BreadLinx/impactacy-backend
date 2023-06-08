import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import {
  googleCallback,
  getAccessToken,
  createUser,
  signIn,
  signOut,
} from "modules/auth/auth.controller";
import checkAuth from "middlewares/auth";
dotenv.config();

export const tempCodes = new Map<string, string>();

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", signIn);
router.post("/signout", checkAuth, signOut);

router.get(
  "/signin/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);

router.get("/callback/google", googleCallback);

router.get("/auth/token", getAccessToken);

export default router;
