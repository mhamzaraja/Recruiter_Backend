module.exports = (sequelize, Sequelize) => {
    const EmployerInfo = sequelize.define(
        "employer_Info", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        full_name: {
            type: Sequelize.STRING
        },
        job_designation: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.STRING
        },
        office_number: {
            type: Sequelize.INTEGER
        },
        mobile_number: {
            type: Sequelize.INTEGER
        },
        avatar: {
            type: Sequelize.BLOB
        }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
    );

    return EmployerInfo;
};