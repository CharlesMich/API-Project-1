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
        {foreignKey: 'spotId' }
      )

      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId'}
      )

      Spot.hasMany(
        models.SpotImage,
        {foreignKey: 'spotId' }, 
        
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
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate: {
        min: -90,
        max: 90,
      }
    },
    lng: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate: {
        min: -180,
        max: 180,
      }
    },
    name: {
      type:DataTypes.STRING(50),
      allowNull:false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};