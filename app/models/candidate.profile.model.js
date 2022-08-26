module.exports = (sequelize, Sequelize) => {
    const CandidateProfile = sequelize.define(
        "candidate_profile", {
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
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
            email: {
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
                type: Sequelize.STRING
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
                type: Sequelize.STRING
            }

        }, {
            timestamps: true,
            createdAt: true,
            updatedAt: true,         
          }
    );
  
    return CandidateProfile;
  };