import type { NextFunction, Request, Response } from "express";

// @desc    Global Error Handling Middleware
// @route   *
// @access  Public
export const errorMiddleware = async (
    err: any,
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    console.error(err); // log internally

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    response.status(statusCode).json({
        success: false,
        message,
    });
};
