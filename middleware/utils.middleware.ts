import { Request, Response, NextFunction } from "express";

// @desc    response for sucessful register
// @route   POST /api/users/register
// @access  Public
export const registerSuccess = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    response.send({ msg: "Register Successful", user: response.locals.user });
};
