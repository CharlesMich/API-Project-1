// 'use strict';

// let options = {};

// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA; //define your schema in options object
// }

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {

//     options.tableName = 'Bookings';

//     await queryInterface.bulkInsert(options, [
//       {
//         spotId: 1,
//         userId: 1,
//         startDate: '2022-06-12',
//         endDate: '2022-06-13'
//       },
//       {
//         spotId: 2,
//         userId: 2,
//         startDate: '2023-07-10',
//         endDate: '2023-07-11'
//       },
//       {
//         spotId: 3,
//         userId: 3,
//         startDate: '2023-09-09',
//         endDate: '2023-09-10'
//       },
//       {
//         spotId: 4,
//         userId: 4,
//         startDate: '2023-12-09',
//         endDate: '2023-12-10'
//       },
//       {
//         spotId: 5,
//         userId: 5,
//         startDate: '2023-04-09',
//         endDate: '2023-04-10'
//       },
//       {
//         spotId: 1,
//         userId: 5,
//         startDate: '2022-06-12',
//         endDate: '2022-06-13'
//       },
//       {
//         spotId: 2,
//         userId: 4,
//         startDate: '2023-07-10',
//         endDate: '2023-07-11'
//       },
//       {
//         spotId: 3,
//         userId: 2,
//         startDate: '2023-09-09',
//         endDate: '2023-09-10'
//       },
//       {
//         spotId: 4,
//         userId: 3,
//         startDate: '2023-12-09',
//         endDate: '2023-12-10'
//       },
//       {
//         spotId: 5,
//         userId: 1,
//         startDate: '2023-04-09',
//         endDate: '2023-04-10'
//       }
      
//     ], {});
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down(queryInterface, Sequelize) {

//     options.tableName = 'Bookings';
//     const Op = Sequelize.Op;
//     await queryInterface.bulkDelete(options, {
//       userId: { [Op.in]: [1, 2, 3, 4, 5] }
//     }, {});
// //     /**
// //      * Add commands to revert seed here.
// //      *
// //      * Example:
// //      * await queryInterface.bulkDelete('People', null, {});
// //      */
//   }
// };
