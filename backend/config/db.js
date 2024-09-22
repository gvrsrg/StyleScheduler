require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

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
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone:"+03:00"
}

//console.log(config);

module.exports = { config }

