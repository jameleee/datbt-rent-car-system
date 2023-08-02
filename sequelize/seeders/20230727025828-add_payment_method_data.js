'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('payment_method', [
      {
        method: 'Cash',
      },
      {
        method: 'CreditCard',
      },
      {
        method: 'DebitCard',
      },
      {
        method: 'Paypal',
      },
      {
        method: 'E_Banking',
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
