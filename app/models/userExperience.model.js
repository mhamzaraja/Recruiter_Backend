module.exports = (sequelize, Sequelize) => {
    const UserExperience = sequelize.define(
        "user_experience", {
            id:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            jobTitle: {
                type: Sequelize.STRING
            },
            company: {
                type: Sequelize.STRING
            },
            industry: {
                type: Sequelize.STRING
            },
            manageTeam: {
                type: Sequelize.BOOLEAN
            },
            salary:{
                type: Sequelize.STRING
            },
            location: {
                type: Sequelize.STRING
            },
            startDate: {
                type: Sequelize.INTEGER
            },
            endDate: {
                type: Sequelize.STRING
            },
            currentlyWorking:{
                type: Sequelize.BOOLEAN
            },
            description: {
                type: Sequelize.STRING
            }
        }
    );
  
    return UserExperience;
  };