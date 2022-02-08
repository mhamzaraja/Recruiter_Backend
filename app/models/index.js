const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    // define: {
    //   freezeTableName: true
    // }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

//candidate models
db.candidateProfile = require("../models/candidate.Profile.model")(sequelize, Sequelize);
db.candidateEducation = require("../models/candidate.education.model")(sequelize, Sequelize);
db.candidateProjects = require("../models/user.projects.model")(sequelize, Sequelize);
db.candidateSkills = require("../models/user.skills.model")(sequelize, Sequelize);
db.candidateLanguages = require("../models/user.languages.model")(sequelize, Sequelize);

//employer models
db.employerProfile = require("../models/employer.profile.model")(sequelize, Sequelize);
db.jobPost = require("../models/job.post.model")(sequelize, Sequelize);
db.jobSkills = require("../models/job.skills.model")(sequelize, Sequelize);
db.jobLocation = require("../models/job.location.model")(sequelize, Sequelize);


// ASSOCIATIONS

//user and role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// candidate profile
db.user.hasMany(db.candidateProfile,{
  foreignKey: "userId"
});
db.candidateProfile.belongsTo(db.user, {
  foreignKey : 'userId'
});

// education
db.user.hasMany(db.candidateEducation,{
  foreignKey: "userId"
});
db.candidateEducation.belongsTo(db.user, {
  foreignKey : 'userId'
});

// projects
db.user.hasMany(db.candidateProjects,{
  foreignKey: "userId"
});
db.candidateProjects.belongsTo(db.user, {
  foreignKey : 'userId'
});

// skills
db.user.hasMany(db.candidateSkills,{
  foreignKey: "userId"
});
db.candidateSkills.belongsTo(db.user, {
  foreignKey : 'userId'
});

// languages
db.user.hasMany(db.candidateLanguages,{
  foreignKey: "userId"
});
db.candidateLanguages.belongsTo(db.user, {
  foreignKey : 'userId'
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
