module.exports = (sequelize, Sequelize) => {
    const CandidateSkills = sequelize.define(
        "candidate_skills", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        skill_title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a title for skill' },
                notEmpty: { msg: 'skill title must not be empty' }
            }
        },
        skill_proficiency : {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a level of skill' },
                notEmpty: { msg: 'proficiency of skill must not be empty' }
            }
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return CandidateSkills;
};