module.exports = (sequelize, Sequelize) => {
    const CandidateEducation = sequelize.define(
        "candidate_education", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        degree_title: {
            type: Sequelize.STRING
        },
        field_of_study: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        institution: {
            type: Sequelize.STRING
        },
        completion_year: {
            type: Sequelize.INTEGER
        },
        obtained_gpa: {
            type: Sequelize.DECIMAL(10,1)
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return CandidateEducation;
};