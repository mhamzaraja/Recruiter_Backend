const db = require("../models");
const userLanguages = db.candidateLanguages;

exports.saveLanguages = async (req, res) => {
    await userLanguages.create({
        language_title : req.body.language_title,
        language_proficiency : req.body.language_proficiency,
        userId : req.body.userId
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

exports.showAllLanguages = async (req, res) => {
    const userId = req.params.userId;
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
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showLanguagesById = async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    await userLanguages.findOne({
        where: { id , userId }
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

exports.deleteLanguages = async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    try {
        const language = await userLanguages.findOne({
            where: { id , userId }
        });
        await language.destroy().then(data => {
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

exports.updateLanguages = async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    const {
        language_title,
        language_proficiency
    } = req.body;

    try {
        const language = await userLanguages.findOne({
            where: { id , userId }
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