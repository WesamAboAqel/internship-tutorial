import express from "express";
// import users from "./routes/user.route.js";
// import auth from "./routes/auth.route.js";
// import expenses from "./routes/expenses.route.js";
// import logger from "./middleware/logger.js";
// import errorHandler from "./middleware/error_handler.js";
import user from "./routes/user.route.js";
import test from "./routes/test.route.js";
import { testConnection } from "./source/sequalize.js";
// require('./source/sequalize')
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// import test from "node:test";

const app = express();

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: { title: "My API", version: "1.0.0" },
        servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use(logger);

app.use("/api/users", user);
app.use("/api/hello", test);

// app.use(errorHandler);

app.get("/hello", (request, response) => {
    response.json({ message: "Hello World!" });
});

app.get("/ping", (req, res) => res.send("pong"));

app.listen(3000, "0.0.0.0", async () => {
    console.log("Server is running and listening to port: 3000");
    await testConnection();
});
