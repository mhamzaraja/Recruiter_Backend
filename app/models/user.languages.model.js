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
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a title for language' },
                notEmpty: { msg: 'skill title must not be empty' }
            }
        },
        language_proficiency: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a level of language' },
                notEmpty: { msg: 'proficiency of skill must not be empty' }
            }
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return CandidateLanguages;
};