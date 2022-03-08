const db = require("../models");
const jobSkills = db.jobSkills;

exports.saveJobSkills = async (req, res) => {
    await jobSkills.create(req.body)
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

exports.showAllJobSkills = async (req, res) => {
    // const userId = req.userId;

    // console.log(userId);

    // if (!userId) {
    //     res.status(403).json({
    //         status: 403,
    //         success: false,
    //         message: "Unauthorize"
    //     });
    // } else {
        await jobSkills.findAll()
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
    // }
};

exports.showJobSkillsById = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;

    if (!userId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await jobSkills.findOne({
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

exports.deleteJobSkills = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;
    try {
        const project = await jobSkills.findOne({
            where: { id, employerId }
        });
        await project.destroy().then(data => {
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

exports.updateJobSkills = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;
    const {
        skill_title,
        skill_level
    } = req.body;

    try {
        const project = await jobSkills.findOne({
            where: { id, employerId }
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