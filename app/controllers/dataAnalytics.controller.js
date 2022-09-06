const db = require("../models");
const userJob = db.postJob;
const jobApplication = db.jobApplication;
const { QueryTypes } = require("sequelize");

exports.dataAnalytics = async (req, res) => {
    try {

        const totalJobs = await userJob.count();
        const totalApplication = await jobApplication.count();
        const totalCandidates = await db.sequelize.query(
            `SELECT COUNT(roleId)
            FROM user_roles
        WHERE roleId=1;`,
        { type: QueryTypes.SELECT }
        );
        const totalEmployers = await db.sequelize
        .query(
            `SELECT COUNT(roleId)
            FROM user_roles
            WHERE roleId=2;`,
            { type: QueryTypes.SELECT }
            );
            res.status(200).json({
                status: 200,
                success: true,
                data: {
                    totalJobs: totalJobs,
                    totalApplication: totalApplication,
                    totalCandidates: totalCandidates[0]["COUNT(roleId)"],
                    totalEmployers: totalEmployers[0]["COUNT(roleId)"],
                },
            });

    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    }
};
