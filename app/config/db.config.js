module.exports = {
  HOST: "localhost",
  USER: "root",
  // PASSWORD: "Hamza@123",
  DB: "recruiterAgency",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
