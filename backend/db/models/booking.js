// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Booking extends Model {
    
//     static associate(models) {
//      Booking.belongsTo(
//       models.User,
//       {foreignKey:'userId'}
//      )

//      Booking.belongsTo(
//       models.Spot,
//       {foreignKey:'spotId'}
//      )
//     }
//   }
//   Booking.init({
//     spotId: {
//       type:DataTypes.INTEGER,
//     },
//     userId: {
//       type:DataTypes.INTEGER,
//     },
//     startDate: {
//       type:DataTypes.DATE,
//       allownull:false
//     },
//     endDate: {
//       type:DataTypes.DATE,
//       allownull:false
//     }
//   }, {
//     sequelize,
//     modelName: 'Booking',
//   });
//   return Booking;
// };