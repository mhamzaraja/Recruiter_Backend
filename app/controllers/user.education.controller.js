const db = require("../models");
const userEducation = db.candidateEducation;

exports.saveEducation = async (req, res) => {
    await userEducation.create(req.body)
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

exports.showEducation = async (req, res) => {
    await userEducation.findAll()
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

exports.showEducationById = async (req, res) => {
    let id = req.params.id
    await userEducation.findOne({ where: { id } })
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

exports.deleteEducation = async (req, res) => {
    try {
        let education = await userEducation.findOne({
            where: { id: req.params.id }
        });
        await education.destroy();
        res.status(200).send({ message: "Deleted Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};

exports.updateEducation = async (req, res) => {
    const {
        degree_title,
        field_of_study,
        location,
        institution,
        completion_year,
        gpa,
        total_gpa,
        obtained_gpa
    } = req.body;

    try {
        let education = await userEducation.findOne({
            where: { id: req.params.id }
        });

        education.degree_title = degree_title;
        education.field_of_study = field_of_study;
        education.location = location;
        education.institution = institution;
        education.completion_year = completion_year;
        education.gpa = gpa;
        education.total_gpa = total_gpa;
        education.obtained_gpa = obtained_gpa;
        
        await education.save();
        res.status(200).send({ message: "Updated Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};