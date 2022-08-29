const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

module.exports = {
  HOST: 'eu-cdbr-west-03.cleardb.net',
  USER: 'b1d70d78d41ff4',
  PASSWORD: 'aa0d37e9',
  DB: 'heroku_e6d5ef3f8eeac50',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
