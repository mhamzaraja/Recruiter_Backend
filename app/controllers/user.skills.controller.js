const db = require("../models");
const userSkills = db.candidateSkills;

exports.saveSkills = async (req, res) => {
    await userSkills.create(req.body)
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

exports.showSkills = async (req, res) => {
    await userSkills.findAll()
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

exports.showSkillsById = async (req, res) => {
    let id = req.params.id
    await userSkills.findOne({ where: { id } })
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

exports.deleteSkills = async (req, res) => {
    try {
        let skill = await userSkills.findOne({
            where: { id: req.params.id }
        });
        await skill.destroy();
        res.status(200).send({ message: "Deleted Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};

exports.updateSkills = async (req, res) => {
    const {
        skill_title,
        skill_proficiency
    } = req.body;

    try {
        let skill = await userSkills.findOne({
            where: { id: req.params.id }
        });

        skill.skill_title = skill_title;
        skill.skill_proficiency = skill_proficiency;

        await skill.save();
        res.status(200).send({ message: "Updated Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};