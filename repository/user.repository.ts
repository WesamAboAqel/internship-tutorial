import { IUserInit, User, UserResponseDTO } from "../models/user.model.js";

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
    } catch (error) {
        throw error;
    }
};

// @param      params - UserInit
// @returns    user - User
// @notes      Creates a user
export const createUser = async (
    params: IUserInit,
): Promise<UserResponseDTO> => {
    try {
        const user = await User.create({
            firstName: params.firstName,
            lastName: params.lastName,
            username: params.username,
            password: params.password,
            email: params.email,
            profilePicture: params.fileName,
            role: params.role ?? 1,
        });

        return new UserResponseDTO(user);
    } catch (error) {
        throw error;
    }
};

// @param      id - number
// @returns    user - UserResponseDTO
// @notes      get user by id
export const getUserById = async (id: number): Promise<UserResponseDTO> => {
    try {
        const user = await User.findByPk(id);

        if (!user) throw new Error();

        return new UserResponseDTO(user);
    } catch (error) {
        throw error;
    }
};
