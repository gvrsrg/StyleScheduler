'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {}

    Customer.init(
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
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Customer', // We need to choose the model name
      },
    );
    // Customer.associate = (models) => {
    //     Customer.belongsTo(models.Schedule,{
    // //         through: 'Schedule',
    //     });
    // }
    return Customer;
};