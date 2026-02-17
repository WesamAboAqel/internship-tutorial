"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert("User", [
            {
                firstName: "Wesam",
                lastName: "Abo Aqel",
                username: "wesamaboaqel",
                password: "12345678",
                email: "wesamabuaqel138@gmail.com",
            },
            {
                firstName: "Omar",
                lastName: "Alhory",
                username: "omarhory",
                password: "12345678",
                email: "omar.alhory@gmail.com",
            },
            {
                firstName: "Lina",
                lastName: "Khaled",
                username: "linak",
                password: "12345678",
                email: "lina.khaled@gmail.com",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("User", null, {});
    },
};
