module.exports = (sequelize, Sequelize) => {
    const CandidateFavouriteJobs= sequelize.define(
        "google_auth", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
            },
            refresh_token: {
                type: Sequelize.STRING,
            },
            access_token: {
                type: Sequelize.STRING,
            },
            expiry_date: {
                type: Sequelize.STRING
            }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
    );

    return CandidateFavouriteJobs;
};