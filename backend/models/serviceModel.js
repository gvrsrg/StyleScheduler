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
        serviceDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Service', // We need to choose the model name
      },
    );
    Service.associate = (models) => {
      Service.belongsToMany(models.Master, {
        through: 'ServiceMaster',
        foreignKey: 'serviceId',
        otherKey: 'masterId',
        as: 'masters'
      });
      // Service.belongsTo(models.Schedule,{
      // //   through: 'Schedule',
      // });
    }

    return Service;
};