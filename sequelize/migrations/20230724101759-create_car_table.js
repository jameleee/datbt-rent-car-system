'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cars', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      car_type_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'car_types',
          },
          key: 'id',
        },
        allowNull: false,
      },
      car_steerings_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'car_steerings',
          },
          key: 'id',
        },
        allowNull: false,
      },
      car_status_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'car_status',
          },
          key: 'id',
        },
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rental_price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      gasonline: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      licence_plates: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cars');
  },
};
