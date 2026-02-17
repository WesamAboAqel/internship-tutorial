'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('post', 'Post');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Post', 'post');
  }
};
