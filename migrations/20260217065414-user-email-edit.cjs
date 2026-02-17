"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.addConstraint("User", {
            fields: ["email"],
            type: "unique",
            name: "unique_email_constraint",
        });
    },

    async down(queryInterface, Sequelize) {
        queryInterface.addConstraint("User", {
            fields: ["email"],
            type: "unique",
            name: "unique_email_constraint",
        });
    },
};
