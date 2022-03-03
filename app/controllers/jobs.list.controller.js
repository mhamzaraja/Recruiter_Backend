const db = require("../models");
const userJob = db.postJob;

exports.showAllJobs = async (req, res) => {
    console.log("jobs function");

    await userJob.findAll().then(data => {
        res.status(200).json({
            status: 200,
            success: true,
            data: data
        });
    }).catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });

};