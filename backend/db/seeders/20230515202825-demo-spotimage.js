'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {


  async up (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
await queryInterface.bulkInsert(options, [
  {spotId:1,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685818125/576489e8-0740-4d30-9731-c08b22ffa06c.jpeg_galcoc.webp',
    preview: true
  },
  {spotId:2,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685818125/576489e8-0740-4d30-9731-c08b22ffa06c.jpeg_galcoc.webp',
    preview: false
  },
  {spotId:3,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685818125/51bb6602-d192-4401-97c5-40dc74924795.jpg_a90ile.webp',
    preview: true
  },
  {spotId:4,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685818125/053b9bc2-65d8-47b4-b713-b6ac9ff11b5a.jpeg_x0jbjr.webp',
    preview: true
  },
  {spotId:5,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685818125/ae8b8858-7777-4003-8bc3-593e38d0b8e8.jpeg_upnozk.webp',
    preview: true
  }
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

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
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
