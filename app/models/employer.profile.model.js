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
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a name' },
                notEmpty: { msg: 'name must not be empty' }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have an email' },
                notEmpty: { msg: 'email must not be empty' },
                isEmail: { msg: 'must be a valid email address' }
            }
        },
        company: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a company' },
                notEmpty: { msg: 'company must not be empty' }
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have an address' },
                notEmpty: { msg: 'address must not be empty' }
            }
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a city' },
                notEmpty: { msg: 'city must not be empty' }
            }
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a country' },
                notEmpty: { msg: 'country must not be empty' }
            }
        },
        company_url: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a company url' },
                notEmpty: { msg: 'company url must not be empty' }
            }
        },
        mobile_number: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a mobile number' },
                notEmpty: { msg: 'mobile number must not be empty' }
            }
        },
        summary: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'must have a summary' },
                notEmpty: { msg: 'summary must not be empty' }
            }
        }

    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return EmployerProfile;
};