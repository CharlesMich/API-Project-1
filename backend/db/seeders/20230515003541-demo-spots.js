'use strict';

let options = {};

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA; //define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Spots';

    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address:'1234 Straight Lane',
        city: 'Houston', state:'Texas',
        country:'USA', 
        lat: 123456789,
        lng: 123456789,
        name: 'paradise',
        description: 'beautiful two bedroom house',
        price: 64
      },

      {
        ownerId: 2,
        address:'5687 Narrow Lane',
        city: 'Dallas', state:'Texas',
        country:'USA', 
        lat: 124657465,
        lng: 958465536,
        name: 'Heaven',
        description: 'Spacious and elegant',
        price: 99
      },

      {
        ownerId: 3,
        address:'5687 Enchanted Lane',
        city: 'Austin', state:'Texas',
        country:'USA', 
        lat: 113322443,
        lng: 998866554,
        name: 'beautiful',
        description: 'clean and quiet',
        price: 99
      },

    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      ownerId: {[Op.in]: [1, 2, 3]}
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
