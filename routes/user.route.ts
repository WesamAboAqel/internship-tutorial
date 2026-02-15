import express from "express";
import {
    getAllUsers,
    login,
    register,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);

// router.get("/add/wesam", addWesam);
// router.get("/add/ahmad", addAhmad);

router.post("/register", register);

router.post("/login", login);

export default router;
