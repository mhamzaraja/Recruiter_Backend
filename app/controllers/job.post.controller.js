const db = require("../models");
const userJob = db.postJob;

exports.saveJob = async (req, res) => {
    await userJob.create(req.body).then(data => {
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
    const employerId = req.userId;
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
        job_description,
        enter_skills,
        company,
        job_location,
        required_career_level,
        salary_range,
        job_shift,
        positions_available,
        gender_requirement,
        minimum_qualification,
        years_of_experience,
        workplace_type,
        is_active,
        is_sponsor
    } = req.body;

    try {
        const job = await userJob.findOne({
            where: { id, employerId }
        });

        job.job_title = job_title;
        job.job_description = job_description;
        job.enter_skills = enter_skills;
        job.company = company;
        job.job_location = job_location;
        job.required_career_level = required_career_level;
        job.salary_range = salary_range;
        job.job_shift = job_shift;
        job.positions_available = positions_available;
        job.gender_requirement = gender_requirement;
        job.minimum_qualification = minimum_qualification;
        job.years_of_experience = years_of_experience;
        job.workplace_type = workplace_type;
        job.is_active = is_active;
        job.is_sponsor = is_sponsor;

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