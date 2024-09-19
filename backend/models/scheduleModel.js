'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {}

    Schedule.init(
      {
        // Model attributes are defined here
        date: {
            type: DataTypes.DATE,
            allowNull: false,

        },
        starttime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endtime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        }

      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Schedule', // We need to choose the model name
      },
    );
    Schedule.associate = (models) => {
        Schedule.belongsTo(models.Customer, {as:"customer", foreignKey:"customerId"});
        Schedule.belongsTo(models.Master, {as:"master", foreignKey:"masterId"});
        Schedule.belongsTo(models.Service, {as:"service", foreignKey:"serviceId"});
    }
    return Schedule;
};