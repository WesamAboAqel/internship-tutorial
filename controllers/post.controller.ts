import { Request, Response, NextFunction } from "express";
import { editPost, selectPostsByUserId } from "../repository/post.repository.js";
import { IPostEdit, JPostEdit } from "../models/post.model.js";
import Joi from "joi";

// @desc    Get All Posts for a User
// @route   GET /api/posts/:user_id
// @access  Private
export const getPostsByUserId = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const stringUserId = request.params.user_id;

    // console.log(stringUserId);

    if (!stringUserId || Array.isArray(stringUserId)) {
        response.send({
            msg: "Invalid User Id",
        });
        return;
    }

    const user_id = parseInt(stringUserId);

    const posts = await selectPostsByUserId(user_id);

    response.send(posts).end();
};

// @desc    Update Post information
// @route   PATCH /api/posts/
// @access  Private
export const updatePost = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const { id, title, description } = request.body;

    const params: IPostEdit = {
        id,
        title,
        description,
    };

    const { error } = JPostEdit.validate(params);

    if(error){
        response.send({msg: "Invalid Information"})
        return;
    }

    const post = await editPost(params);

    response.send({msg: "Edited Successfully", post});
};
