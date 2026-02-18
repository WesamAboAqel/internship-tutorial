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

    const info = await transporter.sendMail({
        from: `Wesam Abo Aqel wesamabuaqel138@gmail.com`,
        to: `${user.email}`,
        subject: "Orientation Email",
        text: `Dear ${user.firstName}, you signed up successfully for our  application, this is our orientation email and we just wanted to say hi.`,
        html: `<p>Dear ${user.firstName}, you signed up successfully for our application, this is our orientation email and we just wanted to say hi.</p>`,
    });

    next();
};
