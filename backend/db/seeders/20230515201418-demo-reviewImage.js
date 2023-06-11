'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {


  async up (queryInterface, Sequelize) {

     options.tableName = 'ReviewImages';
await queryInterface.bulkInsert(options, 
 
  [
    {
      reviewId: 1,
      url: "www.picture1.com",
    }
  ],
{});

  },
  async down (queryInterface, Sequelize) {

     options.tableName = 'ReviewImages';
    // const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, 
     null,
     {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
