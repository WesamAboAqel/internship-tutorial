import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_EMAIL!,
        pass: process.env.GOOGLE_APP_PASSWORD!,
    },
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve("./views/emails"),
        defaultLayout: false,
    },
    viewPath: path.resolve("./views/emails"),
};

transporter.use("compile", hbs(handlebarOptions as any));
