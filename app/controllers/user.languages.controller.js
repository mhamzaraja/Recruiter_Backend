const db = require("../models");
const userLanguages = db.candidateLanguages;

exports.saveLanguages = async (req, res) => {
    await userLanguages.create({
        language_title: req.body.language_title,
        language_proficiency: req.body.language_proficiency,
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

exports.showLanguagesData = async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;

    if (!id) {
        // show all
        await userLanguages.findAll({
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
        await userLanguages.findOne({
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

exports.deleteLanguages = async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;
    try {
        const language = await userLanguages.findOne({
            where: { id, userId }
        });
        await language.destroy().then(data => {
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

exports.updateLanguages = async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;
    const {
        language_title,
        language_proficiency
    } = req.body;

    try {
        const language = await userLanguages.findOne({
            where: { id, userId }
        });

        language.language_title = language_title;
        language.language_proficiency = language_proficiency;

        await language.save().then(data => {
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