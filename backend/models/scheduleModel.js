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
        // serviceId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //   },
        // masterId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //   },
        // customerId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //   },
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
        Schedule.belongsTo(models.Customer);
        Schedule.belongsTo(models.Master);
        Schedule.belongsTo(models.Service);
    }
    return Schedule;
};