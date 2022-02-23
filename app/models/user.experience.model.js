module.exports = (sequelize, Sequelize) => {
    const UserExperience = sequelize.define(
        "candidate_experience", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
            type: Sequelize.STRING
        },
        salary: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.STRING
        },
        endDate: {
            type: Sequelize.STRING
        },
        currentlyWorking: {
            type: Sequelize.BOOLEAN
        },
        description: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return UserExperience;
};