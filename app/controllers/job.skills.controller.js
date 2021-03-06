const db = require("../models");
const jobSkills = db.jobSkills;

exports.saveJobSkills = async (req, res) => {
    await jobSkills.create({
            skill_title : req.body.skill_title,
            skill_level : req.body.skill_level,
            userId: req.body.userId
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

exports.showJobSkillsData = async (req, res) => {
    const id = req.query.id;
    const employerId = req.query.employerId;

    if(!id){
        //show all
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
    } else {
        //find one by id
        await jobSkills.findOne({
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
                res.status(500).send({
                    message:
                        err.message || "Something Went wrong while requesting!"
                });
            });
    }
};

exports.deleteJobSkills = async (req, res) => {
    const id = req.query.id;
    const employerId = req.query.employerId;
    try {
        const project = await jobSkills.findOne({
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
    const id = req.query.id;
    const employerId = req.query.employerId;
    const {
        skill_title,
        skill_level
    } = req.body;

    try {
        const project = await jobSkills.findOne({
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