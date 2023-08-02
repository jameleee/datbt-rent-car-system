'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('coupons', [
      {
        code: 'ABCD1234',
        discount_type_id: 1,
        discount_rate: 10,
        expire_time: new Date('2023-08-08T00:00:00.000Z'),
        is_active: true,
        description: '10% discount on all products',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'EFGH5678',
        discount_type_id: 1,
        discount_rate: 20,
        expire_time: new Date('2023-08-15T00:00:00.000Z'),
        is_active: true,
        description: '20% discount on all electronics',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'IJKL9012',
        discount_type_id: 1,
        discount_rate: 30,
        expire_time: new Date('2023-08-22T00:00:00.000Z'),
        is_active: true,
        description: '30% discount on all clothing',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'FREESHIP10',
        discount_type_id: 3,
        discount_rate: 10,
        expire_time: new Date('2023-08-08T00:00:00.000Z'),
        is_active: true,
        description: 'Get free shipping on orders over $100',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'FREESHIP25',
        discount_type_id: 3,
        discount_rate: 25,
        expire_time: new Date('2023-08-15T00:00:00.000Z'),
        is_active: true,
        description: 'Get free shipping on orders over $250',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'FREESHIP50',
        discount_type_id: 3,
        discount_rate: 50,
        expire_time: new Date('2023-08-22T00:00:00.000Z'),
        is_active: true,
        description: 'Get free shipping on orders over $500',
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
