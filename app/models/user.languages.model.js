module.exports = (sequelize, Sequelize) => {
    const CandidateLanguages = sequelize.define(
        "candidate_languages", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        language_title: {
            type: Sequelize.STRING
        },
        language_proficiency: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return CandidateLanguages;
};