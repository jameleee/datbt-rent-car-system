'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('coupon_types', [
      {
        type: 'Percentage Discount',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: 'Flat Discount',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: 'Free Shipping',
        created_at: new Date(),
        updated_at: new Date(),
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
