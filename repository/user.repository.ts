import { User, UserInit } from "../models/user.model.js";

// @param      username - string
// @returns    User - User
// @notes      Grabs User by Username
export const getUserByUsername = async (username: string): Promise<User> => {
    try {
        const user = await User.findOne({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new Error();
        }

        return user;
    } catch {
        throw new Error();
    }
};

// @param      params - UserInit
// @returns    user - User
// @notes      Creates a user
export const createUser = async (params: UserInit): Promise<User> => {
    try {
        const user = await User.create({
            firstName: params.firstName,
            lastName: params.lastName,
            username: params.username,
            password: params.password,
            email: params.email,
        });

        return user;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
};
