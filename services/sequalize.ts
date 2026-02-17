import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { Session } from "../models/session.model.js";

// export const sequelize = new Sequelize( {
//   dialect: MySqlDialect,
//   database: "railway",
//   user: "root",
//   password: "IJmbRFpbFLDgAMxpsxPhrgsayuPYaXcz",
//   host: "nozomi.proxy.rlwy.net",
//   port: 3306,
// });

export const sequelize = new Sequelize({
    url: process.env.DATABASE_URL!,
    dialect: "mysql",
    logging: false,
    models: [User, Post, Session],
});

export const testConnection = async () => {
    try {
        // console.log(process.env.DATABASE_URL)
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("MySQL connected successfully.");
    } catch (error) {
        console.error("Unable to connect to MySQL:", error);
    }
};
