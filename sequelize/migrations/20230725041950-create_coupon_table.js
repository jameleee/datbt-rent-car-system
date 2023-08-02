'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      discount_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'coupon_types',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      discount_rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expire_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
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

    await queryInterface.addIndex('coupons', ['code'], {
      name: 'coupon_code_index',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('coupons', 'code');
    await queryInterface.dropTable('coupons');
  },
};
