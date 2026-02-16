const fs = require("fs");
require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: "mysql",
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    test: {
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: "mysql",
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    production: {
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: "mysql",
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
};
