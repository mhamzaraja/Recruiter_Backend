module.exports = (sequelize, Sequelize) => {
    const CandidateEducation = sequelize.define(
        "candidate_education", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        degree_title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a title' },
                notEmpty: { msg: 'title must not be empty' }
            }
        },
        field_of_study: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a field of study' },
                notEmpty: { msg: 'field of study must not be empty' }
            }
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a location' },
                notEmpty: { msg: 'location must not be empty' }
            }
        },
        institution: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have an institute' },
                notEmpty: { msg: 'institute must not be empty' }
            }
        },
        completion_year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a year of completion' },
                notEmpty: { msg: 'year of completion must not be empty' }
            }
        },
        gpa: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a gpa value' },
                notEmpty: { msg: 'gpa value must not be empty' }
            }
        },
        total_gpa: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a title' },
                notEmpty: { msg: 'title must not be empty' }
            }
        },
        obtained_gpa: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a title' },
                notEmpty: { msg: 'title must not be empty' }
            }
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return CandidateEducation;
};