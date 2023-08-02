'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      avatar_url: {
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

    await queryInterface.addIndex('users', ['username'], {
      name: 'username_index',
    });

    await queryInterface.addIndex('users', ['email'], {
      name: 'user_email_index',
    });

    await queryInterface.addIndex('users', ['id'], {
      name: 'user_id_index',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('user_tokens', 'token_index');
    await queryInterface.removeIndex('user_tokens', 'user_id_index');
    await queryInterface.dropTable('user_role');
    await queryInterface.dropTable('users');
  },
};
