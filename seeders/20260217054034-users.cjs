"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Dynamic import because models are ESM/TS
        const { User } = await import("../models/user.model.js");
        const { sequelize } = await import("../services/sequalize.service.js");

        await User.bulkCreate(
            [
                {
                    firstName: "Wesam",
                    lastName: "Abo Aqel",
                    username: "wesamaboaqel",
                    password: "12345678",
                    email: "wesamabuaqel138@gmail.com",
                    role: 0,
                },
                {
                    firstName: "Ahmed",
                    lastName: "Nazzal",
                    username: "ahmednazzal",
                    password: "12345678",
                    email: "nazzal.ahmed@gmail.com",
                },
                {
                    firstName: "Tima",
                    lastName: "Abdallat",
                    username: "timaabdallat",
                    password: "12345678",
                    email: "timaabdallat@gmail.com",
                },
            ],
            { individualHooks: true },
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("User", null, {});
    },
};
