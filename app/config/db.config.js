const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Shahzad@11223",
  DB: "recruiteragency",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
