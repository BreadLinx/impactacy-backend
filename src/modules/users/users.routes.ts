import express from "express";
import checkAuth from "middlewares/auth";
import { getMe } from "modules/users/users.controller";
import { getUserById } from "modules/auth/user-controllers";

const router = express.Router();

router.get("/users/me", checkAuth, getMe);
router.patch("/users/me", checkAuth);
router.get("/users/:userId", getUserById);

export default router;
