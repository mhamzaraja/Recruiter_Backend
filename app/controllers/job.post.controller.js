const db = require("../models");
const userJob = db.jobPost;

exports.saveJob = async (req, res) => {
    await userJob.create({

        job_title: req.body.job_title,
        company: req.body.company,
        workplace_type: req.body.workplace_type,
        employment_type: req.body.employment_type,
        job_description: req.body.job_description,
        no_of_positions: req.body.no_of_positions,
        minimum_qualification: req.body.minimum_qualification,
        years_of_experience: req.body.years_of_experience,
        salary_range: req.body.salary_range,
        salary_visible: req.body.salary_visible,
        created_date: req.body.created_date,
        is_active: req.body.is_active,
        is_sponser: req.body.is_sponser,
        authorization: req.body.authorization

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
};

exports.showJobData = async (req, res) => {
    const id = req.query.id;
    const employerId = req.query.employerId;

    if(!id){
        //show all
        await userJob.findAll()
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
        //find one by id
        await userJob.findOne({
            where: { id }
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
    // const jobId = req.query.jobId;
    try {
        const job = await userJob.findOne({
            where: { id }
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
    // const jobId = req.query.jobId;
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
            where: { id }
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