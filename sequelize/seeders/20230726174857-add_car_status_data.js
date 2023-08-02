'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('car_status', [
      {
        status: 'Available',
        description: 'The car is available for rent',
      },
      {
        status: 'Maintenance',
        description: 'The car is under maintenance',
      },

      {
        status: 'Hired',
        description: 'The car has been hired.',
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
