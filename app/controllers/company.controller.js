const db = require("../models");
const companyProfile = db.companyProfile;

exports.saveCompany = async (req, res) => {
    await companyProfile.create(req.body)
        .then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Created Successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showAllCompanys = async (req, res) => {
    const employerId = req.userId;

    if (!employerId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await companyProfile.findAll({
            where: { employerId }
        })
            .then(data => {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    }
};

exports.showCompanyById = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;

    if (!employerId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await companyProfile.findOne({
            where: { id, employerId }
        })
            .then(data => {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    }
};

exports.deleteCompany = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;
    try {
        const company = await companyProfile.findOne({
            where: { id, employerId }
        });
        await company.destroy().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Deleted Successfully",
                data: data
            });
        }).catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    }
};

exports.updateCompany = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;
    const {
        company_name,
        ceo_name,
        hr_head_department,
        job_designation,
        industry,
        ownership_type,
        company_address,
        company_description,
        origin_of_company,
        number_of_offices,
        contact_email,
        contact_person,
        company_url,
        number_of_employees,
        operating_since,
        company_logo,
        office_number,
        mobile_number,
        is_default
    } = req.body;

    try {
        const company = await companyProfile.findOne({
            where: { id, employerId }
        });

        company.company_name = company_name;
        company.ceo_name = ceo_name;
        company.hr_head_department = hr_head_department;
        company.job_designation = job_designation;
        company.industry = industry;
        company.ownership_type = ownership_type;
        company.company_address = company_address;
        company.company_description = company_description;
        company.origin_of_company = origin_of_company;
        company.number_of_offices = number_of_offices;
        company.contact_email = contact_email;
        company.contact_person = contact_person;
        company.company_url = company_url;
        company.number_of_employees = number_of_employees;
        company.operating_since = operating_since;
        company.company_logo = company_logo;
        company.office_number = office_number;
        company.mobile_number = mobile_number;
        company.is_default = is_default;

        await company.save().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Updated Successfully",
                data: data
            });
        })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    }
};