'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
      {
        // Model attributes are defined here
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
        level: {
          type: DataTypes.INTEGER,
          // allowNull defaults to true
        },
        password: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
      },
    );
    User.associate = (models) => {
      User.hasOne(models.Master);
    }
    return User;
};