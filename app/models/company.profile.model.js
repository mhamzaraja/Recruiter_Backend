module.exports = (sequelize, Sequelize) => {
    const CompanyProfile = sequelize.define(
        "company_profile", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        company_name: {
            type: Sequelize.STRING
        },
        ceo_name: {
            type: Sequelize.STRING
        },
        hr_head_department: {
            type: Sequelize.STRING
        },
        job_designation: {
            type: Sequelize.STRING
        },
        industry: {
            type: Sequelize.STRING
        },
        ownership_type: {
            type: Sequelize.STRING
        },
        company_address: {
            type: Sequelize.STRING
        },
        company_description: {
            type: Sequelize.STRING
        },
        origin_of_company: {
            type: Sequelize.STRING
        },
        number_of_offices: {
            type: Sequelize.STRING
        },
        contact_email: {
            type: Sequelize.STRING
        },
        contact_person: {
            type: Sequelize.STRING
        },
        company_url: {
            type: Sequelize.STRING
        },
        number_of_employees: {
            type: Sequelize.STRING
        },
        operating_since: {
            type: Sequelize.STRING
        },
        company_logo: {
            type: Sequelize.BLOB
        },
        office_number: {
            type: Sequelize.INTEGER
        },
        mobile_number: {
            type: Sequelize.INTEGER
        },
        is_default: {
            type: Sequelize.BOOLEAN
        },
        is_active: {
            type: Sequelize.BOOLEAN
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );

    return CompanyProfile;
};