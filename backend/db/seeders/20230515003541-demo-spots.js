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
        description: 'The Silo house is a unique place to stay with amazing Medina River access!!! See pics!! We took an old grain silo and rebuilt it with an additional structure holding a bedroom and bathroom up and downstairs with 20 ft ceilings at the entrance. The silo has a small living room and kitchen downstairs and a loft upstairs. It has loads of charm and can sleep plenty of your family and friends. No kidding--We had a wedding in a hurricane here- thats how cool it is-- come and make your memories!',
        price: 64.0
      },

      {
        ownerId: 2,
        address:'5687 Narrow Lane',
        city: 'Dallas', state:'Texas',
        country:'USA', 
        lat: 24.657465,
        lng: 98.465536,
        name: 'Dream Home',
        description: 'The Silo house is a unique place to stay with amazing Medina River access!!! See pics!! We took an old grain silo and rebuilt it with an additional structure holding a bedroom and bathroom up and downstairs with 20 ft ceilings at the entrance. The silo has a small living room and kitchen downstairs and a loft upstairs. It has loads of charm and can sleep plenty of your family and friends. No kidding--We had a wedding in a hurricane here- thats how cool it is-- come and make your memories!',
        price: 99.0
      },

      {
        ownerId: 3,
        address:'5687 Enchanted Lane',
        city: 'Austin', state:'Texas',
        country:'USA', 
        lat: 13.322443,
        lng: 78.866554,
        name: 'Ocean and sea view',
        description: 'The Silo house is a unique place to stay with amazing Medina River access!!! See pics!! We took an old grain silo and rebuilt it with an additional structure holding a bedroom and bathroom up and downstairs with 20 ft ceilings at the entrance. The silo has a small living room and kitchen downstairs and a loft upstairs. It has loads of charm and can sleep plenty of your family and friends. No kidding--We had a wedding in a hurricane here- thats how cool it is-- come and make your memories!',
        price: 89.0
      },
      {
        ownerId: 4,
        address:'9912 Hollywood Lane',
        city: 'Somerset', state:'NJ',
        country:'USA', 
        lat: 13.322443,
        lng: 48.866554,
        name: 'Bright and Sunny',
        description: 'The Silo house is a unique place to stay with amazing Medina River access!!! See pics!! We took an old grain silo and rebuilt it with an additional structure holding a bedroom and bathroom up and downstairs with 20 ft ceilings at the entrance. The silo has a small living room and kitchen downstairs and a loft upstairs. It has loads of charm and can sleep plenty of your family and friends. No kidding--We had a wedding in a hurricane here- thats how cool it is-- come and make your memories!',
        price: 79.0
      },
      {
        ownerId: 5,
        address:'2212 Morning Cloud Lane',
        city: 'Dallas', state:'Texas',
        country:'USA', 
        lat: 13.322443,
        lng: 143.866554,
        name: 'Best in Town',
        description: 'The Silo house is a unique place to stay with amazing Medina River access!!! See pics!! We took an old grain silo and rebuilt it with an additional structure holding a bedroom and bathroom up and downstairs with 20 ft ceilings at the entrance. The silo has a small living room and kitchen downstairs and a loft upstairs. It has loads of charm and can sleep plenty of your family and friends. No kidding--We had a wedding in a hurricane here- thats how cool it is-- come and make your memories!',
        price: 129.0
      },
      {
        ownerId: 6,
        address:'3479 SweetOaks Lane',
        city: 'Atlanta', state:'Georgia',
        country:'USA', 
        lat: 13.322443,
        lng: 28.866554,
        name: 'Historic',
        description: 'The Silo house is a unique place to stay with amazing Medina River access!!! See pics!! We took an old grain silo and rebuilt it with an additional structure holding a bedroom and bathroom up and downstairs with 20 ft ceilings at the entrance. The silo has a small living room and kitchen downstairs and a loft upstairs. It has loads of charm and can sleep plenty of your family and friends. No kidding--We had a wedding in a hurricane here- thats how cool it is-- come and make your memories!',
        price: 79.0
      },
      {
        ownerId: 6,
        address:'3479 SweetOaks Lane',
        city: 'Denver', state:'Colorado',
        country:'USA', 
        lat: 13.322443,
        lng: 28.866554,
        name: 'Historic',
        description: 'The Silo house is a unique place to stay with amazing Medina River access!!! See pics!! We took an old grain silo and rebuilt it with an additional structure holding a bedroom and bathroom up and downstairs with 20 ft ceilings at the entrance. The silo has a small living room and kitchen downstairs and a loft upstairs. It has loads of charm and can sleep plenty of your family and friends. No kidding--We had a wedding in a hurricane here- thats how cool it is-- come and make your memories!',
        price: 89.0
      },
      {
        ownerId: 6,
        address:'3479 SweetOaks Lane',
        city: 'Detroit', state:'Michigan',
        country:'USA', 
        lat: 13.322443,
        lng: 28.866554,
        name: 'Historic',
        description: 'The Silo house is a unique place to stay with amazing Medina River access!!! See pics!! We took an old grain silo and rebuilt it with an additional structure holding a bedroom and bathroom up and downstairs with 20 ft ceilings at the entrance. The silo has a small living room and kitchen downstairs and a loft upstairs. It has loads of charm and can sleep plenty of your family and friends. No kidding--We had a wedding in a hurricane here- thats how cool it is-- come and make your memories!',
        price: 99.0
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
