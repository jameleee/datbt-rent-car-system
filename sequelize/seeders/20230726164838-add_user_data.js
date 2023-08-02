'use strict';

const bcrypt = require('bcrypt');
const { genSalt } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await genSalt(10);
    const password = await bcrypt.hash('Datbt123!@', salt);
    await queryInterface.bulkInsert('users', [
      {
        username: 'datbt',
        password: password,
        role: 'admin',
        email: 'datbt@tech.est-rouge.com',
        avatar_url: '',
      },
      {
        username: 'datbt111',
        password: password,
        role: 'user',
        email: 'datbuitan96@gmail.com',
        avatar_url: '',
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
  },
};
