'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cars', [
      {
        car_type_id: 2,
        car_steerings_id: 1,
        car_status_id: 1,
        name: 'Honda Civic',
        gasonline: 100,
        rental_price: 80,
        licence_plates: '12-C1 434.46',
      },
      {
        car_type_id: 1,
        car_steerings_id: 2,
        car_status_id: 2,
        name: 'Toyota Corolla',
        gasonline: 50,
        rental_price: 50,
        licence_plates: '67-F1 313.94',
      },
      {
        car_type_id: 3,
        car_steerings_id: 1,
        car_status_id: 3,
        name: 'Nissan Altima',
        gasonline: 75,
        rental_price: 100,
        licence_plates: '98-B2 782.34',
      },
      {
        car_type_id: 4,
        car_steerings_id: 2,
        car_status_id: 1,
        name: 'Hyundai Elantra',
        gasonline: 100,
        rental_price: 120,
        licence_plates: '43-D4 219.61',
      },
      {
        car_type_id: 5,
        car_steerings_id: 1,
        car_status_id: 1,
        name: 'Kia Forte',
        gasonline: 50,
        rental_price: 110,
        licence_plates: '79-C2 691.56',
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
