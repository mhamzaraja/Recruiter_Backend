const db = require("../models");
const userLanguages = db.candidateLanguages;

exports.saveLanguages = async (req, res) => {
    await userLanguages.create(req.body)
        .then(data => {
            res.send(data);
            res.status(200).send({
                message: "Register Successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showLanguages = async (req, res) => {
    await userLanguages.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showLanguagesById = async (req, res) => {
    let id = req.params.id
    await userLanguages.findOne({ where: { id } })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something Went wrong while requesting!"
            });
        });


};

exports.deleteLanguages = async (req, res) => {
    try {
        let language = await userLanguages.findOne({
            where: { id: req.params.id }
        });
        await language.destroy();
        res.status(200).send({ message: "Deleted Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};

exports.updateLanguages = async (req, res) => {
    const {
        language_title,
        language_proficiency
    } = req.body;

    try {
        let language = await userLanguages.findOne({
            where: { id: req.params.id }
        });

        console.log(language_title);
        language.language_title = language_title;
        language.language_proficiency = language_proficiency;

        await language.save();
        res.status(200).send({ message: "Updated Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};