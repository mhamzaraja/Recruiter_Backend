module.exports = (sequelize, Sequelize) => {
    const CandidateFavouriteJobs= sequelize.define(
        "candidate_favourite_jobs", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
            },
            jobId: {
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
            },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
    );

    return CandidateFavouriteJobs;
};