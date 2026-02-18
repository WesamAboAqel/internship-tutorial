import express from "express";
// import users from "./routes/user.route.js";
// import auth from "./routes/auth.route.js";
// import expenses from "./routes/expenses.route.js";
// import logger from "./middleware/logger.js";
// import errorHandler from "./middleware/error_handler.js";
import user from "./routes/user.route.js";
import post from "./routes/post.route.js";
import test from "./routes/test.route.js";
import { testConnection } from "./services/sequalize.service.js";
// require('./source/sequalize')
import logger from "./middleware/logger.middleware.js";

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/users", user);
app.use("/api/posts", post);
app.use("/api/hello", test);

// app.use(errorHandler);

app.get("/ping", (req, res) => res.send("pong"));

app.listen(3000, "0.0.0.0", async () => {
    console.log("Server is running and listening to port: 3000");
    await testConnection();
});
