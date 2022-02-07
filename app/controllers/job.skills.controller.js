const db = require("../models");
const jobSkills = db.jobSkills;

exports.saveJobSkills = async (req, res) => {
    await jobSkills.create({
            skill_title : req.body.skill_title,
            skill_level : req.body.skill_level
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

exports.showAllJobsSkills = async (req, res) => {
    let employerId = req.params.employerId;
    await jobSkills.findAll()
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

exports.showJobSkillsById = async (req, res) => {
    let id = req.params.id;
    let employerId = req.params.employerId;
    await jobSkills.findOne({
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

exports.deleteJobSkills = async (req, res) => {
    let id = req.params.id;
    let employerId = req.params.employerId;
    try {
        let project = await jobSkills.findOne({
            where: { id }
        });
        await project.destroy().then(data => {
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

exports.updateJobSkills = async (req, res) => {
    let id = req.params.id;
    let employerId = req.params.employerId;
    const {
        skill_title,
        skill_level
    } = req.body;

    try {
        let project = await jobSkills.findOne({
            where: { id }
        });

        project.skill_title = skill_title;
        project.skill_level = skill_level;

        await project.save().then(data => {
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