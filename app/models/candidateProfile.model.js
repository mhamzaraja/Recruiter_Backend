module.exports = (sequelize, Sequelize) => {
    const CandidateProfile = sequelize.define(
        "candidate_profile", {
            id:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            avatar: {
                type: Sequelize.BLOB
            },
            name: {
                type: Sequelize.STRING
            },
            dob: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
            },
            marital_status:{
                type: Sequelize.STRING
            },
            nationality: {
                type: Sequelize.STRING
            },
            cnic: {
                type: Sequelize.INTEGER
            },
            city: {
                type: Sequelize.STRING
            },
            area:{
                type: Sequelize.STRING
            },
            mobile_number: {
                type: Sequelize.INTEGER
            },
            career_level: {
                type: Sequelize.STRING
            },
            expected_salary: {
                type: Sequelize.STRING
            },
            summary:{
                type: Sequelize.STRING,
            },
            experience: {
                type: Sequelize.INTEGER
            }

        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return CandidateProfile;
  };