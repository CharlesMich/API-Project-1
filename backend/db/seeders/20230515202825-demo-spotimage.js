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
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/spot1img1.jpg',
    preview: true
  },
  {spotId:1,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/spot1img1.jpg',
    preview: false
  },
  {spotId:1,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/spot1img1.jpg',
    preview: false
  },
  {spotId:1,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/spot1img1.jpg',
    preview: false
  },
  {spotId:1,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/spot1img1.jpg',
    preview: false
  },
  {spotId:2,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685823125/contemorary-living-room-decor-ideas-decorilla_sb8yua.jpg',
    preview: true
  },
  {spotId:3,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685818125/51bb6602-d192-4401-97c5-40dc74924795.jpg_a90ile.webp',
    preview: true
  },
  {spotId:4,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685823126/INSPIRATIONS-Top-13-Luxury-Home-Decor-Ideas-for-a-High-End-Interior_riudjo.png',
    preview: true
  },
  {spotId:5,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685823126/INSPIRATIONS-Top-13-Luxury-Home-Decor-Ideas-for-a-High-End-Interior_riudjo.png',
    preview: true
  },
  {spotId:6,
    url:'https://res.cloudinary.com/dupxil2cy/image/upload/v1685823126/INSPIRATIONS-Top-13-Luxury-Home-Decor-Ideas-for-a-High-End-Interior_riudjo.png',
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
