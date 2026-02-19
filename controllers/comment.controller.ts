import { Request, Response, NextFunction } from "express";
import {
    addComment,
    getChildComments,
    getCommentsByUserId,
    selectPostComment,
} from "../repository/comment.repository.js";
import { ICommentInit, JCommentInit } from "../models/comment.model.js";
import { AppError } from "../utils/Error.utils.js";

// @desc    Create Comment
// @route   POST /api/posts/
// @access  Private
export const createComment = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { content, post_id, parent_id } = request.body;

        const params: ICommentInit = {
            content,
            user_id: response.locals.payload.user_id,
            post_id,
            parent_id: parent_id ?? null,
        };

        const { error } = JCommentInit.validate(params);

        if (error) {
            throw new AppError("Invalid Comment", 404);
        }

        const comment = await addComment(params);

        if (!comment) {
            throw new AppError("Invalid Comment", 404);
        }

        response.send(comment);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all Comments done by a user
// @route   GET /api/comments/user/user_id
// @access  Private
export const getCommentsForUser = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const user_id = Number(response.locals.payload.user_id);

        if (isNaN(user_id)) {
            throw new AppError("Invalid user_id", 404);
        }

        const comments = await getCommentsByUserId(user_id);

        response.send(comments);
    } catch (error) {
        next(error);
    }
};

// @desc    Get Threaded Comments for a parent comment
// @route   GET /api/comments/parent/:comment_id
// @access  Private
export const getThreadedComments = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { comment_id: stringCommentId } = request.params;

        const comment_id = Number(stringCommentId);

        if (isNaN(comment_id)) {
            throw new AppError("Invalid Comment Id", 404);
        }

        const comment = await getChildComments(comment_id);

        response.send(comment);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all the comments for a post
// @route   GET /api/posts/comments/:post_id
// @access  Private
export const getPostComments = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { post_id: stringPostId } = request.params;

        const post_id = Number(stringPostId);

        if (isNaN(post_id)) {
            throw new AppError("Invalid post_id", 404);
        }
        const comments = await selectPostComment(post_id);

        response.send(comments);
    } catch (error) {
        next(error);
    }
};
