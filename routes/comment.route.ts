import express from "express";
import {
    createComment,
    getCommentsForUser,
    getThreadedComments,
} from "../controllers/comment.controller.js";
import { Authenticate } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.post("/", Authenticate, createComment);

router.get("/user", Authenticate, getCommentsForUser);

router.get("/threaded/:comment_id", Authenticate, getThreadedComments);

export default router;
