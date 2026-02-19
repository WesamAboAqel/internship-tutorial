import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import {
    ISessionInit,
    ISessionRefresh,
    JSessionInit,
} from "../models/session.model.js";
import {
    addSession,
    refreshSession,
} from "../repository/session.repository.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/Error.utils.js";

// @desc    Initializing a Session
// @route   POST /api/users/login & /api/users/register
// @access  Public
export const generateTokens = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        response.locals.refreshToken = crypto.randomBytes(32).toString("hex");

        const params: ISessionInit = {
            user_id: response.locals.user.id,
            refreshTokenHash: response.locals.refreshToken,
        };

        const { error } = JSessionInit.validate(params);

        if (error) {
            throw new AppError("Something went wrong", 404);
        }

        const session = await addSession(params);

        response.locals.accessToken = jwt.sign(
            { user_id: response.locals.user.id, session_id: session.id },
            process.env.JWT_TOKEN_SECRET!,
            { expiresIn: "600s" },
        );

        next();
    } catch (error) {
        next(error);
    }
};

// @desc    Sends tokens to the client
// @route   POST /api/auth/login & /api/auth/refresh
// @access  Private
export const sendTokens = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        response.status(200).json({
            accessToken: response.locals.accessToken,
            refreshToken: response.locals.refreshToken,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Takes a refresh token and renews session
// @route   POST /api/users/refresh
// @access  Public
export const refreshTokens = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { refreshToken } = request.body;

        const oldRefreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        

        response.locals.refreshToken = crypto.randomBytes(64).toString("hex");

        const params: ISessionRefresh = {
            oldRefreshTokenHash,
            newRefreshToken: response.locals.refreshToken,
        };

        const session = await refreshSession(params);

        response.locals.accessToken = jwt.sign(
            { user_id: session.user_id, session_id: session.id },
            process.env.JWT_TOKEN_SECRET!,
            { expiresIn: "600s" },
        );

        next();
    } catch (error) {
        next(error);
    }
};
