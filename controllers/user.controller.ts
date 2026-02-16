import { Request, Response, NextFunction } from "express";
import { User, UserInit } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
    createUser,
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
    const { firstName, lastName, username, password, email } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const params: UserInit = {
        firstName,
        lastName,
        username,
        password: hashedPassword,
        email,
    };

    const user = await createUser(params);

    response.locals.user = user;

    

    next();
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
    // console.log(match);

    if (!match) {
        response.send("Invalid Credentials");
        return;
    }

    response.locals.user = user;
    next();
    // response.send("Welcome Back!").end();
};
