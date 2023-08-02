'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('car_types', [
      {
        brand: 'Toyota',
        fuel_type: 'Gasoline',
        seat: 5,
        car_image_url: '',
      },
      {
        brand: 'Honda',
        fuel_type: 'Gasoline',
        seat: 5,
        car_image_url: '',
      },
      {
        brand: 'Nissan',
        fuel_type: 'Gasoline',
        seat: 5,
        car_image_url: '',
      },
      {
        brand: 'Hyundai',
        fuel_type: 'Gasoline',
        seat: 5,
        car_image_url: '',
      },
      {
        brand: 'Kia',
        fuel_type: 'Gasoline',
        seat: 5,
        car_image_url: '',
      },
      {
        brand: 'Mitsubishi',
        fuel_type: 'Gasoline',
        seat: 7,
        car_image_url: '',
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
