'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rentals', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      car_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'cars',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      rental_status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'rental_status',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      coupon_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'coupons',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      rent_location: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rent_date_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      return_location: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      return_date_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      detail: {
        type: Sequelize.TEXT,
        defaultValue: '',
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
    await queryInterface.dropTable('rentals');
  },
};
