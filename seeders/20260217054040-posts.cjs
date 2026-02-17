"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Post", [
            {
                title: "Getting Started with Sequelize",
                description: "A beginner guide to models and migrations.",
                user_id: 9,
            },
            {
                title: "Understanding Associations",
                description: "How belongsTo and hasMany work in practice.",
                user_id: 9,
            },
            {
                title: "TypeScript with Sequelize",
                description: "Typing models correctly in modern projects.",
                user_id: 7,
            },
            {
                title: "Database Optimization Tips",
                description: "Indexes and performance fundamentals.",
                user_id: 8,
            },
            {
                title: "Clean Backend Architecture",
                description: "Structuring services and controllers properly.",
                user_id: 7,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Post", null, {});
    },
};
