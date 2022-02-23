module.exports = (sequelize, Sequelize) => {
    const EmployerProfile = sequelize.define(
        "employer_profile", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        company: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        company_url: {
            type: Sequelize.STRING
        },
        mobile_number: {
            type: Sequelize.INTEGER
        },
        summary: {
            type: Sequelize.STRING
        }

    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return EmployerProfile;
};