const db = require("../models");
const userJobs = db.candidateJobs;

exports.saveJobs = async (req, res) => {
    await userJobs.create(req.body)
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

exports.showJobs = async (req, res) => {
    await userJobs.findAll()
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

exports.showJobsById = async (req, res) => {
    let id = req.params.id
    await userJobs.findOne({ where: { id } })
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

exports.deleteJobs = async (req, res) => {
    try {
        let job = await userJobs.findOne({
            where: { id: req.params.id }
        });
        await job.destroy();
        res.status(200).send({ message: "Deleted Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};

exports.updateJobs = async (req, res) => {
    const {
        job_title,
        job_proficiency
    } = req.body;

    try {
        let job = await userJobs.findOne({
            where: { id: req.params.id }
        });

        job.job_title = job_title;
        job.job_proficiency = job_proficiency;

        await job.save();
        res.status(200).send({ message: "Updated Successfully!" });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something Went wrong while requesting!"
        });
    }
};