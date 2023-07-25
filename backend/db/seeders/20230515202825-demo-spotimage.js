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
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-1/spot-1-img-1.webp',
    preview: true
  },
  {spotId:1,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-1/spot1img2.webp',
    preview: false
  },
  {spotId:1,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-1/spot1img3.webp',
    preview: false
  },
  {spotId:1,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-1/spot1img4.webp',
    preview: false
  },
  {spotId:1,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-1/spot1img5.webp',
    preview: false
  },

  {spotId:2,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-2/spot2img1.webp',
    preview: true
  },
  {spotId:2,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-2/spot2img2.webp',
    preview: false
  },
  {spotId:2,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-2/spot2img3.webp',
    preview: false
  },
  {spotId:2,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-2/spot2img4.webp',
    preview: false
  },
  {spotId:2,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-2/spot2img5.webp',
    preview: false
  },
  {spotId:3,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-3/spot3img1.webp',
    preview: true
  },
  {spotId:3,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-3/spot3img2.webp',
    preview: false
  },
  {spotId:3,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-3/spot3img3.webp',
    preview: false
  },
  {spotId:3,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-3/spot3img4.webp',
    preview: false
  },
  {spotId:3,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-3/spot3img5.webp',
    preview: false
  },
  {spotId:4,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-4/spot4img1.webp',
    preview: true
  },
  {spotId:4,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-4/spot4img2.webp',
    preview: false
  },
  {spotId:4,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-4/spot4img3.webp',
    preview: false
  },
  {spotId:4,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-4/spot4img4.webp',
    preview: false
  },
  {spotId:4,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-4/spot4img5.webp',
    preview: false
  },
  {spotId:5,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-5/spot5img1.webp',
    preview: true
  },
  {spotId:5,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-5/spot5img2.webp',
    preview: false
  },
  {spotId:5,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-5/spot5img3.webp',
    preview: false
  },
  {spotId:5,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-5/spot5img4.webp',
    preview: false
  },
  {spotId:5,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-5/spot5img5.webp',
    preview: false
  },
  {spotId:6,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-6/spot6img1.webp',
    preview: true
  },
  {spotId:6,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-6/spot6img2.webp',
    preview: false
  },
  {spotId:6,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-6/spot6img3.webp',
    preview: false
  },
  {spotId:6,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-6/spot6img4.webp',
    preview: false
  },
  {spotId:6,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/airbnb-pics/spot-6/spot6img5.webp',
    preview: false
  },

  {spotId:7,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/spt7prv.jpg',
    preview: true
  },
  {spotId:8,
    url:'https://myaaprojects.s3.us-east-2.amazonaws.com/spt8prv.jpg',
    preview: true
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

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
