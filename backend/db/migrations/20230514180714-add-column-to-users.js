'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName',
    {type: Sequelize.STRING,
      allowNull:true,
      // refernces: {model: 'Users'}
    },
    ),
    await queryInterface.addColumn('Users', 'lastName',
    {type: Sequelize.STRING,
      allowNull:true,
      // references: {model: 'Users'}
    },
    )
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName'),
    await queryInterface.removeColumn('Users', 'lastName')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
