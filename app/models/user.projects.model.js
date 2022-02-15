module.exports = (sequelize, Sequelize) => {
    const CandidateProjects = sequelize.define(
        "candidate_projects", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        project_name: {
            type: Sequelize.STRING
        },
        project_url: {
            type: Sequelize.STRING
        },
        start_date: {
            type: Sequelize.STRING
        },
        end_date: {
            type: Sequelize.STRING
        },
        currently_ongoing: {
            type: Sequelize.BOOLEAN
        },
        associated_with: {
            type: Sequelize.STRING
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

    return CandidateProjects;
};