import { IPostEdit, IPostInit, Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { sequelize } from "../source/sequalize.js";

// @param      params - PostInit
// @returns    Post
// @notes      Creates Post using Information
export const insertPost = async (params: IPostInit): Promise<Post> => {
    const post = await Post.create({
        title: params.title,
        description: params.description,
        user_id: params.user_id,
    });

    return post;
};

// @param      userId - number
// @returns    Post[] - List<Post>
// @notes      returns posts by userId
export const selectPostsByUserId = async (userId: number): Promise<Post[]> => {
    const posts = await Post.findAll({
        where: {
            user_id: userId,
        },
        include: [{ model: User }],
    });

    return posts;
};

// @param      params - IPostEdit
// @returns    post - Post
// @notes      Edit Posts and their updatedAt in a transaction
export const editPost = async (params: IPostEdit): Promise<Post> => {
    const transaction = await sequelize.startUnmanagedTransaction();
    try {
        const post = await Post.findByPk(params.id, {
            transaction: transaction,
        });

        if (!post) {
            throw new Error();
        }

        await post.update(
            {
                title: params.title ? params.title : post.title,
                description: params.description
                    ? params.description
                    : post.description,
            },
            { transaction: transaction },
        );

        await transaction.commit();

        return post;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
