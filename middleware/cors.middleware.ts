import cors from "cors";

const allowedOrigins = ["http://localhost:3000", "https://your-frontend.com"];

export const corsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // allow request
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

export const corsMiddleware = cors(corsOptions);
