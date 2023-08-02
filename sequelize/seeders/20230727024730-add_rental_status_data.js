'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rental_status', [
      {
        status: 'Available',
      },
      {
        status: 'Created',
      },
      {
        status: 'Unavailable',
      },
      {
        status: 'Pending',
      },
      {
        status: 'Rented',
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
