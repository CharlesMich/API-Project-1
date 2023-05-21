'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId'}
      )

      Spot.hasMany(
        models.Booking,
        {foreignKey: 'spotId'}
      )

      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId'}
      )

      Spot.hasMany(
        models.SpotImage,
        {foreignKey: 'spotId', onDelete: 'CASCADE'},
        
      )
    }
  };
  Spot.init(
    {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    address: {
     type: DataTypes.STRING,
     allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lat: {
      type:DataTypes.FLOAT(8,6),
      allowNull:false,
      validate: {
        min: -90.000000,
        max: 90.000000,
      }
    },
    lng: {
      type:DataTypes.FLOAT(9,6),
      allowNull:false,
      validate: {
        min: -180.000000,
        max: 180.000000,
      }
    },
    name: {
      type:DataTypes.STRING(50),
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};