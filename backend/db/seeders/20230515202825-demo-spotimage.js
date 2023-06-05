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
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/df4a2993-381b-4a94-8ec9-d0533fb50180.jpg.webp',
    preview: true
  },
  {spotId:3,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/df4a2993-381b-4a94-8ec9-d0533fb50180.jpg.webp',
    preview: true
  },
  {spotId:4,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/df4a2993-381b-4a94-8ec9-d0533fb50180.jpg.webp',
    preview: true
  },
  {spotId:5,
    url:'ohttps://myaaprojects.s3.us-east-2.amazonaws.com/df4a2993-381b-4a94-8ec9-d0533fb50180.jpg.webp',
    preview: true
  },
  {spotId:6,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/df4a2993-381b-4a94-8ec9-d0533fb50180.jpg.webp',
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
