module.exports = (sequelize, Sequelize) => {
    const CandidateSkills = sequelize.define(
        "candidate_skills", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        skill_title: {
            type: Sequelize.STRING
        },
        skill_proficiency : {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return CandidateSkills;
};