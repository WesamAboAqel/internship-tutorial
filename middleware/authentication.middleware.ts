import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { access } from "node:fs";
import { UserResponseDTO } from "../models/user.model.js";

// @desc    Authentication and Granting AccessTokens
// @route   GET api/users/login
// @access  Public
export const tokenGeneration = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const user: UserResponseDTO = response.locals.user;

    const accessToken = jwt.sign(
        {
            user_id: user.id,
        },
        process.env.JWT_TOKEN_SECRET!,
    );

    response.send({ accessToken }).end();
};

// @desc    authenticate using accessToken
// @route   GET *
// @access  Private
export const Authenticate = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
        response.send("No Auth Headers");
        return;
    }
    const [schema, accessToken] = authHeader.split(" ");

    if (schema != "Bearer" || !accessToken) {
        response.send("Not proper Auth Headers");
        return;
    }

    const payload = jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET!);

    if (!payload) {
        response.send("Not proper access Token");
        return;
    }

    response.locals.payload = payload;
    next();
};
