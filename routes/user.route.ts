import express from "express";
import {
    getAllUsers,
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

const router = express.Router();

router.get("/", Authenticate, getAllUsers);

// router.get("/add/wesam", addWesam);
// router.get("/add/ahmad", addAhmad);

router.post(
    "/register",
    upload.single("profilePic"),
    register,
    registerEmail,
    registerSuccess,
);

router.post("/login", login, tokenGeneration);

export default router;
