import express from "express";
import { Authenticate } from "../middleware/authentication.middleware.js";
import {
    getPostsByUserId,
    updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/user/:user_id", Authenticate, getPostsByUserId);

router.put("/", Authenticate, updatePost);

export default router;
