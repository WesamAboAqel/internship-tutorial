import { Request, Response, NextFunction } from "express";
import {
    IUserInit,
    JUserInit,
    User,
    UserResponseDTO,
} from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
    createUser,
    getUserById,
    getUserByUsername,
} from "../repository/user.repository.js";

// @desc    get All Users
// @route   GET /api/users/
// @access  Public
export const getAllUsers = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const users = await User.findAll();

    response.send(users);
};

// @desc    register user
// @route   POST /api/users/register
// @access  Public
export const register = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { firstName, lastName, username, password, email, role } =
            request.body;

        const key = (request.file as any)?.key;

        // console.log(key);

        const hashedPassword = await bcrypt.hash(password, 10);

        // console.log(key);
        const params: IUserInit = {
            firstName,
            lastName,
            username,
            password: hashedPassword,
            email,
            fileName: key,
            role: role ?? 1,
        };

        const { error } = JUserInit.validate(params);

        if (error) throw new Error();

        const user = await createUser(params);

        response.locals.user = user;

        next();
    } catch (error) {
        throw error;
    }
};

// @desc    Login using username and password
// @route   POST /api/users/login
// @access  Public
export const login = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const { username, password } = request.body;

    const user = await getUserByUsername(username);

    if (!user) {
        response.send("User not found!");
        return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        response.send("Invalid Credentials");
        return;
    }

    response.locals.user = new UserResponseDTO(user);
    next();
};

// @desc    check if the user is an Admin (0)
// @route   *
// @access  Private
export const ifAdmin = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const id = response.locals.payload.user_id;

    const user: UserResponseDTO = await getUserById(id);

    if (user.role != 0) {
        response.send({
            msg: "Not Enough Permissions",
        });
        return;
    }

    next();
};
