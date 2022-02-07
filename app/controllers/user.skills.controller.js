const db = require("../models");
const userSkills = db.candidateSkills;

exports.saveSkills = async (req, res) => {
    await userSkills.create({
        skill_title: req.body.skill_title,
        skill_proficiency: req.body.skill_proficiency,
        userId : req.body.userId
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

exports.showAllSkills = async (req, res) => {
    let userId = req.params.userId;
    await userSkills.findAll({
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

exports.showSkillsById = async (req, res) => {
    let id = req.params.id;
    let userId = req.params.userId;
    await userSkills.findOne({
        where: { id, userId }
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

exports.deleteSkills = async (req, res) => {
    let id = req.params.id;
    let userId = req.params.userId;
    try {
        let skill = await userSkills.findOne({
            where: { id, userId }
        });
        await skill.destroy().then(data => {
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

exports.updateSkills = async (req, res) => {
    let id = req.params.id;
    let userId = req.params.userId;
    const {
        skill_title,
        skill_proficiency
    } = req.body;

    try {
        let skill = await userSkills.findOne({
            where: { id, userId }
        });

        skill.skill_title = skill_title;
        skill.skill_proficiency = skill_proficiency;

        await skill.save().then(data => {
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