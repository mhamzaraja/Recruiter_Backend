const db = require("../models");
const userProjects = db.candidateProjects;

exports.saveProjects = async (req, res) => {
    await userProjects.create({
        project_name: req.body.project_name,
        project_url: req.body.project_url,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        currently_ongoing: req.body.currently_ongoing,
        associated_with: req.body.associated_with,
        description: req.body.description,
        userId: req.body.userId
    })
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

exports.showProjectsData = async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;

    if (!id) {
        // show all
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
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    } else {
        // find one by id
        await userProjects.findOne({
            where: { id, userId }
        }).then(data => {
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

exports.deleteProjects = async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;
    try {
        const project = await userProjects.findOne({
            where: { id, userId }
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

exports.updateProjects = async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;
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
        const project = await userProjects.findOne({
            where: { id, userId }
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