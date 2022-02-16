const db = require("../models");
const employerProfile = db.employerProfile;

exports.saveEmployerProfile = async (req, res) => {
    await employerProfile.create({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        company_url: req.body.company_url,
        mobile_number: req.body.mobile_number,
        summary: req.body.summary
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
};

exports.showEmployerProfileData = async (req, res) => {
    const id = req.query.id;
    const employerId = req.query.employerId;

    if(!id){
        //show all
        await employerProfile.findAll()
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
    } else {
        //find one by id
        await employerProfile.findOne({
            where: { id }
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

exports.deleteEmployerProfile = async (req, res) => {
    const id = req.query.id;
    const employerId = req.query.employerId;
    try {
        const employer = await employerProfile.findOne({
            where: { id }
        });
        await employer.destroy().then(data => {
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

exports.updateEmployerProfile = async (req, res) => {
    const id = req.query.id;
    const employerId = req.query.employerId;
    const {
        name,
        email,
        company,
        address,
        city,
        country,
        company_url,
        mobile_number,
        summary
    } = req.body;

    try {
        const employer = await employerProfile.findOne({
            where: { id }
        });

        employer.name = name;
        employer.email = email;
        employer.company = company;
        employer.address = address;
        employer.city = city;
        employer.country = country;
        employer.company_url = company_url;
        employer.mobile_number = mobile_number;
        employer.summary = summary;

        await employer.save().then(data => {
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