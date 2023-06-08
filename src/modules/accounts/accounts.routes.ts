import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import checkAuth from "middlewares/auth";
import {
  deleteAccount,
  getAccounts,
  patchMyAccount,
} from "modules/accounts/accounts.controller";
dotenv.config();

export const tempCodes = new Map<string, string>();

const router = express.Router();

router.get("/accounts/me", checkAuth, getAccounts);

router.patch("/accounts/:accountId", checkAuth, patchMyAccount);

router.delete("/accounts/:accountId", checkAuth, deleteAccount);

export default router;
