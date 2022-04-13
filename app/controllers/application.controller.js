const db = require("../models");
const jobApplication = db.jobApplication;
const candProfile = db.candidateProfile;
const jobPost = db.postJob;

exports.saveApplication = async (req, res) => {
    const userId = req.userId;
    const jobId = Number(req.query.jobId);

    const candidateId = await candProfile.findOne({
        where: { userId }
    });

    try {
        let [data, created] = await jobApplication.findOrCreate({
            where: { userId, jobId },
            defaults: {
                application_status: "Under Review",
                candidateId: candidateId.id
            }
        });

        console.log("job id: ", jobId, "user id: ", userId, "candidateId ID: ", candidateId.id,
         "created: " , created, "data: ", data);
        if (created) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Applied Successfully",
                data: data,
                created: created
            });
        } else {
            return res.status(418).json({
                status: 418,
                success: false,
                created: created,
                message: "You already applied for this job!"
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    }
};

// exports.showAllApplications = async (req, res) => {
//     // const userId = req.userId;

//     // console.log(userId);

//     // if (!userId) {
//     //     res.status(403).json({
//     //         status: 403,
//     //         success: false,
//     //         message: "Unauthorize"
//     //     });
//     // } else {
//         await jobApplication.findAll()
//         .then(data => {
//             res.status(200).json({
//                 status: 200,
//                 success: true,
//                 data: data
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 status: 500,
//                 success: false,
//                 message: err.message || "Something Went wrong while requesting!"
//             });
//         });
//     // }
// };

exports.showApplicationById = async (req, res) => {
    const jobId = req.query.id;

    await jobApplication.findAll({
        where: { jobId },
        include: [candProfile, jobPost]
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


exports.deleteApplication = async (req, res) => {
    const id = req.query.id;
    try {
        const application = await jobApplication.findOne({
            where: {id}
        });
        await application.destroy().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Removed Successfully",
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

exports.updateApplication = async (req, res) => {
    const id = req.query.id;
    const status=req.body.application_status;   
    try {
        const application = await jobApplication.findOne({
            where: { id }
        });

        application.application_status = status;
        await application.save().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Status Updated Successfully",
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
            message: err.message || "Something Went wrong while updating status!"
        });
    }
};