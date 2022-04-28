const db = require("../models");
const shortlistCandidate=db.jobshortlistCandidate

exports.savescheduleInterview = async (req, res) => {

    await shortlistCandidate.create(req.body)
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

    await shortlistCandidate.findAll({
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
                success: false,
                message: "No candidate were selected with this id: " + jobId
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

    await shortlistCandidate.findAll({
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
                message: "No Candidate is Selected"
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
        const interviewUpdate = await shortlistCandidate.findOne({
            where: { id }
        });
        interviewUpdate.date = date;
        interviewUpdate.time = time;
        interviewUpdate.city = city;
        interviewUpdate.comments = comments;
        interviewUpdate.status = status

        await project.save().then(data => {
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

