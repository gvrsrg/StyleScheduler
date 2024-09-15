'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Master extends Model {}

    Master.init(
      {
        // Model attributes are defined here
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        workrole: {
          type: DataTypes.STRING,
          allowNull: false
          },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,        },
        lastname: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Master', // We need to choose the model name
      },
    );
    Master.associate = (models) => {
      Master.belongsToMany(models.Service,{
          through: 'ServiceMaster',
          foreignKey: 'masterId',
          otherKey: 'serviceId',
          as: 'services'
      });
      // Master.belongsTo(models.Schedule,{
      // //   through: 'Schedule',
      // });
      Master.belongsTo(models.User);
    }

    // Master.addService = (masterId, serviceId) =>{
    //     return Master.update({$push: {services: serviceId}},{where: {id: masterId}})
    //     .then(data => {
    //         return data
    //     })
    //     .catch(err => {
    //         return err
    //     })
    //     }

    return Master;
};