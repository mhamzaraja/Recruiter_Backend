const db = require("../models");
const userJob = db.postJob;

exports.saveJob = async (req, res) => {
    await userJob.create(req.body).then(data => {
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

exports.showAllJobs = async (req, res) => {
    const employerId = req.userId;

    if (!employerId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await userJob.findAll({
            where: { employerId }
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

exports.showJobById = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;

    if (!employerId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await userJob.findOne({
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


exports.deleteJob = async (req, res) => {
    const id = req.query.id;
    // const jobId = req.jobId;
    try {
        const job = await userJob.findOne({
            where: { id, employerId }
        });
        await job.destroy().then(data => {
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

exports.updateJob = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;
    const {
        job_title,
        company,
        workplace_type,
        employment_type,
        job_description,
        no_of_positions,
        minimum_qualification,
        years_of_experience,
        salary_range,
        salary_visible,
        created_date,
        is_active,
        is_sponser,
        authorization
    } = req.body;

    try {
        const job = await userJob.findOne({
            where: { id, employerId }
        });

        job.job_title = job_title;
        job.company = company;
        job.workplace_type = workplace_type;
        job.employment_type = employment_type;
        job.job_description = job_description;
        job.no_of_positions = no_of_positions;
        job.minimum_qualification = minimum_qualification;
        job.years_of_experience = years_of_experience;
        job.salary_range = salary_range;
        job.salary_visible = salary_visible;
        job.created_date = created_date;
        job.is_active = is_active;
        job.is_sponser = is_sponser;
        job.authorization = authorization;

        await job.save().then(data => {
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