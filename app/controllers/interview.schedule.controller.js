const db = require("../models");
const interviewSchedule=db.interviewSchedule;
const candidateProfile= db.candidateProfile;
const employerInfo = db.employerInfo
const postJob=db.postJob

exports.savescheduleInterview = async (req, res) => {
    await interviewSchedule.create(req.body)
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
}

exports.showscheduleInterviewById = async (req, res) => {
    const interviewId = req.query.id;

    await interviewSchedule.findAll({
        where: { interviewId },
    }).then(data => {
        if (data.length > 0){
            res.status(200).json({
                status: 200,
                success: true,
                data: data
            });
        } else {
            res.status(500).json({
                status: 500,
                success: false
            });
        }
        
    })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showAllscheduleInterview = async (req, res) => {
    const jobId = req.query.id;

    await interviewSchedule.findAll({
        where: { jobId },
        include: [candidateProfile, postJob]
    }).then(data => {
        if (data.length > 0){
            res.status(200).json({
                status: 200,
                success: true,
                data: data
            });
        } else {
            res.status(500).json({
                status: 500,
                success: false,
                message: "No jobs were posted with this id: " + jobId
            });
        }
        
    })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.updatescheduleInterview = async (req, res) => {
    const id = req.query.id;

    const {
        date,
        time,
        city,
        comments,
        status
    } = req.body;

    try {
        const interviewUpdate = await interviewSchedule.findOne({
            where: { id }
        });
        interviewUpdate.date = date;
        interviewUpdate.time = time;
        interviewUpdate.city = city;
        interviewUpdate.comments = comments;
        interviewUpdate.status = status

        await interviewSchedule.save().then(data => {
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

