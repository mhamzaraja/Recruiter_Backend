const db = require("../models");
const jobLocation = db.jobLocation;

exports.saveJobLocation = async (req, res) => {
    await jobLocation.create({
        address: req.body.address,
        city: req.body.city,
        country: req.body.country
    })
        .then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Added Successfully!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showAllJobsLocation = async (req, res) => {
    let employerId = req.params.employerId;
    await jobLocation.findAll()
        .then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showJobLocationById = async (req, res) => {
    let id = req.params.id;
    let employerId = req.params.employerId;
    await jobLocation.findOne({
        where: { id }
    }).then(data => {
        res.status(200).json({
            status: 200,
            success: true,
            data: data
        });
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.deleteJobLocation = async (req, res) => {
    let id = req.params.id;
    let employerId = req.params.employerId;
    try {
        let loc = await jobLocation.findOne({
            where: { id }
        });
        await loc.destroy().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Deleted Successfully",
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};

exports.updateJobLocation = async (req, res) => {
    let id = req.params.id;
    let employerId = req.params.employerId;
    const {
        address,
        city,
        country
    } = req.body;

    try {
        let loc = await jobLocation.findOne({
            where: { id }
        });

        loc.address = address;
        loc.city = city;
        loc.country = country;

        await loc.save().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Updated Successfully",
                data: data
            });
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Something Went wrong while requesting!"
                });
            });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};