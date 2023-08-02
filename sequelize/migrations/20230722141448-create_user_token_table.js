'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_tokens', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokenHash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      expiration_time: {
        type: Sequelize.DATE,
        allowNull: false,
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

    await queryInterface.addIndex('user_tokens', ['token'], {
      name: 'token_index',
    });

    await queryInterface.addIndex('user_tokens', ['user_id'], {
      name: 'user_id_index',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('user_tokens', 'token_index');
    await queryInterface.removeIndex('user_tokens', 'user_id_index');
    await queryInterface.dropTable('user_tokens');
  },
};
