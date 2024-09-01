require("dotenv").config();
//const Sequilize = require('sequelize')

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// module.exports = {
//     HOST: PGHOST,
//     USER: PGUSER,
//     PASSWORD: PGPASSWORD,
//     DB: PGDATABASE,
//     PORT: PGPORT,
//     dialect: "postgres",
//     ssl: 'require',
//     connection: {
//       options: `project=${ENDPOINT_ID}`,
//     },
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
// };
const config = {
    host: PGHOST,
    user: PGUSER,
    database: PGDATABASE,
    db: PGDATABASE,
    password: PGPASSWORD,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
          }      // Your pg options here
      },
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

//console.log(config);

module.exports = { config }

// module.exports = new Sequilize(PGDATABASE, PGUSER, PGPASSWORD, {
//     host: PGHOST,
//     dialect: 'postgres',
//     ssl: 'require',
//     operatorsAliases: 0,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 3000,
//       idle: 10000
//     }
//   })