'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Reviews';

    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Good place, will visit again',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'bad service',
        stars: 1,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'smelly place',
        stars: 2,
      },
      {
        spotId: 4,
        userId: 4,
        review: 'Not good',
        stars: 2,
      },
      {
        spotId: 5,
        userId: 5,
        review: 'Very Good',
        stars: 4,
      },
      /**
       * Add seed commands here.
       *
       * Example:
       * await queryInterface.bulkInsert('People', [{
       *   name: 'John Doe',
       *   isBetaMember: false
       * }], {});
      */
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
