import express from "express";
import user from "./routes/user.route.js";
import comment from "./routes/comment.route.js";
import post from "./routes/post.route.js";
import test from "./routes/test.route.js";
import { connectDatabase } from "./services/sequalize.service.js";
import logger from "./middleware/logger.middleware.js";
import { ratelimit } from "./middleware/ratelimit.middleware.js";
import { connectRedis } from "./services/redis.service.js";
import { corsMiddleware } from "./middleware/cors.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use(corsMiddleware);

app.use(ratelimit);

app.use(logger);

app.use("/api/users", user);
app.use("/api/posts", post);
app.use("/api/hello", test);
app.use("/api/comments", comment);

app.get("/ping", (req, res) => res.send("pong"));

app.use(errorMiddleware);

app.listen(3000, "0.0.0.0", async () => {
    console.log("Server is running and listening to port: 3000");
    await connectDatabase();
    await connectRedis();
});
