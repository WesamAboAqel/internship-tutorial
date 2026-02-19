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
import { AppError } from "../utils/Error.utils.js";

// @desc    get All Users
// @route   GET /api/users/
// @access  Public
export const getAllUsers = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const users = await User.findAll();

        if (!users) {
            throw new AppError("No users were found", 404);
        }
        response.send(users);
    } catch (error) {
        next(error);
    }
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

        const params: IUserInit = {
            firstName,
            lastName,
            username,
            password,
            email,
            fileName: key,
            role,
        };

        const { error } = JUserInit.validate(params);

        if (error) throw new Error();

        const user = await createUser(params);

        response.locals.user = user;

        next();
    } catch (error) {
        next(error);
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
    try {
        const { username, password } = request.body;

        const user = await getUserByUsername(username);

        if (!user) {
            throw new AppError("User not found!", 404);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new AppError("Invalid Credentials", 404);
        }

        response.locals.user = new UserResponseDTO(user);
        next();
    } catch (error) {
        next(error);
    }
};

// @desc    check if the user is an Admin (0)
// @route   *
// @access  Private
export const ifAdmin = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const id = response.locals.payload.user_id;

        const user: UserResponseDTO = await getUserById(id);

        if (user.role != 0) {
            throw new AppError("Not Enough Permissions", 404);
        }

        next();
    } catch (error) {
        next(error);
    }
};
