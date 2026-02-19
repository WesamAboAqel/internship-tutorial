import { Request, Response, NextFunction } from "express";
import {
    editPost,
    selectPostsByUserId,
} from "../repository/post.repository.js";
import { IPostEdit, JPostEdit } from "../models/post.model.js";
import Joi from "joi";
import { AppError } from "../utils/Error.utils.js";

// @desc    Get All Posts for a User
// @route   GET /api/posts/:user_id
// @access  Private
export const getPostsByUserId = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const stringUserId = request.params.user_id;

        if (!stringUserId || Array.isArray(stringUserId)) {
            throw new AppError("Invalid User Id", 404);
        }

        const user_id = parseInt(stringUserId);

        const posts = await selectPostsByUserId(user_id);

        response.send(posts);
    } catch (error) {
        next(error);
    }
};

// @desc    Update Post information
// @route   PATCH /api/posts/
// @access  Private
export const updatePost = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { id, title, description } = request.body;

        const params: IPostEdit = {
            id,
            title,
            description,
        };

        const { error } = JPostEdit.validate(params);

        if (error) {
            throw new AppError("Invalid Information", 404);
        }

        const post = await editPost(params);

        response.send({ msg: "Edited Successfully", post });
    } catch (error) {
        next(error);
    }
};
