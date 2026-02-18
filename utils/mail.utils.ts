import { Request, Response, NextFunction } from "express";
import { transporter } from "../services/nodemailer.service.js";
import { User, UserResponseDTO } from "../models/user.model.js";

// @desc    Sends email
// @route   GET /api/users/signup
// @access  Public
export const registerEmail = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const user: UserResponseDTO = response.locals.user;

    const info = await (transporter as any).sendMail({
        from: `Wesam Abo Aqel wesamabuaqel138@gmail.com`,
        to: `${user.email}`,
        subject: "Orientation Email",
        template: "register",
        context: {
            firstName: user.firstName,
        },
    });

    next();
};
