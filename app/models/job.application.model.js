module.exports = (sequelize, Sequelize) => {
    const JobApplication = sequelize.define(
        "job_application", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        application_status: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }
    );

    return JobApplication;
};