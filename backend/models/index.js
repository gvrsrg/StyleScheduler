'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const {config} = require(__dirname + '/../config/db.js');
const db = {};
const Op = Sequelize.Op;

let sequelize;
//console.log(config)
//console.log("Base name = ",basename);

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.user, config.password, config);
}
//console.log(sequelize);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    //console.log(path.join(__dirname, file));
    
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //console.log(model);
    
    db[model.name] = model;
    //console.log(db);
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
