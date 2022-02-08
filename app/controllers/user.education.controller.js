const db = require("../models");
const userEducation = db.candidateEducation;

exports.saveEducation = async (req, res) => {
    await userEducation.create({
        degree_title: req.body.degree_title,
        field_of_study: req.body.field_of_study,
        location: req.body.location,
        institution: req.body.institution,
        completion_year: req.body.completion_year,
        total_gpa: req.body.total_gpa,
        obtained_gpa: req.body.obtained_gpa,
        userId: req.body.userId

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

exports.showAllEducations = async (req, res) => {
    const userId = req.params.userId;
    await userEducation.findAll({
        where: { userId }
    })
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

exports.showEducationById = async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    await userEducation.findOne({
        where: { id, userId }
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

exports.deleteEducation = async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    try {
        const education = await userEducation.findOne({
            where: { id, userId }
        });
        await education.destroy().then(data => {
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

exports.updateEducation = async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    const {
        degree_title,
        field_of_study,
        location,
        institution,
        completion_year,
        total_gpa,
        obtained_gpa
    } = req.body;

    try {
        const education = await userEducation.findOne({
            where: { id, userId }
        });

        education.degree_title = degree_title;
        education.field_of_study = field_of_study;
        education.location = location;
        education.institution = institution;
        education.completion_year = completion_year;
        education.total_gpa = total_gpa;
        education.obtained_gpa = obtained_gpa;

        await education.save().then(data => {
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