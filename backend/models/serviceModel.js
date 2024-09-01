'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {}

    Service.init(
      {
        // Model attributes are defined here
        serviceName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Service', // We need to choose the model name
      },
    );

    return Service;
};