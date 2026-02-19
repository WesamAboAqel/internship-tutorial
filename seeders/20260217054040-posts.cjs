"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { Post } = await import("../models/post.model.js");
        const { sequelize } = await import("../services/sequalize.service.js");

        await Post.bulkCreate(
            [
                {
                    title: "Getting Started with Sequelize",
                    description: "A beginner guide to models and migrations.",
                    user_id: 1,
                },
                {
                    title: "Understanding Associations",
                    description: "How belongsTo and hasMany work in practice.",
                    user_id: 1,
                },
                {
                    title: "TypeScript with Sequelize",
                    description: "Typing models correctly in modern projects.",
                    user_id: 2,
                },
                {
                    title: "Database Optimization Tips",
                    description: "Indexes and performance fundamentals.",
                    user_id: 2,
                },
                {
                    title: "Clean Backend Architecture",
                    description:
                        "Structuring services and controllers properly.",
                    user_id: 3,
                },
            ],
            { individualHooks: true },
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Post", null, {});
    },
};
