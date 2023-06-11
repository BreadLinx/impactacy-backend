import express from "express";
import checkAuth from "middlewares/auth";
import { getMe, getUsersPassword } from "modules/users/users.controller";
import { getUserById } from "modules/auth/user-controllers";

const router = express.Router();

router.get("/users/me", checkAuth, getMe);
router.patch("/users/me", checkAuth);
router.get("/users/:userId", getUserById);
router.get("/users/me/password", checkAuth, getUsersPassword);
router.patch("/users/me/password", checkAuth);

export default router;
