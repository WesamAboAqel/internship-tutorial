import { Comment, ICommentInit } from "../models/comment.model.js";
import { AppError } from "../utils/Error.utils.js";

// @param      post_id - number
// @returns    Comments - Comment[]
// @notes      Returns posts according to post_id
export const getCommentsByPostId = async (
    post_id: number,
): Promise<Comment[]> => {
    const comments = await Comment.findAll({
        where: {
            post_id: post_id,
        },
    });

    return comments;
};

// @param      user_id - number
// @returns    Comments - Comment[]
// @notes      Returns User Comments grabbed by user_id
export const getCommentsByUserId = async (
    user_id: number,
): Promise<Comment[]> => {
    const comments = await Comment.findAll({
        where: {
            user_id: user_id,
        },
    });

    return comments;
};

// @param      params - ICommentInit
// @returns    Comment - Comment
// @notes      Create Comment
export const addComment = async (params: ICommentInit): Promise<Comment> => {
    try {
        const comment = await Comment.create({
            content: params.content,
            user_id: params.user_id,
            post_id: params.post_id,
            parent_id: params.parent_id ?? null,
        });

        if (!comment) {
            throw new Error();
        }

        return comment;
    } catch (error) {
        throw error;
    }
};

// @param      comment_id - number
// @returns    Comments - Comment[]
// @notes      Get Threaded Comments under one parent comment
export const getChildComments = async (
    comment_id: number,
): Promise<Comment> => {
    try {
        const comment = await Comment.findByPk(comment_id, {
            include: [
                {
                    model: Comment,
                    as: "replies",
                },
            ],
        });

        if (!comment) {
            throw new AppError("Comment not found!", 404);
        }

        return comment;
    } catch (error) {
        throw error;
    }
};

// @param      post_id - number
// @returns    comments - Comment[]
// @notes      Returns comments for a post
export const selectPostComment = async (
    post_id: number,
): Promise<Comment[]> => {
    try {
        const comments = await Comment.findAll({
            where: {
                post_id: post_id,
                parent_id: null,
            },
        });

        return comments;
    } catch (error) {
        throw error;
    }
};
