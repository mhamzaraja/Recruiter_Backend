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
    const employerId = req.params.employerId;
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
    const id = req.params.id;
    const employerId = req.params.employerId;
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
    const id = req.params.id;
    const employerId = req.params.employerId;
    try {
        const loc = await jobLocation.findOne({
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
    const id = req.params.id;
    const employerId = req.params.employerId;
    const {
        address,
        city,
        country
    } = req.body;

    try {
        const loc = await jobLocation.findOne({
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