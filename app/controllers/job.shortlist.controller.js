const db = require("../models");
const shortlistCandidate=db.jobshortlistCandidate

exports.saveShortlistCandidate = async (req, res) => {
    await shortlistCandidate.create(req.body)
    .then(data => {
        res.status(200).json({
            status: 200,
            success: true,
            message: "Shortlisted Successfully",
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

exports.showShortlistCandidatebyId = async (req, res) => {
    const shortlistId = req.query.id;

    await shortlistCandidate.findAll({
        where: { shortlistId },
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
                message: "No candidate were shortlisted with this id: " + jobId
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

exports.showAllShortListCandidate = async (req, res) => {
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
                message: "No Candidate is Shortlisted"
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

exports.updateShortlistCandidate = async (req, res) => {
    const id = req.query.id;

    const {startDate,endDate,startTime,endTime,Location,comments,status,userTimezone,utcTimezone} = req.body;

    try {
        const shortlistUpdate = await shortlistCandidate.findOne({
            where: { id }
        });
        shortlistUpdate.startDate = startDate;
        shortlistUpdate.endDate = endDate;
        shortlistUpdate.startTime = startTime;
        shortlistUpdate.endTime = endTime;
        shortlistUpdate.Location = Location;
        shortlistUpdate.comments = comments;
        shortlistUpdate.status = status;
        shortlistUpdate.userTimezone = userTimezone;
        shortlistUpdate.utcTimezone = utcTimezone;

        await shortlistCandidate.save().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Updated shortlist Successfully",
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

