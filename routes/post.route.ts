import express from "express";
import { Authenticate } from "../middleware/authentication.middleware.js";
import {
    getPostsByUserId,
    updatePost,
} from "../controllers/post.controller.js";
import { getPostComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/user/:user_id", Authenticate, getPostsByUserId);

router.put("/", Authenticate, updatePost);

router.get("/comments/:post_id", Authenticate, getPostComments);

export default router;
