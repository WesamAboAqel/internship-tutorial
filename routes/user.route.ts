import express from "express";
import {
    getAllUsers,
    ifAdmin,
    login,
    register,
} from "../controllers/user.controller.js";
import {
    Authenticate,
    tokenGeneration,
} from "../middleware/authentication.middleware.js";
import { registerEmail } from "../utils/mail.utils.js";
import { registerSuccess } from "../middleware/utils.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import {
    generateTokens,
    refreshTokens,
    sendTokens,
} from "../controllers/session.controller.js";

const router = express.Router();

router.get("/", Authenticate, ifAdmin, getAllUsers);

router.post(
    "/register",
    upload.single("profilePic"),
    register,
    registerEmail,
    registerSuccess,
);

router.post("/login", login, generateTokens, sendTokens);

router.post("/refresh", refreshTokens, sendTokens);

export default router;
