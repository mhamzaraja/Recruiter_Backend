module.exports = (sequelize, Sequelize) => {
    const PostJob = sequelize.define(
        "post_a_job", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        job_title: {
            type: Sequelize.STRING
        },
        job_category : {
                type : Sequelize.STRING
        },
        job_description: {
            type: Sequelize.STRING
        },
        enter_skills: {
            type: Sequelize.STRING
        },
        company: {
            type: Sequelize.STRING
        },
        job_location: {
            type: Sequelize.STRING
        },
        required_career_level: {
            type: Sequelize.STRING
        },
        salary_range: {
            type: Sequelize.STRING
        },
        job_shift: {
            type: Sequelize.STRING
        },
        positions_available: {
            type: Sequelize.INTEGER
        },
        gender_requirement: {
            type: Sequelize.STRING
        },
        minimum_qualification: {
            type: Sequelize.STRING
        },
        years_of_experience: {
            type: Sequelize.STRING
        },
        workplace_type: {
            type: Sequelize.STRING
        },
        is_active: {
            type: Sequelize.BOOLEAN
        },
        is_sponsor: {
            type: Sequelize.BOOLEAN
        }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
    );

    return PostJob;
};