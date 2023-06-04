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
        lat: 12.345678,
        lng: 122.345678,
        name: 'Beach Resort',
        description: 'beautiful two bedroom house',
        price: 64
      },

      {
        ownerId: 2,
        address:'5687 Narrow Lane',
        city: 'Dallas', state:'Texas',
        country:'USA', 
        lat: 24.657465,
        lng: 98.465536,
        name: 'Dream Home',
        description: 'Spacious and elegant',
        price: 99
      },

      {
        ownerId: 3,
        address:'5687 Enchanted Lane',
        city: 'Austin', state:'Texas',
        country:'USA', 
        lat: 13.322443,
        lng: 78.866554,
        name: 'Beautiful',
        description: 'clean and quiet',
        price: 89
      },
      {
        ownerId: 4,
        address:'9912 Hollywood Lane',
        city: 'Somerset', state:'NJ',
        country:'USA', 
        lat: 13.322443,
        lng: 48.866554,
        name: 'Bright and Sunny',
        description: 'clean and quiet',
        price: 79
      },
      {
        ownerId: 5,
        address:'2212 Morning Cloud Lane',
        city: 'Dallas', state:'Texas',
        country:'USA', 
        lat: 13.322443,
        lng: 143.866554,
        name: 'Best in Town',
        description: 'clean and quiet',
        price: 129
      },
      {
        ownerId: 6,
        address:'3479 SweetOaks Lane',
        city: 'Oklohoma City', state:'Oklahoma',
        country:'USA', 
        lat: 13.322443,
        lng: 28.866554,
        name: 'White House',
        description: 'clean and quiet',
        price: 49
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
      ownerId: {[Op.in]: [1, 2, 3, 4, 5, 6]}
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
