require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, ENDPOINT_ID } = process.env;

module.exports = {
    HOST: PGHOST,
    USER: PGUSER,
    PASSWORD: PGPASSWORD,
    DB: PGDATABASE,
    PORT: PGPORT,
    dialect: "postgres",
    ssl: 'require',
    connection: {
      options: `project=${ENDPOINT_ID}`,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};