const db = require("../models");
const userProjects = db.candidateProjects;

exports.saveProjects = async (req, res) => {
    await userProjects.create({
            project_name : req.body.project_name,
            project_url : req.body.project_url,
            start_date : req.body.start_date,
            end_date : req.body.end_date,
            currently_ongoing : req.body.currently_ongoing,
            associated_with : req.body.associated_with,
            description : req.body.description,
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

exports.showAllProjects = async (req, res) => {
    let userId = req.params.userId;
    await userProjects.findAll({
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

exports.showProjectsById = async (req, res) => {
    let id = req.params.id;
    let userId = req.params.userId;
    await userProjects.findOne({
        where: { id , userId }
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

exports.deleteProjects = async (req, res) => {
    let id = req.params.id;
    let userId = req.params.userId;
    try {
        let project = await userProjects.findOne({
            where: { id , userId }
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

exports.updateProjects = async (req, res) => {
    let id = req.params.id;
    let userId = req.params.userId;
    const {
        project_name,
        project_url,
        start_date,
        end_date,
        currently_ongoing,
        associated_with,
        description
    } = req.body;

    try {
        let project = await userProjects.findOne({
            where: { id , userId }
        });

        project.project_name = project_name;
        project.project_url = project_url;
        project.start_date = start_date;
        project.end_date = end_date;
        project.currently_ongoing = currently_ongoing;
        project.associated_with = associated_with;
        project.description = description;

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